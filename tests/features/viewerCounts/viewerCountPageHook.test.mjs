import assert from 'node:assert/strict'
import test from 'node:test'

import { Browser } from 'happy-dom'

import { classifyViewerCountEndpoint } from '../../../src/features/viewerCounts/acquisition/endpoints.ts'
import { installViewerCountPageHook } from '../../../src/features/viewerCounts/viewerCountPageHook.ts'

const INSTALL_RESULT_ATTRIBUTE = 'data-kick-enhancer-viewer-count-hook'
const MESSAGE_TYPE = 'KICK_ENHANCER_API_RESPONSE'
const PAGE_URL = 'https://kick.com/example'

test('captures viewer endpoints in the page realm without changing json semantics', async (t) => {
  const { browser, host, page } = createPageHarness()
  t.after(() => browser.close())

  const messages = []
  host.addEventListener('message', (event) => {
    if (event.data?.type === MESSAGE_TYPE) {
      messages.push(event.data)
    }
  })

  const nativeJson = host.Response.prototype.json
  const nativeDescriptor = Object.getOwnPropertyDescriptor(
    host.Response.prototype,
    'json',
  )

  assert.equal(injectPageHook(host), true)
  const hookedJson = host.Response.prototype.json
  assert.notEqual(hookedJson, nativeJson)
  assert.equal(
    Object.getPrototypeOf(hookedJson),
    Object.getPrototypeOf(nativeJson),
  )
  assert.deepEqual(
    pickDescriptor(
      Object.getOwnPropertyDescriptor(host.Response.prototype, 'json'),
    ),
    pickDescriptor(nativeDescriptor),
  )

  assert.equal(injectPageHook(host), true)
  assert.equal(host.Response.prototype.json, hookedJson)

  const behavior = page.evaluate(`
    (() => {
      const response = new Response(
        'https://kick.com/api/v2/channels/example',
        { viewers: 42 },
      )
      const promise = response.json('first-argument', 2)
      window.__behaviorPromise = promise

      return {
        argumentsList: JSON.stringify(response.argumentsList),
        receiverPreserved: response.receivedThis === response,
        samePromise: promise === response.promise,
      }
    })()
  `)

  assert.equal(behavior.argumentsList, JSON.stringify(['first-argument', 2]))
  assert.equal(behavior.receiverPreserved, true)
  assert.equal(behavior.samePromise, true)
  assert.equal(
    await page.evaluate(
      'window.__behaviorPromise.then(({ viewers }) => viewers)',
    ),
    42,
  )
  await browser.waitUntilComplete()

  assert.equal(messages.length, 1)
  assert.equal(messages[0].endpoint, 'CHANNEL_DETAILS')
  assert.equal(messages[0].url, 'https://kick.com/api/v2/channels/example')
  assert.equal(messages[0].payload.viewers, 42)
  messages.length = 0

  const endpoints = [
    [
      'https://web.kick.com/api/v1/recommendations/livestreams/sidebar?limit=5',
      'SIDEBAR_LIVESTREAMS',
    ],
    [
      'https://web.kick.com/api/v1/recommendations/livestreams',
      'RECOMMENDED_LIVESTREAMS',
    ],
    [
      'https://web.kick.com/api/v1/recommendations/livestreams/list?page=2',
      'PAGINATED_RECOMMENDED_LIVESTREAMS',
    ],
    [
      'https://web.kick.com/api/v1/livestreams/featured',
      'FEATURED_LIVESTREAMS',
    ],
    ['https://kick.com/api/v2/channels/followed', 'FOLLOWED_CHANNELS'],
    ['https://www.kick.com/api/v2/channels/channel-name', 'CHANNEL_DETAILS'],
    ['/current-viewers?ids[]=123', 'CURRENT_VIEWERS'],
    ['https://kick.com/api/v1/user/livestreams', 'USER_LIVESTREAMS'],
  ]

  for (const [url, endpoint] of endpoints) {
    assert.equal(classifyViewerCountEndpoint(url, PAGE_URL), endpoint)
    await page.evaluate(`
      new Response(${JSON.stringify(url)}, { endpoint: ${JSON.stringify(endpoint)} }).json()
    `)
  }
  await browser.waitUntilComplete()

  assert.deepEqual(
    messages.map((message) => message.endpoint),
    endpoints.map(([, endpoint]) => endpoint),
  )
  assert.deepEqual(
    messages.map((message) => message.payload.endpoint),
    endpoints.map(([, endpoint]) => endpoint),
  )
})

test('ignores lookalikes and isolates observation failures', async (t) => {
  const { browser, host, page } = createPageHarness()
  t.after(() => browser.close())

  const messages = []
  host.addEventListener('message', (event) => {
    if (event.data?.type === MESSAGE_TYPE) {
      messages.push(event.data)
    }
  })
  assert.equal(injectPageHook(host), true)

  const lookalikes = [
    'https://example.test/api/v2/channels/example',
    'http://kick.com/current-viewers',
    'https://web.kick.com/api/v1/livestreams/featured/extra',
    'https://kick.com/api/v2/channels/example/extra',
    'https://kick.com/api/v2/channels/followed/',
  ]

  for (const url of lookalikes) {
    assert.equal(classifyViewerCountEndpoint(url, PAGE_URL), undefined)
    await page.evaluate(`
      new Response(${JSON.stringify(url)}, { ignored: true }).json()
    `)
  }
  await browser.waitUntilComplete()
  assert.deepEqual(messages, [])

  const exactRejection = await page.evaluate(`
    (() => {
      const reason = { reason: 'original' }
      const response = new Response(
        'https://kick.com/api/v2/channels/example',
        reason,
        { reject: true },
      )
      return response.json().then(
        () => false,
        (error) => error === reason,
      )
    })()
  `)
  assert.equal(exactRejection, true)

  const exactSynchronousError = page.evaluate(`
    (() => {
      const error = new Error('native-json-error')
      const response = new Response(
        'https://kick.com/api/v2/channels/example',
        null,
        { synchronousError: error },
      )

      try {
        response.json()
        return false
      } catch (caught) {
        return caught === error
      }
    })()
  `)
  assert.equal(exactSynchronousError, true)

  const throwingUrlPreservesPromise = await page.evaluate(`
    (() => {
      const response = new Response(
        'https://kick.com/api/v2/channels/example',
        'url-getter-result',
      )
      Object.defineProperty(response, 'url', {
        get() {
          throw new Error('url-getter-error')
        },
      })
      return response.json()
    })()
  `)
  assert.equal(throwingUrlPreservesPromise, 'url-getter-result')

  const postFailurePreservesPromise = await page.evaluate(`
    (() => {
      const nativePostMessage = window.postMessage
      window.postMessage = () => {
        throw new Error('post-message-error')
      }
      const response = new Response(
        'https://kick.com/api/v2/channels/example',
        'post-message-result',
      )

      return response.json().finally(() => {
        window.postMessage = nativePostMessage
      })
    })()
  `)
  assert.equal(postFailurePreservesPromise, 'post-message-result')
})

function createPageHarness() {
  const browser = new Browser({
    settings: {
      enableJavaScriptEvaluation: true,
      suppressInsecureJavaScriptEnvironmentWarning: true,
    },
  })
  const page = browser.newPage()
  page.url = PAGE_URL
  page.evaluate(`
    window.Response = class Response {
      constructor(url, payload, options = {}) {
        this.url = url
        this.payload = payload
        this.reject = options.reject === true
        this.synchronousError = options.synchronousError
        this.promise = this.reject
          ? Promise.reject(payload)
          : Promise.resolve(payload)
      }

      json(...argumentsList) {
        this.argumentsList = argumentsList
        this.receivedThis = this

        if (this.synchronousError) {
          throw this.synchronousError
        }

        return this.promise
      }
    }
  `)

  return {
    browser,
    host: page.mainFrame.window,
    page,
  }
}

function injectPageHook(host) {
  const script = host.document.createElement('script')

  try {
    script.textContent = `try { (${installViewerCountPageHook.toString()})((${classifyViewerCountEndpoint.toString()})) } catch {}`
    host.document.documentElement.append(script)
    return script.getAttribute(INSTALL_RESULT_ATTRIBUTE) === 'true'
  } finally {
    script.remove()
  }
}

function pickDescriptor(descriptor) {
  return {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    writable: descriptor.writable,
  }
}
