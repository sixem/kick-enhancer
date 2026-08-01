import {
  type CountElementState,
  updateCountElementState,
} from './countElement.ts'
import {
  CARD_THUMBNAIL_SELECTOR,
  RENDER_ELEMENT_SELECTOR,
  STREAM_UPTIME_SELECTOR,
  VIEWER_COUNT_SELECTOR,
} from './selectors.ts'

const SIDEBAR_UPTIME_CONTAINER_SELECTOR = '[data-ke-sidebar-uptime-container]'
const TOOLTIP_UPTIME_CONTAINER_SELECTOR = '[data-ke-tooltip-uptime-container]'
const NATIVE_CARD_LIVE_HIDDEN_SELECTOR = '[data-ke-native-card-live-hidden]'

type UptimeElementState = Readonly<{
  className: string
  label: string
  slug: string
  startedAt: number
  target: string
  text: string
}>

// Each render pass claims the enhancer nodes it still owns. Finalization can
// then remove stale nodes and restore Kick markup that is no longer replaced.
export class ViewerCountDomOwnership {
  readonly #renderedElements = new Set<HTMLElement>()

  finalize() {
    this.#removeOrphanedElements()
    restoreUnusedNativeCardLiveBadges()
    restoreUnusedNativeLabels()
    restoreUnusedUptimeContainers()
  }

  findCount(scope: ParentNode, target: string) {
    return scope.querySelector<HTMLElement>(
      `${VIEWER_COUNT_SELECTOR}[data-ke-target="${target}"]`,
    )
  }

  findUptime(scope: ParentNode, target: string) {
    return scope.querySelector<HTMLElement>(
      `${STREAM_UPTIME_SELECTOR}[data-ke-target="${target}"]`,
    )
  }

  hideNativeCardLiveBadge(element: HTMLElement, slug: string) {
    element.dataset.keNativeCardLiveHidden = slug
  }

  hideNativeLiveLabel(element: HTMLElement, slug: string) {
    if (element.textContent?.trim().toLowerCase() === 'live') {
      element.dataset.keNativeLiveHidden = slug
    }
  }

  markUptimeContainer(
    element: HTMLElement,
    target: 'sidebar' | 'tooltip',
    slug: string,
  ) {
    if (target === 'sidebar') {
      element.dataset.keSidebarUptimeContainer = slug
      return
    }

    element.dataset.keTooltipUptimeContainer = slug
  }

  removeCount(scope: ParentNode, target: string) {
    this.findCount(scope, target)?.remove()
  }

  removeUptime(scope: ParentNode, target: string) {
    this.findUptime(scope, target)?.remove()
  }

  restoreNativeCardLiveBadge(element: HTMLElement | undefined) {
    element?.removeAttribute('data-ke-native-card-live-hidden')
  }

  restoreNativeLiveLabel(element: HTMLElement | undefined) {
    element?.removeAttribute('data-ke-native-live-hidden')
  }

  updateCount(element: HTMLElement, state: CountElementState) {
    const contentChanged = updateCountElementState(element, state)
    this.#renderedElements.add(element)

    return contentChanged
  }

  updateUptime(element: HTMLElement, state: UptimeElementState) {
    if (element.className !== state.className) {
      element.className = state.className
    }

    setDatasetValue(element, 'keSlug', state.slug)
    setDatasetValue(element, 'keStartedAt', String(state.startedAt))
    setDatasetValue(element, 'keTarget', state.target)
    setDatasetValue(element, 'keStreamUptime', '')

    if (element.textContent !== state.text) {
      element.textContent = state.text
    }

    if (element.getAttribute('aria-label') !== state.label) {
      element.setAttribute('aria-label', state.label)
    }

    this.#renderedElements.add(element)
  }

  #removeOrphanedElements() {
    for (const element of document.querySelectorAll<HTMLElement>(
      RENDER_ELEMENT_SELECTOR,
    )) {
      if (!this.#renderedElements.has(element)) {
        element.remove()
      }
    }
  }
}

export function cleanupViewerCountDom() {
  for (const element of document.querySelectorAll(RENDER_ELEMENT_SELECTOR)) {
    element.remove()
  }

  for (const element of document.querySelectorAll(
    '[data-ke-native-live-hidden]',
  )) {
    element.removeAttribute('data-ke-native-live-hidden')
  }

  for (const element of document.querySelectorAll(
    NATIVE_CARD_LIVE_HIDDEN_SELECTOR,
  )) {
    element.removeAttribute('data-ke-native-card-live-hidden')
  }

  for (const element of document.querySelectorAll(
    [SIDEBAR_UPTIME_CONTAINER_SELECTOR, TOOLTIP_UPTIME_CONTAINER_SELECTOR].join(
      ', ',
    ),
  )) {
    element.removeAttribute('data-ke-sidebar-uptime-container')
    element.removeAttribute('data-ke-tooltip-uptime-container')
  }
}

function setDatasetValue(element: HTMLElement, key: string, value: string) {
  if (element.dataset[key] !== value) {
    element.dataset[key] = value
  }
}

function restoreUnusedNativeLabels() {
  for (const label of document.querySelectorAll<HTMLElement>(
    '[data-ke-native-live-hidden]',
  )) {
    const statusContainer = label.parentElement
    const slug = label.dataset.keNativeLiveHidden
    const count = statusContainer?.querySelector<HTMLElement>(
      VIEWER_COUNT_SELECTOR,
    )

    if (!count || count.dataset.keSlug !== slug) {
      label.removeAttribute('data-ke-native-live-hidden')
    }
  }
}

function restoreUnusedNativeCardLiveBadges() {
  for (const badge of document.querySelectorAll<HTMLElement>(
    NATIVE_CARD_LIVE_HIDDEN_SELECTOR,
  )) {
    const thumbnail = badge.closest<HTMLElement>(CARD_THUMBNAIL_SELECTOR)
    const uptime = thumbnail?.querySelector<HTMLElement>(
      `${STREAM_UPTIME_SELECTOR}[data-ke-target="card"]`,
    )
    const slug = badge.dataset.keNativeCardLiveHidden

    if (!uptime || uptime.dataset.keSlug !== slug) {
      badge.removeAttribute('data-ke-native-card-live-hidden')
    }
  }
}

function restoreUnusedUptimeContainers() {
  restoreUptimeContainers(
    SIDEBAR_UPTIME_CONTAINER_SELECTOR,
    'data-ke-sidebar-uptime-container',
    'sidebar',
  )
  restoreUptimeContainers(
    TOOLTIP_UPTIME_CONTAINER_SELECTOR,
    'data-ke-tooltip-uptime-container',
    'tooltip',
  )
}

function restoreUptimeContainers(
  selector: string,
  attribute: string,
  target: string,
) {
  for (const container of document.querySelectorAll<HTMLElement>(selector)) {
    const uptime = container.querySelector<HTMLElement>(
      `${STREAM_UPTIME_SELECTOR}[data-ke-target="${target}"]`,
    )
    const slug = container.getAttribute(attribute)

    if (!uptime || uptime.dataset.keSlug !== slug) {
      container.removeAttribute(attribute)
    }
  }
}
