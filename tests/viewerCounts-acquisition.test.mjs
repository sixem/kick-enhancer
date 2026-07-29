import assert from 'node:assert/strict'
import test from 'node:test'

import { ViewerCountAcquisition } from '../src/features/viewerCounts/acquisition.ts'
import { ViewerCountStore } from '../src/features/viewerCounts/store.ts'

test('queues uncovered list targets behind an active-channel poll', async (t) => {
  const environment = installBrowserEnvironment(t)
  const store = new ViewerCountStore()

  store.upsertStreams([
    stream('active', 1),
    stream('sidebar', 2),
  ])

  const acquisition = new ViewerCountAcquisition({
    onData() {},
    store,
  })

  acquisition.start()
  acquisition.syncTargets(new Set(['active', 'sidebar']), 'active')
  t.mock.timers.tick(120_000)

  assert.equal(environment.requests.length, 1)
  assert.deepEqual(readIds(environment.requests[0].url), ['1'])

  environment.resolveNext([
    {
      livestream_id: 1,
      viewers: 101,
    },
  ])
  await flushAsyncWork()

  assert.equal(environment.requests.length, 2)
  assert.deepEqual(readIds(environment.requests[1].url), ['2'])

  environment.resolveNext([
    {
      livestream_id: 2,
      viewers: 202,
    },
  ])
  await flushAsyncWork()
  acquisition.stop()
})

test('drops fallback work removed from the latest target set', async (t) => {
  const environment = installBrowserEnvironment(t)
  const store = new ViewerCountStore()
  const slugs = Array.from({ length: 6 }, (_, index) => `channel-${index}`)
  const acquisition = new ViewerCountAcquisition({
    onData() {},
    store,
  })

  acquisition.start()
  acquisition.syncTargets(new Set(slugs), undefined)

  assert.equal(environment.requests.length, 5)
  acquisition.syncTargets(new Set(slugs.slice(0, 5)), undefined)

  for (let index = 0; index < 5; index += 1) {
    environment.resolveNext({
      livestream: null,
      slug: slugs[index],
    })
  }

  await flushAsyncWork()
  assert.equal(environment.requests.length, 5)
  assert.ok(
    environment.requests.every(
      ({ url }) => !url.endsWith('/channel-5'),
    ),
  )
  acquisition.stop()
})

test('fetches missing uptime data for visible streams', (t) => {
  const environment = installBrowserEnvironment(t)
  const store = new ViewerCountStore()
  const acquisition = new ViewerCountAcquisition({
    onData() {},
    store,
  })

  store.upsertStreams([
    {
      ...stream('visible-channel', 1),
      startedAt: undefined,
    },
  ])

  acquisition.start()
  acquisition.syncTargets(new Set(['visible-channel']), undefined)

  assert.equal(environment.requests.length, 1)
  assert.equal(
    environment.requests[0].url,
    'https://kick.com/api/v2/channels/visible-channel',
  )
  acquisition.stop()
})

test('pauses polling while hidden and refreshes all targets on resume', async (t) => {
  const environment = installBrowserEnvironment(t)
  const store = new ViewerCountStore()

  store.upsertStreams([
    stream('active', 1),
    stream('sidebar', 2),
  ])

  const acquisition = new ViewerCountAcquisition({
    onData() {},
    store,
  })

  acquisition.start()
  acquisition.syncTargets(new Set(['active', 'sidebar']), 'active')
  environment.document.hidden = true
  t.mock.timers.tick(120_000)
  assert.equal(environment.requests.length, 0)

  environment.document.hidden = false
  environment.document.dispatchEvent(new Event('visibilitychange'))
  assert.equal(environment.requests.length, 1)
  assert.deepEqual(readIds(environment.requests[0].url), ['1', '2'])

  environment.resolveNext([
    {
      livestream_id: 1,
      viewers: 101,
    },
    {
      livestream_id: 2,
      viewers: 202,
    },
  ])
  await flushAsyncWork()
  acquisition.stop()
})

test('aborts route-specific requests when the route changes', (t) => {
  const environment = installBrowserEnvironment(t)
  const acquisition = new ViewerCountAcquisition({
    onData() {},
    store: new ViewerCountStore(),
  })

  acquisition.start()
  acquisition.syncTargets(new Set(['missing-channel']), undefined)

  assert.equal(environment.requests.length, 1)
  assert.equal(environment.requests[0].signal.aborted, false)
  acquisition.beginRoute()
  assert.equal(environment.requests[0].signal.aborted, true)
  acquisition.stop()
})

function installBrowserEnvironment(t) {
  t.mock.timers.enable({
    apis: ['Date', 'setInterval', 'setTimeout'],
  })

  const document = new EventTarget()
  document.hidden = false
  const requests = []
  const unresolved = []

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: globalThis,
  })
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: document,
  })
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: new URL('https://kick.com/active'),
  })
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    value(url, options) {
      return new Promise((resolve) => {
        const request = {
          signal: options.signal,
          url: String(url),
        }
        requests.push(request)
        unresolved.push({
          request,
          resolve,
        })
      })
    },
  })

  t.after(() => {
    t.mock.timers.reset()
    delete globalThis.window
    delete globalThis.document
    delete globalThis.location
    delete globalThis.fetch
  })

  return {
    document,
    requests,
    resolveNext(payload) {
      const pending = unresolved.shift()
      assert.ok(pending, 'Expected a pending fetch request')
      pending.resolve(
        new Response(JSON.stringify(payload), {
          headers: {
            'content-type': 'application/json',
          },
          status: 200,
        }),
      )
    },
  }
}

function stream(channelSlug, livestreamId) {
  return {
    capturedAt: Date.now(),
    channelSlug,
    isLive: true,
    livestreamId,
    showViewCount: false,
    source: 'channel-details',
    startedAt: Date.now() - 60_000,
    viewerCount: 100,
  }
}

function readIds(rawUrl) {
  return new URL(rawUrl).searchParams.getAll('ids[]')
}

async function flushAsyncWork() {
  for (let index = 0; index < 10; index += 1) {
    await Promise.resolve()
  }
}
