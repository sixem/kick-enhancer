import assert from 'node:assert/strict'
import test from 'node:test'

import { calculateScrollOverflow } from '../../src/components/scrollOverflow.ts'

test('shows only the bottom indicator at the start', () => {
  assert.deepEqual(calculateScrollOverflow(0, 300, 800), {
    bottom: true,
    top: false,
  })
})

test('shows both indicators within scrollable content', () => {
  assert.deepEqual(calculateScrollOverflow(250, 300, 800), {
    bottom: true,
    top: true,
  })
})

test('shows only the top indicator at the end', () => {
  assert.deepEqual(calculateScrollOverflow(500, 300, 800), {
    bottom: false,
    top: true,
  })
})

test('hides indicators when content fits or is within tolerance', () => {
  assert.deepEqual(calculateScrollOverflow(0, 300, 300), {
    bottom: false,
    top: false,
  })
  assert.deepEqual(calculateScrollOverflow(2, 300, 304), {
    bottom: false,
    top: false,
  })
})
