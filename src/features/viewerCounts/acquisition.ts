import { createLogger } from '../../logging/logger.ts'
import { recordViewerEndpointObservation } from './diagnostics.ts'
import { isAbortError, requestViewerJson } from './network.ts'
import { normalizeViewerCountPayload } from './normalize.ts'
import { type ViewerCountStore } from './store.ts'

const CHANNEL_FETCH_CONCURRENCY = 5
const CURRENT_VIEWERS_BATCH_SIZE = 10
const CHANNEL_POLL_INTERVAL_MS = 30 * 1000
const LIST_POLL_INTERVAL_MS = 2 * 60 * 1000
const RETRY_COOLDOWN_MS = 60 * 1000

const log = createLogger('viewer-counts:network')

type ViewerCountAcquisitionOptions = Readonly<{
  onData: () => void
  store: ViewerCountStore
}>

export class ViewerCountAcquisition {
  readonly #inFlightSlugs = new Map<string, number>()
  readonly #pendingPollSlugs = new Set<string>()
  readonly #pollingSlugs = new Set<string>()
  readonly #queuedSlugs = new Set<string>()
  readonly #retryAfterBySlug = new Map<string, number>()
  readonly #targetSlugs = new Set<string>()

  #abortController = new AbortController()
  #activeChannelSlug: string | undefined
  #activeFetches = 0
  #channelPollTimer: number | undefined
  #enabled = false
  // Abort is best-effort; this also invalidates completions from an old route.
  #generation = 0
  #lastPollWarningAt = 0
  #listPollTimer: number | undefined
  #polling = false
  #retryTimer: number | undefined

  constructor(
    private readonly options: ViewerCountAcquisitionOptions,
  ) {}

  start() {
    if (this.#enabled) {
      return
    }

    this.#enabled = true
    document.addEventListener(
      'visibilitychange',
      this.#handleVisibilityChange,
    )
    this.#channelPollTimer = window.setInterval(() => {
      void this.#pollActiveChannel()
    }, CHANNEL_POLL_INTERVAL_MS)
    this.#listPollTimer = window.setInterval(() => {
      void this.#pollVisibleTargets()
    }, LIST_POLL_INTERVAL_MS)
  }

  stop() {
    if (!this.#enabled) {
      return
    }

    this.#enabled = false
    this.#generation += 1
    this.#abortController.abort()
    this.#abortController = new AbortController()
    this.#activeChannelSlug = undefined
    this.#queuedSlugs.clear()
    this.#pendingPollSlugs.clear()
    this.#pollingSlugs.clear()
    this.#targetSlugs.clear()
    this.#inFlightSlugs.clear()
    this.#retryAfterBySlug.clear()
    document.removeEventListener(
      'visibilitychange',
      this.#handleVisibilityChange,
    )

    if (this.#channelPollTimer !== undefined) {
      window.clearInterval(this.#channelPollTimer)
      this.#channelPollTimer = undefined
    }

    if (this.#listPollTimer !== undefined) {
      window.clearInterval(this.#listPollTimer)
      this.#listPollTimer = undefined
    }

    if (this.#retryTimer !== undefined) {
      window.clearTimeout(this.#retryTimer)
      this.#retryTimer = undefined
    }
  }

  beginRoute() {
    if (!this.#enabled) {
      return
    }

    this.#generation += 1
    this.#abortController.abort()
    this.#abortController = new AbortController()
    this.#activeChannelSlug = undefined
    this.#queuedSlugs.clear()
    this.#pendingPollSlugs.clear()
    this.#pollingSlugs.clear()
    this.#targetSlugs.clear()
    this.#inFlightSlugs.clear()
  }

  syncTargets(
    channelSlugs: ReadonlySet<string>,
    activeChannelSlug: string | undefined,
  ) {
    if (!this.#enabled) {
      return
    }

    this.#targetSlugs.clear()

    for (const slug of channelSlugs) {
      this.#targetSlugs.add(slug)
    }

    this.#activeChannelSlug = activeChannelSlug
    const now = Date.now()

    for (const slug of this.#queuedSlugs) {
      if (!this.#targetSlugs.has(slug)) {
        this.#queuedSlugs.delete(slug)
      }
    }

    for (const slug of this.#pendingPollSlugs) {
      if (!this.#targetSlugs.has(slug)) {
        this.#pendingPollSlugs.delete(slug)
      }
    }

    for (const [slug, retryAfter] of this.#retryAfterBySlug) {
      if (
        retryAfter <= now &&
        !this.#targetSlugs.has(slug) &&
        !this.#inFlightSlugs.has(slug)
      ) {
        this.#retryAfterBySlug.delete(slug)
      }
    }

    for (const slug of channelSlugs) {
      const stream = this.options.store.get(slug)

      if (
        needsChannelDetails(
          stream,
          slug === activeChannelSlug,
        )
      ) {
        this.#queueChannelDetails(slug)
      } else {
        this.#queuedSlugs.delete(slug)
      }
    }

    this.#pumpChannelQueue()
  }

  #queueChannelDetails(slug: string) {
    const now = Date.now()

    if (
      this.#queuedSlugs.has(slug) ||
      this.#inFlightSlugs.has(slug)
    ) {
      return
    }

    const retryAfter = this.#retryAfterBySlug.get(slug)

    if (retryAfter !== undefined && retryAfter > now) {
      this.#scheduleRetry(retryAfter - now)
      return
    }

    this.#queuedSlugs.add(slug)
  }

  #pumpChannelQueue() {
    while (
      this.#enabled &&
      this.#activeFetches < CHANNEL_FETCH_CONCURRENCY &&
      this.#queuedSlugs.size > 0
    ) {
      const slug = this.#queuedSlugs.values().next().value as
        | string
        | undefined

      if (!slug) {
        return
      }

      this.#queuedSlugs.delete(slug)
      const stream = this.options.store.get(slug)

      if (
        !this.#targetSlugs.has(slug) ||
        !needsChannelDetails(
          stream,
          slug === this.#activeChannelSlug,
        )
      ) {
        continue
      }

      const generation = this.#generation
      this.#activeFetches += 1
      this.#inFlightSlugs.set(slug, generation)
      void this.#fetchChannelDetails(slug, generation).finally(() => {
        this.#activeFetches -= 1

        if (this.#inFlightSlugs.get(slug) === generation) {
          this.#inFlightSlugs.delete(slug)
        }

        this.#pumpChannelQueue()
      })
    }
  }

  async #fetchChannelDetails(slug: string, generation: number) {
    const requestUrl = new URL(
      `/api/v2/channels/${encodeURIComponent(slug)}`,
      window.location.origin,
    )

    try {
      const response = await requestViewerJson(
        requestUrl,
        this.#abortController.signal,
      )

      if (response.kind === 'failed') {
        throw new Error(response.summary)
      }

      if (
        !this.#enabled ||
        generation !== this.#generation
      ) {
        return
      }

      const capturedAt = Date.now()
      const normalized = normalizeViewerCountPayload(
        'CHANNEL_DETAILS',
        response.payload,
        capturedAt,
      )
      recordViewerEndpointObservation(
        'CHANNEL_DETAILS',
        normalized,
        capturedAt,
        'fallback',
      )

      if (
        normalized.kind !== 'streams' ||
        normalized.streams.length === 0 ||
        !normalized.streams.some((stream) => stream.isLive)
      ) {
        this.options.store.remove(slug)
        this.#setRetryCooldown(slug)
        this.options.onData()
        return
      }

      this.#retryAfterBySlug.delete(slug)
      this.options.store.upsertStreams(normalized.streams)
      this.options.onData()

      const stream = normalized.streams.find(
        (entry) => entry.channelSlug === slug,
      )

      if (slug === this.#activeChannelSlug) {
        await this.#pollSlugs(new Set([slug]))
      }

      if (stream && !stream.showViewCount) {
        log.info('Fallback resolved', {
          slug,
          viewerCount: stream.viewerCount,
        })
      } else {
        log.debug('Channel fetched', {
          slug,
        })
      }
    } catch (error) {
      if (!isAbortError(error)) {
        this.#setRetryCooldown(slug)
        log.warn('Channel fetch failed', {
          error: formatError(error),
          slug,
        })
      }
    }
  }

  #setRetryCooldown(slug: string) {
    this.#retryAfterBySlug.set(
      slug,
      Date.now() + RETRY_COOLDOWN_MS,
    )
    this.#scheduleRetry(RETRY_COOLDOWN_MS)
  }

  #scheduleRetry(delay: number) {
    if (this.#retryTimer !== undefined || !this.#enabled) {
      return
    }

    this.#retryTimer = window.setTimeout(() => {
      this.#retryTimer = undefined

      for (const slug of this.#targetSlugs) {
        const stream = this.options.store.get(slug)

        if (
          needsChannelDetails(
            stream,
            slug === this.#activeChannelSlug,
          )
        ) {
          this.#queueChannelDetails(slug)
        } else {
          this.#queuedSlugs.delete(slug)
        }
      }

      this.#pumpChannelQueue()
    }, Math.max(250, delay))
  }

  async #pollActiveChannel() {
    const slug = this.#activeChannelSlug

    if (!slug) {
      return
    }

    await this.#pollSlugs(new Set([slug]))
  }

  async #pollVisibleTargets() {
    await this.#pollSlugs(this.#targetSlugs)
  }

  async #pollSlugs(slugs: ReadonlySet<string>) {
    if (
      !this.#enabled ||
      document.hidden
    ) {
      return
    }

    for (const slug of slugs) {
      if (!this.#pollingSlugs.has(slug)) {
        this.#pendingPollSlugs.add(slug)
      }
    }

    if (this.#polling || this.#pendingPollSlugs.size === 0) {
      return
    }

    this.#polling = true

    try {
      while (
        this.#enabled &&
        !document.hidden &&
        this.#pendingPollSlugs.size > 0
      ) {
        const pendingSlugs = new Set(this.#pendingPollSlugs)
        this.#pendingPollSlugs.clear()
        this.#pollingSlugs.clear()

        for (const slug of pendingSlugs) {
          this.#pollingSlugs.add(slug)
        }

        await this.#pollSlugBatch(pendingSlugs)
        this.#pollingSlugs.clear()
      }
    } finally {
      this.#pollingSlugs.clear()
      this.#polling = false

      if (
        this.#enabled &&
        !document.hidden &&
        this.#pendingPollSlugs.size > 0
      ) {
        void this.#pollSlugs(new Set())
      }
    }
  }

  async #pollSlugBatch(slugs: ReadonlySet<string>) {
    this.options.store.prune()
    const livestreamIds = [
      ...this.options.store.getLivestreamIds(slugs),
    ]

    if (livestreamIds.length === 0) {
      this.options.onData()
      return
    }

    const generation = this.#generation
    let updated = 0

    try {
      for (
        let index = 0;
        index < livestreamIds.length;
        index += CURRENT_VIEWERS_BATCH_SIZE
      ) {
        if (
          !this.#enabled ||
          generation !== this.#generation
        ) {
          return
        }

        const batch = livestreamIds.slice(
          index,
          index + CURRENT_VIEWERS_BATCH_SIZE,
        )
        const requestUrl = new URL(
          '/current-viewers',
          window.location.origin,
        )

        for (const id of batch) {
          requestUrl.searchParams.append('ids[]', String(id))
        }

        const response = await requestViewerJson(
          requestUrl,
          this.#abortController.signal,
        )

        if (response.kind === 'failed') {
          throw new Error(response.summary)
        }

        if (
          !this.#enabled ||
          generation !== this.#generation
        ) {
          return
        }

        const capturedAt = Date.now()
        const normalized = normalizeViewerCountPayload(
          'CURRENT_VIEWERS',
          response.payload,
          capturedAt,
        )
        recordViewerEndpointObservation(
          'CURRENT_VIEWERS',
          normalized,
          capturedAt,
          'fallback',
        )

        if (normalized.kind === 'current-viewers') {
          const receivedIds = new Set(
            normalized.currentViewers.map(
              ({ livestreamId }) => livestreamId,
            ),
          )

          updated += this.options.store.upsertCurrentViewers(
            normalized.currentViewers,
          )
          updated += this.options.store.removeLivestreamIds(
            batch.filter((id) => !receivedIds.has(id)),
          )
        }
      }

      if (updated > 0) {
        log.debug('Refresh complete', {
          livestreams: livestreamIds.length,
          updated,
        })
      }
    } catch (error) {
      if (
        !isAbortError(error) &&
        Date.now() - this.#lastPollWarningAt >= RETRY_COOLDOWN_MS
      ) {
        this.#lastPollWarningAt = Date.now()
        log.warn('Refresh failed', {
          error: formatError(error),
        })
      }
    } finally {
      if (this.#enabled && generation === this.#generation) {
        this.options.onData()
      }
    }
  }

  readonly #handleVisibilityChange = () => {
    if (!document.hidden) {
      void this.#pollVisibleTargets()
    }
  }
}

function needsChannelDetails(
  stream: ReturnType<ViewerCountStore['get']>,
  isActiveChannel: boolean,
) {
  return (
    !stream ||
    stream.startedAt === undefined ||
    (isActiveChannel && stream.livestreamId === undefined) ||
    (stream.showViewCount &&
      stream.source !== 'channel-details' &&
      stream.source !== 'current-viewers')
  )
}

function formatError(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}
