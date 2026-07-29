import { once } from 'node:events'
import { createWriteStream } from 'node:fs'

import muxModule from 'mux.js'

const [playlistUrlValue, outputPath] = process.argv.slice(2)

if (!playlistUrlValue || !outputPath) {
  throw new Error('Usage: transmux.mjs <playlist-url> <output-path>')
}

const playlistUrl = new URL(playlistUrlValue)
const playlistResponse = await fetch(playlistUrl)

if (!playlistResponse.ok) {
  throw new Error(`Playlist request failed: ${playlistResponse.status}`)
}

const playlistText = await playlistResponse.text()
const segments = parsePlaylist(playlistText, playlistUrl)
const output = createWriteStream(outputPath)
const transmuxer = new muxModule.mp4.Transmuxer({
  remux: true,
})
const emitted = []
let firstInitSegment
let maximumOutputFragment = 0
let sourceBytes = 0

transmuxer.on('data', (segment) => {
  emitted.push({
    data: segment.data,
    initSegment: segment.initSegment,
    type: segment.type,
  })
})

for (const [index, segment] of segments.entries()) {
  const end = segment.offset + segment.length - 1
  const response = await fetch(segment.url, {
    headers: {
      Range: `bytes=${segment.offset}-${end}`,
    },
  })

  if (response.status !== 206) {
    throw new Error(`Range request returned ${response.status}`)
  }

  if (response.url && new URL(response.url).hostname !== 'clips.kick.com') {
    throw new Error('Range request redirected to an unexpected host')
  }

  const expectedContentRange =
    `bytes ${segment.offset}-${end}/`
  const contentRange = response.headers.get('content-range')

  if (!contentRange?.startsWith(expectedContentRange)) {
    throw new Error(`Unexpected Content-Range: ${contentRange}`)
  }

  const bytes = new Uint8Array(await response.arrayBuffer())

  if (bytes.byteLength !== segment.length) {
    throw new Error(
      `Expected ${segment.length} bytes, received ${bytes.byteLength}`,
    )
  }

  for (let offset = 0; offset < bytes.byteLength; offset += 256 * 1024) {
    transmuxer.push(bytes.subarray(offset, offset + 256 * 1024))
  }

  transmuxer.flush()
  sourceBytes += bytes.byteLength

  if (emitted.length !== 1) {
    throw new Error(
      `Logical segment ${index} emitted ${emitted.length} outputs`,
    )
  }

  const [{ data, initSegment, type }] = emitted.splice(0)

  if (type !== 'combined') {
    throw new Error(`Expected combined output, received ${type}`)
  }

  if (!firstInitSegment) {
    firstInitSegment = initSegment.slice()
    await write(output, firstInitSegment)
  } else if (!equalBytes(firstInitSegment, initSegment)) {
    throw new Error(`Initialization metadata changed at segment ${index}`)
  }

  maximumOutputFragment = Math.max(
    maximumOutputFragment,
    data.byteLength,
  )
  await write(output, data)
}

output.end()
await once(output, 'close')

console.log(
  JSON.stringify(
    {
      initBytes: firstInitSegment?.byteLength ?? 0,
      maximumInputRange: Math.max(...segments.map(({ length }) => length)),
      maximumOutputFragment,
      outputPath,
      segments: segments.length,
      sourceBytes,
    },
    null,
    2,
  ),
)

function parsePlaylist(text, baseUrl) {
  const lines = text.split(/\r?\n/)
  const segments = []
  let pendingRange

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line.startsWith('#EXT-X-BYTERANGE:')) {
      const match = /^#EXT-X-BYTERANGE:(\d+)@(\d+)$/.exec(line)

      if (!match) {
        throw new Error(`Unsupported byte range: ${line}`)
      }

      pendingRange = {
        length: Number(match[1]),
        offset: Number(match[2]),
      }
      continue
    }

    if (!line || line.startsWith('#')) {
      continue
    }

    if (!pendingRange) {
      throw new Error('Expected an explicit byte range')
    }

    segments.push({
      ...pendingRange,
      url: new URL(line, baseUrl),
    })
    pendingRange = undefined
  }

  if (!text.includes('#EXT-X-ENDLIST')) {
    throw new Error('Expected a static media playlist')
  }

  return segments
}

function equalBytes(left, right) {
  if (left.byteLength !== right.byteLength) {
    return false
  }

  for (let index = 0; index < left.byteLength; index += 1) {
    if (left[index] !== right[index]) {
      return false
    }
  }

  return true
}

async function write(stream, bytes) {
  if (!stream.write(bytes)) {
    await once(stream, 'drain')
  }
}
