import styles from './chatLeaderboard.scss?inline'
import { createStyleSettingFeature } from './styleSettingFeature'

const STYLE_ID = 'kick-enhancer-hide-chat-leaderboard'

export const startChatLeaderboardVisibility =
  createStyleSettingFeature({
    id: STYLE_ID,
    selectEnabled: (settings) =>
      settings.ui.hideChatLeaderboard,
    styles,
  })
