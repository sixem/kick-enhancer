import assert from 'node:assert/strict'
import test from 'node:test'

import {
  copyBytesToArrayBuffer,
  toTransferableArrayBuffer,
} from '../../../src/features/clipDownloads/byteBuffers.ts'

test('reuses owned buffers and copies partial views for transfer', () => {
  const ownedBytes = Uint8Array.of(1, 2, 3)

  assert.equal(
    toTransferableArrayBuffer(ownedBytes),
    ownedBytes.buffer,
  )

  const backingBytes = Uint8Array.of(9, 4, 5, 8)
  const partialView = backingBytes.subarray(1, 3)
  const transferred = toTransferableArrayBuffer(partialView)

  assert.notEqual(transferred, backingBytes.buffer)
  assert.deepEqual([...new Uint8Array(transferred)], [4, 5])

  const copied = copyBytesToArrayBuffer(partialView)
  backingBytes.fill(0)
  assert.deepEqual([...new Uint8Array(copied)], [4, 5])
})

