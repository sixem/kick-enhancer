import { normalizeChannelSlug } from './slug.ts'
import type {
  CurrentViewerRecord,
  ViewerCountEndpoint,
  ViewerCountRecord,
  ViewerCountSource,
} from './types.ts'
import { parseStreamStartedAt } from './uptime.ts'

export type NormalizedViewerCountPayload =
  | Readonly<{
      currentViewers: readonly CurrentViewerRecord[]
      kind: 'current-viewers'
    }>
  | Readonly<{
      kind: 'streams'
      streams: readonly ViewerCountRecord[]
    }>

const SOURCE_BY_ENDPOINT: Readonly<
  Record<Exclude<ViewerCountEndpoint, 'CURRENT_VIEWERS'>, ViewerCountSource>
> = {
  CHANNEL_DETAILS: 'channel-details',
  FEATURED_LIVESTREAMS: 'featured',
  FOLLOWED_CHANNELS: 'followed-channels',
  PAGINATED_RECOMMENDED_LIVESTREAMS: 'recommendations',
  RECOMMENDED_LIVESTREAMS: 'recommendations',
  SIDEBAR_LIVESTREAMS: 'sidebar-recommendations',
  USER_LIVESTREAMS: 'user-livestreams',
}

export function normalizeViewerCountPayload(
  endpoint: ViewerCountEndpoint,
  payload: unknown,
  capturedAt: number,
): NormalizedViewerCountPayload {
  if (endpoint === 'CURRENT_VIEWERS') {
    return {
      currentViewers: normalizeCurrentViewers(payload, capturedAt),
      kind: 'current-viewers',
    }
  }

  const source = SOURCE_BY_ENDPOINT[endpoint]
  let values: readonly unknown[] = []

  if (
    endpoint === 'SIDEBAR_LIVESTREAMS' ||
    endpoint === 'FEATURED_LIVESTREAMS' ||
    endpoint === 'PAGINATED_RECOMMENDED_LIVESTREAMS'
  ) {
    values = readNestedArray(payload, 'data', 'livestreams')
  } else if (endpoint === 'RECOMMENDED_LIVESTREAMS') {
    values = readNestedArray(payload, 'data')
  } else if (endpoint === 'FOLLOWED_CHANNELS') {
    values = readNestedArray(payload, 'channels')
  } else if (endpoint === 'USER_LIVESTREAMS') {
    values = Array.isArray(payload) ? payload : []
  } else {
    values = [payload]
  }

  const streams = values
    .map((value) =>
      normalizeStream(endpoint, source, value, capturedAt),
    )
    .filter(
      (stream): stream is ViewerCountRecord => stream !== undefined,
    )

  return {
    kind: 'streams',
    streams,
  }
}

function normalizeStream(
  endpoint: Exclude<ViewerCountEndpoint, 'CURRENT_VIEWERS'>,
  source: ViewerCountSource,
  value: unknown,
  capturedAt: number,
) {
  if (!isRecord(value)) {
    return undefined
  }

  if (endpoint === 'CHANNEL_DETAILS') {
    return normalizeChannelDetails(value, source, capturedAt)
  }

  if (endpoint === 'FOLLOWED_CHANNELS') {
    return normalizeFollowedChannel(value, source, capturedAt)
  }

  if (endpoint === 'USER_LIVESTREAMS') {
    return normalizeUserLivestream(value, source, capturedAt)
  }

  return normalizeRecommendation(value, source, capturedAt)
}

function normalizeChannelDetails(
  channel: Record<string, unknown>,
  source: ViewerCountSource,
  capturedAt: number,
) {
  if (!isRecord(channel.livestream)) {
    return undefined
  }

  const livestream = channel.livestream
  const livestreamChannel = isRecord(livestream.channel)
    ? livestream.channel
    : undefined
  const channelSlug =
    normalizeChannelSlug(channel.slug) ??
    normalizeChannelSlug(livestreamChannel?.slug)
  const viewerCount =
    readCount(livestream.viewer_count) ??
    readCount(livestream.viewers)
  const startedAt = readStreamStartedAt(livestream)

  if (!channelSlug || viewerCount === undefined) {
    return undefined
  }

  return createRecord({
    capturedAt,
    channelId:
      readId(channel.id) ?? readId(livestream.channel_id),
    channelSlug,
    isLive: readBoolean(
      livestream.is_live ?? channel.is_live,
      true,
    ),
    livestreamId: readId(livestream.id),
    showViewCount: readBoolean(
      livestream.show_view_count ?? channel.show_view_count,
      true,
    ),
    source,
    ...(startedAt === undefined ? {} : { startedAt }),
    viewerCount,
  })
}

function normalizeFollowedChannel(
  channel: Record<string, unknown>,
  source: ViewerCountSource,
  capturedAt: number,
) {
  const channelSlug = normalizeChannelSlug(channel.channel_slug)
  const viewerCount = readCount(channel.viewer_count)
  const isLive = readBoolean(channel.is_live, false)
  const startedAt = readStreamStartedAt(channel)

  if (!channelSlug || viewerCount === undefined || !isLive) {
    return undefined
  }

  return createRecord({
    capturedAt,
    channelSlug,
    isLive,
    showViewCount: readBoolean(channel.show_view_count, true),
    source,
    ...(startedAt === undefined ? {} : { startedAt }),
    viewerCount,
  })
}

function normalizeUserLivestream(
  livestream: Record<string, unknown>,
  source: ViewerCountSource,
  capturedAt: number,
) {
  const channel = isRecord(livestream.channel)
    ? livestream.channel
    : undefined
  const channelSlug = normalizeChannelSlug(channel?.slug)
  const viewerCount =
    readCount(livestream.viewer_count) ??
    readCount(livestream.viewers)
  const isLive = readBoolean(livestream.is_live, false)
  const startedAt = readStreamStartedAt(livestream)

  if (!channelSlug || viewerCount === undefined || !isLive) {
    return undefined
  }

  return createRecord({
    capturedAt,
    channelId:
      readId(channel?.id) ?? readId(livestream.channel_id),
    channelSlug,
    isLive,
    livestreamId: readId(livestream.id),
    showViewCount: readBoolean(
      livestream.show_view_count,
      true,
    ),
    source,
    ...(startedAt === undefined ? {} : { startedAt }),
    viewerCount,
  })
}

function normalizeRecommendation(
  livestream: Record<string, unknown>,
  source: ViewerCountSource,
  capturedAt: number,
) {
  const channel = isRecord(livestream.channel)
    ? livestream.channel
    : undefined
  const channelSlug = normalizeChannelSlug(channel?.slug)
  const viewerCount = readCount(livestream.viewer_count)
  const startedAt = readStreamStartedAt(livestream)

  if (!channelSlug || viewerCount === undefined) {
    return undefined
  }

  return createRecord({
    capturedAt,
    channelId: readId(channel?.id),
    channelSlug,
    isLive: true,
    livestreamId: readId(livestream.id),
    showViewCount: readBoolean(
      livestream.show_view_count,
      true,
    ),
    source,
    ...(startedAt === undefined ? {} : { startedAt }),
    viewerCount,
  })
}

function readStreamStartedAt(stream: Record<string, unknown>) {
  return (
    parseStreamStartedAt(stream.start_time) ??
    parseStreamStartedAt(stream.started_at) ??
    parseStreamStartedAt(stream.created_at)
  )
}

function normalizeCurrentViewers(
  payload: unknown,
  capturedAt: number,
) {
  if (!Array.isArray(payload)) {
    return []
  }

  return payload
    .map((value) => {
      if (!isRecord(value)) {
        return undefined
      }

      const livestreamId = readId(value.livestream_id)
      const viewerCount = readCount(value.viewers)

      if (
        livestreamId === undefined ||
        viewerCount === undefined
      ) {
        return undefined
      }

      const showViewCount =
        typeof value.show_view_count === 'boolean'
          ? value.show_view_count
          : undefined

      return {
        capturedAt,
        livestreamId,
        ...(showViewCount === undefined
          ? {}
          : { showViewCount }),
        viewerCount,
      }
    })
    .filter(
      (entry): entry is CurrentViewerRecord => entry !== undefined,
    )
}

function createRecord(
  record: ViewerCountRecord,
): ViewerCountRecord {
  return record
}

function readNestedArray(
  value: unknown,
  ...path: readonly string[]
): readonly unknown[] {
  let current = value

  for (const key of path) {
    if (!isRecord(current)) {
      return []
    }

    current = current[key]
  }

  return Array.isArray(current) ? current : []
}

function readCount(value: unknown) {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    value < 0
  ) {
    return undefined
  }

  return Math.floor(value)
}

function readId(value: unknown) {
  const numericValue =
    typeof value === 'string' && /^(0|[1-9]\d*)$/.test(value)
      ? Number(value)
      : value

  if (
    typeof numericValue !== 'number' ||
    !Number.isSafeInteger(numericValue) ||
    numericValue < 0
  ) {
    return undefined
  }

  return numericValue
}

function readBoolean(value: unknown, fallback: boolean) {
  if (typeof value === 'boolean') {
    return value
  }

  if (value === 0 || value === '0' || value === 'false') {
    return false
  }

  if (value === 1 || value === '1' || value === 'true') {
    return true
  }

  return fallback
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
