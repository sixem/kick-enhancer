import { type Dispose } from '../../lifecycle'
import { observeSetting, type Settings } from '../../settings/settings'
import { createChatAppearanceStyles } from './styles'

const STYLE_ID = 'kick-enhancer-chat-appearance'

let stopActiveFeature: Dispose | undefined

export function startChatAppearance(): Dispose {
  stopActiveFeature?.()

  let stopped = false
  const stopObserving = observeSetting(
    (settings) => settings.chat,
    applyChatAppearance,
  )
  const stop = () => {
    if (stopped) {
      return
    }

    stopped = true
    stopObserving()
    document.getElementById(STYLE_ID)?.remove()

    if (stopActiveFeature === stop) {
      stopActiveFeature = undefined
    }
  }

  stopActiveFeature = stop
  return stop
}

function applyChatAppearance(settings: Settings['chat']) {
  const styles = createChatAppearanceStyles(settings)
  const existingStyle = document.getElementById(
    STYLE_ID,
  ) as HTMLStyleElement | null

  if (!styles) {
    existingStyle?.remove()
    return
  }

  if (existingStyle) {
    if (existingStyle.textContent !== styles) {
      existingStyle.textContent = styles
    }

    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = styles
  document.documentElement.append(style)
}
