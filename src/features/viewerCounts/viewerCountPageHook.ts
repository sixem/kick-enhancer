import type { ViewerCountEndpoint } from './model/types.ts'

type ClassifyEndpoint = (
  rawUrl: string,
  baseUrl?: string,
) => ViewerCountEndpoint | undefined

export function installViewerCountPageHook(classifyEndpoint: ClassifyEndpoint) {
  const INSTALL_RESULT_ATTRIBUTE = 'data-kick-enhancer-viewer-count-hook'
  const MESSAGE_SOURCE = 'kick-enhancer-viewer-counts'
  const MESSAGE_TYPE = 'KICK_ENHANCER_API_RESPONSE'
  const pageWindow = window as Window &
    typeof globalThis & {
      __kickEnhancerViewerCountHookInstalled?: boolean
    }
  const installScript = document.currentScript
  const responsePrototype = pageWindow.Response.prototype
  const originalDescriptor = Object.getOwnPropertyDescriptor(
    responsePrototype,
    'json',
  )
  let hookedJson: Response['json'] | undefined
  let replaced = false

  try {
    if (pageWindow.__kickEnhancerViewerCountHookInstalled) {
      installScript?.setAttribute(INSTALL_RESULT_ATTRIBUTE, 'true')
      return
    }

    // Deliberately detach the method and invoke it with the received response.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalJson = responsePrototype.json

    hookedJson = new Proxy(originalJson, {
      apply(target, thisArgument: Response, argumentsList) {
        const payloadPromise = Reflect.apply(
          target,
          thisArgument,
          argumentsList,
        ) as Promise<unknown>

        try {
          const url = thisArgument.url
          const endpoint = classifyEndpoint(url, pageWindow.location.href)

          if (endpoint) {
            void payloadPromise.then(
              (payload) => {
                try {
                  pageWindow.postMessage(
                    {
                      endpoint,
                      payload,
                      source: MESSAGE_SOURCE,
                      timestamp: Date.now(),
                      type: MESSAGE_TYPE,
                      url,
                    },
                    pageWindow.location.origin,
                  )
                } catch {
                  // KICK still receives the original fulfilled promise.
                }
              },
              () => {
                // KICK still receives the original rejected promise.
              },
            )
          }
        } catch {
          // Observation failures must not change the original promise.
        }

        return payloadPromise
      },
    })

    Object.defineProperty(responsePrototype, 'json', {
      configurable: originalDescriptor?.configurable ?? true,
      enumerable: originalDescriptor?.enumerable ?? false,
      value: hookedJson,
      writable:
        originalDescriptor && 'writable' in originalDescriptor
          ? originalDescriptor.writable
          : true,
    })
    replaced = responsePrototype.json === hookedJson

    if (!replaced) {
      return
    }

    pageWindow.__kickEnhancerViewerCountHookInstalled = true
    installScript?.setAttribute(INSTALL_RESULT_ATTRIBUTE, 'true')
  } catch {
    if (replaced && responsePrototype.json === hookedJson) {
      try {
        if (originalDescriptor) {
          Object.defineProperty(responsePrototype, 'json', originalDescriptor)
        } else {
          Reflect.deleteProperty(responsePrototype, 'json')
        }
      } catch {
        // Installation fails closed if the original cannot be restored.
      }
    }

    pageWindow.__kickEnhancerViewerCountHookInstalled = false
  }
}
