import assert from 'node:assert/strict'
import test from 'node:test'

import { estimateDownloadTransfer } from '../../../src/features/clipDownloads/downloadProgress.ts'

test('estimates average download rate and remaining time', () => {
  assert.deepEqual(
    estimateDownloadTransfer(24 * 1024 * 1024, 60 * 1024 * 1024, 1_000, 11_000),
    {
      bytesPerSecond: 2.4 * 1024 * 1024,
      remainingSeconds: 15,
    },
  )
})

test('waits for a useful sample before estimating transfer rate', () => {
  assert.equal(estimateDownloadTransfer(1024, 2048, 1_000, 1_999), undefined)
  assert.equal(estimateDownloadTransfer(0, 2048, 1_000, 3_000), undefined)
})

test('omits remaining time when size is unknown or complete', () => {
  assert.deepEqual(estimateDownloadTransfer(4096, undefined, 0, 2_000), {
    bytesPerSecond: 2048,
    remainingSeconds: undefined,
  })
  assert.deepEqual(estimateDownloadTransfer(4096, 4096, 0, 2_000), {
    bytesPerSecond: 2048,
    remainingSeconds: undefined,
  })
})
