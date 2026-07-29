import { ClipDownloadError } from './errors.ts'

export type FetchImplementation = typeof fetch

export type ContentRange = Readonly<{
  end: number
  start: number
  total: number
}>

export const ALLOWED_MEDIA_HOSTS = new Set(['clips.kick.com'])

export function isAllowedMediaUrl(url: URL) {
  return (
    url.protocol === 'https:' &&
    ALLOWED_MEDIA_HOSTS.has(url.hostname.toLowerCase())
  )
}

export async function readResponseBytes(
  response: Response,
  maximumBytes: number,
  expectedBytes?: number,
) {
  const reader = response.body?.getReader()

  if (!reader) {
    throw new ClipDownloadError(
      'media-request',
      'The media response did not contain a readable body.',
    )
  }

  const chunks = []
  let receivedBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      receivedBytes += value.byteLength

      if (receivedBytes > maximumBytes) {
        await reader.cancel()
        throw new ClipDownloadError(
          'unsupported-media',
          'The media response exceeded the inspection limit.',
        )
      }

      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }

  if (
    expectedBytes !== undefined &&
    receivedBytes !== expectedBytes
  ) {
    throw new ClipDownloadError(
      'media-request',
      'The media response was truncated.',
    )
  }

  const bytes = new Uint8Array(receivedBytes)
  let offset = 0

  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }

  return bytes
}

export async function fetchExactRange(
  url: string,
  start: number,
  length: number,
  signal: AbortSignal,
  fetchImplementation: FetchImplementation = fetch,
) {
  const end = start + length - 1
  const response = await fetchImplementation(url, {
    headers: {
      Range: `bytes=${start}-${end}`,
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
    contentRange.start !== start ||
    contentRange.end !== end ||
    contentRange.total <= end
  ) {
    await response.body?.cancel()
    throw new ClipDownloadError(
      'media-request',
      'The media server returned an unexpected byte range.',
    )
  }

  return {
    bytes: await readResponseBytes(response, length, length),
    contentRange,
  }
}

export async function fetchInitialMediaProbe(
  url: string,
  maximumBytes: number,
  signal: AbortSignal,
  fetchImplementation: FetchImplementation = fetch,
) {
  const response = await fetchImplementation(url, {
    headers: {
      Range: `bytes=0-${maximumBytes - 1}`,
    },
    signal,
  })

  validateFinalMediaUrl(response)

  if (response.status === 206) {
    const contentRange = parseContentRange(
      response.headers.get('content-range'),
    )

    if (
      contentRange.start !== 0 ||
      contentRange.end >= maximumBytes ||
      (contentRange.end < maximumBytes - 1 &&
        contentRange.end !== contentRange.total - 1)
    ) {
      await response.body?.cancel()
      throw new ClipDownloadError(
        'media-request',
        'The media server returned an unexpected probe range.',
      )
    }

    const length = contentRange.end + 1

    return {
      bytes: await readResponseBytes(response, length, length),
      totalBytes: contentRange.total,
    }
  }

  if (!response.ok) {
    throw new ClipDownloadError(
      'media-request',
      'The clip media could not be inspected.',
    )
  }

  const declaredLength = parseContentLength(
    response.headers.get('content-length'),
  )

  if (declaredLength === undefined || declaredLength > maximumBytes) {
    await response.body?.cancel()
    throw new ClipDownloadError(
      'unsupported-media',
      'The media server ignored the bounded inspection request.',
    )
  }

  return {
    bytes: await readResponseBytes(
      response,
      maximumBytes,
      declaredLength,
    ),
    totalBytes: declaredLength,
  }
}

export function parseContentRange(value: string | null): ContentRange {
  const match = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(value ?? '')

  if (!match) {
    throw new ClipDownloadError(
      'media-request',
      'The media response did not contain a valid byte range.',
    )
  }

  const start = Number(match[1])
  const end = Number(match[2])
  const total = Number(match[3])

  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    !Number.isSafeInteger(total) ||
    start < 0 ||
    end < start ||
    total <= end
  ) {
    throw new ClipDownloadError(
      'media-request',
      'The media response contained an invalid byte range.',
    )
  }

  return {
    end,
    start,
    total,
  }
}

// fetch follows redirects, so trust is decided from the final response URL
// rather than only from the requested URL.
export function validateFinalMediaUrl(response: Response) {
  let finalUrl: URL

  try {
    finalUrl = new URL(response.url)
  } catch {
    throw new ClipDownloadError(
      'media-request',
      'The media server returned an invalid final URL.',
    )
  }

  if (!isAllowedMediaUrl(finalUrl)) {
    response.body?.cancel().catch(() => undefined)
    throw new ClipDownloadError(
      'media-request',
      'The media request redirected to an untrusted host.',
    )
  }
}

function parseContentLength(value: string | null) {
  if (!value || !/^\d+$/.test(value)) {
    return undefined
  }

  const length = Number(value)

  return Number.isSafeInteger(length) && length >= 0
    ? length
    : undefined
}
