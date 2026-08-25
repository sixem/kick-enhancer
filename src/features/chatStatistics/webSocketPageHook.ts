export function installWebSocketPageHook(channel: string) {
  const BRIDGE_SOURCE = 'kick-enhancer-chat-statistics'
  const INSTALL_RESULT_ATTRIBUTE = 'data-kick-enhancer-websocket-hook'
  const MAX_FRAME_LENGTH = 256 * 1024
  const PUSHER_PING_FRAME = '{"data":{},"event":"pusher:ping"}'
  const installScript = document.currentScript
  const pageOrigin = window.location.origin
  const NativeWebSocket = window.WebSocket
  const socketRecords = new Map<
    number,
    {
      hookedSend: WebSocket['send']
      onClose: EventListener
      onError: EventListener
      onMessage: EventListener
      originalOwnSendDescriptor: PropertyDescriptor | undefined
      socket: WebSocket
    }
  >()
  let nextSocketId = 1

  const post = (message: Record<string, unknown>) => {
    try {
      window.postMessage(
        {
          channel,
          source: BRIDGE_SOURCE,
          ...message,
        },
        pageOrigin,
      )
    } catch {
      // Observation must never enter the page's socket call path.
    }
  }

  const postFrame = (
    socketId: number,
    direction: 'incoming' | 'outgoing',
    data: unknown,
  ) => {
    if (typeof data !== 'string' || data.length > MAX_FRAME_LENGTH) {
      return
    }

    post({
      data,
      direction,
      socketId,
      type: 'frame',
    })
  }

  const releaseSocket = (socketId: number) => {
    const record = socketRecords.get(socketId)

    if (!record) {
      return
    }

    socketRecords.delete(socketId)
    record.socket.removeEventListener('message', record.onMessage)
    record.socket.removeEventListener('error', record.onError)
    record.socket.removeEventListener('close', record.onClose)

    try {
      if (record.socket.send !== record.hookedSend) {
        return
      }

      if (record.originalOwnSendDescriptor) {
        Object.defineProperty(
          record.socket,
          'send',
          record.originalOwnSendDescriptor,
        )
      } else {
        Reflect.deleteProperty(record.socket, 'send')
      }
    } catch {
      // Closed sockets do not need a restored method to remain usable.
    }
  }

  const captureSocket = (socket: WebSocket) => {
    const socketId = nextSocketId
    nextSocketId += 1
    const originalOwnSendDescriptor = Object.getOwnPropertyDescriptor(
      socket,
      'send',
    )
    // Deliberately detach the method and invoke it with the received `this`.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalSend = socket.send
    const hookedSend = new Proxy(originalSend, {
      apply: (target, thisArgument, argumentsList) => {
        const result = Reflect.apply(
          target,
          thisArgument,
          argumentsList,
        ) as unknown

        postFrame(socketId, 'outgoing', argumentsList[0])
        return result
      },
    })
    const onMessage: EventListener = (event) => {
      postFrame(socketId, 'incoming', (event as MessageEvent<unknown>).data)
    }
    const onError: EventListener = () => {
      post({ socketId, type: 'error' })
    }
    const onClose: EventListener = () => {
      post({ socketId, type: 'closed' })
      releaseSocket(socketId)
    }

    try {
      Object.defineProperty(socket, 'send', {
        configurable: true,
        value: hookedSend,
        writable: true,
      })
      socket.addEventListener('message', onMessage)
      socket.addEventListener('error', onError)
      socket.addEventListener('close', onClose)
      socketRecords.set(socketId, {
        hookedSend,
        onClose,
        onError,
        onMessage,
        originalOwnSendDescriptor,
        socket,
      })
    } catch {
      socket.removeEventListener('message', onMessage)
      socket.removeEventListener('error', onError)
      socket.removeEventListener('close', onClose)

      try {
        if (originalOwnSendDescriptor) {
          Object.defineProperty(socket, 'send', originalOwnSendDescriptor)
        } else {
          Reflect.deleteProperty(socket, 'send')
        }
      } catch {
        // A failed observation hook must not affect construction.
      }
    }
  }

  const WrappedWebSocket = new Proxy(NativeWebSocket, {
    construct: (target, argumentsList, newTarget) => {
      const socket = Reflect.construct(
        target,
        argumentsList,
        newTarget,
      ) as WebSocket

      try {
        captureSocket(socket)
      } catch {
        // Observation must never interfere with page socket construction.
      }

      return socket
    },
  })
  const onBridgeMessage = (event: MessageEvent<unknown>) => {
    try {
      if (event.source !== window || event.origin !== pageOrigin) {
        return
      }

      const data = event.data

      if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        return
      }

      const command = data as Record<string, unknown>

      if (
        command.source !== BRIDGE_SOURCE ||
        command.channel !== channel ||
        command.type !== 'ping' ||
        !Number.isSafeInteger(command.socketId) ||
        (command.socketId as number) <= 0
      ) {
        return
      }

      const record = socketRecords.get(command.socketId as number)

      if (!record || record.socket.readyState !== NativeWebSocket.OPEN) {
        return
      }

      try {
        record.socket.send(PUSHER_PING_FRAME)
      } catch {
        // Failed probes are handled by the statistics timeout.
      }
    } catch {
      // Treat hostile or malformed page messages as untrusted input.
    }
  }
  const descriptor = Object.getOwnPropertyDescriptor(window, 'WebSocket')
  let replaced = false

  try {
    Object.defineProperty(window, 'WebSocket', {
      configurable: descriptor?.configurable ?? true,
      enumerable: descriptor?.enumerable ?? true,
      value: WrappedWebSocket,
      writable:
        descriptor && 'writable' in descriptor ? descriptor.writable : true,
    })
    replaced = window.WebSocket === WrappedWebSocket

    if (!replaced) {
      return
    }

    window.addEventListener('message', onBridgeMessage)
    installScript?.setAttribute(INSTALL_RESULT_ATTRIBUTE, 'true')
  } catch {
    window.removeEventListener('message', onBridgeMessage)

    if (replaced && window.WebSocket === WrappedWebSocket) {
      try {
        if (descriptor) {
          Object.defineProperty(window, 'WebSocket', descriptor)
        } else {
          Reflect.deleteProperty(window, 'WebSocket')
        }
      } catch {
        // Installation fails closed if the original cannot be restored.
      }
    }
  }
}
