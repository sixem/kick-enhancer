import { type Dispose } from '../../lifecycle.ts'
import { type WebSocketTapEvent } from './types.ts'

type TapListener = (event: WebSocketTapEvent) => void
const WEB_SOCKET_OPEN_STATE = 1

type WebSocketHost = {
  WebSocket: typeof WebSocket
}

type CapturedSocket = Readonly<{
  hookedSend: WebSocket['send']
  onClose: EventListener
  onError: EventListener
  onMessage: EventListener
  originalSend: WebSocket['send']
  socket: WebSocket
}>

export class WebSocketTap {
  readonly #clock: () => number
  readonly #host: WebSocketHost
  readonly #listeners = new Set<TapListener>()
  readonly #sockets = new Map<number, CapturedSocket>()
  #installed = false
  #nextSocketId = 1
  #restoreConstructor: Dispose | undefined

  constructor(host: WebSocketHost, clock: () => number = Date.now) {
    this.#host = host
    this.#clock = clock
  }

  install(): boolean {
    if (this.#installed) {
      return true
    }

    try {
      const NativeWebSocket = this.#host.WebSocket
      const descriptor = Object.getOwnPropertyDescriptor(
        this.#host,
        'WebSocket',
      )
      const proxy = new Proxy(NativeWebSocket, {
        construct: (target, argumentsList, newTarget) => {
          const socket = Reflect.construct(
            target,
            argumentsList,
            newTarget,
          ) as WebSocket

          try {
            this.#captureSocket(socket)
          } catch {
            // Observation must never interfere with KICK's socket.
          }

          return socket
        },
      })

      Object.defineProperty(this.#host, 'WebSocket', {
        configurable: descriptor?.configurable ?? true,
        enumerable: descriptor?.enumerable ?? true,
        value: proxy,
        writable: true,
      })

      this.#restoreConstructor = () => {
        if (this.#host.WebSocket !== proxy) {
          return
        }

        if (descriptor) {
          Object.defineProperty(this.#host, 'WebSocket', descriptor)
        } else {
          Object.defineProperty(this.#host, 'WebSocket', {
            configurable: true,
            enumerable: true,
            value: NativeWebSocket,
            writable: true,
          })
        }
      }
      this.#installed = true
      return true
    } catch {
      return false
    }
  }

  send(socketId: number, data: string): boolean {
    const captured = this.#sockets.get(socketId)

    if (!captured || captured.socket.readyState !== WEB_SOCKET_OPEN_STATE) {
      return false
    }

    try {
      captured.socket.send(data)
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

  dispose() {
    this.#restoreConstructor?.()
    this.#restoreConstructor = undefined

    for (const socketId of [...this.#sockets.keys()]) {
      this.#releaseSocket(socketId)
    }

    this.#listeners.clear()
    this.#installed = false
  }

  #captureSocket(socket: WebSocket) {
    const socketId = this.#nextSocketId
    this.#nextSocketId += 1

    // The original method is deliberately detached, then invoked with its
    // socket through Reflect.apply and restored during cleanup.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalSend = socket.send
    const hookedSend = new Proxy(originalSend, {
      apply: (target, thisArgument, argumentsList) => {
        const result = Reflect.apply(
          target,
          thisArgument,
          argumentsList,
        ) as unknown

        this.#emit({
          data: argumentsList[0] as unknown,
          direction: 'outgoing',
          observedAt: this.#clock(),
          socketId,
          type: 'frame',
        })

        return result
      },
    })
    const onMessage: EventListener = (event) => {
      this.#emit({
        data: (event as MessageEvent<unknown>).data,
        direction: 'incoming',
        observedAt: this.#clock(),
        socketId,
        type: 'frame',
      })
    }
    const onError: EventListener = () => {
      this.#emit({
        observedAt: this.#clock(),
        socketId,
        type: 'error',
      })
    }
    const onClose: EventListener = () => {
      this.#emit({
        observedAt: this.#clock(),
        socketId,
        type: 'closed',
      })
      this.#releaseSocket(socketId)
    }

    Object.defineProperty(socket, 'send', {
      configurable: true,
      value: hookedSend,
      writable: true,
    })
    socket.addEventListener('message', onMessage)
    socket.addEventListener('error', onError)
    socket.addEventListener('close', onClose)

    this.#sockets.set(socketId, {
      hookedSend,
      onClose,
      onError,
      onMessage,
      originalSend,
      socket,
    })
  }

  #emit(event: WebSocketTapEvent) {
    for (const listener of this.#listeners) {
      try {
        listener(event)
      } catch {
        // Subscriber failures must never enter KICK's socket call path.
      }
    }
  }

  #releaseSocket(socketId: number) {
    const captured = this.#sockets.get(socketId)

    if (!captured) {
      return
    }

    this.#sockets.delete(socketId)
    captured.socket.removeEventListener('message', captured.onMessage)
    captured.socket.removeEventListener('error', captured.onError)
    captured.socket.removeEventListener('close', captured.onClose)

    if (captured.socket.send === captured.hookedSend) {
      try {
        Reflect.deleteProperty(captured.socket, 'send')
      } catch {
        Object.defineProperty(captured.socket, 'send', {
          configurable: true,
          value: captured.originalSend,
          writable: true,
        })
      }
    }
  }
}
