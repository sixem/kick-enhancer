import assert from 'node:assert/strict'
import test from 'node:test'

import {
  formatLogEntry,
  formatLogValue,
} from '../src/logging/format.ts'
import {
  clearLogHistory,
  configureLogging,
  createLogger,
  subscribeLogHistory,
} from '../src/logging/logger.ts'

test('log history subscriptions batch additions with stable IDs', async (t) => {
  clearLogHistory()
  configureLogging({
    historyLimit: 2,
    level: 'silent',
  })
  const snapshots = []
  const unsubscribe = subscribeLogHistory((history) => {
    snapshots.push(history)
  })
  t.after(() => {
    unsubscribe()
    clearLogHistory()
    configureLogging({
      historyLimit: 250,
      level: 'info',
    })
  })

  const log = createLogger('diagnostics:test')
  log.info('First')
  log.info('Second')

  assert.equal(snapshots.length, 0)
  await waitForLogBatch()

  assert.equal(snapshots.length, 1)
  assert.equal(snapshots[0].length, 2)
  const retainedId = snapshots[0][1].id

  log.info('Third')
  await waitForLogBatch()

  assert.equal(snapshots.length, 2)
  assert.deepEqual(
    snapshots[1].map(({ arguments: [message] }) => message),
    ['Second', 'Third'],
  )
  assert.equal(snapshots[1][0].id, retainedId)
  assert.notEqual(snapshots[1][0].id, snapshots[1][1].id)

  clearLogHistory()

  assert.equal(snapshots.length, 3)
  assert.deepEqual(snapshots[2], [])
})

test('safe log formatting redacts credentials and URL queries', () => {
  const formatted = formatLogEntry({
    arguments: [
      'Request https://kick.com/current-viewers?ids[]=123&token=secret',
      {
        authorization: 'Bearer private',
        playback_url:
          'https://video.example/master.m3u8?signature=private',
        slug: 'channel',
      },
    ],
    id: 1,
    level: 'warn',
    scope: 'viewer-counts:network',
    timestamp: Date.UTC(2026, 6, 28, 12),
  })

  assert.match(formatted, /\[WARN\] \[viewer-counts:network\]/)
  assert.match(formatted, /current-viewers\?\[redacted\]/)
  assert.doesNotMatch(formatted, /ids\[\]|private|secret/)
  assert.match(formatted, /"authorization":"\[Redacted\]"/)
  assert.match(formatted, /"playback_url":"\[Redacted\]"/)
})

test('safe log formatting handles circular values', () => {
  const value = { name: 'root' }
  value.self = value

  assert.match(formatLogValue(value), /\[Circular\]/)
})

function waitForLogBatch() {
  return new Promise((resolve) => setTimeout(resolve, 250))
}
