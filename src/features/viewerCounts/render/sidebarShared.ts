import { RENDER_ELEMENT_SELECTOR } from './selectors.ts'
import { type ViewerCountRenderOptions } from './types.ts'

export function isSidebarLinkHiddenByEnhancer(
  link: HTMLAnchorElement,
  options: ViewerCountRenderOptions,
) {
  if (
    options.hideRecommendedChannels &&
    link.matches(
      'a[data-testid^="sidebar-recommended-channel-"]',
    )
  ) {
    return true
  }

  return Boolean(
    options.hideGamblingStreams &&
      link.closest('[data-kick-enhancer-gambling-stream]'),
  )
}

export function findSidebarTooltip(
  target: Readonly<{ displayName: string; slug: string }>,
  sourceLink: HTMLAnchorElement,
) {
  for (const id of getTooltipIds(sourceLink)) {
    const describedElement = document.getElementById(id)
    const tooltip =
      describedElement?.closest<HTMLElement>(
        '[data-radix-popper-content-wrapper]',
      ) ??
      describedElement?.closest<HTMLElement>('[role="tooltip"]')

    if (tooltip && !tooltip.closest('#sidebar-wrapper')) {
      return tooltip
    }
  }

  const candidates = new Set<HTMLElement>()

  for (const element of document.querySelectorAll<HTMLElement>(
    '[role="tooltip"], [data-radix-popper-content-wrapper]',
  )) {
    const candidate =
      element.closest<HTMLElement>(
        '[data-radix-popper-content-wrapper]',
      ) ?? element

    if (!candidate.closest('#sidebar-wrapper')) {
      candidates.add(candidate)
    }
  }

  return [...candidates].find((candidate) =>
    containsExactText(candidate, target.displayName),
  )
}

export function findTooltipHeadingRow(
  tooltip: HTMLElement,
  displayName: string,
) {
  for (const element of tooltip.querySelectorAll<HTMLElement>(
    'span, p, div',
  )) {
    if (element.childElementCount > 0) {
      continue
    }

    if (element.textContent?.trim() !== displayName.trim()) {
      continue
    }

    let row = element.parentElement

    for (let depth = 0; row && depth < 3; depth += 1) {
      if (
        row.classList.contains('flex') ||
        window.getComputedStyle(row).display === 'flex'
      ) {
        return row
      }

      row = row.parentElement
    }
  }

  return undefined
}

export function isSidebarExpanded() {
  const layout = document.querySelector<HTMLElement>(
    '[data-sidebar][data-chat][data-theatre], [data-sidebar]',
  )

  if (layout?.getAttribute('data-sidebar') === 'false') {
    return false
  }

  const toggle = document.querySelector<HTMLElement>(
    'button[aria-controls="sidebar-wrapper"], ' +
      'button[aria-label="Collapse sidebar"], ' +
      'button[aria-label="Expand sidebar"], ' +
      'button[data-testid="sidebar-collapse"], ' +
      'button[data-testid="sidebar-expand"]',
  )

  return toggle?.getAttribute('aria-expanded') !== 'false'
}

function getTooltipIds(sourceLink: HTMLAnchorElement) {
  const ids = new Set<string>()

  for (const attribute of ['aria-describedby', 'aria-controls']) {
    for (const id of (
      sourceLink.getAttribute(attribute) ?? ''
    ).split(/\s+/)) {
      if (id) {
        ids.add(id)
      }
    }
  }

  return ids
}

function containsExactText(scope: ParentNode, expected: string) {
  const normalizedExpected = expected.trim().toLowerCase()

  for (const element of scope.querySelectorAll<HTMLElement>(
    'span, p, div',
  )) {
    if (
      !element.closest(RENDER_ELEMENT_SELECTOR) &&
      element.childElementCount === 0 &&
      element.textContent?.trim().toLowerCase() === normalizedExpected
    ) {
      return true
    }
  }

  return false
}
