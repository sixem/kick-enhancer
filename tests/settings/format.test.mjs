import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEFAULT_SETTINGS,
  normalizeDeletedMessageCacheSize,
  parseSettingsFile,
  serializeSettings,
} from '../../src/settings/settingsFormat.ts'

test('round-trips current settings without a compatibility warning', () => {
  const result = expectSuccessful(
    parseSettingsFile(serializeSettings(DEFAULT_SETTINGS)),
  )

  assert.deepEqual(result.settings, DEFAULT_SETTINGS)
  assert.equal(result.compatibilityWarning, false)
  assert.equal(result.settings.chat.showDeletedMessages, false)
  assert.equal(result.settings.chat.deletedMessageCacheSize, 250)
})

test('round-trips non-default settings without a compatibility warning', () => {
  const settings = {
    ...DEFAULT_SETTINGS,
    chat: {
      ...DEFAULT_SETTINGS.chat,
      deletedMessageCacheSize: 500,
      showDeletedMessages: true,
    },
    ui: {
      ...DEFAULT_SETTINGS.ui,
      hideChatLeaderboard: true,
    },
  }
  const result = expectSuccessful(
    parseSettingsFile(serializeSettings(settings)),
  )

  assert.deepEqual(result.settings, settings)
  assert.equal(result.compatibilityWarning, false)
})

test('imports older settings and defaults newer values', () => {
  const result = expectSuccessful(
    parseSettingsFile(
      JSON.stringify({
        chat: {
          fontFamily: null,
          fontSize: null,
          fontWeight: null,
          messageDividers: false,
          messageSpacing: null,
          showChatStatistics: true,
        },
        ui: {
          hideChatLeaderboard: false,
          hideFollowingRecommendations: false,
          hideGamblingStreams: false,
          hideHomepageCarousel: true,
          hideRecommendedChannels: false,
          rememberSidebarState: true,
          showClipDownloadButtons: true,
          showHiddenViewerCounts: false,
          showStreamUptime: false,
          sidebarCollapsed: false,
        },
        version: 7,
      }),
    ),
  )

  assert.equal(result.compatibilityWarning, true)
  assert.equal(result.settings.ui.hideChatLeaderboard, false)
  assert.equal(result.settings.ui.hideHomepageCarousel, true)
  assert.equal(result.settings.ui.showClipDownloadButtons, true)
  assert.equal(result.settings.chat.showChatStatistics, true)
  assert.equal(result.settings.chat.showDeletedMessages, false)
  assert.equal(result.settings.chat.deletedMessageCacheSize, 250)
  assert.equal(result.settings.version, 8)
})

test('bounds and steps the deleted-message cache size', () => {
  assert.equal(normalizeDeletedMessageCacheSize(1), 50)
  assert.equal(normalizeDeletedMessageCacheSize(276), 300)
  assert.equal(normalizeDeletedMessageCacheSize(5_000), 1_000)
  assert.equal(normalizeDeletedMessageCacheSize(Number.NaN), 250)
})

test('normalizes invalid values and ignores unknown settings', () => {
  const result = expectSuccessful(
    parseSettingsFile(
      JSON.stringify({
        ...DEFAULT_SETTINGS,
        chat: {
          ...DEFAULT_SETTINGS.chat,
          fontFamily: 'comic-sans',
          fontSize: 99,
        },
        futureSetting: true,
        version: 9,
      }),
    ),
  )

  assert.equal(result.compatibilityWarning, true)
  assert.equal(result.settings.chat.fontFamily, null)
  assert.equal(result.settings.chat.fontSize, 24)
  assert.equal(result.settings.version, 8)
})

test('rejects malformed and unrelated JSON', () => {
  assert.deepEqual(parseSettingsFile('{'), { ok: false })
  assert.deepEqual(parseSettingsFile('{"version":5,"unrelated":true}'), {
    ok: false,
  })
})

function expectSuccessful(result) {
  assert.equal(result.ok, true)

  if (!result.ok) {
    throw new Error('Expected valid settings.')
  }

  return result
}
