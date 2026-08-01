import { type KickChatEvent, type PusherEvent } from './types.ts'

const CHAT_CHANNEL_PATTERN = /^chatrooms\.(\d+)\.v2$/
const CHAT_MESSAGE_EVENT = 'App\\Events\\ChatMessageEvent'

type Session = Readonly<{
  channelName: string
  chatroomId: string
  confirmed: boolean
  socketId: number
}>

export class KickChatAdapter {
  readonly #sessions = new Map<string, Session>()

  accept(event: PusherEvent, collectMessages = true): readonly KickChatEvent[] {
    if (event.type === 'socketClosed') {
      return this.#endSocketSessions(event.socketId, event.observedAt)
    }

    if (
      event.type !== 'subscribing' &&
      event.type !== 'subscribed' &&
      event.type !== 'unsubscribing' &&
      event.type !== 'event'
    ) {
      return []
    }

    const match = CHAT_CHANNEL_PATTERN.exec(event.channelName)

    if (!match) {
      return []
    }

    const chatroomId = match[1]

    if (!chatroomId) {
      return []
    }

    const key = createSessionKey(event.socketId, event.channelName)

    if (event.type === 'subscribing') {
      const existing = this.#sessions.get(key)
      this.#sessions.set(key, {
        channelName: event.channelName,
        chatroomId,
        confirmed: false,
        socketId: event.socketId,
      })

      return existing?.confirmed
        ? [createSessionEvent('sessionEnded', existing, event.observedAt)]
        : []
    }

    if (event.type === 'unsubscribing') {
      const existing = this.#sessions.get(key)
      this.#sessions.delete(key)

      return existing?.confirmed
        ? [createSessionEvent('sessionEnded', existing, event.observedAt)]
        : []
    }

    const session = this.#sessions.get(key)

    if (!session) {
      return []
    }

    if (event.type === 'subscribed') {
      if (session.confirmed) {
        return []
      }

      const confirmed = {
        ...session,
        confirmed: true,
      }
      this.#sessions.set(key, confirmed)

      return [createSessionEvent('sessionStarted', confirmed, event.observedAt)]
    }

    if (
      !session.confirmed ||
      !collectMessages ||
      event.eventName !== CHAT_MESSAGE_EVENT
    ) {
      return []
    }

    const message = decodeMessage(decodeEventData(event.data), chatroomId)

    if (!message) {
      return []
    }

    return [
      {
        channelName: session.channelName,
        chatroomId: session.chatroomId,
        messageId: message.messageId,
        messageType: message.messageType,
        observedAt: event.observedAt,
        senderId: message.senderId,
        socketId: session.socketId,
        type: 'message',
      },
    ]
  }

  #endSocketSessions(socketId: number, observedAt: number) {
    const ended: KickChatEvent[] = []

    for (const [key, session] of this.#sessions) {
      if (session.socketId !== socketId) {
        continue
      }

      this.#sessions.delete(key)

      if (session.confirmed) {
        ended.push(createSessionEvent('sessionEnded', session, observedAt))
      }
    }

    return ended
  }
}

function decodeEventData(value: unknown) {
  if (typeof value !== 'string') {
    return value
  }

  try {
    return JSON.parse(value) as unknown
  } catch {
    return value
  }
}

function decodeMessage(data: unknown, chatroomId: string) {
  if (!isRecord(data) || !isId(data.id)) {
    return null
  }

  if (
    !isId(data.chatroom_id) ||
    String(data.chatroom_id) !== chatroomId ||
    typeof data.type !== 'string' ||
    !isRecord(data.sender) ||
    !isId(data.sender.id)
  ) {
    return null
  }

  return {
    messageId: String(data.id),
    messageType: data.type,
    senderId: String(data.sender.id),
  }
}

function createSessionEvent(
  type: 'sessionStarted' | 'sessionEnded',
  session: Session,
  observedAt: number,
): KickChatEvent {
  return {
    channelName: session.channelName,
    chatroomId: session.chatroomId,
    observedAt,
    socketId: session.socketId,
    type,
  }
}

function createSessionKey(socketId: number, channelName: string) {
  return `${socketId}:${channelName}`
}

function isId(value: unknown): value is string | number {
  return (
    (typeof value === 'string' && value.length > 0) ||
    (typeof value === 'number' && Number.isFinite(value))
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
