import { useEffect, useState } from 'preact/hooks'

import { downloadManager } from './downloadManager'
import {
  getDownloadCenterSnapshot,
  subscribeDownloadCenter,
} from './downloadCenterController'

const subscribeDownloads = (listener: () => void) =>
  downloadManager.subscribe(listener)
const getDownloadsSnapshot = () => downloadManager.getSnapshot()
const getDownloadActivity = () => downloadManager.getActivitySummary()

export function useDownloads() {
  return useStoreSnapshot(subscribeDownloads, getDownloadsSnapshot)
}

export function useDownloadActivity() {
  return useStoreSnapshot(subscribeDownloads, getDownloadActivity)
}

export function useDownloadCenter() {
  return useStoreSnapshot(subscribeDownloadCenter, getDownloadCenterSnapshot)
}

function useStoreSnapshot<Snapshot>(
  subscribe: (listener: () => void) => () => void,
  getSnapshot: () => Snapshot,
) {
  const [snapshot, setSnapshot] = useState(getSnapshot)

  useEffect(() => {
    const updateSnapshot = () => {
      setSnapshot(getSnapshot())
    }
    const unsubscribe = subscribe(updateSnapshot)

    // Close the render-to-subscription gap without pulling the React
    // compatibility layer further into the document-start path.
    updateSnapshot()
    return unsubscribe
  }, [getSnapshot, subscribe])

  return snapshot
}
