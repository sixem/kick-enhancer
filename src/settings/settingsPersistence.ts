type TimerHandle = ReturnType<typeof globalThis.setTimeout>

type PendingBurst = Readonly<{
  promise: Promise<void>
  resolve: () => void
}>

type InFlightWrite = Readonly<{
  promise: Promise<boolean>
  value: string
}>

type SettingsPersistenceOptions = Readonly<{
  cancelTimer?: (handle: TimerHandle) => void
  delayMs?: number
  onError: (error: unknown) => void
  scheduleTimer?: (
    callback: () => void,
    delayMs: number,
  ) => TimerHandle
  write: (value: string) => Promise<void>
}>

const DEFAULT_WRITE_DELAY_MS = 125

export function createSettingsPersistence({
  cancelTimer = globalThis.clearTimeout,
  delayMs = DEFAULT_WRITE_DELAY_MS,
  onError,
  scheduleTimer = globalThis.setTimeout,
  write,
}: SettingsPersistenceOptions) {
  let flushAfterWrite = false
  let inFlight: InFlightWrite | undefined
  let latestValue: string | undefined
  let pendingBurst: PendingBurst | undefined
  let timer: TimerHandle | undefined

  function ensurePendingBurst() {
    if (pendingBurst) {
      return pendingBurst
    }

    let resolve: () => void = () => undefined
    const promise = new Promise<void>((settle) => {
      resolve = settle
    })
    pendingBurst = {
      promise,
      resolve,
    }
    return pendingBurst
  }

  function cancelPendingTimer() {
    if (timer === undefined) {
      return
    }

    cancelTimer(timer)
    timer = undefined
  }

  function settlePendingBurst() {
    if (
      timer !== undefined ||
      inFlight ||
      latestValue !== undefined
    ) {
      return
    }

    const burst = pendingBurst
    pendingBurst = undefined
    burst?.resolve()
  }

  function schedulePendingTimer() {
    cancelPendingTimer()
    timer = scheduleTimer(() => {
      timer = undefined
      startWrite()
    }, Math.max(0, delayMs))
  }

  function completeWrite(
    completedWrite: InFlightWrite,
    succeeded: boolean,
  ) {
    if (inFlight !== completedWrite) {
      return
    }

    inFlight = undefined

    if (succeeded && latestValue === completedWrite.value) {
      latestValue = undefined
    }

    if (latestValue !== undefined) {
      if (flushAfterWrite) {
        flushAfterWrite = false
        startWrite()
      } else {
        schedulePendingTimer()
      }

      return
    }

    flushAfterWrite = false
    settlePendingBurst()
  }

  function startWrite() {
    if (inFlight || latestValue === undefined) {
      settlePendingBurst()
      return
    }

    cancelPendingTimer()
    const value = latestValue
    latestValue = undefined
    const promise = Promise.resolve()
      .then(() => write(value))
      .then(
        () => true,
        (error) => {
          onError(error)
          return false
        },
      )
    const currentWrite = {
      promise,
      value,
    }
    inFlight = currentWrite
    void promise.then((succeeded) => {
      completeWrite(currentWrite, succeeded)
    })
  }

  return {
    flush() {
      cancelPendingTimer()

      if (inFlight) {
        flushAfterWrite = true
      } else {
        startWrite()
      }

      return pendingBurst?.promise ?? Promise.resolve()
    },
    schedule(value: string) {
      latestValue = value
      const burst = ensurePendingBurst()

      if (!inFlight) {
        schedulePendingTimer()
      }

      return burst.promise
    },
    whenIdle() {
      return pendingBurst?.promise ?? Promise.resolve()
    },
  }
}
