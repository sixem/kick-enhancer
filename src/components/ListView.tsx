import type { ComponentChildren, JSX } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'

import {
  calculateListViewRange,
  type ListViewRange,
} from './listViewVirtualization'
import { ScrollArea, type ScrollAreaHeightMode } from './ScrollArea'
import { joinClassNames } from './utils'

export type ListViewColumn<TItem> = Readonly<{
  align?: 'center' | 'end' | 'start'
  cellClassName?: string
  header: ComponentChildren
  id: string
  renderCell: (item: TItem) => ComponentChildren
  width: string
}>

export type ListViewProps<TItem> = Readonly<{
  ariaLabel: string
  ariaLive?: 'assertive' | 'off' | 'polite'
  className?: string
  columns: readonly ListViewColumn<TItem>[]
  emptyContent?: ComponentChildren
  getItemKey: (item: TItem, index: number) => number | string
  getRowAriaLabel?: (item: TItem) => string
  getRowClassName?: (item: TItem) => string | undefined
  heightMode?: ScrollAreaHeightMode
  items: readonly TItem[]
  onItemActivate?: (item: TItem) => void
  overscan?: number
  rowHeight?: number
}>

type ListViewRowProps<TItem> = Readonly<{
  ariaLabel?: string
  className?: string
  columns: readonly ListViewColumn<TItem>[]
  gridTemplateColumns: string
  index: number
  item: TItem
  itemCount: number
  onItemActivate?: (item: TItem) => void
  rowHeight?: number
}>

function useListViewRange(
  itemCount: number,
  overscan: number,
  rowHeight: number | undefined,
) {
  const virtualized = rowHeight !== undefined
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const updateRangeRef = useRef<() => void>(() => undefined)
  const [range, setRange] = useState<ListViewRange>(() =>
    virtualized
      ? calculateListViewRange(itemCount, rowHeight, overscan, 0, 0)
      : { end: itemCount, start: 0 },
  )

  const updateRange = useCallback(() => {
    const viewport = viewportRef.current
    const nextRange =
      virtualized && viewport
        ? calculateListViewRange(
            itemCount,
            rowHeight,
            overscan,
            viewport.scrollTop,
            viewport.clientHeight,
          )
        : { end: itemCount, start: 0 }

    setRange((current) =>
      current.start === nextRange.start && current.end === nextRange.end
        ? current
        : nextRange,
    )
  }, [itemCount, overscan, rowHeight, virtualized])

  updateRangeRef.current = updateRange

  const scheduleRangeUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) {
      return
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null
      updateRangeRef.current()
    })
  }, [])

  const setViewport = useCallback(
    (viewport: HTMLDivElement | null) => {
      viewportRef.current = viewport

      if (viewport && virtualized) {
        scheduleRangeUpdate()
      }
    },
    [scheduleRangeUpdate, virtualized],
  )

  useEffect(() => {
    if (virtualized) {
      scheduleRangeUpdate()
    }
  }, [scheduleRangeUpdate, updateRange, virtualized])

  useEffect(() => {
    const viewport = viewportRef.current

    if (!virtualized || !viewport || typeof ResizeObserver === 'undefined') {
      return
    }

    const resizeObserver = new ResizeObserver(scheduleRangeUpdate)
    resizeObserver.observe(viewport)

    return () => resizeObserver.disconnect()
  }, [scheduleRangeUpdate, virtualized])

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    },
    [],
  )

  return {
    range,
    scheduleRangeUpdate,
    setViewport,
    virtualized,
  }
}

function ListViewRowComponent<TItem>({
  ariaLabel,
  className,
  columns,
  gridTemplateColumns,
  index,
  item,
  itemCount,
  onItemActivate,
  rowHeight,
}: ListViewRowProps<TItem>) {
  const virtualized = rowHeight !== undefined
  const rowStyle = {
    gridTemplateColumns,
    ...(virtualized
      ? {
          height: `${rowHeight}px`,
          transform: `translateY(${index * rowHeight}px)`,
        }
      : {}),
  } satisfies JSX.CSSProperties

  return (
    <div
      aria-label={ariaLabel}
      aria-rowindex={index + 2}
      className={joinClassNames(
        'ke-list-view__row',
        onItemActivate && 'is-interactive',
        className,
      )}
      data-last-row={index === itemCount - 1 ? 'true' : undefined}
      data-virtualized={virtualized ? 'true' : undefined}
      onClick={onItemActivate ? () => onItemActivate(item) : undefined}
      onKeyDown={
        onItemActivate
          ? (event) => {
              if (event.key !== 'Enter' && event.key !== ' ') {
                return
              }

              event.preventDefault()
              onItemActivate(item)
            }
          : undefined
      }
      role="row"
      style={rowStyle}
      tabIndex={onItemActivate ? 0 : undefined}
    >
      {columns.map((column) => (
        <div
          className={joinClassNames('ke-list-view__cell', column.cellClassName)}
          data-align={column.align}
          data-column-id={column.id}
          key={column.id}
          role="cell"
        >
          <div className="ke-list-view__cell-content">
            {column.renderCell(item)}
          </div>
        </div>
      ))}
    </div>
  )
}

const ListViewRow = memo(ListViewRowComponent)

export function ListView<TItem>({
  ariaLabel,
  ariaLive = 'off',
  className,
  columns,
  emptyContent = 'No items',
  getItemKey,
  getRowAriaLabel,
  getRowClassName,
  heightMode = 'fill',
  items,
  onItemActivate,
  overscan = 8,
  rowHeight,
}: ListViewProps<TItem>) {
  if (
    rowHeight !== undefined &&
    (!Number.isFinite(rowHeight) || rowHeight <= 0)
  ) {
    throw new Error('ListView rowHeight must be a positive finite number.')
  }

  const gridTemplateColumns = useMemo(
    () => columns.map((column) => column.width).join(' '),
    [columns],
  )
  const rowStyle = {
    gridTemplateColumns,
  } satisfies JSX.CSSProperties
  const { range, scheduleRangeUpdate, setViewport, virtualized } =
    useListViewRange(items.length, overscan, rowHeight)
  const rangeStart = Math.min(items.length, range.start)
  const rangeEnd = Math.min(items.length, Math.max(rangeStart, range.end))
  const visibleItems = virtualized ? items.slice(rangeStart, rangeEnd) : items
  const bodyStyle =
    virtualized && rowHeight !== undefined
      ? ({
          height: `${items.length * rowHeight}px`,
        } satisfies JSX.CSSProperties)
      : undefined

  return (
    <div
      aria-colcount={columns.length}
      aria-label={ariaLabel}
      aria-rowcount={items.length + 1}
      className={joinClassNames('ke-list-view', className)}
      data-empty={items.length === 0 ? 'true' : 'false'}
      role="table"
    >
      <div className="ke-list-view__header-group" role="rowgroup">
        <div
          aria-rowindex={1}
          className="ke-list-view__header"
          role="row"
          style={rowStyle}
        >
          {columns.map((column) => (
            <div
              className="ke-list-view__header-cell"
              data-align={column.align}
              data-column-id={column.id}
              key={column.id}
              role="columnheader"
            >
              <span className="ke-list-view__header-label">
                {column.header}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ScrollArea
        className="ke-list-view__scroll"
        contentClassName="ke-list-view__scroll-content"
        heightMode={heightMode}
        onViewportChange={setViewport}
        onViewportScroll={virtualized ? scheduleRangeUpdate : undefined}
        scrollIndicators
        scrollbarVariant="compact"
        viewportAriaLabel={`${ariaLabel} rows`}
        viewportClassName="ke-list-view__viewport"
        viewportTabIndex={onItemActivate ? -1 : 0}
      >
        {/* Virtual rows churn while scrolling, so only announce their stable total. */}
        <div
          aria-live={virtualized ? 'off' : ariaLive}
          className="ke-list-view__body"
          data-virtualized={virtualized ? 'true' : undefined}
          role="rowgroup"
          style={bodyStyle}
        >
          {items.length === 0 ? (
            <div className="ke-list-view__empty" role="status">
              {emptyContent}
            </div>
          ) : (
            visibleItems.map((item, visibleIndex) => {
              const index = virtualized
                ? rangeStart + visibleIndex
                : visibleIndex

              return (
                <ListViewRow
                  ariaLabel={getRowAriaLabel?.(item)}
                  className={getRowClassName?.(item)}
                  columns={columns}
                  gridTemplateColumns={gridTemplateColumns}
                  index={index}
                  item={item}
                  itemCount={items.length}
                  key={getItemKey(item, index)}
                  onItemActivate={onItemActivate}
                  rowHeight={rowHeight}
                />
              )
            })
          )}
        </div>
        {virtualized && ariaLive !== 'off' ? (
          <span
            aria-atomic="true"
            aria-live={ariaLive}
            className="ke-list-view__live-status"
          >
            {items.length} {items.length === 1 ? 'row' : 'rows'}
          </span>
        ) : null}
      </ScrollArea>
    </div>
  )
}
