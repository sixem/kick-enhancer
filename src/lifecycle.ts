export type Dispose = () => void

export function composeDisposers(...disposers: readonly Dispose[]): Dispose {
  let disposed = false

  return () => {
    if (disposed) {
      return
    }

    disposed = true

    // Mirror startup order so later-started features are disposed first.
    for (let index = disposers.length - 1; index >= 0; index -= 1) {
      disposers[index]?.()
    }
  }
}
