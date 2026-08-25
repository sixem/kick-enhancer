import { type Dispose } from '../../lifecycle.ts'
import { type WebSocketTapEvent } from './types.ts'
import { installWebSocketPageHook } from './webSocketPageHook.ts'

type TapListener = (event: WebSocketTapEvent) => void
const BRIDGE_SOURCE = 'kick-enhancer-chat-statistics'
const INSTALL_RESULT_ATTRIBUTE = 'data-kick-enhancer-websocket-hook'
const MAX_FRAME_LENGTH = 256 * 1024

type WebSocketHost = {
  document: Document
  location: Pick<Location, 'origin'>
}

type WebSocketMessageHost = {
  addEventListener: Window['addEventListener']
  postMessage: Window['postMessage']
  removeEventListener: Window['removeEventListener']
}

let nextChannelId = 1

export class WebSocketTap {
  readonly #clock: () => number
  readonly #host: WebSocketHost
  readonly #knownSocketIds = new Set<number>()
  readonly #listeners = new Set<TapListener>()
  readonly #messageHost: WebSocketMessageHost
  readonly #channel = createBridgeChannel()
  #installed = false

  constructor(
    host: WebSocketHost,
    clock: () => number = Date.now,
    messageHost: WebSocketMessageHost = host as WebSocketHost &
      WebSocketMessageHost,
  ) {
    this.#host = host
    this.#clock = clock
    this.#messageHost = messageHost
  }

  install(): boolean {
    if (this.#installed) {
      return true
    }

    try {
      const installTarget = this.#host.document.documentElement

      if (!installTarget) {
        return false
      }

      this.#messageHost.addEventListener('message', this.#handleBridgeMessage)
      const script = this.#host.document.createElement('script')
      let installed = false

      try {
        script.textContent = `try { (${installWebSocketPageHook.toString()})(${JSON.stringify(this.#channel)}) } catch {}`
        installTarget.append(script)
        installed = script.getAttribute(INSTALL_RESULT_ATTRIBUTE) === 'true'
      } finally {
        script.remove()
      }

      if (!installed) {
        this.#messageHost.removeEventListener(
          'message',
          this.#handleBridgeMessage,
        )
        return false
      }

      this.#installed = true
      return true
    } catch {
      this.#messageHost.removeEventListener(
        'message',
        this.#handleBridgeMessage,
      )
      return false
    }
  }

  ping(socketId: number): boolean {
    if (
      !this.#installed ||
      !isSocketId(socketId) ||
      !this.#knownSocketIds.has(socketId)
    ) {
      return false
    }

    try {
      this.#messageHost.postMessage(
        {
          channel: this.#channel,
          socketId,
          source: BRIDGE_SOURCE,
          type: 'ping',
        },
        this.#host.location.origin,
      )
      return true
    } catch {
      return false
    }
  }

  subscribe(listener: TapListener): Dispose {
    this.#listeners.add(listener)

    return () => {
      this.#listeners.delete(listener)
    }
  }

  readonly #handleBridgeMessage = (event: MessageEvent<unknown>) => {
    const bridgeEvent = this.#decodeBridgeEvent(event)

    if (!bridgeEvent) {
      return
    }

    if (bridgeEvent.type === 'closed') {
      this.#knownSocketIds.delete(bridgeEvent.socketId)
    } else {
      this.#knownSocketIds.add(bridgeEvent.socketId)
    }

    for (const listener of this.#listeners) {
      try {
        listener(bridgeEvent)
      } catch {
        // Subscriber failures must not interrupt message capture.
      }
    }
  }

  #decodeBridgeEvent(event: MessageEvent<unknown>): WebSocketTapEvent | null {
    try {
      if (
        !isExpectedMessageSource(event.source, this.#host, this.#messageHost) ||
        event.origin !== this.#host.location.origin ||
        !isRecord(event.data)
      ) {
        return null
      }

      const data = event.data

      if (
        data.source !== BRIDGE_SOURCE ||
        data.channel !== this.#channel ||
        !isSocketId(data.socketId)
      ) {
        return null
      }

      const observedAt = this.#clock()

      if (data.type === 'closed' || data.type === 'error') {
        return {
          observedAt,
          socketId: data.socketId,
          type: data.type,
        }
      }

      if (
        data.type !== 'frame' ||
        (data.direction !== 'incoming' && data.direction !== 'outgoing') ||
        typeof data.data !== 'string' ||
        data.data.length > MAX_FRAME_LENGTH
      ) {
        return null
      }

      return {
        data: data.data,
        direction: data.direction,
        observedAt,
        socketId: data.socketId,
        type: 'frame',
      }
    } catch {
      return null
    }
  }
}

function createBridgeChannel() {
  const channelId = nextChannelId
  nextChannelId += 1

  const randomPart = globalThis.crypto?.randomUUID?.() ?? String(Date.now())
  return `${BRIDGE_SOURCE}:${randomPart}:${channelId}`
}

function isExpectedMessageSource(
  source: MessageEventSource | null,
  host: WebSocketHost,
  messageHost: WebSocketMessageHost,
) {
  return source === host || source === messageHost
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isSocketId(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) > 0
}
