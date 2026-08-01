import styles from './homepageCarousel.scss?inline'
import { createStyleSettingFeature } from '../shared/styleSettingFeature'

const STYLE_ID = 'kick-enhancer-hide-homepage-carousel'

export const startHomepageCarouselVisibility = createStyleSettingFeature({
  id: STYLE_ID,
  selectEnabled: (settings) => settings.ui.hideHomepageCarousel,
  styles,
})
