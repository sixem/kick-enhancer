import { MAX_OUTPUT_FRAGMENT_BYTES } from './mediaTypes.ts'

type TransmuxedSegment = Readonly<{
  data: Uint8Array
  initSegment: Uint8Array
  type: string
}>

type Transmuxer = Readonly<{
  flush: () => void
  on: (event: 'data', listener: (segment: TransmuxedSegment) => void) => void
  push: (bytes: Uint8Array) => void
  setRemux: (remux: boolean) => void
}>

export type TransmuxedFragment = Readonly<{
  data: Uint8Array
  initSegment?: Uint8Array
}>

const ISOLATED_TRACK_TYPES = new Set(['audio', 'video'])

export function createTransmuxerSession(transmuxer: Transmuxer) {
  let firstInitSegment: Uint8Array | undefined
  let pendingSegments: TransmuxedSegment[] = []

  transmuxer.on('data', (segment) => {
    pendingSegments.push(segment)
  })

  function push(bytes: Uint8Array) {
    transmuxer.push(bytes)
  }

  function flush(): TransmuxedFragment {
    pendingSegments = []
    transmuxer.flush()

    const isolatedTrackRecovered =
      pendingSegments.length === 0 && firstInitSegment !== undefined

    if (isolatedTrackRecovered) {
      try {
        transmuxer.setRemux(false)
        transmuxer.flush()
      } finally {
        transmuxer.setRemux(true)
      }
    }

    if (pendingSegments.length !== 1) {
      throw new Error('The segment produced an unexpected output layout.')
    }

    const [segment] = pendingSegments
    pendingSegments = []

    if (
      segment.type !== 'combined' &&
      !(isolatedTrackRecovered && ISOLATED_TRACK_TYPES.has(segment.type))
    ) {
      throw new Error(
        'The clip did not produce supported audio and video tracks.',
      )
    }

    if (segment.data.byteLength > MAX_OUTPUT_FRAGMENT_BYTES) {
      throw new Error('The MP4 fragment exceeds the safe output limit.')
    }

    let initSegment: Uint8Array | undefined

    if (segment.type === 'combined') {
      if (!firstInitSegment) {
        firstInitSegment = segment.initSegment.slice()
        initSegment = firstInitSegment.slice()
      } else if (!equalBytes(firstInitSegment, segment.initSegment)) {
        throw new Error('The clip track metadata changes during playback.')
      }
    }

    return {
      data: segment.data,
      ...(initSegment ? { initSegment } : {}),
    }
  }

  return {
    flush,
    push,
  }
}

function equalBytes(left: Uint8Array, right: Uint8Array) {
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
