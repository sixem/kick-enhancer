type DocumentElementObserver = Pick<MutationObserver, 'disconnect' | 'observe'>

type ObserverFactory = (callback: MutationCallback) => DocumentElementObserver

export function onDocumentElementReady(
  callback: () => void,
  ownerDocument: Document = document,
  createObserver: ObserverFactory = (observerCallback) =>
    new MutationObserver(observerCallback),
) {
  if (ownerDocument.documentElement) {
    callback()
    return () => undefined
  }

  let active = true
  const observer = createObserver(() => {
    if (!active || !ownerDocument.documentElement) {
      return
    }

    active = false
    observer.disconnect()
    callback()
  })

  observer.observe(ownerDocument, {
    childList: true,
  })

  return () => {
    active = false
    observer.disconnect()
  }
}
