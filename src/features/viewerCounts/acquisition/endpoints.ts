import type { ViewerCountEndpoint } from '../model/types'

export function classifyViewerCountEndpoint(
  rawUrl: string,
  baseUrl = window.location.href,
): ViewerCountEndpoint | undefined {
  try {
    const url = new URL(rawUrl, baseUrl)

    if (url.origin === 'https://web.kick.com') {
      if (url.pathname === '/api/v1/recommendations/livestreams/sidebar') {
        return 'SIDEBAR_LIVESTREAMS'
      }

      if (url.pathname === '/api/v1/recommendations/livestreams') {
        return 'RECOMMENDED_LIVESTREAMS'
      }

      if (url.pathname === '/api/v1/recommendations/livestreams/list') {
        return 'PAGINATED_RECOMMENDED_LIVESTREAMS'
      }

      if (url.pathname === '/api/v1/livestreams/featured') {
        return 'FEATURED_LIVESTREAMS'
      }

      return undefined
    }

    if (
      url.origin !== 'https://kick.com' &&
      url.origin !== 'https://www.kick.com'
    ) {
      return undefined
    }

    if (url.pathname === '/api/v2/channels/followed') {
      return 'FOLLOWED_CHANNELS'
    }

    if (/^\/api\/v2\/channels\/[^/]+$/.test(url.pathname)) {
      return 'CHANNEL_DETAILS'
    }

    if (url.pathname === '/current-viewers') {
      return 'CURRENT_VIEWERS'
    }

    if (url.pathname === '/api/v1/user/livestreams') {
      return 'USER_LIVESTREAMS'
    }

    return undefined
  } catch {
    return undefined
  }
}
