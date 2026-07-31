import { render } from 'preact'

import { onDocumentElementReady } from '../../dom/onDocumentElementReady'
import { type Dispose } from '../../lifecycle'
import { createLogger } from '../../logging/logger'
import {
  getSettings,
  observeSetting,
} from '../../settings/settings'
import { installSharedUiStyles } from '../../styles/sharedUi'
import { ClipDownloadAction } from './ClipDownloadAction'
import { DirectClipDownloadAction } from './DirectClipDownloadAction'
import { DownloadCenter } from './DownloadCenter'
import { createClipCardReconciler } from './clipCardReconciler'
import {
  CLIP_CARD_SELECTOR,
  CLIP_MODAL_BUTTON_SELECTOR,
  createBatchedCardScheduler,
  getClipIdFromCard,
  getClipIdFromHref,
  type ClipSelectionHandler,
} from './clipCards'
import styles from './clipDownloads.scss?inline'
import centerStyles from './downloadCenter.scss?inline'
import { openDownloadCenterForClip } from './downloadCenterController'

const STYLE_ID = 'kick-enhancer-clip-download-styles'
const CENTER_HOST_ID = 'kick-enhancer-download-center'
const ACTION_SELECTOR = '[data-ke-clip-download]'
const HOST_SELECTOR = '[data-ke-clip-download-host]'
const DIRECT_ACTION_ANCHOR_SELECTOR =
  '[data-testid="follow-button"]'
const DIRECT_HOST_SELECTOR =
  '[data-ke-direct-clip-download-host]'
const CHATROOM_MESSAGES_SELECTOR = '#chatroom-messages'

const log = createLogger('clip-downloads')
let stopActiveIntegration: Dispose | undefined

function defaultSelectClip(clipId: string) {
  log.info('Manager opened', { clipId })
  openDownloadCenterForClip(clipId)
}

function installStyles() {
  installSharedUiStyles()

  if (document.getElementById(STYLE_ID)) {
    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `${styles}\n${centerStyles}`
  document.documentElement.append(style)
}

function mountDownloadCenter() {
  if (document.getElementById(CENTER_HOST_ID) || !document.body) {
    return
  }

  const host = document.createElement('span')
  host.id = CENTER_HOST_ID
  host.className = 'ke-download-center-host'
  document.body.append(host)
  render(<DownloadCenter />, host)
}

export function startClipDownloadActions(
  onSelectClip: ClipSelectionHandler = defaultSelectClip,
): Dispose {
  stopActiveIntegration?.()

  let observer: MutationObserver | undefined
  let actionsVisible = getSettings().ui.showClipDownloadButtons
  let directActionClipId: string | undefined
  let directActionHost: HTMLSpanElement | undefined
  let lastUrl = window.location.href
  let stopWatchingSettings: Dispose | undefined
  let stopped = false

  const reconciler = createClipCardReconciler<
    HTMLElement,
    HTMLElement,
    HTMLSpanElement
  >({
    isCardConnected: (card) => card.isConnected,
    isMountConnected: (host) => host.isConnected,
    mount: ({ card, clipId, container }) => {
      for (const staleAction of card.querySelectorAll(ACTION_SELECTOR)) {
        staleAction.remove()
      }

      for (const staleHost of card.querySelectorAll(HOST_SELECTOR)) {
        staleHost.remove()
      }

      const host = document.createElement('span')
      host.className = 'ke-clip-download-host'
      host.setAttribute('data-ke-clip-download-host', '')
      container.append(host)

      render(
        <ClipDownloadAction
          clipId={clipId}
          onSelectClip={onSelectClip}
        />,
        host,
      )

      return host
    },
    resolve: (card) => {
      const clipId = getClipIdFromCard(
        card,
        window.location.origin,
      )
      const modalButton = card.querySelector<HTMLElement>(
        CLIP_MODAL_BUTTON_SELECTOR,
      )
      const container = modalButton?.parentElement

      return clipId && container
        ? {
            card,
            clipId,
            container,
          }
        : undefined
    },
    unmount: (host) => {
      render(null, host)
      host.remove()
    },
    update: (host, { clipId }) => {
      render(
        <ClipDownloadAction
          clipId={clipId}
          onSelectClip={onSelectClip}
        />,
        host,
      )
    },
  })

  const scheduler = createBatchedCardScheduler<
    HTMLElement | undefined
  >((cards) => {
    if (stopped || !actionsVisible) {
      return
    }

    reconciler.removeDisconnected()

    for (const card of cards) {
      if (card?.isConnected) {
        reconciler.reconcile(card)
      }
    }
  })

  function removeDirectClipAction() {
    if (!directActionHost) {
      return
    }

    render(null, directActionHost)
    directActionHost.remove()
    directActionClipId = undefined
    directActionHost = undefined
  }

  function reconcileDirectClipAction() {
    if (directActionHost && !directActionHost.isConnected) {
      render(null, directActionHost)
      directActionClipId = undefined
      directActionHost = undefined
    }

    const clipId = actionsVisible
      ? getClipIdFromHref(
          window.location.href,
          window.location.origin,
        )
      : undefined
    const anchor = clipId
      ? document.querySelector<HTMLElement>(
          DIRECT_ACTION_ANCHOR_SELECTOR,
        )
      : undefined
    const container = anchor?.parentElement

    if (!clipId || !anchor || !container) {
      removeDirectClipAction()
      return
    }

    if (
      directActionHost &&
      directActionHost.parentElement === container
    ) {
      if (directActionClipId !== clipId) {
        render(
          <DirectClipDownloadAction
            clipId={clipId}
            onSelectClip={onSelectClip}
          />,
          directActionHost,
        )
        directActionClipId = clipId
      }

      return
    }

    removeDirectClipAction()

    for (const staleHost of document.querySelectorAll(
      DIRECT_HOST_SELECTOR,
    )) {
      staleHost.remove()
    }

    const host = document.createElement('span')
    host.className = 'ke-direct-clip-download-host'
    host.setAttribute('data-ke-direct-clip-download-host', '')
    anchor.after(host)
    render(
      <DirectClipDownloadAction
        clipId={clipId}
        onSelectClip={onSelectClip}
      />,
      host,
    )
    directActionClipId = clipId
    directActionHost = host
  }

  function enqueueClosestCard(element: Element) {
    const card = element.closest<HTMLElement>(CLIP_CARD_SELECTOR)

    if (card) {
      scheduler.enqueue(card)
    }
  }

  function enqueueCardsFromSubtree(node: Node) {
    if (!(node instanceof Element)) {
      return
    }

    enqueueClosestCard(node)

    for (const card of node.querySelectorAll<HTMLElement>(
      CLIP_CARD_SELECTOR,
    )) {
      scheduler.enqueue(card)
    }
  }

  function handleMutations(records: readonly MutationRecord[]) {
    const currentUrl = window.location.href
    let directSurfaceChanged =
      currentUrl !== lastUrl ||
      Boolean(directActionHost && !directActionHost.isConnected)
    let shouldCleanDisconnectedActions = false
    lastUrl = currentUrl

    for (const record of records) {
      const target =
        record.target instanceof Element
          ? record.target
          : record.target.parentElement

      if (target?.closest(CHATROOM_MESSAGES_SELECTOR)) {
        continue
      }

      if (record.type === 'attributes') {
        enqueueClosestCard(record.target as Element)
        directSurfaceChanged ||= target?.matches(
          DIRECT_ACTION_ANCHOR_SELECTOR,
        ) ?? false
        continue
      }

      if (record.removedNodes.length > 0) {
        shouldCleanDisconnectedActions = true

        for (const node of record.removedNodes) {
          directSurfaceChanged ||= nodeTouchesSelector(
            node,
            DIRECT_ACTION_ANCHOR_SELECTOR,
          )
        }
      }

      enqueueClosestCard(record.target as Element)

      for (const node of record.addedNodes) {
        enqueueCardsFromSubtree(node)
        directSurfaceChanged ||= nodeTouchesSelector(
          node,
          DIRECT_ACTION_ANCHOR_SELECTOR,
        )
      }
    }

    if (shouldCleanDisconnectedActions) {
      scheduler.enqueue(undefined)
    }

    if (directSurfaceChanged) {
      reconcileDirectClipAction()
    }
  }

  function reconcileExistingActions() {
    reconcileDirectClipAction()

    for (const card of document.querySelectorAll<HTMLElement>(
      CLIP_CARD_SELECTOR,
    )) {
      scheduler.enqueue(card)
    }
  }

  function connectActionObserver() {
    if (
      stopped ||
      !actionsVisible ||
      observer ||
      !document.documentElement
    ) {
      return
    }

    lastUrl = window.location.href
    reconcileExistingActions()
    observer = new MutationObserver(handleMutations)
    observer.observe(document.documentElement, {
      attributeFilter: ['href'],
      attributes: true,
      childList: true,
      subtree: true,
    })
  }

  function disconnectActionObserver() {
    observer?.disconnect()
    observer = undefined
    reconciler.teardown()
    removeDirectClipAction()
  }

  function beginObserving() {
    if (stopped) {
      return
    }

    installStyles()
    mountDownloadCenter()
    connectActionObserver()
  }

  const stopWaitingForDocument = onDocumentElementReady(beginObserving)

  stopWatchingSettings = observeSetting(
    (settings) => settings.ui.showClipDownloadButtons,
    (visible) => {
      if (actionsVisible === visible) {
        return
      }

      actionsVisible = visible

      if (!visible) {
        disconnectActionObserver()
        return
      }

      connectActionObserver()
    },
  )

  const stop = () => {
    if (stopped) {
      return
    }

    stopped = true
    stopWaitingForDocument()
    disconnectActionObserver()
    stopWatchingSettings?.()
    scheduler.cancel()

    const centerHost = document.getElementById(CENTER_HOST_ID)

    if (centerHost) {
      render(null, centerHost)
      centerHost.remove()
    }

    document.getElementById(STYLE_ID)?.remove()

    if (stopActiveIntegration === stop) {
      stopActiveIntegration = undefined
    }
  }

  stopActiveIntegration = stop
  return stop
}

function nodeTouchesSelector(node: Node, selector: string) {
  return (
    node instanceof Element &&
    (node.matches(selector) || Boolean(node.querySelector(selector)))
  )
}
