import { type KickChatEvent, type ChatSocketEvent } from './types.ts'

const CHAT_CHANNEL_PATTERN = /^chatrooms\.(\d+)\.v2$/
const CHAT_MESSAGE_EVENT = 'App\\Events\\ChatMessageEvent'
const MESSAGE_DELETED_EVENT = 'App\\Events\\MessageDeletedEvent'

type Session = {
  channelName: string
  chatroomId: string
  preferredSocketId: number | null
  sockets: Map<number, boolean>
  started: boolean
}

type ChannelLifecycleEvent = Readonly<{
  channelName: string
  observedAt: number
  socketId: number
}>

export class KickChatAdapter {
  #endedChannelName: string | undefined
  #session: Session | undefined

  getPreferredSocketId() {
    return this.#session?.preferredSocketId ?? null
  }

  accept(
    event: ChatSocketEvent,
    collectMessages = true,
  ): readonly KickChatEvent[] {
    if (event.type === 'socketClosed') {
      this.#removeSocket(event.socketId)
      return []
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

    if (event.type === 'subscribing') {
      return this.#startSubscription(event, chatroomId)
    }

    if (event.type === 'unsubscribing') {
      return this.#endSubscription(event)
    }

    if (event.type === 'subscribed') {
      return this.#confirmSubscription(event, chatroomId)
    }

    if (event.type !== 'event') {
      return []
    }

    const session = this.#session

    if (event.eventName === MESSAGE_DELETED_EVENT) {
      const messageId = decodeDeletionMessageId(event.data)

      if (!messageId || !session || session.channelName !== event.channelName) {
        return []
      }

      const started = this.#markSocketLive(session, event.socketId)
      const events: KickChatEvent[] = started
        ? [createSessionEvent('sessionStarted', session, event)]
        : []

      events.push({
        chatroomId: session.chatroomId,
        messageId,
        observedAt: event.observedAt,
        type: 'messageDeleted',
      })

      return events
    }

    if (event.eventName !== CHAT_MESSAGE_EVENT) {
      return []
    }

    if (session && session.channelName !== event.channelName) {
      return []
    }

    if (!collectMessages) {
      if (!session) {
        return []
      }

      const started = this.#markSocketLive(session, event.socketId)
      return started
        ? [createSessionEvent('sessionStarted', session, event)]
        : []
    }

    const message = decodeMessage(decodeEventData(event.data), chatroomId)

    if (!message) {
      return []
    }

    if (!session) {
      if (this.#endedChannelName === event.channelName) {
        return []
      }
    }

    const activeSession =
      session ?? createSession(event.channelName, chatroomId)

    this.#session ??= activeSession

    const started = this.#markSocketLive(activeSession, event.socketId)
    const events: KickChatEvent[] = started
      ? [createSessionEvent('sessionStarted', activeSession, event)]
      : []

    events.push({
      chatroomId: activeSession.chatroomId,
      content: message.content,
      messageId: message.messageId,
      messageType: message.messageType,
      observedAt: event.observedAt,
      senderId: message.senderId,
      type: 'message',
    })

    return events
  }

  #startSubscription(event: ChannelLifecycleEvent, chatroomId: string) {
    const session = this.#session

    this.#endedChannelName = undefined

    if (session?.channelName === event.channelName) {
      if (!session.sockets.has(event.socketId)) {
        session.sockets.set(event.socketId, false)
      }

      return []
    }

    this.#session = createSession(event.channelName, chatroomId, event.socketId)

    return session?.started
      ? [createSessionEvent('sessionEnded', session, event)]
      : []
  }

  #confirmSubscription(event: ChannelLifecycleEvent, chatroomId: string) {
    let session = this.#session

    if (!session) {
      if (this.#endedChannelName === event.channelName) {
        return []
      }

      session = createSession(event.channelName, chatroomId)
      this.#session = session
    } else if (session.channelName !== event.channelName) {
      return []
    }

    return this.#markSocketLive(session, event.socketId)
      ? [createSessionEvent('sessionStarted', session, event)]
      : []
  }

  #endSubscription(event: ChannelLifecycleEvent) {
    const session = this.#session

    if (
      !session ||
      session.channelName !== event.channelName ||
      !session.sockets.has(event.socketId)
    ) {
      return []
    }

    this.#removeSocket(event.socketId)

    if (session.sockets.size > 0) {
      return []
    }

    this.#session = undefined
    this.#endedChannelName = session.channelName

    return session.started
      ? [createSessionEvent('sessionEnded', session, event)]
      : []
  }

  #markSocketLive(session: Session, socketId: number) {
    session.sockets.set(socketId, true)
    session.preferredSocketId ??= socketId

    if (session.started) {
      return false
    }

    session.started = true
    return true
  }

  #removeSocket(socketId: number) {
    const session = this.#session

    if (!session?.sockets.delete(socketId)) {
      return
    }

    if (session.preferredSocketId !== socketId) {
      return
    }

    session.preferredSocketId = null

    for (const [candidateId, confirmed] of session.sockets) {
      if (confirmed) {
        session.preferredSocketId = candidateId
        break
      }
    }
  }
}

function createSession(
  channelName: string,
  chatroomId: string,
  socketId?: number,
): Session {
  return {
    channelName,
    chatroomId,
    preferredSocketId: null,
    sockets:
      socketId === undefined
        ? new Map<number, boolean>()
        : new Map([[socketId, false]]),
    started: false,
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

function decodeDeletionMessageId(value: unknown) {
  const data = decodeEventData(value)

  if (!isRecord(data) || !isRecord(data.message) || !isId(data.message.id)) {
    return null
  }

  return String(data.message.id)
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
    content: typeof data.content === 'string' ? data.content : null,
    messageId: String(data.id),
    messageType: data.type,
    senderId: String(data.sender.id),
  }
}

function createSessionEvent(
  type: 'sessionStarted' | 'sessionEnded',
  session: Session,
  source: Readonly<{ observedAt: number }>,
): KickChatEvent {
  return {
    chatroomId: session.chatroomId,
    observedAt: source.observedAt,
    type,
  }
}

function isId(value: unknown): value is string | number {
  return (
    (typeof value === 'string' && value.length > 0) ||
    (typeof value === 'number' && Number.isFinite(value))
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
