import assert from 'node:assert/strict'
import test from 'node:test'

import { ViewerCountStore } from '../../../src/features/viewerCounts/model/store.ts'

test('store preserves hidden ownership while enriching channel details', () => {
  const store = new ViewerCountStore()
  const now = Date.now()

  store.upsertStreams([
    stream({
      capturedAt: now,
      livestreamId: undefined,
      showViewCount: false,
      source: 'recommendations',
      startedAt: now - 3_600_000,
      viewerCount: 100,
    }),
  ])
  store.upsertStreams([
    stream({
      capturedAt: now + 100,
      livestreamId: 10,
      showViewCount: true,
      source: 'channel-details',
      viewerCount: 110,
    }),
  ])

  assert.deepEqual(store.get('channel-one', now + 100), {
    capturedAt: now + 100,
    channelSlug: 'channel-one',
    isLive: true,
    livestreamId: 10,
    showViewCount: false,
    source: 'channel-details',
    startedAt: now - 3_600_000,
    viewerCount: 110,
  })
})

test('store resolves fresh current counts and removes changed livestream IDs', () => {
  const store = new ViewerCountStore()
  const now = Date.now()

  store.upsertStreams([
    stream({
      capturedAt: now,
      livestreamId: 10,
      showViewCount: false,
      source: 'channel-details',
      viewerCount: 100,
    }),
  ])
  store.upsertCurrentViewers([
    {
      capturedAt: now + 100,
      livestreamId: 10,
      viewerCount: 200,
    },
  ])

  assert.equal(store.get('channel-one', now + 100)?.viewerCount, 200)

  store.upsertStreams([
    stream({
      capturedAt: now + 200,
      livestreamId: 11,
      showViewCount: false,
      source: 'channel-details',
      viewerCount: 300,
    }),
  ])

  assert.equal(store.get('channel-one', now + 200)?.viewerCount, 300)
  assert.equal(store.removeLivestreamIds([10]), 0)
  assert.equal(store.removeLivestreamIds([11]), 1)
  assert.equal(store.get('channel-one', now + 200), undefined)
})

test('store expires stale records instead of displaying them as live', () => {
  const store = new ViewerCountStore()
  const now = Date.now()

  store.upsertStreams([
    stream({
      capturedAt: now,
      livestreamId: 10,
      showViewCount: false,
      source: 'recommendations',
      viewerCount: 100,
    }),
  ])

  assert.ok(store.get('channel-one', now + 300_000))
  assert.equal(store.get('channel-one', now + 300_001), undefined)
  store.prune(now + 300_001)
  assert.equal(store.removeLivestreamIds([10]), 0)
})

function stream(overrides) {
  return {
    capturedAt: 0,
    channelSlug: 'channel-one',
    isLive: true,
    showViewCount: false,
    source: 'channel-details',
    viewerCount: 0,
    ...overrides,
  }
}
