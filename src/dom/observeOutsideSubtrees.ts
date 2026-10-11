import { type Dispose } from '../lifecycle.ts'

type ObserverFactory = (callback: MutationCallback) => MutationObserver

// Exclusions use IDs so their appearance, replacement and renaming can be
// tracked without observing high-volume attributes inside those subtrees.
export function observeOutsideSubtrees(
  root: Element,
  excludedIds: readonly string[],
  options: Omit<MutationObserverInit, 'subtree'>,
  callback: (records: readonly MutationRecord[]) => void,
  createObserver: ObserverFactory = (listener) =>
    new MutationObserver(listener),
): Dispose {
  const ids = new Set(excludedIds)
  const boundaries = new Set<Element>()
  const excluded = new Set<Element>()
  let stopped = false
  const attributeFilter = options.attributes
    ? options.attributeFilter && [
        ...new Set([...options.attributeFilter, 'id']),
      ]
    : ['id']
  const observationOptions = {
    ...options,
    attributes: true,
    attributeFilter,
    childList: true,
  }

  const observer = createObserver((records) => {
    if (stopped) return

    const topologyChanged = records.some((record) => {
      if (record.type === 'attributes') {
        const target = record.target as Element
        return (
          record.attributeName === 'id' &&
          (excluded.has(target) || ids.has(target.id))
        )
      }
      return (
        record.type === 'childList' &&
        (boundaries.has(record.target as Element) ||
          [...record.addedNodes].some(containsExcludedElement))
      )
    })

    // Filter before rebinding: removed exclusion roots may no longer have the
    // same ID or ancestry, but their queued content records are still irrelevant.
    const relevant = records.filter((record) => {
      const target =
        record.target.nodeType === 1
          ? (record.target as Element)
          : record.target.parentElement
      if (
        record.type === 'attributes' &&
        record.attributeName === 'id' &&
        target &&
        (excluded.has(target) || ids.has(target.id))
      ) {
        return (
          options.attributes &&
          (!options.attributeFilter || options.attributeFilter.includes('id'))
        )
      }
      for (let ancestor = target; ancestor; ancestor = ancestor.parentElement) {
        if (excluded.has(ancestor) || ids.has(ancestor.id)) return false
        if (ancestor === root) break
      }
      if (record.type === 'attributes') {
        return (
          options.attributes &&
          (!options.attributeFilter ||
            options.attributeFilter.includes(record.attributeName ?? ''))
        )
      }
      return record.type === 'childList'
        ? options.childList
        : options.characterData
    })

    if (topologyChanged) bind()
    if (relevant.length > 0) callback(relevant)
  })

  function containsExcludedElement(node: Node) {
    if (node.nodeType !== 1) return false
    const element = node as Element
    return (
      ids.has(element.id) ||
      [...element.querySelectorAll('[id]')].some((child) => ids.has(child.id))
    )
  }

  function bind() {
    observer.disconnect()
    boundaries.clear()
    excluded.clear()
    for (const element of [root, ...root.querySelectorAll('[id]')]) {
      if (!ids.has(element.id)) continue
      excluded.add(element)
      for (
        let parent = element.parentElement;
        parent && root.contains(parent);
        parent = parent.parentElement
      ) {
        boundaries.add(parent)
        if (parent === root) break
      }
    }

    const observeBranch = (element: Element) => {
      if (excluded.has(element)) {
        observer.observe(element, { attributes: true, attributeFilter: ['id'] })
      } else if (boundaries.has(element)) {
        // Watch replacement of the excluded branch, but never its contents.
        observer.observe(element, { ...observationOptions, subtree: false })
        for (const child of element.childNodes) {
          if (child.nodeType === 1) {
            observeBranch(child as Element)
          } else if (options.characterData) {
            observer.observe(child, { characterData: true })
          }
        }
      } else {
        observer.observe(element, { ...observationOptions, subtree: true })
      }
    }
    observeBranch(root)
  }

  bind()
  return () => {
    stopped = true
    observer.disconnect()
    boundaries.clear()
    excluded.clear()
  }
}
