import { useEffect } from 'preact/hooks'

export function useModalFocusRestoration(open: boolean) {
  useEffect(() => {
    if (!open) {
      return
    }

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    return () => {
      if (previousFocus?.isConnected) {
        previousFocus.focus()
      }
    }
  }, [open])
}
