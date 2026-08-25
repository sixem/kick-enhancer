import assert from 'node:assert/strict'
import test from 'node:test'

import { Window } from 'happy-dom'

import {
  FollowedGamblingChannels,
  reconcileGamblingSidebarRows,
  SIDEBAR_GAMBLING_ATTRIBUTE,
} from '../../../src/features/gamblingStreams/followedChannels.ts'
import {
  handleFollowedChannelsCapture,
  readFollowedChannelsCapture,
} from '../../../src/features/gamblingStreams/followedChannelsCapture.ts'

const CAPTURE_SOURCE = 'kick-enhancer-viewer-counts'
const CAPTURE_TYPE = 'KICK_ENHANCER_API_RESPONSE'
const PAGE_URL = 'https://kick.com/channel-one'

test('hides collapsed gambling rows from followed-channel metadata', (t) => {
  const browser = new Window({ url: PAGE_URL })
  const channels = new FollowedGamblingChannels()
  t.after(() => browser.close())

  browser.document.body.innerHTML = `
    <div id="sidebar-wrapper">
      <button data-row="casino">
        <a data-testid="sidebar-following-channel-1" href="/Casino-One">
          <img alt="Casino One">
        </a>
      </button>
      <button data-row="normal">
        <a data-testid="sidebar-following-channel-2" href="/normal-one">
          <img alt="Normal One">
        </a>
      </button>
    </div>
  `

  assert.equal(
    channels.update({
      channels: [
        {
          category_name: 'Slots & Casino',
          channel_slug: 'casino-one',
          is_live: true,
        },
        {
          category_name: 'Just Chatting',
          channel_slug: 'normal-one',
          is_live: true,
        },
      ],
    }),
    true,
  )

  reconcileGamblingSidebarRows(browser.document, true, channels)

  assert.equal(
    browser.document
      .querySelector('[data-row="casino"]')
      ?.hasAttribute(SIDEBAR_GAMBLING_ATTRIBUTE),
    true,
  )
  assert.equal(
    browser.document
      .querySelector('[data-row="normal"]')
      ?.hasAttribute(SIDEBAR_GAMBLING_ATTRIBUTE),
    false,
  )

  assert.equal(
    channels.update({
      channels: [
        {
          category_name: 'Just Chatting',
          channel_slug: 'casino-one',
          is_live: true,
        },
      ],
    }),
    true,
  )
  reconcileGamblingSidebarRows(browser.document, true, channels)
  assert.equal(
    browser.document
      .querySelector('[data-row="casino"]')
      ?.hasAttribute(SIDEBAR_GAMBLING_ATTRIBUTE),
    false,
  )

  reconcileGamblingSidebarRows(browser.document, false, channels)
  assert.equal(
    browser.document.querySelector(`[${SIDEBAR_GAMBLING_ATTRIBUTE}]`),
    null,
  )
})

test('retains DOM category detection as a fallback', (t) => {
  const browser = new Window({ url: PAGE_URL })
  const channels = new FollowedGamblingChannels()
  t.after(() => browser.close())

  browser.document.body.innerHTML = `
    <section data-testid="followed-livestreams">
      <article data-testid="livestream-results-card">
        <a href="/category/slots">Slots & Casino</a>
        <a data-testid="media-card-thumbnail" href="/card-casino"></a>
      </article>
    </section>
    <div id="sidebar-wrapper">
      <button data-row="card-casino">
        <a data-testid="sidebar-following-channel-1" href="/card-casino"></a>
      </button>
      <button data-row="visible-category">
        <a data-testid="sidebar-following-channel-2" href="/other-casino">
          <span>Slots & Casino</span>
        </a>
      </button>
    </div>
  `

  reconcileGamblingSidebarRows(browser.document, true, channels)

  assert.equal(
    browser.document
      .querySelector('[data-row="card-casino"]')
      ?.hasAttribute(SIDEBAR_GAMBLING_ATTRIBUTE),
    true,
  )
  assert.equal(
    browser.document
      .querySelector('[data-row="visible-category"]')
      ?.hasAttribute(SIDEBAR_GAMBLING_ATTRIBUTE),
    true,
  )
})

test('prefers current Following cards over older captured categories', (t) => {
  const browser = new Window({ url: PAGE_URL })
  const channels = new FollowedGamblingChannels()
  t.after(() => browser.close())

  channels.update({
    channels: [
      {
        category_name: 'Slots & Casino',
        channel_slug: 'changed-category',
        is_live: true,
      },
    ],
  })
  browser.document.body.innerHTML = `
    <section data-testid="followed-livestreams">
      <article data-testid="livestream-results-card">
        <a href="/category/just-chatting">Just Chatting</a>
        <a data-testid="media-card-thumbnail" href="/changed-category"></a>
      </article>
    </section>
    <div id="sidebar-wrapper">
      <button data-row="changed-category">
        <a data-testid="sidebar-following-channel-1" href="/changed-category"></a>
      </button>
    </div>
  `

  reconcileGamblingSidebarRows(browser.document, true, channels)

  assert.equal(
    browser.document
      .querySelector('[data-row="changed-category"]')
      ?.hasAttribute(SIDEBAR_GAMBLING_ATTRIBUTE),
    false,
  )
})

test('validates followed captures and schedules reconciliation on changes', () => {
  const messageWindow = {}
  const pageWindow = {}
  const now = 1_000_000
  const context = {
    currentHref: PAGE_URL,
    currentOrigin: 'https://kick.com',
    messageWindow,
    now,
    pageWindow,
  }
  const payload = {
    channels: [
      {
        category_name: 'Slots & Casino',
        channel_slug: 'captured-casino',
        is_live: true,
      },
    ],
  }
  const data = {
    endpoint: 'FOLLOWED_CHANNELS',
    payload,
    source: CAPTURE_SOURCE,
    timestamp: now,
    type: CAPTURE_TYPE,
    url: 'https://kick.com/api/v2/channels/followed',
  }
  const event = {
    data,
    origin: 'https://kick.com',
    source: pageWindow,
  }
  const channels = new FollowedGamblingChannels()
  let reconciliations = 0

  assert.equal(
    handleFollowedChannelsCapture(event, context, channels, () => {
      reconciliations += 1
    }),
    true,
  )
  assert.equal(channels.has('captured-casino'), true)
  assert.equal(reconciliations, 1)

  assert.equal(
    handleFollowedChannelsCapture(event, context, channels, () => {
      reconciliations += 1
    }),
    false,
  )
  assert.equal(reconciliations, 1)

  const invalidEvents = [
    { ...event, source: {} },
    { ...event, origin: 'https://example.test' },
    { ...event, data: { ...data, timestamp: now - 60_001 } },
    {
      ...event,
      data: {
        ...data,
        endpoint: 'CHANNEL_DETAILS',
        url: 'https://kick.com/api/v2/channels/captured-casino',
      },
    },
    {
      ...event,
      data: {
        ...data,
        url: 'https://example.test/api/v2/channels/followed',
      },
    },
  ]

  for (const invalidEvent of invalidEvents) {
    assert.equal(readFollowedChannelsCapture(invalidEvent, context), undefined)
  }
})

test('ignores malformed records and removes stale live classifications', () => {
  const channels = new FollowedGamblingChannels()

  assert.equal(
    channels.update({
      channels: [
        null,
        { category_name: 'Slots & Casino', channel_slug: 'missing-live' },
        {
          category_name: 'Slots & Casino',
          channel_slug: 'following',
          is_live: true,
        },
        {
          category_name: 'Just Chatting',
          channel_slug: 'normal',
          is_live: true,
        },
        {
          category_name: 'Slots & Casino',
          channel_slug: 'casino-one',
          is_live: 'true',
        },
      ],
    }),
    true,
  )
  assert.equal(channels.has('casino-one'), true)
  assert.equal(channels.has('missing-live'), false)
  assert.equal(channels.has('following'), false)
  assert.equal(channels.has('normal'), false)

  assert.equal(
    channels.update({
      channels: [
        {
          category_name: 'Slots & Casino',
          channel_slug: 'casino-one',
          is_live: false,
        },
      ],
    }),
    true,
  )
  assert.equal(channels.has('casino-one'), false)
  assert.equal(channels.update({ channels: 'invalid' }), false)
})

test('replaces captured cursor pages without discarding other pages', () => {
  const channels = new FollowedGamblingChannels()

  assert.equal(
    channels.update(
      {
        channels: [
          {
            category_name: 'Slots & Casino',
            channel_slug: 'first-page',
            is_live: true,
          },
        ],
      },
      '',
    ),
    true,
  )
  assert.equal(
    channels.update(
      {
        channels: [
          {
            category_name: 'Slots & Casino',
            channel_slug: 'second-page',
            is_live: true,
          },
        ],
      },
      'next-cursor',
    ),
    true,
  )
  assert.equal(channels.has('first-page'), true)
  assert.equal(channels.has('second-page'), true)

  assert.equal(channels.update({ channels: [] }, ''), true)
  assert.equal(channels.has('first-page'), false)
  assert.equal(channels.has('second-page'), true)

  assert.equal(channels.update({ channels: [] }, 'next-cursor'), true)
  assert.equal(channels.has('second-page'), false)
})
