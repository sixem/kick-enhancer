import assert from 'node:assert/strict'
import test from 'node:test'

import { Window } from 'happy-dom'

import { renderAnimatedNumber } from '../../src/components/numberReel.ts'

test('keeps unchanged animated numbers structurally stable', () => {
  const browser = new Window()
  const animations = []
  let frame

  Object.defineProperty(browser, 'matchMedia', {
    configurable: true,
    value: () => ({
      matches: false,
    }),
  })
  Object.defineProperty(browser, 'requestAnimationFrame', {
    configurable: true,
    value: (callback) => {
      frame = callback
      return 1
    },
  })
  Object.defineProperty(
    browser.HTMLElement.prototype,
    'getBoundingClientRect',
    {
      configurable: true,
      value: () => ({
        bottom: 16,
        height: 16,
        left: 0,
        right: 16,
        top: 0,
        width: 16,
        x: 0,
        y: 0,
      }),
    },
  )
  Object.defineProperty(browser.HTMLElement.prototype, 'animate', {
    configurable: true,
    value: () => {
      const animation = {
        cancel() {},
        onfinish: null,
      }
      animations.push(animation)
      return animation
    },
  })

  const previousDocument = globalThis.document
  const previousHTMLElement = globalThis.HTMLElement
  const previousWindow = globalThis.window

  globalThis.document = browser.document
  globalThis.HTMLElement = browser.HTMLElement
  globalThis.window = browser

  try {
    const container = browser.document.createElement('span')
    browser.document.body.append(container)

    renderAnimatedNumber(container, 142)
    frame()

    assert.equal(
      container.querySelectorAll('.ke-animated-number__digit').length,
      3,
    )
    assert.equal(animations.length, 3)

    renderAnimatedNumber(container, 142)

    assert.equal(animations.length, 3)
    assert.equal(
      container.querySelectorAll('.ke-animated-number__digit').length,
      3,
    )

    renderAnimatedNumber(container, -42)
    frame()

    assert.equal(
      container.querySelectorAll('.ke-animated-number__digit').length,
      2,
    )
    assert.equal(
      container.querySelector('.ke-animated-number__separator')?.textContent,
      '-',
    )
  } finally {
    globalThis.document = previousDocument
    globalThis.HTMLElement = previousHTMLElement
    globalThis.window = previousWindow
    browser.close()
  }
})
