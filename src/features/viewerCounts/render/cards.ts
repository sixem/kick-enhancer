import { getChannelSlugFromHref } from '../slug.ts'
import { type ViewerCountStore } from '../store.ts'
import { formatStreamUptime } from '../uptime.ts'
import { type ViewerCountDomOwnership } from './domOwnership.ts'
import {
  CARD_SELECTOR,
  CARD_THUMBNAIL_SELECTOR,
  RENDER_ELEMENT_SELECTOR,
  VIEWER_COUNT_SELECTOR,
} from './selectors.ts'
import { formatViewerCount, isCompactCount } from './shared.ts'
import { type ViewerCountRenderOptions } from './types.ts'

export type CardRenderResult = Readonly<{
  targetSlugs: ReadonlySet<string>
  uptimes: number
  viewerCounts: number
}>

export function renderCardSurfaces(
  store: ViewerCountStore,
  ownership: ViewerCountDomOwnership,
  options: ViewerCountRenderOptions,
): CardRenderResult {
  const targetSlugs = new Set<string>()
  let uptimes = 0
  let viewerCounts = 0

  for (const card of document.querySelectorAll<HTMLElement>(
    CARD_SELECTOR,
  )) {
    if (isCardHiddenByEnhancer(card, options)) {
      ownership.removeCount(card, 'card')
      ownership.removeUptime(card, 'card')
      continue
    }

    const thumbnail =
      card.querySelector<HTMLAnchorElement>(CARD_THUMBNAIL_SELECTOR)
    const slug = getChannelSlugFromHref(
      thumbnail?.getAttribute('href'),
    )
    const liveBadge = thumbnail
      ? findCardLiveBadge(thumbnail)
      : undefined

    if (!thumbnail || !slug || !liveBadge) {
      ownership.removeCount(card, 'card')
      ownership.removeUptime(card, 'card')
      continue
    }

    targetSlugs.add(slug)
    const stream = store.get(slug)

    if (options.showStreamUptime) {
      uptimes += renderCardUptime(
        ownership,
        thumbnail,
        liveBadge,
        slug,
        stream?.startedAt,
      )
    } else {
      ownership.removeUptime(thumbnail, 'card')
    }

    if (
      !options.showHiddenViewerCounts ||
      hasNativeCardCount(thumbnail) ||
      !stream ||
      stream.showViewCount
    ) {
      ownership.removeCount(card, 'card')
      continue
    }

    const element =
      ownership.findCount(thumbnail, 'card') ??
      document.createElement('div')

    const contentChanged = ownership.updateCount(element, {
      className: 'ke-viewer-count-card',
      count: stream.viewerCount,
      slug,
      target: 'card',
    })

    if (
      contentChanged ||
      !element.querySelector(':scope > span')
    ) {
      const count = document.createElement('span')
      count.textContent = formatViewerCount(stream.viewerCount)
      element.replaceChildren(count, ' watching')
    }

    if (element.parentElement !== thumbnail) {
      thumbnail.append(element)
    }

    viewerCounts += 1
  }

  return {
    targetSlugs,
    uptimes,
    viewerCounts,
  }
}

function renderCardUptime(
  ownership: ViewerCountDomOwnership,
  thumbnail: HTMLAnchorElement,
  liveBadge: HTMLElement,
  slug: string,
  startedAt: number | undefined,
) {
  if (startedAt === undefined) {
    ownership.restoreNativeCardLiveBadge(liveBadge)
    ownership.removeUptime(thumbnail, 'card')
    return 0
  }

  const uptime = formatStreamUptime(startedAt)

  if (!uptime) {
    ownership.restoreNativeCardLiveBadge(liveBadge)
    ownership.removeUptime(thumbnail, 'card')
    return 0
  }

  const element =
    ownership.findUptime(thumbnail, 'card') ??
    document.createElement('div')

  ownership.updateUptime(element, {
    className: 'ke-stream-uptime-card',
    label: `Live for ${uptime}`,
    slug,
    startedAt,
    target: 'card',
    text: uptime,
  })
  ownership.hideNativeCardLiveBadge(liveBadge, slug)

  if (element.parentElement !== thumbnail) {
    thumbnail.append(element)
  }

  return 1
}

function hasNativeCardCount(thumbnail: HTMLElement) {
  return [...thumbnail.querySelectorAll<HTMLElement>('[title]')].some(
    (element) => {
      if (element.closest(VIEWER_COUNT_SELECTOR)) {
        return false
      }

      const title = element.getAttribute('title')
      const parentText = element.parentElement?.textContent ?? ''

      return (
        isCompactCount(title) &&
        /\bwatching\b/i.test(parentText)
      )
    },
  )
}

function findCardLiveBadge(thumbnail: HTMLElement) {
  return [...thumbnail.querySelectorAll<HTMLElement>('div, span')].find(
    (element) =>
      !element.closest(RENDER_ELEMENT_SELECTOR) &&
      element.childElementCount === 0 &&
      element.textContent?.trim().toLowerCase() === 'live',
  )
}

function isCardHiddenByEnhancer(
  card: HTMLElement,
  options: ViewerCountRenderOptions,
) {
  if (
    options.hideGamblingStreams &&
    card.closest('[data-testid="followed-livestreams"]') &&
    card.querySelector('a[href="/category/slots"]')
  ) {
    return true
  }

  return Boolean(
    options.hideFollowingRecommendations &&
      card.closest('[data-testid="following"]') &&
      !card.closest('[data-testid="followed-livestreams"]'),
  )
}
