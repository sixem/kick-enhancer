import { type ChatStatisticsSnapshot, type KickChatEvent } from './types.ts'

const CURRENT_WINDOW_MS = 60_000
const RETAINED_WINDOW_MS = 120_000
const RTT_SAMPLE_LIMIT = 20

type MessageRecord = Readonly<{
  messageId: string
  receivedAt: number
  senderId: string
}>

type SessionState = {
  activeSenderCounts: Map<string, number>
  chatroomId: string
  confirmedAt: number
  currentWindowStartIndex: number
  firstRecordIndex: number
  peakMessagesPerMinute: number
  records: MessageRecord[]
  seenMessageIds: Map<string, number>
  socketId: number
  totalMessages: number
}

export class ChatStatsStore {
  readonly #rttSamples = new Map<number, number[]>()
  readonly #sessions = new Map<string, SessionState>()

  accept(event: KickChatEvent) {
    const key = createSessionKey(event.socketId, event.channelName)

    if (event.type === 'sessionStarted') {
      this.#sessions.set(key, {
        activeSenderCounts: new Map(),
        chatroomId: event.chatroomId,
        confirmedAt: event.observedAt,
        currentWindowStartIndex: 0,
        firstRecordIndex: 0,
        peakMessagesPerMinute: 0,
        records: [],
        seenMessageIds: new Map(),
        socketId: event.socketId,
        totalMessages: 0,
      })
      return
    }

    if (event.type === 'sessionEnded') {
      this.#sessions.delete(key)
      return
    }

    if (event.type !== 'message') {
      return
    }

    const session = this.#sessions.get(key)

    if (
      !session ||
      (event.messageType !== 'message' && event.messageType !== 'reply')
    ) {
      return
    }

    pruneSession(session, event.observedAt)

    if (session.seenMessageIds.has(event.messageId)) {
      return
    }

    session.records.push({
      messageId: event.messageId,
      receivedAt: event.observedAt,
      senderId: event.senderId,
    })
    session.seenMessageIds.set(event.messageId, event.observedAt)
    incrementSenderCount(session, event.senderId)
    session.totalMessages += 1

    const currentCount = countCurrentWindow(session)
    session.peakMessagesPerMinute = Math.max(
      session.peakMessagesPerMinute,
      currentCount,
    )
  }

  addRttSample(socketId: number, rttMs: number) {
    if (!Number.isFinite(rttMs) || rttMs < 0) {
      return
    }

    const samples = this.#rttSamples.get(socketId) ?? []
    samples.push(rttMs)

    if (samples.length > RTT_SAMPLE_LIMIT) {
      samples.splice(0, samples.length - RTT_SAMPLE_LIMIT)
    }

    this.#rttSamples.set(socketId, samples)
  }

  clearSocket(socketId: number) {
    this.#rttSamples.delete(socketId)
  }

  resetStatistics(now: number) {
    this.#rttSamples.clear()

    for (const session of this.#sessions.values()) {
      resetSessionStatistics(session, now)
    }
  }

  getSelectedSocketId(): number | null {
    return this.#sessions.size === 1
      ? ([...this.#sessions.values()][0]?.socketId ?? null)
      : null
  }

  getSnapshot(now: number): ChatStatisticsSnapshot {
    if (this.#sessions.size === 0) {
      return {
        status: 'pending',
      }
    }

    if (this.#sessions.size > 1) {
      return {
        reason: 'multiple-sessions',
        status: 'unavailable',
      }
    }

    const session = [...this.#sessions.values()][0]

    if (!session) {
      return {
        status: 'pending',
      }
    }

    pruneSession(session, now)

    const currentCount = countCurrentWindow(session)

    session.peakMessagesPerMinute = Math.max(
      session.peakMessagesPerMinute,
      currentCount,
    )

    return {
      activeChatters: session.activeSenderCounts.size,
      chatroomId: session.chatroomId,
      messagesPerMinute: currentCount,
      peakMessagesPerMinute: session.peakMessagesPerMinute,
      socketRttMs: median(this.#rttSamples.get(session.socketId) ?? []),
      status: 'active',
      totalMessages: session.totalMessages,
      trendReadyAt: session.confirmedAt + CURRENT_WINDOW_MS,
      trendPercent: calculateSessionTrend(session, now, currentCount),
    }
  }
}

function pruneSession(session: SessionState, now: number) {
  advanceCurrentWindow(session, now)
  const cutoff = now - RETAINED_WINDOW_MS

  while (
    session.firstRecordIndex < session.records.length &&
    (session.records[session.firstRecordIndex]?.receivedAt ?? Infinity) <=
      cutoff
  ) {
    const record = session.records[session.firstRecordIndex]
    session.firstRecordIndex += 1

    if (
      record &&
      session.seenMessageIds.get(record.messageId) === record.receivedAt
    ) {
      session.seenMessageIds.delete(record.messageId)
    }
  }

  if (
    session.firstRecordIndex > 128 &&
    session.firstRecordIndex * 2 > session.records.length
  ) {
    const removedRecords = session.firstRecordIndex
    session.records = session.records.slice(removedRecords)
    session.firstRecordIndex = 0
    session.currentWindowStartIndex = Math.max(
      0,
      session.currentWindowStartIndex - removedRecords,
    )
  }
}

function advanceCurrentWindow(session: SessionState, now: number) {
  const cutoff = now - CURRENT_WINDOW_MS
  session.currentWindowStartIndex = Math.max(
    session.currentWindowStartIndex,
    session.firstRecordIndex,
  )

  while (
    session.currentWindowStartIndex < session.records.length &&
    (session.records[session.currentWindowStartIndex]?.receivedAt ??
      Infinity) <= cutoff
  ) {
    const record = session.records[session.currentWindowStartIndex]
    session.currentWindowStartIndex += 1

    if (record) {
      decrementSenderCount(session, record.senderId)
    }
  }
}

function countCurrentWindow(session: SessionState) {
  return session.records.length - session.currentWindowStartIndex
}

function countWindow(
  session: SessionState,
  lowerExclusive: number,
  upperInclusive: number,
) {
  const start = findFirstRecordAfter(
    session.records,
    session.firstRecordIndex,
    lowerExclusive,
  )
  const end = findFirstRecordAfter(session.records, start, upperInclusive)

  return end - start
}

function findFirstRecordAfter(
  records: readonly MessageRecord[],
  startIndex: number,
  timestamp: number,
) {
  let lower = startIndex
  let upper = records.length

  while (lower < upper) {
    const middle = lower + Math.floor((upper - lower) / 2)
    const receivedAt = records[middle]?.receivedAt ?? Infinity

    if (receivedAt <= timestamp) {
      lower = middle + 1
    } else {
      upper = middle
    }
  }

  return lower
}

function calculateSessionTrend(
  session: SessionState,
  now: number,
  currentCount: number,
) {
  const elapsed = Math.max(0, now - session.confirmedAt)

  if (elapsed < CURRENT_WINDOW_MS) {
    return null
  }

  // Keep the first complete minute fixed until a second full window exists.
  const previousCount =
    elapsed < RETAINED_WINDOW_MS
      ? countWindow(
          session,
          session.confirmedAt,
          session.confirmedAt + CURRENT_WINDOW_MS,
        )
      : countWindow(session, now - RETAINED_WINDOW_MS, now - CURRENT_WINDOW_MS)

  return calculateTrend(currentCount, previousCount)
}

function calculateTrend(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? 0 : null
  }

  return Math.round(((current - previous) / previous) * 100)
}

function median(samples: readonly number[]) {
  if (samples.length === 0) {
    return null
  }

  const sorted = [...samples].sort((left, right) => left - right)
  const middle = Math.floor(sorted.length / 2)
  const upper = sorted[middle]

  if (upper === undefined) {
    return null
  }

  if (sorted.length % 2 === 1) {
    return Math.round(upper)
  }

  const lower = sorted[middle - 1]
  return lower === undefined
    ? Math.round(upper)
    : Math.round((lower + upper) / 2)
}

function incrementSenderCount(session: SessionState, senderId: string) {
  session.activeSenderCounts.set(
    senderId,
    (session.activeSenderCounts.get(senderId) ?? 0) + 1,
  )
}

function decrementSenderCount(session: SessionState, senderId: string) {
  const count = session.activeSenderCounts.get(senderId)

  if (count === undefined) {
    return
  }

  if (count === 1) {
    session.activeSenderCounts.delete(senderId)
  } else {
    session.activeSenderCounts.set(senderId, count - 1)
  }
}

function resetSessionStatistics(session: SessionState, now: number) {
  session.activeSenderCounts.clear()
  session.confirmedAt = now
  session.currentWindowStartIndex = 0
  session.firstRecordIndex = 0
  session.peakMessagesPerMinute = 0
  session.records = []
  session.seenMessageIds.clear()
  session.totalMessages = 0
}

function createSessionKey(socketId: number, channelName: string) {
  return `${socketId}:${channelName}`
}
