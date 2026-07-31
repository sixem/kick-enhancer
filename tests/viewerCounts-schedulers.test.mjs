import assert from 'node:assert/strict'
import test from 'node:test'

import { ChannelDetailsScheduler } from '../src/features/viewerCounts/channelDetailsScheduler.ts'
import { CurrentViewersPoller } from '../src/features/viewerCounts/currentViewersPoller.ts'
import { ViewerCountStore } from '../src/features/viewerCounts/store.ts'

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
  await flushAsyncWork()

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
  await flushAsyncWork()

  assert.deepEqual(timing.timeoutDelays(), [60_000])
  scheduler.stop()
  assert.deepEqual(timing.timeoutDelays(), [])
})

test('current-viewers polling owns visibility, intervals, and cancellation', () => {
  const timing = createManualTiming()
  const store = new ViewerCountStore()
  const requests = []
  let hidden = true
  let visibilityListener

  store.upsertStreams([
    stream('active-channel', 42, timing.api.now()),
  ])

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

function createManualTiming(startedAt = Date.now()) {
  const intervals = new Map()
  const timeouts = new Map()
  let nextHandle = 1
  let now = startedAt

  return {
    api: {
      cancelInterval(handle) {
        intervals.delete(handle)
      },
      cancelTimeout(handle) {
        timeouts.delete(handle)
      },
      now: () => now,
      scheduleInterval(callback, delay) {
        const handle = nextHandle
        nextHandle += 1
        intervals.set(handle, { callback, delay })
        return handle
      },
      scheduleTimeout(callback, delay) {
        const handle = nextHandle
        nextHandle += 1
        timeouts.set(handle, {
          callback,
          delay,
          scheduledFor: now + delay,
        })
        return handle
      },
    },
    advanceBy(duration) {
      now += duration

      for (const [handle, timeout] of timeouts) {
        if (timeout.scheduledFor > now) {
          continue
        }

        timeouts.delete(handle)
        timeout.callback()
      }
    },
    intervalDelays() {
      return [...intervals.values()]
        .map(({ delay }) => delay)
        .sort((left, right) => left - right)
    },
    runInterval(delay) {
      const interval = [...intervals.values()].find(
        (candidate) => candidate.delay === delay,
      )

      assert.ok(interval, `Expected a ${delay}ms interval`)
      interval.callback()
    },
    timeoutDelays() {
      return [...timeouts.values()].map(({ delay }) => delay)
    },
  }
}

function stream(channelSlug, livestreamId, capturedAt) {
  return {
    capturedAt,
    channelSlug,
    isLive: true,
    livestreamId,
    showViewCount: false,
    source: 'channel-details',
    startedAt: capturedAt - 60_000,
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
