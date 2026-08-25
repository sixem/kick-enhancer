import assert from 'node:assert/strict'
import test from 'node:test'

import { Browser } from 'happy-dom'

import { WebSocketTap } from '../../../src/features/chatStatistics/webSocketTap.ts'

const BRIDGE_SOURCE = 'kick-enhancer-chat-statistics'
const MAX_FRAME_LENGTH = 256 * 1024
const PAGE_URL = 'https://kick.com/example'

test('installs in the page realm without changing WebSocket semantics', async (t) => {
  const { browser, host, page } = createPageHarness()
  t.after(() => browser.close())

  let now = 100
  const { calls: messageHostCalls, messageHost } = createMessageHostFacade(host)
  const tap = new WebSocketTap(
    host,
    () => {
      now += 1
      return now
    },
    messageHost,
  )
  const events = []
  const rawMessages = []

  host.addEventListener('message', (event) => {
    rawMessages.push(event.data)
  })
  tap.subscribe((event) => {
    events.push(event)
  })

  assert.equal(tap.install(), true)
  assert.equal(messageHostCalls.added, 1)
  const installedWebSocket = host.WebSocket
  assert.equal(tap.install(), true)
  assert.equal(host.WebSocket, installedWebSocket)
  assert.equal(host.document.querySelector('script'), null)

  const semantics = page.evaluate(`
    (() => {
      const NativeWebSocket = window.__nativeWebSocket
      const InstalledWebSocket = window.WebSocket
      const socket = new InstalledWebSocket(
        'wss://example.test/socket',
        ['chat'],
      )
      window.__firstSocket = socket

      class ChildSocket extends InstalledWebSocket {}
      const childSocket = new ChildSocket('wss://example.test/child')
      window.__childSocket = childSocket

      let callWithoutNewThrows = false
      let sendError = ''

      try {
        InstalledWebSocket('wss://example.test/invalid')
      } catch (error) {
        callWithoutNewThrows = error instanceof TypeError
      }

      const sendResult = socket.send('page-frame')
      childSocket.send('child-frame')

      try {
        socket.send('throw')
      } catch (error) {
        sendError = error.message
      }

      return {
        callWithoutNewThrows,
        childInstance: childSocket instanceof ChildSocket,
        connecting: InstalledWebSocket.CONNECTING,
        constructorPrototypeMatches:
          Object.getPrototypeOf(InstalledWebSocket) ===
          Object.getPrototypeOf(NativeWebSocket),
        constructorArgs: JSON.stringify(socket.constructorArgs),
        functionRealmMatches:
          InstalledWebSocket instanceof Function ===
          NativeWebSocket instanceof Function,
        installedInstance: socket instanceof InstalledWebSocket,
        nativeInstance: socket instanceof NativeWebSocket,
        nameMatches: InstalledWebSocket.name === NativeWebSocket.name,
        open: InstalledWebSocket.OPEN,
        prototypeMatches:
          InstalledWebSocket.prototype === NativeWebSocket.prototype,
        sendError,
        sendResult,
      }
    })()
  `)

  assert.equal(semantics.callWithoutNewThrows, true)
  assert.equal(semantics.childInstance, true)
  assert.equal(semantics.connecting, 0)
  assert.equal(semantics.constructorPrototypeMatches, true)
  assert.equal(
    semantics.constructorArgs,
    JSON.stringify(['wss://example.test/socket', ['chat']]),
  )
  assert.equal(semantics.functionRealmMatches, true)
  assert.equal(semantics.installedInstance, true)
  assert.equal(semantics.nativeInstance, true)
  assert.equal(semantics.nameMatches, true)
  assert.equal(semantics.open, 1)
  assert.equal(semantics.prototypeMatches, true)
  assert.equal(semantics.sendError, 'native-send-error')
  assert.equal(semantics.sendResult, 'native-return')

  await browser.waitUntilComplete()

  assert.deepEqual(events.map(summarizeEvent), [
    ['frame', 1, 'outgoing', 'page-frame'],
    ['frame', 2, 'outgoing', 'child-frame'],
  ])
  assert.equal(tap.ping(99), false)
  assert.equal(tap.ping(1), true)
  assert.equal(messageHostCalls.posted, 1)
  await browser.waitUntilComplete()

  const pingCommand = rawMessages.find((message) => message?.type === 'ping')
  assert.equal(pingCommand.source, BRIDGE_SOURCE)
  assert.equal(pingCommand.socketId, 1)

  page.evaluate(`
    window.__firstSocket.dispatchEvent(
      new MessageEvent('message', { data: 'incoming-frame' }),
    )
    window.__firstSocket.dispatchEvent(new Event('error'))
  `)
  await browser.waitUntilComplete()

  const frameMessage = rawMessages.find((message) => message?.type === 'frame')
  page.evaluate(`
    window.dispatchEvent(
      new MessageEvent('message', {
        data: ${JSON.stringify({
          channel: frameMessage.channel,
          socketId: 1,
          source: BRIDGE_SOURCE,
          type: 'ping',
        })},
        origin: window.location.origin,
        source: window,
      }),
    )
  `)
  await browser.waitUntilComplete()

  assert.deepEqual(events.map(summarizeEvent), [
    ['frame', 1, 'outgoing', 'page-frame'],
    ['frame', 2, 'outgoing', 'child-frame'],
    ['frame', 1, 'incoming', 'incoming-frame'],
    ['error', 1],
    ['frame', 1, 'outgoing', '{"data":{},"event":"pusher:ping"}'],
  ])

  const cleanup = page.evaluate(`
    const socket = window.__firstSocket
    socket.readyState = window.__nativeWebSocket.CLOSED
    socket.dispatchEvent(new Event('close'))
    const sendRestored =
      !Object.hasOwn(socket, 'send') &&
      socket.send === window.__nativeWebSocket.prototype.send
    socket.dispatchEvent(
      new MessageEvent('message', { data: 'after-close' }),
    )
    sendRestored
  `)
  await browser.waitUntilComplete()

  assert.equal(cleanup, true)
  assert.equal(tap.ping(1), false)
  assert.deepEqual(events.at(-1), {
    observedAt: now,
    socketId: 1,
    type: 'closed',
  })
  assert.equal(
    events.some(
      (event) => event.type === 'frame' && event.data === 'after-close',
    ),
    false,
  )
})

test('relays only bounded string frames and rejects malformed bridge messages', async (t) => {
  const { browser, host, page } = createPageHarness()
  t.after(() => browser.close())

  const events = []
  const rawMessages = []
  const tap = new WebSocketTap(host, () => 500)

  host.addEventListener('message', (event) => {
    rawMessages.push(event.data)
  })
  tap.subscribe((event) => {
    events.push(event)
  })
  assert.equal(tap.install(), true)

  page.evaluate(`
    window.__validationSocket = new WebSocket('wss://example.test/socket')
    window.__validationSocket.send('seed')
    window.__validationSocket.send(new Uint8Array([1, 2, 3]))
    window.__validationSocket.dispatchEvent(
      new MessageEvent('message', { data: new Blob(['binary']) }),
    )
    window.__validationSocket.dispatchEvent(
      new MessageEvent('message', { data: 'x'.repeat(${MAX_FRAME_LENGTH + 1}) }),
    )
  `)
  await browser.waitUntilComplete()

  assert.deepEqual(events.map(summarizeEvent), [
    ['frame', 1, 'outgoing', 'seed'],
  ])

  const seedMessage = rawMessages.find((message) => message?.type === 'frame')
  const validFrame = {
    channel: seedMessage.channel,
    data: 'valid',
    direction: 'incoming',
    socketId: 1,
    source: BRIDGE_SOURCE,
    type: 'frame',
  }
  events.length = 0

  dispatchBridgeMessage(host, validFrame, {
    source: null,
  })
  dispatchBridgeMessage(host, validFrame, {
    origin: 'https://example.test',
  })
  dispatchBridgeMessage(host, { ...validFrame, channel: 'wrong' })
  dispatchBridgeMessage(host, { ...validFrame, source: 'wrong' })
  dispatchBridgeMessage(host, { ...validFrame, socketId: 0 })
  dispatchBridgeMessage(host, { ...validFrame, socketId: 1.5 })
  dispatchBridgeMessage(host, { ...validFrame, direction: 'sideways' })
  dispatchBridgeMessage(host, { ...validFrame, data: new Uint8Array() })
  dispatchBridgeMessage(host, {
    ...validFrame,
    data: 'x'.repeat(MAX_FRAME_LENGTH + 1),
  })
  dispatchBridgeMessage(host, [])
  dispatchBridgeMessage(
    host,
    new Proxy(validFrame, {
      get() {
        throw new Error('hostile getter')
      },
    }),
  )

  assert.deepEqual(events, [])

  dispatchBridgeMessage(host, {
    ...validFrame,
    data: 'x'.repeat(MAX_FRAME_LENGTH),
  })
  assert.equal(events.length, 1)
  assert.equal(events[0].type, 'frame')
  assert.equal(events[0].data.length, MAX_FRAME_LENGTH)
})

test('fails closed when page-context script execution is unavailable', async (t) => {
  const browser = new Browser()
  const page = browser.newPage()
  const host = page.mainFrame.window
  t.after(() => browser.close())

  page.url = PAGE_URL
  class FakeWebSocket {}
  host.WebSocket = FakeWebSocket

  const tap = new WebSocketTap(host)
  const { calls, messageHost } = createMessageHostFacade(host)
  const bridgedTap = new WebSocketTap(host, Date.now, messageHost)

  assert.equal(tap.install(), false)
  assert.equal(bridgedTap.install(), false)
  assert.equal(calls.added, 1)
  assert.equal(calls.removed, 1)
  assert.equal(host.WebSocket, FakeWebSocket)
  assert.equal(host.document.querySelector('script'), null)
  assert.equal(tap.ping(1), false)
})

function createPageHarness() {
  const browser = new Browser({
    settings: {
      enableJavaScriptEvaluation: true,
      suppressInsecureJavaScriptEnvironmentWarning: true,
    },
  })
  const page = browser.newPage()
  page.url = PAGE_URL
  page.evaluate(`
    window.__sockets = []
    window.__nativeWebSocket = class WebSocket extends EventTarget {
      static CONNECTING = 0
      static OPEN = 1
      static CLOSING = 2
      static CLOSED = 3

      readyState = 1
      sent = []

      constructor(...constructorArgs) {
        super()
        this.constructorArgs = constructorArgs
        window.__sockets.push(this)
      }

      send(data) {
        if (data === 'throw') {
          throw new TypeError('native-send-error')
        }

        this.sent.push(data)
        return 'native-return'
      }
    }
    Object.defineProperty(window, 'WebSocket', {
      configurable: true,
      enumerable: true,
      value: window.__nativeWebSocket,
      writable: true,
    })
  `)

  return {
    browser,
    host: page.mainFrame.window,
    page,
  }
}

function createMessageHostFacade(host) {
  const calls = {
    added: 0,
    posted: 0,
    removed: 0,
  }
  const messageHost = {
    addEventListener(...argumentsList) {
      calls.added += 1
      return host.addEventListener(...argumentsList)
    },
    postMessage(...argumentsList) {
      calls.posted += 1
      return host.postMessage(...argumentsList)
    },
    removeEventListener(...argumentsList) {
      calls.removed += 1
      return host.removeEventListener(...argumentsList)
    },
  }

  return { calls, messageHost }
}

function dispatchBridgeMessage(host, data, options = {}) {
  host.dispatchEvent(
    new host.MessageEvent('message', {
      data,
      origin: options.origin ?? host.location.origin,
      source: options.source === undefined ? host : options.source,
    }),
  )
}

function summarizeEvent(event) {
  return event.type === 'frame'
    ? [event.type, event.socketId, event.direction, event.data]
    : [event.type, event.socketId]
}
