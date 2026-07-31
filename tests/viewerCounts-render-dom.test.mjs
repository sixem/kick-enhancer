import assert from 'node:assert/strict'
import test from 'node:test'

import { Window } from 'happy-dom'

import {
  cleanupViewerCountDom,
  renderViewerCounts,
} from '../src/features/viewerCounts/render/index.ts'
import { ViewerCountStore } from '../src/features/viewerCounts/store.ts'

const DEFAULT_OPTIONS = {
  hideFollowingRecommendations: false,
  hideGamblingStreams: false,
  hideRecommendedChannels: false,
  showHiddenViewerCounts: true,
  showStreamUptime: true,
}

test('renders a hidden channel count beside the stream title', (t) => {
  const document = installDom(t, '/channel-one')
  const store = createStore([
    stream('channel-one', {
      viewerCount: 1_234,
    }),
  ])
  document.body.innerHTML = `
    <main>
      <h1 data-testid="livestream-title">Channel title</h1>
    </main>
  `

  const result = renderViewerCounts(
    store,
    undefined,
    DEFAULT_OPTIONS,
  )
  const count = document.querySelector(
    '[data-ke-viewer-count][data-ke-target="channel"]',
  )

  assert.equal(result.activeChannelSlug, 'channel-one')
  assert.equal(result.counts.channel, 1)
  assert.deepEqual([...result.targetSlugs], ['channel-one'])
  assert.equal(count?.getAttribute('aria-label'), '1,234 viewers')
  assert.equal(
    count?.querySelector('.ke-viewer-count-channel__value')
      ?.textContent,
    '1,234',
  )
})

test('renders and reconciles card count and uptime elements', (t) => {
  const document = installDom(t, '/browse')
  const store = createStore([
    stream('card-one', {
      startedAt: Date.now() - 65 * 60_000,
      viewerCount: 1_234,
    }),
  ])
  document.body.innerHTML = `
    <article data-testid="livestream-results-card">
      <a data-testid="media-card-thumbnail" href="/card-one">
        <span data-native-live>LIVE</span>
      </a>
    </article>
  `

  const firstResult = renderViewerCounts(
    store,
    undefined,
    DEFAULT_OPTIONS,
  )
  const nativeLive = document.querySelector('[data-native-live]')

  assert.equal(firstResult.counts.cards, 1)
  assert.equal(firstResult.counts.cardUptimes, 1)
  assert.match(
    document.querySelector(
      '[data-ke-viewer-count][data-ke-target="card"]',
    )?.textContent ?? '',
    /^1\.2K watching$/,
  )
  assert.equal(
    document.querySelector(
      '[data-ke-stream-uptime][data-ke-target="card"]',
    )?.textContent,
    '1h 5m',
  )
  assert.equal(
    nativeLive?.getAttribute('data-ke-native-card-live-hidden'),
    'card-one',
  )

  store.clear()
  const secondResult = renderViewerCounts(
    store,
    undefined,
    DEFAULT_OPTIONS,
  )

  assert.equal(secondResult.counts.cards, 0)
  assert.equal(secondResult.counts.cardUptimes, 0)
  assert.equal(
    document.querySelector('[data-ke-viewer-count]'),
    null,
  )
  assert.equal(
    document.querySelector('[data-ke-stream-uptime]'),
    null,
  )
  assert.equal(
    nativeLive?.hasAttribute('data-ke-native-card-live-hidden'),
    false,
  )
})

test('renders sidebar and linked tooltip enhancements independently', (t) => {
  const document = installDom(t, '/browse')
  const store = createStore([
    stream('sidebar-one', {
      startedAt: Date.now() - 65 * 60_000,
      viewerCount: 987,
    }),
  ])
  document.body.innerHTML = `
    <aside id="sidebar-wrapper">
      <a
        aria-describedby="sidebar-one-tooltip"
        data-testid="sidebar-following-channel-sidebar-one"
        href="/sidebar-one"
      >
        <img alt="Sidebar One">
        <div class="items-center">
          <span class="bg-green-500"></span>
          <span data-sidebar-native-live>LIVE</span>
        </div>
      </a>
    </aside>
    <div id="sidebar-one-tooltip" role="tooltip">
      <div class="flex">
        <span>Sidebar One</span>
        <span class="bg-green-500"></span>
        <span data-tooltip-native-live>LIVE</span>
      </div>
    </div>
  `

  const result = renderViewerCounts(
    store,
    {
      displayName: 'Sidebar One',
      slug: 'sidebar-one',
    },
    DEFAULT_OPTIONS,
  )

  assert.equal(result.counts.sidebar, 1)
  assert.equal(result.counts.sidebarUptimes, 1)
  assert.equal(result.counts.tooltips, 1)
  assert.equal(result.counts.tooltipUptimes, 1)
  assert.equal(
    document.querySelector(
      '[data-ke-viewer-count][data-ke-target="sidebar"]',
    )?.textContent,
    '987',
  )
  assert.equal(
    document.querySelector(
      '[data-ke-viewer-count][data-ke-target="tooltip"]',
    )?.textContent,
    '987',
  )
  assert.equal(
    document.querySelectorAll('[data-ke-native-live-hidden]')
      .length,
    2,
  )

  cleanupViewerCountDom()

  assert.equal(
    document.querySelector('[data-ke-viewer-count]'),
    null,
  )
  assert.equal(
    document.querySelector('[data-ke-stream-uptime]'),
    null,
  )
  assert.equal(
    document.querySelector('[data-ke-native-live-hidden]'),
    null,
  )
  assert.equal(
    document.querySelector('[data-ke-sidebar-uptime-container]'),
    null,
  )
  assert.equal(
    document.querySelector('[data-ke-tooltip-uptime-container]'),
    null,
  )
})

test('trusts a native LIVE label when sidebar privacy metadata is missing', (t) => {
  const document = installDom(t, '/browse')
  const store = createStore([
    stream('sidebar-one', {
      showViewCount: true,
      viewerCount: 987,
    }),
  ])
  document.body.innerHTML = `
    <aside id="sidebar-wrapper">
      <a
        data-testid="sidebar-following-channel-sidebar-one"
        href="/sidebar-one"
      >
        <div class="items-center">
          <span class="bg-green-500"></span>
          <span data-sidebar-native-live>LIVE</span>
        </div>
      </a>
    </aside>
  `

  const result = renderViewerCounts(
    store,
    undefined,
    DEFAULT_OPTIONS,
  )

  assert.equal(result.counts.sidebar, 1)
  assert.equal(
    document.querySelector(
      '[data-ke-viewer-count][data-ke-target="sidebar"]',
    )?.textContent,
    '987',
  )
  assert.equal(
    document.querySelector('[data-sidebar-native-live]')
      ?.getAttribute('data-ke-native-live-hidden'),
    'sidebar-one',
  )
})

function installDom(t, pathname) {
  const browser = new Window({
    url: `https://kick.com${pathname}`,
  })
  const globals = {
    document: browser.document,
    Element: browser.Element,
    HTMLAnchorElement: browser.HTMLAnchorElement,
    HTMLElement: browser.HTMLElement,
    Node: browser.Node,
    SVGElement: browser.SVGElement,
    window: browser,
  }
  const previousDescriptors = new Map(
    Object.keys(globals).map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ]),
  )

  Object.defineProperty(browser, 'matchMedia', {
    configurable: true,
    value: () => ({
      matches: true,
    }),
  })

  for (const [key, value] of Object.entries(globals)) {
    Object.defineProperty(globalThis, key, {
      configurable: true,
      value,
      writable: true,
    })
  }

  t.after(() => {
    browser.close()

    for (const [key, descriptor] of previousDescriptors) {
      if (descriptor) {
        Object.defineProperty(globalThis, key, descriptor)
      } else {
        delete globalThis[key]
      }
    }
  })

  return browser.document
}

function createStore(streams) {
  const store = new ViewerCountStore()
  store.upsertStreams(streams)
  return store
}

function stream(channelSlug, overrides = {}) {
  return {
    capturedAt: Date.now(),
    channelSlug,
    isLive: true,
    showViewCount: false,
    source: 'channel-details',
    viewerCount: 100,
    ...overrides,
  }
}
