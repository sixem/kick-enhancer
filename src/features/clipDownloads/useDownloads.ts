import { useEffect, useState } from 'preact/hooks'

import {
  downloadManager,
  type DownloadActivitySummary,
  type DownloadSnapshot,
} from './downloadManager'
import {
  getDownloadCenterSnapshot,
  subscribeDownloadCenter,
  type DownloadCenterSnapshot,
} from './downloadCenterController'

export function useDownloads() {
  const [snapshot, setSnapshot] = useState<DownloadSnapshot>(
    downloadManager.getSnapshot,
  )

  useEffect(
    () =>
      downloadManager.subscribe(() => {
        setSnapshot(downloadManager.getSnapshot())
      }),
    [],
  )

  return snapshot
}

export function useDownloadActivity() {
  const [summary, setSummary] = useState<DownloadActivitySummary>(
    downloadManager.getActivitySummary,
  )

  useEffect(
    () =>
      downloadManager.subscribe(() => {
        const next = downloadManager.getActivitySummary()
        setSummary((current) =>
          activityEquals(current, next) ? current : next,
        )
      }),
    [],
  )

  return summary
}

export function useDownloadCenter() {
  const [snapshot, setSnapshot] = useState<DownloadCenterSnapshot>(
    getDownloadCenterSnapshot,
  )

  useEffect(
    () =>
      subscribeDownloadCenter(() => {
        setSnapshot(getDownloadCenterSnapshot())
      }),
    [],
  )

  return snapshot
}

function activityEquals(
  left: DownloadActivitySummary,
  right: DownloadActivitySummary,
) {
  return (
    left.activeCount === right.activeCount &&
    left.attention === right.attention &&
    left.error === right.error &&
    left.queuedCount === right.queuedCount &&
    left.visible === right.visible
  )
}
