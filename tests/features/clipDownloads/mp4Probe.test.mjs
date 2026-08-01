import assert from 'node:assert/strict'
import test from 'node:test'

import { inspectMp4Probe } from '../../../src/features/clipDownloads/mp4Probe.ts'
import { concatBytes, createBox } from './_support/mediaFixtures.mjs'

test('accepts only an MP4 probe with moov, H.264, and AAC markers', () => {
  const valid = concatBytes(
    createBox('ftyp', new TextEncoder().encode('isom0000')),
    createBox('moov', concatBytes(createBox('avc1'), createBox('mp4a'))),
  )

  assert.deepEqual(inspectMp4Probe(valid), {
    audioCodec: 'aac',
    videoCodec: 'h264',
  })
  assert.throws(
    () =>
      inspectMp4Probe(
        concatBytes(
          createBox('ftyp', new TextEncoder().encode('isom0000')),
          createBox('moov', createBox('hvc1')),
        ),
      ),
    /unsupported codecs/i,
  )
})
