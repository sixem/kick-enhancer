import assert from 'node:assert/strict'
import test from 'node:test'

import { WebSocketTap } from '../src/features/chatStatistics/webSocketTap.ts'

test('observes sockets without changing constructor or send semantics', () => {
  let now = 100
  const host = {
    WebSocket: FakeWebSocket,
  }
  const NativeWebSocket = host.WebSocket
  const tap = new WebSocketTap(host, () => {
    now += 1
    return now
  })
  const events = []
  tap.subscribe((event) => {
    events.push(event)
  })

  assert.equal(tap.install(), true)
  assert.notEqual(host.WebSocket, NativeWebSocket)
  assert.equal(host.WebSocket.OPEN, NativeWebSocket.OPEN)

  const socket = new host.WebSocket('wss://example.test/socket')

  assert.ok(socket instanceof NativeWebSocket)
  assert.equal(socket.url, 'wss://example.test/socket')
  assert.equal(socket.send('page-frame'), 'native-return')
  assert.equal(tap.send(1, 'enhancer-frame'), true)

  const messageEvent = new Event('message')
  Object.defineProperty(messageEvent, 'data', {
    value: 'incoming-frame',
  })
  socket.dispatchEvent(messageEvent)
  socket.dispatchEvent(new Event('close'))

  assert.deepEqual(socket.sent, ['page-frame', 'enhancer-frame'])
  assert.deepEqual(
    events.map((event) =>
      event.type === 'frame'
        ? [event.type, event.direction, event.data]
        : [event.type],
    ),
    [
      ['frame', 'outgoing', 'page-frame'],
      ['frame', 'outgoing', 'enhancer-frame'],
      ['frame', 'incoming', 'incoming-frame'],
      ['closed'],
    ],
  )
  assert.equal(tap.send(1, 'after-close'), false)

  tap.dispose()
  assert.equal(host.WebSocket, NativeWebSocket)
})

class FakeWebSocket extends EventTarget {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3

  readyState = FakeWebSocket.OPEN
  sent = []

  constructor(url) {
    super()
    this.url = url
  }

  send(data) {
    this.sent.push(data)
    return 'native-return'
  }
}
