import assert from 'node:assert/strict'
import test from 'node:test'

import {
  CLIP_MODAL_BUTTON_SELECTOR,
  CLIP_PERMALINK_SELECTOR,
  activateClipDownload,
  createBatchedCardScheduler,
  getClipIdFromCard,
  getClipIdFromHref,
  getUniqueClipId,
} from '../../../src/features/clipDownloads/clipCards.ts'

const KICK_ORIGIN = 'https://kick.com'

test('extracts clip IDs only from exact same-origin clip paths', () => {
  assert.equal(
    getClipIdFromHref(
      '/identify/clips/clip_01ABC-def_23?source=card',
      KICK_ORIGIN,
    ),
    'clip_01ABC-def_23',
  )
  assert.equal(
    getClipIdFromHref(
      'https://kick.com/identify/clips/clip_valid',
      KICK_ORIGIN,
    ),
    'clip_valid',
  )

  for (const href of [
    undefined,
    '',
    '/identify/clip/clip_wrong-section',
    '/identify/clips/clip_valid/extra',
    '/clips/clip_missing-channel',
    '/identify/clips/not-a-clip',
    'https://kick.com.example/identify/clips/clip_lookalike',
    'https://example.com/identify/clips/clip_external',
  ]) {
    assert.equal(getClipIdFromHref(href, KICK_ORIGIN), undefined)
  }
})

test('rejects non-ASCII and overlong clip IDs', () => {
  assert.equal(
    getClipIdFromHref(
      '/identify/clips/clip_tromsø',
      KICK_ORIGIN,
    ),
    undefined,
  )
  assert.equal(
    getClipIdFromHref(
      `/identify/clips/clip_${'a'.repeat(124)}`,
      KICK_ORIGIN,
    ),
    undefined,
  )
  assert.equal(
    getClipIdFromHref(
      `/identify/clips/clip_${'a'.repeat(123)}`,
      KICK_ORIGIN,
    )?.length,
    128,
  )
})

test('resolves duplicate permalinks but rejects conflicting valid IDs', () => {
  assert.equal(
    getUniqueClipId(
      [
        '/identify/clips/clip_same',
        'https://kick.com/identify/clips/clip_same',
        '/identify/clips/not-valid',
      ],
      KICK_ORIGIN,
    ),
    'clip_same',
  )
  assert.equal(
    getUniqueClipId(
      [
        '/identify/clips/clip_one',
        '/identify/clips/clip_two',
      ],
      KICK_ORIGIN,
    ),
    undefined,
  )
})

test('requires both the clip modal action and a valid permalink', () => {
  const card = fakeClipCard(['/identify/clips/clip_card'])

  assert.equal(getClipIdFromCard(card, KICK_ORIGIN), 'clip_card')

  card.hasModalButton = false
  assert.equal(getClipIdFromCard(card, KICK_ORIGIN), undefined)

  card.hasModalButton = true
  card.hrefs = ['/identify/videos/clip_card']
  assert.equal(getClipIdFromCard(card, KICK_ORIGIN), undefined)
})

test('reads the current permalink when a virtualized card is reused', () => {
  const card = fakeClipCard(['/identify/clips/clip_before'])

  assert.equal(getClipIdFromCard(card, KICK_ORIGIN), 'clip_before')

  card.hrefs = ['/identify/clips/clip_after']
  assert.equal(getClipIdFromCard(card, KICK_ORIGIN), 'clip_after')

  card.hrefs = [
    '/identify/clips/clip_after',
    '/identify/clips/clip_conflict',
  ]
  assert.equal(getClipIdFromCard(card, KICK_ORIGIN), undefined)
})

test('batches mutation bursts and deduplicates cards', () => {
  const scheduledCallbacks = []
  const processedBatches = []
  const scheduler = createBatchedCardScheduler(
    (cards) => processedBatches.push(cards),
    (callback) => scheduledCallbacks.push(callback),
  )

  scheduler.enqueue('one')
  scheduler.enqueue('one')
  scheduler.enqueue('two')

  assert.equal(scheduledCallbacks.length, 1)
  assert.deepEqual(processedBatches, [])

  scheduledCallbacks.shift()()
  assert.deepEqual(processedBatches, [['one', 'two']])

  scheduler.enqueue('three')
  assert.equal(scheduledCallbacks.length, 1)
  scheduler.cancel()
  scheduledCallbacks.shift()()
  assert.deepEqual(processedBatches, [['one', 'two']])
})

test('clip action isolates the event and invokes only its handler', () => {
  const calls = []
  const event = {
    preventDefault() {
      calls.push('preventDefault')
    },
    stopPropagation() {
      calls.push('stopPropagation')
    },
  }

  activateClipDownload(event, 'clip_selected', (clipId) => {
    calls.push(['select', clipId])
  })

  assert.deepEqual(calls, [
    'preventDefault',
    'stopPropagation',
    ['select', 'clip_selected'],
  ])
})

function fakeClipCard(hrefs) {
  return {
    hasModalButton: true,
    hrefs,
    querySelector(selector) {
      if (selector === CLIP_MODAL_BUTTON_SELECTOR) {
        return this.hasModalButton ? {} : null
      }

      return null
    },
    querySelectorAll(selector) {
      if (selector !== CLIP_PERMALINK_SELECTOR) {
        return []
      }

      return this.hrefs.map((href) => ({
        getAttribute(name) {
          return name === 'href' ? href : null
        },
      }))
    },
  }
}
