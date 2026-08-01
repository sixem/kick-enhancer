import { createLogger } from '../../logging/logger.ts'
import { type ViewerCountAcquisitionTiming } from './acquisitionTiming.ts'
import { recordViewerEndpointObservation } from './diagnostics.ts'
import { isAbortError, requestViewerJson } from './network.ts'
import { normalizeViewerCountPayload } from './normalize.ts'
import { type ViewerCountStore } from './store.ts'

const CURRENT_VIEWERS_BATCH_SIZE = 10
const CHANNEL_POLL_INTERVAL_MS = 30 * 1000
const LIST_POLL_INTERVAL_MS = 2 * 60 * 1000
const WARNING_COOLDOWN_MS = 60 * 1000

const log = createLogger('viewer-counts:network')

type CurrentViewersPollerOptions = Readonly<{
  getOrigin?: () => string
  isHidden?: () => boolean
  onData: () => void
  request?: typeof requestViewerJson
  store: ViewerCountStore
  subscribeVisibility?: (listener: () => void) => () => void
  timing: ViewerCountAcquisitionTiming
}>

export class CurrentViewersPoller {
  readonly #getOrigin: () => string
  readonly #isHidden: () => boolean
  readonly #onData: () => void
  readonly #pendingSlugs = new Set<string>()
  readonly #pollingSlugs = new Set<string>()
  readonly #request: typeof requestViewerJson
  readonly #store: ViewerCountStore
  readonly #subscribeVisibility: (listener: () => void) => () => void
  readonly #targetSlugs = new Set<string>()
  readonly #timing: ViewerCountAcquisitionTiming

  #abortController = new AbortController()
  #activeChannelSlug: string | undefined
  #activePollTimer: number | undefined
  #enabled = false
  // Abort is best-effort; the generation also invalidates stale completions.
  #generation = 0
  #lastWarningAt = 0
  #listPollTimer: number | undefined
  #polling = false
  #stopWatchingVisibility: (() => void) | undefined

  constructor({
    getOrigin = () => window.location.origin,
    isHidden = () => document.hidden,
    onData,
    request = requestViewerJson,
    store,
    subscribeVisibility = subscribeDocumentVisibility,
    timing,
  }: CurrentViewersPollerOptions) {
    this.#getOrigin = getOrigin
    this.#isHidden = isHidden
    this.#onData = onData
    this.#request = request
    this.#store = store
    this.#subscribeVisibility = subscribeVisibility
    this.#timing = timing
  }

  start() {
    if (this.#enabled) {
      return
    }

    this.#enabled = true
    this.#stopWatchingVisibility = this.#subscribeVisibility(
      this.#handleVisibilityChange,
    )
    this.#activePollTimer = this.#timing.scheduleInterval(() => {
      void this.#pollActiveChannel()
    }, CHANNEL_POLL_INTERVAL_MS)
    this.#listPollTimer = this.#timing.scheduleInterval(() => {
      void this.#pollVisibleTargets()
    }, LIST_POLL_INTERVAL_MS)
  }

  stop() {
    if (!this.#enabled) {
      return
    }

    this.#enabled = false
    this.#resetRouteState()
    this.#stopWatchingVisibility?.()
    this.#stopWatchingVisibility = undefined

    if (this.#activePollTimer !== undefined) {
      this.#timing.cancelInterval(this.#activePollTimer)
      this.#activePollTimer = undefined
    }

    if (this.#listPollTimer !== undefined) {
      this.#timing.cancelInterval(this.#listPollTimer)
      this.#listPollTimer = undefined
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

    for (const slug of this.#pendingSlugs) {
      if (!this.#targetSlugs.has(slug)) {
        this.#pendingSlugs.delete(slug)
      }
    }
  }

  pollSlug(slug: string) {
    return this.#pollSlugs(new Set([slug]))
  }

  #resetRouteState() {
    this.#generation += 1
    this.#abortController.abort()
    this.#abortController = new AbortController()
    this.#activeChannelSlug = undefined
    this.#pendingSlugs.clear()
    this.#pollingSlugs.clear()
    this.#targetSlugs.clear()
  }

  async #pollActiveChannel() {
    const slug = this.#activeChannelSlug

    if (slug) {
      await this.#pollSlugs(new Set([slug]))
    }
  }

  async #pollVisibleTargets() {
    await this.#pollSlugs(this.#targetSlugs)
  }

  async #pollSlugs(slugs: ReadonlySet<string>) {
    if (!this.#enabled || this.#isHidden()) {
      return
    }

    for (const slug of slugs) {
      if (!this.#pollingSlugs.has(slug)) {
        this.#pendingSlugs.add(slug)
      }
    }

    if (this.#polling || this.#pendingSlugs.size === 0) {
      return
    }

    this.#polling = true

    try {
      while (
        this.#enabled &&
        !this.#isHidden() &&
        this.#pendingSlugs.size > 0
      ) {
        const pendingSlugs = new Set(this.#pendingSlugs)
        this.#pendingSlugs.clear()
        this.#pollingSlugs.clear()

        for (const slug of pendingSlugs) {
          this.#pollingSlugs.add(slug)
        }

        await this.#pollBatch(pendingSlugs)
        this.#pollingSlugs.clear()
      }
    } finally {
      this.#pollingSlugs.clear()
      this.#polling = false

      if (this.#enabled && !this.#isHidden() && this.#pendingSlugs.size > 0) {
        void this.#pollSlugs(new Set())
      }
    }
  }

  async #pollBatch(slugs: ReadonlySet<string>) {
    const now = this.#timing.now()
    this.#store.prune(now)
    const livestreamIds = [...this.#store.getLivestreamIds(slugs, now)]

    if (livestreamIds.length === 0) {
      this.#onData()
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
        if (!this.#enabled || generation !== this.#generation) {
          return
        }

        const batch = livestreamIds.slice(
          index,
          index + CURRENT_VIEWERS_BATCH_SIZE,
        )
        const requestUrl = new URL('/current-viewers', this.#getOrigin())

        for (const id of batch) {
          requestUrl.searchParams.append('ids[]', String(id))
        }

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
            normalized.currentViewers.map(({ livestreamId }) => livestreamId),
          )

          updated += this.#store.upsertCurrentViewers(normalized.currentViewers)
          updated += this.#store.removeLivestreamIds(
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
      const warningAt = this.#timing.now()

      if (
        !isAbortError(error) &&
        warningAt - this.#lastWarningAt >= WARNING_COOLDOWN_MS
      ) {
        this.#lastWarningAt = warningAt
        log.warn('Refresh failed', {
          error: formatError(error),
        })
      }
    } finally {
      if (this.#enabled && generation === this.#generation) {
        this.#onData()
      }
    }
  }

  readonly #handleVisibilityChange = () => {
    if (!this.#isHidden()) {
      void this.#pollVisibleTargets()
    }
  }
}

function subscribeDocumentVisibility(listener: () => void) {
  document.addEventListener('visibilitychange', listener)

  return () => {
    document.removeEventListener('visibilitychange', listener)
  }
}

function formatError(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}
