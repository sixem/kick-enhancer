import {
  type PusherEvent,
  type WebSocketTapEvent,
} from './types.ts'

export function decodePusherEvent(
  event: WebSocketTapEvent,
): PusherEvent | null {
  if (event.type === 'closed') {
    return {
      observedAt: event.observedAt,
      socketId: event.socketId,
      type: 'socketClosed',
    }
  }

  if (event.type !== 'frame' || typeof event.data !== 'string') {
    return null
  }

  const envelope = parseRecord(event.data)

  if (!envelope || typeof envelope.event !== 'string') {
    return null
  }

  const eventName = envelope.event

  if (eventName === 'pusher:ping' || eventName === 'pusher:pong') {
    return {
      direction: event.direction,
      observedAt: event.observedAt,
      socketId: event.socketId,
      type: eventName === 'pusher:ping' ? 'ping' : 'pong',
    }
  }

  if (
    event.direction === 'outgoing' &&
    (eventName === 'pusher:subscribe' ||
      eventName === 'pusher:unsubscribe')
  ) {
    const data = decodeData(envelope.data)
    const channelName = isRecord(data) ? data.channel : undefined

    if (typeof channelName !== 'string') {
      return null
    }

    return {
      channelName,
      observedAt: event.observedAt,
      socketId: event.socketId,
      type:
        eventName === 'pusher:subscribe'
          ? 'subscribing'
          : 'unsubscribing',
    }
  }

  const channelName = envelope.channel

  if (typeof channelName !== 'string') {
    return null
  }

  if (
    event.direction === 'incoming' &&
    eventName === 'pusher_internal:subscription_succeeded'
  ) {
    return {
      channelName,
      observedAt: event.observedAt,
      socketId: event.socketId,
      type: 'subscribed',
    }
  }

  if (
    event.direction !== 'incoming' ||
    eventName.startsWith('pusher:')
  ) {
    return null
  }

  return {
    channelName,
    // Keep event payloads lazy. Chat messages are the high-volume path, and
    // their nested JSON is only needed while statistics collection is active.
    data: envelope.data,
    eventName,
    observedAt: event.observedAt,
    socketId: event.socketId,
    type: 'event',
  }
}

function decodeData(value: unknown) {
  if (typeof value !== 'string') {
    return value
  }

  try {
    return JSON.parse(value) as unknown
  } catch {
    return value
  }
}

function parseRecord(value: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(value) as unknown
    return isRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
