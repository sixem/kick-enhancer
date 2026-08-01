import { useEffect, useState } from 'preact/hooks'

import icon from '../assets/icon.png?inline'
import {
  ConfirmationDialog,
  type ConfirmationDialogProps,
} from '../components/ConfirmationDialog'
import { Modal } from '../components/Modal'
import { Tabs } from '../components/Tabs'
import { Button } from '../components/forms'
import { GitHubIcon } from '../icons'
import { AboutTab } from './AboutTab'
import { DiagnosticsTab } from './DiagnosticsTab'
import { replaceSettings, resetSettings, type Settings } from './settings'
import {
  ChatSettingsSection,
  ContentSettingsSection,
  SidebarSettingsSection,
  StreamAndClipSettingsSection,
} from './SettingsSections'

type SettingsModalProps = {
  onRequestClose: () => void
  open: boolean
  settings: Settings
}

type SettingsDialog = Omit<ConfirmationDialogProps, 'open'>

const PROJECT_URL = 'https://github.com/sixem/kick-enhancer'

export function SettingsModal({
  onRequestClose,
  open,
  settings,
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState('about')
  const [dialog, setDialog] = useState<SettingsDialog | null>(null)
  const dialogOpen = dialog !== null
  const closeDialog = () => setDialog(null)

  useEffect(() => {
    if (!open) {
      setDialog(null)
    }
  }, [open])

  const showMessage = (title: string, description: string) => {
    setDialog({
      description,
      onConfirm: closeDialog,
      onDismiss: closeDialog,
      title,
    })
  }

  const showImportError = () =>
    showMessage(
      'Could not import settings',
      'Choose a valid KICK Enhancer settings JSON file and try again.',
    )

  const showImportConfirmation = (
    importedSettings: Settings,
    compatibilityWarning: boolean,
  ) => {
    setDialog({
      confirmLabel: 'Import settings',
      description: compatibilityWarning
        ? 'Some values are missing, unknown, or invalid. Compatible settings will be imported and unsupported values will use current defaults.'
        : 'This will replace every current setting with the values from this file.',
      onCancel: closeDialog,
      onConfirm: () => {
        void replaceSettings(importedSettings)
        closeDialog()
      },
      title: compatibilityWarning
        ? 'Import settings with warnings?'
        : 'Import settings?',
    })
  }

  const showResetConfirmation = () => {
    setDialog({
      confirmLabel: 'Reset settings',
      confirmTone: 'danger',
      description:
        'This restores every KICK Enhancer setting to its default value.',
      onCancel: closeDialog,
      onConfirm: () => {
        void resetSettings()
        closeDialog()
      },
      title: 'Reset all settings?',
    })
  }

  return (
    <Modal
      className="ke-workspace-modal ke-settings-modal"
      description="Customize how KICK behaves and looks."
      dismissDisabled={dialogOpen}
      footer={
        <>
          <Button
            aria-label="Open KICK Enhancer on GitHub"
            className="ke-settings-modal__github"
            disabled={dialogOpen}
            onClick={() => {
              window.open(PROJECT_URL, '_blank', 'noopener,noreferrer')
            }}
          >
            <GitHubIcon class="ke-settings-modal__github-icon" />
            GitHub
          </Button>
          <Button
            disabled={dialogOpen}
            onClick={showResetConfirmation}
            tone="danger"
          >
            Reset to defaults
          </Button>
          <Button
            className="ke-button--primary"
            disabled={dialogOpen}
            onClick={onRequestClose}
          >
            Done
          </Button>
        </>
      }
      icon={icon}
      onRequestClose={onRequestClose}
      open={open}
      title="KICK Enhancer"
    >
      <div className="ke-confirmation-host">
        <div
          aria-hidden={dialogOpen || undefined}
          className="ke-settings-modal__tabs"
          inert={dialogOpen}
        >
          <Tabs
            ariaLabel="KICK Enhancer settings"
            onChange={setActiveTab}
            tabs={[
              {
                content: (
                  <AboutTab
                    onImportError={showImportError}
                    onImportRequest={showImportConfirmation}
                  />
                ),
                contentClassName: 'ke-tabs__panel-content--centered',
                id: 'about',
                label: 'About',
              },
              {
                content: (
                  <StreamAndClipSettingsSection settings={settings.ui} />
                ),
                id: 'streams',
                label: 'Streams / Clips',
              },
              {
                content: (
                  <ChatSettingsSection open={open} settings={settings.chat} />
                ),
                id: 'chat',
                label: 'Chat',
              },
              {
                content: <ContentSettingsSection settings={settings.ui} />,
                id: 'content',
                label: 'Visibility',
              },
              {
                content: <SidebarSettingsSection settings={settings.ui} />,
                id: 'sidebar',
                label: 'Sidebar',
              },
              {
                content: (
                  <DiagnosticsTab
                    active={activeTab === 'diagnostics'}
                    onShowMessage={showMessage}
                  />
                ),
                id: 'diagnostics',
                label: 'Diagnostics',
              },
            ]}
            value={activeTab}
          />
        </div>
        {dialog ? <ConfirmationDialog {...dialog} open /> : null}
      </div>
    </Modal>
  )
}
