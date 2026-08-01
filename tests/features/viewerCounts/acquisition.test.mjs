import assert from 'node:assert/strict'
import test from 'node:test'

import { ViewerCountAcquisition } from '../../../src/features/viewerCounts/acquisition/acquisition.ts'
import { ViewerCountStore } from '../../../src/features/viewerCounts/model/store.ts'
import { waitFor } from '../../support/waitFor.mjs'
import { readIds } from './_support/acquisitionFixtures.mjs'

test('coordinates fallback polling and route cancellation', async (t) => {
  const environment = installBrowserEnvironment(t)
  const acquisition = new ViewerCountAcquisition({
    onData() {},
    store: new ViewerCountStore(),
  })

  acquisition.start()
  acquisition.syncTargets(new Set(['active']), 'active')

  assert.equal(environment.requests.length, 1)
  assert.equal(
    environment.requests[0].url,
    'https://kick.com/api/v2/channels/active',
  )

  environment.resolveNext({
    livestream: {
      id: 1,
      is_live: true,
      show_view_count: false,
      start_time: '2026-07-31 12:00:00',
      viewer_count: 100,
    },
    slug: 'active',
  })
  await waitFor(
    () => environment.requests.length === 2,
    'the active channel current-viewers request',
  )

  assert.deepEqual(readIds(environment.requests[1].url), ['1'])

  acquisition.syncTargets(new Set(['active', 'missing-channel']), 'active')
  assert.equal(environment.requests.length, 3)
  assert.equal(
    environment.requests[2].url,
    'https://kick.com/api/v2/channels/missing-channel',
  )

  acquisition.beginRoute()
  assert.equal(environment.requests[1].signal.aborted, true)
  assert.equal(environment.requests[2].signal.aborted, true)
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
        unresolved.push({ resolve })
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
