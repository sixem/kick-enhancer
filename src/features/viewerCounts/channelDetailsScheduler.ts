import { createLogger } from '../../logging/logger.ts'
import { type ViewerCountAcquisitionTiming } from './acquisitionTiming.ts'
import { recordViewerEndpointObservation } from './diagnostics.ts'
import { isAbortError, requestViewerJson } from './network.ts'
import { normalizeViewerCountPayload } from './normalize.ts'
import { type ViewerCountStore } from './store.ts'

const CHANNEL_FETCH_CONCURRENCY = 5
const RETRY_COOLDOWN_MS = 60 * 1000

const log = createLogger('viewer-counts:network')

type ChannelDetailsSchedulerOptions = Readonly<{
  getOrigin?: () => string
  onActiveChannelResolved: (slug: string) => Promise<void>
  onData: () => void
  request?: typeof requestViewerJson
  store: ViewerCountStore
  timing: ViewerCountAcquisitionTiming
}>

export class ChannelDetailsScheduler {
  readonly #getOrigin: () => string
  readonly #inFlightSlugs = new Map<string, number>()
  readonly #onActiveChannelResolved: (slug: string) => Promise<void>
  readonly #onData: () => void
  readonly #queuedSlugs = new Set<string>()
  readonly #request: typeof requestViewerJson
  readonly #retryAfterBySlug = new Map<string, number>()
  readonly #store: ViewerCountStore
  readonly #targetSlugs = new Set<string>()
  readonly #timing: ViewerCountAcquisitionTiming

  #abortController = new AbortController()
  #activeChannelSlug: string | undefined
  #activeFetches = 0
  #enabled = false
  // Abort is best-effort; the generation also invalidates stale completions.
  #generation = 0
  #retryTimer: number | undefined

  constructor({
    getOrigin = () => window.location.origin,
    onActiveChannelResolved,
    onData,
    request = requestViewerJson,
    store,
    timing,
  }: ChannelDetailsSchedulerOptions) {
    this.#getOrigin = getOrigin
    this.#onActiveChannelResolved = onActiveChannelResolved
    this.#onData = onData
    this.#request = request
    this.#store = store
    this.#timing = timing
  }

  start() {
    this.#enabled = true
  }

  stop() {
    if (!this.#enabled) {
      return
    }

    this.#enabled = false
    this.#resetRouteState()
    this.#retryAfterBySlug.clear()

    if (this.#retryTimer !== undefined) {
      this.#timing.cancelTimeout(this.#retryTimer)
      this.#retryTimer = undefined
    }
  }

  resetRoute() {
    if (this.#enabled) {
      this.#resetRouteState()
    }
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
    const now = this.#timing.now()

    for (const slug of this.#queuedSlugs) {
      if (!this.#targetSlugs.has(slug)) {
        this.#queuedSlugs.delete(slug)
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
      const stream = this.#store.get(slug, now)

      if (
        needsChannelDetails(
          stream,
          slug === activeChannelSlug,
        )
      ) {
        this.#queue(slug)
      } else {
        this.#queuedSlugs.delete(slug)
      }
    }

    this.#pumpQueue()
  }

  #resetRouteState() {
    this.#generation += 1
    this.#abortController.abort()
    this.#abortController = new AbortController()
    this.#activeChannelSlug = undefined
    this.#queuedSlugs.clear()
    this.#targetSlugs.clear()
    this.#inFlightSlugs.clear()
  }

  #queue(slug: string) {
    const now = this.#timing.now()

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

  #pumpQueue() {
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
      const stream = this.#store.get(slug, this.#timing.now())

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
      void this.#fetch(slug, generation).finally(() => {
        this.#activeFetches -= 1

        if (this.#inFlightSlugs.get(slug) === generation) {
          this.#inFlightSlugs.delete(slug)
        }

        this.#pumpQueue()
      })
    }
  }

  async #fetch(slug: string, generation: number) {
    const requestUrl = new URL(
      `/api/v2/channels/${encodeURIComponent(slug)}`,
      this.#getOrigin(),
    )

    try {
      const response = await this.#request(
        requestUrl,
        this.#abortController.signal,
      )

      if (response.kind === 'failed') {
        throw new Error(response.summary)
      }

      if (!this.#enabled || generation !== this.#generation) {
        return
      }

      const capturedAt = this.#timing.now()
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
        this.#store.remove(slug)
        this.#setRetryCooldown(slug)
        this.#onData()
        return
      }

      this.#retryAfterBySlug.delete(slug)
      this.#store.upsertStreams(normalized.streams)
      this.#onData()

      const stream = normalized.streams.find(
        (entry) => entry.channelSlug === slug,
      )

      if (slug === this.#activeChannelSlug) {
        await this.#onActiveChannelResolved(slug)
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
      this.#timing.now() + RETRY_COOLDOWN_MS,
    )
    this.#scheduleRetry(RETRY_COOLDOWN_MS)
  }

  #scheduleRetry(delay: number) {
    if (this.#retryTimer !== undefined || !this.#enabled) {
      return
    }

    this.#retryTimer = this.#timing.scheduleTimeout(() => {
      this.#retryTimer = undefined

      for (const slug of this.#targetSlugs) {
        const stream = this.#store.get(slug, this.#timing.now())

        if (
          needsChannelDetails(
            stream,
            slug === this.#activeChannelSlug,
          )
        ) {
          this.#queue(slug)
        } else {
          this.#queuedSlugs.delete(slug)
        }
      }

      this.#pumpQueue()
    }, Math.max(250, delay))
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
