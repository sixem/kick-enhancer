export type ListViewRange = Readonly<{
  end: number
  start: number
}>

export function calculateListViewRange(
  itemCount: number,
  rowHeight: number,
  overscan: number,
  scrollTop: number,
  viewportHeight: number,
): ListViewRange {
  if (itemCount <= 0) {
    return { end: 0, start: 0 }
  }

  const safeRowHeight = Math.max(1, rowHeight)
  const safeOverscan = Number.isFinite(overscan)
    ? Math.max(0, Math.floor(overscan))
    : 0
  const firstVisible = Math.floor(Math.max(0, scrollTop) / safeRowHeight)
  const afterLastVisible = Math.ceil(
    (Math.max(0, scrollTop) + Math.max(0, viewportHeight)) / safeRowHeight,
  )

  return {
    end: Math.min(
      itemCount,
      Math.max(firstVisible + 1, afterLastVisible) + safeOverscan,
    ),
    start: Math.min(itemCount, Math.max(0, firstVisible - safeOverscan)),
  }
}
