import assert from 'node:assert/strict'
import test from 'node:test'

import { Window } from 'happy-dom'

import { findTopNavActions } from '../../src/ui/topNavAnchor.ts'

test('resolves the logged-in top-nav actions', () => {
  const { actions, document } = createTopNav(`
    <button data-testid="kicks-top-nav">1,000</button>
  `)

  assert.equal(findTopNavActions(document), actions)
})

test('resolves the logged-out top-nav actions from the login button', () => {
  const { actions, document } = createTopNav(`
    <button data-testid="navbar-display-language"></button>
    <button data-testid="login">Log In</button>
    <button data-testid="sign-up">Sign Up</button>
  `)

  assert.equal(findTopNavActions(document), actions)
})

test('prefers the logged-in anchor if both states are present', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <nav>
      <div id="logged-out-actions">
        <button data-testid="login">Log In</button>
      </div>
      <div id="logged-in-actions">
        <button data-testid="kicks-top-nav">1,000</button>
      </div>
    </nav>
  `

  assert.equal(
    findTopNavActions(window.document)?.id,
    'logged-in-actions',
  )
})

test('does not use login buttons outside the top navigation', () => {
  const window = new Window()
  window.document.body.innerHTML = `
    <main>
      <button data-testid="login">Log In</button>
    </main>
  `

  assert.equal(findTopNavActions(window.document), null)
})

function createTopNav(children) {
  const window = new Window()
  window.document.body.innerHTML = `
    <nav>
      <div id="actions">${children}</div>
    </nav>
  `

  return {
    actions: window.document.querySelector('#actions'),
    document: window.document,
  }
}
