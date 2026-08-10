import assert from 'node:assert/strict'
import test from 'node:test'

import { KickChatAdapter } from '../../../src/features/chatStatistics/kickChatAdapter.ts'

const CHANNEL = 'chatrooms.29191.v2'

test('emits sanitized messages after subscription confirmation', () => {
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

  assert.deepEqual(adapter.accept(subscribing()), [])
  assert.deepEqual(adapter.accept(subscribed()), [
    {
      chatroomId: '29191',
      observedAt: 200,
      type: 'sessionStarted',
    },
  ])

  const events = adapter.accept(message)

  assert.deepEqual(events, [
    {
      chatroomId: '29191',
      messageId: 'message-1',
      messageType: 'message',
      observedAt: 300,
      senderId: '42',
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

test('keeps the logical session when its socket closes', () => {
  const adapter = new KickChatAdapter()
  adapter.accept(subscribing())
  adapter.accept(subscribed())

  const events = adapter.accept({
    observedAt: 400,
    socketId: 7,
    type: 'socketClosed',
  })

  assert.deepEqual(events, [])
  assert.equal(adapter.getPreferredSocketId(), null)
})

test('merges same-room socket replicas and fails RTT selection over', () => {
  const adapter = new KickChatAdapter()

  adapter.accept(subscribing(7))
  assert.equal(adapter.accept(subscribed(7))[0]?.type, 'sessionStarted')
  adapter.accept(subscribing(8))
  assert.deepEqual(adapter.accept(subscribed(8)), [])
  assert.equal(adapter.getPreferredSocketId(), 7)

  adapter.accept({
    observedAt: 300,
    socketId: 7,
    type: 'socketClosed',
  })

  assert.equal(adapter.getPreferredSocketId(), 8)
  assert.equal(
    adapter.accept(
      pusherMessage(
        {
          chatroom_id: 29191,
          id: 'replica-message',
          sender: { id: 42 },
          type: 'message',
        },
        { socketId: 8 },
      ),
    )[0]?.type,
    'message',
  )
})

test('switches logical rooms before the previous room unsubscribes', () => {
  const adapter = new KickChatAdapter()
  const nextChannel = 'chatrooms.777.v2'

  adapter.accept(subscribing())
  adapter.accept(subscribed())

  assert.deepEqual(adapter.accept(subscribing(8, nextChannel, 400)), [
    {
      chatroomId: '29191',
      observedAt: 400,
      type: 'sessionEnded',
    },
  ])
  assert.deepEqual(adapter.accept(subscribed(8, nextChannel, 500)), [
    {
      chatroomId: '777',
      observedAt: 500,
      type: 'sessionStarted',
    },
  ])

  assert.deepEqual(
    adapter.accept(
      pusherMessage(
        {
          chatroom_id: 29191,
          id: 'late-old-room',
          sender: { id: 42 },
          type: 'message',
        },
        { socketId: 7 },
      ),
    ),
    [],
  )
  assert.deepEqual(adapter.accept(subscribed(7, CHANNEL, 600)), [])
  assert.equal(adapter.getPreferredSocketId(), 8)
})

test('preserves statistics lifecycle across a same-room reconnect', () => {
  const adapter = new KickChatAdapter()
  adapter.accept(subscribing())
  adapter.accept(subscribed())

  assert.deepEqual(
    adapter.accept({ observedAt: 300, socketId: 7, type: 'socketClosed' }),
    [],
  )
  assert.deepEqual(adapter.accept(subscribing(8, CHANNEL, 400)), [])
  assert.deepEqual(adapter.accept(subscribed(8, CHANNEL, 500)), [])
  assert.equal(adapter.getPreferredSocketId(), 8)
})

test('bootstraps from confirmation or a message when earlier frames were missed', () => {
  const confirmedAdapter = new KickChatAdapter()

  assert.equal(confirmedAdapter.accept(subscribed())[0]?.type, 'sessionStarted')

  const messageAdapter = new KickChatAdapter()
  const events = messageAdapter.accept(
    pusherMessage({
      chatroom_id: 29191,
      id: 'first-observed-frame',
      sender: { id: 42 },
      type: 'message',
    }),
  )

  assert.deepEqual(
    events.map((event) => event.type),
    ['sessionStarted', 'message'],
  )
  assert.equal(messageAdapter.getPreferredSocketId(), 7)
})

test('accepts a valid message before subscription confirmation', () => {
  const adapter = new KickChatAdapter()
  adapter.accept(subscribing())

  const events = adapter.accept(
    pusherMessage({
      chatroom_id: 29191,
      id: 'early-message',
      sender: { id: 42 },
      type: 'message',
    }),
  )

  assert.deepEqual(
    events.map((event) => event.type),
    ['sessionStarted', 'message'],
  )
  assert.deepEqual(adapter.accept(subscribed()), [])
})

function subscribing(socketId = 7, channelName = CHANNEL, observedAt = 100) {
  return {
    channelName,
    observedAt,
    socketId,
    type: 'subscribing',
  }
}

function subscribed(socketId = 7, channelName = CHANNEL, observedAt = 200) {
  return {
    channelName,
    observedAt,
    socketId,
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

function pusherMessage(data, options = {}) {
  return {
    channelName: options.channelName ?? CHANNEL,
    data: JSON.stringify(data),
    eventName: 'App\\Events\\ChatMessageEvent',
    observedAt: options.observedAt ?? 300,
    socketId: options.socketId ?? 7,
    type: 'event',
  }
}
