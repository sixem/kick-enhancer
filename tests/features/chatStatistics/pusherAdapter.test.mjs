import assert from 'node:assert/strict'
import test from 'node:test'

import { decodePusherEvent } from '../../../src/features/chatStatistics/pusherAdapter.ts'

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

function frame(direction, payload) {
  return {
    data: JSON.stringify(payload),
    direction,
    observedAt: 100,
    socketId: 7,
    type: 'frame',
  }
}
