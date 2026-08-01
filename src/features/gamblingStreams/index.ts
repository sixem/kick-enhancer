import { type Dispose } from '../../lifecycle'
import { observeSetting } from '../../settings/settings'
import styles from './gamblingStreams.scss?inline'
import { applyStyleToggle } from '../shared/styleToggle'

const STYLE_ID = 'kick-enhancer-hide-gambling-streams'
const SIDEBAR_GAMBLING_ATTRIBUTE = 'data-kick-enhancer-gambling-stream'
const SIDEBAR_FOLLOWING_SELECTOR =
  'a[data-testid^="sidebar-following-channel-"]'
const GAMBLING_SURFACE_SELECTOR = [
  '[data-testid="followed-livestreams"]',
  '#sidebar-wrapper',
].join(', ')
const CHATROOM_MESSAGES_SELECTOR = '#chatroom-messages'

let gamblingStreamsHidden = false
let featureActive = false
let sidebarScanFrame: number | undefined
let stopActiveFeature: Dispose | undefined

function applyGamblingStreamsVisibility(hidden: boolean) {
  applyStyleToggle(STYLE_ID, styles, hidden)
}

function getFollowedGamblingChannelPaths() {
  const paths = new Set<string>()

  for (const card of document.querySelectorAll<HTMLElement>(
    '[data-testid="followed-livestreams"] ' +
      '[data-testid="livestream-results-card"]' +
      ':has(a[href="/category/slots"])',
  )) {
    const channelLink = card.querySelector<HTMLAnchorElement>(
      'a[data-testid="media-card-thumbnail"]',
    )
    const path = channelLink?.getAttribute('href')

    if (path) {
      paths.add(path)
    }
  }

  return paths
}

function isSlotsAndCasinoRow(
  link: HTMLAnchorElement,
  gamblingChannelPaths: ReadonlySet<string>,
) {
  const path = link.getAttribute('href')

  if (path && gamblingChannelPaths.has(path)) {
    return true
  }

  for (const span of link.querySelectorAll('span')) {
    if (span.textContent?.trim() === 'Slots & Casino') {
      return true
    }
  }

  return false
}

function updateSidebarRows() {
  sidebarScanFrame = undefined

  if (!gamblingStreamsHidden) {
    for (const row of document.querySelectorAll(
      `[${SIDEBAR_GAMBLING_ATTRIBUTE}]`,
    )) {
      row.removeAttribute(SIDEBAR_GAMBLING_ATTRIBUTE)
    }

    return
  }

  const gamblingChannelPaths = getFollowedGamblingChannelPaths()

  for (const link of document.querySelectorAll<HTMLAnchorElement>(
    SIDEBAR_FOLLOWING_SELECTOR,
  )) {
    const row = link.closest('button') ?? link
    row.toggleAttribute(
      SIDEBAR_GAMBLING_ATTRIBUTE,
      isSlotsAndCasinoRow(link, gamblingChannelPaths),
    )
  }
}

function scheduleSidebarScan() {
  if (!featureActive || sidebarScanFrame !== undefined) {
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
  stopActiveFeature?.()
  featureActive = true

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

  function setVisibility(hidden: boolean) {
    if (gamblingStreamsHidden === hidden) {
      return
    }

    gamblingStreamsHidden = hidden
    applyGamblingStreamsVisibility(hidden)

    if (hidden) {
      observer.observe(document.documentElement, {
        characterData: true,
        childList: true,
        subtree: true,
      })
      scheduleSidebarScan()
      return
    }

    observer.disconnect()
    cancelSidebarScan()
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
