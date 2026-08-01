import assert from 'node:assert/strict'
import test from 'node:test'

import { CurrentViewersPoller } from '../../../src/features/viewerCounts/currentViewersPoller.ts'
import { ViewerCountStore } from '../../../src/features/viewerCounts/store.ts'
import { waitFor } from '../../support/waitFor.mjs'
import {
  createManualTiming,
  createViewerStream as stream,
  readIds,
} from './_support/acquisitionFixtures.mjs'

test('current-viewers polling owns visibility, intervals, and cancellation', () => {
  const timing = createManualTiming()
  const store = new ViewerCountStore()
  const requests = []
  let hidden = true
  let visibilityListener

  store.upsertStreams([stream('active-channel', 42, timing.api.now())])

  const poller = new CurrentViewersPoller({
    getOrigin: () => 'https://kick.com',
    isHidden: () => hidden,
    onData() {},
    request(url, signal) {
      requests.push({ signal, url: String(url) })
      return new Promise(() => {})
    },
    store,
    subscribeVisibility(listener) {
      visibilityListener = listener

      return () => {
        visibilityListener = undefined
      }
    },
    timing: timing.api,
  })

  poller.start()
  poller.syncTargets(new Set(['active-channel']), 'active-channel')

  assert.deepEqual(timing.intervalDelays(), [30_000, 120_000])
  timing.runInterval(30_000)
  assert.equal(requests.length, 0)

  hidden = false
  visibilityListener()
  assert.equal(requests.length, 1)
  assert.deepEqual(readIds(requests[0].url), ['42'])
  assert.equal(requests[0].signal.aborted, false)

  poller.resetRoute()
  assert.equal(requests[0].signal.aborted, true)

  poller.stop()
  assert.deepEqual(timing.intervalDelays(), [])
  assert.equal(visibilityListener, undefined)
})

test('queues uncovered list targets behind the active-channel poll', async () => {
  const timing = createManualTiming()
  const store = new ViewerCountStore()
  const pendingRequests = []
  const requests = []
  let dataCalls = 0

  store.upsertStreams([
    stream('active', 1, timing.api.now()),
    stream('sidebar', 2, timing.api.now()),
  ])

  const poller = new CurrentViewersPoller({
    getOrigin: () => 'https://kick.com',
    isHidden: () => false,
    onData() {
      dataCalls += 1
    },
    request(url, signal) {
      const pending = deferred()
      pendingRequests.push(pending)
      requests.push({ signal, url: String(url) })
      return pending.promise
    },
    store,
    subscribeVisibility: () => () => undefined,
    timing: timing.api,
  })

  poller.start()
  poller.syncTargets(new Set(['active', 'sidebar']), 'active')
  timing.runInterval(30_000)
  timing.runInterval(120_000)

  assert.equal(requests.length, 1)
  assert.deepEqual(readIds(requests[0].url), ['1'])

  pendingRequests[0].resolve({
    durationMs: 1,
    httpStatus: 200,
    kind: 'passed',
    payload: [{ livestream_id: 1, viewers: 101 }],
  })
  await waitFor(() => requests.length === 2, 'the queued sidebar poll')

  assert.deepEqual(readIds(requests[1].url), ['2'])
  pendingRequests[1].resolve({
    durationMs: 1,
    httpStatus: 200,
    kind: 'passed',
    payload: [{ livestream_id: 2, viewers: 202 }],
  })
  await waitFor(() => dataCalls === 2, 'both current-viewers polls to settle')
  poller.stop()
})

function deferred() {
  let resolve
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise
  })

  return { promise, resolve }
}
