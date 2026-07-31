import assert from 'node:assert/strict'
import test from 'node:test'

import { createClipCardReconciler } from '../../../src/features/clipDownloads/clipCardReconciler.ts'

test('reconciles mounts, reused IDs, invalid cards, and teardown', () => {
  const calls = []
  const card = {
    connected: true,
    container: { id: 'container-one' },
    id: 'clip_one',
  }
  const reconciler = createClipCardReconciler({
    isCardConnected: (candidate) => candidate.connected,
    isMountConnected: (mount) => mount.connected,
    mount: (resolution) => {
      const mount = {
        connected: true,
        id: resolution.clipId,
      }
      calls.push(['mount', resolution.clipId])
      return mount
    },
    resolve: (candidate) =>
      candidate.id
        ? {
            card: candidate,
            clipId: candidate.id,
            container: candidate.container,
          }
        : undefined,
    unmount: (mount) => {
      mount.connected = false
      calls.push(['unmount', mount.id])
    },
    update: (mount, resolution) => {
      calls.push(['update', mount.id, resolution.clipId])
      mount.id = resolution.clipId
    },
  })

  reconciler.reconcile(card)
  reconciler.reconcile(card)
  assert.deepEqual(calls, [['mount', 'clip_one']])

  card.id = 'clip_two'
  reconciler.reconcile(card)
  assert.deepEqual(calls.at(-1), [
    'update',
    'clip_one',
    'clip_two',
  ])

  card.container = { id: 'container-two' }
  reconciler.reconcile(card)
  assert.deepEqual(calls.slice(-2), [
    ['unmount', 'clip_two'],
    ['mount', 'clip_two'],
  ])

  card.id = undefined
  reconciler.reconcile(card)
  assert.deepEqual(calls.at(-1), ['unmount', 'clip_two'])

  card.id = 'clip_three'
  reconciler.reconcile(card)
  card.connected = false
  reconciler.removeDisconnected()
  assert.deepEqual(calls.at(-1), ['unmount', 'clip_three'])

  card.connected = true
  reconciler.reconcile(card)
  reconciler.teardown()
  assert.deepEqual(calls.at(-1), ['unmount', 'clip_three'])
})
