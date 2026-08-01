export function createManagerDependencies(overrides = {}) {
  return {
    createBlobSink: (filename) => createFakeSink(filename),
    createFileSystemSink: async (handle) => createFakeSink(handle.name),
    downloadMediaPlan: async (_plan, _sink, _signal, { onProgress }) => {
      onProgress({
        completedSegments: 1,
        fetchedBytes: 100,
        phase: 'writing',
        processedBytes: 100,
        writtenBytes: 100,
      })
    },
    getSaveFilePicker: () => undefined,
    inspectClip: async (clipId) => inspectionFor(clipId),
    now: () => 1_000,
    ...overrides,
  }
}

export function inspectionFor(clipId) {
  return {
    clipId,
    metadata: {
      category: 'Just Chatting',
      channel: 'channel',
      creator: 'clipper',
      duration: 12,
      likeCount: 78,
      pageUrl: `https://kick.com/channel/clips/${clipId}`,
      publishedAt: 1_785_328_496_000,
      title: `Title ${clipId}`,
      viewCount: 1234,
    },
    plan: {
      kind: 'direct-mp4',
      sourceBytes: 100,
      url: 'https://clips.kick.com/test.mp4',
    },
  }
}

function createFakeSink(filename) {
  return {
    abort: async () => undefined,
    close: async () => undefined,
    filename,
    write: async () => undefined,
  }
}

export function createFakeHandle(name) {
  return {
    createWritable: async () => ({
      abort: async () => undefined,
      close: async () => undefined,
      write: async () => undefined,
    }),
    name,
  }
}

export function job(manager, jobId) {
  return manager.getSnapshot().jobs.find(({ id }) => id === jobId)
}

export function deferred() {
  let reject
  let resolve
  const promise = new Promise((resolvePromise, rejectPromise) => {
    reject = rejectPromise
    resolve = resolvePromise
  })
  return { promise, reject, resolve }
}
