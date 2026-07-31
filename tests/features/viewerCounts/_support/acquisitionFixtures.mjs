import assert from 'node:assert/strict'

export function createManualTiming(startedAt = Date.now()) {
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

export function createViewerStream(
  channelSlug,
  livestreamId,
  capturedAt = Date.now(),
) {
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

export function readIds(rawUrl) {
  return new URL(rawUrl).searchParams.getAll('ids[]')
}
