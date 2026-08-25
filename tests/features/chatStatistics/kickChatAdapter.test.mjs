import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { KickChatAdapter } from '../../../src/features/chatStatistics/kickChatAdapter.ts'
import { decodePusherEvent } from '../../../src/features/chatStatistics/pusherAdapter.ts'

const CHANNEL = 'chatrooms.29191.v2'

test('routes the sanitized current KICK contract fixtures', () => {
  const adapter = new KickChatAdapter()
  const normal = decodeFixture('normal-message.json')
  const reply = decodeFixture('reply-message.json')
  const deleted = decodeFixture('message-deleted.json')

  assert.deepEqual(
    [
      ...adapter.accept(normal),
      ...adapter.accept(reply),
      ...adapter.accept(deleted),
    ],
    [
      {
        chatroomId: '29191',
        observedAt: 100,
        type: 'sessionStarted',
      },
      {
        chatroomId: '29191',
        content: 'Synthetic fixture message',
        messageId: 'message-001',
        messageType: 'message',
        observedAt: 100,
        senderId: '101',
        type: 'message',
      },
      {
        chatroomId: '29191',
        content: 'Synthetic fixture reply',
        messageId: 'message-002',
        messageType: 'reply',
        observedAt: 100,
        senderId: '202',
        type: 'message',
      },
      {
        chatroomId: '29191',
        messageId: 'message-001',
        observedAt: 100,
        type: 'messageDeleted',
      },
    ],
  )
})

test('tracks sessions without reading messages while collection is disabled', () => {
  const adapter = new KickChatAdapter()
  const unreadableMessage = {
    ...pusherMessage({}),
    data: new Proxy(
      {},
      {
        get() {
          throw new Error('Message payload was read.')
        },
      },
    ),
  }
  const validMessage = pusherMessage({
    chatroom_id: 29191,
    id: 'message-1',
    sender: { id: 42 },
    type: 'message',
  })

  adapter.accept(subscribing())
  assert.equal(adapter.accept(subscribed())[0]?.type, 'sessionStarted')
  assert.deepEqual(adapter.accept(unreadableMessage, false), [])
  assert.equal(adapter.accept(validMessage)[0]?.type, 'message')
  assert.equal(adapter.accept(unsubscribing())[0]?.type, 'sessionEnded')
})

test('rejects changed chat contracts and late events', () => {
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
  assert.deepEqual(adapter.accept(pusherDeletion({ message: [] })), [])

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
  assert.deepEqual(
    adapter.accept(
      pusherDeletion({ message: { id: 'late-old-room' } }, { socketId: 7 }),
    ),
    [],
  )
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
  assert.equal(adapter.getPreferredSocketId(), null)
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

function pusherDeletion(data, options = {}) {
  return {
    channelName: options.channelName ?? CHANNEL,
    data: JSON.stringify(data),
    eventName: 'App\\Events\\MessageDeletedEvent',
    observedAt: options.observedAt ?? 350,
    socketId: options.socketId ?? 7,
    type: 'event',
  }
}

function decodeFixture(name) {
  const text = readFileSync(
    new URL(`./fixtures/${name}`, import.meta.url),
    'utf8',
  )
  const event = decodePusherEvent({
    data: text,
    direction: 'incoming',
    observedAt: 100,
    socketId: 7,
    type: 'frame',
  })

  assert.equal(event?.type, 'event')
  return event
}
