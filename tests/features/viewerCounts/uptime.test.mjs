import assert from 'node:assert/strict'
import test from 'node:test'

import {
  formatStreamUptime,
  parseStreamStartedAt,
} from '../../../src/features/viewerCounts/uptime.ts'

test('parses Kick timestamps without treating them as local time', () => {
  assert.equal(
    parseStreamStartedAt('2026-07-28 03:04:05'),
    Date.UTC(2026, 6, 28, 3, 4, 5),
  )
  assert.equal(
    parseStreamStartedAt('2026-07-28T05:04:05+02:00'),
    Date.UTC(2026, 6, 28, 3, 4, 5),
  )
  assert.equal(parseStreamStartedAt('not-a-timestamp'), undefined)
})

test('formats compact stream uptimes for thumbnail badges', () => {
  const now = Date.UTC(2026, 6, 28, 12)

  assert.equal(formatStreamUptime(now - 30_000, now), '<1m')
  assert.equal(formatStreamUptime(now - 59 * 60_000, now), '59m')
  assert.equal(formatStreamUptime(now - 60 * 60_000, now), '1h')
  assert.equal(
    formatStreamUptime(now - 65 * 60_000, now),
    '1h 5m',
  )
  assert.equal(
    formatStreamUptime(now - 51 * 60 * 60_000, now),
    '2d 3h',
  )
})

test('rejects implausible future start times', () => {
  const now = Date.UTC(2026, 6, 28, 12)

  assert.equal(
    formatStreamUptime(now + 5 * 60_000 + 1, now),
    undefined,
  )
})
