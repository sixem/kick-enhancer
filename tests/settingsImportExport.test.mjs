import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEFAULT_SETTINGS,
  parseSettingsFile,
  serializeSettings,
  SETTINGS_VERSION,
} from '../src/settings/settingsFormat.ts'

test('round-trips current settings without a compatibility warning', () => {
  const result = expectSuccessful(
    parseSettingsFile(serializeSettings(DEFAULT_SETTINGS)),
  )

  assert.deepEqual(result.settings, DEFAULT_SETTINGS)
  assert.equal(result.compatibilityWarning, false)
})

test('imports version 4 settings and defaults newer values', () => {
  const version4Ui = {
    ...DEFAULT_SETTINGS.ui,
    hideHomepageCarousel: true,
    rememberSidebarState: true,
    showHiddenViewerCounts: false,
  }
  delete version4Ui.showClipDownloadButtons

  const result = expectSuccessful(
    parseSettingsFile(
      JSON.stringify({
        chat: DEFAULT_SETTINGS.chat,
        ui: version4Ui,
        version: 4,
      }),
    ),
  )

  assert.equal(result.compatibilityWarning, true)
  assert.equal(result.settings.ui.hideHomepageCarousel, true)
  assert.equal(result.settings.ui.showClipDownloadButtons, true)
  assert.equal(result.settings.version, SETTINGS_VERSION)
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
        version: SETTINGS_VERSION + 1,
      }),
    ),
  )

  assert.equal(result.compatibilityWarning, true)
  assert.equal(result.settings.chat.fontFamily, null)
  assert.equal(result.settings.chat.fontSize, 24)
  assert.equal(result.settings.version, SETTINGS_VERSION)
})

test('rejects malformed and unrelated JSON', () => {
  assert.deepEqual(parseSettingsFile('{'), { ok: false })
  assert.deepEqual(
    parseSettingsFile('{"version":5,"unrelated":true}'),
    { ok: false },
  )
})

function expectSuccessful(result) {
  assert.equal(result.ok, true)

  if (!result.ok) {
    throw new Error('Expected valid settings.')
  }

  return result
}
