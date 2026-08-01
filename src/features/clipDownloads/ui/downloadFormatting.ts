import { estimateDownloadTransfer } from './downloadProgress.ts'
import type { DownloadJobSnapshot } from '../manager/downloadManager.ts'

export function formatStatus(job: DownloadJobSnapshot) {
  const labels: Record<DownloadJobSnapshot['status'], string> = {
    active: formatPhase(job.phase),
    'awaiting-destination': 'Choose file',
    cancelled: 'Cancelled',
    'choosing-destination': 'Choosing file',
    completed: 'Completed',
    failed: 'Failed',
    inspecting: 'Inspecting',
    queued: job.queuePosition ? `Queued ${job.queuePosition}` : 'Queued',
    ready: 'Ready',
  }

  return labels[job.status]
}

export function formatPhase(phase: DownloadJobSnapshot['phase']) {
  const labels = {
    fetching: 'Downloading',
    inspecting: 'Inspecting',
    transmuxing: 'Converting to MP4',
    writing: 'Writing MP4',
  }

  return phase ? labels[phase] : 'Working'
}

export function formatFetchingStatus(job: DownloadJobSnapshot, now: number) {
  const segmentCount = job.media?.logicalSegmentCount
  const label =
    segmentCount && segmentCount > 1
      ? `Segment ${Math.min(
          segmentCount,
          job.completedSegments + 1,
        )}/${segmentCount}`
      : 'Downloading'
  const estimate = estimateDownloadTransfer(
    job.fetchedBytes,
    job.media?.sourceBytes,
    job.startedAt,
    now,
  )

  if (!estimate) {
    return label
  }

  const remaining =
    estimate.remainingSeconds === undefined
      ? ''
      : ` - ${formatRemainingTime(estimate.remainingSeconds)} remaining`

  return `${label}: ${formatBytes(estimate.bytesPerSecond)}/s${remaining}`
}

export function formatRemainingTime(duration: number) {
  const seconds = Math.max(1, Math.ceil(duration))
  const hours = Math.floor(seconds / 3_600)
  const minutes = Math.floor((seconds % 3_600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }

  return `${remainingSeconds}s`
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  const units = ['KiB', 'MiB', 'GiB']
  let value = bytes / 1024
  let unit = units[0]

  for (let index = 1; index < units.length && value >= 1024; index += 1) {
    value /= 1024
    unit = units[index]
  }

  return `${value.toFixed(value >= 100 ? 0 : 1)} ${unit}`
}

export function formatDuration(duration: number | undefined) {
  if (!duration) {
    return 'Unknown'
  }

  const seconds = Math.round(duration)
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}
