export type DownloadErrorCode =
  | 'cancelled'
  | 'clip-unavailable'
  | 'file-access'
  | 'file-write'
  | 'inspection-blocked'
  | 'media-request'
  | 'transmuxing'
  | 'unsupported-media'

export class ClipDownloadError extends Error {
  readonly code: DownloadErrorCode

  constructor(code: DownloadErrorCode, message: string) {
    super(message)
    this.name = 'ClipDownloadError'
    this.code = code
  }
}

export function toDisplayError(error: unknown) {
  if (error instanceof ClipDownloadError) {
    return {
      code: error.code,
      message: error.message,
    } as const
  }

  if (error instanceof DOMException && error.name === 'AbortError') {
    return {
      code: 'cancelled',
      message: 'The operation was cancelled.',
    } as const
  }

  return {
    code: 'media-request',
    message: 'The clip download could not be completed.',
  } as const
}
