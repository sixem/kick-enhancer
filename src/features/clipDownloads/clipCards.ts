export const CLIP_CARD_SELECTOR = '[data-testid="livestream-results-card"]'
export const CLIP_MODAL_BUTTON_SELECTOR = 'button[aria-label="Open clip modal"]'
export const CLIP_PERMALINK_SELECTOR = 'a[href*="/clips/clip_"]'

const CLIP_ID_PATTERN = /^clip_[A-Za-z0-9_-]+$/
const MAX_CLIP_ID_LENGTH = 128

type ClipCard = Pick<ParentNode, 'querySelector' | 'querySelectorAll'>
type ActionEvent = Pick<Event, 'preventDefault' | 'stopPropagation'>
type ScheduleCallback = (callback: () => void) => void

export type ClipSelectionHandler = (clipId: string) => void

export function isValidClipId(value: string) {
  return value.length <= MAX_CLIP_ID_LENGTH && CLIP_ID_PATTERN.test(value)
}

export function getClipIdFromHref(
  href: string | null | undefined,
  kickOrigin: string,
) {
  if (!href) {
    return undefined
  }

  let baseUrl: URL
  let clipUrl: URL

  try {
    baseUrl = new URL(kickOrigin)
    clipUrl = new URL(href, `${baseUrl.origin}/`)
  } catch {
    return undefined
  }

  if (clipUrl.origin !== baseUrl.origin) {
    return undefined
  }

  const pathSegments = clipUrl.pathname.split('/').filter(Boolean)

  if (pathSegments.length !== 3 || pathSegments[1] !== 'clips') {
    return undefined
  }

  const clipId = pathSegments[2]

  if (!isValidClipId(clipId)) {
    return undefined
  }

  return clipId
}

export function getUniqueClipId(
  hrefs: Iterable<string | null>,
  kickOrigin: string,
) {
  const clipIds = new Set<string>()

  for (const href of hrefs) {
    const clipId = getClipIdFromHref(href, kickOrigin)

    if (clipId) {
      clipIds.add(clipId)
    }
  }

  return clipIds.size === 1 ? clipIds.values().next().value : undefined
}

export function getClipIdFromCard(card: ClipCard, kickOrigin: string) {
  if (!card.querySelector(CLIP_MODAL_BUTTON_SELECTOR)) {
    return undefined
  }

  const hrefs = Array.from(
    card.querySelectorAll(CLIP_PERMALINK_SELECTOR),
    (link) => link.getAttribute('href'),
  )

  return getUniqueClipId(hrefs, kickOrigin)
}

export function activateClipDownload(
  event: ActionEvent,
  clipId: string,
  onSelectClip: ClipSelectionHandler,
) {
  event.preventDefault()
  event.stopPropagation()
  onSelectClip(clipId)
}

export function createBatchedCardScheduler<T>(
  processCards: (cards: readonly T[]) => void,
  schedule: ScheduleCallback = queueMicrotask,
) {
  const pendingCards = new Set<T>()
  let active = true
  let scheduled = false

  function flush() {
    scheduled = false

    if (!active || pendingCards.size === 0) {
      return
    }

    const cards = [...pendingCards]
    pendingCards.clear()
    processCards(cards)
  }

  return {
    cancel() {
      active = false
      pendingCards.clear()
    },
    enqueue(card: T) {
      if (!active) {
        return
      }

      pendingCards.add(card)

      if (scheduled) {
        return
      }

      scheduled = true
      schedule(flush)
    },
  }
}
