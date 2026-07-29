import assert from 'node:assert/strict'
import test from 'node:test'

import { normalizeViewerCountPayload } from '../src/features/viewerCounts/normalize.ts'
import { ViewerCountStore } from '../src/features/viewerCounts/store.ts'

const START_TIME = '2026-07-28 03:00:00'
const STARTED_AT = Date.UTC(2026, 6, 28, 3)

const STREAM_ENDPOINT_CASES = [
  {
    endpoint: 'CHANNEL_DETAILS',
    payload: {
      id: 10,
      slug: 'Channel-One',
      livestream: {
        id: 100,
        is_live: true,
        show_view_count: false,
        start_time: START_TIME,
        viewer_count: 123,
      },
    },
    source: 'channel-details',
  },
  {
    endpoint: 'FOLLOWED_CHANNELS',
    payload: {
      channels: [
        {
          channel_slug: 'Channel-One',
          is_live: true,
          show_view_count: false,
          start_time: START_TIME,
          viewer_count: 123,
        },
      ],
    },
    source: 'followed-channels',
  },
  {
    endpoint: 'USER_LIVESTREAMS',
    payload: [
      {
        channel: {
          id: 10,
          slug: 'Channel-One',
        },
        id: 100,
        is_live: true,
        show_view_count: false,
        start_time: START_TIME,
        viewer_count: 123,
      },
    ],
    source: 'user-livestreams',
  },
  {
    endpoint: 'RECOMMENDED_LIVESTREAMS',
    payload: {
      data: [
        {
          channel: {
            id: 10,
            slug: 'Channel-One',
          },
          id: 100,
          show_view_count: false,
          start_time: START_TIME,
          viewer_count: 123,
        },
      ],
    },
    source: 'recommendations',
  },
  {
    endpoint: 'PAGINATED_RECOMMENDED_LIVESTREAMS',
    payload: {
      data: {
        livestreams: [
          {
            channel: {
              id: 10,
              slug: 'Channel-One',
            },
            id: 100,
            show_view_count: false,
            start_time: START_TIME,
            viewer_count: 123,
          },
        ],
      },
    },
    source: 'recommendations',
  },
  {
    endpoint: 'SIDEBAR_LIVESTREAMS',
    payload: {
      data: {
        livestreams: [
          {
            channel: {
              id: 10,
              slug: 'Channel-One',
            },
            id: 100,
            show_view_count: false,
            start_time: START_TIME,
            viewer_count: 123,
          },
        ],
      },
    },
    source: 'sidebar-recommendations',
  },
  {
    endpoint: 'FEATURED_LIVESTREAMS',
    payload: {
      data: {
        livestreams: [
          {
            channel: {
              id: 10,
              slug: 'Channel-One',
            },
            id: 100,
            show_view_count: false,
            start_time: START_TIME,
            viewer_count: 123,
          },
        ],
      },
    },
    source: 'featured',
  },
]

test('normalizes every supported stream payload shape', () => {
  for (const testCase of STREAM_ENDPOINT_CASES) {
    const result = normalizeViewerCountPayload(
      testCase.endpoint,
      testCase.payload,
      1_000,
    )

    assert.equal(result.kind, 'streams')
    assert.equal(result.streams.length, 1)
    assert.deepEqual(
      {
        capturedAt: result.streams[0].capturedAt,
        channelSlug: result.streams[0].channelSlug,
        isLive: result.streams[0].isLive,
        showViewCount: result.streams[0].showViewCount,
        source: result.streams[0].source,
        startedAt: result.streams[0].startedAt,
        viewerCount: result.streams[0].viewerCount,
      },
      {
        capturedAt: 1_000,
        channelSlug: 'channel-one',
        isLive: true,
        showViewCount: false,
        source: testCase.source,
        startedAt: STARTED_AT,
        viewerCount: 123,
      },
      testCase.endpoint,
    )
  }
})

test('normalizes current-viewer records and ignores invalid entries', () => {
  const result = normalizeViewerCountPayload(
    'CURRENT_VIEWERS',
    [
      {
        livestream_id: '100',
        show_view_count: false,
        viewers: 456,
      },
      {
        livestream_id: -1,
        viewers: 20,
      },
      {
        livestream_id: 101,
        viewers: Number.NaN,
      },
    ],
    2_000,
  )

  assert.deepEqual(result, {
    currentViewers: [
      {
        capturedAt: 2_000,
        livestreamId: 100,
        showViewCount: false,
        viewerCount: 456,
      },
    ],
    kind: 'current-viewers',
  })
})

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

  assert.equal(
    store.get('channel-one', now + 100)?.viewerCount,
    200,
  )

  store.upsertStreams([
    stream({
      capturedAt: now + 200,
      livestreamId: 11,
      showViewCount: false,
      source: 'channel-details',
      viewerCount: 300,
    }),
  ])

  assert.equal(
    store.get('channel-one', now + 200)?.viewerCount,
    300,
  )
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
      livestreamId: undefined,
      showViewCount: false,
      source: 'recommendations',
      viewerCount: 100,
    }),
  ])

  assert.ok(store.get('channel-one', now + 300_000))
  assert.equal(store.get('channel-one', now + 300_001), undefined)
  store.prune(now + 300_001)
  assert.equal(store.get('channel-one', now + 300_001), undefined)
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
