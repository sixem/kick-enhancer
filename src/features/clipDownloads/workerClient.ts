import InlineDownloadWorker from './download.worker?worker&inline'
import { ClipDownloadError } from './errors'
import {
  type DownloadWorkerRequest,
  type DownloadWorkerResponse,
} from './workerMessages'

type PendingRequest = Readonly<{
  reject: (reason: unknown) => void
  resolve: (message: DownloadWorkerResponse) => void
}>

export type TransmuxedFragment = Readonly<{
  data: Uint8Array
  initSegment?: Uint8Array
}>

export class TransmuxWorkerClient {
  readonly worker = new InlineDownloadWorker()
  private nextRequestId = 1
  private readonly pending = new Map<number, PendingRequest>()

  constructor() {
    this.worker.onmessage = (
      event: MessageEvent<DownloadWorkerResponse>,
    ) => {
      const message = event.data

      if (message.type === 'error') {
        const error = new ClipDownloadError(
          'transmuxing',
          message.message,
        )

        if (message.requestId !== undefined) {
          this.rejectRequest(message.requestId, error)
        } else {
          this.rejectAll(error)
        }

        return
      }

      const request = this.pending.get(message.requestId)

      if (!request) {
        return
      }

      this.pending.delete(message.requestId)
      request.resolve(message)
    }

    this.worker.onerror = () => {
      this.rejectAll(
        new ClipDownloadError(
          'transmuxing',
          'The MP4 conversion worker stopped unexpectedly.',
        ),
      )
    }
  }

  async push(bytes: Uint8Array) {
    const buffer = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength,
    ) as ArrayBuffer
    const response = await this.request(
      {
        bytes: buffer,
        requestId: this.nextRequestId,
        type: 'push',
      },
      [buffer],
    )

    if (response.type !== 'pushed') {
      throw unexpectedResponse()
    }
  }

  async flush(): Promise<TransmuxedFragment> {
    const response = await this.request({
      requestId: this.nextRequestId,
      type: 'flush',
    })

    if (response.type !== 'fragment') {
      throw unexpectedResponse()
    }

    return {
      data: new Uint8Array(response.data),
      ...(response.initSegment
        ? {
            initSegment: new Uint8Array(response.initSegment),
          }
        : {}),
    }
  }

  terminate(reason = 'The MP4 conversion was cancelled.') {
    const message: DownloadWorkerRequest = {
      type: 'cancel',
    }
    this.worker.postMessage(message)
    this.worker.terminate()
    this.rejectAll(
      new ClipDownloadError('cancelled', reason),
    )
  }

  private request(
    message: DownloadWorkerRequest & Readonly<{ requestId: number }>,
    transfer: Transferable[] = [],
  ) {
    const requestId = message.requestId
    this.nextRequestId += 1

    return new Promise<DownloadWorkerResponse>((resolve, reject) => {
      this.pending.set(requestId, {
        reject,
        resolve,
      })
      this.worker.postMessage(message, transfer)
    })
  }

  private rejectRequest(requestId: number, error: unknown) {
    const request = this.pending.get(requestId)

    if (!request) {
      return
    }

    this.pending.delete(requestId)
    request.reject(error)
  }

  private rejectAll(error: unknown) {
    for (const request of this.pending.values()) {
      request.reject(error)
    }

    this.pending.clear()
  }
}

function unexpectedResponse() {
  return new ClipDownloadError(
    'transmuxing',
    'The MP4 conversion worker returned an invalid response.',
  )
}
