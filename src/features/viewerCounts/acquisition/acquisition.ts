import {
  createBrowserAcquisitionTiming,
  type ViewerCountAcquisitionTiming,
} from './acquisitionTiming.ts'
import { ChannelDetailsScheduler } from './channelDetailsScheduler.ts'
import { CurrentViewersPoller } from './currentViewersPoller.ts'
import { type ViewerCountStore } from '../model/store.ts'

type ViewerCountAcquisitionOptions = Readonly<{
  onData: () => void
  store: ViewerCountStore
  timing?: ViewerCountAcquisitionTiming
}>

export class ViewerCountAcquisition {
  readonly #channelDetails: ChannelDetailsScheduler
  readonly #currentViewers: CurrentViewersPoller
  #enabled = false

  constructor({
    onData,
    store,
    timing = createBrowserAcquisitionTiming(),
  }: ViewerCountAcquisitionOptions) {
    this.#currentViewers = new CurrentViewersPoller({
      onData,
      store,
      timing,
    })
    this.#channelDetails = new ChannelDetailsScheduler({
      onActiveChannelResolved: (slug) => this.#currentViewers.pollSlug(slug),
      onData,
      store,
      timing,
    })
  }

  start() {
    if (this.#enabled) {
      return
    }

    this.#enabled = true
    this.#channelDetails.start()
    this.#currentViewers.start()
  }

  stop() {
    if (!this.#enabled) {
      return
    }

    this.#enabled = false
    this.#channelDetails.stop()
    this.#currentViewers.stop()
  }

  beginRoute() {
    if (!this.#enabled) {
      return
    }

    this.#channelDetails.resetRoute()
    this.#currentViewers.resetRoute()
  }

  syncTargets(
    channelSlugs: ReadonlySet<string>,
    activeChannelSlug: string | undefined,
  ) {
    if (!this.#enabled) {
      return
    }

    this.#currentViewers.syncTargets(channelSlugs, activeChannelSlug)
    this.#channelDetails.syncTargets(channelSlugs, activeChannelSlug)
  }
}
