import { createLogger } from '../../logging/logger.ts'
import {
  normalizeViewerCountPayload,
  type NormalizedViewerCountPayload,
} from './normalize.ts'
import { requestViewerJson } from './network.ts'
import { normalizeChannelSlug } from './slug.ts'
import type { ViewerCountEndpoint } from './types.ts'

export const VIEWER_COUNT_ENDPOINTS: readonly ViewerCountEndpoint[] = [
  'CHANNEL_DETAILS',
  'CURRENT_VIEWERS',
  'FOLLOWED_CHANNELS',
  'USER_LIVESTREAMS',
  'SIDEBAR_LIVESTREAMS',
  'RECOMMENDED_LIVESTREAMS',
  'PAGINATED_RECOMMENDED_LIVESTREAMS',
  'FEATURED_LIVESTREAMS',
]

export const VIEWER_COUNT_ENDPOINT_LABELS: Readonly<
  Record<ViewerCountEndpoint, string>
> = {
  CHANNEL_DETAILS: 'Channel details',
  CURRENT_VIEWERS: 'Current viewers',
  FEATURED_LIVESTREAMS: 'Featured streams',
  FOLLOWED_CHANNELS: 'Followed channels',
  PAGINATED_RECOMMENDED_LIVESTREAMS: 'Discovery list',
  RECOMMENDED_LIVESTREAMS: 'Recommended streams',
  SIDEBAR_LIVESTREAMS: 'Sidebar streams',
  USER_LIVESTREAMS: 'User livestreams',
}

export type EndpointObservation = Readonly<{
  endpoint: ViewerCountEndpoint
  hiddenViewerCounts: number
  observedAt: number
  records: number
  source: 'captured' | 'fallback'
  startTimes: number
}>

export type EndpointCheckStatus =
  | 'degraded'
  | 'failed'
  | 'passed'
  | 'unavailable'

export type EndpointCheckResult = Readonly<{
  durationMs?: number
  endpoint: 'CHANNEL_DETAILS' | 'CURRENT_VIEWERS'
  httpStatus?: number
  status: EndpointCheckStatus
  summary: string
}>

type ObservationListener = (
  observations: readonly EndpointObservation[],
) => void

const OBSERVATION_NOTIFY_INTERVAL_MS = 200
const log = createLogger('diagnostics')
const observations = new Map<
  ViewerCountEndpoint,
  EndpointObservation
>()
const observationListeners = new Set<ObservationListener>()
let observationNotifyTimer:
  | ReturnType<typeof setTimeout>
  | undefined

export function recordViewerEndpointObservation(
  endpoint: ViewerCountEndpoint,
  normalized: NormalizedViewerCountPayload,
  observedAt: number,
  source: EndpointObservation['source'],
) {
  const streams =
    normalized.kind === 'streams' ? normalized.streams : []
  const records =
    normalized.kind === 'streams'
      ? streams.length
      : normalized.currentViewers.length
  const observation: EndpointObservation = {
    endpoint,
    hiddenViewerCounts:
      normalized.kind === 'streams'
        ? streams.filter((stream) => !stream.showViewCount).length
        : normalized.currentViewers.filter(
            (entry) => entry.showViewCount === false,
          ).length,
    observedAt,
    records,
    source,
    startTimes: streams.filter(
      (stream) => stream.startedAt !== undefined,
    ).length,
  }

  observations.set(endpoint, observation)
  scheduleObservationNotification()

  return observation
}

export function getViewerEndpointObservations() {
  return VIEWER_COUNT_ENDPOINTS.flatMap((endpoint) => {
    const observation = observations.get(endpoint)

    return observation ? [observation] : []
  })
}

export function subscribeViewerEndpointObservations(
  listener: ObservationListener,
) {
  observationListeners.add(listener)

  return () => {
    observationListeners.delete(listener)

    if (
      observationListeners.size === 0 &&
      observationNotifyTimer !== undefined
    ) {
      globalThis.clearTimeout(observationNotifyTimer)
      observationNotifyTimer = undefined
    }
  }
}

function scheduleObservationNotification() {
  if (
    observationListeners.size === 0 ||
    observationNotifyTimer !== undefined
  ) {
    return
  }

  observationNotifyTimer = globalThis.setTimeout(() => {
    observationNotifyTimer = undefined
    notifyObservationListeners()
  }, OBSERVATION_NOTIFY_INTERVAL_MS)
}

export async function runViewerEndpointChecks(
  rawSlug: string,
  signal: AbortSignal,
): Promise<readonly EndpointCheckResult[]> {
  const slug = normalizeChannelSlug(rawSlug)

  if (!slug) {
    return [
      {
        endpoint: 'CHANNEL_DETAILS',
        status: 'failed',
        summary: 'Enter a valid KICK channel name.',
      },
      unavailableCurrentViewers('Channel check did not run.'),
    ]
  }

  log.info('Checks started', { slug })
  const channelUrl = new URL(
    `/api/v2/channels/${encodeURIComponent(slug)}`,
    window.location.origin,
  )
  const channelResponse = await requestViewerJson(channelUrl, signal)

  if (channelResponse.kind === 'failed') {
    const results: readonly EndpointCheckResult[] = [
      {
        durationMs: channelResponse.durationMs,
        endpoint: 'CHANNEL_DETAILS',
        ...(channelResponse.httpStatus === undefined
          ? {}
          : { httpStatus: channelResponse.httpStatus }),
        status: 'failed',
        summary: channelResponse.summary,
      },
      unavailableCurrentViewers(
        'No livestream ID was available for this check.',
      ),
    ]

    log.warn('Checks failed', {
      endpoint: 'CHANNEL_DETAILS',
      slug,
    })
    return results
  }

  const capturedAt = Date.now()
  const normalized = normalizeViewerCountPayload(
    'CHANNEL_DETAILS',
    channelResponse.payload,
    capturedAt,
  )
  const stream =
    normalized.kind === 'streams'
      ? normalized.streams.find(
          (entry) => entry.channelSlug === slug && entry.isLive,
        )
      : undefined

  if (!stream) {
    const offline = isOfflineChannelPayload(channelResponse.payload)
    const results: readonly EndpointCheckResult[] = [
      {
        durationMs: channelResponse.durationMs,
        endpoint: 'CHANNEL_DETAILS',
        httpStatus: channelResponse.httpStatus,
        status: offline ? 'unavailable' : 'degraded',
        summary: offline
          ? 'Channel resolved, but it is not live.'
          : 'Response was reachable but no usable live stream was found.',
      },
      unavailableCurrentViewers(
        offline
          ? 'The channel is offline.'
          : 'The channel response did not expose a livestream ID.',
      ),
    ]

    log.info('Checks complete', {
      status: results[0].status,
      slug,
    })
    return results
  }

  const channelCheck: EndpointCheckResult = {
    durationMs: channelResponse.durationMs,
    endpoint: 'CHANNEL_DETAILS',
    httpStatus: channelResponse.httpStatus,
    status:
      stream.livestreamId === undefined ? 'degraded' : 'passed',
    summary: [
      `viewers=${stream.viewerCount.toLocaleString()}`,
      `count=${stream.showViewCount ? 'public' : 'hidden'}`,
      `started=${stream.startedAt === undefined ? 'no' : 'yes'}`,
      `livestream=${stream.livestreamId ?? 'missing'}`,
    ].join('; '),
  }

  if (stream.livestreamId === undefined) {
    return [
      channelCheck,
      unavailableCurrentViewers(
        'The live response did not include a livestream ID.',
      ),
    ]
  }

  const viewersUrl = new URL(
    '/current-viewers',
    window.location.origin,
  )
  viewersUrl.searchParams.append(
    'ids[]',
    String(stream.livestreamId),
  )
  const viewersResponse = await requestViewerJson(viewersUrl, signal)

  if (viewersResponse.kind === 'failed') {
    const result: EndpointCheckResult = {
      durationMs: viewersResponse.durationMs,
      endpoint: 'CURRENT_VIEWERS',
      ...(viewersResponse.httpStatus === undefined
        ? {}
        : { httpStatus: viewersResponse.httpStatus }),
      status: 'failed',
      summary: viewersResponse.summary,
    }

    log.warn('Checks failed', {
      endpoint: 'CURRENT_VIEWERS',
      slug,
    })
    return [channelCheck, result]
  }

  const current = normalizeViewerCountPayload(
    'CURRENT_VIEWERS',
    viewersResponse.payload,
    Date.now(),
  )
  const entry =
    current.kind === 'current-viewers'
      ? current.currentViewers.find(
          ({ livestreamId }) =>
            livestreamId === stream.livestreamId,
        )
      : undefined
  const currentCheck: EndpointCheckResult = {
    durationMs: viewersResponse.durationMs,
    endpoint: 'CURRENT_VIEWERS',
    httpStatus: viewersResponse.httpStatus,
    status: entry ? 'passed' : 'degraded',
    summary: entry
      ? `viewers=${entry.viewerCount.toLocaleString()}`
      : 'No matching viewer record.',
  }

  log.info('Checks complete', {
    status: currentCheck.status,
    slug,
  })
  return [channelCheck, currentCheck]
}

function notifyObservationListeners() {
  const snapshot = getViewerEndpointObservations()

  for (const listener of observationListeners) {
    try {
      listener(snapshot)
    } catch (error) {
      console.error(
        '[KICK Enhancer] Endpoint observation listener failed.',
        error,
      )
    }
  }
}

function unavailableCurrentViewers(
  summary: string,
): EndpointCheckResult {
  return {
    endpoint: 'CURRENT_VIEWERS',
    status: 'unavailable',
    summary,
  }
}

function isOfflineChannelPayload(payload: unknown) {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'livestream' in payload &&
    payload.livestream === null
  )
}
