import {
  readCapturedKickApiMessage,
  type ApiCaptureEvent,
  type ApiCaptureContext,
} from '../../integrations/kick/apiCapture.ts'
import { type FollowedGamblingChannels } from './followedChannels.ts'

export function handleFollowedChannelsCapture(
  event: ApiCaptureEvent,
  context: ApiCaptureContext,
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
  event: ApiCaptureEvent,
  context: ApiCaptureContext,
) {
  const message = readCapturedKickApiMessage(event, context)
  return message?.endpoint === 'FOLLOWED_CHANNELS' ? message : undefined
}

function getFollowedChannelsPageKey(rawUrl: string, baseUrl: string) {
  try {
    return new URL(rawUrl, baseUrl).searchParams.get('cursor') ?? ''
  } catch {
    return ''
  }
}
