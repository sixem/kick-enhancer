export type WebSocketFrameDirection = 'incoming' | 'outgoing'

export type WebSocketTapEvent =
  | Readonly<{
      data: unknown
      direction: WebSocketFrameDirection
      observedAt: number
      socketId: number
      type: 'frame'
    }>
  | Readonly<{
      observedAt: number
      socketId: number
      type: 'closed' | 'error'
    }>

type ChatSocketEventBase = Readonly<{
  observedAt: number
  socketId: number
}>

export type ChatSocketEvent =
  | (ChatSocketEventBase & Readonly<{ type: 'rttSample'; rttMs: number }>)
  | (ChatSocketEventBase &
      Readonly<{
        channelName: string
        type: 'subscribed' | 'subscribing' | 'unsubscribing'
      }>)
  | (ChatSocketEventBase &
      Readonly<{
        channelName: string
        data: unknown
        eventName: string
        type: 'event'
      }>)
  | (ChatSocketEventBase &
      Readonly<{
        direction: WebSocketFrameDirection
        type: 'ping' | 'pong'
      }>)
  | (ChatSocketEventBase &
      Readonly<{
        type: 'socketClosed'
      }>)

export type KickChatEvent =
  | Readonly<{
      chatroomId: string
      observedAt: number
      type: 'sessionEnded' | 'sessionStarted'
    }>
  | Readonly<{
      chatroomId: string
      content: string | null
      messageId: string
      messageType: string
      observedAt: number
      senderId: string
      type: 'message'
    }>
  | Readonly<{
      chatroomId: string
      messageId: string
      observedAt: number
      type: 'messageDeleted'
    }>

export type ChatStatisticsUnavailableReason =
  'capture-failed' | 'connection-failed'

export type ChatStatisticsSnapshot =
  | Readonly<{
      status: 'pending'
    }>
  | Readonly<{
      reason: ChatStatisticsUnavailableReason
      status: 'unavailable'
    }>
  | Readonly<{
      activeChatters: number
      chatroomId: string
      messagesPerMinute: number
      peakMessagesPerMinute: number
      socketRttMs: number | null
      status: 'active'
      totalMessages: number
      trendReadyAt: number
      trendPercent: number | null
    }>
