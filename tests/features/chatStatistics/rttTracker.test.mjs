import assert from 'node:assert/strict'
import test from 'node:test'

import { SocketRttTracker } from '../../../src/features/chatStatistics/rttTracker.ts'

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
