import type { ComponentChildren, JSX } from 'preact'
import { useId, useRef, useState } from 'preact/hooks'

import { ScrollArea } from './ScrollArea'
import { joinClassNames } from './utils'

export type TabItem = Readonly<{
  content: ComponentChildren
  contentClassName?: string
  disabled?: boolean
  id: string
  label: ComponentChildren
  panelAriaLabel?: string
}>

type TabsProps = Readonly<{
  ariaLabel: string
  className?: string
  defaultValue?: string
  onChange?: (value: string) => void
  panelClassName?: string
  tabs: readonly TabItem[]
  value?: string
}>

function findEnabledTabIndex(
  tabs: readonly TabItem[],
  startIndex: number,
  direction: -1 | 1,
) {
  for (let offset = 1; offset <= tabs.length; offset += 1) {
    const index = (startIndex + direction * offset + tabs.length) % tabs.length

    if (!tabs[index].disabled) {
      return index
    }
  }

  return -1
}

function findEdgeTabIndex(tabs: readonly TabItem[], fromEnd: boolean) {
  const start = fromEnd ? tabs.length - 1 : 0
  const end = fromEnd ? -1 : tabs.length
  const step = fromEnd ? -1 : 1

  for (let index = start; index !== end; index += step) {
    if (!tabs[index].disabled) {
      return index
    }
  }

  return -1
}

export function Tabs({
  ariaLabel,
  className,
  defaultValue,
  onChange,
  panelClassName,
  tabs,
  value,
}: TabsProps) {
  const instanceId = useId()
  const tabButtonsRef = useRef<Array<HTMLButtonElement | null>>([])
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const controlled = value !== undefined
  const requestedValue = controlled ? value : uncontrolledValue
  let selectedIndex = tabs.findIndex(
    (tab) => !tab.disabled && tab.id === requestedValue,
  )

  if (selectedIndex === -1) {
    selectedIndex = tabs.findIndex((tab) => !tab.disabled)
  }

  const selectTab = (index: number) => {
    const tab = tabs[index]

    if (!tab || tab.disabled) {
      return
    }

    if (!controlled) {
      setUncontrolledValue(tab.id)
    }

    if (tab.id !== requestedValue) {
      onChange?.(tab.id)
    }
  }

  const handleKeyDown = (
    event: JSX.TargetedKeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex = -1

    if (event.key === 'ArrowLeft') {
      nextIndex = findEnabledTabIndex(tabs, currentIndex, -1)
    } else if (event.key === 'ArrowRight') {
      nextIndex = findEnabledTabIndex(tabs, currentIndex, 1)
    } else if (event.key === 'Home') {
      nextIndex = findEdgeTabIndex(tabs, false)
    } else if (event.key === 'End') {
      nextIndex = findEdgeTabIndex(tabs, true)
    }

    if (nextIndex === -1) {
      return
    }

    event.preventDefault()
    selectTab(nextIndex)
    tabButtonsRef.current[nextIndex]?.focus()
  }

  return (
    <div className={joinClassNames('ke-tabs', className)}>
      <div
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        className="ke-tabs__list"
        role="tablist"
      >
        {tabs.map((tab, index) => {
          const selected = index === selectedIndex

          return (
            <button
              aria-controls={`${instanceId}-panel-${index}`}
              aria-selected={selected}
              className="ke-tabs__tab"
              disabled={tab.disabled}
              id={`${instanceId}-tab-${index}`}
              key={tab.id}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(button) => {
                tabButtonsRef.current[index] = button
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Keep panels mounted so tab-local state survives switching. */}
      {tabs.map((tab, index) => {
        const selected = index === selectedIndex

        return (
          <div
            aria-labelledby={`${instanceId}-tab-${index}`}
            className={joinClassNames('ke-tabs__panel', panelClassName)}
            hidden={!selected}
            id={`${instanceId}-panel-${index}`}
            key={tab.id}
            role="tabpanel"
          >
            <ScrollArea
              className="ke-tabs__scroll"
              contentClassName={joinClassNames(
                'ke-tabs__panel-content',
                tab.contentClassName,
              )}
              scrollIndicators
              scrollbarVariant="overlay"
              viewportAriaLabel={
                tab.panelAriaLabel ??
                (typeof tab.label === 'string'
                  ? `${tab.label} settings`
                  : undefined)
              }
              viewportTabIndex={selected ? 0 : -1}
            >
              {tab.content}
            </ScrollArea>
          </div>
        )
      })}
    </div>
  )
}
