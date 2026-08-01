import assert from 'node:assert/strict'

export function createFakeTransmuxer(flushResults) {
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

export function transmuxedSegment(type, data, initSegment) {
  return {
    data,
    initSegment,
    type,
  }
}
