import { type ChatSocketEvent, type WebSocketFrameDirection } from './types.ts'

const SAMPLE_TIMEOUT_MS = 15_000
const MAX_PENDING_REQUESTS = 128
const REQUEST_TYPES = [
  'connect',
  'subscribe',
  'unsubscribe',
  'publish',
  'presence',
  'presence_stats',
  'history',
  'rpc',
  'refresh',
  'sub_refresh',
] as const

// Measure requests the page already sends. Empty server heartbeats and the
// client's immediate empty response are not a client-measured round trip.
export class CentrifugoRttTracker {
  readonly #pending = new Map<
    number,
    Map<number, { method: string; sentAt: number }>
  >()

  clearSocket(socketId: number) {
    this.#pending.delete(socketId)
  }

  accept(
    envelope: Record<string, unknown>,
    direction: WebSocketFrameDirection,
    socketId: number,
    observedAt: number,
  ): ChatSocketEvent | null {
    const id = envelope.id
    if (
      typeof id !== 'number' ||
      !Number.isSafeInteger(id) ||
      id <= 0 ||
      id > 0xffff_ffff
    ) {
      return null
    }

    let pending = this.#pending.get(socketId)
    if (pending) {
      for (const [requestId, request] of pending) {
        if (observedAt - request.sentAt > SAMPLE_TIMEOUT_MS)
          pending.delete(requestId)
      }
    }

    if (direction === 'outgoing') {
      const method = REQUEST_TYPES.find((candidate) =>
        isRecord(envelope[candidate]),
      )
      if (!method) return null
      pending ??= new Map()
      if (pending.size >= MAX_PENDING_REQUESTS) {
        const oldestId = pending.keys().next().value
        if (oldestId !== undefined) pending.delete(oldestId)
      }
      pending.set(id, { method, sentAt: observedAt })
      this.#pending.set(socketId, pending)
      return null
    }

    const request = pending?.get(id)
    if (
      !request ||
      (!isRecord(envelope[request.method]) && !isRecord(envelope.error))
    ) {
      return null
    }
    pending?.delete(id)
    const rttMs = observedAt - request.sentAt
    if (!Number.isFinite(rttMs) || rttMs < 0) return null
    return { observedAt, socketId, rttMs, type: 'rttSample' }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
