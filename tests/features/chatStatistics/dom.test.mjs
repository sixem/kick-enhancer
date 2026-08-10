import assert from 'node:assert/strict'
import test from 'node:test'

import { Window } from 'happy-dom'

import { findChatStatisticsAnchors } from '../../../src/features/chatStatistics/dom.ts'

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

test('resolves the title when an SPA header omits the contents wrapper', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <div id="channel-chatroom">
      <div class="relative">
        <span class="absolute left-1/2 -translate-x-1/2">Chat</span>
      </div>
      <div id="chatroom-messages"></div>
    </div>
  `

  const anchors = findChatStatisticsAnchors(window.document)

  assert.equal(anchors?.title.textContent, 'Chat')
})

test('selects the visible chatroom when SPA routes remain mounted', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <section id="original-route" style="display: none">
      ${chatroomMarkup('Original chat')}
    </section>
    <section id="next-route">
      ${chatroomMarkup('Next chat')}
    </section>
  `

  assert.equal(
    findChatStatisticsAnchors(window.document)?.title.textContent,
    'Next chat',
  )

  window.document.getElementById('original-route').style.display = 'block'
  window.document.getElementById('next-route').style.display = 'none'

  assert.equal(
    findChatStatisticsAnchors(window.document)?.title.textContent,
    'Original chat',
  )
})

test('does not match similarly styled titles outside channel chat', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <span class="absolute left-1/2 -translate-x-1/2">Chat</span>
  `

  assert.equal(findChatStatisticsAnchors(window.document) === null, true)
})

test('does not use a centered span inside chat content as the title', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <div id="channel-chatroom">
      <div>
        <div>
          <div>
            <span class="absolute left-1/2 -translate-x-1/2">Overlay</span>
          </div>
        </div>
      </div>
      <div id="chatroom-messages"></div>
    </div>
  `

  assert.equal(findChatStatisticsAnchors(window.document) === null, true)
})

function chatroomMarkup(title) {
  return `
    <div id="channel-chatroom">
      <div class="relative">
        <span class="absolute left-1/2 -translate-x-1/2">${title}</span>
      </div>
      <div id="chatroom-messages"></div>
    </div>
  `
}
