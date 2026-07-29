import { startChatAppearance } from './features/chatAppearance'
import { startClipDownloadActions } from './features/clipDownloads'
import { startFollowingRecommendationsVisibility } from './features/followingRecommendations'
import { startGamblingStreamsVisibility } from './features/gamblingStreams'
import { startHomepageCarouselVisibility } from './features/homepageCarousel'
import { startRecommendedChannelsVisibility } from './features/recommendedChannels'
import { startSidebarStateMemory } from './features/sidebarState'
import {
  initializeViewerCountCapture,
  startViewerEnhancements,
} from './features/viewerCounts'
import {
  composeDisposers,
  type Dispose,
} from './lifecycle'
import { createLogger } from './logging/logger'
import { initializeSettings } from './settings/settings'
import { startTopNavButton } from './ui/App'

const log = createLogger('app')
let stopFeatures: Dispose | undefined

// Capture must be installed at document-start; waiting for settings I/O can
// miss responses Kick consumes during its initial render.
initializeViewerCountCapture()

async function start() {
  await initializeSettings()

  stopFeatures?.()
  stopFeatures = composeDisposers(
    startChatAppearance(),
    startClipDownloadActions(),
    startViewerEnhancements(),
    startFollowingRecommendationsVisibility(),
    startGamblingStreamsVisibility(),
    startHomepageCarouselVisibility(),
    startRecommendedChannelsVisibility(),
    startSidebarStateMemory(),
    startTopNavButton(),
  )

  log.info('Ready')
}

void start()
