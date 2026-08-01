import { type Dispose } from '../../lifecycle'
import { observeSetting, type SettingsSelector } from '../../settings/settings'
import { applyStyleToggle } from './styleToggle'

type StyleSettingFeatureOptions = Readonly<{
  id: string
  selectEnabled: SettingsSelector<boolean>
  styles: string
}>

export function createStyleSettingFeature({
  id,
  selectEnabled,
  styles,
}: StyleSettingFeatureOptions) {
  let stopActiveFeature: Dispose | undefined

  return function startStyleSettingFeature(): Dispose {
    stopActiveFeature?.()

    let stopped = false
    const stopObserving = observeSetting(selectEnabled, (enabled) =>
      applyStyleToggle(id, styles, enabled),
    )
    const stop = () => {
      if (stopped) {
        return
      }

      stopped = true
      stopObserving()
      applyStyleToggle(id, styles, false)

      if (stopActiveFeature === stop) {
        stopActiveFeature = undefined
      }
    }

    stopActiveFeature = stop
    return stop
  }
}
