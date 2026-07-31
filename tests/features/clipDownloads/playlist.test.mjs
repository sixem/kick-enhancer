import assert from 'node:assert/strict'
import test from 'node:test'

import { ClipDownloadError } from '../../../src/features/clipDownloads/errors.ts'
import { MAX_INPUT_BYTES } from '../../../src/features/clipDownloads/mediaTypes.ts'
import { parseKickMediaPlaylist } from '../../../src/features/clipDownloads/playlist.ts'

const PLAYLIST_URL =
  'https://clips.kick.com/clips/42/clip_test/playlist.m3u8'
const ALLOW_KICK_MEDIA = (url) => url.hostname === 'clips.kick.com'

test('parses the observed explicit byte-range playlist shape', () => {
  const plan = parseKickMediaPlaylist(
    [
      '#EXTM3U',
      '#EXT-X-VERSION:4',
      '#EXT-X-TARGETDURATION:2',
      '#EXT-X-BYTERANGE:705940@2805148',
      '#EXTINF:2.000,',
      '1576.ts',
      '#EXT-X-BYTERANGE:705564@0',
      '#EXTINF:2.000,',
      '1577.ts',
      '#EXT-X-BYTERANGE:705564@705564',
      '#EXTINF:2.000,',
      '1577.ts',
      '#EXT-X-ENDLIST',
    ].join('\n'),
    {
      isAllowedMediaUrl: ALLOW_KICK_MEDIA,
      playlistUrl: PLAYLIST_URL,
    },
  )

  assert.equal(plan.kind, 'hls-ts')
  assert.equal(plan.segments.length, 3)
  assert.equal(plan.uniqueSourceObjectCount, 2)
  assert.equal(plan.sourceBytes, 2_117_068)
  assert.equal(plan.duration, 6)
  assert.deepEqual(plan.segments[0], {
    duration: 2,
    index: 0,
    length: 705_940,
    offset: 2_805_148,
    url: 'https://clips.kick.com/clips/42/clip_test/1576.ts',
  })
})

test('rejects unsafe and unsupported playlist layouts', () => {
  const invalidPlaylists = [
    [
      '#EXTM3U',
      '#EXT-X-KEY:METHOD=AES-128,URI="key"',
      '#EXTINF:2,',
      '1.ts',
      '#EXT-X-ENDLIST',
    ],
    [
      '#EXTM3U',
      '#EXT-X-BYTERANGE:100',
      '#EXTINF:2,',
      '1.ts',
      '#EXT-X-ENDLIST',
    ],
    [
      '#EXTM3U',
      '#EXT-X-BYTERANGE:100@0',
      '#EXTINF:2,',
      '1.ts',
      '#EXT-X-BYTERANGE:100@50',
      '#EXTINF:2,',
      '1.ts',
      '#EXT-X-ENDLIST',
    ],
    [
      '#EXTM3U',
      `#EXT-X-BYTERANGE:${MAX_INPUT_BYTES + 1}@0`,
      '#EXTINF:2,',
      '1.ts',
      '#EXT-X-ENDLIST',
    ],
    [
      '#EXTM3U',
      '#EXTINF:2,',
      'https://example.com/1.ts',
      '#EXT-X-ENDLIST',
    ],
    [
      '#EXTM3U',
      '#EXTINF:2,',
      '1.ts',
    ],
  ]

  for (const lines of invalidPlaylists) {
    assert.throws(
      () =>
        parseKickMediaPlaylist(lines.join('\n'), {
          isAllowedMediaUrl: ALLOW_KICK_MEDIA,
          playlistUrl: PLAYLIST_URL,
        }),
      (error) =>
        error instanceof ClipDownloadError &&
        error.code === 'unsupported-media',
    )
  }
})

