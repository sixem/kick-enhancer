import { observeOutsideSubtrees } from '../../dom/observeOutsideSubtrees.ts'
import { type Dispose } from '../../lifecycle.ts'

const CHATROOM_SELECTOR = '#channel-chatroom'
const VISIBILITY_ATTRIBUTES = [
  'aria-hidden',
  'class',
  'data-aria-hidden',
  'hidden',
  'inert',
  'role',
  'style',
]

export function observeChatStatisticsDom(
  callback: (records: readonly MutationRecord[]) => void,
  ownerDocument: Document = document,
  createObserver: (callback: MutationCallback) => MutationObserver = (
    listener,
  ) => new MutationObserver(listener),
): Dispose {
  let chatrooms: Element[] = []
  let stopSurfaces: Dispose[] = []
  const ancestorsObserver = createObserver((records) => callback(records))

  function bindSurfaces() {
    for (const stop of stopSurfaces) stop()
    stopSurfaces = []
    ancestorsObserver.disconnect()
    chatrooms = [...ownerDocument.querySelectorAll(CHATROOM_SELECTOR)]
    const ancestors = new Set<Element>()

    for (const chatroom of chatrooms) {
      stopSurfaces.push(
        observeOutsideSubtrees(
          chatroom,
          ['chatroom-messages'],
          {
            attributes: true,
            attributeFilter: [
              ...VISIBILITY_ATTRIBUTES,
              'data-testid',
              'data-ke-native-chat-title',
            ],
            childList: true,
          },
          callback,
          createObserver,
        ),
      )
      for (
        let parent = chatroom.parentElement;
        parent;
        parent = parent.parentElement
      ) {
        ancestors.add(parent)
      }
    }
    for (const ancestor of ancestors) {
      ancestorsObserver.observe(ancestor, {
        attributes: true,
        attributeFilter: VISIBILITY_ATTRIBUTES,
      })
    }
  }

  const stopDiscovery = observeOutsideSubtrees(
    ownerDocument.documentElement,
    ['channel-chatroom'],
    { childList: true, attributes: true, attributeFilter: ['id'] },
    (records) => {
      const changed =
        chatrooms.some(
          (room) => !room.isConnected || room.id !== 'channel-chatroom',
        ) ||
        records.some((record) => {
          if (record.type === 'attributes') {
            return (record.target as Element).matches(CHATROOM_SELECTOR)
          }
          return [...record.addedNodes, ...record.removedNodes].some(
            (node) =>
              node.nodeType === 1 &&
              ((node as Element).matches(CHATROOM_SELECTOR) ||
                (node as Element).querySelector(CHATROOM_SELECTOR)),
          )
        })
      if (changed) {
        bindSurfaces()
        callback(records)
      }
    },
    createObserver,
  )
  bindSurfaces()

  return () => {
    stopDiscovery()
    ancestorsObserver.disconnect()
    for (const stop of stopSurfaces) stop()
    stopSurfaces = []
    chatrooms = []
  }
}
