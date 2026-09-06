import { decodePusherEvent } from './pusherAdapter.ts'
import { CentrifugoRttTracker } from './centrifugoRttTracker.ts'
import { type ChatSocketEvent, type WebSocketTapEvent } from './types.ts'

const MAX_FRAME_LENGTH = 256 * 1024
const MAX_PENDING_SUBSCRIPTIONS = 128
const CHAT_CHANNEL_PATTERN = /^chatrooms\.\d+\.v2$/

// Normalize both transports before applying KICK chat/session semantics.
export class ChatSocketAdapter {
  readonly #rttTracker = new CentrifugoRttTracker()
  readonly #pendingSubscriptions = new Map<number, Map<number, string>>()
  readonly #pusherSockets = new Set<number>()

  canPing(socketId: number) {
    // Centrifugo's empty server ping/client pong cannot measure network RTT.
    // Never send the Pusher probe to a Centrifugo connection.
    return this.#pusherSockets.has(socketId)
  }

  accept(event: WebSocketTapEvent): readonly ChatSocketEvent[] {
    if (event.type === 'closed') {
      this.#rttTracker.clearSocket(event.socketId)
      this.#pendingSubscriptions.delete(event.socketId)
      this.#pusherSockets.delete(event.socketId)
      return [{ ...event, type: 'socketClosed' }]
    }

    if (
      event.type !== 'frame' ||
      typeof event.data !== 'string' ||
      event.data.length > MAX_FRAME_LENGTH
    ) {
      return []
    }

    const events: ChatSocketEvent[] = []

    // Centrifugo batches independent JSON commands/replies with newlines.
    for (const line of event.data.split('\n')) {
      const envelope = parseRecord(line)

      if (!envelope) {
        continue
      }

      if (typeof envelope.event === 'string') {
        const decoded = decodePusherEvent({ ...event, data: line })

        if (decoded) {
          this.#pusherSockets.add(event.socketId)
          events.push(decoded)
        }
        continue
      }

      const rttSample = this.#rttTracker.accept(
        envelope,
        event.direction,
        event.socketId,
        event.observedAt,
      )
      if (rttSample) events.push(rttSample)

      const base = {
        observedAt: event.observedAt,
        socketId: event.socketId,
      }

      if (event.direction === 'outgoing') {
        const subscribe = envelope.subscribe
        const unsubscribe = envelope.unsubscribe

        if (isRecord(subscribe) && isChatChannel(subscribe.channel)) {
          if (!isCommandId(envelope.id)) {
            continue
          }

          const pending =
            this.#pendingSubscriptions.get(event.socketId) ??
            new Map<number, string>()
          if (pending.size >= MAX_PENDING_SUBSCRIPTIONS) {
            const oldestId = pending.keys().next().value
            if (oldestId !== undefined) pending.delete(oldestId)
          }
          // Retain only correlation IDs and chat channels, never tokens.
          pending.set(envelope.id, subscribe.channel)
          this.#pendingSubscriptions.set(event.socketId, pending)
          events.push({
            ...base,
            channelName: subscribe.channel,
            type: 'subscribing',
          })
        } else if (
          isRecord(unsubscribe) &&
          isChatChannel(unsubscribe.channel)
        ) {
          this.#forgetChannel(event.socketId, unsubscribe.channel)
          events.push({
            ...base,
            channelName: unsubscribe.channel,
            type: 'unsubscribing',
          })
        }
        continue
      }

      if (isCommandId(envelope.id)) {
        const pending = this.#pendingSubscriptions.get(event.socketId)
        const channelName = pending?.get(envelope.id)

        if (
          channelName &&
          (isRecord(envelope.subscribe) || isRecord(envelope.error))
        ) {
          pending?.delete(envelope.id)
          events.push({
            ...base,
            channelName,
            type: isRecord(envelope.error) ? 'unsubscribing' : 'subscribed',
          })
        }
        continue
      }

      const push = envelope.push
      if (!isRecord(push) || !isChatChannel(push.channel)) {
        continue
      }

      if (isRecord(push.unsubscribe)) {
        this.#forgetChannel(event.socketId, push.channel)
        events.push({
          ...base,
          channelName: push.channel,
          type: 'unsubscribing',
        })
        continue
      }

      const publication = isRecord(push.pub) ? push.pub.data : undefined
      if (!isRecord(publication) || typeof publication.event !== 'string') {
        continue
      }

      events.push({
        ...base,
        channelName: push.channel,
        data: publication.data,
        eventName: publication.event,
        type: 'event',
      })
    }

    return events
  }

  #forgetChannel(socketId: number, channelName: string) {
    const pending = this.#pendingSubscriptions.get(socketId)
    if (!pending) return
    for (const [id, channel] of pending) {
      if (channel === channelName) pending.delete(id)
    }
  }
}

function parseRecord(value: string): Record<string, unknown> | null {
  try {
    const parsed: unknown = JSON.parse(value)
    return isRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isChatChannel(value: unknown): value is string {
  return typeof value === 'string' && CHAT_CHANNEL_PATTERN.test(value)
}

function isCommandId(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isSafeInteger(value) &&
    value > 0 &&
    value <= 0xffff_ffff
  )
}
