import styles from './recommendedChannels.scss?inline'
import { createStyleSettingFeature } from '../shared/styleSettingFeature'

const STYLE_ID = 'kick-enhancer-hide-recommended-channels'

export const startRecommendedChannelsVisibility = createStyleSettingFeature({
  id: STYLE_ID,
  selectEnabled: (settings) => settings.ui.hideRecommendedChannels,
  styles,
})
