import { unsafeWindow } from '$'

import { type Dispose } from '../../lifecycle'
import { createLogger } from '../../logging/logger'
import { KickChatAdapter } from './kickChatAdapter.ts'
import { ChatSocketAdapter } from './chatSocketAdapter.ts'
import { SocketRttTracker } from './rttTracker.ts'
import { ChatStatsStore } from './statsStore.ts'
import {
  type ChatStatisticsSnapshot,
  type KickChatEvent,
  type WebSocketTapEvent,
} from './types.ts'
import { WebSocketTap } from './webSocketTap.ts'

const PING_TIMEOUT_MS = 15_000
const SNAPSHOT_INTERVAL_MS = 5_000

type SnapshotListener = (snapshot: ChatStatisticsSnapshot) => void
type ChatEventListener = (event: KickChatEvent) => void

const log = createLogger('chat-statistics')

export class ChatStatisticsRuntime {
  readonly #chatAdapter = new KickChatAdapter()
  readonly #chatEventListeners = new Set<ChatEventListener>()
  readonly #clock: () => number
  readonly #listeners = new Set<SnapshotListener>()
  readonly #latestPassiveRtt = new Map<number, number>()
  readonly #rttTracker = new SocketRttTracker()
  readonly #socketAdapter = new ChatSocketAdapter()
  readonly #statsStore = new ChatStatsStore()
  readonly #webSocketTap: WebSocketTap
  #captureFailed = false
  #collectionEnabled = false
  #initialized = false
  #snapshotTimer: ReturnType<typeof setInterval> | undefined

  constructor(
    webSocketTap: WebSocketTap = new WebSocketTap(
      unsafeWindow,
      Date.now,
      window,
    ),
    clock: () => number = Date.now,
  ) {
    this.#clock = clock
    this.#webSocketTap = webSocketTap
  }

  initialize() {
    if (this.#initialized) {
      return true
    }

    const observeEvent = (event: WebSocketTapEvent) => {
      for (const socketEvent of this.#socketAdapter.accept(event)) {
        if (socketEvent.type === 'rttSample') {
          this.#latestPassiveRtt.set(socketEvent.socketId, socketEvent.rttMs)
        }
        const previousSocketId = this.#chatAdapter.getPreferredSocketId()

        const rttSample = this.#collectionEnabled
          ? this.#rttTracker.accept(socketEvent)
          : null

        if (rttSample) {
          this.#statsStore.addRttSample(rttSample.socketId, rttSample.rttMs)
          this.#publish()
        }

        const chatEvents = this.#chatAdapter.accept(
          socketEvent,
          this.#collectionEnabled || this.#chatEventListeners.size > 0,
        )
        const selectedSocketId = this.#chatAdapter.getPreferredSocketId()
        let lifecycleChanged = previousSocketId !== selectedSocketId

        for (const chatEvent of chatEvents) {
          if (chatEvent.type !== 'message' || this.#collectionEnabled) {
            this.#statsStore.accept(chatEvent)
          }

          lifecycleChanged ||=
            chatEvent.type === 'sessionStarted' ||
            chatEvent.type === 'sessionEnded'

          for (const listener of this.#chatEventListeners) {
            try {
              listener(chatEvent)
            } catch {
              // Feature failures must not interrupt chat capture.
            }
          }
        }

        if (socketEvent.type === 'socketClosed') {
          this.#latestPassiveRtt.delete(socketEvent.socketId)
          this.#statsStore.clearSocket(socketEvent.socketId)
        }

        if (lifecycleChanged) {
          this.#publish()
        }
      }
    }
    const stopTapEvents = this.#webSocketTap.subscribe(observeEvent)

    this.#initialized = this.#webSocketTap.install()
    this.#captureFailed = !this.#initialized

    if (this.#initialized) {
      log.info('Socket observation installed')
    } else {
      stopTapEvents()
      log.warn('Socket observation unavailable')
    }

    return this.#initialized
  }

  getSnapshot(): ChatStatisticsSnapshot {
    const selectedSocketId = this.#chatAdapter.getPreferredSocketId()
    const snapshot = this.#statsStore.getSnapshot(
      this.#clock(),
      selectedSocketId,
    )

    if (snapshot.status === 'active' && selectedSocketId === null) {
      return {
        reason: 'connection-failed',
        status: 'unavailable',
      }
    }

    if (snapshot.status !== 'pending') {
      return snapshot
    }

    if (this.#captureFailed) {
      return {
        reason: 'capture-failed',
        status: 'unavailable',
      }
    }

    return snapshot
  }

  setCollectionEnabled(enabled: boolean) {
    if (this.#collectionEnabled === enabled) {
      return
    }

    this.#collectionEnabled = enabled
    this.#rttTracker.clear()
    this.#statsStore.resetStatistics(this.#clock())
    if (enabled) {
      // Initial handshakes can finish before settings enable collection.
      for (const [socketId, rttMs] of this.#latestPassiveRtt) {
        this.#statsStore.addRttSample(socketId, rttMs)
      }
    }
    this.#publish()
  }

  requestSocketRttSample() {
    if (!this.#collectionEnabled) {
      return false
    }

    const socketId = this.#chatAdapter.getPreferredSocketId()

    if (socketId === null || !this.#socketAdapter.canPing(socketId)) {
      return false
    }

    const now = this.#clock()

    if (!this.#rttTracker.canStart(socketId, now, PING_TIMEOUT_MS)) {
      return false
    }

    return this.#webSocketTap.ping(socketId)
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

  subscribeChatEvents(listener: ChatEventListener): Dispose {
    this.#chatEventListeners.add(listener)

    return () => {
      this.#chatEventListeners.delete(listener)
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
