import { unsafeWindow } from '$'

import { onDocumentElementReady } from '../../dom/onDocumentElementReady'
import { type Dispose } from '../../lifecycle'
import { observeSetting } from '../../settings/settings'
import styles from './gamblingStreams.scss?inline'
import { applyStyleToggle } from '../shared/styleToggle'
import {
  FollowedGamblingChannels,
  reconcileGamblingSidebarRows,
} from './followedChannels'
import { handleFollowedChannelsCapture } from './followedChannelsCapture'

const STYLE_ID = 'kick-enhancer-hide-gambling-streams'
const GAMBLING_SURFACE_SELECTOR = [
  '[data-testid="followed-livestreams"]',
  '#sidebar-wrapper',
].join(', ')
const CHATROOM_MESSAGES_SELECTOR = '#chatroom-messages'

let gamblingStreamsHidden = false
let featureActive = false
let captureInitialized = false
let sidebarScanFrame: number | undefined
let stopActiveFeature: Dispose | undefined
const followedGamblingChannels = new FollowedGamblingChannels()

function applyGamblingStreamsVisibility(hidden: boolean) {
  applyStyleToggle(STYLE_ID, styles, hidden)
}

function updateSidebarRows() {
  sidebarScanFrame = undefined
  reconcileGamblingSidebarRows(
    document,
    gamblingStreamsHidden,
    followedGamblingChannels,
  )
}

function scheduleSidebarScan() {
  if (
    !featureActive ||
    !gamblingStreamsHidden ||
    sidebarScanFrame !== undefined
  ) {
    return
  }

  sidebarScanFrame = window.requestAnimationFrame(updateSidebarRows)
}

function mutationsTouchGamblingSurfaces(records: readonly MutationRecord[]) {
  for (const record of records) {
    const target =
      record.target instanceof Element
        ? record.target
        : record.target.parentElement

    if (target?.closest(CHATROOM_MESSAGES_SELECTOR)) {
      continue
    }

    if (target?.closest(GAMBLING_SURFACE_SELECTOR)) {
      return true
    }

    for (const node of record.addedNodes) {
      if (
        node instanceof Element &&
        (node.matches(GAMBLING_SURFACE_SELECTOR) ||
          node.querySelector(GAMBLING_SURFACE_SELECTOR))
      ) {
        return true
      }
    }

    for (const node of record.removedNodes) {
      if (
        node instanceof Element &&
        (node.matches(GAMBLING_SURFACE_SELECTOR) ||
          node.querySelector(GAMBLING_SURFACE_SELECTOR))
      ) {
        return true
      }
    }
  }

  return false
}

export function startGamblingStreamsVisibility(): Dispose {
  initializeGamblingStreamsCapture()
  stopActiveFeature?.()
  featureActive = true
  let cancelDocumentReady: Dispose | undefined

  const observer = new MutationObserver((records) => {
    if (gamblingStreamsHidden && mutationsTouchGamblingSurfaces(records)) {
      scheduleSidebarScan()
    }
  })

  function cancelSidebarScan() {
    if (sidebarScanFrame === undefined) {
      return
    }

    window.cancelAnimationFrame(sidebarScanFrame)
    sidebarScanFrame = undefined
  }

  function activateVisibility() {
    if (!gamblingStreamsHidden || !document.documentElement) {
      return
    }

    applyGamblingStreamsVisibility(true)
    observer.observe(document.documentElement, {
      attributeFilter: ['data-testid', 'href'],
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    })
    scheduleSidebarScan()
  }

  function requestVisibilityActivation() {
    if (document.documentElement) {
      activateVisibility()
      return
    }

    if (cancelDocumentReady) {
      return
    }

    cancelDocumentReady = onDocumentElementReady(() => {
      cancelDocumentReady = undefined
      activateVisibility()
    })
  }

  function cancelVisibilityActivation() {
    cancelDocumentReady?.()
    cancelDocumentReady = undefined
  }

  function setVisibility(hidden: boolean) {
    if (gamblingStreamsHidden === hidden) {
      return
    }

    gamblingStreamsHidden = hidden

    if (hidden) {
      requestVisibilityActivation()
      return
    }

    cancelVisibilityActivation()
    observer.disconnect()
    cancelSidebarScan()
    applyGamblingStreamsVisibility(false)
    updateSidebarRows()
  }

  const stopObserving = observeSetting(
    (settings) => settings.ui.hideGamblingStreams,
    setVisibility,
  )
  let stopped = false
  const stop = () => {
    if (stopped) {
      return
    }

    stopped = true
    featureActive = false
    cancelVisibilityActivation()
    observer.disconnect()
    stopObserving()
    cancelSidebarScan()
    gamblingStreamsHidden = false
    applyGamblingStreamsVisibility(false)
    updateSidebarRows()

    if (stopActiveFeature === stop) {
      stopActiveFeature = undefined
    }
  }

  stopActiveFeature = stop
  return stop
}

export function initializeGamblingStreamsCapture() {
  if (captureInitialized) {
    return
  }

  captureInitialized = true
  window.addEventListener('message', (event) => {
    handleFollowedChannelsCapture(
      event,
      {
        currentHref: window.location.href,
        currentOrigin: window.location.origin,
        messageWindow: window,
        pageWindow: unsafeWindow,
      },
      followedGamblingChannels,
      scheduleSidebarScan,
    )
  })
}
