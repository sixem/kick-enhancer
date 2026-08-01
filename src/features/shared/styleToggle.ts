export function applyStyleToggle(id: string, styles: string, enabled: boolean) {
  const existingStyle = document.getElementById(id) as HTMLStyleElement | null

  if (!enabled) {
    existingStyle?.remove()
    return
  }

  if (existingStyle) {
    return
  }

  const style = document.createElement('style')
  style.id = id
  style.textContent = styles
  document.documentElement.append(style)
}
