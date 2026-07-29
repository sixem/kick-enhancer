export type CountElementState = Readonly<{
  className: string
  count: number
  slug: string
  target: string
  text?: string
}>

export function updateCountElementState(
  element: HTMLElement,
  state: CountElementState,
) {
  const count = String(state.count)
  const contentChanged =
    element.dataset.keCount !== count ||
    element.dataset.keSlug !== state.slug ||
    element.dataset.keTarget !== state.target

  setClassName(element, state.className)
  setDatasetValue(element, 'keCount', count)
  setDatasetValue(element, 'keSlug', state.slug)
  setDatasetValue(element, 'keTarget', state.target)
  setDatasetValue(element, 'keViewerCount', '')

  if (
    state.text !== undefined &&
    element.textContent !== state.text
  ) {
    element.textContent = state.text
  }

  const accessibleLabel = `${state.count.toLocaleString()} viewers`

  if (element.getAttribute('aria-label') !== accessibleLabel) {
    element.setAttribute('aria-label', accessibleLabel)
  }

  return contentChanged
}

function setClassName(element: HTMLElement, value: string) {
  if (element.className !== value) {
    element.className = value
  }
}

function setDatasetValue(
  element: HTMLElement,
  key: string,
  value: string,
) {
  if (element.dataset[key] !== value) {
    element.dataset[key] = value
  }
}
