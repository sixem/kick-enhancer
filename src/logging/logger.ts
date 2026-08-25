export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent'

export type LogEntry = Readonly<{
  arguments: readonly unknown[]
  id: number
  level: Exclude<LogLevel, 'silent'>
  scope: string
  timestamp: number
}>

export type LogHistoryListener = (history: readonly LogEntry[]) => void

type LogConfig = Readonly<{
  colors: boolean
  filters: readonly string[]
  historyLimit: number
  level: LogLevel
}>

type LogMethod = (...values: unknown[]) => void

export type Logger = Readonly<{
  child: (scope: string) => Logger
  debug: LogMethod
  error: LogMethod
  info: LogMethod
  warn: LogMethod
}>

const LEVEL_VALUES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  silent: 4,
}

const LEVEL_STYLES: Record<Exclude<LogLevel, 'silent'>, string> = {
  debug: 'color: #8c8c8c',
  info: 'color: #53fc18',
  warn: 'color: #f5c451',
  error: 'color: #ff6b6b',
}

const BRAND_STYLE = [
  'background: #53fc18',
  'border-radius: 3px',
  'color: #071402',
  'font-weight: 700',
  'padding: 1px 4px',
].join('; ')

const SCOPE_STYLE = 'color: #b0b0b0; font-weight: 600'
const RESET_STYLE = 'color: inherit; font-weight: normal'
const HISTORY_NOTIFY_INTERVAL_MS = 200

let config: LogConfig = {
  colors: true,
  filters: ['*'],
  historyLimit: 250,
  level: 'info',
}

let excludedScopePatterns: readonly string[] = []
let history: LogEntry[] = []
const historyListeners = new Set<LogHistoryListener>()
let historyNotifyTimer: ReturnType<typeof setTimeout> | undefined
let includedScopePatterns: readonly string[] = []
let nextLogEntryId = 1

function notifyHistoryListeners() {
  const snapshot = getLogHistory()

  for (const listener of historyListeners) {
    try {
      listener(snapshot)
    } catch (error) {
      console.error('[KICK Enhancer] Log history listener failed.', error)
    }
  }
}

function cancelHistoryNotification() {
  if (historyNotifyTimer === undefined) {
    return
  }

  globalThis.clearTimeout(historyNotifyTimer)
  historyNotifyTimer = undefined
}

function flushHistoryListeners() {
  cancelHistoryNotification()
  notifyHistoryListeners()
}

function scheduleHistoryNotification() {
  if (historyListeners.size === 0 || historyNotifyTimer !== undefined) {
    return
  }

  historyNotifyTimer = globalThis.setTimeout(() => {
    historyNotifyTimer = undefined
    notifyHistoryListeners()
  }, HISTORY_NOTIFY_INTERVAL_MS)
}

function matchesPattern(scope: string, pattern: string) {
  if (pattern === '*') {
    return true
  }

  if (pattern.endsWith('*')) {
    return scope.startsWith(pattern.slice(0, -1))
  }

  return scope === pattern
}

function rebuildScopePatterns(filters: readonly string[]) {
  const excluded: string[] = []
  const included: string[] = []

  for (const pattern of filters) {
    if (pattern.startsWith('-')) {
      excluded.push(pattern.slice(1))
    } else {
      included.push(pattern)
    }
  }

  excludedScopePatterns = excluded
  includedScopePatterns = included
}

function matchesAnyPattern(scope: string, patterns: readonly string[]) {
  for (const pattern of patterns) {
    if (matchesPattern(scope, pattern)) {
      return true
    }
  }

  return false
}

rebuildScopePatterns(config.filters)

function isScopeEnabled(scope: string) {
  const included =
    includedScopePatterns.length === 0 ||
    matchesAnyPattern(scope, includedScopePatterns)

  return included && !matchesAnyPattern(scope, excludedScopePatterns)
}

function remember(entry: LogEntry) {
  if (config.historyLimit <= 0) {
    return
  }

  history.push(entry)

  if (history.length > config.historyLimit) {
    history =
      config.historyLimit === 0 ? [] : history.slice(-config.historyLimit)
  }

  scheduleHistoryNotification()
}

function write(
  level: Exclude<LogLevel, 'silent'>,
  scope: string,
  values: readonly unknown[],
) {
  remember({
    arguments: values,
    id: nextLogEntryId,
    level,
    scope,
    timestamp: Date.now(),
  })
  nextLogEntryId += 1

  if (
    LEVEL_VALUES[level] < LEVEL_VALUES[config.level] ||
    !isScopeEnabled(scope)
  ) {
    return
  }

  const method = console[level].bind(console)

  if (!config.colors) {
    method(`[KICK Enhancer] [${scope}]`, ...values)
    return
  }

  method(
    '%cKICK Enhancer%c %s%c',
    BRAND_STYLE,
    `${SCOPE_STYLE}; ${LEVEL_STYLES[level]}`,
    scope,
    RESET_STYLE,
    ...values,
  )
}

export function createLogger(scope: string): Logger {
  return {
    child: (childScope) => createLogger(`${scope}:${childScope}`),
    debug: (...values) => write('debug', scope, values),
    error: (...values) => write('error', scope, values),
    info: (...values) => write('info', scope, values),
    warn: (...values) => write('warn', scope, values),
  }
}

export function configureLogging(update: Partial<LogConfig>) {
  const previousHistoryLength = history.length
  const updatedFilters = update.filters

  config = {
    ...config,
    ...update,
    filters: updatedFilters ? [...updatedFilters] : config.filters,
    historyLimit: Math.max(0, update.historyLimit ?? config.historyLimit),
  }

  if (updatedFilters !== undefined) {
    rebuildScopePatterns(config.filters)
  }

  if (history.length > config.historyLimit) {
    history =
      config.historyLimit === 0 ? [] : history.slice(-config.historyLimit)
  }

  if (history.length !== previousHistoryLength) {
    flushHistoryListeners()
  }
}

export function getLogHistory() {
  return [...history]
}

export function clearLogHistory() {
  if (history.length === 0) {
    return
  }

  history = []
  flushHistoryListeners()
}

export function subscribeLogHistory(listener: LogHistoryListener) {
  historyListeners.add(listener)

  return () => {
    historyListeners.delete(listener)

    if (historyListeners.size === 0) {
      cancelHistoryNotification()
    }
  }
}
