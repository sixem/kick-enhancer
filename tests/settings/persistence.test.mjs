import assert from 'node:assert/strict'
import test from 'node:test'

import { createSettingsPersistence } from '../../src/settings/settingsPersistence.ts'
import { waitFor } from '../support/waitFor.mjs'

test('coalesces a rapid settings burst into the latest value', async () => {
  const timers = createFakeTimers()
  const writes = []
  const persistence = createSettingsPersistence({
    cancelTimer: timers.cancel,
    onError: assert.fail,
    scheduleTimer: timers.schedule,
    write: async (value) => {
      writes.push(value)
    },
  })
  const promises = Array.from({ length: 50 }, (_, index) =>
    persistence.schedule(`settings-${index}`),
  )

  assert.equal(timers.size(), 1)
  assert.equal(writes.length, 0)
  assert.ok(promises.every((promise) => promise === promises[0]))

  timers.runNext()
  await promises.at(-1)
  assert.deepEqual(writes, ['settings-49'])
  assert.equal(timers.size(), 0)
})

test('writes only the latest update received during an active write', async () => {
  const timers = createFakeTimers()
  const writes = []
  const persistence = createSettingsPersistence({
    cancelTimer: timers.cancel,
    onError: assert.fail,
    scheduleTimer: timers.schedule,
    write: (value) => {
      const pending = deferred()
      writes.push({ pending, value })
      return pending.promise
    },
  })
  const firstBurst = persistence.schedule('settings-a')

  timers.runNext()
  await waitFor(() => writes.length === 1, 'the first settings write to start')
  assert.deepEqual(
    writes.map(({ value }) => value),
    ['settings-a'],
  )

  const secondBurst = persistence.schedule('settings-b')
  persistence.schedule('settings-c')
  assert.equal(firstBurst, secondBurst)
  assert.equal(timers.size(), 0)

  writes[0].pending.resolve()
  await waitFor(
    () => timers.size() === 1,
    'the latest settings write to be scheduled',
  )
  assert.equal(timers.size(), 1)

  timers.runNext()
  await waitFor(() => writes.length === 2, 'the latest settings write to start')
  assert.deepEqual(
    writes.map(({ value }) => value),
    ['settings-a', 'settings-c'],
  )

  writes[1].pending.resolve()
  await secondBurst
  assert.equal(timers.size(), 0)
})

test('flushes immediately without duplicating a settings write', async () => {
  const timers = createFakeTimers()
  const writes = []
  const persistence = createSettingsPersistence({
    cancelTimer: timers.cancel,
    onError: assert.fail,
    scheduleTimer: timers.schedule,
    write: async (value) => {
      writes.push(value)
    },
  })
  const scheduled = persistence.schedule('settings-final')
  const firstFlush = persistence.flush()
  const secondFlush = persistence.flush()

  assert.equal(scheduled, firstFlush)
  assert.equal(firstFlush, secondFlush)
  assert.equal(timers.size(), 0)

  await secondFlush
  assert.deepEqual(writes, ['settings-final'])
})

test('recovers from a failed settings write', async () => {
  const timers = createFakeTimers()
  const errors = []
  const writes = []
  const persistence = createSettingsPersistence({
    cancelTimer: timers.cancel,
    onError: (error) => errors.push(error),
    scheduleTimer: timers.schedule,
    write: async (value) => {
      writes.push(value)

      if (writes.length === 1) {
        throw new Error('storage unavailable')
      }
    },
  })
  const first = persistence.schedule('settings-failed')

  timers.runNext()
  await first
  assert.equal(errors.length, 1)

  const second = persistence.schedule('settings-recovered')
  timers.runNext()
  await second
  assert.deepEqual(writes, ['settings-failed', 'settings-recovered'])
})

function createFakeTimers() {
  let nextId = 1
  const callbacks = new Map()

  return {
    cancel(handle) {
      callbacks.delete(handle)
    },
    runNext() {
      const entry = callbacks.entries().next().value

      if (!entry) {
        throw new Error('No timer is scheduled.')
      }

      const [handle, callback] = entry
      callbacks.delete(handle)
      callback()
    },
    schedule(callback) {
      const handle = nextId
      nextId += 1
      callbacks.set(handle, callback)
      return handle
    },
    size() {
      return callbacks.size
    },
  }
}

function deferred() {
  let resolve
  let reject
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })

  return {
    promise,
    reject,
    resolve,
  }
}
