import {
  createDefaultBasename,
  createMp4Filename,
  sanitizeBasename,
} from './filename.ts'
import type { DownloadProgress } from '../media/mediaPipeline'
import {
  summarizeMediaPlan,
  type ClipInspection,
  type MediaPlan,
  type MediaSummary,
} from '../media/mediaTypes.ts'
import type {
  FileHandleLike,
  OutputSink,
  SaveFilePicker,
} from './outputSinks.ts'
import { toDisplayError } from '../errors.ts'

export type DownloadJobStatus =
  | 'active'
  | 'awaiting-destination'
  | 'cancelled'
  | 'choosing-destination'
  | 'completed'
  | 'failed'
  | 'inspecting'
  | 'queued'
  | 'ready'

export type SaveStrategy = 'file-system' | 'memory'

type DownloadJobData = {
  acknowledged: boolean
  basename: string
  category?: string
  channel?: string
  clipId: string
  completedSegments: number
  completedAt?: number
  createdAt: number
  creator?: string
  error?: Readonly<{
    code: string
    message: string
  }>
  fetchedBytes: number
  filename: string
  id: string
  likeCount?: number
  media?: MediaSummary
  pageUrl: string
  phase?: DownloadProgress['phase'] | 'inspecting'
  processedBytes: number
  publishedAt?: number
  saveStrategy?: SaveStrategy
  startedAt?: number
  status: DownloadJobStatus
  thumbnailUrl?: string
  title?: string
  viewCount?: number
  writtenBytes: number
}

export type DownloadJobSnapshot = Readonly<
  DownloadJobData & {
    queuePosition?: number
  }
>

export type DownloadSnapshot = Readonly<{
  jobs: readonly DownloadJobSnapshot[]
}>

export type DownloadActivitySummary = Readonly<{
  activeCount: number
  attention: boolean
  error: boolean
  queuedCount: number
  visible: boolean
}>

type MutableJob = DownloadJobData

type JobRuntime = {
  abortController?: AbortController
  // Invalidates callbacks belonging to a cancelled or retried attempt.
  generation: number
  plan?: MediaPlan
  progressTimer?: ReturnType<typeof setTimeout>
  saveStrategy?: SaveStrategy
  sink?: OutputSink
}

export type DownloadManagerDependencies = Readonly<{
  createBlobSink: (filename: string) => OutputSink
  createFileSystemSink: (handle: FileHandleLike) => Promise<OutputSink>
  downloadMediaPlan: (
    plan: MediaPlan,
    sink: OutputSink,
    signal: AbortSignal,
    options: Readonly<{
      onProgress: (progress: DownloadProgress) => void
    }>,
  ) => Promise<void>
  getSaveFilePicker: () => SaveFilePicker | undefined
  inspectClip: (
    clipId: string,
    signal: AbortSignal,
    options: Readonly<{
      pageUrl: string
    }>,
  ) => Promise<ClipInspection>
  now: () => number
}>

const TERMINAL_STATUSES = new Set<DownloadJobStatus>([
  'cancelled',
  'completed',
  'failed',
])
const REMOVABLE_STATUSES = new Set<DownloadJobStatus>([
  ...TERMINAL_STATUSES,
  'ready',
])
const ACTIVE_STATUSES = new Set<DownloadJobStatus>([
  'active',
  'choosing-destination',
  'inspecting',
])
const ATTENTION_STATUSES = new Set<DownloadJobStatus>([
  'awaiting-destination',
  'ready',
])
const MAX_INSPECTIONS = 2
const PROGRESS_INTERVAL_MS = 100
const EMPTY_ACTIVITY_SUMMARY: DownloadActivitySummary = {
  activeCount: 0,
  attention: false,
  error: false,
  queuedCount: 0,
  visible: false,
}
let nextJobNumber = 1

export function createDownloadManager(
  dependencies: DownloadManagerDependencies,
) {
  const jobs = new Map<string, MutableJob>()
  const runtimes = new Map<string, JobRuntime>()
  const listeners = new Set<() => void>()
  const inspectionQueue: string[] = []
  const mediaQueue: string[] = []
  let activeInspections = 0
  let activitySummary = EMPTY_ACTIVITY_SUMMARY
  let snapshot: DownloadSnapshot = {
    jobs: [],
  }
  // Destination selection owns the same single slot as the media transfer.
  let reservedMediaJobId: string | undefined

  function publish() {
    rebuildPublishedViews()

    for (const listener of listeners) {
      listener()
    }
  }

  function getSnapshot(): DownloadSnapshot {
    return snapshot
  }

  function rebuildPublishedViews() {
    const queuePositions = new Map<string, number>()
    let activeCount = 0
    let attention = false
    let error = false
    let queuedCount = 0

    for (let index = 0; index < mediaQueue.length; index += 1) {
      const jobId = mediaQueue[index]

      if (jobId) {
        queuePositions.set(jobId, index + 1)
      }
    }

    const snapshotJobs = [...jobs.values()].map((job) => {
      if (ACTIVE_STATUSES.has(job.status)) {
        activeCount += 1
      }

      if (job.status === 'queued' || job.status === 'awaiting-destination') {
        queuedCount += 1
      }

      if (
        ATTENTION_STATUSES.has(job.status) ||
        (TERMINAL_STATUSES.has(job.status) && !job.acknowledged)
      ) {
        attention = true
      }

      if (job.status === 'failed' && !job.acknowledged) {
        error = true
      }

      return {
        ...job,
        queuePosition:
          job.status === 'queued' ? queuePositions.get(job.id) : undefined,
      }
    })
    const nextActivitySummary: DownloadActivitySummary = {
      activeCount,
      attention,
      error,
      queuedCount,
      visible: activeCount > 0 || queuedCount > 0 || attention,
    }

    snapshot = {
      jobs: snapshotJobs,
    }

    if (!activitySummariesEqual(activitySummary, nextActivitySummary)) {
      activitySummary = nextActivitySummary
    }
  }

  function inspectClip(clipId: string, pageUrl = window.location.href) {
    const existing = [...jobs.values()].find(
      (job) => job.clipId === clipId && !TERMINAL_STATUSES.has(job.status),
    )

    if (existing) {
      return existing.id
    }

    const id = createJobId()
    const job: MutableJob = {
      acknowledged: false,
      basename: clipId,
      clipId,
      completedSegments: 0,
      createdAt: dependencies.now(),
      fetchedBytes: 0,
      filename: `${clipId}.mp4`,
      id,
      pageUrl,
      phase: 'inspecting',
      processedBytes: 0,
      status: 'inspecting',
      writtenBytes: 0,
    }
    jobs.set(id, job)
    runtimes.set(id, {
      generation: 0,
    })
    inspectionQueue.push(id)
    publish()
    drainInspectionQueue()
    return id
  }

  function drainInspectionQueue() {
    while (activeInspections < MAX_INSPECTIONS && inspectionQueue.length > 0) {
      const jobId = inspectionQueue.shift()
      const job = jobId ? jobs.get(jobId) : undefined

      if (!job || job.status !== 'inspecting') {
        continue
      }

      activeInspections += 1
      void runInspection(job).finally(() => {
        activeInspections -= 1
        drainInspectionQueue()
      })
    }
  }

  async function runInspection(job: MutableJob) {
    const runtime = getRuntime(job.id)
    const generation = runtime.generation + 1
    const abortController = new AbortController()
    runtime.generation = generation
    runtime.abortController = abortController

    try {
      const inspection = await dependencies.inspectClip(
        job.clipId,
        abortController.signal,
        {
          pageUrl: job.pageUrl,
        },
      )

      if (!isCurrent(job.id, generation)) {
        return
      }

      applyInspection(job, runtime, inspection)
      publish()
    } catch (error) {
      if (!isCurrent(job.id, generation)) {
        return
      }

      const displayError = toDisplayError(error)
      job.phase = undefined
      job.status = displayError.code === 'cancelled' ? 'cancelled' : 'failed'
      job.error = displayError.code === 'cancelled' ? undefined : displayError
      job.completedAt = dependencies.now()
      job.acknowledged = false
      publish()
    } finally {
      if (isCurrent(job.id, generation)) {
        runtime.abortController = undefined
      }
    }
  }

  function applyInspection(
    job: MutableJob,
    runtime: JobRuntime,
    inspection: ClipInspection,
  ) {
    const { metadata, plan } = inspection
    const basename = createDefaultBasename({
      channel: metadata.channel,
      clipId: job.clipId,
      title: metadata.title,
    })
    const media = summarizeMediaPlan(plan)
    runtime.plan = plan
    job.basename = basename
    job.category = metadata.category
    job.channel = metadata.channel
    job.creator = metadata.creator
    job.error = undefined
    job.filename = createMp4Filename(basename, job.clipId)
    job.likeCount = metadata.likeCount
    job.media = {
      ...media,
      duration: media.duration ?? metadata.duration,
    }
    job.pageUrl = metadata.pageUrl
    job.phase = undefined
    job.publishedAt = metadata.publishedAt
    job.status = 'ready'
    job.thumbnailUrl = metadata.thumbnailUrl
    job.title = metadata.title
    job.viewCount = metadata.viewCount
    job.acknowledged = false
  }

  function updateBasename(jobId: string, value: string) {
    const job = jobs.get(jobId)

    if (!job || job.status !== 'ready') {
      return
    }

    job.basename = value
    job.filename = createMp4Filename(value, job.clipId)
    publish()
  }

  function requestDownload(jobId: string, strategy: SaveStrategy) {
    const job = jobs.get(jobId)
    const runtime = runtimes.get(jobId)

    if (!job || !runtime || job.status !== 'ready' || !runtime.plan) {
      return
    }

    job.basename = sanitizeBasename(job.basename, job.clipId)
    job.filename = createMp4Filename(job.basename, job.clipId)
    job.error = undefined
    job.saveStrategy = strategy
    runtime.saveStrategy = strategy

    if (reservedMediaJobId) {
      job.status = 'queued'
      mediaQueue.push(jobId)
      publish()
      return
    }

    reservedMediaJobId = jobId

    if (strategy === 'file-system') {
      void chooseDestination(jobId)
    } else {
      void startReservedJob(jobId)
    }
  }

  async function chooseDestination(jobId: string) {
    const job = jobs.get(jobId)
    const runtime = runtimes.get(jobId)

    if (
      !job ||
      !runtime ||
      reservedMediaJobId !== jobId ||
      !runtime.plan ||
      (job.status !== 'ready' && job.status !== 'awaiting-destination')
    ) {
      return
    }

    const picker = dependencies.getSaveFilePicker()

    if (!picker) {
      returnFileAccessToReady(
        job,
        'Direct file access is unavailable. Use the memory-backed download.',
      )
      releaseMediaSlot(jobId)
      return
    }

    job.status = 'choosing-destination'
    publish()

    let handle: FileHandleLike

    try {
      const pickerPromise = picker({
        excludeAcceptAllOption: true,
        suggestedName: job.filename,
        types: [
          {
            accept: {
              'video/mp4': ['.mp4'],
            },
            description: 'MP4 video',
          },
        ],
      })
      handle = await pickerPromise
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        job.status = 'ready'
        job.error = undefined
      } else {
        returnFileAccessToReady(
          job,
          'The file destination could not be selected. You can try again or use the memory-backed download.',
        )
      }

      releaseMediaSlot(jobId)
      return
    }

    if (reservedMediaJobId !== jobId || job.status !== 'choosing-destination') {
      return
    }

    try {
      runtime.sink = await dependencies.createFileSystemSink(handle)
      job.filename = runtime.sink.filename
    } catch (error) {
      returnFileAccessToReady(job, toDisplayError(error).message)
      releaseMediaSlot(jobId)
      return
    }

    await startReservedJob(jobId)
  }

  async function startReservedJob(jobId: string) {
    const job = jobs.get(jobId)
    const runtime = runtimes.get(jobId)

    if (!job || !runtime || !runtime.plan || reservedMediaJobId !== jobId) {
      return
    }

    const sink = runtime.sink ?? dependencies.createBlobSink(job.filename)
    const abortController = new AbortController()
    const generation = runtime.generation + 1
    runtime.abortController = abortController
    runtime.generation = generation
    runtime.sink = sink
    job.acknowledged = false
    job.completedAt = undefined
    job.completedSegments = 0
    job.error = undefined
    job.fetchedBytes = 0
    job.phase = 'fetching'
    job.processedBytes = 0
    job.startedAt = dependencies.now()
    job.status = 'active'
    job.writtenBytes = 0
    publish()

    try {
      await dependencies.downloadMediaPlan(
        runtime.plan,
        sink,
        abortController.signal,
        {
          onProgress: (progress) => {
            publishProgress(jobId, generation, progress)
          },
        },
      )
      await sink.close()

      if (!isCurrent(jobId, generation)) {
        return
      }

      flushProgressTimer(runtime)
      job.completedAt = dependencies.now()
      job.phase = undefined
      job.status = 'completed'
      job.acknowledged = false
      cleanupAttempt(runtime)
      releaseMediaSlot(jobId)
    } catch (error) {
      if (!isCurrent(jobId, generation)) {
        return
      }

      await sink.abort(error)
      const displayError = toDisplayError(error)
      flushProgressTimer(runtime)
      job.completedAt = dependencies.now()
      job.error = displayError.code === 'cancelled' ? undefined : displayError
      job.phase = undefined
      job.status = displayError.code === 'cancelled' ? 'cancelled' : 'failed'
      job.acknowledged = false
      cleanupAttempt(runtime)
      releaseMediaSlot(jobId)
    }
  }

  function publishProgress(
    jobId: string,
    generation: number,
    progress: DownloadProgress,
  ) {
    const job = jobs.get(jobId)
    const runtime = runtimes.get(jobId)

    if (!job || !runtime || !isCurrent(jobId, generation)) {
      return
    }

    job.completedSegments = progress.completedSegments
    job.fetchedBytes = progress.fetchedBytes
    job.phase = progress.phase
    job.processedBytes = progress.processedBytes
    job.writtenBytes = progress.writtenBytes

    // Retain every byte count, but avoid rerendering for every streamed chunk.
    if (runtime.progressTimer) {
      return
    }

    runtime.progressTimer = setTimeout(() => {
      runtime.progressTimer = undefined

      if (isCurrent(jobId, generation)) {
        publish()
      }
    }, PROGRESS_INTERVAL_MS)
  }

  function cancel(jobId: string) {
    const job = jobs.get(jobId)
    const runtime = runtimes.get(jobId)

    if (!job || !runtime || TERMINAL_STATUSES.has(job.status)) {
      return
    }

    runtime.generation += 1
    runtime.abortController?.abort(
      new DOMException('The operation was cancelled.', 'AbortError'),
    )
    void runtime.sink?.abort('cancelled')
    flushProgressTimer(runtime)
    removeFromQueue(inspectionQueue, jobId)
    removeFromQueue(mediaQueue, jobId)
    job.completedAt = dependencies.now()
    job.error = undefined
    job.phase = undefined
    job.status = 'cancelled'
    job.acknowledged = false
    cleanupAttempt(runtime)

    if (reservedMediaJobId === jobId) {
      releaseMediaSlot(jobId)
    } else {
      publish()
    }
  }

  function retry(jobId: string) {
    const job = jobs.get(jobId)
    const runtime = runtimes.get(jobId)

    if (!job || !runtime || !TERMINAL_STATUSES.has(job.status)) {
      return
    }

    runtime.generation += 1
    job.acknowledged = false
    job.completedAt = undefined
    job.completedSegments = 0
    job.error = undefined
    job.fetchedBytes = 0
    job.processedBytes = 0
    job.saveStrategy = undefined
    job.startedAt = undefined
    job.writtenBytes = 0

    if (runtime.plan) {
      job.phase = undefined
      job.status = 'ready'
      publish()
    } else {
      job.phase = 'inspecting'
      job.status = 'inspecting'
      inspectionQueue.push(jobId)
      publish()
      drainInspectionQueue()
    }
  }

  function remove(jobId: string) {
    const job = jobs.get(jobId)
    const runtime = runtimes.get(jobId)

    if (!job || !runtime || !REMOVABLE_STATUSES.has(job.status)) {
      return
    }

    flushProgressTimer(runtime)
    jobs.delete(jobId)
    runtimes.delete(jobId)
    publish()
  }

  function clearInactive() {
    let changed = false

    for (const [jobId, job] of jobs) {
      if (!REMOVABLE_STATUSES.has(job.status)) {
        continue
      }

      const runtime = runtimes.get(jobId)

      if (runtime) {
        flushProgressTimer(runtime)
      }

      jobs.delete(jobId)
      runtimes.delete(jobId)
      changed = true
    }

    if (changed) {
      publish()
    }
  }

  function acknowledgeAttention() {
    let changed = false

    for (const job of jobs.values()) {
      if (TERMINAL_STATUSES.has(job.status) && !job.acknowledged) {
        job.acknowledged = true
        changed = true
      }
    }

    if (changed) {
      publish()
    }
  }

  function getActivitySummary(): DownloadActivitySummary {
    return activitySummary
  }

  function releaseMediaSlot(jobId: string) {
    if (reservedMediaJobId === jobId) {
      reservedMediaJobId = undefined
    }

    advanceMediaQueue()
    publish()
  }

  function advanceMediaQueue() {
    if (reservedMediaJobId) {
      return
    }

    while (mediaQueue.length > 0) {
      const jobId = mediaQueue.shift()
      const job = jobId ? jobs.get(jobId) : undefined
      const runtime = jobId ? runtimes.get(jobId) : undefined

      if (!jobId || !job || !runtime || job.status !== 'queued') {
        continue
      }

      reservedMediaJobId = jobId

      if (runtime.saveStrategy === 'file-system') {
        // A queued picker needs a fresh user gesture, so pause for its button.
        job.status = 'awaiting-destination'
        job.acknowledged = false
      } else {
        void startReservedJob(jobId)
      }

      return
    }
  }

  function returnFileAccessToReady(job: MutableJob, message: string) {
    job.error = {
      code: 'file-access',
      message,
    }
    job.phase = undefined
    job.status = 'ready'
    job.acknowledged = false
  }

  function cleanupAttempt(runtime: JobRuntime) {
    runtime.abortController = undefined
    runtime.sink = undefined
    runtime.saveStrategy = undefined
  }

  function flushProgressTimer(runtime: JobRuntime) {
    if (runtime.progressTimer) {
      clearTimeout(runtime.progressTimer)
      runtime.progressTimer = undefined
    }
  }

  function isCurrent(jobId: string, generation: number) {
    return runtimes.get(jobId)?.generation === generation
  }

  function getRuntime(jobId: string) {
    const runtime = runtimes.get(jobId)

    if (!runtime) {
      throw new Error(`Missing runtime for download job ${jobId}.`)
    }

    return runtime
  }

  return {
    acknowledgeAttention,
    cancel,
    chooseDestination,
    clearInactive,
    getActivitySummary,
    getSnapshot,
    inspectClip,
    remove,
    requestDownload,
    retry,
    subscribe(listener: () => void) {
      listeners.add(listener)

      return () => {
        listeners.delete(listener)
      }
    },
    updateBasename,
  }
}

function createJobId() {
  const id = `clip-download-${nextJobNumber}`
  nextJobNumber += 1
  return id
}

function removeFromQueue(queue: string[], jobId: string) {
  const index = queue.indexOf(jobId)

  if (index !== -1) {
    queue.splice(index, 1)
  }
}

function activitySummariesEqual(
  left: DownloadActivitySummary,
  right: DownloadActivitySummary,
) {
  return (
    left.activeCount === right.activeCount &&
    left.attention === right.attention &&
    left.error === right.error &&
    left.queuedCount === right.queuedCount &&
    left.visible === right.visible
  )
}
