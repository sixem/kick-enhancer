import type { ComponentChildren, JSX } from 'preact'
import { useCallback, useEffect, useRef } from 'preact/hooks'

import { calculateScrollOverflow } from './scrollOverflow'
import { joinClassNames } from './utils'

export type ScrollbarVariant = 'compact' | 'default' | 'overlay'
export type ScrollAreaHeightMode = 'content' | 'fill'

type ScrollAreaProps = Readonly<{
  children: ComponentChildren
  className?: string
  contentClassName?: string
  heightMode?: ScrollAreaHeightMode
  minimumThumbSize?: number
  onViewportChange?: (viewport: HTMLDivElement | null) => void
  onViewportMetricsChange?: (viewport: HTMLDivElement) => void
  onViewportScroll?: (viewport: HTMLDivElement) => void
  scrollIndicators?: boolean
  scrollbarVariant?: ScrollbarVariant
  viewportAriaLabel?: string
  viewportClassName?: string
  viewportTabIndex?: number
}>

// The viewport remains the native scroll container; the custom thumb only
// mirrors and controls its scroll position.
export function ScrollArea({
  children,
  className,
  contentClassName,
  heightMode = 'fill',
  minimumThumbSize = 24,
  onViewportChange,
  onViewportMetricsChange,
  onViewportScroll,
  scrollIndicators = false,
  scrollbarVariant = 'default',
  viewportAriaLabel,
  viewportClassName,
  viewportTabIndex = 0,
}: ScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const thumbRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const thumbSizeRef = useRef(minimumThumbSize)
  const thumbVisibleRef = useRef(false)
  const dragRef = useRef<{
    pointerId: number
    startClientY: number
    startScrollTop: number
  } | null>(null)

  const updateThumb = useCallback(() => {
    const viewport = viewportRef.current
    const root = rootRef.current
    const thumb = thumbRef.current

    if (!viewport || !root || !thumb) {
      return
    }

    const viewportHeight = viewport.clientHeight
    const contentHeight = viewport.scrollHeight
    const maximumScrollTop = Math.max(0, contentHeight - viewportHeight)
    const overflow = calculateScrollOverflow(
      viewport.scrollTop,
      viewportHeight,
      contentHeight,
    )

    root.toggleAttribute('data-overflow-top', scrollIndicators && overflow.top)
    root.toggleAttribute(
      'data-overflow-bottom',
      scrollIndicators && overflow.bottom,
    )

    if (viewportHeight <= 0 || maximumScrollTop <= 0) {
      thumbVisibleRef.current = false
      thumb.removeAttribute('data-visible')
      thumb.style.height = ''
      thumb.style.transform = ''
      return
    }

    const minimumSize = Math.max(1, minimumThumbSize)
    const nextSize = Math.min(
      viewportHeight,
      Math.max(
        minimumSize,
        Math.round((viewportHeight / contentHeight) * viewportHeight),
      ),
    )
    const maximumOffset = Math.max(0, viewportHeight - nextSize)
    const nextOffset = Math.round(
      (viewport.scrollTop / maximumScrollTop) * maximumOffset,
    )

    thumbSizeRef.current = nextSize
    thumbVisibleRef.current = true
    thumb.dataset.visible = 'true'
    thumb.style.height = `${nextSize}px`
    thumb.style.transform = `translateY(${nextOffset}px)`
  }, [minimumThumbSize, scrollIndicators])

  const scheduleThumbUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) {
      return
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null
      updateThumb()
    })
  }, [updateThumb])

  const setViewport = useCallback(
    (viewport: HTMLDivElement | null) => {
      viewportRef.current = viewport
      onViewportChange?.(viewport)
    },
    [onViewportChange],
  )

  const handleScroll = useCallback(
    (event: JSX.TargetedEvent<HTMLDivElement>) => {
      onViewportScroll?.(event.currentTarget)
      scheduleThumbUpdate()
    },
    [onViewportScroll, scheduleThumbUpdate],
  )

  useEffect(() => {
    const viewport = viewportRef.current
    const content = contentRef.current
    const handleMetricsChange = () => {
      scheduleThumbUpdate()

      if (viewportRef.current) {
        onViewportMetricsChange?.(viewportRef.current)
      }
    }
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(handleMetricsChange)

    handleMetricsChange()

    if (viewport) {
      resizeObserver?.observe(viewport)
    }

    if (content) {
      resizeObserver?.observe(content)
    }

    return () => {
      resizeObserver?.disconnect()

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [onViewportMetricsChange, scheduleThumbUpdate])

  const finishDrag = useCallback(
    (event: JSX.TargetedPointerEvent<HTMLDivElement>) => {
      if (!dragRef.current || event.pointerId !== dragRef.current.pointerId) {
        return
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }

      dragRef.current = null
      rootRef.current?.classList.remove('is-dragging')
    },
    [],
  )

  const handleThumbPointerDown = useCallback(
    (event: JSX.TargetedPointerEvent<HTMLDivElement>) => {
      const viewport = viewportRef.current

      if (event.button !== 0 || !viewport || !thumbVisibleRef.current) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      event.currentTarget.setPointerCapture(event.pointerId)

      dragRef.current = {
        pointerId: event.pointerId,
        startClientY: event.clientY,
        startScrollTop: viewport.scrollTop,
      }
      rootRef.current?.classList.add('is-dragging')
    },
    [],
  )

  const handleThumbPointerMove = useCallback(
    (event: JSX.TargetedPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      const viewport = viewportRef.current

      if (!drag || drag.pointerId !== event.pointerId || !viewport) {
        return
      }

      const maximumScrollTop = Math.max(
        0,
        viewport.scrollHeight - viewport.clientHeight,
      )
      const maximumThumbOffset = Math.max(
        1,
        viewport.clientHeight - thumbSizeRef.current,
      )
      const pointerDelta = event.clientY - drag.startClientY
      const scrollDelta = (pointerDelta * maximumScrollTop) / maximumThumbOffset

      viewport.scrollTop = Math.min(
        maximumScrollTop,
        Math.max(0, drag.startScrollTop + scrollDelta),
      )
    },
    [],
  )

  return (
    <div
      className={joinClassNames('ke-scroll-area', className)}
      data-height={heightMode}
      data-scroll-indicators={scrollIndicators ? 'true' : undefined}
      data-scrollbar={scrollbarVariant}
      ref={rootRef}
    >
      <div
        aria-label={viewportAriaLabel}
        className={joinClassNames(
          'ke-scroll-area__viewport',
          viewportClassName,
        )}
        onScroll={handleScroll}
        ref={setViewport}
        tabIndex={viewportTabIndex}
      >
        <div
          className={joinClassNames(
            'ke-scroll-area__content',
            contentClassName,
          )}
          ref={contentRef}
        >
          {children}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="ke-scroll-area__thumb"
        onLostPointerCapture={finishDrag}
        onPointerCancel={finishDrag}
        onPointerDown={handleThumbPointerDown}
        onPointerMove={handleThumbPointerMove}
        onPointerUp={finishDrag}
        ref={thumbRef}
      />
    </div>
  )
}
