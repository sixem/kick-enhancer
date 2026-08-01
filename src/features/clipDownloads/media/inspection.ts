import { isValidClipId } from '../clipCards.ts'
import { ClipDownloadError } from '../errors.ts'
import { inspectMp4Probe } from './mp4Probe.ts'
import {
  fetchExactRange,
  fetchInitialMediaProbe,
  isAllowedMediaUrl,
  readResponseBytes,
  type FetchImplementation,
} from './network.ts'
import {
  MAX_PLAYLIST_BYTES,
  MAX_PROBE_BYTES,
  type ClipInspection,
  type ClipMetadata,
  type HlsTsPlan,
} from './mediaTypes.ts'
import { parseKickMediaPlaylist } from './playlist.ts'
import { inspectTransportStream } from './tsProbe.ts'

const MAX_API_RESPONSE_BYTES = 256 * 1024
const INITIAL_PROBE_BYTES = MAX_PROBE_BYTES / 2
const MAX_METADATA_TEXT_LENGTH = 300

type InspectClipOptions = Readonly<{
  fetchImplementation?: FetchImplementation
  pageUrl?: string
}>

export async function inspectClip(
  clipId: string,
  signal: AbortSignal,
  {
    fetchImplementation = fetch,
    pageUrl = window.location.href,
  }: InspectClipOptions = {},
): Promise<ClipInspection> {
  if (!isValidClipId(clipId)) {
    throw new ClipDownloadError(
      'clip-unavailable',
      'The clip link contains an invalid clip ID.',
    )
  }

  const apiUrl = new URL(
    `/api/v2/clips/${encodeURIComponent(clipId)}/play`,
    pageUrl,
  )
  const response = await fetchImplementation(apiUrl.href, {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (response.status === 404) {
    throw new ClipDownloadError(
      'clip-unavailable',
      'This clip is unavailable or has been deleted.',
    )
  }

  if (!response.ok) {
    throw new ClipDownloadError(
      'inspection-blocked',
      'KICK blocked the clip inspection request. Try again shortly.',
    )
  }

  const responseBytes = await readResponseBytes(
    response,
    MAX_API_RESPONSE_BYTES,
  )
  const payload = parseJson(responseBytes)
  const clip = getRecord(payload.clip)
  const clipUrlValue = clip?.clip_url

  if (!clip || typeof clipUrlValue !== 'string') {
    throw new ClipDownloadError(
      'clip-unavailable',
      'KICK returned incomplete clip information.',
    )
  }

  validateResponseClipId(clip, clipId)

  const clipUrl = toAllowedMediaUrl(clipUrlValue)
  const initialProbe = await fetchInitialMediaProbe(
    clipUrl.href,
    INITIAL_PROBE_BYTES,
    signal,
    fetchImplementation,
  )
  const probeText = new TextDecoder().decode(initialProbe.bytes)
  let plan

  if (probeText.startsWith('#EXTM3U')) {
    if (
      initialProbe.totalBytes > MAX_PLAYLIST_BYTES ||
      initialProbe.totalBytes !== initialProbe.bytes.byteLength
    ) {
      throw new ClipDownloadError(
        'unsupported-media',
        'The clip playlist exceeds the safe inspection limit.',
      )
    }

    plan = parseKickMediaPlaylist(probeText, {
      isAllowedMediaUrl,
      playlistUrl: clipUrl.href,
    })
    await validateTransportStreamPlan(plan, signal, fetchImplementation)
  } else {
    try {
      inspectMp4Probe(initialProbe.bytes)
    } catch (initialError) {
      const remainingProbeBytes =
        MAX_PROBE_BYTES - initialProbe.bytes.byteLength

      if (
        remainingProbeBytes <= 0 ||
        initialProbe.totalBytes <= initialProbe.bytes.byteLength
      ) {
        throw initialError
      }

      const suffixStart = Math.max(
        initialProbe.bytes.byteLength,
        initialProbe.totalBytes - remainingProbeBytes,
      )
      const suffixLength = initialProbe.totalBytes - suffixStart
      const suffix = (
        await fetchExactRange(
          clipUrl.href,
          suffixStart,
          suffixLength,
          signal,
          fetchImplementation,
        )
      ).bytes
      inspectMp4Probe(initialProbe.bytes, suffix)
    }

    plan = {
      kind: 'direct-mp4' as const,
      sourceBytes: initialProbe.totalBytes,
      url: clipUrl.href,
    }
  }

  return {
    clipId,
    metadata: normalizeMetadata(clip, pageUrl),
    plan,
  }
}

async function validateTransportStreamPlan(
  plan: HlsTsPlan,
  signal: AbortSignal,
  fetchImplementation: FetchImplementation,
) {
  const firstSegment = plan.segments[0]

  if (!firstSegment) {
    throw new ClipDownloadError(
      'unsupported-media',
      'The clip playlist does not contain media.',
    )
  }

  const probeLength = Math.min(
    MAX_PROBE_BYTES,
    firstSegment.length ?? MAX_PROBE_BYTES,
  )
  const probeBytes =
    firstSegment.length === undefined
      ? (
          await fetchInitialMediaProbe(
            firstSegment.url,
            probeLength,
            signal,
            fetchImplementation,
          )
        ).bytes
      : (
          await fetchExactRange(
            firstSegment.url,
            firstSegment.offset ?? 0,
            probeLength,
            signal,
            fetchImplementation,
          )
        ).bytes
  inspectTransportStream(probeBytes)
}

function normalizeMetadata(
  clip: Record<string, unknown>,
  pageUrl: string,
): ClipMetadata {
  const category = getRecord(clip.category)
  const channel = getRecord(clip.channel)
  const creator = getRecord(clip.creator) ?? getRecord(clip.user)

  return {
    category: firstSafeString(category?.name, clip.category),
    channel: firstSafeString(channel?.username, channel?.slug, channel?.name),
    creator: firstSafeString(creator?.username, creator?.name),
    duration: safeDuration(clip.duration),
    likeCount: safeCount(clip.likes),
    pageUrl,
    publishedAt: safeTimestamp(clip.created_at),
    thumbnailUrl: safeThumbnailUrl(clip.thumbnail_url ?? clip.thumbnail),
    title: firstSafeString(clip.title),
    viewCount: safeCount(clip.views),
  }
}

function validateResponseClipId(
  clip: Record<string, unknown>,
  expectedClipId: string,
) {
  const declaredIds = [clip.id, clip.clip_id].filter(
    (value): value is string =>
      typeof value === 'string' && value.startsWith('clip_'),
  )

  if (
    declaredIds.length > 0 &&
    declaredIds.some((value) => value !== expectedClipId)
  ) {
    throw new ClipDownloadError(
      'clip-unavailable',
      'KICK returned information for a different clip.',
    )
  }
}

function parseJson(bytes: Uint8Array): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(new TextDecoder().decode(bytes))
    const record = getRecord(value)

    if (record) {
      return record
    }
  } catch {
    // Normalized below.
  }

  throw new ClipDownloadError(
    'clip-unavailable',
    'KICK returned malformed clip information.',
  )
}

function getRecord(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

function firstSafeString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value !== 'string') {
      continue
    }

    const normalized = value.replace(/\s+/g, ' ').trim()

    if (normalized) {
      return normalized.slice(0, MAX_METADATA_TEXT_LENGTH)
    }
  }

  return undefined
}

function safeDuration(value: unknown) {
  return typeof value === 'number' &&
    Number.isFinite(value) &&
    value > 0 &&
    value <= 180
    ? value
    : undefined
}

function safeCount(value: unknown) {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
    ? value
    : undefined
}

function safeTimestamp(value: unknown) {
  if (typeof value !== 'string') {
    return undefined
  }

  const timestamp = Date.parse(value)

  return Number.isFinite(timestamp) ? timestamp : undefined
}

function safeThumbnailUrl(value: unknown) {
  if (typeof value !== 'string') {
    return undefined
  }

  try {
    const url = new URL(value)

    return url.protocol === 'https:' &&
      (url.hostname === 'kick.com' || url.hostname.endsWith('.kick.com'))
      ? url.href
      : undefined
  } catch {
    return undefined
  }
}

function toAllowedMediaUrl(value: string) {
  let url: URL

  try {
    url = new URL(value)
  } catch {
    throw new ClipDownloadError(
      'unsupported-media',
      'KICK returned an invalid clip media URL.',
    )
  }

  if (!isAllowedMediaUrl(url)) {
    throw new ClipDownloadError(
      'unsupported-media',
      'KICK returned an untrusted clip media URL.',
    )
  }

  return url
}
