import assert from 'node:assert/strict'
import test from 'node:test'

import { KickChatAdapter } from '../src/features/chatStatistics/kickChatAdapter.ts'
import { decodePusherEvent } from '../src/features/chatStatistics/pusherAdapter.ts'
import { SocketRttTracker } from '../src/features/chatStatistics/rttTracker.ts'

const CHANNEL = 'chatrooms.29191.v2'

test('decodes Pusher lifecycle while leaving event data lazy', () => {
  assert.deepEqual(
    decodePusherEvent(
      frame('outgoing', {
        data: JSON.stringify({ channel: CHANNEL }),
        event: 'pusher:subscribe',
      }),
    ),
    {
      channelName: CHANNEL,
      observedAt: 100,
      socketId: 7,
      type: 'subscribing',
    },
  )

  assert.deepEqual(
    decodePusherEvent(
      frame('incoming', {
        channel: CHANNEL,
        data: '{}',
        event: 'pusher_internal:subscription_succeeded',
      }),
    ),
    {
      channelName: CHANNEL,
      observedAt: 100,
      socketId: 7,
      type: 'subscribed',
    },
  )

  const nestedData = JSON.stringify({ id: 'message-1' })
  const decoded = decodePusherEvent(
    frame('incoming', {
      channel: CHANNEL,
      data: nestedData,
      event: 'App\\Events\\ChatMessageEvent',
    }),
  )

  assert.equal(decoded?.data, nestedData)
})

test('rejects malformed, binary, and unsupported Pusher frames', () => {
  assert.equal(
    decodePusherEvent({
      data: '{',
      direction: 'incoming',
      observedAt: 100,
      socketId: 7,
      type: 'frame',
    }),
    null,
  )
  assert.equal(
    decodePusherEvent({
      data: new Uint8Array([1]),
      direction: 'incoming',
      observedAt: 100,
      socketId: 7,
      type: 'frame',
    }),
    null,
  )
  assert.equal(
    decodePusherEvent(
      frame('incoming', {
        data: {},
        event: 'pusher:connection_established',
      }),
    ),
    null,
  )
})

test('requires subscribe confirmation and emits sanitized messages', () => {
  const adapter = new KickChatAdapter()
  const message = pusherMessage({
    chatroom_id: 29191,
    content: 'must not be retained',
    created_at: '2026-01-01T00:00:00Z',
    id: 'message-1',
    metadata: { mentions: ['private-shape'] },
    sender: {
      id: 42,
      username: 'must-not-be-retained',
    },
    type: 'message',
  })

  assert.deepEqual(adapter.accept(message), [])
  assert.deepEqual(adapter.accept(subscribing()), [])
  assert.deepEqual(adapter.accept(subscribed()), [
    {
      channelName: CHANNEL,
      chatroomId: '29191',
      observedAt: 200,
      socketId: 7,
      type: 'sessionStarted',
    },
  ])

  const events = adapter.accept(message)

  assert.deepEqual(events, [
    {
      channelName: CHANNEL,
      chatroomId: '29191',
      messageId: 'message-1',
      messageType: 'message',
      observedAt: 300,
      senderId: '42',
      socketId: 7,
      type: 'message',
    },
  ])
  assert.equal('content' in events[0], false)
  assert.equal('username' in events[0], false)
})

test('tracks sessions without decoding messages while collection is disabled', () => {
  const adapter = new KickChatAdapter()
  const message = pusherMessage({
    chatroom_id: 29191,
    id: 'message-1',
    sender: { id: 42 },
    type: 'message',
  })

  adapter.accept(subscribing())
  assert.equal(adapter.accept(subscribed())[0]?.type, 'sessionStarted')
  assert.deepEqual(adapter.accept(message, false), [])
  assert.equal(adapter.accept(message)[0]?.type, 'message')
  assert.equal(adapter.accept(unsubscribing())[0]?.type, 'sessionEnded')
})

test('rejects changed message contracts and late events', () => {
  const adapter = new KickChatAdapter()
  adapter.accept(subscribing())
  adapter.accept(subscribed())

  assert.deepEqual(
    adapter.accept(
      pusherMessage({
        chatroom_id: 999,
        id: 'wrong-room',
        sender: { id: 42 },
        type: 'message',
      }),
    ),
    [],
  )
  assert.deepEqual(
    adapter.accept(
      pusherMessage({
        chatroom_id: 29191,
        id: 'missing-sender',
        type: 'message',
      }),
    ),
    [],
  )

  assert.equal(adapter.accept(unsubscribing())[0]?.type, 'sessionEnded')
  assert.deepEqual(
    adapter.accept(
      pusherMessage({
        chatroom_id: 29191,
        id: 'late',
        sender: { id: 42 },
        type: 'message',
      }),
    ),
    [],
  )
})

test('closing a socket ends all of its confirmed sessions', () => {
  const adapter = new KickChatAdapter()
  adapter.accept(subscribing())
  adapter.accept(subscribed())

  const events = adapter.accept({
    observedAt: 400,
    socketId: 7,
    type: 'socketClosed',
  })

  assert.equal(events.length, 1)
  assert.equal(events[0]?.type, 'sessionEnded')
})

test('matches only outgoing ping to incoming pong on one socket', () => {
  const tracker = new SocketRttTracker()

  assert.equal(
    tracker.accept({
      direction: 'incoming',
      observedAt: 1_000,
      socketId: 7,
      type: 'ping',
    }),
    null,
  )
  assert.equal(
    tracker.accept({
      direction: 'outgoing',
      observedAt: 2_000,
      socketId: 7,
      type: 'ping',
    }),
    null,
  )
  assert.equal(
    tracker.accept({
      direction: 'incoming',
      observedAt: 2_050,
      socketId: 8,
      type: 'pong',
    }),
    null,
  )
  const sample = tracker.accept({
    direction: 'incoming',
    observedAt: 2_108.6,
    socketId: 7,
    type: 'pong',
  })

  assert.equal(sample?.socketId, 7)
  assert.ok(Math.abs((sample?.rttMs ?? 0) - 108.6) < 0.001)
})

test('allows a new RTT probe only after the pending sample expires', () => {
  const tracker = new SocketRttTracker()
  tracker.accept({
    direction: 'outgoing',
    observedAt: 1_000,
    socketId: 7,
    type: 'ping',
  })

  assert.equal(tracker.canStart(7, 10_000, 15_000), false)
  assert.equal(tracker.canStart(7, 17_000, 15_000), true)
})

function frame(direction, payload) {
  return {
    data: JSON.stringify(payload),
    direction,
    observedAt: 100,
    socketId: 7,
    type: 'frame',
  }
}

function subscribing() {
  return {
    channelName: CHANNEL,
    observedAt: 100,
    socketId: 7,
    type: 'subscribing',
  }
}

function subscribed() {
  return {
    channelName: CHANNEL,
    observedAt: 200,
    socketId: 7,
    type: 'subscribed',
  }
}

function unsubscribing() {
  return {
    channelName: CHANNEL,
    observedAt: 400,
    socketId: 7,
    type: 'unsubscribing',
  }
}

function pusherMessage(data) {
  return {
    channelName: CHANNEL,
    data: JSON.stringify(data),
    eventName: 'App\\Events\\ChatMessageEvent',
    observedAt: 300,
    socketId: 7,
    type: 'event',
  }
}
