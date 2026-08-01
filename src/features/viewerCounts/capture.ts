import { unsafeWindow } from '$'

import { createLogger } from '../../logging/logger'
import { classifyViewerCountEndpoint } from './acquisition/endpoints'
import {
  VIEWER_COUNT_MESSAGE_SOURCE,
  VIEWER_COUNT_MESSAGE_TYPE,
  type CapturedViewerCountMessage,
} from './model/types'

const log = createLogger('viewer-counts:capture')

type ViewerCountPageWindow = Window &
  typeof globalThis & {
    __kickEnhancerViewerCountHookInstalled?: boolean
  }

export function installViewerCountCaptureBridge() {
  const pageWindow = unsafeWindow as ViewerCountPageWindow

  try {
    if (pageWindow.__kickEnhancerViewerCountHookInstalled) {
      return true
    }

    // The original method is deliberately detached and later invoked with the
    // response as its receiver through Reflect.apply.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalJson = pageWindow.Response.prototype.json
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      pageWindow.Response.prototype,
      'json',
    )

    // Observe the page's promise without replacing it, preserving the exact
    // fulfillment and rejection behavior Kick expects.
    const hookedJson = new Proxy(originalJson, {
      apply(target, thisArgument: Response, argumentsList) {
        const payloadPromise = Reflect.apply(
          target,
          thisArgument,
          argumentsList,
        ) as Promise<unknown>
        const endpoint = classifyViewerCountEndpoint(
          thisArgument.url,
          pageWindow.location.href,
        )

        if (endpoint) {
          void payloadPromise
            .then((payload) => {
              const message: CapturedViewerCountMessage = {
                endpoint,
                payload,
                source: VIEWER_COUNT_MESSAGE_SOURCE,
                timestamp: Date.now(),
                type: VIEWER_COUNT_MESSAGE_TYPE,
                url: thisArgument.url,
              }

              pageWindow.postMessage(message, pageWindow.location.origin)
            })
            .catch(() => {
              // Kick still receives the original rejected promise.
            })
        }

        return payloadPromise
      },
    })

    Object.defineProperty(pageWindow.Response.prototype, 'json', {
      ...originalDescriptor,
      configurable: true,
      value: hookedJson,
      writable: true,
    })

    pageWindow.__kickEnhancerViewerCountHookInstalled = true
    log.info('Installed')
    return true
  } catch (error) {
    log.warn('Unavailable; using fallback', error)
    return false
  }
}
