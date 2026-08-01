import { createLogger } from '../../../logging/logger.ts'
import { type ViewerCountStore } from '../store.ts'
import { renderCardSurfaces, type CardRenderResult } from './cards.ts'
import { renderChannelSurface, type ChannelRenderResult } from './channel.ts'
import {
  cleanupViewerCountDom,
  ViewerCountDomOwnership,
} from './domOwnership.ts'
import { SIDEBAR_LINK_SELECTOR } from './selectors.ts'
import { renderSidebarSurface, type SidebarRenderResult } from './sidebar.ts'
import {
  renderSidebarTooltipSurface,
  type SidebarTooltipRenderResult,
} from './sidebarTooltip.ts'
import {
  type SidebarHoverTarget,
  type ViewerCountRenderOptions,
  type ViewerCountRenderResult,
} from './types.ts'

export {
  cleanupViewerCountDom,
  type SidebarHoverTarget,
  type ViewerCountRenderOptions,
  type ViewerCountRenderResult,
}

const log = createLogger('viewer-counts:render')

export function renderViewerCounts(
  store: ViewerCountStore,
  sidebarHoverTarget: SidebarHoverTarget | undefined,
  options: ViewerCountRenderOptions,
): ViewerCountRenderResult {
  const ownership = new ViewerCountDomOwnership()
  const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>(
    SIDEBAR_LINK_SELECTOR,
  )

  try {
    const channel = renderSurface(
      'channel',
      () =>
        renderChannelSurface(store, ownership, options.showHiddenViewerCounts),
      emptyChannelResult,
    )
    const cards = renderSurface(
      'cards',
      () => renderCardSurfaces(store, ownership, options),
      emptySurfaceResult,
    )
    const sidebar = renderSurface(
      'sidebar',
      () => renderSidebarSurface(store, ownership, sidebarLinks, options),
      emptySurfaceResult,
    )
    const tooltip = renderSurface(
      'sidebar-tooltip',
      () =>
        renderSidebarTooltipSurface(
          store,
          ownership,
          sidebarLinks,
          sidebarHoverTarget,
          options,
        ),
      emptySurfaceResult,
    )

    return {
      ...(channel.slug ? { activeChannelSlug: channel.slug } : {}),
      counts: {
        cardUptimes: cards.uptimes,
        cards: cards.viewerCounts,
        channel: channel.rendered,
        sidebar: sidebar.viewerCounts,
        sidebarUptimes: sidebar.uptimes,
        tooltipUptimes: tooltip.uptimes,
        tooltips: tooltip.viewerCounts,
      },
      targetSlugs: collectTargetSlugs(channel, cards, sidebar, tooltip),
    }
  } finally {
    ownership.finalize()
  }
}

function renderSurface<Result>(
  name: string,
  render: () => Result,
  fallback: () => Result,
) {
  try {
    return render()
  } catch (error) {
    log.error('Surface render failed', {
      error: error instanceof Error ? error.message : String(error),
      surface: name,
    })
    return fallback()
  }
}

function emptyChannelResult(): ChannelRenderResult {
  return {
    rendered: 0,
    targetSlugs: new Set<string>(),
  }
}

function emptySurfaceResult():
  CardRenderResult | SidebarRenderResult | SidebarTooltipRenderResult {
  return {
    targetSlugs: new Set<string>(),
    uptimes: 0,
    viewerCounts: 0,
  }
}

function collectTargetSlugs(
  ...results: readonly Readonly<{
    targetSlugs: ReadonlySet<string>
  }>[]
) {
  const targetSlugs = new Set<string>()

  for (const result of results) {
    for (const slug of result.targetSlugs) {
      targetSlugs.add(slug)
    }
  }

  return targetSlugs
}
