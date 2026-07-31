import { useMemo } from 'preact/hooks'

import {
  Button,
  SelectBox,
  Toggle,
  TrackBar,
} from '../components/forms'
import {
  resetChatAppearance,
  setChatFontFamily,
  setChatFontSize,
  setChatFontWeight,
  setChatMessageDividers,
  setChatMessageSpacing,
  setHideChatLeaderboard,
  setHideFollowingRecommendations,
  setHideGamblingStreams,
  setHideHomepageCarousel,
  setHideRecommendedChannels,
  setRememberSidebarState,
  setShowClipDownloadButtons,
  setShowHiddenViewerCounts,
  setShowChatStatistics,
  setShowStreamUptime,
} from './actions'
import {
  CHAT_FONT_SIZE_DEFAULT,
  CHAT_FONT_SIZE_MAX,
  CHAT_FONT_SIZE_MIN,
  CHAT_FONT_WEIGHT_DEFAULT,
  CHAT_FONT_WEIGHT_MAX,
  CHAT_FONT_WEIGHT_MIN,
  CHAT_MESSAGE_SPACING_DEFAULT,
  CHAT_MESSAGE_SPACING_MAX,
  CHAT_MESSAGE_SPACING_MIN,
  normalizeChatValue,
  type ChatFontFamily,
  type Settings,
} from './settings'

export function StreamAndClipSettingsSection({
  settings,
}: Readonly<{ settings: Settings['ui'] }>) {
  return (
    <div className="ke-settings">
      <Toggle
        checked={settings.showHiddenViewerCounts}
        description="Restore KICK-reported viewer counts on live channels."
        label="Show hidden viewer counts"
        onCheckedChange={(visible) => {
          void setShowHiddenViewerCounts(visible)
        }}
      />
      <Toggle
        checked={settings.showStreamUptime}
        description="Show how long live streams have been running on thumbnails and sidebar tooltips."
        label="Show stream uptime"
        onCheckedChange={(visible) => {
          void setShowStreamUptime(visible)
        }}
      />
      <Toggle
        checked={settings.showClipDownloadButtons}
        description="Show KICK Enhancer download actions on clip cards and clip pages."
        label="Show clip download buttons"
        onCheckedChange={(visible) => {
          void setShowClipDownloadButtons(visible)
        }}
      />
    </div>
  )
}

export function ChatSettingsSection({
  open,
  settings,
}: Readonly<{
  open: boolean
  settings: Settings['chat']
}>) {
  const kickDefaults = useMemo(
    () => ({
      fontSize: readKickChatValue(
        '--chatroom-font-size',
        CHAT_FONT_SIZE_DEFAULT,
        CHAT_FONT_SIZE_MIN,
        CHAT_FONT_SIZE_MAX,
      ),
      messageSpacing: readKickChatValue(
        '--chatroom-message-spacing',
        CHAT_MESSAGE_SPACING_DEFAULT,
        CHAT_MESSAGE_SPACING_MIN,
        CHAT_MESSAGE_SPACING_MAX,
      ),
    }),
    [open],
  )

  return (
    <div className="ke-settings">
      <SelectBox
        description="Change the typeface used throughout the chatroom."
        label="Chat font"
        onValueChange={(value) => {
          void setChatFontFamily(
            value === 'default'
              ? null
              : (value as ChatFontFamily),
          )
        }}
        options={CHAT_FONT_FAMILY_OPTIONS}
        value={settings.fontFamily ?? 'default'}
      />
      <TrackBar
        description="Adjust message text without changing usernames, timestamps, or controls."
        formatValue={(value) =>
          settings.fontWeight === null
            ? `KICK default (${value})`
            : String(value)
        }
        label="Message font weight"
        max={CHAT_FONT_WEIGHT_MAX}
        min={CHAT_FONT_WEIGHT_MIN}
        onValueChange={(value) => {
          void setChatFontWeight(value)
        }}
        step={100}
        value={settings.fontWeight ?? CHAT_FONT_WEIGHT_DEFAULT}
      />
      <TrackBar
        description="Adjust chat messages, timestamps, replies, and emotes together."
        formatValue={(value) =>
          settings.fontSize === null
            ? `KICK default (${value}px)`
            : `${value}px`
        }
        label="Chat font size"
        max={CHAT_FONT_SIZE_MAX}
        min={CHAT_FONT_SIZE_MIN}
        onValueChange={(value) => {
          void setChatFontSize(value)
        }}
        step={1}
        value={settings.fontSize ?? kickDefaults.fontSize}
      />
      <TrackBar
        description="Adjust the vertical space inside each chat message."
        formatValue={(value) =>
          settings.messageSpacing === null
            ? `KICK default (${value}px)`
            : `${value}px`
        }
        label="Message spacing"
        max={CHAT_MESSAGE_SPACING_MAX}
        min={CHAT_MESSAGE_SPACING_MIN}
        onValueChange={(value) => {
          void setChatMessageSpacing(value)
        }}
        step={1}
        value={
          settings.messageSpacing ?? kickDefaults.messageSpacing
        }
      />
      <Toggle
        checked={settings.messageDividers}
        description="Add a subtle divider between chat messages."
        label="Message dividers"
        onCheckedChange={(enabled) => {
          void setChatMessageDividers(enabled)
        }}
      />
      <Toggle
        checked={settings.showChatStatistics}
        description="Show live message activity, active chatters, socket RTT, and session totals in chat."
        label="Show chat statistics"
        onCheckedChange={(visible) => {
          void setShowChatStatistics(visible)
        }}
      />
      <div className="ke-settings__actions">
        <Button
          density="compact"
          disabled={
            settings.fontFamily === null &&
            settings.fontSize === null &&
            settings.fontWeight === null &&
            !settings.messageDividers &&
            settings.messageSpacing === null
          }
          onClick={() => {
            void resetChatAppearance()
          }}
        >
          Use KICK defaults
        </Button>
      </div>
    </div>
  )
}

export function ContentSettingsSection({
  settings,
}: Readonly<{ settings: Settings['ui'] }>) {
  return (
    <div className="ke-settings">
      <Toggle
        checked={settings.hideChatLeaderboard}
        description="Remove the gift and KICKs leaderboard above chat."
        label="Hide chat leaderboard"
        onCheckedChange={(hidden) => {
          void setHideChatLeaderboard(hidden)
        }}
      />
      <Toggle
        checked={settings.hideHomepageCarousel}
        description="Remove the featured autoplaying stream and chat from the homepage."
        label="Hide homepage carousel"
        onCheckedChange={(hidden) => {
          void setHideHomepageCarousel(hidden)
        }}
      />
      <Toggle
        checked={settings.hideGamblingStreams}
        description="Hide live followed gambling streams."
        label="Hide followed gambling streams"
        onCheckedChange={(hidden) => {
          void setHideGamblingStreams(hidden)
        }}
      />
      <Toggle
        checked={settings.hideFollowingRecommendations}
        description='Remove the "Channels you might like" section from the Following page.'
        label='Hide "Channels you might like"'
        onCheckedChange={(hidden) => {
          void setHideFollowingRecommendations(hidden)
        }}
      />
    </div>
  )
}

export function SidebarSettingsSection({
  settings,
}: Readonly<{ settings: Settings['ui'] }>) {
  return (
    <div className="ke-settings">
      <Toggle
        checked={settings.hideRecommendedChannels}
        description="Remove recommended channels and their controls from the sidebar."
        label="Hide recommended channels"
        onCheckedChange={(hidden) => {
          void setHideRecommendedChannels(hidden)
        }}
      />
      <Toggle
        checked={settings.rememberSidebarState}
        description="Restore the sidebar to its last expanded or collapsed state on reloads."
        label="Remember sidebar state"
        onCheckedChange={(enabled) => {
          void setRememberSidebarState(enabled)
        }}
      />
    </div>
  )
}

const CHAT_FONT_FAMILY_OPTIONS = [
  { label: 'KICK default', value: 'default' },
  { label: 'Arial', value: 'arial' },
  { label: 'Verdana', value: 'verdana' },
  { label: 'Tahoma', value: 'tahoma' },
  { label: 'Trebuchet MS', value: 'trebuchet' },
  { label: 'Georgia', value: 'georgia' },
  { label: 'Monospace', value: 'monospace' },
] as const

function readKickChatValue(
  property: string,
  fallback: number,
  min: number,
  max: number,
) {
  const value = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      property,
    ),
  )

  return normalizeChatValue(value, min, max) ?? fallback
}
