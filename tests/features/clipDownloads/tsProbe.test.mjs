import assert from 'node:assert/strict'
import test from 'node:test'

import { inspectTransportStream } from '../../../src/features/clipDownloads/media/tsProbe.ts'
import {
  concatBytes,
  createPatSection,
  createPmtSection,
  createTsPacket,
} from './_support/mediaFixtures.mjs'

test('identifies H.264, AAC, and timed ID3 from a bounded TS probe', () => {
  const bytes = concatBytes(
    createTsPacket(0, createPatSection()),
    createTsPacket(0x100, createPmtSection([0x1b, 0x0f, 0x15])),
    createTsPacket(0x1fff, new Uint8Array()),
  )

  assert.deepEqual(inspectTransportStream(bytes), {
    audioCodec: 'aac',
    metadata: true,
    videoCodec: 'h264',
  })

  const unsupported = concatBytes(
    createTsPacket(0, createPatSection()),
    createTsPacket(0x100, createPmtSection([0x24, 0x0f])),
    createTsPacket(0x1fff, new Uint8Array()),
  )
  assert.throws(
    () => inspectTransportStream(unsupported),
    /unsupported transport-stream codecs/i,
  )
})
