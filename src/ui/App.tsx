import { render } from 'preact'
import { useState } from 'preact/hooks'

import icon from '../assets/icon.png?inline'
import {
  openDownloadCenter,
  useDownloadActivity,
} from '../features/clipDownloads'
import { type Dispose } from '../lifecycle'
import { DownloadIcon, LoadingSpinnerIcon } from '../icons'
import { SettingsModal } from '../settings/SettingsModal'
import { useSettings } from '../settings/useSettings'
import { installSharedUiStyles } from '../styles/sharedUi'
import styles from './app.scss?inline'
import { findTopNavActions } from './topNavAnchor'

export function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const downloadActivity = useDownloadActivity()
  const settings = useSettings()
  const downloadCount =
    downloadActivity.activeCount + downloadActivity.queuedCount

  return (
    <>
      {downloadActivity.visible ? (
        <button
          aria-label={
            downloadActivity.attention
              ? 'Open Download Manager; a download needs attention'
              : 'Open Download Manager'
          }
          class={`kick-enhancer-button kick-enhancer-download-button${
            downloadActivity.error ? ' is-error' : ''
          }${downloadActivity.attention ? ' needs-attention' : ''}`}
          data-kick-enhancer="download-activity"
          onClick={() => openDownloadCenter()}
          type="button"
        >
          {downloadActivity.activeCount > 0 ? (
            <LoadingSpinnerIcon class="ke-icon kick-enhancer-download-button__icon ke-icon--spinner" />
          ) : (
            <DownloadIcon class="ke-icon kick-enhancer-download-button__icon" />
          )}
          {downloadCount > 0 ? (
            <span
              aria-label={`${downloadCount} active or queued downloads`}
              className="kick-enhancer-download-button__badge"
            >
              {downloadCount > 9 ? '9+' : downloadCount}
            </span>
          ) : null}
        </button>
      ) : null}
      <button
        aria-label="Open KICK Enhancer settings"
        class="kick-enhancer-button"
        data-kick-enhancer="top-nav-button"
        onClick={() => setSettingsOpen(true)}
        type="button"
      >
        <img
          alt=""
          class="kick-enhancer-button__icon"
          draggable={false}
          src={icon}
        />
      </button>
      <SettingsModal
        onRequestClose={() => setSettingsOpen(false)}
        open={settingsOpen}
        settings={settings}
      />
    </>
  )
}

const HOST_ID = 'kick-enhancer-top-nav'
const STYLE_ID = 'kick-enhancer-styles'
let mountedHost: HTMLElement | null = null
let stopActiveFeature: Dispose | undefined

function installStyles() {
  installSharedUiStyles()

  if (document.getElementById(STYLE_ID)) {
    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = styles
  document.documentElement.append(style)
}

function mountButton() {
  if (mountedHost && !mountedHost.isConnected) {
    render(null, mountedHost)
    mountedHost = null
  }

  if (document.getElementById(HOST_ID)) {
    return
  }

  const actions = findTopNavActions()

  if (!actions) {
    return
  }

  const host = document.createElement('span')
  host.id = HOST_ID
  host.className = 'kick-enhancer-host'
  actions.prepend(host)
  mountedHost = host

  render(<App />, host)
}

export function startTopNavButton(): Dispose {
  stopActiveFeature?.()
  installStyles()
  mountButton()

  let mountScheduled = false
  let stopped = false

  const observer = new MutationObserver(() => {
    if (stopped || mountScheduled || document.getElementById(HOST_ID)) {
      return
    }

    mountScheduled = true

    // Let Kick finish replacing the navigation subtree before resolving the
    // new anchor and mounting into it.
    queueMicrotask(() => {
      mountScheduled = false

      if (!stopped) {
        mountButton()
      }
    })
  })

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })

  const stop = () => {
    if (stopped) {
      return
    }

    stopped = true
    observer.disconnect()

    const host = mountedHost ?? document.getElementById(HOST_ID)

    if (host) {
      render(null, host)
      host.remove()
    }

    mountedHost = null
    document.getElementById(STYLE_ID)?.remove()

    if (stopActiveFeature === stop) {
      stopActiveFeature = undefined
    }
  }

  stopActiveFeature = stop
  return stop
}
