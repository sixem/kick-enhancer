import assert from 'node:assert/strict'
import test from 'node:test'

import {
  clearLogHistory,
  configureLogging,
  createLogger,
  subscribeLogHistory,
} from '../../src/logging/logger.ts'

test('scope filters update when logging is reconfigured', (t) => {
  const messages = []
  t.mock.method(console, 'info', (prefix, message) => {
    messages.push([prefix, message])
  })
  configureLogging({
    colors: false,
    filters: ['viewer-counts*', '-viewer-counts:network'],
    historyLimit: 0,
    level: 'info',
  })
  t.after(() => {
    clearLogHistory()
    configureLogging({
      colors: true,
      filters: ['*'],
      historyLimit: 250,
      level: 'info',
    })
  })

  const viewerCountsLog = createLogger('viewer-counts')
  const networkLog = createLogger('viewer-counts:network')
  const settingsLog = createLogger('settings')

  viewerCountsLog.info('Rendered')
  networkLog.info('Fetched')
  settingsLog.info('Saved')

  assert.deepEqual(messages, [['[KICK Enhancer] [viewer-counts]', 'Rendered']])

  configureLogging({ filters: ['settings'] })
  viewerCountsLog.info('Rendered again')
  settingsLog.info('Saved again')

  assert.deepEqual(messages, [
    ['[KICK Enhancer] [viewer-counts]', 'Rendered'],
    ['[KICK Enhancer] [settings]', 'Saved again'],
  ])
})

test('log history subscriptions batch additions with stable IDs', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  clearLogHistory()
  configureLogging({
    historyLimit: 2,
    level: 'silent',
  })
  const snapshots = []
  const unsubscribe = subscribeLogHistory((history) => {
    snapshots.push(history)
  })
  t.after(() => {
    unsubscribe()
    clearLogHistory()
    configureLogging({
      historyLimit: 250,
      level: 'info',
    })
    t.mock.timers.reset()
  })

  const log = createLogger('diagnostics:test')
  log.info('First')
  log.info('Second')

  assert.equal(snapshots.length, 0)
  t.mock.timers.tick(200)

  assert.equal(snapshots.length, 1)
  assert.equal(snapshots[0].length, 2)
  const retainedId = snapshots[0][1].id

  log.info('Third')
  t.mock.timers.tick(200)

  assert.equal(snapshots.length, 2)
  assert.deepEqual(
    snapshots[1].map(({ arguments: [message] }) => message),
    ['Second', 'Third'],
  )
  assert.equal(snapshots[1][0].id, retainedId)
  assert.notEqual(snapshots[1][0].id, snapshots[1][1].id)

  clearLogHistory()

  assert.equal(snapshots.length, 3)
  assert.deepEqual(snapshots[2], [])
})
