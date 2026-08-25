import assert from 'node:assert/strict'
import test from 'node:test'

import { onDocumentElementReady } from '../../src/dom/onDocumentElementReady.ts'

test('runs immediately when the document element already exists', () => {
  let calls = 0
  let observers = 0
  const ownerDocument = {
    documentElement: {},
  }

  const cancel = onDocumentElementReady(
    () => {
      calls += 1
    },
    ownerDocument,
    () => {
      observers += 1
      return fakeObserver()
    },
  )

  assert.equal(calls, 1)
  assert.equal(observers, 0)
  cancel()
})

test('waits for the document element and only runs once', () => {
  let calls = 0
  const ownerDocument = {
    documentElement: null,
  }
  const observer = fakeObserver()

  onDocumentElementReady(
    () => {
      calls += 1
    },
    ownerDocument,
    (callback) => {
      observer.callback = callback
      return observer
    },
  )

  assert.equal(observer.observeCalls, 1)
  assert.equal(calls, 0)
  observer.callback([], observer)
  assert.equal(calls, 0)

  ownerDocument.documentElement = {}
  observer.callback([], observer)
  observer.callback([], observer)
  assert.equal(calls, 1)
  assert.equal(observer.disconnectCalls, 1)
})

test('cancellation prevents delayed startup work', () => {
  let calls = 0
  const ownerDocument = {
    documentElement: null,
  }
  const observer = fakeObserver()
  const cancel = onDocumentElementReady(
    () => {
      calls += 1
    },
    ownerDocument,
    (callback) => {
      observer.callback = callback
      return observer
    },
  )

  cancel()
  ownerDocument.documentElement = {}
  observer.callback([], observer)

  assert.equal(observer.disconnectCalls, 1)
  assert.equal(calls, 0)
})

function fakeObserver() {
  return {
    callback() {},
    disconnectCalls: 0,
    observeCalls: 0,
    disconnect() {
      this.disconnectCalls += 1
    },
    observe() {
      this.observeCalls += 1
    },
  }
}
