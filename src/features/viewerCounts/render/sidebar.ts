import { getChannelSlugFromHref } from '../model/slug.ts'
import { type ViewerCountStore } from '../model/store.ts'
import { formatStreamUptime } from '../model/uptime.ts'
import { type ViewerCountDomOwnership } from './domOwnership.ts'
import { findStatusLabel, formatViewerCount, isCompactCount } from './shared.ts'
import {
  isSidebarExpanded,
  isSidebarLinkHiddenByEnhancer,
} from './sidebarShared.ts'
import { type ViewerCountRenderOptions } from './types.ts'

export type SidebarRenderResult = Readonly<{
  targetSlugs: ReadonlySet<string>
  uptimes: number
  viewerCounts: number
}>

export function renderSidebarSurface(
  store: ViewerCountStore,
  ownership: ViewerCountDomOwnership,
  sidebarLinks: Iterable<HTMLAnchorElement>,
  options: ViewerCountRenderOptions,
): SidebarRenderResult {
  const targetSlugs = new Set<string>()
  const uptimeEnabled = options.showStreamUptime && isSidebarExpanded()
  let uptimes = 0
  let viewerCounts = 0

  for (const link of sidebarLinks) {
    const hidden = isSidebarLinkHiddenByEnhancer(link, options)
    const slug = getChannelSlugFromHref(link.getAttribute('href'))
    const statusLabel = findStatusLabel(link)
    const statusContainer = statusLabel?.parentElement
    const canRender = Boolean(!hidden && slug && statusLabel && statusContainer)
    const nativeCountVisible = isCompactCount(statusLabel?.textContent)
    // Sidebar payloads can omit show_view_count. The rendered label is the
    // reliable surface-level signal for whether KICK withheld the count.
    const countEligible =
      canRender && options.showHiddenViewerCounts && !nativeCountVisible
    const uptimeEligible = canRender && uptimeEnabled
    let stream: ReturnType<ViewerCountStore['get']>

    if ((countEligible || uptimeEligible) && slug) {
      targetSlugs.add(slug)
      stream = store.get(slug)
    }

    if (
      !countEligible ||
      !slug ||
      !statusLabel ||
      !statusContainer ||
      !stream
    ) {
      ownership.removeCount(link, 'sidebar')
      ownership.restoreNativeLiveLabel(statusLabel)
    } else {
      renderSidebarCount(
        ownership,
        link,
        statusLabel,
        statusContainer,
        slug,
        stream.viewerCount,
      )
      viewerCounts += 1
    }

    if (
      !uptimeEligible ||
      !slug ||
      !statusContainer ||
      stream?.startedAt === undefined
    ) {
      ownership.removeUptime(link, 'sidebar')
    } else {
      uptimes += renderSidebarUptime(
        ownership,
        link,
        statusContainer,
        slug,
        stream.startedAt,
      )
    }
  }

  return {
    targetSlugs,
    uptimes,
    viewerCounts,
  }
}

function renderSidebarCount(
  ownership: ViewerCountDomOwnership,
  link: HTMLAnchorElement,
  statusLabel: HTMLElement,
  statusContainer: HTMLElement,
  slug: string,
  viewerCount: number,
) {
  ownership.hideNativeLiveLabel(statusLabel, slug)

  const element =
    ownership.findCount(link, 'sidebar') ?? document.createElement('span')
  ownership.updateCount(element, {
    className: 'ke-viewer-count-sidebar',
    count: viewerCount,
    slug,
    target: 'sidebar',
    text: formatViewerCount(viewerCount),
  })

  if (element.parentElement !== statusContainer) {
    statusContainer.append(element)
  }
}

function renderSidebarUptime(
  ownership: ViewerCountDomOwnership,
  link: HTMLAnchorElement,
  statusContainer: HTMLElement,
  slug: string,
  startedAt: number,
) {
  const uptime = formatStreamUptime(startedAt)

  if (!uptime) {
    ownership.removeUptime(link, 'sidebar')
    return 0
  }

  const element =
    ownership.findUptime(link, 'sidebar') ?? document.createElement('span')

  ownership.updateUptime(element, {
    className: 'ke-stream-uptime-sidebar',
    label: `Live for ${uptime}`,
    slug,
    startedAt,
    target: 'sidebar',
    text: uptime,
  })
  ownership.markUptimeContainer(statusContainer, 'sidebar', slug)

  if (element.parentElement !== statusContainer) {
    statusContainer.append(element)
  }

  return 1
}
