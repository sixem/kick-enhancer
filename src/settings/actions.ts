import { setRememberSidebarState } from '../features/sidebarState'
import {
  CHAT_FONT_SIZE_MAX,
  CHAT_FONT_SIZE_MIN,
  CHAT_MESSAGE_SPACING_MAX,
  CHAT_MESSAGE_SPACING_MIN,
  normalizeChatFontFamily,
  normalizeChatFontWeight,
  normalizeChatValue,
  updateSettings,
  type ChatFontFamily,
  type Settings,
} from './settings'

export { setRememberSidebarState }

type ChatSettings = Settings['chat']
type UiSettings = Settings['ui']

export function setChatFontSize(value: number | null) {
  return updateChatSetting(
    'fontSize',
    value === null
      ? null
      : normalizeChatValue(
          value,
          CHAT_FONT_SIZE_MIN,
          CHAT_FONT_SIZE_MAX,
        ),
  )
}

export function setChatFontFamily(value: ChatFontFamily | null) {
  return updateChatSetting(
    'fontFamily',
    normalizeChatFontFamily(value),
  )
}

export function setChatFontWeight(value: number | null) {
  return updateChatSetting(
    'fontWeight',
    normalizeChatFontWeight(value),
  )
}

export function setChatMessageDividers(enabled: boolean) {
  return updateChatSetting('messageDividers', enabled)
}

export function setChatMessageSpacing(value: number | null) {
  return updateChatSetting(
    'messageSpacing',
    value === null
      ? null
      : normalizeChatValue(
          value,
          CHAT_MESSAGE_SPACING_MIN,
          CHAT_MESSAGE_SPACING_MAX,
        ),
  )
}

export function resetChatAppearance() {
  return updateSettings((settings) => {
    if (
      settings.chat.fontFamily === null &&
      settings.chat.fontSize === null &&
      settings.chat.fontWeight === null &&
      !settings.chat.messageDividers &&
      settings.chat.messageSpacing === null
    ) {
      return settings
    }

    return {
      ...settings,
      chat: {
        fontFamily: null,
        fontSize: null,
        fontWeight: null,
        messageDividers: false,
        messageSpacing: null,
      },
    }
  })
}

export function setShowClipDownloadButtons(visible: boolean) {
  return updateUiSetting('showClipDownloadButtons', visible)
}

export function setShowHiddenViewerCounts(visible: boolean) {
  return updateUiSetting('showHiddenViewerCounts', visible)
}

export function setShowStreamUptime(visible: boolean) {
  return updateUiSetting('showStreamUptime', visible)
}

export function setHideFollowingRecommendations(hidden: boolean) {
  return updateUiSetting('hideFollowingRecommendations', hidden)
}

export function setHideGamblingStreams(hidden: boolean) {
  return updateUiSetting('hideGamblingStreams', hidden)
}

export function setHideHomepageCarousel(hidden: boolean) {
  return updateUiSetting('hideHomepageCarousel', hidden)
}

export function setHideRecommendedChannels(hidden: boolean) {
  return updateUiSetting('hideRecommendedChannels', hidden)
}

function updateChatSetting<Key extends keyof ChatSettings>(
  key: Key,
  value: ChatSettings[Key],
) {
  return updateSettings((settings) => ({
    ...settings,
    chat: {
      ...settings.chat,
      [key]: value,
    },
  }))
}

function updateUiSetting<Key extends keyof UiSettings>(
  key: Key,
  value: UiSettings[Key],
) {
  return updateSettings((settings) => ({
    ...settings,
    ui: {
      ...settings.ui,
      [key]: value,
    },
  }))
}
