export type ViewerCountSource =
  | 'channel-details'
  | 'current-viewers'
  | 'featured'
  | 'followed-channels'
  | 'recommendations'
  | 'sidebar-recommendations'
  | 'user-livestreams'

export type ViewerCountRecord = Readonly<{
  capturedAt: number
  channelId?: number
  channelSlug: string
  isLive: boolean
  livestreamId?: number
  showViewCount: boolean
  source: ViewerCountSource
  startedAt?: number
  viewerCount: number
}>

export type CurrentViewerRecord = Readonly<{
  capturedAt: number
  livestreamId: number
  showViewCount?: boolean
  viewerCount: number
}>
