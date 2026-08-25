import assert from 'node:assert/strict'
import test from 'node:test'

import {
  fetchExactRange,
  fetchInitialMediaProbe,
  parseContentRange,
} from '../../../src/features/clipDownloads/media/network.ts'
import { rangeResponse, responseWithUrl } from './_support/mediaFixtures.mjs'

test('validates exact media byte ranges and rejects ignored ranges', async () => {
  assert.deepEqual(parseContentRange('bytes 10-19/100'), {
    end: 19,
    start: 10,
    total: 100,
  })
  assert.throws(
    () => parseContentRange('bytes 10-100/100'),
    /invalid byte range/i,
  )

  const exact = await fetchExactRange(
    'https://clips.kick.com/segment.ts',
    10,
    10,
    new AbortController().signal,
    async () =>
      rangeResponse(
        new Uint8Array(10),
        'https://clips.kick.com/segment.ts',
        10,
        100,
      ),
  )
  assert.equal(exact.bytes.byteLength, 10)

  await assert.rejects(
    fetchExactRange(
      'https://clips.kick.com/segment.ts',
      10,
      10,
      new AbortController().signal,
      async () =>
        responseWithUrl(
          new Response(new Uint8Array(100), { status: 200 }),
          'https://clips.kick.com/segment.ts',
        ),
    ),
    /did not honor/i,
  )

  await assert.rejects(
    fetchInitialMediaProbe(
      'https://clips.kick.com/direct.mp4',
      32,
      new AbortController().signal,
      async () =>
        responseWithUrl(
          new Response(new Uint8Array(64), {
            headers: { 'Content-Length': '64' },
            status: 200,
          }),
          'https://clips.kick.com/direct.mp4',
        ),
    ),
    /ignored the bounded inspection/i,
  )
})
