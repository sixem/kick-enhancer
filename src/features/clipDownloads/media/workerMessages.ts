export type DownloadWorkerRequest =
  | Readonly<{
      bytes: ArrayBuffer
      requestId: number
      type: 'push'
    }>
  | Readonly<{
      requestId: number
      type: 'flush'
    }>
  | Readonly<{
      type: 'cancel'
    }>

export type DownloadWorkerResponse =
  | Readonly<{
      requestId: number
      type: 'pushed'
    }>
  | Readonly<{
      data: ArrayBuffer
      initSegment?: ArrayBuffer
      requestId: number
      type: 'fragment'
    }>
  | Readonly<{
      message: string
      requestId?: number
      type: 'error'
    }>
