import assert from 'node:assert/strict'
import test from 'node:test'

import { notifySettingsListeners } from '../../src/settings/settingsListeners.ts'

test('isolates listener failures and continues notifying', () => {
  const error = new Error('feature failed')
  const errors = []
  const values = []

  assert.doesNotThrow(() => {
    notifySettingsListeners(
      [
        () => {
          throw error
        },
        (value) => values.push(value),
      ],
      'updated settings',
      (caught) => errors.push(caught),
    )
  })

  assert.deepEqual(errors, [error])
  assert.deepEqual(values, ['updated settings'])
})

test('continues notifying when error reporting also fails', () => {
  const values = []

  notifySettingsListeners(
    [
      () => {
        throw new Error('feature failed')
      },
      (value) => values.push(value),
    ],
    'updated settings',
    () => {
      throw new Error('logger failed')
    },
  )

  assert.deepEqual(values, ['updated settings'])
})
