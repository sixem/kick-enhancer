import assert from 'node:assert/strict'
import test from 'node:test'

import { createTransmuxerSession } from '../../../src/features/clipDownloads/transmuxerSession.ts'
import {
  createFakeTransmuxer,
  transmuxedSegment,
} from './_support/transmuxerFixtures.mjs'

test('keeps the normal combined transmux path unchanged', () => {
  const initSegment = Uint8Array.of(1, 2, 3)
  const firstData = Uint8Array.of(4, 5)
  const secondData = Uint8Array.of(6, 7)
  const fake = createFakeTransmuxer([
    [transmuxedSegment('combined', firstData, initSegment)],
    [transmuxedSegment('combined', secondData, initSegment)],
  ])
  const session = createTransmuxerSession(fake.transmuxer)

  session.push(Uint8Array.of(8, 9))

  assert.deepEqual(session.flush(), {
    data: firstData,
    initSegment,
  })
  assert.deepEqual(session.flush(), {
    data: secondData,
  })
  assert.deepEqual(fake.pushed, [Uint8Array.of(8, 9)])
  assert.deepEqual(fake.remuxModes, [])
})

test('recovers an isolated track without replacing the combined init', () => {
  for (const trackType of ['audio', 'video']) {
    const combinedInit = Uint8Array.of(1, 2, 3)
    const isolatedInit = Uint8Array.of(9, 9)
    const isolatedData = Uint8Array.of(4, 5, 6)
    const finalData = Uint8Array.of(7, 8)
    const fake = createFakeTransmuxer([
      [
        transmuxedSegment(
          'combined',
          Uint8Array.of(1),
          combinedInit,
        ),
      ],
      [],
      [
        transmuxedSegment(
          trackType,
          isolatedData,
          isolatedInit,
        ),
      ],
      [transmuxedSegment('combined', finalData, combinedInit)],
    ])
    const session = createTransmuxerSession(fake.transmuxer)

    assert.deepEqual(session.flush().initSegment, combinedInit)
    assert.deepEqual(session.flush(), {
      data: isolatedData,
    })
    assert.deepEqual(session.flush(), {
      data: finalData,
    })
    assert.deepEqual(fake.remuxModes, [false, true])
  }
})

test('restores combined mode when isolated-track recovery fails', () => {
  const initSegment = Uint8Array.of(1, 2, 3)
  const fake = createFakeTransmuxer([
    [
      transmuxedSegment(
        'combined',
        Uint8Array.of(4),
        initSegment,
      ),
    ],
    [],
    new Error('Recovery failed'),
  ])
  const session = createTransmuxerSession(fake.transmuxer)

  session.flush()
  assert.throws(() => session.flush(), /Recovery failed/)
  assert.deepEqual(fake.remuxModes, [false, true])
})

test('does not establish an MP4 from an isolated first track', () => {
  const fake = createFakeTransmuxer([
    [
      transmuxedSegment(
        'audio',
        Uint8Array.of(1, 2),
        Uint8Array.of(3),
      ),
    ],
  ])
  const session = createTransmuxerSession(fake.transmuxer)

  assert.throws(
    () => session.flush(),
    /supported audio and video tracks/i,
  )
  assert.deepEqual(fake.remuxModes, [])
})
