/// <reference lib="webworker" />

import { Transmuxer } from 'mux.js/cjs/mp4/transmuxer.js'

import { toTransferableArrayBuffer } from '../byteBuffers'
import { createTransmuxerSession } from './transmuxerSession'
import {
  type DownloadWorkerRequest,
  type DownloadWorkerResponse,
} from './workerMessages'

const worker = self as DedicatedWorkerGlobalScope
const session = createTransmuxerSession(
  new Transmuxer({
    remux: true,
  }),
)

worker.onmessage = (event: MessageEvent<DownloadWorkerRequest>) => {
  const message = event.data

  try {
    if (message.type === 'cancel') {
      worker.close()
      return
    }

    if (message.type === 'push') {
      session.push(new Uint8Array(message.bytes))
      respond({
        requestId: message.requestId,
        type: 'pushed',
      })
      return
    }

    const fragment = session.flush()
    const data = toTransferableArrayBuffer(fragment.data)
    const initSegment = fragment.initSegment
      ? toTransferableArrayBuffer(fragment.initSegment)
      : undefined
    respond(
      {
        data,
        ...(initSegment ? { initSegment } : {}),
        requestId: message.requestId,
        type: 'fragment',
      },
      initSegment ? [initSegment, data] : [data],
    )
  } catch {
    respond({
      message: 'The clip could not be converted to MP4.',
      requestId: message.type === 'cancel' ? undefined : message.requestId,
      type: 'error',
    })
  }
}

function respond(
  message: DownloadWorkerResponse,
  transfer: Transferable[] = [],
) {
  worker.postMessage(message, transfer)
}
