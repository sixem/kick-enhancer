import { unsafeWindow } from '$'

import { type Dispose } from '../../lifecycle'
import { observeSetting } from '../../settings/settings'
import { getChatStatisticsRuntime } from '../chatStatistics/runtime.ts'
import { applyStyleToggle } from '../shared/styleToggle.ts'
import { DeletedMessagesController } from './controller.ts'
import styles from './deletedMessages.scss?inline'

const STYLE_ID = 'kick-enhancer-deleted-messages-styles'

let stopActiveFeature: Dispose | undefined

export function startDeletedMessages(): Dispose {
  stopActiveFeature?.()

  const controller = new DeletedMessagesController(
    getChatStatisticsRuntime(),
    unsafeWindow.document,
    (callback) => new MutationObserver(callback),
  )
  const stopCapacity = observeSetting(
    (settings) => settings.chat.deletedMessageCacheSize,
    (capacity) => {
      controller.setCapacity(capacity)
    },
  )
  const stopEnabled = observeSetting(
    (settings) => settings.chat.showDeletedMessages,
    (enabled) => {
      controller.setEnabled(enabled)
      applyStyleToggle(STYLE_ID, styles, enabled)
    },
  )
  let stopped = false
  const stop = () => {
    if (stopped) {
      return
    }

    stopped = true
    stopEnabled()
    stopCapacity()
    controller.dispose()
    applyStyleToggle(STYLE_ID, styles, false)

    if (stopActiveFeature === stop) {
      stopActiveFeature = undefined
    }
  }

  stopActiveFeature = stop
  return stop
}
