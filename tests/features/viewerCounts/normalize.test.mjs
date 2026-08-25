import assert from 'node:assert/strict'
import test from 'node:test'

import { normalizeViewerCountPayload } from '../../../src/features/viewerCounts/model/normalize.ts'

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
