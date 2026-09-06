import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const source = readFileSync(
  new URL('../scripts/kick-enhancer.dev.user.js', import.meta.url),
  'utf8',
)

test('loads through the Greasemonkey API and reloads when the build changes', () => {
  const requests = []
  const GM = {
    xmlHttpRequest(details) {
      assert.equal(this, GM)
      requests.push(details)
    },
  }
  const harness = run({ GM })
  assert.equal(requests.length, 1)
  harness.poll()
  assert.equal(requests.length, 1)
  requests[0].onload({ status: 200, responseText: 'globalThis.loaded = true' })
  assert.equal(harness.context.loaded, true)
  harness.poll()
  requests[1].onload({ status: 200, responseText: 'globalThis.loaded = true' })
  assert.equal(harness.reloads(), 0)
  harness.poll()
  requests[2].onload({ status: 200, responseText: 'globalThis.loaded = false' })
  assert.equal(harness.reloads(), 1)
})

test('retains the legacy request API fallback', () => {
  const requests = []
  run({ GM_xmlhttpRequest: (details) => requests.push(details) })
  assert.equal(requests.length, 1)
  assert.equal(requests[0].method, 'GET')
  assert.ok(requests[0].url.startsWith('http://localhost:5173/'))
})

test('retries after thrown errors and rejected request promises', async () => {
  let attempts = 0
  const harness = run({
    GM: {
      xmlHttpRequest() {
        attempts += 1
        if (attempts === 1) throw new Error('failed')
        return Promise.reject(new Error('failed'))
      },
    },
  })
  harness.poll()
  await new Promise((resolve) => setImmediate(resolve))
  harness.poll()
  await new Promise((resolve) => setImmediate(resolve))
  assert.equal(attempts, 3)
  assert.equal(harness.warnings.length, 1)
})

test('reports missing grants without throwing or polling', () => {
  const harness = run({ GM: {} })
  assert.equal(harness.poll, undefined)
  assert.match(harness.warnings[0], /reinstall the development loader/)
})

function run(globals) {
  let poll
  let reloads = 0
  const warnings = []
  const context = {
    ...globals,
    console: { warn: (message) => warnings.push(message), error: () => {} },
    window: {
      location: {
        reload() {
          reloads += 1
        },
      },
      setInterval(callback) {
        poll = callback
      },
    },
  }
  runInNewContext(source, context)
  return { context, poll, warnings, reloads: () => reloads }
}
