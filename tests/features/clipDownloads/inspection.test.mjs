import assert from 'node:assert/strict'
import test from 'node:test'

import { inspectClip } from '../../../src/features/clipDownloads/inspection.ts'
import {
  concatBytes,
  createBox,
  createPatSection,
  createPmtSection,
  createTsPacket,
  rangeResponse,
} from './_support/mediaFixtures.mjs'

const PLAYLIST_URL = 'https://clips.kick.com/clips/42/clip_test/playlist.m3u8'

test('normalizes API metadata and an observed HLS media plan', async () => {
  const tsProbe = concatBytes(
    createTsPacket(0, createPatSection()),
    createTsPacket(0x100, createPmtSection([0x1b, 0x0f, 0x15])),
    createTsPacket(0x1fff, new Uint8Array()),
  )
  const playlist = [
    '#EXTM3U',
    '#EXT-X-VERSION:4',
    `#EXT-X-BYTERANGE:${tsProbe.byteLength}@0`,
    '#EXTINF:2.000,',
    '1.ts',
    '#EXT-X-ENDLIST',
  ].join('\n')
  const responses = [
    new Response(
      JSON.stringify({
        clip: {
          category: { name: 'Just Chatting' },
          channel: { username: 'channel' },
          clip_url: PLAYLIST_URL,
          created_at: '2026-07-29T12:34:56Z',
          creator: { username: 'clipper' },
          duration: 2,
          id: 'clip_test',
          likes: 78,
          title: 'Test clip',
          views: 1234,
        },
      }),
      { status: 200 },
    ),
    rangeResponse(
      new TextEncoder().encode(playlist),
      PLAYLIST_URL,
      0,
      new TextEncoder().encode(playlist).byteLength,
    ),
    rangeResponse(
      tsProbe,
      'https://clips.kick.com/clips/42/clip_test/1.ts',
      0,
      tsProbe.byteLength + 1,
    ),
  ]
  const requests = []
  const inspection = await inspectClip(
    'clip_test',
    new AbortController().signal,
    {
      fetchImplementation: async (url, options) => {
        requests.push({ options, url })
        return responses.shift()
      },
      pageUrl: 'https://kick.com/channel/clips/clip_test',
    },
  )

  assert.equal(requests.length, 3)
  assert.equal(requests[0].url, 'https://kick.com/api/v2/clips/clip_test/play')
  assert.equal(inspection.metadata.category, 'Just Chatting')
  assert.equal(inspection.metadata.channel, 'channel')
  assert.equal(inspection.metadata.creator, 'clipper')
  assert.equal(inspection.metadata.duration, 2)
  assert.equal(inspection.metadata.likeCount, 78)
  assert.equal(
    inspection.metadata.publishedAt,
    Date.parse('2026-07-29T12:34:56Z'),
  )
  assert.equal(inspection.metadata.title, 'Test clip')
  assert.equal(inspection.metadata.viewCount, 1234)
  assert.equal(inspection.plan.kind, 'hls-ts')
  assert.equal(inspection.plan.segments.length, 1)
  assert.equal(inspection.plan.sourceBytes, tsProbe.byteLength)
})

test('accepts a bounded compatible direct MP4 response', async () => {
  const mp4 = concatBytes(
    createBox('ftyp', new TextEncoder().encode('isom0000')),
    createBox('moov', concatBytes(createBox('avc1'), createBox('mp4a'))),
    new Uint8Array(24),
  )
  const responses = [
    new Response(
      JSON.stringify({
        clip: {
          clip_url: 'https://clips.kick.com/direct.mp4',
          id: 'clip_direct',
        },
      }),
      { status: 200 },
    ),
    rangeResponse(mp4, 'https://clips.kick.com/direct.mp4', 0, mp4.byteLength),
  ]
  const inspection = await inspectClip(
    'clip_direct',
    new AbortController().signal,
    {
      fetchImplementation: async () => responses.shift(),
      pageUrl: 'https://kick.com/channel/clips/clip_direct',
    },
  )

  assert.deepEqual(inspection.plan, {
    kind: 'direct-mp4',
    sourceBytes: mp4.byteLength,
    url: 'https://clips.kick.com/direct.mp4',
  })
})
