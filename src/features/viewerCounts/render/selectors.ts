export const VIEWER_COUNT_SELECTOR = '[data-ke-viewer-count]'
export const STREAM_UPTIME_SELECTOR = '[data-ke-stream-uptime]'
export const RENDER_ELEMENT_SELECTOR = [
  VIEWER_COUNT_SELECTOR,
  STREAM_UPTIME_SELECTOR,
].join(', ')

export const SIDEBAR_LINK_SELECTOR = [
  '#sidebar-wrapper a[data-testid^="sidebar-following-channel-"]',
  '#sidebar-wrapper a[data-testid^="sidebar-recommended-channel-"]',
].join(', ')

export const CARD_SELECTOR = '[data-testid="livestream-results-card"]'
export const CARD_THUMBNAIL_SELECTOR =
  'a[data-testid="media-card-thumbnail"][href]'
