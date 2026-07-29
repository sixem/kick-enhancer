import type {
  CurrentViewerRecord,
  ViewerCountRecord,
  ViewerCountSource,
} from './types.ts'

const MAX_RECORD_AGE_MS = 5 * 60 * 1000
const MAX_STORED_STREAMS = 500

const SOURCE_PRIORITY: Readonly<Record<ViewerCountSource, number>> = {
  'channel-details': 6,
  'current-viewers': 7,
  featured: 2,
  'followed-channels': 4,
  recommendations: 2,
  'sidebar-recommendations': 3,
  'user-livestreams': 5,
}

export class ViewerCountStore {
  readonly #currentViewersById = new Map<
    number,
    CurrentViewerRecord
  >()

  readonly #slugByLivestreamId = new Map<number, string>()
  readonly #streamsBySlug = new Map<string, ViewerCountRecord>()

  upsertStreams(streams: readonly ViewerCountRecord[]) {
    let updated = 0

    for (const incoming of streams) {
      const existing = this.#streamsBySlug.get(incoming.channelSlug)

      if (!existing || shouldReplace(existing, incoming)) {
        const replacement = existing
          ? mergeReplacement(existing, incoming)
          : incoming

        if (
          existing?.livestreamId !== undefined &&
          existing.livestreamId !== replacement.livestreamId
        ) {
          this.#slugByLivestreamId.delete(existing.livestreamId)
          this.#currentViewersById.delete(existing.livestreamId)
        }

        this.#streamsBySlug.set(
          replacement.channelSlug,
          replacement,
        )
        updated += 1
      }

      const stored = this.#streamsBySlug.get(incoming.channelSlug)

      if (stored?.livestreamId !== undefined) {
        this.#slugByLivestreamId.set(
          stored.livestreamId,
          stored.channelSlug,
        )
      }
    }

    this.prune()
    return updated
  }

  upsertCurrentViewers(entries: readonly CurrentViewerRecord[]) {
    let updated = 0

    for (const entry of entries) {
      const existing = this.#currentViewersById.get(
        entry.livestreamId,
      )

      if (!existing || entry.capturedAt >= existing.capturedAt) {
        this.#currentViewersById.set(entry.livestreamId, entry)
        updated += 1
      }
    }

    this.prune()
    return updated
  }

  get(channelSlug: string, now = Date.now()) {
    const stream = this.#streamsBySlug.get(channelSlug)

    if (!stream || !stream.isLive) {
      return undefined
    }

    if (stream.livestreamId === undefined) {
      return now - stream.capturedAt <= MAX_RECORD_AGE_MS
        ? stream
        : undefined
    }

    const current = this.#currentViewersById.get(
      stream.livestreamId,
    )
    const currentIsFresh =
      current !== undefined &&
      now - current.capturedAt <= MAX_RECORD_AGE_MS

    if (
      !currentIsFresh ||
      current.capturedAt < stream.capturedAt
    ) {
      return now - stream.capturedAt <= MAX_RECORD_AGE_MS
        ? stream
        : undefined
    }

    return {
      ...stream,
      capturedAt: current.capturedAt,
      showViewCount:
        current.showViewCount ?? stream.showViewCount,
      source: 'current-viewers' as const,
      viewerCount: current.viewerCount,
    }
  }

  getLivestreamIds(channelSlugs: ReadonlySet<string>) {
    const ids = new Set<number>()

    for (const slug of channelSlugs) {
      const stream = this.get(slug)

      if (stream?.livestreamId !== undefined) {
        ids.add(stream.livestreamId)
      }
    }

    return ids
  }

  remove(channelSlug: string) {
    const stream = this.#streamsBySlug.get(channelSlug)

    this.#streamsBySlug.delete(channelSlug)

    if (stream?.livestreamId !== undefined) {
      this.#slugByLivestreamId.delete(stream.livestreamId)
      this.#currentViewersById.delete(stream.livestreamId)
    }
  }

  removeLivestreamIds(livestreamIds: readonly number[]) {
    let removed = 0

    for (const id of livestreamIds) {
      const slug = this.#slugByLivestreamId.get(id)

      if (!slug) {
        continue
      }

      this.remove(slug)
      removed += 1
    }

    return removed
  }

  prune(now = Date.now()) {
    for (const [slug, stream] of this.#streamsBySlug) {
      if (
        now - stream.capturedAt <= MAX_RECORD_AGE_MS ||
        this.get(slug, now)
      ) {
        continue
      }

      this.remove(slug)
    }

    for (const [id, entry] of this.#currentViewersById) {
      if (now - entry.capturedAt > MAX_RECORD_AGE_MS) {
        this.#currentViewersById.delete(id)
      }
    }

    if (this.#streamsBySlug.size <= MAX_STORED_STREAMS) {
      return
    }

    const oldest = [...this.#streamsBySlug.values()]
      .sort((left, right) => left.capturedAt - right.capturedAt)
      .slice(0, this.#streamsBySlug.size - MAX_STORED_STREAMS)

    for (const stream of oldest) {
      this.remove(stream.channelSlug)
    }
  }

  clear() {
    this.#currentViewersById.clear()
    this.#slugByLivestreamId.clear()
    this.#streamsBySlug.clear()
  }
}

function shouldReplace(
  existing: ViewerCountRecord,
  incoming: ViewerCountRecord,
) {
  if (incoming.capturedAt !== existing.capturedAt) {
    return incoming.capturedAt > existing.capturedAt
  }

  return (
    SOURCE_PRIORITY[incoming.source] >=
    SOURCE_PRIORITY[existing.source]
  )
}

function mergeReplacement(
  existing: ViewerCountRecord,
  incoming: ViewerCountRecord,
) {
  const sameLivestream =
    existing.livestreamId === undefined ||
    incoming.livestreamId === undefined ||
    existing.livestreamId === incoming.livestreamId
  // Channel details can omit the privacy decision already observed in a list
  // payload; never re-expose that count for the same live session.
  const preserveHiddenState =
    sameLivestream &&
    !existing.showViewCount &&
    incoming.showViewCount &&
    incoming.source === 'channel-details'
  const startedAt =
    sameLivestream && incoming.startedAt === undefined
      ? existing.startedAt
      : incoming.startedAt

  return {
    ...incoming,
    ...(startedAt === undefined ? {} : { startedAt }),
    ...(preserveHiddenState ? { showViewCount: false } : {}),
  }
}
