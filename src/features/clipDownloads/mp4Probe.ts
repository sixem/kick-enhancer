import { ClipDownloadError } from './errors.ts'

const MP4_SIGNATURE_SEARCH_BYTES = 64

export function inspectMp4Probe(
  prefix: Uint8Array,
  suffix?: Uint8Array,
) {
  if (!hasFtypSignature(prefix)) {
    unsupported('The direct clip resource is not an MP4 file.')
  }

  const probes = suffix ? [prefix, suffix] : [prefix]
  const hasMoov = probes.some((bytes) => containsBoxType(bytes, 'moov'))
  const hasH264 = probes.some(
    (bytes) =>
      containsBoxType(bytes, 'avc1') ||
      containsBoxType(bytes, 'avc3'),
  )
  const hasAac = probes.some((bytes) => containsBoxType(bytes, 'mp4a'))
  const unsupportedVideo = probes.some(
    (bytes) =>
      containsBoxType(bytes, 'hev1') ||
      containsBoxType(bytes, 'hvc1') ||
      containsBoxType(bytes, 'av01') ||
      containsBoxType(bytes, 'vp09'),
  )

  if (!hasMoov) {
    unsupported(
      'The MP4 metadata could not be verified within the probe limit.',
    )
  }

  if (!hasH264 || !hasAac || unsupportedVideo) {
    unsupported('The direct MP4 uses unsupported codecs.')
  }

  return {
    audioCodec: 'aac' as const,
    videoCodec: 'h264' as const,
  }
}

function hasFtypSignature(bytes: Uint8Array) {
  const searchLength = Math.min(
    bytes.byteLength - 4,
    MP4_SIGNATURE_SEARCH_BYTES,
  )

  for (let offset = 4; offset <= searchLength; offset += 1) {
    if (readType(bytes, offset) === 'ftyp') {
      const size = readUint32(bytes, offset - 4)
      return size >= 8 && offset - 4 + size <= bytes.byteLength
    }
  }

  return false
}

function containsBoxType(bytes: Uint8Array, type: string) {
  for (let offset = 4; offset + 4 <= bytes.byteLength; offset += 1) {
    if (readType(bytes, offset) !== type) {
      continue
    }

    const size = readUint32(bytes, offset - 4)

    if (size === 0 || size >= 8) {
      return true
    }
  }

  return false
}

function readType(bytes: Uint8Array, offset: number) {
  return String.fromCharCode(
    bytes[offset],
    bytes[offset + 1],
    bytes[offset + 2],
    bytes[offset + 3],
  )
}

function readUint32(bytes: Uint8Array, offset: number) {
  return (
    bytes[offset] * 0x1000000 +
    (bytes[offset + 1] << 16) +
    (bytes[offset + 2] << 8) +
    bytes[offset + 3]
  )
}

function unsupported(message: string): never {
  throw new ClipDownloadError('unsupported-media', message)
}
