import assert from 'node:assert/strict'
import test from 'node:test'

import { ChatSocketAdapter } from '../../../src/features/chatStatistics/chatSocketAdapter.ts'
import { CentrifugoRttTracker } from '../../../src/features/chatStatistics/centrifugoRttTracker.ts'
import { SocketRttTracker } from '../../../src/features/chatStatistics/rttTracker.ts'
import { ChatStatsStore } from '../../../src/features/chatStatistics/statsStore.ts'

test('measures replies by socket and request ID, including out-of-order replies', () => {
  const tracker = new CentrifugoRttTracker()
  tracker.accept({ id: 1, connect: {} }, 'outgoing', 7, 100)
  tracker.accept(
    { id: 2, subscribe: { channel: 'chatrooms.123.v2' } },
    'outgoing',
    7,
    110,
  )
  assert.equal(tracker.accept({ id: 1, connect: {} }, 'incoming', 8, 150), null)
  assert.equal(
    tracker.accept({ id: 1, subscribe: {} }, 'incoming', 7, 160),
    null,
  )
  assert.equal(
    tracker.accept({ id: 3, subscribe: {} }, 'incoming', 7, 170),
    null,
  )
  assert.deepEqual(
    tracker.accept({ id: 2, subscribe: {} }, 'incoming', 7, 310),
    {
      type: 'rttSample',
      socketId: 7,
      observedAt: 310,
      rttMs: 200,
    },
  )
  assert.equal(
    tracker.accept({ id: 1, connect: {} }, 'incoming', 7, 400).rttMs,
    300,
  )
  assert.equal(tracker.accept({ id: 1, connect: {} }, 'incoming', 7, 410), null)
})

test('does not mistake immediate heartbeat responses or publications for RTT', () => {
  const tracker = new CentrifugoRttTracker()
  for (const direction of ['incoming', 'outgoing']) {
    for (const envelope of [
      {},
      { push: {} },
      { id: -1, connect: {} },
      { id: 1, connect: [] },
    ]) {
      assert.equal(tracker.accept(envelope, direction, 7, 100), null)
    }
  }
})

test('expires pending requests, clears closed sockets, and measures error replies', () => {
  const tracker = new CentrifugoRttTracker()
  tracker.accept({ id: 1, subscribe: {} }, 'outgoing', 7, 100)
  assert.equal(
    tracker.accept({ id: 1, subscribe: {} }, 'incoming', 7, 15_101),
    null,
  )
  tracker.accept({ id: 2, refresh: {} }, 'outgoing', 7, 20_000)
  assert.equal(
    tracker.accept({ id: 2, error: { code: 103 } }, 'incoming', 7, 20_200)
      .rttMs,
    200,
  )
  tracker.accept({ id: 3, subscribe: {} }, 'outgoing', 7, 21_000)
  tracker.clearSocket(7)
  assert.equal(
    tracker.accept({ id: 3, subscribe: {} }, 'incoming', 7, 21_200),
    null,
  )
})

test('bounds pending requests and rejects negative timing', () => {
  const tracker = new CentrifugoRttTracker()
  for (let id = 1; id <= 129; id += 1)
    tracker.accept({ id, subscribe: {} }, 'outgoing', 7, 100)
  assert.equal(
    tracker.accept({ id: 1, subscribe: {} }, 'incoming', 7, 200),
    null,
  )
  assert.equal(
    tracker.accept({ id: 129, subscribe: {} }, 'incoming', 7, 90),
    null,
  )
  assert.equal(
    tracker.accept({ id: 128, subscribe: {} }, 'incoming', 7, 200).rttMs,
    100,
  )
})

test('batched Centrifugo replies populate the displayed socket RTT without a probe', () => {
  const adapter = new ChatSocketAdapter()
  const rtt = new SocketRttTracker()
  const stats = new ChatStatsStore()
  stats.accept({ type: 'sessionStarted', chatroomId: '123', observedAt: 0 })
  adapter.accept({
    type: 'frame',
    direction: 'outgoing',
    socketId: 7,
    observedAt: 100,
    data: '{"id":1,"connect":{}}\n{"id":2,"subscribe":{"channel":"chatrooms.123.v2"}}',
  })
  const events = adapter.accept({
    type: 'frame',
    direction: 'incoming',
    socketId: 7,
    observedAt: 295,
    data: '{"id":1,"connect":{"ping":25,"pong":true}}\n{"id":2,"subscribe":{}}',
  })
  for (const event of events) {
    const sample = rtt.accept(event)
    if (sample) stats.addRttSample(sample.socketId, sample.rttMs)
  }
  assert.equal(stats.getSnapshot(300, 7).socketRttMs, 195)
  assert.equal(adapter.canPing(7), false)
  adapter.accept({ type: 'closed', socketId: 7, observedAt: 400 })
  assert.deepEqual(
    adapter.accept({
      type: 'frame',
      direction: 'incoming',
      socketId: 7,
      observedAt: 500,
      data: '{"id":2,"subscribe":{}}',
    }),
    [],
  )
})
