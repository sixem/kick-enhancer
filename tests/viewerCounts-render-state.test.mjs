import assert from 'node:assert/strict'
import test from 'node:test'

import { updateCountElementState } from '../src/features/viewerCounts/countElement.ts'

const INITIAL_STATE = {
  className: 'ke-viewer-count-card',
  count: 1_234,
  slug: 'channel-one',
  target: 'card',
}

test('does not rewrite an unchanged count element state', () => {
  const element = fakeElement()

  assert.equal(updateCountElementState(element, INITIAL_STATE), true)
  element.resetWrites()
  assert.equal(updateCountElementState(element, INITIAL_STATE), false)
  assert.deepEqual(element.writes, {
    attributes: 0,
    className: 0,
    dataset: 0,
    textContent: 0,
  })
})

test('reports count and slug changes so rendered contents can update in place', () => {
  const element = fakeElement()

  updateCountElementState(element, INITIAL_STATE)
  element.resetWrites()

  assert.equal(
    updateCountElementState(element, {
      ...INITIAL_STATE,
      count: 1_235,
    }),
    true,
  )
  assert.equal(element.dataset.keCount, '1235')
  assert.equal(element.writes.dataset, 1)

  element.resetWrites()
  assert.equal(
    updateCountElementState(element, {
      ...INITIAL_STATE,
      count: 1_235,
      slug: 'channel-two',
    }),
    true,
  )
  assert.equal(element.dataset.keSlug, 'channel-two')
  assert.equal(element.writes.dataset, 1)
})

test('only updates text when the displayed compact value changes', () => {
  const element = fakeElement()
  const state = {
    ...INITIAL_STATE,
    text: '1.2K',
  }

  updateCountElementState(element, state)
  element.resetWrites()
  updateCountElementState(element, state)
  assert.equal(element.writes.textContent, 0)

  updateCountElementState(element, {
    ...state,
    count: 1_300,
    text: '1.3K',
  })
  assert.equal(element.textContent, '1.3K')
  assert.equal(element.writes.textContent, 1)
})

function fakeElement() {
  const attributes = new Map()
  const datasetValues = {}
  const writes = {
    attributes: 0,
    className: 0,
    dataset: 0,
    textContent: 0,
  }
  let className = ''
  let textContent = ''

  return {
    attributes,
    dataset: new Proxy(datasetValues, {
      set(target, property, value) {
        writes.dataset += 1
        target[property] = value
        return true
      },
    }),
    resetWrites() {
      writes.attributes = 0
      writes.className = 0
      writes.dataset = 0
      writes.textContent = 0
    },
    writes,
    get className() {
      return className
    },
    set className(value) {
      writes.className += 1
      className = value
    },
    get textContent() {
      return textContent
    },
    set textContent(value) {
      writes.textContent += 1
      textContent = value
    },
    getAttribute(name) {
      return attributes.get(name) ?? null
    },
    setAttribute(name, value) {
      writes.attributes += 1
      attributes.set(name, value)
    },
  }
}
