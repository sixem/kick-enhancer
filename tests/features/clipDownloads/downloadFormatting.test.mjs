import assert from 'node:assert/strict'
import test from 'node:test'

import {
  formatBytes,
  formatDuration,
  formatFetchingStatus,
  formatPhase,
  formatRemainingTime,
  formatStatus,
} from '../../../src/features/clipDownloads/ui/downloadFormatting.ts'

test('formats download sizes and durations', () => {
  assert.equal(formatBytes(512), '512 B')
  assert.equal(formatBytes(1536), '1.5 KiB')
  assert.equal(formatBytes(3 * 1024 * 1024), '3.0 MiB')
  assert.equal(formatDuration(undefined), 'Unknown')
  assert.equal(formatDuration(65.4), '1:05')
  assert.equal(formatRemainingTime(3_661), '1h 1m')
})

test('formats download phases and queue status', () => {
  assert.equal(formatPhase('transmuxing'), 'Converting to MP4')
  assert.equal(formatPhase(undefined), 'Working')
  assert.equal(formatStatus({ queuePosition: 2, status: 'queued' }), 'Queued 2')
  assert.equal(formatStatus({ status: 'ready' }), 'Ready')
})

test('formats active transfer progress from a stable sample', () => {
  assert.equal(
    formatFetchingStatus(
      {
        completedSegments: 1,
        fetchedBytes: 2048,
        media: {
          logicalSegmentCount: 4,
          sourceBytes: 4096,
        },
        startedAt: 0,
      },
      2_000,
    ),
    'Segment 2/4: 1.0 KiB/s - 2s remaining',
  )
})
