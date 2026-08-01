import assert from 'node:assert/strict'
import test from 'node:test'

import { KickChatAdapter } from '../../../src/features/chatStatistics/kickChatAdapter.ts'

const CHANNEL = 'chatrooms.29191.v2'

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
