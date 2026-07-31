import { type PusherEvent } from './types.ts'

export type SocketRttSample = Readonly<{
  rttMs: number
  socketId: number
}>

export class SocketRttTracker {
  readonly #pending = new Map<number, number>()

  accept(event: PusherEvent): SocketRttSample | null {
    if (event.type === 'socketClosed') {
      this.#pending.delete(event.socketId)
      return null
    }

    if (
      event.type === 'ping' &&
      event.direction === 'outgoing'
    ) {
      if (!this.#pending.has(event.socketId)) {
        this.#pending.set(event.socketId, event.observedAt)
      }

      return null
    }

    if (event.type !== 'pong' || event.direction !== 'incoming') {
      return null
    }

    const pendingAt = this.#pending.get(event.socketId)

    if (pendingAt === undefined) {
      return null
    }

    this.#pending.delete(event.socketId)

    const rttMs = event.observedAt - pendingAt

    return Number.isFinite(rttMs) && rttMs >= 0
      ? {
          rttMs,
          socketId: event.socketId,
        }
      : null
  }

  canStart(socketId: number, now: number, timeoutMs: number) {
    const pendingAt = this.#pending.get(socketId)

    if (pendingAt === undefined) {
      return true
    }

    if (now - pendingAt <= timeoutMs) {
      return false
    }

    this.#pending.delete(socketId)
    return true
  }
}
