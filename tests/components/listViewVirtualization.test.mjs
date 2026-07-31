import assert from 'node:assert/strict'
import test from 'node:test'

import { calculateListViewRange } from '../../src/components/listViewVirtualization.ts'

test('list view range includes visible rows and bounded overscan', () => {
  assert.deepEqual(
    calculateListViewRange(250, 40, 3, 400, 120),
    {
      end: 16,
      start: 7,
    },
  )
})

test('list view range stays within the available items', () => {
  assert.deepEqual(
    calculateListViewRange(12, 40, 4, 440, 160),
    {
      end: 12,
      start: 7,
    },
  )
  assert.deepEqual(
    calculateListViewRange(0, 40, 4, 0, 160),
    {
      end: 0,
      start: 0,
    },
  )
})

test('list view range sanitizes invalid viewport inputs', () => {
  assert.deepEqual(
    calculateListViewRange(5, 0, Number.NaN, -100, -20),
    {
      end: 1,
      start: 0,
    },
  )
})
