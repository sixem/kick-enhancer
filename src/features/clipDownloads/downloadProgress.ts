export type DownloadTransferEstimate = Readonly<{
  bytesPerSecond: number
  remainingSeconds?: number
}>

const MINIMUM_ESTIMATE_AGE_MS = 1_000

export function estimateDownloadTransfer(
  fetchedBytes: number,
  totalBytes: number | undefined,
  startedAt: number | undefined,
  now: number,
): DownloadTransferEstimate | undefined {
  if (
    fetchedBytes <= 0 ||
    startedAt === undefined ||
    now - startedAt < MINIMUM_ESTIMATE_AGE_MS
  ) {
    return undefined
  }

  const bytesPerSecond =
    fetchedBytes / ((now - startedAt) / 1_000)

  if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) {
    return undefined
  }

  const remainingBytes =
    totalBytes === undefined
      ? undefined
      : Math.max(0, totalBytes - fetchedBytes)

  return {
    bytesPerSecond,
    remainingSeconds:
      remainingBytes === undefined || remainingBytes === 0
        ? undefined
        : remainingBytes / bytesPerSecond,
  }
}
