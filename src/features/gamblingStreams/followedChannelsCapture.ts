import { classifyViewerCountEndpoint } from '../viewerCounts/acquisition/endpoints.ts'
import {
  isCapturedViewerCountMessage,
  type CapturedViewerCountMessage,
} from '../viewerCounts/model/types.ts'
import { type FollowedGamblingChannels } from './followedChannels.ts'

type CaptureEvent = Pick<MessageEvent<unknown>, 'data' | 'origin' | 'source'>

type CaptureContext = Readonly<{
  currentHref: string
  currentOrigin: string
  messageWindow: MessageEventSource
  now?: number
  pageWindow: MessageEventSource
}>

export function handleFollowedChannelsCapture(
  event: CaptureEvent,
  context: CaptureContext,
  channels: FollowedGamblingChannels,
  onChange: () => void,
) {
  const message = readFollowedChannelsCapture(event, context)

  if (
    !message ||
    !channels.update(
      message.payload,
      getFollowedChannelsPageKey(message.url, context.currentHref),
    )
  ) {
    return false
  }

  onChange()
  return true
}

export function readFollowedChannelsCapture(
  event: CaptureEvent,
  context: CaptureContext,
): CapturedViewerCountMessage | undefined {
  if (
    (event.source !== context.messageWindow &&
      event.source !== context.pageWindow) ||
    event.origin !== context.currentOrigin ||
    !isCapturedViewerCountMessage(event.data)
  ) {
    return undefined
  }

  const message = event.data
  const capturedAt = context.now ?? Date.now()

  if (
    message.endpoint !== 'FOLLOWED_CHANNELS' ||
    classifyViewerCountEndpoint(message.url, context.currentHref) !==
      message.endpoint ||
    Math.abs(capturedAt - message.timestamp) > 60 * 1000
  ) {
    return undefined
  }

  return message
}

function getFollowedChannelsPageKey(rawUrl: string, baseUrl: string) {
  try {
    return new URL(rawUrl, baseUrl).searchParams.get('cursor') ?? ''
  } catch {
    return ''
  }
}
