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

type PusherEventBase = Readonly<{
  observedAt: number
  socketId: number
}>

type PusherChannelLifecycleType = 'subscribed' | 'subscribing' | 'unsubscribing'

type PusherChannelLifecycleEvent = {
  [Type in PusherChannelLifecycleType]: PusherEventBase &
    Readonly<{
      channelName: string
      type: Type
    }>
}[PusherChannelLifecycleType]

export type PusherEvent =
  | PusherChannelLifecycleEvent
  | (PusherEventBase &
      Readonly<{
        channelName: string
        data: unknown
        eventName: string
        type: 'event'
      }>)
  | (PusherEventBase &
      Readonly<{
        direction: WebSocketFrameDirection
        type: 'ping' | 'pong'
      }>)
  | (PusherEventBase &
      Readonly<{
        type: 'socketClosed'
      }>)

type KickChatSessionEventBase = Readonly<{
  channelName: string
  chatroomId: string
  observedAt: number
  socketId: number
}>

export type KickChatEvent =
  | (KickChatSessionEventBase &
      Readonly<{
        type: 'sessionStarted'
      }>)
  | (KickChatSessionEventBase &
      Readonly<{
        type: 'sessionEnded'
      }>)
  | (KickChatSessionEventBase &
      Readonly<{
        messageId: string
        messageType: string
        senderId: string
        type: 'message'
      }>)

export type ChatStatisticsUnavailableReason =
  'capture-failed' | 'connection-failed' | 'multiple-sessions'

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
