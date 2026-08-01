import {
  copyBytesToArrayBuffer,
  toWritableBufferSource,
} from './byteBuffers.ts'
import { ClipDownloadError } from './errors.ts'

export type OutputSink = Readonly<{
  abort: (reason?: unknown) => Promise<void>
  close: () => Promise<void>
  filename: string
  write: (bytes: Uint8Array) => Promise<void>
}>

type WritableFileStreamLike = Readonly<{
  abort: (reason?: unknown) => Promise<void>
  close: () => Promise<void>
  write: (data: BufferSource) => Promise<void>
}>

export type FileHandleLike = Readonly<{
  createWritable: (
    options?: Readonly<{
      keepExistingData?: boolean
      mode?: 'exclusive' | 'siloed'
    }>,
  ) => Promise<WritableFileStreamLike>
  name: string
}>

export type SaveFilePicker = (
  options: Readonly<{
    excludeAcceptAllOption: boolean
    suggestedName: string
    types: readonly Readonly<{
      accept: Readonly<Record<string, readonly string[]>>
      description: string
    }>[]
  }>,
) => Promise<FileHandleLike>

export function getSaveFilePicker() {
  const browserWindow = window as typeof window & {
    showSaveFilePicker?: SaveFilePicker
  }

  return browserWindow.showSaveFilePicker?.bind(browserWindow)
}

export async function createFileSystemSink(
  handle: FileHandleLike,
): Promise<OutputSink> {
  let writable: WritableFileStreamLike

  try {
    try {
      writable = await handle.createWritable({
        keepExistingData: false,
        mode: 'exclusive',
      })
    } catch (error) {
      if (!(error instanceof TypeError)) {
        throw error
      }

      writable = await handle.createWritable({
        keepExistingData: false,
      })
    }
  } catch (error) {
    throw new ClipDownloadError(
      'file-access',
      error instanceof DOMException && error.name === 'NotAllowedError'
        ? 'Permission to write the selected file was denied.'
        : 'The selected file could not be opened for writing.',
    )
  }

  return {
    abort: async (reason) => {
      try {
        await writable.abort(reason)
      } catch {
        // The stream may already be closed or aborted.
      }
    },
    close: async () => {
      try {
        await writable.close()
      } catch {
        throw new ClipDownloadError(
          'file-write',
          'The MP4 file could not be finalized.',
        )
      }
    },
    filename: handle.name,
    write: async (bytes) => {
      try {
        await writable.write(toWritableBufferSource(bytes))
      } catch {
        throw new ClipDownloadError(
          'file-write',
          'The MP4 file could not be written.',
        )
      }
    },
  }
}

export function createBlobSink(
  filename: string,
  triggerDownload: (blob: Blob, filename: string) => void = triggerBlobDownload,
): OutputSink {
  let parts: BlobPart[] = []
  let closed = false

  return {
    abort: async () => {
      parts = []
      closed = true
    },
    close: async () => {
      if (closed) {
        return
      }

      const blob = new Blob(parts, {
        type: 'video/mp4',
      })
      parts = []
      closed = true
      triggerDownload(blob, filename)
    },
    filename,
    write: async (bytes) => {
      if (closed) {
        throw new ClipDownloadError(
          'file-write',
          'The memory-backed output is already closed.',
        )
      }

      parts.push(copyBytesToArrayBuffer(bytes))
    },
  }
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.download = filename
  anchor.href = url
  anchor.style.display = 'none'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()

  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}
