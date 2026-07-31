import assert from 'node:assert/strict'
import test from 'node:test'

import { ChatStatsStore } from '../src/features/chatStatistics/statsStore.ts'

const CHANNEL = 'chatrooms.29191.v2'

test('calculates rolling statistics during the visual warm-up', () => {
  const store = new ChatStatsStore()
  store.accept(sessionEvent('sessionStarted', 0))
  store.accept(message('one', 'sender-a', 'message', 1_000))
  store.accept(message('two', 'sender-b', 'reply', 2_000))
  store.accept(message('ignored', 'sender-c', 'subscription', 3_000))
  store.accept(message('one', 'sender-a', 'message', 4_000))

  assert.deepEqual(store.getSnapshot(59_000), {
    activeChatters: 2,
    chatroomId: '29191',
    messagesPerMinute: 2,
    peakMessagesPerMinute: 2,
    socketRttMs: null,
    status: 'active',
    totalMessages: 2,
    trendReadyAt: 60_000,
    trendPercent: null,
  })

  assert.deepEqual(store.getSnapshot(60_001), {
    activeChatters: 2,
    chatroomId: '29191',
    messagesPerMinute: 2,
    peakMessagesPerMinute: 2,
    socketRttMs: null,
    status: 'active',
    totalMessages: 2,
    trendReadyAt: 60_000,
    trendPercent: 0,
  })
})

test('calculates adjacent-window trend, peak, and totals', () => {
  const store = new ChatStatsStore()
  store.accept(sessionEvent('sessionStarted', 0))

  for (let index = 1; index <= 10; index += 1) {
    store.accept(
      message(
        `previous-${index}`,
        `sender-${index}`,
        'message',
        index * 1_000,
      ),
    )
  }

  for (let index = 1; index <= 15; index += 1) {
    store.accept(
      message(
        `current-${index}`,
        `sender-${index}`,
        'message',
        60_000 + index * 1_000,
      ),
    )
  }

  const snapshot = store.getSnapshot(120_001)

  assert.equal(snapshot.status, 'active')
  assert.equal(snapshot.messagesPerMinute, 15)
  assert.equal(snapshot.activeChatters, 15)
  assert.equal(snapshot.peakMessagesPerMinute, 15)
  assert.equal(snapshot.totalMessages, 25)
  assert.equal(snapshot.trendPercent, 50)
})

test('uses the first complete minute as the initial trend baseline', () => {
  const store = new ChatStatsStore()
  store.accept(sessionEvent('sessionStarted', 0))

  for (let index = 1; index <= 10; index += 1) {
    store.accept(
      message(
        `baseline-${index}`,
        `sender-${index}`,
        'message',
        index * 5_000,
      ),
    )
  }

  const baseline = store.getSnapshot(60_000)

  assert.equal(baseline.status, 'active')
  assert.equal(baseline.messagesPerMinute, 10)
  assert.equal(baseline.trendPercent, 0)

  for (let index = 1; index <= 5; index += 1) {
    store.accept(
      message(
        `next-${index}`,
        `next-sender-${index}`,
        'message',
        60_000 + index * 1_000,
      ),
    )
  }

  const next = store.getSnapshot(65_000)

  assert.equal(next.status, 'active')
  assert.equal(next.messagesPerMinute, 14)
  assert.equal(next.trendPercent, 40)
})

test('handles zero previous windows without infinite percentages', () => {
  const store = new ChatStatsStore()
  store.accept(sessionEvent('sessionStarted', 0))
  store.accept(message('current', 'sender', 'message', 90_000))

  const snapshot = store.getSnapshot(120_001)

  assert.equal(snapshot.status, 'active')
  assert.equal(snapshot.trendPercent, null)
})

test('selects exactly one confirmed session', () => {
  const store = new ChatStatsStore()

  assert.deepEqual(store.getSnapshot(0), {
    status: 'pending',
  })

  store.accept(sessionEvent('sessionStarted', 0))
  store.accept(
    sessionEvent(
      'sessionStarted',
      0,
      8,
      'chatrooms.777.v2',
      '777',
    ),
  )

  assert.deepEqual(store.getSnapshot(1_000), {
    reason: 'multiple-sessions',
    status: 'unavailable',
  })

  store.accept(
    sessionEvent(
      'sessionEnded',
      2_000,
      8,
      'chatrooms.777.v2',
      '777',
    ),
  )

  assert.equal(store.getSnapshot(2_000).status, 'active')
})

test('reports the median of bounded socket RTT samples', () => {
  const store = new ChatStatsStore()
  store.accept(sessionEvent('sessionStarted', 0))
  store.addRttSample(7, 107.2)
  store.addRttSample(7, 108)
  store.addRttSample(7, 107.5)

  const snapshot = store.getSnapshot(1_000)

  assert.equal(snapshot.status, 'active')
  assert.equal(snapshot.socketRttMs, 108)
})

test('ending a session resets its total and peak', () => {
  const store = new ChatStatsStore()
  store.accept(sessionEvent('sessionStarted', 0))
  store.accept(message('one', 'sender', 'message', 1_000))
  store.accept(sessionEvent('sessionEnded', 70_000))
  store.accept(sessionEvent('sessionStarted', 80_000))

  const snapshot = store.getSnapshot(81_000)

  assert.equal(snapshot.status, 'active')
  assert.equal(snapshot.totalMessages, 0)
  assert.equal(snapshot.peakMessagesPerMinute, 0)
  assert.equal(snapshot.trendReadyAt, 140_000)
})

test('resets statistics without losing the active session', () => {
  const store = new ChatStatsStore()
  store.accept(sessionEvent('sessionStarted', 0))
  store.accept(message('one', 'sender-a', 'message', 1_000))
  store.addRttSample(7, 100)

  store.resetStatistics(10_000)

  assert.deepEqual(store.getSnapshot(10_000), {
    activeChatters: 0,
    chatroomId: '29191',
    messagesPerMinute: 0,
    peakMessagesPerMinute: 0,
    socketRttMs: null,
    status: 'active',
    totalMessages: 0,
    trendReadyAt: 70_000,
    trendPercent: null,
  })

  store.accept(message('one', 'sender-b', 'message', 11_000))
  const resumed = store.getSnapshot(11_000)

  assert.equal(resumed.status, 'active')
  assert.equal(resumed.totalMessages, 1)
  assert.equal(resumed.activeChatters, 1)
})

test('keeps rolling statistics exact during high-volume chat', () => {
  const store = new ChatStatsStore()
  const messageCount = 25_000
  const senderCount = 500
  store.accept(sessionEvent('sessionStarted', 0))

  for (let index = 1; index <= messageCount; index += 1) {
    store.accept(
      message(
        `burst-${index}`,
        `sender-${index % senderCount}`,
        'message',
        index,
      ),
    )
  }

  const peak = store.getSnapshot(messageCount)

  assert.equal(peak.status, 'active')
  assert.equal(peak.messagesPerMinute, messageCount)
  assert.equal(peak.activeChatters, senderCount)
  assert.equal(peak.peakMessagesPerMinute, messageCount)
  assert.equal(peak.totalMessages, messageCount)

  const expired = store.getSnapshot(90_000)

  assert.equal(expired.status, 'active')
  assert.equal(expired.messagesPerMinute, 0)
  assert.equal(expired.activeChatters, 0)
  assert.equal(expired.peakMessagesPerMinute, messageCount)

  store.getSnapshot(150_000)
  store.accept(message('burst-1', 'sender-new', 'message', 150_001))
  const reusedId = store.getSnapshot(150_001)

  assert.equal(reusedId.status, 'active')
  assert.equal(reusedId.totalMessages, messageCount + 1)
  assert.equal(reusedId.messagesPerMinute, 1)
  assert.equal(reusedId.activeChatters, 1)
})

function sessionEvent(
  type,
  observedAt,
  socketId = 7,
  channelName = CHANNEL,
  chatroomId = '29191',
) {
  return {
    channelName,
    chatroomId,
    observedAt,
    socketId,
    type,
  }
}

function message(
  messageId,
  senderId,
  messageType,
  observedAt,
) {
  return {
    channelName: CHANNEL,
    chatroomId: '29191',
    messageId,
    messageType,
    observedAt,
    senderId,
    socketId: 7,
    type: 'message',
  }
}
