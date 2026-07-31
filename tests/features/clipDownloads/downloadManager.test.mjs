import assert from 'node:assert/strict'
import test from 'node:test'

import { createDownloadManager } from '../../../src/features/clipDownloads/downloadManagerCore.ts'
import { waitFor } from '../../support/waitFor.mjs'
import {
  createFakeHandle,
  createManagerDependencies,
  deferred,
  inspectionFor,
  job,
} from './_support/downloadManagerFixtures.mjs'

test('limits inspections to two and reuses a non-terminal clip job', async () => {
  const inspections = []
  const manager = createDownloadManager(
    createManagerDependencies({
      inspectClip: (clipId) => {
        const pending = deferred()
        inspections.push({ clipId, pending })
        return pending.promise
      },
    }),
  )

  const firstId = manager.inspectClip('clip_one', 'https://kick.com/a')
  assert.equal(
    manager.inspectClip('clip_one', 'https://kick.com/a'),
    firstId,
  )
  manager.inspectClip('clip_two', 'https://kick.com/b')
  manager.inspectClip('clip_three', 'https://kick.com/c')

  assert.deepEqual(
    inspections.map(({ clipId }) => clipId),
    ['clip_one', 'clip_two'],
  )

  inspections[0].pending.resolve(inspectionFor('clip_one'))
  await waitFor(
    () =>
      inspections.length === 3 &&
      job(manager, firstId)?.status === 'ready',
    'the first inspection to complete and release the queue',
  )
  assert.deepEqual(
    inspections.map(({ clipId }) => clipId),
    ['clip_one', 'clip_two', 'clip_three'],
  )
  assert.equal(
    manager.getSnapshot().jobs.find(({ id }) => id === firstId).status,
    'ready',
  )
  assert.deepEqual(
    {
      category: job(manager, firstId).category,
      creator: job(manager, firstId).creator,
      duration: job(manager, firstId).media.duration,
      likeCount: job(manager, firstId).likeCount,
      publishedAt: job(manager, firstId).publishedAt,
      viewCount: job(manager, firstId).viewCount,
    },
    {
      category: 'Just Chatting',
      creator: 'clipper',
      duration: 12,
      likeCount: 78,
      publishedAt: 1_785_328_496_000,
      viewCount: 1234,
    },
  )
})

test('queues media FIFO and advances a Chromium job to user confirmation', async () => {
  const pickerCalls = []
  const downloadRuns = []
  const manager = createDownloadManager(
    createManagerDependencies({
      downloadMediaPlan: async () => {
        const pending = deferred()
        downloadRuns.push(pending)
        await pending.promise
      },
      getSaveFilePicker: () => (options) => {
        pickerCalls.push(options)
        return Promise.resolve(createFakeHandle(options.suggestedName))
      },
    }),
  )

  const firstId = manager.inspectClip('clip_one', 'https://kick.com/a')
  const secondId = manager.inspectClip('clip_two', 'https://kick.com/b')
  await waitFor(
    () =>
      job(manager, firstId)?.status === 'ready' &&
      job(manager, secondId)?.status === 'ready',
    'both clip inspections to complete',
  )

  manager.requestDownload(firstId, 'memory')
  manager.requestDownload(secondId, 'file-system')
  assert.equal(job(manager, firstId).status, 'active')
  assert.equal(job(manager, secondId).status, 'queued')
  assert.equal(pickerCalls.length, 0)

  downloadRuns[0].resolve()
  await waitFor(
    () =>
      job(manager, firstId)?.status === 'completed' &&
      job(manager, secondId)?.status === 'awaiting-destination',
    'the first download to release the queued file-system job',
  )
  assert.equal(job(manager, firstId).status, 'completed')
  assert.equal(job(manager, secondId).status, 'awaiting-destination')
  assert.equal(pickerCalls.length, 0)

  void manager.chooseDestination(secondId)
  assert.equal(pickerCalls.length, 1)
  await waitFor(
    () => job(manager, secondId)?.status === 'active',
    'the selected destination to start downloading',
  )
  assert.equal(job(manager, secondId).status, 'active')

  downloadRuns[1].resolve()
  await waitFor(
    () => job(manager, secondId)?.status === 'completed',
    'the second download to complete',
  )
  assert.equal(job(manager, secondId).status, 'completed')
})

test('picker dismissal returns a reserved job to ready', async () => {
  const manager = createDownloadManager(
    createManagerDependencies({
      getSaveFilePicker: () => () =>
        Promise.reject(
          new DOMException('Dismissed', 'AbortError'),
        ),
    }),
  )
  const jobId = manager.inspectClip('clip_one', 'https://kick.com/a')
  await waitFor(
    () => job(manager, jobId)?.status === 'ready',
    'the clip inspection to complete',
  )

  manager.requestDownload(jobId, 'file-system')
  assert.equal(job(manager, jobId).status, 'choosing-destination')
  await waitFor(
    () => job(manager, jobId)?.status === 'ready',
    'picker dismissal to release the reserved job',
  )
  assert.equal(job(manager, jobId).status, 'ready')
  assert.equal(job(manager, jobId).error, undefined)
})

test('cancelling queued work preserves the remainder of the queue', async () => {
  const runs = []
  const manager = createDownloadManager(
    createManagerDependencies({
      downloadMediaPlan: async () => {
        const pending = deferred()
        runs.push(pending)
        await pending.promise
      },
    }),
  )
  const ids = ['clip_one', 'clip_two', 'clip_three'].map((clipId) =>
    manager.inspectClip(clipId, `https://kick.com/${clipId}`),
  )
  await waitFor(
    () => ids.every((id) => job(manager, id)?.status === 'ready'),
    'all queued clip inspections to complete',
  )

  for (const id of ids) {
    manager.requestDownload(id, 'memory')
  }

  manager.cancel(ids[1])
  assert.equal(job(manager, ids[1]).status, 'cancelled')
  assert.equal(job(manager, ids[2]).queuePosition, 1)

  runs[0].resolve()
  await waitFor(
    () => job(manager, ids[2])?.status === 'active',
    'the remaining queued download to start',
  )
  assert.equal(job(manager, ids[2]).status, 'active')
})

test('clears inactive jobs while preserving in-progress work', async () => {
  const runs = []
  const manager = createDownloadManager(
    createManagerDependencies({
      downloadMediaPlan: async () => {
        const pending = deferred()
        runs.push(pending)
        await pending.promise
      },
    }),
  )
  const ids = ['clip_one', 'clip_two', 'clip_three', 'clip_four'].map(
    (clipId) =>
      manager.inspectClip(clipId, `https://kick.com/${clipId}`),
  )
  await waitFor(
    () => ids.every((id) => job(manager, id)?.status === 'ready'),
    'all clip inspections to complete',
  )

  manager.requestDownload(ids[0], 'memory')
  manager.requestDownload(ids[1], 'memory')
  manager.cancel(ids[3])
  manager.clearInactive()

  assert.deepEqual(
    manager.getSnapshot().jobs.map(({ id }) => id),
    [ids[0], ids[1]],
  )
  assert.equal(job(manager, ids[0]).status, 'active')
  assert.equal(job(manager, ids[1]).status, 'queued')

  runs[0].resolve()
  await waitFor(
    () => job(manager, ids[1])?.status === 'active',
    'the queued download to become active',
  )
  manager.clearInactive()

  assert.deepEqual(
    manager.getSnapshot().jobs.map(({ id }) => id),
    [ids[1]],
  )
  assert.equal(job(manager, ids[1]).status, 'active')

  runs[1].resolve()
  await waitFor(
    () => job(manager, ids[1])?.status === 'completed',
    'the final download to complete',
  )
})

test('caches published download and activity snapshots', async () => {
  const downloadRun = deferred()
  const manager = createDownloadManager(
    createManagerDependencies({
      downloadMediaPlan: async () => {
        await downloadRun.promise
      },
    }),
  )
  const emptySnapshot = manager.getSnapshot()
  const emptyActivity = manager.getActivitySummary()

  assert.equal(manager.getSnapshot(), emptySnapshot)
  assert.equal(manager.getActivitySummary(), emptyActivity)

  const jobId = manager.inspectClip('clip_one', 'https://kick.com/a')
  const inspectingSnapshot = manager.getSnapshot()
  assert.notEqual(inspectingSnapshot, emptySnapshot)
  assert.equal(manager.getSnapshot(), inspectingSnapshot)
  assert.deepEqual(manager.getActivitySummary(), {
    activeCount: 1,
    attention: false,
    error: false,
    queuedCount: 0,
    visible: true,
  })

  await waitFor(
    () => job(manager, jobId)?.status === 'ready',
    'the clip inspection to publish its ready snapshot',
  )
  const readySnapshot = manager.getSnapshot()
  const readyActivity = manager.getActivitySummary()
  assert.notEqual(readySnapshot, inspectingSnapshot)
  assert.equal(manager.getSnapshot(), readySnapshot)
  assert.deepEqual(readyActivity, {
    activeCount: 0,
    attention: true,
    error: false,
    queuedCount: 0,
    visible: true,
  })

  manager.updateBasename(jobId, 'renamed')
  assert.notEqual(manager.getSnapshot(), readySnapshot)
  assert.equal(manager.getActivitySummary(), readyActivity)
  assert.equal(job(manager, jobId).basename, 'renamed')
  assert.ok(
    [
      'abortController',
      'generation',
      'plan',
      'progressTimer',
      'sink',
    ].every((key) => !(key in job(manager, jobId))),
  )

  manager.requestDownload(jobId, 'memory')
  assert.notEqual(manager.getActivitySummary(), readyActivity)
  assert.deepEqual(manager.getActivitySummary(), {
    activeCount: 1,
    attention: false,
    error: false,
    queuedCount: 0,
    visible: true,
  })

  downloadRun.resolve()
  await waitFor(
    () => job(manager, jobId)?.status === 'completed',
    'the download to publish its completed snapshot',
  )
})
