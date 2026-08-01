export function createTsPacket(pid, section) {
  const packet = new Uint8Array(188).fill(0xff)
  packet[0] = 0x47
  packet[1] = 0x40 | ((pid >> 8) & 0x1f)
  packet[2] = pid & 0xff
  packet[3] = 0x10
  packet[4] = 0
  packet.set(section, 5)
  return packet
}

export function rangeResponse(bytes, url, start, total) {
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

export function responseWithUrl(response, url) {
  Object.defineProperty(response, 'url', { value: url })
  return response
}

export function createPatSection() {
  return Uint8Array.from([
    0x00, 0xb0, 0x0d, 0x00, 0x01, 0xc1, 0x00, 0x00, 0x00, 0x01, 0xe1, 0x00, 0,
    0, 0, 0,
  ])
}

export function createPmtSection(streamTypes) {
  const sectionLength = 9 + streamTypes.length * 5 + 4
  const bytes = [
    0x02,
    0xb0 | ((sectionLength >> 8) & 0x0f),
    sectionLength & 0xff,
    0x00,
    0x01,
    0xc1,
    0x00,
    0x00,
    0xe1,
    0x00,
    0xf0,
    0x00,
  ]

  for (const [index, streamType] of streamTypes.entries()) {
    bytes.push(streamType, 0xe1, index + 1, 0xf0, 0x00)
  }

  bytes.push(0, 0, 0, 0)
  return Uint8Array.from(bytes)
}

export function createBox(type, payload = new Uint8Array()) {
  const bytes = new Uint8Array(8 + payload.byteLength)
  const view = new DataView(bytes.buffer)
  view.setUint32(0, bytes.byteLength)
  bytes.set(new TextEncoder().encode(type), 4)
  bytes.set(payload, 8)
  return bytes
}

export function concatBytes(...values) {
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
