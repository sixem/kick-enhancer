import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { observeSidebarLayout } from '../../src/features/sidebarDom.ts'

test('caches the layout and observes sidebar state without receiving chat changes', async () => {
  const browser = new Window()
  const doc = browser.document
  doc.body.innerHTML =
    '<main data-sidebar="true" data-chat="true" data-theatre="false"><aside></aside><div id="channel-chatroom"><div id="chatroom-messages"></div></div></main>'
  let lookups = 0
  const querySelector = doc.querySelector.bind(doc)
  doc.querySelector = (...args) => {
    lookups++
    return querySelector(...args)
  }
  let deliveries = 0
  const layouts = []
  let changes = 0
  const stop = observeSidebarLayout(
    {
      onLayoutChange: (layout) => layouts.push(layout),
      onStateChange: () => changes++,
      onContentChange: () => {},
    },
    doc,
    (callback) =>
      new browser.MutationObserver((...args) => {
        deliveries++
        callback(...args)
      }),
  )
  assert.equal(lookups, 1)
  const layout = layouts[0]
  const messages = doc.getElementById('chatroom-messages')
  for (let index = 0; index < 100; index++) messages.append(String(index))
  await browser.happyDOM.waitUntilComplete()
  assert.equal(deliveries, 0)
  assert.equal(lookups, 1)
  assert.equal(changes, 0)

  layout.setAttribute('data-sidebar', 'false')
  layout.querySelector('aside').append('sidebar content')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(changes, 1)
  assert.equal(lookups, 1)
  assert.equal(layouts.length, 1)
  stop()
  layout.setAttribute('data-sidebar', 'true')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(changes, 1)
  browser.close()
})

test('finds late layouts and buttons and rebinds after layout replacement', async () => {
  const browser = new Window()
  const doc = browser.document
  const layouts = []
  let changes = 0
  let contentChanges = 0
  const stop = observeSidebarLayout(
    {
      onLayoutChange: (layout) => layouts.push(layout),
      onStateChange: () => changes++,
      onContentChange: () => contentChanges++,
    },
    doc,
    (callback) => new browser.MutationObserver(callback),
  )
  const layout = doc.createElement('main')
  doc.body.append(layout)
  await browser.happyDOM.waitUntilComplete()
  layout.setAttribute('data-sidebar', 'true')
  await browser.happyDOM.waitUntilComplete()
  assert.deepEqual(layouts, [layout])
  const previousContentChanges = contentChanges
  layout.append(doc.createElement('button'))
  await browser.happyDOM.waitUntilComplete()
  assert.ok(contentChanges > previousContentChanges)

  const replacement = layout.cloneNode(true)
  layout.replaceWith(replacement)
  await browser.happyDOM.waitUntilComplete()
  assert.deepEqual(layouts, [layout, replacement])
  layout.setAttribute('data-sidebar', 'false')
  replacement.setAttribute('data-sidebar', 'false')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(changes, 1)

  replacement.removeAttribute('data-sidebar')
  await browser.happyDOM.waitUntilComplete()
  assert.equal(layouts.at(-1), null)
  stop()
  browser.close()
})
