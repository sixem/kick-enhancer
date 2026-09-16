import {
  getSettings,
  subscribeSettings,
  updateSettings,
} from '../settings/settings'
import { type Dispose } from '../lifecycle'
import { createLogger } from '../logging/logger'
import { findSidebarLayout, observeSidebarLayout } from './sidebarDom'

const SIDEBAR_BUTTON_SELECTOR = [
  'button[aria-controls="sidebar-wrapper"]',
  'button[aria-label="Collapse sidebar"]',
  'button[aria-label="Expand sidebar"]',
  'button[data-testid="sidebar-collapse"]',
  'button[data-testid="sidebar-expand"]',
].join(', ')

const log = createLogger('sidebar')

let activeLayout: HTMLElement | null = null
let featureActive = false
let rememberSidebarState = false
let restoreRequested = false
let restoreTarget: boolean | undefined
let stopActiveFeature: Dispose | undefined

function getSidebarButton() {
  return document.querySelector<HTMLButtonElement>(SIDEBAR_BUTTON_SELECTOR)
}

function getCollapsedState() {
  const layout = activeLayout?.isConnected ? activeLayout : findSidebarLayout()
  const sidebarVisible = layout?.getAttribute('data-sidebar')

  if (sidebarVisible === 'true') {
    return false
  }

  if (sidebarVisible === 'false') {
    return true
  }

  const expanded = getSidebarButton()?.getAttribute('aria-expanded')

  if (expanded === 'true') {
    return false
  }

  if (expanded === 'false') {
    return true
  }

  return undefined
}

function attemptRestore() {
  if (!featureActive || !restoreRequested || !rememberSidebarState) {
    return
  }

  const collapsed = getCollapsedState()

  if (collapsed === undefined) {
    return
  }

  const rememberedCollapsed = getSettings().ui.sidebarCollapsed

  if (collapsed === rememberedCollapsed) {
    restoreRequested = false
    return
  }

  const button = getSidebarButton()

  if (!button) {
    return
  }

  restoreRequested = false
  restoreTarget = rememberedCollapsed

  log.info('Restoring state', {
    collapsed: rememberedCollapsed,
  })

  button.click()
}

function requestRestore() {
  if (!featureActive || !rememberSidebarState) {
    return
  }

  restoreRequested = true
  restoreTarget = undefined
  queueMicrotask(attemptRestore)
}

function rememberCollapsedState(collapsed: boolean) {
  if (getSettings().ui.sidebarCollapsed === collapsed) {
    return
  }

  log.info('State saved', {
    collapsed,
  })

  void updateSettings((settings) => ({
    ...settings,
    ui: {
      ...settings.ui,
      sidebarCollapsed: collapsed,
    },
  }))
}

export function setRememberSidebarState(enabled: boolean) {
  const collapsed = enabled ? getCollapsedState() : undefined

  log.info(enabled ? 'Memory enabled' : 'Memory disabled')

  return updateSettings((settings) => ({
    ...settings,
    ui: {
      ...settings.ui,
      rememberSidebarState: enabled,
      sidebarCollapsed: collapsed ?? settings.ui.sidebarCollapsed,
    },
  }))
}

export function startSidebarStateMemory(): Dispose {
  stopActiveFeature?.()
  featureActive = true
  rememberSidebarState = getSettings().ui.rememberSidebarState
  let stopLayoutObserver: Dispose | undefined

  function handleStateChange() {
    const collapsed = getCollapsedState()
    if (collapsed === undefined) return

    // Do not persist the mutation caused by our own restoration click as a
    // new user preference.
    if (restoreTarget !== undefined) {
      if (collapsed === restoreTarget) restoreTarget = undefined
      return
    }
    if (restoreRequested) {
      attemptRestore()
      return
    }
    if (rememberSidebarState) rememberCollapsedState(collapsed)
  }

  function connectObserver() {
    if (stopLayoutObserver || !featureActive || !rememberSidebarState) return

    requestRestore()
    stopLayoutObserver = observeSidebarLayout({
      onLayoutChange: (layout) => {
        activeLayout = layout
        requestRestore()
      },
      onStateChange: handleStateChange,
      onContentChange: () => {
        if (restoreRequested) attemptRestore()
      },
    })
  }

  function disconnectObserver() {
    stopLayoutObserver?.()
    stopLayoutObserver = undefined
    activeLayout = null
    restoreRequested = false
    restoreTarget = undefined
  }

  const stopObserving = subscribeSettings((settings) => {
    if (settings.ui.rememberSidebarState === rememberSidebarState) {
      return
    }

    rememberSidebarState = settings.ui.rememberSidebarState

    if (rememberSidebarState) {
      connectObserver()
    } else {
      disconnectObserver()
    }
  })

  if (rememberSidebarState) {
    connectObserver()
  }

  let stopped = false
  const stop = () => {
    if (stopped) {
      return
    }

    stopped = true
    featureActive = false
    disconnectObserver()
    stopObserving()
    rememberSidebarState = false

    if (stopActiveFeature === stop) {
      stopActiveFeature = undefined
    }
  }

  stopActiveFeature = stop
  return stop
}
