import { type Dispose } from '../../lifecycle.ts'
import { type KickChatEvent } from '../chatStatistics/types.ts'

const CHATROOM_SELECTOR = '#channel-chatroom'
const MESSAGES_SELECTOR = '#chatroom-messages'
const ROW_SELECTOR = '[data-index]'
const REACT_PROPS_PREFIX = '__reactProps$'
const RESTORED_CLASS = 'ke-restored-deleted-message'

type CachedMessage = {
  content: string
  deleted: boolean
}

type ChatTarget = {
  chatroom: HTMLElement
  surface: HTMLElement | null
}

export type ChatEventSource = Readonly<{
  subscribeChatEvents: (listener: (event: KickChatEvent) => void) => Dispose
}>

type MutationObserverFactory = (callback: MutationCallback) => MutationObserver

export class DeletedMessagesController {
  readonly #document: Document
  readonly #createMutationObserver: MutationObserverFactory
  readonly #messages = new Map<string, CachedMessage>()
  readonly #source: ChatEventSource
  #activeChatroomId: string | null = null
  #capacity = 0
  #chatroom: HTMLElement | null = null
  #enabled = false
  #observer: MutationObserver | undefined
  #stopEvents: Dispose | undefined
  #surface: HTMLElement | null = null

  constructor(
    source: ChatEventSource,
    ownerDocument: Document = document,
    createMutationObserver: MutationObserverFactory = (callback) => {
      const MutationObserverConstructor =
        ownerDocument.defaultView?.MutationObserver ?? MutationObserver
      return new MutationObserverConstructor(callback)
    },
  ) {
    this.#createMutationObserver = createMutationObserver
    this.#document = ownerDocument
    this.#source = source
  }

  setCapacity(capacity: number) {
    this.#capacity = Math.max(0, Math.trunc(capacity))
    this.#evictOverflow()

    if (this.#enabled) {
      this.#reconcileVisibleRows()
    }
  }

  setEnabled(enabled: boolean) {
    if (this.#enabled === enabled) {
      return
    }

    this.#enabled = enabled

    if (enabled) {
      this.#stopEvents = this.#source.subscribeChatEvents((event) => {
        this.#accept(event)
      })
      this.#bindSurface()
      return
    }

    this.#reset()
  }

  dispose() {
    this.setEnabled(false)
  }

  #accept(event: KickChatEvent) {
    if (event.type === 'sessionEnded') {
      return
    }

    this.#setChatroom(event.chatroomId)

    if (event.type === 'sessionStarted') {
      this.#bindSurface()
      return
    }

    if (event.type === 'message') {
      if (!this.#chatroom?.isConnected || !this.#surface?.isConnected) {
        this.#bindSurface()
      }

      if (
        event.content === null ||
        (event.messageType !== 'message' && event.messageType !== 'reply') ||
        this.#messages.has(event.messageId)
      ) {
        return
      }

      this.#messages.set(event.messageId, {
        content: event.content,
        deleted: false,
      })
      if (this.#evictOverflow()) {
        this.#reconcileVisibleRows()
      }
      return
    }

    if (event.type !== 'messageDeleted') {
      return
    }

    const message = this.#messages.get(event.messageId)

    if (!message) {
      return
    }

    message.deleted = true
    this.#bindSurface()
    this.#reconcileVisibleRows()
  }

  #setChatroom(chatroomId: string) {
    if (this.#activeChatroomId === chatroomId) {
      return
    }

    this.#activeChatroomId = chatroomId
    this.#messages.clear()
    removeRestoredMessages(this.#document)
  }

  #evictOverflow() {
    let deletedMessageEvicted = false

    while (this.#messages.size > this.#capacity) {
      const oldestId = this.#messages.keys().next().value

      if (oldestId === undefined) {
        break
      }

      deletedMessageEvicted ||= this.#messages.get(oldestId)?.deleted === true
      this.#messages.delete(oldestId)
    }

    return deletedMessageEvicted
  }

  #bindSurface() {
    const target = findChatTarget(this.#document)
    const chatroom = target?.chatroom ?? null
    const surface = target?.surface ?? null

    if (
      chatroom === this.#chatroom &&
      surface === this.#surface &&
      chatroom?.isConnected &&
      (!surface || surface.isConnected)
    ) {
      return
    }

    this.#observer?.disconnect()
    removeRestoredMessages(this.#surface)
    this.#chatroom = chatroom
    this.#surface = surface

    if (!chatroom) {
      return
    }

    this.#observer ??= this.#createMutationObserver((records) => {
      const previousSurface = this.#surface

      if (
        this.#chatroom?.isConnected &&
        previousSurface?.isConnected &&
        records.every((record) => previousSurface.contains(record.target))
      ) {
        this.#reconcileVisibleRows()
        return
      }

      this.#bindSurface()

      if (
        previousSurface === this.#surface &&
        records.some((record) => previousSurface?.contains(record.target))
      ) {
        this.#reconcileVisibleRows()
      }
    })
    this.#observer.observe(chatroom, {
      characterData: true,
      childList: true,
      subtree: true,
    })
    this.#reconcileVisibleRows()
  }

  #reconcileVisibleRows() {
    if (!this.#surface?.isConnected) {
      this.#bindSurface()
    }

    for (const row of this.#surface?.querySelectorAll<HTMLElement>(
      ROW_SELECTOR,
    ) ?? []) {
      reconcileDeletedMessageRow(row, this.#messages)
    }
  }

  #reset() {
    this.#stopEvents?.()
    this.#stopEvents = undefined
    this.#observer?.disconnect()
    this.#observer = undefined
    removeRestoredMessages(this.#document)
    this.#chatroom = null
    this.#surface = null
    this.#activeChatroomId = null
    this.#messages.clear()
  }
}

function getChatEntry(row: Element) {
  const reactPropsKey = Object.keys(row).find((key) =>
    key.startsWith(REACT_PROPS_PREFIX),
  )
  const props = reactPropsKey
    ? (row as unknown as Record<string, unknown>)[reactPropsKey]
    : undefined

  if (
    !isRecord(props) ||
    !isRecord(props.children) ||
    !isRecord(props.children.props) ||
    !isRecord(props.children.props.chatEntry)
  ) {
    return null
  }

  const chatEntry = props.children.props.chatEntry

  if (chatEntry.type !== 'message' || !isRecord(chatEntry.data)) {
    return null
  }

  const id = chatEntry.data.id

  if (typeof id !== 'string' || id.length === 0) {
    return null
  }

  const metadata = chatEntry.data.ui_metadata
  return {
    deleted:
      isRecord(metadata) &&
      typeof metadata.deleted === 'string' &&
      metadata.deleted.length > 0,
    id,
  }
}

export function reconcileDeletedMessageRow(
  row: HTMLElement,
  messages: ReadonlyMap<string, Readonly<CachedMessage>>,
) {
  const chatEntry = getChatEntry(row)
  const message = chatEntry ? messages.get(chatEntry.id) : undefined
  const restored = [...row.querySelectorAll<HTMLElement>(`.${RESTORED_CLASS}`)]
  const host =
    message?.deleted && chatEntry?.deleted ? findNativeDeletedHost(row) : null

  if (
    !message?.deleted ||
    !chatEntry?.deleted ||
    !host ||
    host.classList.contains('line-through') ||
    host.querySelector('.line-through')
  ) {
    for (const element of restored) {
      element.remove()
    }

    return
  }

  if (restored.length === 1 && restored[0]?.parentElement === host) {
    if (restored[0].textContent !== message.content) {
      restored[0].textContent = message.content
    }

    return
  }

  for (const element of restored) {
    element.remove()
  }

  const element = row.ownerDocument.createElement('span')
  element.className = `${RESTORED_CLASS} font-normal leading-[1.55]`
  element.textContent = message.content
  host.prepend(element)
}

function findChatTarget(ownerDocument: Document) {
  let fallback: ChatTarget | null = null
  let visible: ChatTarget | null = null

  for (const chatroom of ownerDocument.querySelectorAll<HTMLElement>(
    CHATROOM_SELECTOR,
  )) {
    const surface = chatroom.querySelector<HTMLElement>(MESSAGES_SELECTOR)
    const target = { chatroom, surface }
    fallback = target

    if (isVisible(chatroom)) {
      visible = target
    }
  }

  return visible ?? fallback
}

function findNativeDeletedHost(row: HTMLElement) {
  for (const span of row.querySelectorAll<HTMLElement>('span')) {
    if (
      span.classList.contains('text-neutral') &&
      span.classList.contains('leading-[1.55]')
    ) {
      return span
    }
  }

  return null
}

function isVisible(element: HTMLElement) {
  if (typeof element.checkVisibility !== 'function') {
    return true
  }

  try {
    return element.checkVisibility()
  } catch {
    return true
  }
}

function removeRestoredMessages(root: ParentNode | null) {
  for (const element of root?.querySelectorAll(`.${RESTORED_CLASS}`) ?? []) {
    element.remove()
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
