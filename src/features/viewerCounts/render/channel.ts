import { renderAnimatedNumber } from '../../../components/numberReel.ts'
import { getChannelSlugFromPath } from '../slug.ts'
import { type ViewerCountStore } from '../store.ts'
import { type ViewerCountDomOwnership } from './domOwnership.ts'
import { VIEWER_COUNT_SELECTOR } from './selectors.ts'

export type ChannelRenderResult = Readonly<{
  rendered: number
  slug?: string
  targetSlugs: ReadonlySet<string>
}>

export function renderChannelSurface(
  store: ViewerCountStore,
  ownership: ViewerCountDomOwnership,
  enabled: boolean,
): ChannelRenderResult {
  const targetSlugs = new Set<string>()
  const existing = document.querySelector<HTMLElement>(
    `${VIEWER_COUNT_SELECTOR}[data-ke-target="channel"]`,
  )

  if (!enabled) {
    existing?.remove()
    return {
      rendered: 0,
      targetSlugs,
    }
  }

  const slug = getChannelSlugFromPath(window.location.pathname)
  const title = document.querySelector<HTMLElement>(
    '[data-testid="livestream-title"]',
  )

  if (!slug || !title) {
    existing?.remove()
    return {
      rendered: 0,
      targetSlugs,
    }
  }

  if (
    document.querySelector(
      '[data-testid="viewer-count"]:not([data-ke-viewer-count])',
    )
  ) {
    existing?.remove()
    return {
      rendered: 0,
      slug,
      targetSlugs,
    }
  }

  targetSlugs.add(slug)
  const stream = store.get(slug)

  if (!stream || stream.showViewCount) {
    existing?.remove()
    return {
      rendered: 0,
      slug,
      targetSlugs,
    }
  }

  const element =
    existing ?? document.createElement('div')
  ownership.updateCount(element, {
    className: 'ke-viewer-count-channel',
    count: stream.viewerCount,
    slug,
    target: 'channel',
  })

  let count = element.querySelector<HTMLElement>(
    '.ke-viewer-count-channel__value',
  )

  if (!count) {
    const content = document.createElement('span')
    content.className = 'ke-viewer-count-channel__content'

    count = document.createElement('span')
    count.className = [
      'ke-animated-number',
      'ke-viewer-count-channel__value',
    ].join(' ')
    count.setAttribute('aria-hidden', 'true')

    content.append(count, ' watching')
    element.replaceChildren(createCommunityIcon(), content)
  }

  renderAnimatedNumber(count, stream.viewerCount)

  const insertionTarget = findChannelCountInsertionTarget()

  if (
    insertionTarget &&
    (element.parentElement !== insertionTarget ||
      element !== insertionTarget.firstElementChild)
  ) {
    insertionTarget.prepend(element)
  } else if (
    !insertionTarget &&
    element.parentElement !== title.parentElement
  ) {
    title.insertAdjacentElement('afterend', element)
  }

  return {
    rendered: 1,
    slug,
    targetSlugs,
  }
}

function findChannelCountInsertionTarget() {
  const subscriptionButton = document.querySelector<HTMLElement>(
    '[data-testid="sub-button"], [data-testid="gift-sub-button"]',
  )
  const mainButtons = subscriptionButton?.parentElement
  const rightColumn = mainButtons?.parentElement
  const secondaryButtons = rightColumn?.lastElementChild

  return secondaryButtons instanceof HTMLElement &&
    secondaryButtons !== mainButtons
    ? secondaryButtons
    : undefined
}

function createCommunityIcon() {
  const namespace = 'http://www.w3.org/2000/svg'
  const icon = document.createElementNS(namespace, 'svg')
  icon.setAttribute('aria-hidden', 'true')
  icon.setAttribute('viewBox', '0 0 32 32')

  const paths = [
    'M4 19V28H7V22H16V28H28V19H4Z',
    'M10.75 17.5C14.4775 17.5 17.5 14.4775 17.5 10.75C17.5 7.0225 14.4775 4 10.75 4C7.0225 4 4 7.0225 4 10.75C4 14.4775 7.0225 17.5 10.75 17.5ZM10.75 7C12.82 7 14.5 8.68 14.5 10.75C14.5 12.82 12.82 14.5 10.75 14.5C8.68 14.5 7 12.82 7 10.75C7 8.68 8.68 7 10.75 7Z',
    'M23.5 17.5C25.9853 17.5 28 15.4853 28 13C28 10.5147 25.9853 8.5 23.5 8.5C21.0147 8.5 19 10.5147 19 13C19 15.4853 21.0147 17.5 23.5 17.5Z',
  ]

  for (const pathData of paths) {
    const path = document.createElementNS(namespace, 'path')
    path.setAttribute('d', pathData)
    icon.append(path)
  }

  return icon
}
