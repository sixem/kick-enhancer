import { GM } from '$'

import { createLogger } from '../logging/logger'
import {
  DEFAULT_SETTINGS,
  parseSettings,
  type Settings,
} from './settingsFormat'
import { createSettingsPersistence } from './settingsPersistence'

export * from './settingsFormat'

type SettingsListener = (settings: Settings) => void
export type SettingsSelector<Value> = (settings: Settings) => Value

const SETTINGS_KEY = 'settings'
const log = createLogger('settings')

const listeners = new Set<SettingsListener>()
let currentSettings = DEFAULT_SETTINGS
let persistenceLifecycleInstalled = false
const persistence = createSettingsPersistence({
  onError: (error) => {
    log.error('Save failed', error)
  },
  write: (serializedSettings) => GM.setValue(SETTINGS_KEY, serializedSettings),
})

function notifyListeners() {
  for (const listener of listeners) {
    listener(currentSettings)
  }
}

export async function initializeSettings() {
  installPersistenceLifecycle()

  try {
    const storedSettings = await GM.getValue(SETTINGS_KEY, '')
    currentSettings = storedSettings
      ? parseSettings(JSON.parse(storedSettings))
      : DEFAULT_SETTINGS
  } catch (error) {
    log.warn('Load failed; using defaults', error)
    currentSettings = DEFAULT_SETTINGS
  }
}

export function getSettings() {
  return currentSettings
}

export function resetSettings() {
  return updateSettings(() => DEFAULT_SETTINGS)
}

export function replaceSettings(settings: Settings) {
  return updateSettings(() => settings)
}

export function subscribeSettings(listener: SettingsListener) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

// Emits the current selection synchronously, then only emits when it changes.
export function observeSetting<Value>(
  selector: SettingsSelector<Value>,
  listener: (value: Value) => void,
) {
  let currentValue = selector(currentSettings)
  listener(currentValue)

  return subscribeSettings((settings) => {
    const nextValue = selector(settings)

    if (Object.is(currentValue, nextValue)) {
      return
    }

    currentValue = nextValue
    listener(nextValue)
  })
}

export function updateSettings(update: (settings: Settings) => Settings) {
  const nextSettings = update(currentSettings)

  if (nextSettings === currentSettings) {
    return persistence.whenIdle()
  }

  currentSettings = nextSettings
  notifyListeners()

  const serializedSettings = JSON.stringify(currentSettings)
  return persistence.schedule(serializedSettings)
}

function installPersistenceLifecycle() {
  if (persistenceLifecycleInstalled) {
    return
  }

  persistenceLifecycleInstalled = true
  window.addEventListener('pagehide', flushPersistence)
  document.addEventListener('visibilitychange', handleVisibilityChange)
}

function flushPersistence() {
  void persistence.flush()
}

function handleVisibilityChange() {
  if (document.hidden) {
    flushPersistence()
  }
}
