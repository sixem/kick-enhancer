export type ResolvedClipCard<TCard, TContainer> = Readonly<{
  card: TCard
  clipId: string
  container: TContainer
}>

type ReconcilerOptions<TCard extends object, TContainer, TMount> = Readonly<{
  isCardConnected: (card: TCard) => boolean
  isMountConnected: (mount: TMount) => boolean
  mount: (resolution: ResolvedClipCard<TCard, TContainer>) => TMount
  resolve: (card: TCard) => ResolvedClipCard<TCard, TContainer> | undefined
  unmount: (mount: TMount) => void
  update: (
    mount: TMount,
    resolution: ResolvedClipCard<TCard, TContainer>,
  ) => void
}>

type MountedCard<TCard, TContainer, TMount> = {
  card: TCard
  clipId: string
  container: TContainer
  mount: TMount
}

export function createClipCardReconciler<
  TCard extends object,
  TContainer,
  TMount,
>({
  isCardConnected,
  isMountConnected,
  mount,
  resolve,
  unmount,
  update,
}: ReconcilerOptions<TCard, TContainer, TMount>) {
  // Kick can recycle a connected card for another clip, so DOM identity alone
  // is not enough to decide whether an existing mount is current.
  const mountedByCard = new WeakMap<
    TCard,
    MountedCard<TCard, TContainer, TMount>
  >()
  const mountedCards = new Set<MountedCard<TCard, TContainer, TMount>>()

  function removeMountedCard(mounted: MountedCard<TCard, TContainer, TMount>) {
    unmount(mounted.mount)
    mountedByCard.delete(mounted.card)
    mountedCards.delete(mounted)
  }

  function reconcile(card: TCard) {
    const mounted = mountedByCard.get(card)
    const resolution = resolve(card)

    if (!resolution) {
      if (mounted) {
        removeMountedCard(mounted)
      }

      return
    }

    if (
      mounted &&
      mounted.container === resolution.container &&
      isMountConnected(mounted.mount)
    ) {
      if (mounted.clipId !== resolution.clipId) {
        mounted.clipId = resolution.clipId
        update(mounted.mount, resolution)
      }

      return
    }

    if (mounted) {
      removeMountedCard(mounted)
    }

    const mountedCard = {
      card,
      clipId: resolution.clipId,
      container: resolution.container,
      mount: mount(resolution),
    }
    mountedByCard.set(card, mountedCard)
    mountedCards.add(mountedCard)
  }

  return {
    reconcile,
    removeDisconnected() {
      for (const mounted of mountedCards) {
        if (
          !isCardConnected(mounted.card) ||
          !isMountConnected(mounted.mount)
        ) {
          removeMountedCard(mounted)
        }
      }
    },
    teardown() {
      for (const mounted of [...mountedCards]) {
        removeMountedCard(mounted)
      }
    },
  }
}
