import assert from 'node:assert/strict'
import test from 'node:test'

import { composeDisposers } from '../src/lifecycle.ts'

test('composes feature cleanup in reverse order and disposes once', () => {
  const calls = []
  const dispose = composeDisposers(
    () => calls.push('first'),
    () => calls.push('second'),
    () => calls.push('third'),
  )

  dispose()
  dispose()

  assert.deepEqual(calls, ['third', 'second', 'first'])
})
