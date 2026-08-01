import { inspectClip } from '../media/inspection'
import { downloadMediaPlan } from '../media/mediaPipeline'
import {
  createBlobSink,
  createFileSystemSink,
  getSaveFilePicker,
} from './outputSinks'
import {
  createDownloadManager,
  type DownloadManagerDependencies,
} from './downloadManagerCore'

export type {
  DownloadActivitySummary,
  DownloadJobSnapshot,
  DownloadJobStatus,
  DownloadSnapshot,
  SaveStrategy,
} from './downloadManagerCore'

const dependencies: DownloadManagerDependencies = {
  createBlobSink,
  createFileSystemSink,
  downloadMediaPlan,
  getSaveFilePicker,
  inspectClip,
  now: Date.now,
}

export const downloadManager = createDownloadManager(dependencies)
