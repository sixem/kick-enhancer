import { ClipDownloadError } from './errors.ts'
import {
  MAX_INPUT_BYTES,
  MAX_SEGMENTS,
  type HlsTsPlan,
} from './mediaTypes.ts'

type PlaylistParserOptions = Readonly<{
  isAllowedMediaUrl: (url: URL) => boolean
  playlistUrl: string
}>

const UNSUPPORTED_TAGS = [
  '#EXT-X-BYTERANGE-START',
  '#EXT-X-DISCONTINUITY',
  '#EXT-X-GAP',
  '#EXT-X-I-FRAMES-ONLY',
  '#EXT-X-I-FRAME-STREAM-INF',
  '#EXT-X-KEY',
  '#EXT-X-MAP',
  '#EXT-X-MEDIA:',
  '#EXT-X-PART',
  '#EXT-X-PRELOAD-HINT',
  '#EXT-X-RENDITION-REPORT',
  '#EXT-X-SKIP',
  '#EXT-X-STREAM-INF',
] as const

const ALLOWED_TAG_PREFIXES = [
  '#EXTM3U',
  '#EXT-X-ENDLIST',
  '#EXT-X-INDEPENDENT-SEGMENTS',
  '#EXT-X-MEDIA-SEQUENCE:',
  '#EXT-X-PLAYLIST-TYPE:',
  '#EXT-X-PROGRAM-DATE-TIME:',
  '#EXT-X-TARGETDURATION:',
  '#EXT-X-VERSION:',
] as const

// Fail closed on HLS layouts the transmuxing pipeline has not been tested to
// interpret safely.
export function parseKickMediaPlaylist(
  text: string,
  {
    isAllowedMediaUrl,
    playlistUrl: playlistUrlValue,
  }: PlaylistParserOptions,
): HlsTsPlan {
  const playlistUrl = toUrl(playlistUrlValue)
  const lines = text.split(/\r?\n/)
  const segments = []
  let ended = false
  let pendingDuration: number | undefined
  let pendingRange:
    | Readonly<{
        length: number
        offset: number
      }>
    | undefined

  if (lines[0]?.trim() !== '#EXTM3U') {
    unsupported('The clip response is not an HLS playlist.')
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      continue
    }

    if (line === '#EXT-X-ENDLIST') {
      ended = true
      continue
    }

    if (line.startsWith('#EXTINF:')) {
      if (pendingDuration !== undefined) {
        unsupported('The playlist contains an incomplete segment.')
      }

      const durationText = line.slice('#EXTINF:'.length).split(',')[0]
      const duration = Number(durationText)

      if (!Number.isFinite(duration) || duration <= 0) {
        unsupported('The playlist contains an invalid segment duration.')
      }

      pendingDuration = duration
      continue
    }

    if (line.startsWith('#EXT-X-BYTERANGE:')) {
      const match = /^#EXT-X-BYTERANGE:(\d+)@(\d+)$/.exec(line)

      if (!match) {
        unsupported(
          'The playlist uses an unsupported implicit byte range.',
        )
      }

      const length = Number(match[1])
      const offset = Number(match[2])

      validateRange(offset, length)

      if (length > MAX_INPUT_BYTES) {
        unsupported(
          'A clip segment exceeds the safe processing limit.',
        )
      }

      pendingRange = {
        length,
        offset,
      }
      continue
    }

    if (line.startsWith('#')) {
      if (
        UNSUPPORTED_TAGS.some((tag) => line.startsWith(tag))
      ) {
        unsupported('The clip uses an unsupported HLS layout.')
      }

      if (
        !ALLOWED_TAG_PREFIXES.some((tag) => line.startsWith(tag))
      ) {
        unsupported(`The clip uses an unsupported HLS tag: ${line}`)
      }

      continue
    }

    if (pendingDuration === undefined) {
      unsupported('The playlist segment is missing its duration.')
    }

    if (segments.length >= MAX_SEGMENTS) {
      unsupported('The clip contains too many media segments.')
    }

    const mediaUrl = new URL(line, playlistUrl)

    if (!isAllowedMediaUrl(mediaUrl)) {
      unsupported('The playlist contains an untrusted media URL.')
    }

    segments.push({
      duration: pendingDuration,
      index: segments.length,
      ...(pendingRange ?? {}),
      url: mediaUrl.href,
    })
    pendingDuration = undefined
    pendingRange = undefined
  }

  if (!ended) {
    unsupported('Only completed clip playlists are supported.')
  }

  if (
    segments.length === 0 ||
    pendingDuration !== undefined ||
    pendingRange !== undefined
  ) {
    unsupported('The playlist does not contain complete media segments.')
  }

  validateNonOverlappingRanges(segments)

  const hasExactSize = segments.every(
    (segment) => segment.length !== undefined,
  )
  const sourceBytes = hasExactSize
    ? segments.reduce((total, segment) => {
        const next = total + (segment.length ?? 0)

        if (!Number.isSafeInteger(next)) {
          unsupported('The playlist media size is invalid.')
        }

        return next
      }, 0)
    : undefined

  return {
    duration: segments.reduce(
      (total, segment) => total + segment.duration,
      0,
    ),
    kind: 'hls-ts',
    playlistUrl: playlistUrl.href,
    segments,
    sourceBytes,
    uniqueSourceObjectCount: new Set(
      segments.map((segment) => segment.url),
    ).size,
  }
}

function validateRange(offset: number, length: number) {
  const inclusiveEnd = offset + length - 1

  if (
    !Number.isSafeInteger(offset) ||
    !Number.isSafeInteger(length) ||
    offset < 0 ||
    length <= 0 ||
    !Number.isSafeInteger(inclusiveEnd)
  ) {
    unsupported('The playlist contains an invalid byte range.')
  }
}

function validateNonOverlappingRanges(
  segments: readonly Readonly<{
    length?: number
    offset?: number
    url: string
  }>[],
) {
  const rangesByUrl = new Map<
    string,
    Array<Readonly<{ end: number; start: number }>>
  >()

  for (const segment of segments) {
    if (segment.length === undefined || segment.offset === undefined) {
      continue
    }

    const ranges = rangesByUrl.get(segment.url) ?? []
    ranges.push({
      end: segment.offset + segment.length - 1,
      start: segment.offset,
    })
    rangesByUrl.set(segment.url, ranges)
  }

  for (const ranges of rangesByUrl.values()) {
    ranges.sort((left, right) => left.start - right.start)

    for (let index = 1; index < ranges.length; index += 1) {
      if (ranges[index].start <= ranges[index - 1].end) {
        unsupported('The playlist contains overlapping byte ranges.')
      }
    }
  }
}

function toUrl(value: string) {
  try {
    return new URL(value)
  } catch {
    unsupported('The clip playlist URL is invalid.')
  }
}

function unsupported(message: string): never {
  throw new ClipDownloadError('unsupported-media', message)
}
