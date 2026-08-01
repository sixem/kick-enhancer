import assert from 'node:assert/strict'
import test from 'node:test'

import { ChannelDetailsScheduler } from '../../../src/features/viewerCounts/channelDetailsScheduler.ts'
import { ViewerCountStore } from '../../../src/features/viewerCounts/store.ts'
import { waitFor } from '../../support/waitFor.mjs'
import {
  createManualTiming,
  createViewerStream as stream,
} from './_support/acquisitionFixtures.mjs'

test('channel details retries through its injected cooldown timer', async () => {
  const timing = createManualTiming()
  const requests = []
  const scheduler = new ChannelDetailsScheduler({
    getOrigin: () => 'https://kick.com',
    async onActiveChannelResolved() {},
    onData() {},
    async request(url, signal) {
      requests.push({ signal, url: String(url) })

      return {
        durationMs: 1,
        httpStatus: 200,
        kind: 'passed',
        payload: {
          livestream: null,
          slug: 'offline-channel',
        },
      }
    },
    store: new ViewerCountStore(),
    timing: timing.api,
  })

  scheduler.start()
  scheduler.syncTargets(new Set(['offline-channel']), undefined)
  await waitFor(
    () => timing.timeoutDelays().length === 1,
    'the channel retry cooldown',
  )

  assert.equal(requests.length, 1)
  assert.equal(
    requests[0].url,
    'https://kick.com/api/v2/channels/offline-channel',
  )
  assert.deepEqual(timing.timeoutDelays(), [60_000])

  scheduler.syncTargets(new Set(['offline-channel']), undefined)
  assert.equal(requests.length, 1)

  timing.advanceBy(59_999)
  assert.equal(requests.length, 1)
  timing.advanceBy(1)
  assert.equal(requests.length, 2)
  await waitFor(
    () => timing.timeoutDelays().length === 1,
    'the next channel retry cooldown',
  )

  assert.deepEqual(timing.timeoutDelays(), [60_000])
  scheduler.stop()
  assert.deepEqual(timing.timeoutDelays(), [])
})

test('drops queued channel details removed from the latest targets', async () => {
  const timing = createManualTiming()
  const pendingRequests = []
  const requests = []
  let dataCalls = 0
  const scheduler = new ChannelDetailsScheduler({
    getOrigin: () => 'https://kick.com',
    async onActiveChannelResolved() {},
    onData() {
      dataCalls += 1
    },
    request(url, signal) {
      const pending = deferred()
      pendingRequests.push(pending)
      requests.push({ signal, url: String(url) })
      return pending.promise
    },
    store: new ViewerCountStore(),
    timing: timing.api,
  })
  const slugs = Array.from({ length: 6 }, (_, index) => `channel-${index}`)

  scheduler.start()
  scheduler.syncTargets(new Set(slugs), undefined)

  assert.equal(requests.length, 5)
  scheduler.syncTargets(new Set(slugs.slice(0, 5)), undefined)

  for (let index = 0; index < pendingRequests.length; index += 1) {
    pendingRequests[index].resolve({
      durationMs: 1,
      httpStatus: 200,
      kind: 'passed',
      payload: {
        livestream: null,
        slug: slugs[index],
      },
    })
  }

  await waitFor(
    () => dataCalls === 5,
    'the retained channel detail requests to settle',
  )
  assert.equal(requests.length, 5)
  assert.ok(requests.every(({ url }) => !url.endsWith('/channel-5')))
  scheduler.stop()
})

test('fetches missing uptime data and cancels it on route reset', () => {
  const timing = createManualTiming()
  const store = new ViewerCountStore()
  const requests = []
  const scheduler = new ChannelDetailsScheduler({
    getOrigin: () => 'https://kick.com',
    async onActiveChannelResolved() {},
    onData() {},
    request(url, signal) {
      requests.push({ signal, url: String(url) })
      return new Promise(() => {})
    },
    store,
    timing: timing.api,
  })

  store.upsertStreams([
    {
      ...stream('visible-channel', 1, timing.api.now()),
      startedAt: undefined,
    },
  ])

  scheduler.start()
  scheduler.syncTargets(new Set(['visible-channel']), undefined)

  assert.equal(requests.length, 1)
  assert.equal(
    requests[0].url,
    'https://kick.com/api/v2/channels/visible-channel',
  )
  assert.equal(requests[0].signal.aborted, false)

  scheduler.resetRoute()
  assert.equal(requests[0].signal.aborted, true)
  scheduler.stop()
})

function deferred() {
  let resolve
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise
  })

  return { promise, resolve }
}
