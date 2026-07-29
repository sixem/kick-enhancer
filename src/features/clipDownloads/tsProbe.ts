import { ClipDownloadError } from './errors.ts'

const TS_PACKET_BYTES = 188
const H264_STREAM_TYPE = 0x1b
const AAC_STREAM_TYPES = new Set([0x0f, 0x11])
const ID3_STREAM_TYPE = 0x15

export type TransportStreamProbe = Readonly<{
  audioCodec: 'aac'
  metadata: boolean
  videoCodec: 'h264'
}>

export function inspectTransportStream(
  bytes: Uint8Array,
): TransportStreamProbe {
  if (bytes.byteLength < TS_PACKET_BYTES * 3) {
    unsupported('The media probe is too short to identify its streams.')
  }

  const packetBytes =
    Math.floor(bytes.byteLength / TS_PACKET_BYTES) * TS_PACKET_BYTES

  for (let offset = 0; offset < packetBytes; offset += TS_PACKET_BYTES) {
    if (bytes[offset] !== 0x47) {
      unsupported('The clip media is not a valid MPEG transport stream.')
    }
  }

  const pat = findPsiSection(bytes, 0, 0x00)
  const pmtPid = parseProgramMapPid(pat)
  const pmt = findPsiSection(bytes, pmtPid, 0x02)
  const streamTypes = parseStreamTypes(pmt)
  const hasH264 = streamTypes.includes(H264_STREAM_TYPE)
  const hasAac = streamTypes.some((type) => AAC_STREAM_TYPES.has(type))
  const unsupportedTypes = streamTypes.filter(
    (type) =>
      type !== H264_STREAM_TYPE &&
      !AAC_STREAM_TYPES.has(type) &&
      type !== ID3_STREAM_TYPE,
  )

  if (!hasH264 || !hasAac || unsupportedTypes.length > 0) {
    unsupported('The clip uses unsupported transport-stream codecs.')
  }

  return {
    audioCodec: 'aac',
    metadata: streamTypes.includes(ID3_STREAM_TYPE),
    videoCodec: 'h264',
  }
}

function findPsiSection(
  bytes: Uint8Array,
  targetPid: number,
  tableId: number,
) {
  let sectionBytes: number[] = []
  let expectedLength: number | undefined

  for (
    let packetOffset = 0;
    packetOffset + TS_PACKET_BYTES <= bytes.byteLength;
    packetOffset += TS_PACKET_BYTES
  ) {
    const byte1 = bytes[packetOffset + 1]
    const byte2 = bytes[packetOffset + 2]
    const byte3 = bytes[packetOffset + 3]
    const pid = ((byte1 & 0x1f) << 8) | byte2

    if (pid !== targetPid || (byte1 & 0x80) !== 0) {
      continue
    }

    const adaptationControl = (byte3 >> 4) & 0x03

    if (adaptationControl === 0 || adaptationControl === 2) {
      continue
    }

    let payloadOffset = packetOffset + 4

    if (adaptationControl === 3) {
      payloadOffset += bytes[payloadOffset] + 1
    }

    if (payloadOffset >= packetOffset + TS_PACKET_BYTES) {
      continue
    }

    if ((byte1 & 0x40) !== 0) {
      const pointer = bytes[payloadOffset]
      payloadOffset += pointer + 1
      sectionBytes = []
      expectedLength = undefined
    }

    for (
      let index = payloadOffset;
      index < packetOffset + TS_PACKET_BYTES;
      index += 1
    ) {
      if (sectionBytes.length === 0 && bytes[index] === 0xff) {
        break
      }

      sectionBytes.push(bytes[index])

      if (sectionBytes.length === 3) {
        if (sectionBytes[0] !== tableId) {
          sectionBytes = []
          break
        }

        expectedLength =
          3 + (((sectionBytes[1] & 0x0f) << 8) | sectionBytes[2])
      }

      if (
        expectedLength !== undefined &&
        sectionBytes.length === expectedLength
      ) {
        return Uint8Array.from(sectionBytes)
      }
    }
  }

  unsupported('The transport-stream track metadata is incomplete.')
}

function parseProgramMapPid(section: Uint8Array) {
  for (let offset = 8; offset + 4 <= section.byteLength - 4; offset += 4) {
    const programNumber = (section[offset] << 8) | section[offset + 1]

    if (programNumber !== 0) {
      return ((section[offset + 2] & 0x1f) << 8) | section[offset + 3]
    }
  }

  unsupported('The transport stream does not declare a media program.')
}

function parseStreamTypes(section: Uint8Array) {
  if (section.byteLength < 16) {
    unsupported('The transport-stream program metadata is invalid.')
  }

  const programInfoLength =
    ((section[10] & 0x0f) << 8) | section[11]
  const streamTypes = []
  let offset = 12 + programInfoLength
  const end = section.byteLength - 4

  while (offset + 5 <= end) {
    const streamType = section[offset]
    const infoLength =
      ((section[offset + 3] & 0x0f) << 8) | section[offset + 4]
    streamTypes.push(streamType)
    offset += 5 + infoLength
  }

  if (offset !== end || streamTypes.length === 0) {
    unsupported('The transport-stream tracks are invalid.')
  }

  return streamTypes
}

function unsupported(message: string): never {
  throw new ClipDownloadError('unsupported-media', message)
}
