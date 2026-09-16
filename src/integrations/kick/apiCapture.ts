import { classifyKickApiEndpoint, type KickApiEndpoint } from './endpoints.ts'

export type CapturedKickApiMessage = Readonly<{
  endpoint: KickApiEndpoint
  payload: unknown
  source: typeof API_CAPTURE_MESSAGE_SOURCE
  timestamp: number
  type: typeof API_CAPTURE_MESSAGE_TYPE
  url: string
}>

export const API_CAPTURE_MESSAGE_SOURCE = 'kick-enhancer-viewer-counts' as const
export const API_CAPTURE_MESSAGE_TYPE = 'KICK_ENHANCER_API_RESPONSE' as const

export function isKickApiEndpoint(value: unknown): value is KickApiEndpoint {
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

export function isCapturedKickApiMessage(
  value: unknown,
): value is CapturedKickApiMessage {
  if (!isRecord(value)) {
    return false
  }

  return (
    value.source === API_CAPTURE_MESSAGE_SOURCE &&
    value.type === API_CAPTURE_MESSAGE_TYPE &&
    isKickApiEndpoint(value.endpoint) &&
    typeof value.url === 'string' &&
    typeof value.timestamp === 'number' &&
    Number.isFinite(value.timestamp) &&
    'payload' in value
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export type ApiCaptureEvent = Pick<
  MessageEvent<unknown>,
  'data' | 'origin' | 'source'
>

export type ApiCaptureContext = Readonly<{
  currentHref: string
  currentOrigin: string
  messageWindow: MessageEventSource
  now?: number
  pageWindow: MessageEventSource
}>

// Validate the bridge envelope only; consumers validate their own payloads.
export function readCapturedKickApiMessage(
  event: ApiCaptureEvent,
  context: ApiCaptureContext,
): CapturedKickApiMessage | undefined {
  if (
    (event.source !== context.messageWindow &&
      event.source !== context.pageWindow) ||
    event.origin !== context.currentOrigin ||
    !isCapturedKickApiMessage(event.data)
  ) {
    return undefined
  }

  const message = event.data
  if (
    classifyKickApiEndpoint(message.url, context.currentHref) !==
      message.endpoint ||
    Math.abs((context.now ?? Date.now()) - message.timestamp) > 60 * 1000
  ) {
    return undefined
  }

  return message
}
