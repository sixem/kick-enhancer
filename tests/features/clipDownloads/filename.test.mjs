import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createDefaultBasename,
  createMp4Filename,
  sanitizeBasename,
} from '../../../src/features/clipDownloads/filename.ts'

test('generates and sanitizes portable MP4 filenames', () => {
  assert.equal(
    createDefaultBasename({
      channel: 'channel',
      clipId: 'clip_123',
      title: 'A good clip',
    }),
    'channel - A good clip',
  )
  assert.equal(
    sanitizeBasename('  bad<>:"/\\|?*   name... ', 'clip_123'),
    'bad name',
  )
  assert.equal(sanitizeBasename('CON', 'clip_123'), 'CON_')
  assert.equal(createMp4Filename(' ', 'clip_123'), 'clip_123.mp4')
})
