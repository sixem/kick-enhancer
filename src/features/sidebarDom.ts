import { observeOutsideSubtrees } from '../dom/observeOutsideSubtrees.ts'
import { type Dispose } from '../lifecycle.ts'

export function findSidebarLayout(ownerDocument: Document = document) {
  return (
    ownerDocument.querySelector<HTMLElement>(
      '[data-sidebar][data-chat][data-theatre]',
    ) ?? ownerDocument.querySelector<HTMLElement>('[data-sidebar]')
  )
}

export function observeSidebarLayout(
  callbacks: Readonly<{
    onLayoutChange: (layout: HTMLElement | null) => void
    onStateChange: () => void
    onContentChange: () => void
  }>,
  ownerDocument: Document = document,
  createObserver: (callback: MutationCallback) => MutationObserver = (
    listener,
  ) => new MutationObserver(listener),
): Dispose {
  let layout: HTMLElement | null = null
  const layoutObserver = createObserver(() => {
    if (layout?.isConnected && layout.hasAttribute('data-sidebar')) {
      callbacks.onStateChange()
    }
  })

  function bindLayout() {
    if (!layout?.isConnected || !layout.hasAttribute('data-sidebar')) {
      const nextLayout = findSidebarLayout(ownerDocument)
      if (nextLayout !== layout) {
        layoutObserver.disconnect()
        layout = nextLayout
        if (layout) {
          layoutObserver.observe(layout, {
            attributes: true,
            attributeFilter: ['data-sidebar'],
          })
        }
        callbacks.onLayoutChange(layout)
      }
    }
    // The collapse button can be mounted after its containing layout.
    callbacks.onContentChange()
  }

  const stopDiscovery = observeOutsideSubtrees(
    ownerDocument.documentElement,
    ['channel-chatroom'],
    { childList: true, attributes: true, attributeFilter: ['data-sidebar'] },
    bindLayout,
    createObserver,
  )
  bindLayout()

  return () => {
    stopDiscovery()
    layoutObserver.disconnect()
    layout = null
  }
}
