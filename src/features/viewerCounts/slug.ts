const RESERVED_ROUTES = new Set([
  'about',
  'browse',
  'category',
  'dashboard',
  'following',
  'privacy',
  'search',
  'settings',
  'subscriptions',
  'terms',
])

const SLUG_PATTERN = /^[a-z0-9][a-z0-9_-]*$/i

export function normalizeChannelSlug(value: unknown) {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalized = safeDecode(value).trim().toLowerCase()

  if (
    !normalized ||
    RESERVED_ROUTES.has(normalized) ||
    !SLUG_PATTERN.test(normalized)
  ) {
    return undefined
  }

  return normalized
}

export function getChannelSlugFromHref(
  href: string | null | undefined,
) {
  if (!href) {
    return undefined
  }

  try {
    const url = new URL(href, window.location.href)

    if (
      url.hostname !== 'kick.com' &&
      url.hostname !== 'www.kick.com'
    ) {
      return undefined
    }

    return getChannelSlugFromPath(url.pathname)
  } catch {
    return undefined
  }
}

export function getChannelSlugFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length !== 1) {
    return undefined
  }

  return normalizeChannelSlug(segments[0])
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
