import { getChannelSlugFromHref } from '../model/slug.ts'
import { type ViewerCountStore } from '../model/store.ts'
import { formatStreamUptime } from '../model/uptime.ts'
import { type ViewerCountDomOwnership } from './domOwnership.ts'
import { findStatusLabel, formatViewerCount, isCompactCount } from './shared.ts'
import {
  findSidebarTooltip,
  findTooltipHeadingRow,
  isSidebarLinkHiddenByEnhancer,
} from './sidebarShared.ts'
import {
  type SidebarHoverTarget,
  type ViewerCountRenderOptions,
} from './types.ts'

export type SidebarTooltipRenderResult = Readonly<{
  targetSlugs: ReadonlySet<string>
  uptimes: number
  viewerCounts: number
}>

export function renderSidebarTooltipSurface(
  store: ViewerCountStore,
  ownership: ViewerCountDomOwnership,
  sidebarLinks: Iterable<HTMLAnchorElement>,
  target: SidebarHoverTarget | undefined,
  options: ViewerCountRenderOptions,
): SidebarTooltipRenderResult {
  const targetSlugs = new Set<string>()
  let uptimes = 0
  let viewerCounts = 0

  if (
    !target ||
    (!options.showHiddenViewerCounts && !options.showStreamUptime)
  ) {
    return {
      targetSlugs,
      uptimes,
      viewerCounts,
    }
  }

  let sourceLink: HTMLAnchorElement | undefined

  for (const link of sidebarLinks) {
    if (getChannelSlugFromHref(link.getAttribute('href')) === target.slug) {
      sourceLink = link
      break
    }
  }

  if (!sourceLink || isSidebarLinkHiddenByEnhancer(sourceLink, options)) {
    return {
      targetSlugs,
      uptimes,
      viewerCounts,
    }
  }

  targetSlugs.add(target.slug)
  const stream = store.get(target.slug)

  if (!stream) {
    return {
      targetSlugs,
      uptimes,
      viewerCounts,
    }
  }

  const countEligible = options.showHiddenViewerCounts && !stream.showViewCount
  const startedAt = options.showStreamUptime ? stream.startedAt : undefined
  const uptime =
    startedAt === undefined ? undefined : formatStreamUptime(startedAt)

  if (!countEligible && !uptime) {
    return {
      targetSlugs,
      uptimes,
      viewerCounts,
    }
  }

  const tooltip = findSidebarTooltip(target, sourceLink)

  if (!tooltip) {
    return {
      targetSlugs,
      uptimes,
      viewerCounts,
    }
  }

  const statusLabel = findStatusLabel(tooltip)
  const statusContainer =
    statusLabel?.parentElement ??
    findTooltipHeadingRow(tooltip, target.displayName)

  if (!statusContainer) {
    return {
      targetSlugs,
      uptimes,
      viewerCounts,
    }
  }

  if (
    countEligible &&
    !(statusLabel && isCompactCount(statusLabel.textContent))
  ) {
    if (statusLabel) {
      ownership.hideNativeLiveLabel(statusLabel, target.slug)
    }

    const countElement =
      ownership.findCount(tooltip, 'tooltip') ?? document.createElement('span')
    ownership.updateCount(countElement, {
      className: [
        'ke-viewer-count-tooltip',
        statusLabel ? '' : 'ke-viewer-count-tooltip--standalone',
      ]
        .filter(Boolean)
        .join(' '),
      count: stream.viewerCount,
      slug: target.slug,
      target: 'tooltip',
      text: formatViewerCount(stream.viewerCount),
    })

    if (countElement.parentElement !== statusContainer) {
      statusContainer.append(countElement)
    }

    viewerCounts = 1
  }

  if (uptime && startedAt !== undefined) {
    const uptimeElement =
      ownership.findUptime(tooltip, 'tooltip') ?? document.createElement('span')

    ownership.updateUptime(uptimeElement, {
      className: 'ke-stream-uptime-tooltip',
      label: `Live for ${uptime}`,
      slug: target.slug,
      startedAt,
      target: 'tooltip',
      text: uptime,
    })
    ownership.markUptimeContainer(statusContainer, 'tooltip', target.slug)

    if (uptimeElement.parentElement !== statusContainer) {
      statusContainer.append(uptimeElement)
    }

    uptimes = 1
  }

  return {
    targetSlugs,
    uptimes,
    viewerCounts,
  }
}
