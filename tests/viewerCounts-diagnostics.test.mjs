import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getViewerEndpointObservations,
  recordViewerEndpointObservation,
  runViewerEndpointChecks,
  subscribeViewerEndpointObservations,
} from '../src/features/viewerCounts/diagnostics.ts'
import { normalizeViewerCountPayload } from '../src/features/viewerCounts/normalize.ts'

test('records passive endpoint summaries without retaining payloads', () => {
  const normalized = normalizeViewerCountPayload(
    'CHANNEL_DETAILS',
    {
      livestream: {
        id: 10,
        is_live: true,
        show_view_count: false,
        start_time: '2026-07-28 11:00:00',
        viewer_count: 321,
      },
      slug: 'channel-one',
    },
    1_000,
  )

  const observation = recordViewerEndpointObservation(
    'CHANNEL_DETAILS',
    normalized,
    1_000,
    'captured',
  )

  assert.deepEqual(observation, {
    endpoint: 'CHANNEL_DETAILS',
    hiddenViewerCounts: 1,
    observedAt: 1_000,
    records: 1,
    source: 'captured',
    startTimes: 1,
  })
  assert.equal(
    'payload' in getViewerEndpointObservations()[0],
    false,
  )
})

test('batches passive endpoint observation notifications', async (t) => {
  const snapshots = []
  const unsubscribe = subscribeViewerEndpointObservations(
    (observations) => snapshots.push(observations),
  )
  t.after(unsubscribe)
  const first = normalizeViewerCountPayload(
    'CURRENT_VIEWERS',
    [{ livestream_id: 10, viewers: 100 }],
    2_000,
  )
  const second = normalizeViewerCountPayload(
    'CURRENT_VIEWERS',
    [{ livestream_id: 10, viewers: 101 }],
    3_000,
  )

  recordViewerEndpointObservation(
    'CURRENT_VIEWERS',
    first,
    2_000,
    'captured',
  )
  recordViewerEndpointObservation(
    'CURRENT_VIEWERS',
    second,
    3_000,
    'captured',
  )

  assert.equal(snapshots.length, 0)
  await new Promise((resolve) => setTimeout(resolve, 250))

  assert.equal(snapshots.length, 1)
  assert.equal(
    snapshots[0].find(
      ({ endpoint }) => endpoint === 'CURRENT_VIEWERS',
    ).observedAt,
    3_000,
  )
})

test('checks channel details before current viewers', async (t) => {
  const requests = installFetchEnvironment(t, [
    {
      body: {
        livestream: {
          id: 100,
          is_live: true,
          show_view_count: false,
          start_time: '2026-07-28 11:00:00',
          viewer_count: 321,
        },
        slug: 'channel-one',
      },
      status: 200,
    },
    {
      body: [
        {
          livestream_id: 100,
          show_view_count: false,
          viewers: 333,
        },
      ],
      status: 200,
    },
  ])

  const results = await runViewerEndpointChecks(
    'Channel-One',
    new AbortController().signal,
  )

  assert.equal(requests.length, 2)
  assert.equal(
    requests[0],
    'https://kick.com/api/v2/channels/channel-one',
  )
  assert.equal(
    requests[1],
    'https://kick.com/current-viewers?ids%5B%5D=100',
  )
  assert.deepEqual(
    results.map(({ endpoint, httpStatus, status }) => ({
      endpoint,
      httpStatus,
      status,
    })),
    [
      {
        endpoint: 'CHANNEL_DETAILS',
        httpStatus: 200,
        status: 'passed',
      },
      {
        endpoint: 'CURRENT_VIEWERS',
        httpStatus: 200,
        status: 'passed',
      },
    ],
  )
})

test('reports an offline channel without requesting current viewers', async (t) => {
  const requests = installFetchEnvironment(t, [
    {
      body: {
        livestream: null,
        slug: 'offline-channel',
      },
      status: 200,
    },
  ])

  const results = await runViewerEndpointChecks(
    'offline-channel',
    new AbortController().signal,
  )

  assert.equal(requests.length, 1)
  assert.deepEqual(
    results.map(({ status }) => status),
    ['unavailable', 'unavailable'],
  )
})

function installFetchEnvironment(t, responses) {
  const previousWindow = globalThis.window
  const previousFetch = globalThis.fetch
  const requests = []

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: new URL('https://kick.com/channel-one'),
    },
  })
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    value: async (url) => {
      requests.push(String(url))
      const response = responses.shift()

      if (!response) {
        throw new Error('Unexpected request')
      }

      return new Response(JSON.stringify(response.body), {
        headers: {
          'content-type': 'application/json',
        },
        status: response.status,
      })
    },
  })

  t.after(() => {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: previousWindow,
    })
    Object.defineProperty(globalThis, 'fetch', {
      configurable: true,
      value: previousFetch,
    })
  })

  return requests
}
