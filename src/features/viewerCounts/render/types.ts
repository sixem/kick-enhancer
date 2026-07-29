export type SidebarHoverTarget = Readonly<{
  displayName: string
  slug: string
}>

export type ViewerCountRenderOptions = Readonly<{
  hideFollowingRecommendations: boolean
  hideGamblingStreams: boolean
  hideRecommendedChannels: boolean
  showHiddenViewerCounts: boolean
  showStreamUptime: boolean
}>

export type ViewerCountRenderResult = Readonly<{
  activeChannelSlug?: string
  counts: Readonly<{
    cardUptimes: number
    cards: number
    channel: number
    sidebar: number
    sidebarUptimes: number
    tooltipUptimes: number
    tooltips: number
  }>
  targetSlugs: ReadonlySet<string>
}>
