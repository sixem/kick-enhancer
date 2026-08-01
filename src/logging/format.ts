import type { LogEntry } from './logger.ts'

const MAX_ARRAY_ITEMS = 20
const MAX_DEPTH = 3
const MAX_STRING_LENGTH = 500
const REDACTED_KEY_PATTERN =
  /authorization|cookie|credential|password|playback|secret|session|signature|token/i
const URL_PATTERN = /https?:\/\/[^\s"'<>]+/gi

export function formatLogEntry(entry: LogEntry) {
  const time = new Date(entry.timestamp)
  const timestamp = Number.isNaN(time.getTime())
    ? 'Invalid time'
    : time.toISOString()
  const message = entry.arguments
    .map((value) => formatLogValue(value))
    .join(' ')

  return `${timestamp} [${entry.level.toUpperCase()}] [${entry.scope}] ${message}`
}

export function formatLogMessage(entry: LogEntry) {
  return entry.arguments.map(formatCompactLogValue).join('; ')
}

export function formatLogValue(value: unknown) {
  if (typeof value === 'string') {
    return sanitizeText(value)
  }

  if (
    value === null ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined'
  ) {
    return String(value)
  }

  if (typeof value === 'bigint') {
    return `${value}n`
  }

  if (typeof value === 'symbol') {
    return value.description ? `Symbol(${value.description})` : 'Symbol()'
  }

  if (typeof value === 'function') {
    return `[Function ${value.name || 'anonymous'}]`
  }

  try {
    return JSON.stringify(sanitizeValue(value, 0, new WeakSet<object>()))
  } catch {
    return '[Unserializable value]'
  }
}

function formatCompactLogValue(value: unknown) {
  if (value instanceof Error) {
    return `${value.name}: ${sanitizeText(value.message)}`
  }

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return formatLogValue(value)
  }

  const prototype = Reflect.getPrototypeOf(value)

  if (prototype !== Object.prototype && prototype !== null) {
    return formatLogValue(value)
  }

  const sanitized = sanitizeValue(value, 0, new WeakSet<object>())
  const entries =
    typeof sanitized === 'object' && sanitized !== null
      ? Object.entries(sanitized)
      : []

  return entries.length === 0
    ? '{}'
    : entries
        .map(([key, entry]) => `${key}=${formatCompactDataValue(entry)}`)
        .join('; ')
}

function formatCompactDataValue(value: unknown) {
  if (typeof value === 'string') {
    return value
  }

  if (
    value === null ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined'
  ) {
    return String(value)
  }

  return JSON.stringify(value)
}

function sanitizeValue(
  value: unknown,
  depth: number,
  seen: WeakSet<object>,
): unknown {
  if (typeof value === 'string') {
    return sanitizeText(value)
  }

  if (
    value === null ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined'
  ) {
    return value
  }

  if (typeof value === 'bigint') {
    return `${value}n`
  }

  if (typeof value === 'symbol') {
    return value.description ? `Symbol(${value.description})` : 'Symbol()'
  }

  if (typeof value === 'function') {
    return `[Function ${value.name || 'anonymous'}]`
  }

  if (typeof value !== 'object') {
    return '[Unknown value]'
  }

  if (value instanceof Error) {
    return {
      message: sanitizeText(value.message),
      name: value.name,
    }
  }

  if (depth >= MAX_DEPTH) {
    return '[Max depth]'
  }

  if (seen.has(value)) {
    return '[Circular]'
  }

  seen.add(value)

  if (Array.isArray(value)) {
    const values = value
      .slice(0, MAX_ARRAY_ITEMS)
      .map((entry) => sanitizeValue(entry, depth + 1, seen))

    if (value.length > MAX_ARRAY_ITEMS) {
      values.push(`[${value.length - MAX_ARRAY_ITEMS} more items]`)
    }

    return values
  }

  const sanitized: Record<string, unknown> = {}

  for (const [key, entry] of Object.entries(value)) {
    sanitized[key] = REDACTED_KEY_PATTERN.test(key)
      ? '[Redacted]'
      : sanitizeValue(entry, depth + 1, seen)
  }

  return sanitized
}

function sanitizeText(value: string) {
  const withoutCredentials = value
    .replace(/\bBearer\s+\S+/gi, 'Bearer [Redacted]')
    .replace(URL_PATTERN, sanitizeUrl)

  return withoutCredentials.length > MAX_STRING_LENGTH
    ? `${withoutCredentials.slice(0, MAX_STRING_LENGTH)}…`
    : withoutCredentials
}

function sanitizeUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl)
    const suffix = url.search || url.hash ? '?[redacted]' : ''

    return `${url.origin}${url.pathname}${suffix}`
  } catch {
    return '[Invalid URL]'
  }
}
