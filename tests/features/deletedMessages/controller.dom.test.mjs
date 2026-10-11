import assert from 'node:assert/strict'
import test from 'node:test'

import { Window } from 'happy-dom'

import {
  DeletedMessagesController,
  reconcileDeletedMessageRow,
} from '../../../src/features/deletedMessages/controller.ts'

test('restores literal text once and fails closed for changed or native rows', () => {
  const browser = new Window()
  const messages = new Map([
    [
      'message-1',
      {
        content: '<img src=x onerror=alert(1)>',
        deleted: true,
      },
    ],
    ['alternate-path', { content: 'must not restore', deleted: true }],
  ])
  const row = createDeletedRow(browser.document, 'message-1')

  reconcileDeletedMessageRow(row, messages)
  reconcileDeletedMessageRow(row, messages)
  assert.equal(row.querySelectorAll('.ke-restored-deleted-message').length, 1)
  assert.equal(row.querySelector('img'), null)
  assert.equal(
    row.querySelector('.ke-restored-deleted-message')?.textContent,
    '<img src=x onerror=alert(1)>',
  )
  assert.match(row.textContent, /Deleted by a moderator/)

  const pendingNativeUpdate = createDeletedRow(
    browser.document,
    'message-1',
    false,
    false,
  )
  reconcileDeletedMessageRow(pendingNativeUpdate, messages)
  assert.equal(
    pendingNativeUpdate.querySelector('.ke-restored-deleted-message'),
    null,
  )

  setChatEntry(row, {
    data: { message: { id: 'alternate-path' } },
    id: 'synthetic-entry',
    type: 'message',
  })
  reconcileDeletedMessageRow(row, messages)
  assert.equal(row.querySelector('.ke-restored-deleted-message'), null)

  const privilegedRow = createDeletedRow(browser.document, 'message-1', true)
  reconcileDeletedMessageRow(privilegedRow, messages)
  assert.equal(
    privilegedRow.querySelector('.ke-restored-deleted-message'),
    null,
  )
  assert.match(privilegedRow.textContent, /Original content/)

  browser.close()
})

test('bounds and deduplicates the cache across room lifecycle changes', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  const firstRow = createDeletedRow(browser.document, 'message-1')
  const secondRow = createDeletedRow(browser.document, 'message-2')
  const thirdRow = createDeletedRow(browser.document, 'message-3')
  surface.append(firstRow, secondRow, thirdRow)

  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(2)
  controller.setEnabled(true)
  source.emit(session('sessionStarted', '1'))
  source.emit(message('message-1', 'first', '1'))
  source.emit(message('message-2', 'kept first delivery', '1', 'reply'))
  source.emit(message('message-2', 'duplicate delivery', '1', 'reply'))
  source.emit(message('message-3', 'third', '1'))
  source.emit(deletion('message-1', '1'))
  source.emit(deletion('message-2', '1'))
  source.emit(deletion('message-3', '1'))
  await browser.happyDOM.waitUntilComplete()

  assert.equal(firstRow.querySelector('.ke-restored-deleted-message'), null)
  assert.equal(
    secondRow.querySelector('.ke-restored-deleted-message')?.textContent,
    'kept first delivery',
  )
  assert.equal(
    thirdRow.querySelector('.ke-restored-deleted-message')?.textContent,
    'third',
  )

  controller.setCapacity(1)
  await browser.happyDOM.waitUntilComplete()
  assert.equal(secondRow.querySelector('.ke-restored-deleted-message'), null)
  assert.equal(
    thirdRow.querySelectorAll('.ke-restored-deleted-message').length,
    1,
  )

  thirdRow.remove()
  source.emit(session('sessionEnded', '1'))
  source.emit(session('sessionStarted', '1'))
  const remountedThirdRow = createDeletedRow(browser.document, 'message-3')
  surface.append(remountedThirdRow)
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    remountedThirdRow.querySelector('.ke-restored-deleted-message')
      ?.textContent,
    'third',
  )

  source.emit(session('sessionStarted', '2'))
  assert.equal(
    browser.document.querySelector('.ke-restored-deleted-message'),
    null,
  )
  const staleRow = createDeletedRow(browser.document, 'message-3')
  surface.append(staleRow)
  source.emit(deletion('message-3', '2'))
  await browser.happyDOM.waitUntilComplete()
  assert.equal(staleRow.querySelector('.ke-restored-deleted-message'), null)

  controller.setEnabled(false)
  assert.equal(source.subscriberCount, 0)
  browser.close()
})

test('removes restored content when its cached message is evicted', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  const row = createDeletedRow(browser.document, 'message-1')
  surface.append(row)

  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(1)
  controller.setEnabled(true)
  source.emit(message('message-1', 'restored', '1'))
  source.emit(deletion('message-1', '1'))
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    row.querySelector('.ke-restored-deleted-message')?.textContent,
    'restored',
  )

  source.emit(message('message-2', 'newest', '1'))
  await browser.happyDOM.waitUntilComplete()
  assert.equal(row.querySelector('.ke-restored-deleted-message'), null)

  controller.dispose()
  browser.close()
})

test('reconciles virtual and native updates, then clears cached content on disable', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(50)
  controller.setEnabled(true)
  source.emit(message('message-1', 'restored', '1'))
  source.emit(deletion('message-1', '1'))
  await browser.happyDOM.waitUntilComplete()

  const remountedRow = createDeletedRow(browser.document, 'message-1')
  surface.append(remountedRow)
  await browser.happyDOM.waitUntilComplete()

  assert.equal(
    remountedRow.querySelectorAll('.ke-restored-deleted-message').length,
    1,
  )

  const pendingNativeRow = createDeletedRow(
    browser.document,
    'message-2',
    false,
    false,
  )
  surface.append(pendingNativeRow)
  source.emit(message('message-2', 'pending native update', '1'))
  source.emit(deletion('message-2', '1'))
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    pendingNativeRow.querySelector('.ke-restored-deleted-message'),
    null,
  )

  setChatEntry(pendingNativeRow, {
    data: {
      id: 'message-2',
      ui_metadata: { deleted: 'user_deleted' },
    },
    id: 'synthetic-message-2',
    type: 'message',
  })
  pendingNativeRow.querySelector('.font-semibold').textContent =
    'Deleted by a moderator.'
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    pendingNativeRow.querySelector('.ke-restored-deleted-message')?.textContent,
    'pending native update',
  )

  controller.setEnabled(false)
  assert.equal(
    browser.document.querySelector('.ke-restored-deleted-message'),
    null,
  )
  assert.match(remountedRow.textContent, /Deleted by a moderator/)

  controller.setEnabled(true)
  assert.equal(
    browser.document.querySelector('.ke-restored-deleted-message'),
    null,
  )
  controller.dispose()
  browser.close()
})

test('rebinds to the visible SPA chat surface before restoring', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const visibleSurface = mountChatroom(browser.document)
  const oldSurface = mountChatroom(browser.document)
  visibleSurface.parentElement.checkVisibility = () => false
  oldSurface.parentElement.checkVisibility = () => true
  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(50)
  controller.setEnabled(true)
  source.emit(message('message-1', 'restored', '1'))

  oldSurface.parentElement.checkVisibility = () => false
  visibleSurface.parentElement.checkVisibility = () => true
  const visibleRow = createDeletedRow(browser.document, 'message-1')
  const hiddenRow = createDeletedRow(browser.document, 'message-1')
  visibleSurface.append(visibleRow)
  oldSurface.append(hiddenRow)
  source.emit(deletion('message-1', '1'))
  await browser.happyDOM.waitUntilComplete()

  assert.equal(
    visibleRow.querySelector('.ke-restored-deleted-message')?.textContent,
    'restored',
  )
  assert.equal(hiddenRow.querySelector('.ke-restored-deleted-message'), null)

  controller.dispose()
  browser.close()
})

test('keeps visibility checks and mutation callbacks in the caller realm', () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  const chatroom = surface.parentElement
  const NativeMutationObserver = browser.MutationObserver
  let observerCreations = 0
  let visibilityChecks = 0

  chatroom.checkVisibility = (...argumentsList) => {
    visibilityChecks += 1
    assert.equal(argumentsList.length, 0)
    return true
  }

  const controller = new DeletedMessagesController(
    source,
    browser.document,
    (callback) => {
      observerCreations += 1
      return new NativeMutationObserver(callback)
    },
  )

  assert.doesNotThrow(() => controller.setEnabled(true))
  assert.equal(visibilityChecks, 1)
  assert.equal(observerCreations, 1)

  controller.dispose()
  browser.close()
})

test('rebinds when the active chatroom replaces its virtual surface', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(50)
  controller.setEnabled(true)
  source.emit(message('message-1', 'restored', '1'))
  source.emit(deletion('message-1', '1'))
  await browser.happyDOM.waitUntilComplete()

  const replacement = browser.document.createElement('div')
  replacement.id = 'chatroom-messages'
  const replacementRow = createDeletedRow(browser.document, 'message-1')
  replacement.append(replacementRow)
  const chatroom = surface.parentElement
  surface.remove()
  await browser.happyDOM.waitUntilComplete()
  chatroom.append(replacement)
  await browser.happyDOM.waitUntilComplete()

  assert.equal(
    replacementRow.querySelector('.ke-restored-deleted-message')?.textContent,
    'restored',
  )

  controller.dispose()
  browser.close()
})

test('rebinds on the next message after the active chatroom root is replaced', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(50)
  controller.setEnabled(true)
  source.emit(message('message-1', 'restored', '1'))
  source.emit(deletion('message-1', '1'))
  await browser.happyDOM.waitUntilComplete()

  surface.parentElement.remove()

  const replacementSurface = mountChatroom(browser.document)
  const replacementRow = createDeletedRow(browser.document, 'message-1')
  replacementSurface.append(replacementRow)

  source.emit(message('message-2', 'rebind trigger', '1'))
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    replacementRow.querySelector('.ke-restored-deleted-message')?.textContent,
    'restored',
  )

  controller.dispose()
  browser.close()
})

test('batches only affected rows and does not observe its own restoration writes', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  let rowReads = 0
  const rows = Array.from({ length: 100 }, (_, index) => {
    const row = createDeletedRow(browser.document, `message-${index}`)
    const props = row.__reactProps$fixture
    Object.defineProperty(row, '__reactProps$fixture', {
      get() {
        rowReads += 1
        return props
      },
    })
    surface.append(row)
    return row
  })
  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(250)
  controller.setEnabled(true)
  await browser.happyDOM.waitUntilComplete()
  rowReads = 0

  // An empty cache still needs to track recycled row identities, but only
  // the changed row should be inspected once for this mutation batch.
  const marker = rows[0].querySelector('.font-semibold')
  marker.textContent = 'first update'
  marker.textContent = 'second update'
  marker.textContent = 'third update'
  await browser.happyDOM.waitUntilComplete()
  assert.equal(rowReads, 1)

  rowReads = 0
  for (let index = 0; index < 100; index += 1) {
    marker.firstChild.data = `update-${index}`
    await browser.happyDOM.waitUntilComplete()
  }
  assert.equal(rowReads, 100)

  rowReads = 0
  source.emit(message('message-0', 'restored', '1'))
  source.emit(deletion('message-0', '1'))
  source.emit(deletion('message-0', '1'))
  await browser.happyDOM.waitUntilComplete()
  assert.equal(rowReads, 1)
  assert.equal(
    rows[0].querySelector('.ke-restored-deleted-message')?.textContent,
    'restored',
  )

  rowReads = 0
  controller.setCapacity(0)
  await browser.happyDOM.waitUntilComplete()
  assert.equal(rowReads, 1)
  assert.equal(rows[0].querySelector('.ke-restored-deleted-message'), null)
  controller.dispose()
  browser.close()
})

test('tracks added subtrees, recycled rows and externally removed restorations', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(50)
  controller.setEnabled(true)
  source.emit(message('message-1', 'first', '1'))
  source.emit(deletion('message-1', '1'))
  const wrapper = browser.document.createElement('div')
  const row = createDeletedRow(browser.document, 'message-1')
  wrapper.append(row)
  surface.append(wrapper)
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    row.querySelector('.ke-restored-deleted-message')?.textContent,
    'first',
  )

  row.querySelector('.ke-restored-deleted-message').remove()
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    row.querySelector('.ke-restored-deleted-message')?.textContent,
    'first',
  )

  setChatEntry(row, {
    type: 'message',
    data: { id: 'message-2', ui_metadata: { deleted: 'user_deleted' } },
  })
  row.querySelector('.font-semibold').textContent = 'Recycled row'
  source.emit(message('message-2', 'second', '1'))
  source.emit(deletion('message-2', '1'))
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    row.querySelector('.ke-restored-deleted-message')?.textContent,
    'second',
  )

  // A detached subtree must leave the message index, even if retained by KICK.
  wrapper.remove()
  await browser.happyDOM.waitUntilComplete()
  Object.defineProperty(row, '__reactProps$fixture', {
    get() {
      throw new Error('Detached rows must not be inspected')
    },
  })
  source.emit(deletion('message-2', '1'))
  await browser.happyDOM.waitUntilComplete()
  controller.dispose()
  browser.close()
})

test('preserves pending native mutations and cancels queued work on disable', async () => {
  const browser = new Window()
  const source = new FakeChatEventSource()
  const surface = mountChatroom(browser.document)
  const first = createDeletedRow(browser.document, 'message-1')
  const second = createDeletedRow(browser.document, 'message-2', false, false)
  surface.append(first, second)
  const controller = new DeletedMessagesController(source, browser.document)
  controller.setCapacity(50)
  controller.setEnabled(true)
  source.emit(message('message-1', 'first', '1'))
  source.emit(message('message-2', 'second', '1'))
  source.emit(deletion('message-1', '1'))
  source.emit(deletion('message-2', '1'))
  // These native records are still pending when the event-scheduled flush runs.
  setChatEntry(second, {
    type: 'message',
    data: { id: 'message-2', ui_metadata: { deleted: 'user_deleted' } },
  })
  second.querySelector('.font-semibold').textContent = 'Native deletion'
  await browser.happyDOM.waitUntilComplete()
  assert.equal(
    second.querySelector('.ke-restored-deleted-message')?.textContent,
    'second',
  )

  source.emit(deletion('message-1', '1'))
  controller.setEnabled(false)
  await browser.happyDOM.waitUntilComplete()
  assert.equal(surface.querySelector('.ke-restored-deleted-message'), null)
  assert.equal(source.subscriberCount, 0)
  browser.close()
})

class FakeChatEventSource {
  #listeners = new Set()

  get subscriberCount() {
    return this.#listeners.size
  }

  emit(event) {
    for (const listener of this.#listeners) {
      listener(event)
    }
  }

  subscribeChatEvents(listener) {
    this.#listeners.add(listener)
    return () => {
      this.#listeners.delete(listener)
    }
  }
}

function mountChatroom(ownerDocument) {
  const chatroom = ownerDocument.createElement('div')
  const surface = ownerDocument.createElement('div')
  chatroom.id = 'channel-chatroom'
  surface.id = 'chatroom-messages'
  chatroom.append(surface)
  ownerDocument.body.append(chatroom)
  return surface
}

function createDeletedRow(
  ownerDocument,
  messageId,
  privileged = false,
  nativelyDeleted = true,
) {
  const row = ownerDocument.createElement('div')
  const child = ownerDocument.createElement('div')
  const host = ownerDocument.createElement('span')
  const marker = ownerDocument.createElement('span')
  row.dataset.index = '0'
  host.className = 'text-neutral leading-[1.55]'
  marker.className = 'font-semibold'
  marker.textContent = 'Deleted by a moderator'

  if (privileged) {
    const original = ownerDocument.createElement('span')
    original.className = 'line-through'
    original.textContent = 'Original content'
    host.append(original)
  }

  host.append(marker)
  child.append(host)
  row.append(child)
  setChatEntry(row, {
    data: {
      id: messageId,
      ...(nativelyDeleted ? { ui_metadata: { deleted: 'user_deleted' } } : {}),
    },
    id: `synthetic-${messageId}`,
    type: 'message',
  })
  return row
}

function setChatEntry(element, chatEntry) {
  element.__reactProps$fixture = {
    children: {
      props: { chatEntry },
    },
  }
}

function session(type, chatroomId) {
  return {
    chatroomId,
    observedAt: 1,
    type,
  }
}

function message(messageId, content, chatroomId, messageType = 'message') {
  return {
    chatroomId,
    content,
    messageId,
    messageType,
    observedAt: 1,
    senderId: 'sender-1',
    type: 'message',
  }
}

function deletion(messageId, chatroomId) {
  return {
    chatroomId,
    messageId,
    observedAt: 1,
    type: 'messageDeleted',
  }
}
