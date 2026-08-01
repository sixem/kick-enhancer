import assert from 'node:assert/strict'
import test from 'node:test'

import { formatLogEntry, formatLogValue } from '../../src/logging/format.ts'

test('safe log formatting redacts credentials and URL queries', () => {
  const formatted = formatLogEntry({
    arguments: [
      'Request https://kick.com/current-viewers?ids[]=123&token=secret',
      {
        authorization: 'Bearer private',
        playback_url: 'https://video.example/master.m3u8?signature=private',
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
