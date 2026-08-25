import { unsafeWindow } from '$'

import { createLogger } from '../../logging/logger'
import { classifyViewerCountEndpoint } from './acquisition/endpoints.ts'
import { installViewerCountPageHook } from './viewerCountPageHook.ts'

const log = createLogger('viewer-counts:capture')
const INSTALL_RESULT_ATTRIBUTE = 'data-kick-enhancer-viewer-count-hook'

export function installViewerCountCaptureBridge() {
  const pageWindow = unsafeWindow

  try {
    const installTarget = pageWindow.document.documentElement

    if (!installTarget) {
      throw new Error('The page document is not ready.')
    }

    const script = pageWindow.document.createElement('script')
    let installed = false

    try {
      script.textContent = `try { (${installViewerCountPageHook.toString()})((${classifyViewerCountEndpoint.toString()})) } catch {}`
      installTarget.append(script)
      installed = script.getAttribute(INSTALL_RESULT_ATTRIBUTE) === 'true'
    } finally {
      script.remove()
    }

    if (!installed) {
      throw new Error('The page-context hook could not be installed.')
    }

    log.info('Installed')
    return true
  } catch (error) {
    log.warn('Unavailable; using fallback', error)
    return false
  }
}
