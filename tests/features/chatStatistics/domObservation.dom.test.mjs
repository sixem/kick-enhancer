import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { observeChatStatisticsDom } from '../../../src/features/chatStatistics/domObservation.ts'

test('ignores active chat and unrelated styles while observing header and ancestor changes', async () => {
  const browser = new Window()
  const doc = browser.document
  doc.body.innerHTML = `<aside></aside><main>${chatroomMarkup()}</main>`
  let deliveries = 0
  const records = []
  const stop = observeChatStatisticsDom(
    (batch) => records.push(...batch),
    doc,
    (callback) =>
      new browser.MutationObserver((...args) => {
        deliveries++
        callback(...args)
      }),
  )
  const messages = doc.getElementById('chatroom-messages')
  for (let index = 0; index < 100; index++) {
    messages.append(doc.createElement('span'))
    messages.lastChild.className = `message-${index}`
  }
  doc.querySelector('aside').style.color = 'red'
  await browser.happyDOM.waitUntilComplete()
  assert.equal(deliveries, 0)
  assert.equal(records.length, 0)

  doc.querySelector('header').append('title')
  doc.querySelector('main').setAttribute('aria-hidden', 'true')
  doc.querySelector('[data-testid]').removeAttribute('data-testid')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 3)
  stop()
  browser.close()
})

test('discovers replacement chatrooms and follows visibility changes on new ancestors', async () => {
  const browser = new Window()
  const doc = browser.document
  const records = []
  const stop = observeChatStatisticsDom(
    (batch) => records.push(...batch),
    doc,
    (callback) => new browser.MutationObserver(callback),
  )
  doc.body.innerHTML = `<main>${chatroomMarkup()}</main>`
  await browser.happyDOM.waitUntilComplete()
  assert.ok(records.length > 0)
  records.length = 0
  doc.querySelector('header').append('first title')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 1)

  const original = doc.querySelector('main')
  const replacement = doc.createElement('section')
  replacement.innerHTML = chatroomMarkup()
  original.replaceWith(replacement)
  await browser.happyDOM.waitUntilComplete()
  records.length = 0
  original.style.display = 'none'
  replacement.style.display = 'none'
  replacement.querySelector('header').append('replacement title')
  replacement.querySelector('#chatroom-messages').append('ignored')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 2)
  assert.ok(records.every((record) => replacement.contains(record.target)))

  stop()
  records.length = 0
  replacement.style.display = 'block'
  replacement.querySelector('header').append('stopped')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 0)
  browser.close()
})

test('detects chatroom ID assignment and removal', async () => {
  const browser = new Window()
  const doc = browser.document
  doc.body.innerHTML = '<section><header></header></section>'
  const records = []
  const stop = observeChatStatisticsDom(
    (batch) => records.push(...batch),
    doc,
    (callback) => new browser.MutationObserver(callback),
  )
  const room = doc.querySelector('section')
  room.id = 'channel-chatroom'
  await browser.happyDOM.waitUntilComplete()
  assert.ok(records.length > 0)
  records.length = 0
  room.querySelector('header').style.color = 'red'
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 1)
  room.removeAttribute('id')
  await browser.happyDOM.waitUntilComplete()
  records.length = 0
  room.querySelector('header').style.color = 'blue'
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 0)
  stop()
  browser.close()
})

function chatroomMarkup() {
  return '<div id="channel-chatroom"><header></header><div id="chatroom-messages"></div><footer data-testid="chat-input"></footer></div>'
}
