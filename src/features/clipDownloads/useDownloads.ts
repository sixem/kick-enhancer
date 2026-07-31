import { useEffect, useState } from 'preact/hooks'

import { downloadManager } from './downloadManager'
import {
  getDownloadCenterSnapshot,
  subscribeDownloadCenter,
} from './downloadCenterController'

export function useDownloads() {
  return useStoreSnapshot(
    downloadManager.subscribe,
    downloadManager.getSnapshot,
  )
}

export function useDownloadActivity() {
  return useStoreSnapshot(
    downloadManager.subscribe,
    downloadManager.getActivitySummary,
  )
}

export function useDownloadCenter() {
  return useStoreSnapshot(
    subscribeDownloadCenter,
    getDownloadCenterSnapshot,
  )
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
