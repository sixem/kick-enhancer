const COMPACT_COUNT_PATTERN =
  /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?\s*[km]?$/i

export function findStatusLabel(scope: ParentNode) {
  let best: HTMLElement | undefined
  let bestScore = 0

  for (const element of scope.querySelectorAll<HTMLElement>(
    'span, p, div',
  )) {
    if (
      element.closest(
        '[data-ke-viewer-count], [data-ke-stream-uptime]',
      ) ||
      element.querySelector(
        '[data-ke-viewer-count], [data-ke-stream-uptime]',
      )
    ) {
      continue
    }

    const text = element.textContent?.trim() ?? ''

    if (text.toLowerCase() !== 'live' && !isCompactCount(text)) {
      continue
    }

    let score = element.childElementCount === 0 ? 2 : 1
    const parentText = element.parentElement?.textContent ?? ''

    if (element.parentElement?.querySelector('.bg-green-500')) {
      score += 6
    }

    if (
      parentText.trim().length <= text.length + 8 ||
      element.parentElement?.classList.contains('items-center')
    ) {
      score += 2
    }

    if (score > bestScore) {
      best = element
      bestScore = score
    }
  }

  return best
}

export function formatViewerCount(viewerCount: number) {
  if (viewerCount < 1_000) {
    return String(viewerCount)
  }

  const divisor = viewerCount < 1_000_000 ? 1_000 : 1_000_000
  const suffix = viewerCount < 1_000_000 ? 'K' : 'M'
  const rounded = Math.round((viewerCount / divisor) * 10) / 10

  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}${suffix}`
}

export function isCompactCount(
  value: string | null | undefined,
) {
  return COMPACT_COUNT_PATTERN.test(value?.trim() ?? '')
}
