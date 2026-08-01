import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createBlobSink,
  createFileSystemSink,
} from '../../../src/features/clipDownloads/outputSinks.ts'

test('uses bounded file and Blob output sinks', async () => {
  const writableCalls = []
  let createCalls = 0
  const fileSink = await createFileSystemSink({
    async createWritable(options) {
      createCalls += 1

      if (createCalls === 1) {
        assert.equal(options.mode, 'exclusive')
        throw new TypeError('mode unsupported')
      }

      return {
        abort: async () => undefined,
        close: async () => undefined,
        write: async (data) => writableCalls.push(data),
      }
    },
    name: 'selected.mp4',
  })
  const fileBacking = new Uint8Array(16)
  const fileBytes = fileBacking.subarray(2, 14)
  await fileSink.write(fileBytes)
  await fileSink.close()
  assert.equal(createCalls, 2)
  assert.equal(writableCalls[0], fileBytes)

  let triggered
  const blobSink = createBlobSink('fallback.mp4', (blob, filename) => {
    triggered = { blob, filename }
  })
  const firstBlobBytes = Uint8Array.of(1, 2, 3, 4, 5)
  await blobSink.write(firstBlobBytes)
  firstBlobBytes.fill(0)
  await blobSink.write(Uint8Array.of(6, 7, 8, 9, 10, 11, 12))
  await blobSink.close()
  assert.equal(triggered.filename, 'fallback.mp4')
  assert.equal(triggered.blob.size, 12)
  assert.equal(triggered.blob.type, 'video/mp4')
  assert.deepEqual(
    [...new Uint8Array(await triggered.blob.arrayBuffer())],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  )
  await assert.rejects(blobSink.write(new Uint8Array(1)), /already closed/i)
})
