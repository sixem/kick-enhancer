import { unsafeWindow } from '$'

import { onDocumentElementReady } from '../../dom/onDocumentElementReady'
import { type Dispose } from '../../lifecycle'
import { createLogger } from '../../logging/logger'
import {
  getSettings,
  subscribeSettings,
} from '../../settings/settings'
import { applyStyleToggle } from '../styleToggle'
import { ViewerCountAcquisition } from './acquisition'
import { installViewerCountCaptureBridge } from './capture'
import { recordViewerEndpointObservation } from './diagnostics'
import { classifyViewerCountEndpoint } from './endpoints'
import { normalizeViewerCountPayload } from './normalize'
import {
  cleanupViewerCountDom,
  renderViewerCounts,
  type SidebarHoverTarget,
} from './render'
import { SIDEBAR_LINK_SELECTOR } from './render/selectors'
import { getChannelSlugFromHref } from './slug'
import { ViewerCountStore } from './store'
import {
  isCapturedViewerCountMessage,
  type CapturedViewerCountMessage,
} from './types'
import styles from './viewerCounts.scss?inline'

const STYLE_ID = 'kick-enhancer-viewer-count-styles'
const RENDER_DELAY_MS = 150
const UPTIME_REFRESH_INTERVAL_MS = 60 * 1000

const log = createLogger('viewer-counts')
const store = new ViewerCountStore()
const acquisition = new ViewerCountAcquisition({
  onData: () => scheduleRender('network'),
  store,
})

let captureInitialized = false
let domFeatureActive = false
let cancelDomReady: (() => void) | undefined
let featureEnabled = false
let historyPushState: History['pushState'] | undefined
let historyReplaceState: History['replaceState'] | undefined
let historyPushStateWrapper: History['pushState'] | undefined
let historyReplaceStateWrapper: History['replaceState'] | undefined
let lastLogSummary = ''
let lastUrl = window.location.href
let observer: MutationObserver | undefined
let renderDeadline = Number.POSITIVE_INFINITY
let renderReason = ''
let renderTimer: number | undefined
let sidebarHoverTarget: SidebarHoverTarget | undefined
let streamUptimeEnabled = false
let stopActiveFeature: Dispose | undefined
let stopWatchingSettings: Dispose | undefined
let uptimeRefreshTimer: number | undefined

export function initializeViewerCountCapture() {
  if (captureInitialized) {
    return
  }

  captureInitialized = true
  window.addEventListener('message', handleCaptureMessage)
  installViewerCountCaptureBridge()
}

export function startViewerEnhancements(): Dispose {
  stopActiveFeature?.()
  const settings = getSettings()
  setFeaturesEnabled(
    settings.ui.showHiddenViewerCounts,
    settings.ui.showStreamUptime,
  )

  stopWatchingSettings = subscribeSettings((settings) => {
    setFeaturesEnabled(
      settings.ui.showHiddenViewerCounts,
      settings.ui.showStreamUptime,
    )
  })
  let stopped = false
  const stop = () => {
    if (stopped) {
      return
    }

    stopped = true
    stopWatchingSettings?.()
    stopWatchingSettings = undefined
    featureEnabled = false
    streamUptimeEnabled = false
    cancelFeatureActivation()
    deactivateFeatureDom()

    if (stopActiveFeature === stop) {
      stopActiveFeature = undefined
    }
  }

  stopActiveFeature = stop
  return stop
}

function setFeaturesEnabled(
  showHiddenViewerCounts: boolean,
  showStreamUptime: boolean,
) {
  const wasEnabled = featureEnabled
  featureEnabled = showHiddenViewerCounts || showStreamUptime
  streamUptimeEnabled = showStreamUptime

  if (featureEnabled) {
    if (!wasEnabled) {
      requestFeatureActivation()
      return
    }

    syncUptimeRefreshTimer()
    scheduleRender('settings', 0)
    return
  }

  if (wasEnabled) {
    cancelFeatureActivation()
    deactivateFeatureDom()
    log.info('Disabled')
  }
}

function requestFeatureActivation() {
  if (document.documentElement) {
    activateFeatureDom()
    return
  }

  if (cancelDomReady) {
    return
  }

  cancelDomReady = onDocumentElementReady(() => {
    cancelDomReady = undefined
    activateFeatureDom()
  })
}

function cancelFeatureActivation() {
  cancelDomReady?.()
  cancelDomReady = undefined
}

function activateFeatureDom() {
  if (
    !featureEnabled ||
    domFeatureActive ||
    !document.documentElement
  ) {
    return
  }

  cancelFeatureActivation()
  domFeatureActive = true
  lastUrl = window.location.href
  applyStyleToggle(STYLE_ID, styles, true)
  acquisition.start()
  installDomObserver()
  installRouteObserver()
  document.addEventListener('pointerover', handleSidebarHover, true)
  document.addEventListener('pointerout', handleSidebarHoverEnd, true)
  document.addEventListener('focusin', handleSidebarHover, true)
  document.addEventListener('focusout', handleSidebarHoverEnd, true)
  syncUptimeRefreshTimer()
  scheduleRender('enabled', 0)
  log.info('Enabled')
}

function deactivateFeatureDom() {
  if (!domFeatureActive) {
    sidebarHoverTarget = undefined
    cleanupViewerCountDom()
    applyStyleToggle(STYLE_ID, styles, false)
    return
  }

  domFeatureActive = false
  acquisition.stop()
  observer?.disconnect()
  observer = undefined
  uninstallRouteObserver()
  document.removeEventListener(
    'pointerover',
    handleSidebarHover,
    true,
  )
  document.removeEventListener(
    'pointerout',
    handleSidebarHoverEnd,
    true,
  )
  document.removeEventListener('focusin', handleSidebarHover, true)
  document.removeEventListener(
    'focusout',
    handleSidebarHoverEnd,
    true,
  )

  if (renderTimer !== undefined) {
    window.clearTimeout(renderTimer)
    renderTimer = undefined
    renderDeadline = Number.POSITIVE_INFINITY
    renderReason = ''
  }

  clearUptimeRefreshTimer()

  sidebarHoverTarget = undefined
  cleanupViewerCountDom()
  applyStyleToggle(STYLE_ID, styles, false)
}

function syncUptimeRefreshTimer() {
  if (!domFeatureActive || !streamUptimeEnabled) {
    clearUptimeRefreshTimer()
    return
  }

  if (uptimeRefreshTimer !== undefined) {
    return
  }

  uptimeRefreshTimer = window.setInterval(() => {
    if (!document.hidden) {
      scheduleRender('uptime', 0)
    }
  }, UPTIME_REFRESH_INTERVAL_MS)
}

function clearUptimeRefreshTimer() {
  if (uptimeRefreshTimer === undefined) {
    return
  }

  window.clearInterval(uptimeRefreshTimer)
  uptimeRefreshTimer = undefined
}

function handleCaptureMessage(event: MessageEvent<unknown>) {
  if (
    (event.source !== window && event.source !== unsafeWindow) ||
    event.origin !== window.location.origin ||
    !isCapturedViewerCountMessage(event.data)
  ) {
    return
  }

  const message: CapturedViewerCountMessage = event.data
  const classifiedEndpoint = classifyViewerCountEndpoint(
    message.url,
    window.location.href,
  )

  if (
    classifiedEndpoint !== message.endpoint ||
    Math.abs(Date.now() - message.timestamp) > 60 * 1000
  ) {
    return
  }

  const normalized = normalizeViewerCountPayload(
    message.endpoint,
    message.payload,
    message.timestamp,
  )
  recordViewerEndpointObservation(
    message.endpoint,
    normalized,
    message.timestamp,
    'captured',
  )
  const streamCount =
    normalized.kind === 'streams' ? normalized.streams.length : 0
  const hiddenStreamCount =
    normalized.kind === 'streams'
      ? normalized.streams.filter(
          (stream) => !stream.showViewCount,
        ).length
      : 0
  const updated =
    normalized.kind === 'streams'
      ? store.upsertStreams(normalized.streams)
      : store.upsertCurrentViewers(normalized.currentViewers)

  if (
    message.endpoint ===
      'PAGINATED_RECOMMENDED_LIVESTREAMS' &&
    featureEnabled &&
    hiddenStreamCount > 0
  ) {
    log.info('Hidden data captured', {
      hiddenStreams: hiddenStreamCount,
      streams: streamCount,
      updated,
    })
  }

  if (updated === 0) {
    return
  }

  if (message.endpoint !== 'CURRENT_VIEWERS') {
    log.debug('Data captured', {
      endpoint: message.endpoint,
      updated,
    })
  }

  if (featureEnabled) {
    scheduleRender('capture')
  }
}

function installDomObserver() {
  if (observer || !document.documentElement) {
    return
  }

  observer = new MutationObserver((mutations) => {
    if (window.location.href !== lastUrl) {
      handleRouteChange()
    }

    if (mutations.some((mutation) => !isIgnoredMutation(mutation))) {
      scheduleRender('mutation')
    }
  })

  observer.observe(document.documentElement, {
    attributeFilter: ['data-sidebar', 'data-testid', 'href'],
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  })
}

function scheduleRender(reason: string, delay = RENDER_DELAY_MS) {
  if (!featureEnabled || !domFeatureActive) {
    return
  }

  const deadline = performance.now() + Math.max(0, delay)

  // Keep the earliest deadline so route and hover renders can preempt the
  // normal mutation debounce.
  if (
    renderTimer !== undefined &&
    deadline >= renderDeadline
  ) {
    return
  }

  if (renderTimer !== undefined) {
    window.clearTimeout(renderTimer)
  }

  renderDeadline = deadline
  renderReason = reason
  renderTimer = window.setTimeout(() => {
    const scheduledReason = renderReason
    renderTimer = undefined
    renderDeadline = Number.POSITIVE_INFINITY
    renderReason = ''
    runRender(scheduledReason)
  }, Math.max(0, deadline - performance.now()))
}

function runRender(reason: string) {
  if (!featureEnabled) {
    return
  }

  const result = renderViewerCounts(
    store,
    sidebarHoverTarget,
    getSettings().ui,
  )

  acquisition.syncTargets(
    result.targetSlugs,
    result.activeChannelSlug,
  )

  const summary = JSON.stringify(result.counts)

  if (summary !== lastLogSummary) {
    lastLogSummary = summary
    const details = {
      reason,
      ...result.counts,
      targets: result.targetSlugs.size,
    }
    const rendered =
      result.counts.cardUptimes +
      result.counts.cards +
      result.counts.channel +
      result.counts.sidebar +
      result.counts.sidebarUptimes +
      result.counts.tooltipUptimes +
      result.counts.tooltips

    if (rendered > 0) {
      log.info('Rendered', details)
    } else {
      log.debug('Surfaces updated', details)
    }
  }
}

function handleSidebarHover(event: Event) {
  if (!(event.target instanceof Element)) {
    return
  }

  const link = event.target.closest<HTMLAnchorElement>(
    SIDEBAR_LINK_SELECTOR,
  )
  const slug = getChannelSlugFromHref(link?.getAttribute('href'))

  if (!link || !slug) {
    return
  }

  const displayName =
    link.querySelector<HTMLImageElement>('img[alt]')?.alt.trim() ||
    findSidebarDisplayName(link)

  if (!displayName) {
    return
  }

  sidebarHoverTarget = {
    displayName,
    slug,
  }
  scheduleRender('sidebar-hover', 0)
}

function handleSidebarHoverEnd(event: Event) {
  if (!(event.target instanceof Element)) {
    return
  }

  const link = event.target.closest<HTMLAnchorElement>(
    SIDEBAR_LINK_SELECTOR,
  )
  const slug = getChannelSlugFromHref(link?.getAttribute('href'))

  if (!link || !slug || sidebarHoverTarget?.slug !== slug) {
    return
  }

  const relatedTarget = (event as FocusEvent).relatedTarget

  if (
    relatedTarget instanceof Node &&
    link.contains(relatedTarget)
  ) {
    return
  }

  sidebarHoverTarget = undefined
  scheduleRender('sidebar-hover-end', 0)
}

function findSidebarDisplayName(link: HTMLAnchorElement) {
  for (const element of link.querySelectorAll('span')) {
    const text = element.textContent?.trim()

    if (
      text &&
      text.toLowerCase() !== 'live' &&
      !/^\d+(?:\.\d+)?[km]?$/i.test(text)
    ) {
      return text
    }
  }

  return undefined
}

function installRouteObserver() {
  if (historyPushStateWrapper || historyReplaceStateWrapper) {
    return
  }

  historyPushState = window.history.pushState
  historyReplaceState = window.history.replaceState

  historyPushStateWrapper = function (
    this: History,
    ...argumentsList: Parameters<History['pushState']>
  ) {
    Reflect.apply(
      historyPushState as History['pushState'],
      this,
      argumentsList,
    )
    handleRouteChange()
  }

  historyReplaceStateWrapper = function (
    this: History,
    ...argumentsList: Parameters<History['replaceState']>
  ) {
    Reflect.apply(
      historyReplaceState as History['replaceState'],
      this,
      argumentsList,
    )
    handleRouteChange()
  }

  window.history.pushState = historyPushStateWrapper
  window.history.replaceState = historyReplaceStateWrapper
  window.addEventListener('popstate', handleRouteChange)
}

function uninstallRouteObserver() {
  window.removeEventListener('popstate', handleRouteChange)

  if (
    historyPushState &&
    window.history.pushState === historyPushStateWrapper
  ) {
    window.history.pushState = historyPushState
  }

  if (
    historyReplaceState &&
    window.history.replaceState === historyReplaceStateWrapper
  ) {
    window.history.replaceState = historyReplaceState
  }

  historyPushState = undefined
  historyReplaceState = undefined
  historyPushStateWrapper = undefined
  historyReplaceStateWrapper = undefined
}

function handleRouteChange() {
  if (window.location.href === lastUrl) {
    return
  }

  lastUrl = window.location.href
  sidebarHoverTarget = undefined
  acquisition.beginRoute()
  scheduleRender('route', 0)
  log.debug('Route changed', {
    pathname: window.location.pathname,
  })
}

function isIgnoredMutation(mutation: MutationRecord) {
  const target =
    mutation.target instanceof Element
      ? mutation.target
      : mutation.target.parentElement

  if (
    target?.closest(
      '#chatroom-messages, #channel-chatroom, ' +
        '[data-ke-viewer-count], [data-ke-stream-uptime]',
    )
  ) {
    return true
  }

  const changedNodes = [
    ...mutation.addedNodes,
    ...mutation.removedNodes,
  ]

  return (
    changedNodes.length > 0 &&
    changedNodes.every(
      (node) =>
        node instanceof Element &&
        (node.matches(
          '[data-ke-viewer-count], [data-ke-stream-uptime]',
        ) ||
          Boolean(
            node.closest(
              '[data-ke-viewer-count], [data-ke-stream-uptime]',
            ),
          )),
    )
  )
}
