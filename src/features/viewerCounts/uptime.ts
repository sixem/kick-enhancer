const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000
const KICK_UTC_TIMESTAMP_PATTERN =
  /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?$/

export function parseStreamStartedAt(value: unknown) {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return undefined
  }

  const normalized = KICK_UTC_TIMESTAMP_PATTERN.test(trimmed)
    ? `${trimmed.replace(' ', 'T')}Z`
    : trimmed
  const timestamp = Date.parse(normalized)

  return Number.isFinite(timestamp) && timestamp >= 0
    ? timestamp
    : undefined
}

export function formatStreamUptime(
  startedAt: number,
  now = Date.now(),
) {
  if (
    !Number.isFinite(startedAt) ||
    !Number.isFinite(now) ||
    startedAt > now + MAX_CLOCK_SKEW_MS
  ) {
    return undefined
  }

  const totalMinutes = Math.floor(
    Math.max(0, now - startedAt) / (60 * 1000),
  )

  if (totalMinutes < 1) {
    return '<1m'
  }

  if (totalMinutes < 60) {
    return `${totalMinutes}m`
  }

  const totalHours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (totalHours < 24) {
    return minutes > 0
      ? `${totalHours}h ${minutes}m`
      : `${totalHours}h`
  }

  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24

  return hours > 0 ? `${days}d ${hours}h` : `${days}d`
}
