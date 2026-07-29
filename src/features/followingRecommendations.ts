import styles from './followingRecommendations.scss?inline'
import { createStyleSettingFeature } from './styleSettingFeature'

const STYLE_ID = 'kick-enhancer-hide-following-recommendations'

export const startFollowingRecommendationsVisibility =
  createStyleSettingFeature({
    id: STYLE_ID,
    selectEnabled: (settings) =>
      settings.ui.hideFollowingRecommendations,
    styles,
  })
