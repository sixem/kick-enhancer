import { downloadManager } from '../manager/downloadManager'

export type DownloadCenterSnapshot = Readonly<{
  focusedJobId?: string
  open: boolean
}>

const listeners = new Set<() => void>()
let snapshot: DownloadCenterSnapshot = {
  open: false,
}

function publish(update: DownloadCenterSnapshot) {
  snapshot = update

  for (const listener of listeners) {
    listener()
  }
}

export function openDownloadCenterForClip(
  clipId: string,
  pageUrl = window.location.href,
) {
  const jobId = downloadManager.inspectClip(clipId, pageUrl)
  openDownloadCenter(jobId)
  return jobId
}

export function openDownloadCenter(focusedJobId?: string) {
  downloadManager.acknowledgeAttention()
  publish({
    focusedJobId: focusedJobId ?? snapshot.focusedJobId,
    open: true,
  })
}

export function focusDownloadJob(focusedJobId: string) {
  publish({
    focusedJobId,
    open: snapshot.open,
  })
}

export function minimizeDownloadCenter() {
  publish({
    ...snapshot,
    open: false,
  })
}

export function getDownloadCenterSnapshot() {
  return snapshot
}

export function subscribeDownloadCenter(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}
