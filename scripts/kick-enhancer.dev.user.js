// ==UserScript==
// @name         KICK Enhancer (development)
// @namespace    kick-enhancer/userscript
// @author       emy
// @icon         data:image/png;base64,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
// @version      0.1.0
// @description  Development loader for KICK Enhancer.
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
    console.warn(`[KICK Enhancer] Development build unavailable: ${reason}.`)
  }

  function loadInitialBuild(source) {
    currentSource = source

    try {
      eval(`${source}\n//# sourceURL=kick-enhancer.dev.js`)
    } catch (error) {
      console.error('[KICK Enhancer] Development build failed to start.', error)
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
