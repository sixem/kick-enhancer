import type { JSX } from 'preact'
import { useRef } from 'preact/hooks'

import packageMetadata from '../../package.json'
import icon from '../assets/icon.png?inline'
import { Button } from '../components/forms'
import {
  getSettings,
  parseSettingsFile,
  serializeSettings,
  SETTINGS_VERSION,
  type Settings,
} from './settings'

type AboutTabProps = Readonly<{
  onImportError: () => void
  onImportRequest: (
    settings: Settings,
    compatibilityWarning: boolean,
  ) => void
}>

export function AboutTab({
  onImportError,
  onImportRequest,
}: AboutTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const rejectImport = () => onImportError()

  const handleImportSelection = async (
    event: JSX.TargetedEvent<HTMLInputElement>,
  ) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ''

    if (!file) {
      return
    }

    if (file.size > 64 * 1024) {
      return rejectImport()
    }

    let text: string

    try {
      text = await file.text()
    } catch {
      return rejectImport()
    }

    const result = parseSettingsFile(text)

    if (!result.ok) {
      return rejectImport()
    }

    onImportRequest(result.settings, result.compatibilityWarning)
  }

  const exportSettings = () => {
    const blob = new Blob([serializeSettings(getSettings())], {
      type: 'application/json;charset=utf-8',
    })

    triggerDownload(
      blob,
      `kick-enhancer-settings-v${SETTINGS_VERSION}.json`,
    )
  }

  return (
    <section className="ke-about" aria-labelledby="ke-about-title">
      <img
        alt=""
        className="ke-about__icon"
        draggable={false}
        src={icon}
      />
      <div className="ke-about__identity">
        <h3 className="ke-about__title" id="ke-about-title">
          Kick Enhancer
        </h3>
        <p className="ke-about__version">
          Version {packageMetadata.version}
        </p>
      </div>
      <p className="ke-about__description">
        A userscript that makes Kick cleaner and puts useful viewing
        information back in sight.
      </p>
      <div className="ke-about__actions">
        <Button onClick={() => fileInputRef.current?.click()}>
          Import settings
        </Button>
        <Button onClick={exportSettings}>Export settings</Button>
        <input
          accept=".json,application/json"
          hidden
          onChange={(event) => void handleImportSelection(event)}
          ref={fileInputRef}
          type="file"
        />
      </div>
    </section>
  )
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.download = filename
  anchor.href = url
  anchor.hidden = true
  document.body.append(anchor)
  anchor.click()
  anchor.remove()

  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}
