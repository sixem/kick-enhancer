export const SETTINGS_VERSION = 5

export const CHAT_FONT_FAMILIES = [
  'arial',
  'verdana',
  'tahoma',
  'trebuchet',
  'georgia',
  'monospace',
] as const

export type ChatFontFamily = (typeof CHAT_FONT_FAMILIES)[number]

export const CHAT_FONT_WEIGHTS = [
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
] as const

export type ChatFontWeight = (typeof CHAT_FONT_WEIGHTS)[number]

export type Settings = Readonly<{
  chat: Readonly<{
    fontFamily: ChatFontFamily | null
    fontSize: number | null
    fontWeight: ChatFontWeight | null
    messageDividers: boolean
    messageSpacing: number | null
  }>
  ui: Readonly<{
    hideFollowingRecommendations: boolean
    hideGamblingStreams: boolean
    hideHomepageCarousel: boolean
    hideRecommendedChannels: boolean
    rememberSidebarState: boolean
    showClipDownloadButtons: boolean
    showHiddenViewerCounts: boolean
    showStreamUptime: boolean
    sidebarCollapsed: boolean
  }>
  version: typeof SETTINGS_VERSION
}>

export type SettingsFileResult =
  | Readonly<{
      compatibilityWarning: boolean
      ok: true
      settings: Settings
    }>
  | Readonly<{
      ok: false
    }>

export const CHAT_FONT_SIZE_DEFAULT = 14
export const CHAT_FONT_SIZE_MAX = 24
export const CHAT_FONT_SIZE_MIN = 10
export const CHAT_FONT_WEIGHT_DEFAULT = 400
export const CHAT_FONT_WEIGHT_MAX = 900
export const CHAT_FONT_WEIGHT_MIN = 100
export const CHAT_MESSAGE_SPACING_DEFAULT = 4
export const CHAT_MESSAGE_SPACING_MAX = 12
export const CHAT_MESSAGE_SPACING_MIN = 0

export const DEFAULT_SETTINGS: Settings = {
  chat: {
    fontFamily: null,
    fontSize: null,
    fontWeight: null,
    messageDividers: false,
    messageSpacing: null,
  },
  ui: {
    hideFollowingRecommendations: false,
    hideGamblingStreams: false,
    hideHomepageCarousel: false,
    hideRecommendedChannels: false,
    rememberSidebarState: false,
    showClipDownloadButtons: true,
    showHiddenViewerCounts: true,
    showStreamUptime: false,
    sidebarCollapsed: false,
  },
  version: SETTINGS_VERSION,
}

export function parseSettings(value: unknown): Settings {
  if (!isRecord(value)) {
    return DEFAULT_SETTINGS
  }

  const chat = isRecord(value.chat) ? value.chat : {}
  const ui = isRecord(value.ui) ? value.ui : {}

  return {
    chat: {
      fontFamily: normalizeChatFontFamily(chat.fontFamily),
      fontSize: normalizeChatValue(
        chat.fontSize,
        CHAT_FONT_SIZE_MIN,
        CHAT_FONT_SIZE_MAX,
      ),
      fontWeight: normalizeChatFontWeight(chat.fontWeight),
      messageDividers: chat.messageDividers === true,
      messageSpacing: normalizeChatValue(
        chat.messageSpacing,
        CHAT_MESSAGE_SPACING_MIN,
        CHAT_MESSAGE_SPACING_MAX,
      ),
    },
    ui: {
      hideFollowingRecommendations:
        ui.hideFollowingRecommendations === true,
      hideGamblingStreams: ui.hideGamblingStreams === true,
      hideHomepageCarousel: ui.hideHomepageCarousel === true,
      hideRecommendedChannels: ui.hideRecommendedChannels === true,
      rememberSidebarState: ui.rememberSidebarState === true,
      showClipDownloadButtons: ui.showClipDownloadButtons !== false,
      showHiddenViewerCounts: ui.showHiddenViewerCounts !== false,
      showStreamUptime: ui.showStreamUptime === true,
      sidebarCollapsed: ui.sidebarCollapsed === true,
    },
    version: SETTINGS_VERSION,
  }
}

export function parseSettingsFile(text: string): SettingsFileResult {
  let value: unknown

  try {
    value = JSON.parse(text)
  } catch {
    return {
      ok: false,
    }
  }

  if (!isRecord(value) || !hasRecognizedSetting(value)) {
    return {
      ok: false,
    }
  }

  const settings = parseSettings(value)

  return {
    compatibilityWarning: !matchesCanonicalValue(value, settings),
    ok: true,
    settings,
  }
}

export function serializeSettings(settings: Settings) {
  return `${JSON.stringify(settings, null, 2)}\n`
}

export function normalizeChatFontFamily(
  value: unknown,
): ChatFontFamily | null {
  return typeof value === 'string' &&
    (CHAT_FONT_FAMILIES as readonly string[]).includes(value)
    ? (value as ChatFontFamily)
    : null
}

export function normalizeChatFontWeight(
  value: unknown,
): ChatFontWeight | null {
  return typeof value === 'number' &&
    (CHAT_FONT_WEIGHTS as readonly number[]).includes(value)
    ? (value as ChatFontWeight)
    : null
}

export function normalizeChatValue(
  value: unknown,
  min: number,
  max: number,
) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null
  }

  return Math.min(max, Math.max(min, Math.round(value)))
}

function hasRecognizedSetting(value: Record<string, unknown>) {
  return (
    hasRecognizedSectionValue(value.chat, DEFAULT_SETTINGS.chat) ||
    hasRecognizedSectionValue(value.ui, DEFAULT_SETTINGS.ui)
  )
}

function hasRecognizedSectionValue(
  value: unknown,
  expected: Record<string, unknown>,
) {
  return (
    isRecord(value) &&
    Object.keys(expected).some((key) =>
      Object.prototype.hasOwnProperty.call(value, key),
    )
  )
}

function matchesCanonicalValue(value: unknown, expected: unknown): boolean {
  if (!isRecord(expected)) {
    return Object.is(value, expected)
  }

  if (!isRecord(value)) {
    return false
  }

  const expectedKeys = Object.keys(expected)
  const valueKeys = Object.keys(value)

  return (
    expectedKeys.length === valueKeys.length &&
    expectedKeys.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(value, key) &&
        matchesCanonicalValue(value[key], expected[key]),
    )
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  )
}
