export type ViewerCountEndpoint =
  | 'CHANNEL_DETAILS'
  | 'CURRENT_VIEWERS'
  | 'FEATURED_LIVESTREAMS'
  | 'FOLLOWED_CHANNELS'
  | 'PAGINATED_RECOMMENDED_LIVESTREAMS'
  | 'RECOMMENDED_LIVESTREAMS'
  | 'SIDEBAR_LIVESTREAMS'
  | 'USER_LIVESTREAMS'

export type ViewerCountSource =
  | 'channel-details'
  | 'current-viewers'
  | 'featured'
  | 'followed-channels'
  | 'recommendations'
  | 'sidebar-recommendations'
  | 'user-livestreams'

export type ViewerCountRecord = Readonly<{
  capturedAt: number
  channelId?: number
  channelSlug: string
  isLive: boolean
  livestreamId?: number
  showViewCount: boolean
  source: ViewerCountSource
  startedAt?: number
  viewerCount: number
}>

export type CurrentViewerRecord = Readonly<{
  capturedAt: number
  livestreamId: number
  showViewCount?: boolean
  viewerCount: number
}>

export type CapturedViewerCountMessage = Readonly<{
  endpoint: ViewerCountEndpoint
  payload: unknown
  source: typeof VIEWER_COUNT_MESSAGE_SOURCE
  timestamp: number
  type: typeof VIEWER_COUNT_MESSAGE_TYPE
  url: string
}>

export const VIEWER_COUNT_MESSAGE_SOURCE =
  'kick-enhancer-viewer-counts' as const
export const VIEWER_COUNT_MESSAGE_TYPE = 'KICK_ENHANCER_API_RESPONSE' as const

export function isViewerCountEndpoint(
  value: unknown,
): value is ViewerCountEndpoint {
  return (
    value === 'CHANNEL_DETAILS' ||
    value === 'CURRENT_VIEWERS' ||
    value === 'FEATURED_LIVESTREAMS' ||
    value === 'FOLLOWED_CHANNELS' ||
    value === 'PAGINATED_RECOMMENDED_LIVESTREAMS' ||
    value === 'RECOMMENDED_LIVESTREAMS' ||
    value === 'SIDEBAR_LIVESTREAMS' ||
    value === 'USER_LIVESTREAMS'
  )
}

export function isCapturedViewerCountMessage(
  value: unknown,
): value is CapturedViewerCountMessage {
  if (!isRecord(value)) {
    return false
  }

  return (
    value.source === VIEWER_COUNT_MESSAGE_SOURCE &&
    value.type === VIEWER_COUNT_MESSAGE_TYPE &&
    isViewerCountEndpoint(value.endpoint) &&
    typeof value.url === 'string' &&
    typeof value.timestamp === 'number' &&
    Number.isFinite(value.timestamp) &&
    'payload' in value
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
