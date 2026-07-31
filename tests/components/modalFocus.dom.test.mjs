import assert from 'node:assert/strict'
import test from 'node:test'

import { Window } from 'happy-dom'
import { h, render } from 'preact'
import { act } from 'preact/test-utils'

import { useModalFocusRestoration } from '../../src/components/modalFocus.ts'

test('restores focus when an open modal is closed externally', async () => {
  const browser = new Window()
  const previousDocument = globalThis.document
  const previousHTMLElement = globalThis.HTMLElement
  const previousWindow = globalThis.window

  globalThis.document = browser.document
  globalThis.HTMLElement = browser.HTMLElement
  globalThis.window = browser

  const opener = browser.document.createElement('button')
  const host = browser.document.createElement('div')
  browser.document.body.append(opener, host)
  opener.focus()

  try {
    await act(() => {
      render(h(FocusRestorationHarness, { open: true }), host)
    })

    const modalButton = host.querySelector('button')
    modalButton.focus()
    assert.equal(browser.document.activeElement, modalButton)

    await act(() => {
      render(h(FocusRestorationHarness, { open: false }), host)
    })

    assert.equal(browser.document.activeElement, opener)
  } finally {
    await act(() => {
      render(null, host)
    })
    globalThis.document = previousDocument
    globalThis.HTMLElement = previousHTMLElement
    globalThis.window = previousWindow
    browser.close()
  }
})

function FocusRestorationHarness({ open }) {
  useModalFocusRestoration(open)

  return open ? h('button', null, 'Inside modal') : null
}
