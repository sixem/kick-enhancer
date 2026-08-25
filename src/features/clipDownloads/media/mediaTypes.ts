export const MAX_INPUT_BYTES = 8 * 1024 * 1024
export const MAX_OUTPUT_FRAGMENT_BYTES = 8 * 1024 * 1024
export const MAX_PLAYLIST_BYTES = 128 * 1024
export const MAX_PROBE_BYTES = 256 * 1024
export const MAX_SEGMENTS = 256

export type ClipMetadata = Readonly<{
  category?: string
  channel?: string
  creator?: string
  duration?: number
  likeCount?: number
  pageUrl: string
  publishedAt?: number
  thumbnailUrl?: string
  title?: string
  viewCount?: number
}>

export type HlsSegment = Readonly<{
  duration: number
  index: number
  length?: number
  offset?: number
  url: string
}>

export type DirectMp4Plan = Readonly<{
  kind: 'direct-mp4'
  sourceBytes?: number
  url: string
}>

export type HlsTsPlan = Readonly<{
  duration: number
  kind: 'hls-ts'
  playlistUrl: string
  segments: readonly HlsSegment[]
  sourceBytes?: number
  uniqueSourceObjectCount: number
}>

export type MediaPlan = DirectMp4Plan | HlsTsPlan

export type ClipInspection = Readonly<{
  clipId: string
  metadata: ClipMetadata
  plan: MediaPlan
}>

export type MediaSummary = Readonly<{
  duration?: number
  kind: MediaPlan['kind']
  logicalSegmentCount: number
  sourceBytes?: number
  uniqueSourceObjectCount: number
}>

export function summarizeMediaPlan(plan: MediaPlan): MediaSummary {
  if (plan.kind === 'direct-mp4') {
    return {
      kind: plan.kind,
      logicalSegmentCount: 1,
      sourceBytes: plan.sourceBytes,
      uniqueSourceObjectCount: 1,
    }
  }

  return {
    duration: plan.duration,
    kind: plan.kind,
    logicalSegmentCount: plan.segments.length,
    sourceBytes: plan.sourceBytes,
    uniqueSourceObjectCount: plan.uniqueSourceObjectCount,
  }
}
