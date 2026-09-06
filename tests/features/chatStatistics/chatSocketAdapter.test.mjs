import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { ChatSocketAdapter } from '../../../src/features/chatStatistics/chatSocketAdapter.ts'
import { KickChatAdapter } from '../../../src/features/chatStatistics/kickChatAdapter.ts'
import { SocketRttTracker } from '../../../src/features/chatStatistics/rttTracker.ts'
import { ChatStatsStore } from '../../../src/features/chatStatistics/statsStore.ts'

const CHANNEL = 'chatrooms.29191.v2'

test('Centrifugo batches start calibration and publications update chat statistics', () => {
  const socket = new ChatSocketAdapter()
  const chat = new KickChatAdapter()
  const stats = new ChatStatsStore()
  const route = (event, collectMessages = true) => {
    const events = socket
      .accept(event)
      .flatMap((decoded) => chat.accept(decoded, collectMessages))
    events.forEach((decoded) => stats.accept(decoded))
    return events
  }

  route(
    frame('outgoing', [
      { connect: { name: 'js' }, id: 1 },
      { subscribe: { channel: CHANNEL, flag: 1 }, id: 2 },
    ]),
    false,
  )
  assert.equal(stats.getSnapshot(100).status, 'pending')

  route(
    frame('incoming', [
      { id: 1, connect: { ping: 25, pong: true } },
      { id: 2, subscribe: {} },
    ]),
    false,
  )
  assert.equal(stats.getSnapshot(100).status, 'active')
  assert.equal(chat.getPreferredSocketId(), 7)
  assert.equal(stats.getSnapshot(60_100).trendPercent, 0)

  const normal = publication('normal-message.json')
  const reply = publication('reply-message.json')
  const deleted = publication('message-deleted.json')
  const events = route(
    frame('incoming', [normal, normal, reply, deleted], 7, 60_200),
  )
  assert.equal(events.at(-1).type, 'messageDeleted')
  const snapshot = stats.getSnapshot(60_200)
  assert.equal(snapshot.messagesPerMinute, 2)
  assert.equal(snapshot.totalMessages, 2)
  assert.equal(snapshot.activeChatters, 2)
  assert.equal(snapshot.socketRttMs, null)
  assert.equal(socket.canPing(7), false)

  route(frame('outgoing', [{ id: 3, unsubscribe: { channel: CHANNEL } }]))
  assert.equal(stats.getSnapshot(60_300).status, 'pending')
})

test('matches acknowledgements by socket and command ID, and clears stale subscriptions', () => {
  const adapter = new ChatSocketAdapter()
  const subscribe = (id, socketId = 7) =>
    adapter.accept(
      frame('outgoing', [{ id, subscribe: { channel: CHANNEL } }], socketId),
    )
  const ack = (id, socketId = 7) =>
    adapter
      .accept(frame('incoming', [{ id, subscribe: {} }], socketId))
      .filter((event) => event.type !== 'rttSample')

  subscribe(2)
  assert.deepEqual(ack(2, 8), [])
  assert.deepEqual(ack(3), [])
  assert.equal(ack(2).at(-1).type, 'subscribed')
  assert.deepEqual(ack(2), [])

  subscribe(3)
  assert.equal(
    adapter.accept(frame('incoming', [{ id: 3, error: { code: 103 } }])).at(-1)
      .type,
    'unsubscribing',
  )
  assert.deepEqual(ack(3), [])

  subscribe(4)
  adapter.accept(
    frame('outgoing', [{ id: 5, unsubscribe: { channel: CHANNEL } }]),
  )
  assert.deepEqual(ack(4), [])

  subscribe(6)
  adapter.accept({ type: 'closed', socketId: 7, observedAt: 200 })
  assert.deepEqual(ack(6), [])

  subscribe(7, 8)
  assert.equal(ack(7, 8).at(-1).type, 'subscribed')
  const removed = adapter.accept(
    frame(
      'incoming',
      [{ push: { channel: CHANNEL, unsubscribe: { code: 2500 } } }],
      8,
    ),
  )
  assert.equal(removed[0].type, 'unsubscribing')
})

test('can discover live publications when the subscription handshake was missed', () => {
  const socket = new ChatSocketAdapter()
  const chat = new KickChatAdapter()
  const events = socket
    .accept(frame('incoming', [publication('normal-message.json')]))
    .flatMap((event) => chat.accept(event))
  assert.deepEqual(
    events.map((event) => event.type),
    ['sessionStarted', 'message'],
  )
})

test('ignores tracking, private channels, malformed data and server heartbeats', () => {
  const adapter = new ChatSocketAdapter()
  const unrelated = [
    {},
    [],
    null,
    { type: 'channel_handshake', data: { message: { channelId: '123' } } },
    { subscribe: { channel: 'private-channelpoints-123' }, id: 1 },
    { subscribe: { channel: CHANNEL }, id: -1 },
    { subscribe: { channel: CHANNEL }, id: '1' },
    { subscribe: { channel: CHANNEL }, id: 0x1_0000_0000 },
    {
      push: {
        channel: 'private-channelpoints-123',
        pub: { data: { event: 'PointsUpdated' } },
      },
    },
    { push: { channel: CHANNEL, pub: { data: [] } } },
    { push: { channel: CHANNEL, pub: { data: { event: 42 } } } },
  ]
  assert.deepEqual(adapter.accept(frame('incoming', unrelated)), [])
  assert.deepEqual(adapter.accept(frame('outgoing', unrelated)), [])
  assert.deepEqual(
    adapter.accept({ ...frame('incoming', []), data: new Uint8Array([1]) }),
    [],
  )
  assert.deepEqual(
    adapter.accept({
      ...frame('incoming', []),
      data: ' '.repeat(256 * 1024 + 1),
    }),
    [],
  )
  const valid = frame('incoming', [publication('normal-message.json')])
  assert.equal(
    adapter.accept({ ...valid, data: `{broken}\n${valid.data}` }).length,
    1,
  )
  assert.equal(adapter.canPing(7), false)
})

test('bounds pending acknowledgement state', () => {
  const adapter = new ChatSocketAdapter()
  for (let id = 1; id <= 129; id += 1) {
    adapter.accept(frame('outgoing', [{ id, subscribe: { channel: CHANNEL } }]))
  }
  assert.deepEqual(
    adapter.accept(frame('incoming', [{ id: 1, subscribe: {} }])),
    [],
  )
  assert.equal(
    adapter.accept(frame('incoming', [{ id: 129, subscribe: {} }])).at(-1).type,
    'subscribed',
  )
})

test('preserves Pusher chat and client RTT measurement', () => {
  const adapter = new ChatSocketAdapter()
  const tracker = new SocketRttTracker()
  const message = fixture('normal-message.json')
  assert.equal(
    adapter.accept(frame('incoming', [message]))[0].eventName,
    message.event,
  )
  assert.equal(adapter.canPing(7), true)
  const ping = adapter.accept(
    frame('outgoing', [{ event: 'pusher:ping', data: {} }], 7, 100),
  )[0]
  const pong = adapter.accept(
    frame('incoming', [{ event: 'pusher:pong', data: {} }], 7, 220),
  )[0]
  assert.equal(tracker.accept(ping), null)
  assert.deepEqual(tracker.accept(pong), { socketId: 7, rttMs: 120 })
  adapter.accept({ type: 'closed', socketId: 7, observedAt: 300 })
  assert.equal(adapter.canPing(7), false)
})

function frame(direction, envelopes, socketId = 7, observedAt = 100) {
  return {
    data: envelopes.map((envelope) => JSON.stringify(envelope)).join('\n'),
    direction,
    observedAt,
    socketId,
    type: 'frame',
  }
}

function fixture(name) {
  return JSON.parse(
    readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8'),
  )
}

function publication(name) {
  const { channel, data, event } = fixture(name)
  return { push: { channel, pub: { data: { event, data }, tags: { event } } } }
}
