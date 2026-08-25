export type ViewerJsonRequestResult =
  | Readonly<{
      durationMs: number
      httpStatus?: number
      kind: 'failed'
      summary: string
    }>
  | Readonly<{
      durationMs: number
      httpStatus: number
      kind: 'passed'
      payload: unknown
    }>

export async function requestViewerJson(
  url: URL,
  signal: AbortSignal,
): Promise<ViewerJsonRequestResult> {
  const startedAt = performance.now()

  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'x-app-platform': 'web',
      },
      signal,
    })
    const durationMs = performance.now() - startedAt

    if (!response.ok) {
      return {
        durationMs,
        httpStatus: response.status,
        kind: 'failed',
        summary: `KICK returned HTTP ${response.status}.`,
      }
    }

    try {
      const payload: unknown = await response.json()

      return {
        durationMs,
        httpStatus: response.status,
        kind: 'passed',
        payload,
      }
    } catch (error) {
      if (signal.aborted || isAbortError(error)) {
        throw error
      }

      return {
        durationMs,
        httpStatus: response.status,
        kind: 'failed',
        summary: 'KICK returned a response that was not valid JSON.',
      }
    }
  } catch (error) {
    if (signal.aborted || isAbortError(error)) {
      throw error
    }

    return {
      durationMs: performance.now() - startedAt,
      kind: 'failed',
      summary: 'Network request failed before KICK responded.',
    }
  }
}

export function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}
