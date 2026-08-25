import {
  getChannelSlugFromPath,
  normalizeChannelSlug,
} from '../viewerCounts/model/slug.ts'

export const SIDEBAR_GAMBLING_ATTRIBUTE = 'data-kick-enhancer-gambling-stream'
export const SIDEBAR_FOLLOWING_SELECTOR =
  'a[data-testid^="sidebar-following-channel-"]'

const GAMBLING_CATEGORY_NAME = 'Slots & Casino'

export class FollowedGamblingChannels {
  readonly #channelSlugsByPage = new Map<string, ReadonlySet<string>>()

  update(payload: unknown, pageKey = '') {
    if (!isRecord(payload) || !Array.isArray(payload.channels)) {
      return false
    }

    const previousChannelSlugs = this.#getChannelSlugs()
    const pageChannelSlugs = new Set<string>()
    const seenChannelSlugs = new Set<string>()

    for (const value of payload.channels) {
      if (!isRecord(value)) {
        continue
      }

      const channelSlug = normalizeChannelSlug(value.channel_slug)
      const isLive = readBoolean(value.is_live)

      if (!channelSlug || isLive === undefined) {
        continue
      }

      seenChannelSlugs.add(channelSlug)
      const shouldHide =
        isLive && value.category_name === GAMBLING_CATEGORY_NAME

      if (shouldHide) {
        pageChannelSlugs.add(channelSlug)
      }
    }

    for (const [existingPageKey, existingPageSlugs] of this
      .#channelSlugsByPage) {
      if (existingPageKey === pageKey) {
        continue
      }

      const remainingSlugs = new Set(
        [...existingPageSlugs].filter(
          (channelSlug) => !seenChannelSlugs.has(channelSlug),
        ),
      )

      if (remainingSlugs.size === existingPageSlugs.size) {
        continue
      }

      if (remainingSlugs.size > 0) {
        this.#channelSlugsByPage.set(existingPageKey, remainingSlugs)
      } else {
        this.#channelSlugsByPage.delete(existingPageKey)
      }
    }

    if (pageChannelSlugs.size > 0) {
      this.#channelSlugsByPage.set(pageKey, pageChannelSlugs)
    } else {
      this.#channelSlugsByPage.delete(pageKey)
    }

    const channelSlugs = this.#getChannelSlugs()
    return !setsEqual(previousChannelSlugs, channelSlugs)
  }

  has(channelSlug: string) {
    for (const channelSlugs of this.#channelSlugsByPage.values()) {
      if (channelSlugs.has(channelSlug)) {
        return true
      }
    }

    return false
  }

  #getChannelSlugs() {
    const channelSlugs = new Set<string>()

    for (const pageChannelSlugs of this.#channelSlugsByPage.values()) {
      for (const channelSlug of pageChannelSlugs) {
        channelSlugs.add(channelSlug)
      }
    }

    return channelSlugs
  }
}

export function reconcileGamblingSidebarRows(
  document: Document,
  hidden: boolean,
  capturedChannels: FollowedGamblingChannels,
) {
  if (!hidden) {
    for (const row of document.querySelectorAll(
      `[${SIDEBAR_GAMBLING_ATTRIBUTE}]`,
    )) {
      row.removeAttribute(SIDEBAR_GAMBLING_ATTRIBUTE)
    }

    return
  }

  const domChannelStates = getDomGamblingChannelStates(document)

  for (const link of document.querySelectorAll<HTMLAnchorElement>(
    SIDEBAR_FOLLOWING_SELECTOR,
  )) {
    const row = link.closest('button') ?? link
    const channelSlug = getChannelSlug(link)
    const domChannelState =
      channelSlug === undefined ? undefined : domChannelStates.get(channelSlug)
    const categoryIsVisible = [...link.querySelectorAll('span')].some(
      (span) => span.textContent?.trim() === GAMBLING_CATEGORY_NAME,
    )

    row.toggleAttribute(
      SIDEBAR_GAMBLING_ATTRIBUTE,
      categoryIsVisible ||
        (channelSlug !== undefined &&
          (domChannelState ?? capturedChannels.has(channelSlug))),
    )
  }
}

function getDomGamblingChannelStates(document: Document) {
  const channelStates = new Map<string, boolean>()

  for (const card of document.querySelectorAll<HTMLElement>(
    '[data-testid="followed-livestreams"] ' +
      '[data-testid="livestream-results-card"]',
  )) {
    const channelLink = card.querySelector<HTMLAnchorElement>(
      'a[data-testid="media-card-thumbnail"]',
    )
    const channelSlug = channelLink && getChannelSlug(channelLink)

    if (channelSlug) {
      channelStates.set(
        channelSlug,
        card.querySelector('a[href="/category/slots"]') !== null,
      )
    }
  }

  return channelStates
}

function getChannelSlug(link: HTMLAnchorElement) {
  try {
    const url = new URL(link.href, link.ownerDocument.location.href)

    if (url.hostname !== 'kick.com' && url.hostname !== 'www.kick.com') {
      return undefined
    }

    return getChannelSlugFromPath(url.pathname)
  } catch {
    return undefined
  }
}

function readBoolean(value: unknown) {
  if (typeof value === 'boolean') {
    return value
  }

  if (value === 0 || value === '0' || value === 'false') {
    return false
  }

  if (value === 1 || value === '1' || value === 'true') {
    return true
  }

  return undefined
}

function setsEqual(left: ReadonlySet<string>, right: ReadonlySet<string>) {
  if (left.size !== right.size) {
    return false
  }

  for (const value of left) {
    if (!right.has(value)) {
      return false
    }
  }

  return true
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
