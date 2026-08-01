import { render } from 'preact'

import { type Dispose } from '../../lifecycle'
import { observeSetting } from '../../settings/settings'
import { ChatStatisticsCard, ChatStatisticsTrigger } from './ChatStatisticsView'
import { getChatStatisticsRuntime } from './runtime.ts'
import styles from './chatStatistics.scss?inline'
import { findChatStatisticsAnchors, type ChatStatisticsAnchors } from './dom'

const NATIVE_TITLE_ATTRIBUTE = 'data-ke-native-chat-title'
const PANEL_HOST_ID = 'kick-enhancer-chat-statistics-panel'
const STYLE_ID = 'kick-enhancer-chat-statistics-styles'
const TITLE_HOST_ID = 'kick-enhancer-chat-statistics-title'

let stopActiveFeature: Dispose | undefined

export function startChatStatistics(): Dispose {
  stopActiveFeature?.()

  const runtime = getChatStatisticsRuntime()
  let stopUi: Dispose | undefined
  const stopObserving = observeSetting(
    (settings) => settings.chat.showChatStatistics,
    (enabled) => {
      stopUi?.()
      stopUi = undefined
      runtime.setCollectionEnabled(enabled)
      stopUi = enabled ? startStatisticsUi() : undefined
    },
  )

  let stopped = false
  const stop = () => {
    if (stopped) {
      return
    }

    stopped = true
    stopObserving()
    stopUi?.()
    stopUi = undefined
    runtime.setCollectionEnabled(false)

    if (stopActiveFeature === stop) {
      stopActiveFeature = undefined
    }
  }

  stopActiveFeature = stop
  return stop
}

function startStatisticsUi(): Dispose {
  installStyles()

  const runtime = getChatStatisticsRuntime()
  let anchors: ChatStatisticsAnchors | null = null
  let panelHost: HTMLElement | null = null
  let panelOpen = false
  let rttTimer: ReturnType<typeof setInterval> | undefined
  let rttChatroomId: string | null = null
  let snapshot = runtime.getSnapshot()
  let titleHost: HTMLElement | null = null
  let reconcileScheduled = false
  let stopped = false

  const renderTrigger = () => {
    if (!titleHost) {
      return
    }

    render(
      <ChatStatisticsTrigger
        expanded={panelOpen && Boolean(panelHost)}
        onToggle={togglePanel}
        snapshot={snapshot}
      />,
      titleHost,
    )
  }

  const removePanel = () => {
    if (!panelHost) {
      return
    }

    render(null, panelHost)
    panelHost.remove()
    panelHost = null
  }

  const reconcilePanel = () => {
    if (!panelOpen || !anchors?.eventStack?.isConnected) {
      removePanel()
      return
    }

    if (
      !panelHost ||
      !panelHost.isConnected ||
      panelHost.parentElement !== anchors.eventStack
    ) {
      removePanel()
      panelHost = document.createElement('div')
      panelHost.id = PANEL_HOST_ID
      anchors.eventStack.append(panelHost)
    }

    render(
      <ChatStatisticsCard onClose={closePanel} snapshot={snapshot} />,
      panelHost,
    )
  }

  const removeTitle = () => {
    if (titleHost) {
      render(null, titleHost)
      titleHost.remove()
      titleHost = null
    }

    anchors?.title.removeAttribute(NATIVE_TITLE_ATTRIBUTE)
  }

  const reconcile = () => {
    reconcileScheduled = false

    if (stopped) {
      return
    }

    const nextAnchors = findChatStatisticsAnchors()

    if (nextAnchors?.title !== anchors?.title) {
      removeTitle()
      anchors = nextAnchors

      if (anchors) {
        anchors.title.setAttribute(NATIVE_TITLE_ATTRIBUTE, '')
        titleHost = document.createElement('span')
        titleHost.id = TITLE_HOST_ID
        anchors.title.after(titleHost)
      }
    } else {
      anchors = nextAnchors
    }

    reconcilePanel()
    renderTrigger()
  }

  const scheduleReconcile = () => {
    if (stopped || reconcileScheduled) {
      return
    }

    reconcileScheduled = true
    queueMicrotask(reconcile)
  }

  const updateRttSampling = () => {
    if (rttTimer) {
      clearInterval(rttTimer)
      rttTimer = undefined
    }

    if (!panelOpen || snapshot.status !== 'active') {
      rttChatroomId = null
      return
    }

    if (rttChatroomId !== snapshot.chatroomId) {
      rttChatroomId = snapshot.chatroomId
      runtime.requestSocketRttSample()
    }

    rttTimer = setInterval(() => {
      runtime.requestSocketRttSample()
    }, 60_000)
  }

  function togglePanel() {
    panelOpen = !panelOpen
    updateRttSampling()
    reconcilePanel()
    renderTrigger()
  }

  function closePanel() {
    panelOpen = false
    updateRttSampling()
    removePanel()
    renderTrigger()
  }

  const applySnapshot = (
    nextSnapshot: ReturnType<typeof runtime.getSnapshot>,
  ) => {
    const previousChatroomId =
      snapshot.status === 'active' ? snapshot.chatroomId : null
    const nextChatroomId =
      nextSnapshot.status === 'active' ? nextSnapshot.chatroomId : null

    snapshot = nextSnapshot

    if (panelOpen && previousChatroomId !== nextChatroomId) {
      rttChatroomId = null
      updateRttSampling()
    }

    renderTrigger()
    reconcilePanel()
  }

  const stopSnapshots = runtime.subscribe(applySnapshot)

  const observer = new MutationObserver((mutations) => {
    if (
      anchors?.title.isConnected &&
      titleHost?.isConnected &&
      (!panelOpen || panelHost?.isConnected)
    ) {
      return
    }

    const relevant = mutations.some((mutation) => {
      const target =
        mutation.target instanceof Element
          ? mutation.target
          : mutation.target.parentElement

      return !target?.closest('#chatroom-messages')
    })

    if (relevant) {
      scheduleReconcile()
    }
  })

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
  reconcile()

  return () => {
    if (stopped) {
      return
    }

    stopped = true
    observer.disconnect()
    stopSnapshots()
    panelOpen = false
    updateRttSampling()
    removePanel()
    removeTitle()
    anchors = null
    document.getElementById(STYLE_ID)?.remove()
  }
}

function installStyles() {
  if (document.getElementById(STYLE_ID)) {
    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = styles
  document.documentElement.append(style)
}
