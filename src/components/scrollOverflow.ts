export type ScrollOverflow = Readonly<{
  bottom: boolean
  top: boolean
}>

const EDGE_TOLERANCE = 2

export function calculateScrollOverflow(
  scrollTop: number,
  viewportHeight: number,
  contentHeight: number,
): ScrollOverflow {
  const maximumScrollTop = Math.max(
    0,
    contentHeight - viewportHeight,
  )
  const resolvedScrollTop = Math.min(
    maximumScrollTop,
    Math.max(0, scrollTop),
  )

  return {
    bottom:
      maximumScrollTop - resolvedScrollTop > EDGE_TOLERANCE,
    top: resolvedScrollTop > EDGE_TOLERANCE,
  }
}
