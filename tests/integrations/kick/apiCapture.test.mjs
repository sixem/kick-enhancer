import assert from 'node:assert/strict'
import test from 'node:test'

import {
  API_CAPTURE_MESSAGE_SOURCE,
  API_CAPTURE_MESSAGE_TYPE,
  readCapturedKickApiMessage,
} from '../../../src/integrations/kick/apiCapture.ts'

function fixture() {
  const context = {
    currentHref: 'https://kick.com/example',
    currentOrigin: 'https://kick.com',
    messageWindow: {},
    now: 1_000_000,
    pageWindow: {},
  }
  const event = {
    data: {
      endpoint: 'FOLLOWED_CHANNELS',
      payload: { channels: [] },
      source: API_CAPTURE_MESSAGE_SOURCE,
      timestamp: context.now,
      type: API_CAPTURE_MESSAGE_TYPE,
      url: '/api/v2/channels/followed',
    },
    origin: context.currentOrigin,
    source: context.pageWindow,
  }
  return { context, event }
}

test('accepts either capture window and leaves payload validation to consumers', () => {
  const { context, event } = fixture()
  for (const source of [context.messageWindow, context.pageWindow]) {
    for (const payload of [
      null,
      undefined,
      'invalid payload',
      { channels: [] },
    ]) {
      const data = { ...event.data, payload }
      assert.equal(
        readCapturedKickApiMessage({ ...event, data, source }, context),
        data,
      )
    }
  }
})

test('rejects other windows and origins', () => {
  const { context, event } = fixture()
  for (const source of [null, {}]) {
    assert.equal(
      readCapturedKickApiMessage({ ...event, source }, context),
      undefined,
    )
  }
  for (const origin of [
    '',
    'null',
    'https://example.test',
    'https://web.kick.com',
  ]) {
    assert.equal(
      readCapturedKickApiMessage({ ...event, origin }, context),
      undefined,
    )
  }
})

test('rejects malformed capture envelopes', () => {
  const { context, event } = fixture()
  const missingPayload = { ...event.data }
  delete missingPayload.payload
  const malformed = [
    null,
    undefined,
    false,
    42,
    'message',
    [],
    {},
    Object.assign([], event.data),
    missingPayload,
    { ...event.data, source: 'other' },
    { ...event.data, type: 'other' },
    { ...event.data, endpoint: 'UNKNOWN' },
    { ...event.data, endpoint: null },
    { ...event.data, url: null },
    { ...event.data, timestamp: '1000000' },
    { ...event.data, timestamp: null },
    { ...event.data, timestamp: NaN },
    { ...event.data, timestamp: Infinity },
    { ...event.data, timestamp: -Infinity },
  ]
  for (const data of malformed) {
    assert.equal(
      readCapturedKickApiMessage({ ...event, data }, context),
      undefined,
    )
  }
})

test('requires the declared endpoint to match an allowed KICK URL', () => {
  const { context, event } = fixture()
  for (const url of [
    'https://example.test/api/v2/channels/followed',
    'http://kick.com/api/v2/channels/followed',
    'https://kick.com/api/v2/channels/example',
    'https://kick.com/api/v2/channels/followed/extra',
    'https://[',
  ]) {
    assert.equal(
      readCapturedKickApiMessage(
        { ...event, data: { ...event.data, url } },
        context,
      ),
      undefined,
    )
  }
  const data = {
    ...event.data,
    endpoint: 'CURRENT_VIEWERS',
    url: 'https://kick.com/current-viewers?ids[]=123',
  }
  assert.equal(readCapturedKickApiMessage({ ...event, data }, context), data)
})

test('accepts the one-minute boundary and rejects older or future captures beyond it', () => {
  const { context, event } = fixture()
  for (const offset of [-60_001, -60_000, 0, 60_000, 60_001]) {
    const data = { ...event.data, timestamp: context.now + offset }
    assert.equal(
      readCapturedKickApiMessage({ ...event, data }, context),
      Math.abs(offset) <= 60_000 ? data : undefined,
    )
  }
})

test('uses the current time when no test clock is provided', (t) => {
  const { context, event } = fixture()
  delete context.now
  t.mock.method(Date, 'now', () => event.data.timestamp)
  assert.equal(readCapturedKickApiMessage(event, context), event.data)
})
