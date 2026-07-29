// ==UserScript==
// @name         Kick Enhancer (development)
// @namespace    kick-enhancer/userscript
// @version      0.1.0
// @description  Development loader for Kick Enhancer.
// @match        https://kick.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      localhost
// @run-at       document-start
// @noframes
// ==/UserScript==

;(() => {
  const buildUrl = 'http://localhost:5173/kick-enhancer.user.js'
  const retryDelay = 1_000
  let currentSource
  let requestInFlight = false
  let reportedUnavailable = false

  function fetchBuild(onSuccess) {
    if (requestInFlight) {
      return
    }

    requestInFlight = true
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${buildUrl}?t=${Date.now()}`,
      timeout: 5_000,
      onload(response) {
        requestInFlight = false

        if (response.status < 200 || response.status >= 300) {
          reportUnavailable(`HTTP ${response.status}`)
          return
        }

        reportedUnavailable = false
        onSuccess(response.responseText)
      },
      onabort() {
        requestInFlight = false
      },
      onerror() {
        requestInFlight = false
        reportUnavailable('request failed')
      },
      ontimeout() {
        requestInFlight = false
        reportUnavailable('request timed out')
      },
    })
  }

  function reportUnavailable(reason) {
    if (reportedUnavailable) {
      return
    }

    reportedUnavailable = true
    console.warn(`[Kick Enhancer] Development build unavailable: ${reason}.`)
  }

  function loadInitialBuild(source) {
    currentSource = source

    try {
      eval(`${source}\n//# sourceURL=kick-enhancer.dev.js`)
    } catch (error) {
      console.error('[Kick Enhancer] Development build failed to start.', error)
    }
  }

  function checkForChanges(source) {
    if (currentSource === undefined) {
      loadInitialBuild(source)
      return
    }

    if (source !== currentSource) {
      window.location.reload()
    }
  }

  fetchBuild(loadInitialBuild)
  window.setInterval(() => fetchBuild(checkForChanges), retryDelay)
})()
