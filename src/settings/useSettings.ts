import { useEffect, useState } from 'preact/hooks'

import {
  getSettings,
  subscribeSettings,
  type Settings,
} from './settings'

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(getSettings)

  useEffect(() => subscribeSettings(setSettings), [])

  return settings
}
