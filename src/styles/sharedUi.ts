import styles from './shared-ui.scss?inline'

const STYLE_ID = 'kick-enhancer-shared-ui-styles'

export function installSharedUiStyles() {
  if (document.getElementById(STYLE_ID)) {
    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = styles
  document.documentElement.append(style)
}
