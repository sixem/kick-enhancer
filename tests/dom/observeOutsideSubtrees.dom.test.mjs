import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { observeOutsideSubtrees } from '../../src/dom/observeOutsideSubtrees.ts'

test('does not receive chat content records while preserving adjacent surfaces', async () => {
  const browser = new Window()
  browser.document.body.innerHTML = `
    <main><aside id="sidebar"></aside><section id="channel-chatroom">
      <header></header><div id="chatroom-messages"><span>old</span></div>
      <footer></footer>
    </section></main>`
  let deliveries = 0
  const records = []
  const stop = observeOutsideSubtrees(
    browser.document.documentElement,
    ['chatroom-messages'],
    {
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class'],
    },
    (batch) => records.push(...batch),
    (callback) =>
      new browser.MutationObserver((...args) => {
        deliveries += 1
        callback(...args)
      }),
  )
  const messages = browser.document.getElementById('chatroom-messages')
  for (let index = 0; index < 100; index += 1) {
    messages.firstChild.textContent = String(index)
    messages.firstChild.className = `message-${index}`
    messages.append(browser.document.createElement('span'))
  }
  await browser.happyDOM.waitUntilComplete()
  assert.equal(deliveries, 0)
  assert.equal(records.length, 0)

  browser.document
    .querySelector('header')
    .append(browser.document.createElement('span'))
  const boundaryText =
    browser.document.getElementById('channel-chatroom').firstChild
  boundaryText.data = 'updated boundary text'
  browser.document.querySelector('footer').className = 'changed'
  browser.document.getElementById('sidebar').append('changed')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 4)
  stop()
  browser.close()
})

test('discovers excluded roots added later and survives ancestor replacement', async () => {
  const browser = new Window()
  const doc = browser.document
  let deliveries = 0
  const records = []
  const stop = observeOutsideSubtrees(
    doc.documentElement,
    ['chatroom-messages'],
    { childList: true },
    (batch) => records.push(...batch),
    (callback) =>
      new browser.MutationObserver((...args) => {
        deliveries++
        callback(...args)
      }),
  )
  const route = doc.createElement('main')
  route.innerHTML = '<header></header><div id="chatroom-messages"></div>'
  doc.body.append(route)
  await browser.happyDOM.waitUntilComplete()
  let previousDeliveries = deliveries
  route.lastElementChild.append('first message')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(deliveries, previousDeliveries)

  const replacement = route.cloneNode(true)
  route.replaceWith(replacement)
  await browser.happyDOM.waitUntilComplete()
  previousDeliveries = deliveries
  replacement.lastElementChild.append('next message')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(deliveries, previousDeliveries)
  replacement.firstElementChild.append('new title')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.at(-1).target, replacement.firstElementChild)

  stop()
  previousDeliveries = deliveries
  replacement.firstElementChild.append('stopped')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(deliveries, previousDeliveries)
  browser.close()
})

test('handles exclusion ID changes without broadening requested attribute notifications', async () => {
  const browser = new Window()
  const doc = browser.document
  const surface = doc.createElement('div')
  doc.body.append(surface)
  const records = []
  const stop = observeOutsideSubtrees(
    doc.documentElement,
    ['chatroom-messages'],
    { childList: true },
    (batch) => records.push(...batch),
    (callback) => new browser.MutationObserver(callback),
  )
  surface.id = 'chatroom-messages'
  surface.append('message before the first delivery')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 0)
  surface.append('another message')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 0)

  surface.id = 'ordinary-content'
  await browser.happyDOM.waitUntilComplete()
  surface.append('visible content')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 1)
  assert.equal(records[0].target, surface)
  stop()
  browser.close()
})

test('reconnects new siblings and moved branches, including multiple chatrooms', async () => {
  const browser = new Window()
  const doc = browser.document
  doc.body.innerHTML =
    '<main><div id="chatroom-messages"></div></main><aside><div id="chatroom-messages"></div></aside>'
  const records = []
  const stop = observeOutsideSubtrees(
    doc.documentElement,
    ['chatroom-messages'],
    { childList: true },
    (batch) => records.push(...batch),
    (callback) => new browser.MutationObserver(callback),
  )
  const header = doc.createElement('header')
  doc.querySelector('main').append(header)
  await browser.happyDOM.waitUntilComplete()
  records.length = 0
  header.append('title')
  for (const messages of doc.querySelectorAll('#chatroom-messages'))
    messages.append('ignored')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 1)
  assert.equal(records[0].target, header)

  doc.querySelector('aside').append(header)
  await browser.happyDOM.waitUntilComplete()
  records.length = 0
  header.append('moved title')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(records.length, 1)
  assert.equal(records[0].target, header)
  stop()
  browser.close()
})
