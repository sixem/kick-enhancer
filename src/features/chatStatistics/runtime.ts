import { unsafeWindow } from '$'

import { type Dispose } from '../../lifecycle'
import { createLogger } from '../../logging/logger'
import { KickChatAdapter } from './kickChatAdapter.ts'
import { decodePusherEvent } from './pusherAdapter.ts'
import { SocketRttTracker } from './rttTracker.ts'
import { ChatStatsStore } from './statsStore.ts'
import {
  type ChatStatisticsSnapshot,
} from './types.ts'
import { WebSocketTap } from './webSocketTap.ts'

const PING_TIMEOUT_MS = 15_000
const SNAPSHOT_INTERVAL_MS = 5_000
const PUSHER_PING_FRAME = JSON.stringify({
  data: {},
  event: 'pusher:ping',
})

type SnapshotListener = (snapshot: ChatStatisticsSnapshot) => void

const log = createLogger('chat-statistics')

export class ChatStatisticsRuntime {
  readonly #chatAdapter = new KickChatAdapter()
  readonly #clock: () => number
  readonly #listeners = new Set<SnapshotListener>()
  readonly #rttTracker = new SocketRttTracker()
  readonly #statsStore = new ChatStatsStore()
  readonly #tap: WebSocketTap
  #captureFailed = false
  #connectionFailed = false
  #initialized = false
  #snapshotTimer: ReturnType<typeof setInterval> | undefined
  #stopTapEvents: Dispose | undefined

  constructor(
    tap: WebSocketTap = new WebSocketTap(unsafeWindow),
    clock: () => number = Date.now,
  ) {
    this.#tap = tap
    this.#clock = clock
  }

  initialize() {
    if (this.#initialized) {
      return true
    }

    this.#stopTapEvents = this.#tap.subscribe((event) => {
      if (
        event.type === 'error' &&
        event.socketId ===
          this.#statsStore.getSelectedSocketId()
      ) {
        this.#connectionFailed = true
      }

      const pusherEvent = decodePusherEvent(event)

      if (!pusherEvent) {
        if (event.type === 'error') {
          this.#publish()
        }
        return
      }

      const rttSample = this.#rttTracker.accept(pusherEvent)

      if (rttSample) {
        this.#statsStore.addRttSample(
          rttSample.socketId,
          rttSample.rttMs,
        )
        this.#publish()
      }

      const chatEvents = this.#chatAdapter.accept(pusherEvent)
      let lifecycleChanged = false

      for (const chatEvent of chatEvents) {
        this.#statsStore.accept(chatEvent)
        if (chatEvent.type === 'sessionStarted') {
          this.#connectionFailed = false
        }
        lifecycleChanged ||= chatEvent.type !== 'message'
      }

      if (pusherEvent.type === 'socketClosed') {
        this.#statsStore.clearSocket(pusherEvent.socketId)
      }

      if (lifecycleChanged) {
        this.#publish()
      }
    })

    this.#initialized = this.#tap.install()
    this.#captureFailed = !this.#initialized

    if (this.#initialized) {
      log.info('Socket observation installed')
    } else {
      this.#stopTapEvents()
      this.#stopTapEvents = undefined
      log.warn('Socket observation unavailable')
    }

    return this.#initialized
  }

  getSnapshot(): ChatStatisticsSnapshot {
    const snapshot = this.#statsStore.getSnapshot(this.#clock())

    if (snapshot.status !== 'pending') {
      return snapshot
    }

    if (this.#captureFailed) {
      return {
        reason: 'capture-failed',
        status: 'unavailable',
      }
    }

    if (this.#connectionFailed) {
      return {
        reason: 'connection-failed',
        status: 'unavailable',
      }
    }

    return snapshot
  }

  requestSocketRttSample() {
    const socketId = this.#statsStore.getSelectedSocketId()

    if (socketId === null) {
      return false
    }

    const now = this.#clock()

    if (
      !this.#rttTracker.canStart(
        socketId,
        now,
        PING_TIMEOUT_MS,
      )
    ) {
      return false
    }

    return this.#tap.send(socketId, PUSHER_PING_FRAME)
  }

  subscribe(listener: SnapshotListener): Dispose {
    this.#listeners.add(listener)
    listener(this.getSnapshot())

    if (!this.#snapshotTimer) {
      this.#snapshotTimer = setInterval(() => {
        this.#publish()
      }, SNAPSHOT_INTERVAL_MS)
    }

    return () => {
      this.#listeners.delete(listener)

      if (this.#listeners.size === 0 && this.#snapshotTimer) {
        clearInterval(this.#snapshotTimer)
        this.#snapshotTimer = undefined
      }
    }
  }

  #publish() {
    if (this.#listeners.size === 0) {
      return
    }

    const snapshot = this.getSnapshot()

    for (const listener of this.#listeners) {
      listener(snapshot)
    }
  }
}

const runtime = new ChatStatisticsRuntime()

export function initializeChatStatisticsCapture() {
  return runtime.initialize()
}

export function getChatStatisticsRuntime() {
  return runtime
}
