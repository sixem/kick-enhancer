import { ClipDownloadError } from './errors'
import { MAX_INPUT_BYTES, type HlsSegment, type MediaPlan } from './mediaTypes'
import {
  type FetchImplementation,
  parseContentRange,
  validateFinalMediaUrl,
} from './network'
import { type OutputSink } from './outputSinks'
import { TransmuxWorkerClient, type TransmuxedFragment } from './workerClient'

const WORKER_INPUT_CHUNK_BYTES = 256 * 1024

export type DownloadProgress = Readonly<{
  completedSegments: number
  fetchedBytes: number
  phase: 'fetching' | 'transmuxing' | 'writing'
  processedBytes: number
  writtenBytes: number
}>

type DownloadMediaOptions = Readonly<{
  createWorker?: () => TransmuxWorker
  fetchImplementation?: FetchImplementation
  onProgress?: (progress: DownloadProgress) => void
}>

type TransmuxWorker = Readonly<{
  flush: () => Promise<TransmuxedFragment>
  push: (bytes: Uint8Array) => Promise<void>
  terminate: (reason?: string) => void
}>

export async function downloadMediaPlan(
  plan: MediaPlan,
  sink: OutputSink,
  signal: AbortSignal,
  {
    createWorker = () => new TransmuxWorkerClient(),
    fetchImplementation = fetch,
    onProgress = () => undefined,
  }: DownloadMediaOptions = {},
) {
  if (plan.kind === 'direct-mp4') {
    await downloadDirectMp4(
      plan.url,
      plan.sourceBytes,
      sink,
      signal,
      fetchImplementation,
      onProgress,
    )
    return
  }

  const worker = createWorker()
  let completedSegments = 0
  let fetchedBytes = 0
  let processedBytes = 0
  let writtenBytes = 0

  try {
    for (const segment of plan.segments) {
      assertNotAborted(signal)
      const segmentBytes = await pushSegment(
        segment,
        worker,
        signal,
        fetchImplementation,
        (chunkBytes) => {
          fetchedBytes += chunkBytes
          onProgress({
            completedSegments,
            fetchedBytes,
            phase: 'fetching',
            processedBytes,
            writtenBytes,
          })
        },
      )

      onProgress({
        completedSegments,
        fetchedBytes,
        phase: 'transmuxing',
        processedBytes,
        writtenBytes,
      })
      const fragment = await worker.flush()
      processedBytes += segmentBytes

      onProgress({
        completedSegments,
        fetchedBytes,
        phase: 'writing',
        processedBytes,
        writtenBytes,
      })

      if (fragment.initSegment) {
        await sink.write(fragment.initSegment)
      }

      await sink.write(fragment.data)
      writtenBytes += segmentBytes
      completedSegments += 1
      onProgress({
        completedSegments,
        fetchedBytes,
        phase: 'fetching',
        processedBytes,
        writtenBytes,
      })
    }
  } finally {
    worker.terminate()
  }
}

async function pushSegment(
  segment: HlsSegment,
  worker: TransmuxWorker,
  signal: AbortSignal,
  fetchImplementation: FetchImplementation,
  onFetched: (bytes: number) => void,
) {
  if (segment.length !== undefined && segment.offset !== undefined) {
    const end = segment.offset + segment.length - 1
    const response = await fetchImplementation(segment.url, {
      headers: {
        Range: `bytes=${segment.offset}-${end}`,
      },
      signal,
    })
    validateFinalMediaUrl(response)

    if (response.status !== 206) {
      await response.body?.cancel()
      throw new ClipDownloadError(
        'media-request',
        'The media server did not honor a required byte range.',
      )
    }

    const contentRange = parseContentRange(
      response.headers.get('content-range'),
    )

    if (
      contentRange.start !== segment.offset ||
      contentRange.end !== end ||
      contentRange.total <= end
    ) {
      await response.body?.cancel()
      throw new ClipDownloadError(
        'media-request',
        'The media server returned an unexpected byte range.',
      )
    }

    return streamSegmentResponse(
      response,
      segment.length,
      worker,
      signal,
      onFetched,
    )
  }

  const response = await fetchImplementation(segment.url, {
    signal,
  })
  validateFinalMediaUrl(response)

  if (!response.ok) {
    throw new ClipDownloadError(
      'media-request',
      'A clip media segment could not be downloaded.',
    )
  }

  return streamSegmentResponse(response, undefined, worker, signal, onFetched)
}

async function streamSegmentResponse(
  response: Response,
  expectedBytes: number | undefined,
  worker: TransmuxWorker,
  signal: AbortSignal,
  onFetched: (bytes: number) => void,
) {
  const reader = response.body?.getReader()

  if (!reader) {
    throw new ClipDownloadError(
      'media-request',
      'A clip media segment did not contain a readable body.',
    )
  }

  let segmentBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      segmentBytes += value.byteLength

      if (segmentBytes > MAX_INPUT_BYTES) {
        await reader.cancel()
        throw new ClipDownloadError(
          'unsupported-media',
          'A clip segment exceeds the safe processing limit.',
        )
      }

      onFetched(value.byteLength)
      await pushBoundedChunks(value, worker, signal)
    }
  } finally {
    reader.releaseLock()
  }

  if (expectedBytes !== undefined && segmentBytes !== expectedBytes) {
    throw new ClipDownloadError(
      'media-request',
      'A clip media segment was truncated.',
    )
  }

  return segmentBytes
}

async function pushBoundedChunks(
  bytes: Uint8Array,
  worker: TransmuxWorker,
  signal: AbortSignal,
) {
  for (
    let offset = 0;
    offset < bytes.byteLength;
    offset += WORKER_INPUT_CHUNK_BYTES
  ) {
    assertNotAborted(signal)
    await worker.push(bytes.subarray(offset, offset + WORKER_INPUT_CHUNK_BYTES))
  }
}

async function downloadDirectMp4(
  url: string,
  expectedBytes: number | undefined,
  sink: OutputSink,
  signal: AbortSignal,
  fetchImplementation: FetchImplementation,
  onProgress: (progress: DownloadProgress) => void,
) {
  const response = await fetchImplementation(url, {
    signal,
  })
  validateFinalMediaUrl(response)

  if (!response.ok) {
    throw new ClipDownloadError(
      'media-request',
      'The MP4 clip could not be downloaded.',
    )
  }

  const reader = response.body?.getReader()

  if (!reader) {
    throw new ClipDownloadError(
      'media-request',
      'The MP4 response did not contain a readable body.',
    )
  }

  let fetchedBytes = 0
  let pendingChunks: Uint8Array[] = []
  const signaturePrefix = new Uint8Array(64)
  let signatureBytes = 0
  let signatureChecked = false
  let writtenBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      assertNotAborted(signal)
      fetchedBytes += value.byteLength

      if (!signatureChecked) {
        pendingChunks.push(value)
        const copyBytes = Math.min(
          signaturePrefix.byteLength - signatureBytes,
          value.byteLength,
        )
        signaturePrefix.set(value.subarray(0, copyBytes), signatureBytes)
        signatureBytes += copyBytes

        if (signatureBytes < signaturePrefix.byteLength) {
          continue
        }

        if (!isMp4Prefix(signaturePrefix)) {
          await reader.cancel()
          throw new ClipDownloadError(
            'media-request',
            'The direct media response is no longer a valid MP4 file.',
          )
        }

        signatureChecked = true

        for (const pendingChunk of pendingChunks) {
          writtenBytes = await writeDirectChunk(
            pendingChunk,
            sink,
            fetchedBytes,
            onProgress,
            writtenBytes,
          )
        }

        pendingChunks = []
        continue
      }

      writtenBytes = await writeDirectChunk(
        value,
        sink,
        fetchedBytes,
        onProgress,
        writtenBytes,
      )
    }
  } finally {
    reader.releaseLock()
  }

  if (!signatureChecked) {
    if (!isMp4Prefix(signaturePrefix.subarray(0, signatureBytes))) {
      throw new ClipDownloadError(
        'media-request',
        'The direct media response is no longer a valid MP4 file.',
      )
    }

    for (const pendingChunk of pendingChunks) {
      writtenBytes = await writeDirectChunk(
        pendingChunk,
        sink,
        fetchedBytes,
        onProgress,
        writtenBytes,
      )
    }
  }

  if (expectedBytes !== undefined && fetchedBytes !== expectedBytes) {
    throw new ClipDownloadError(
      'media-request',
      'The MP4 response size changed after inspection.',
    )
  }

  onProgress({
    completedSegments: 1,
    fetchedBytes,
    phase: 'writing',
    processedBytes: fetchedBytes,
    writtenBytes: fetchedBytes,
  })
}

async function writeDirectChunk(
  bytes: Uint8Array,
  sink: OutputSink,
  fetchedBytes: number,
  onProgress: (progress: DownloadProgress) => void,
  startingWrittenBytes: number,
) {
  let chunkWritten = 0

  for (let offset = 0; offset < bytes.byteLength; offset += MAX_INPUT_BYTES) {
    const chunk = bytes.subarray(offset, offset + MAX_INPUT_BYTES)
    onProgress({
      completedSegments: 0,
      fetchedBytes,
      phase: 'writing',
      processedBytes: fetchedBytes,
      writtenBytes: startingWrittenBytes + chunkWritten,
    })
    await sink.write(chunk)
    chunkWritten += chunk.byteLength
  }

  onProgress({
    completedSegments: 0,
    fetchedBytes,
    phase: 'fetching',
    processedBytes: fetchedBytes,
    writtenBytes: startingWrittenBytes + chunkWritten,
  })

  return startingWrittenBytes + chunkWritten
}

function isMp4Prefix(bytes: Uint8Array) {
  const searchEnd = Math.min(64, bytes.byteLength - 4)

  for (let index = 4; index <= searchEnd; index += 1) {
    if (
      bytes[index] === 0x66 &&
      bytes[index + 1] === 0x74 &&
      bytes[index + 2] === 0x79 &&
      bytes[index + 3] === 0x70
    ) {
      return true
    }
  }

  return false
}

function assertNotAborted(signal: AbortSignal) {
  if (signal.aborted) {
    throw signal.reason instanceof Error
      ? signal.reason
      : new DOMException('The operation was aborted.', 'AbortError')
  }
}
