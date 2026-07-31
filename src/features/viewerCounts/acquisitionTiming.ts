export type ViewerCountAcquisitionTiming = Readonly<{
  cancelInterval: (handle: number) => void
  cancelTimeout: (handle: number) => void
  now: () => number
  scheduleInterval: (callback: () => void, delay: number) => number
  scheduleTimeout: (callback: () => void, delay: number) => number
}>

export function createBrowserAcquisitionTiming(): ViewerCountAcquisitionTiming {
  return {
    cancelInterval: (handle) => window.clearInterval(handle),
    cancelTimeout: (handle) => window.clearTimeout(handle),
    now: Date.now,
    scheduleInterval: (callback, delay) =>
      window.setInterval(callback, delay),
    scheduleTimeout: (callback, delay) =>
      window.setTimeout(callback, delay),
  }
}
