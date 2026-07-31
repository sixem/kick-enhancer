import assert from 'node:assert/strict'
import test from 'node:test'

import { Window } from 'happy-dom'

import { findChatStatisticsAnchors } from '../src/features/chatStatistics/dom.ts'

test('resolves the channel chat title and event stack', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <div id="channel-chatroom">
      <div class="contents">
        <div>
          <span class="absolute left-1/2 -translate-x-1/2">Chat</span>
        </div>
      </div>
      <div class="relative">
        <div class="absolute w-full empty:hidden">
          <div id="events"></div>
        </div>
        <div id="chatroom-messages"></div>
      </div>
    </div>
  `

  const anchors = findChatStatisticsAnchors(window.document)

  assert.equal(anchors?.title.textContent, 'Chat')
  assert.equal(anchors?.eventStack?.id, 'events')
})

test('keeps the header anchor when the event stack is unavailable', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <div id="channel-chatroom">
      <div class="contents">
        <div>
          <span class="absolute left-1/2 -translate-x-1/2">Chat</span>
        </div>
      </div>
      <div id="chatroom-messages"></div>
    </div>
  `

  const anchors = findChatStatisticsAnchors(window.document)

  assert.ok(anchors)
  assert.equal(anchors.eventStack, null)
})

test('does not match similarly styled titles outside channel chat', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <span class="absolute left-1/2 -translate-x-1/2">Chat</span>
  `

  assert.equal(findChatStatisticsAnchors(window.document), null)
})
