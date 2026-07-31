import assert from 'node:assert/strict'
import test from 'node:test'

import { createDownloadManager } from '../src/features/clipDownloads/downloadManagerCore.ts'
import { ClipDownloadError } from '../src/features/clipDownloads/errors.ts'
import {
  createDefaultBasename,
  createMp4Filename,
  sanitizeBasename,
} from '../src/features/clipDownloads/filename.ts'
import { inspectClip } from '../src/features/clipDownloads/inspection.ts'
import { inspectMp4Probe } from '../src/features/clipDownloads/mp4Probe.ts'
import { MAX_INPUT_BYTES } from '../src/features/clipDownloads/mediaTypes.ts'
import {
  fetchExactRange,
  fetchInitialMediaProbe,
  parseContentRange,
} from '../src/features/clipDownloads/network.ts'
import {
  createBlobSink,
  createFileSystemSink,
} from '../src/features/clipDownloads/outputSinks.ts'
import { parseKickMediaPlaylist } from '../src/features/clipDownloads/playlist.ts'
import { inspectTransportStream } from '../src/features/clipDownloads/tsProbe.ts'
import { createTransmuxerSession } from '../src/features/clipDownloads/transmuxerSession.ts'

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
  const fake = createFakeTransmuxer([[]])
  const session = createTransmuxerSession(fake.transmuxer)

  assert.throws(
    () => session.flush(),
    /unexpected output layout/i,
  )
  assert.deepEqual(fake.remuxModes, [])
})

test('accepts only an MP4 probe with moov, H.264, and AAC markers', () => {
  const valid = concatBytes(
    createBox('ftyp', new TextEncoder().encode('isom0000')),
    createBox(
      'moov',
      concatBytes(createBox('avc1'), createBox('mp4a')),
    ),
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
  assert.equal(
    requests[0].url,
    'https://kick.com/api/v2/clips/clip_test/play',
  )
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
    createBox(
      'moov',
      concatBytes(createBox('avc1'), createBox('mp4a')),
    ),
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
    rangeResponse(
      mp4,
      'https://clips.kick.com/direct.mp4',
      0,
      mp4.byteLength,
    ),
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
        write: async (data) => writableCalls.push(data.byteLength),
      }
    },
    name: 'selected.mp4',
  })
  await fileSink.write(new Uint8Array(12))
  await fileSink.close()
  assert.equal(createCalls, 2)
  assert.deepEqual(writableCalls, [12])

  let triggered
  const blobSink = createBlobSink('fallback.mp4', (blob, filename) => {
    triggered = { blob, filename }
  })
  await blobSink.write(new Uint8Array(5))
  await blobSink.write(new Uint8Array(7))
  await blobSink.close()
  assert.equal(triggered.filename, 'fallback.mp4')
  assert.equal(triggered.blob.size, 12)
  assert.equal(triggered.blob.type, 'video/mp4')
  await assert.rejects(
    blobSink.write(new Uint8Array(1)),
    /already closed/i,
  )
})

test('limits inspections to two and reuses a non-terminal clip job', async () => {
  const inspections = []
  const manager = createDownloadManager(
    createManagerDependencies({
      inspectClip: (clipId) => {
        const pending = deferred()
        inspections.push({ clipId, pending })
        return pending.promise
      },
    }),
  )

  const firstId = manager.inspectClip('clip_one', 'https://kick.com/a')
  assert.equal(
    manager.inspectClip('clip_one', 'https://kick.com/a'),
    firstId,
  )
  manager.inspectClip('clip_two', 'https://kick.com/b')
  manager.inspectClip('clip_three', 'https://kick.com/c')

  assert.deepEqual(
    inspections.map(({ clipId }) => clipId),
    ['clip_one', 'clip_two'],
  )

  inspections[0].pending.resolve(inspectionFor('clip_one'))
  await flushPromises()
  assert.deepEqual(
    inspections.map(({ clipId }) => clipId),
    ['clip_one', 'clip_two', 'clip_three'],
  )
  assert.equal(
    manager.getSnapshot().jobs.find(({ id }) => id === firstId).status,
    'ready',
  )
  assert.deepEqual(
    {
      category: job(manager, firstId).category,
      creator: job(manager, firstId).creator,
      duration: job(manager, firstId).media.duration,
      likeCount: job(manager, firstId).likeCount,
      publishedAt: job(manager, firstId).publishedAt,
      viewCount: job(manager, firstId).viewCount,
    },
    {
      category: 'Just Chatting',
      creator: 'clipper',
      duration: 12,
      likeCount: 78,
      publishedAt: 1_785_328_496_000,
      viewCount: 1234,
    },
  )
})

test('queues media FIFO and advances a Chromium job to user confirmation', async () => {
  const pickerCalls = []
  const downloadRuns = []
  const manager = createDownloadManager(
    createManagerDependencies({
      downloadMediaPlan: async () => {
        const pending = deferred()
        downloadRuns.push(pending)
        await pending.promise
      },
      getSaveFilePicker: () => (options) => {
        pickerCalls.push(options)
        return Promise.resolve(createFakeHandle(options.suggestedName))
      },
    }),
  )

  const firstId = manager.inspectClip('clip_one', 'https://kick.com/a')
  const secondId = manager.inspectClip('clip_two', 'https://kick.com/b')
  await flushPromises()

  manager.requestDownload(firstId, 'memory')
  manager.requestDownload(secondId, 'file-system')
  assert.equal(job(manager, firstId).status, 'active')
  assert.equal(job(manager, secondId).status, 'queued')
  assert.equal(pickerCalls.length, 0)

  downloadRuns[0].resolve()
  await flushPromises()
  assert.equal(job(manager, firstId).status, 'completed')
  assert.equal(job(manager, secondId).status, 'awaiting-destination')
  assert.equal(pickerCalls.length, 0)

  void manager.chooseDestination(secondId)
  assert.equal(pickerCalls.length, 1)
  await flushPromises()
  assert.equal(job(manager, secondId).status, 'active')

  downloadRuns[1].resolve()
  await flushPromises()
  assert.equal(job(manager, secondId).status, 'completed')
})

test('picker dismissal returns a reserved job to ready', async () => {
  const manager = createDownloadManager(
    createManagerDependencies({
      getSaveFilePicker: () => () =>
        Promise.reject(
          new DOMException('Dismissed', 'AbortError'),
        ),
    }),
  )
  const jobId = manager.inspectClip('clip_one', 'https://kick.com/a')
  await flushPromises()

  manager.requestDownload(jobId, 'file-system')
  assert.equal(job(manager, jobId).status, 'choosing-destination')
  await flushPromises()
  assert.equal(job(manager, jobId).status, 'ready')
  assert.equal(job(manager, jobId).error, undefined)
})

test('cancelling queued work preserves the remainder of the queue', async () => {
  const runs = []
  const manager = createDownloadManager(
    createManagerDependencies({
      downloadMediaPlan: async () => {
        const pending = deferred()
        runs.push(pending)
        await pending.promise
      },
    }),
  )
  const ids = ['clip_one', 'clip_two', 'clip_three'].map((clipId) =>
    manager.inspectClip(clipId, `https://kick.com/${clipId}`),
  )
  await flushPromises()
  await flushPromises()

  for (const id of ids) {
    manager.requestDownload(id, 'memory')
  }

  manager.cancel(ids[1])
  assert.equal(job(manager, ids[1]).status, 'cancelled')
  assert.equal(job(manager, ids[2]).queuePosition, 1)

  runs[0].resolve()
  await flushPromises()
  assert.equal(job(manager, ids[2]).status, 'active')
})

test('clears inactive jobs while preserving in-progress work', async () => {
  const runs = []
  const manager = createDownloadManager(
    createManagerDependencies({
      downloadMediaPlan: async () => {
        const pending = deferred()
        runs.push(pending)
        await pending.promise
      },
    }),
  )
  const ids = ['clip_one', 'clip_two', 'clip_three', 'clip_four'].map(
    (clipId) =>
      manager.inspectClip(clipId, `https://kick.com/${clipId}`),
  )
  await flushPromises()
  await flushPromises()

  manager.requestDownload(ids[0], 'memory')
  manager.requestDownload(ids[1], 'memory')
  manager.cancel(ids[3])
  manager.clearInactive()

  assert.deepEqual(
    manager.getSnapshot().jobs.map(({ id }) => id),
    [ids[0], ids[1]],
  )
  assert.equal(job(manager, ids[0]).status, 'active')
  assert.equal(job(manager, ids[1]).status, 'queued')

  runs[0].resolve()
  await flushPromises()
  manager.clearInactive()

  assert.deepEqual(
    manager.getSnapshot().jobs.map(({ id }) => id),
    [ids[1]],
  )
  assert.equal(job(manager, ids[1]).status, 'active')

  runs[1].resolve()
  await flushPromises()
})

function createManagerDependencies(overrides = {}) {
  return {
    createBlobSink: (filename) => createFakeSink(filename),
    createFileSystemSink: async (handle) =>
      createFakeSink(handle.name),
    downloadMediaPlan: async (_plan, _sink, _signal, { onProgress }) => {
      onProgress({
        completedSegments: 1,
        fetchedBytes: 100,
        phase: 'writing',
        processedBytes: 100,
        writtenBytes: 100,
      })
    },
    getSaveFilePicker: () => undefined,
    inspectClip: async (clipId) => inspectionFor(clipId),
    now: () => 1_000,
    ...overrides,
  }
}

function inspectionFor(clipId) {
  return {
    clipId,
    metadata: {
      category: 'Just Chatting',
      channel: 'channel',
      creator: 'clipper',
      duration: 12,
      likeCount: 78,
      pageUrl: `https://kick.com/channel/clips/${clipId}`,
      publishedAt: 1_785_328_496_000,
      title: `Title ${clipId}`,
      viewCount: 1234,
    },
    plan: {
      kind: 'direct-mp4',
      sourceBytes: 100,
      url: 'https://clips.kick.com/test.mp4',
    },
  }
}

function createFakeSink(filename) {
  return {
    abort: async () => undefined,
    close: async () => undefined,
    filename,
    write: async () => undefined,
  }
}

function createFakeHandle(name) {
  return {
    createWritable: async () => ({
      abort: async () => undefined,
      close: async () => undefined,
      write: async () => undefined,
    }),
    name,
  }
}

function job(manager, jobId) {
  return manager.getSnapshot().jobs.find(({ id }) => id === jobId)
}

function deferred() {
  let reject
  let resolve
  const promise = new Promise((resolvePromise, rejectPromise) => {
    reject = rejectPromise
    resolve = resolvePromise
  })
  return { promise, reject, resolve }
}

async function flushPromises() {
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
}

function createFakeTransmuxer(flushResults) {
  let onData = () => undefined
  const pushed = []
  const remuxModes = []

  return {
    pushed,
    remuxModes,
    transmuxer: {
      flush() {
        const result = flushResults.shift()

        if (result instanceof Error) {
          throw result
        }

        for (const segment of result ?? []) {
          onData(segment)
        }
      },
      on(event, listener) {
        assert.equal(event, 'data')
        onData = listener
      },
      push(bytes) {
        pushed.push(bytes)
      },
      setRemux(remux) {
        remuxModes.push(remux)
      },
    },
  }
}

function transmuxedSegment(type, data, initSegment) {
  return {
    data,
    initSegment,
    type,
  }
}

function createTsPacket(pid, section) {
  const packet = new Uint8Array(188).fill(0xff)
  packet[0] = 0x47
  packet[1] = 0x40 | ((pid >> 8) & 0x1f)
  packet[2] = pid & 0xff
  packet[3] = 0x10
  packet[4] = 0
  packet.set(section, 5)
  return packet
}

function rangeResponse(bytes, url, start, total) {
  const end = start + bytes.byteLength - 1
  const response = new Response(bytes, {
    headers: {
      'Content-Length': String(bytes.byteLength),
      'Content-Range': `bytes ${start}-${end}/${total}`,
    },
    status: 206,
  })
  return responseWithUrl(response, url)
}

function responseWithUrl(response, url) {
  Object.defineProperty(response, 'url', { value: url })
  return response
}

function createPatSection() {
  return Uint8Array.from([
    0x00, 0xb0, 0x0d,
    0x00, 0x01, 0xc1, 0x00, 0x00,
    0x00, 0x01, 0xe1, 0x00,
    0, 0, 0, 0,
  ])
}

function createPmtSection(streamTypes) {
  const sectionLength = 9 + streamTypes.length * 5 + 4
  const bytes = [
    0x02, 0xb0 | ((sectionLength >> 8) & 0x0f), sectionLength & 0xff,
    0x00, 0x01, 0xc1, 0x00, 0x00,
    0xe1, 0x00, 0xf0, 0x00,
  ]

  for (const [index, streamType] of streamTypes.entries()) {
    bytes.push(
      streamType,
      0xe1,
      index + 1,
      0xf0,
      0x00,
    )
  }

  bytes.push(0, 0, 0, 0)
  return Uint8Array.from(bytes)
}

function createBox(type, payload = new Uint8Array()) {
  const bytes = new Uint8Array(8 + payload.byteLength)
  const view = new DataView(bytes.buffer)
  view.setUint32(0, bytes.byteLength)
  bytes.set(new TextEncoder().encode(type), 4)
  bytes.set(payload, 8)
  return bytes
}

function concatBytes(...values) {
  const bytes = new Uint8Array(
    values.reduce((total, value) => total + value.byteLength, 0),
  )
  let offset = 0

  for (const value of values) {
    bytes.set(value, offset)
    offset += value.byteLength
  }

  return bytes
}
