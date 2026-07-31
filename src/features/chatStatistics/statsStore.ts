import {
  type ChatStatisticsSnapshot,
  type KickChatEvent,
} from './types.ts'

const CURRENT_WINDOW_MS = 60_000
const RETAINED_WINDOW_MS = 120_000
const RTT_SAMPLE_LIMIT = 20

type MessageRecord = Readonly<{
  messageId: string
  receivedAt: number
  senderId: string
}>

type SessionState = {
  chatroomId: string
  confirmedAt: number
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
        chatroomId: event.chatroomId,
        confirmedAt: event.observedAt,
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
      (event.messageType !== 'message' &&
        event.messageType !== 'reply')
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
    session.seenMessageIds.set(
      event.messageId,
      event.observedAt,
    )
    session.totalMessages += 1

    const currentCount = countCurrentWindow(
      session,
      event.observedAt,
    )
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

  getSelectedSocketId(): number | null {
    return this.#sessions.size === 1
      ? [...this.#sessions.values()][0]?.socketId ?? null
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

    const currentCount = countCurrentWindow(session, now)

    session.peakMessagesPerMinute = Math.max(
      session.peakMessagesPerMinute,
      currentCount,
    )

    return {
      activeChatters: countActiveChatters(session, now),
      chatroomId: session.chatroomId,
      messagesPerMinute: currentCount,
      peakMessagesPerMinute: session.peakMessagesPerMinute,
      socketRttMs: median(
        this.#rttSamples.get(session.socketId) ?? [],
      ),
      status: 'active',
      totalMessages: session.totalMessages,
      trendReadyAt: session.confirmedAt + CURRENT_WINDOW_MS,
      trendPercent: calculateSessionTrend(
        session,
        now,
        currentCount,
      ),
    }
  }
}

function pruneSession(session: SessionState, now: number) {
  const cutoff = now - RETAINED_WINDOW_MS

  while (
    session.firstRecordIndex < session.records.length &&
    (session.records[session.firstRecordIndex]?.receivedAt ??
      Infinity) <= cutoff
  ) {
    const record = session.records[session.firstRecordIndex]
    session.firstRecordIndex += 1

    if (
      record &&
      session.seenMessageIds.get(record.messageId) ===
        record.receivedAt
    ) {
      session.seenMessageIds.delete(record.messageId)
    }
  }

  if (
    session.firstRecordIndex > 128 &&
    session.firstRecordIndex * 2 > session.records.length
  ) {
    session.records = session.records.slice(
      session.firstRecordIndex,
    )
    session.firstRecordIndex = 0
  }
}

function countCurrentWindow(session: SessionState, now: number) {
  const cutoff = now - CURRENT_WINDOW_MS
  let count = 0

  for (
    let index = session.records.length - 1;
    index >= session.firstRecordIndex;
    index -= 1
  ) {
    const record = session.records[index]

    if (!record || record.receivedAt <= cutoff) {
      break
    }

    count += 1
  }

  return count
}

function countWindow(
  session: SessionState,
  lowerExclusive: number,
  upperInclusive: number,
) {
  let count = 0

  for (
    let index = session.firstRecordIndex;
    index < session.records.length;
    index += 1
  ) {
    const receivedAt = session.records[index]?.receivedAt

    if (
      receivedAt === undefined ||
      receivedAt <= lowerExclusive
    ) {
      continue
    }

    if (receivedAt > upperInclusive) {
      break
    }

    count += 1
  }

  return count
}

function countActiveChatters(session: SessionState, now: number) {
  const cutoff = now - CURRENT_WINDOW_MS
  const senders = new Set<string>()

  for (
    let index = session.records.length - 1;
    index >= session.firstRecordIndex;
    index -= 1
  ) {
    const record = session.records[index]

    if (!record || record.receivedAt <= cutoff) {
      break
    }

    senders.add(record.senderId)
  }

  return senders.size
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
      : countWindow(
          session,
          now - RETAINED_WINDOW_MS,
          now - CURRENT_WINDOW_MS,
        )

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

function createSessionKey(socketId: number, channelName: string) {
  return `${socketId}:${channelName}`
}
