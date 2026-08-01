import type { ViewerCountEndpoint } from '../model/types'

type ViewerCountEndpointDefinition = Readonly<{
  endpoint: ViewerCountEndpoint
  matches: (url: URL) => boolean
}>

const KICK_ORIGINS = new Set(['https://kick.com', 'https://www.kick.com'])

const ENDPOINTS: readonly ViewerCountEndpointDefinition[] = [
  {
    endpoint: 'SIDEBAR_LIVESTREAMS',
    matches: exactWebEndpoint('/api/v1/recommendations/livestreams/sidebar'),
  },
  {
    endpoint: 'RECOMMENDED_LIVESTREAMS',
    matches: exactWebEndpoint('/api/v1/recommendations/livestreams'),
  },
  {
    endpoint: 'PAGINATED_RECOMMENDED_LIVESTREAMS',
    matches: exactWebEndpoint('/api/v1/recommendations/livestreams/list'),
  },
  {
    endpoint: 'FEATURED_LIVESTREAMS',
    matches: exactWebEndpoint('/api/v1/livestreams/featured'),
  },
  {
    endpoint: 'FOLLOWED_CHANNELS',
    matches: exactKickEndpoint('/api/v2/channels/followed'),
  },
  {
    endpoint: 'CHANNEL_DETAILS',
    matches: (url) =>
      KICK_ORIGINS.has(url.origin) &&
      /^\/api\/v2\/channels\/[^/]+$/.test(url.pathname),
  },
  {
    endpoint: 'CURRENT_VIEWERS',
    matches: exactKickEndpoint('/current-viewers'),
  },
  {
    endpoint: 'USER_LIVESTREAMS',
    matches: exactKickEndpoint('/api/v1/user/livestreams'),
  },
]

function exactKickEndpoint(pathname: string) {
  return (url: URL) => KICK_ORIGINS.has(url.origin) && url.pathname === pathname
}

function exactWebEndpoint(pathname: string) {
  return (url: URL) =>
    url.origin === 'https://web.kick.com' && url.pathname === pathname
}

export function classifyViewerCountEndpoint(
  rawUrl: string,
  baseUrl = window.location.href,
) {
  try {
    const url = new URL(rawUrl, baseUrl)
    return ENDPOINTS.find(({ matches }) => matches(url))?.endpoint
  } catch {
    return undefined
  }
}
