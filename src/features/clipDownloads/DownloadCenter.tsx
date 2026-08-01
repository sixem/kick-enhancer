import type { ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import icon from '../../assets/icon.png?inline'
import { ListView, type ListViewColumn } from '../../components/ListView'
import { Modal } from '../../components/Modal'
import { Tabs } from '../../components/Tabs'
import { Button, TextField } from '../../components/forms'
import { LoadingSpinnerIcon } from '../../icons'
import {
  focusDownloadJob,
  minimizeDownloadCenter,
} from './downloadCenterController'
import { estimateDownloadTransfer } from './downloadProgress'
import { downloadManager, type DownloadJobSnapshot } from './downloadManager'
import { getSaveFilePicker } from './outputSinks'
import {
  useDownloadCenter,
  useDownloadActivity,
  useDownloads,
} from './useDownloads'

const MEMORY_WARNING_BYTES = 128 * 1024 * 1024
const CLIP_DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})
const COUNT_FORMATTER = new Intl.NumberFormat()
const DOWNLOAD_COLUMNS: readonly ListViewColumn<DownloadJobSnapshot>[] = [
  {
    header: 'Clip',
    id: 'clip',
    renderCell: (job) => (
      <div className="ke-download-queue__clip">
        {job.thumbnailUrl ? (
          <img
            alt=""
            className="ke-download-queue__thumbnail"
            referrerPolicy="no-referrer"
            src={job.thumbnailUrl}
          />
        ) : null}
        <span className="ke-download-queue__title">
          {job.title ?? job.clipId}
        </span>
      </div>
    ),
    width: 'minmax(12rem, 1fr)',
  },
  {
    align: 'center',
    header: 'Channel',
    id: 'channel',
    renderCell: (job) => job.channel ?? 'Unknown',
    width: '9rem',
  },
  {
    align: 'center',
    header: 'Status',
    id: 'status',
    renderCell: (job) => (
      <span className="ke-download-queue__status" data-status={job.status}>
        {formatStatus(job)}
      </span>
    ),
    width: '9rem',
  },
  {
    align: 'center',
    header: 'Duration',
    id: 'duration',
    renderCell: (job) => formatDuration(job.media?.duration),
    width: '5.5rem',
  },
  {
    align: 'center',
    header: 'Size',
    id: 'size',
    renderCell: (job) =>
      job.media?.sourceBytes ? formatBytes(job.media.sourceBytes) : 'Unknown',
    width: '6.5rem',
  },
]

function clearInactiveDownloads() {
  downloadManager.clearInactive()
  closeDownloadCenterIfEmpty()
}

function removeDownload(jobId: string) {
  downloadManager.remove(jobId)
  closeDownloadCenterIfEmpty()
}

function closeDownloadCenterIfEmpty() {
  if (downloadManager.getSnapshot().jobs.length === 0) {
    minimizeDownloadCenter()
  }
}

export function DownloadCenter() {
  const center = useDownloadCenter()
  const { activeCount } = useDownloadActivity()
  const { jobs } = useDownloads()
  const [activeTab, setActiveTab] = useState('selected')
  const listedJobs = jobs.filter((job) => job.media !== undefined)
  const focusedJob =
    jobs.find(({ id }) => id === center.focusedJobId) ?? jobs.at(-1)

  useEffect(() => {
    if (center.open && !focusedJob) {
      minimizeDownloadCenter()
    }
  }, [center.open, focusedJob])

  useEffect(() => {
    if (center.open && focusedJob && focusedJob.id !== center.focusedJobId) {
      focusDownloadJob(focusedJob.id)
    }
  }, [center.focusedJobId, center.open, focusedJob])

  useEffect(() => {
    if (center.open && center.focusedJobId) {
      setActiveTab('selected')
    }
  }, [center.focusedJobId, center.open])

  const hasInactive = jobs.some((job) =>
    ['cancelled', 'completed', 'failed', 'ready'].includes(job.status),
  )

  return (
    <Modal
      className="ke-workspace-modal ke-download-center"
      closeLabel="Close Download Manager"
      description="Manage clip downloads."
      footer={
        <>
          <Button disabled={!hasInactive} onClick={clearInactiveDownloads}>
            Clear inactive
          </Button>
          <Button
            className="ke-button--primary"
            onClick={minimizeDownloadCenter}
          >
            Hide
          </Button>
        </>
      }
      icon={icon}
      onRequestClose={minimizeDownloadCenter}
      open={center.open}
      title="Download Manager"
    >
      <Tabs
        ariaLabel="Download Manager views"
        className="ke-download-center__tabs"
        onChange={setActiveTab}
        tabs={[
          {
            content: focusedJob ? (
              <DownloadJobDetail job={focusedJob} />
            ) : (
              <div className="ke-download-center__placeholder">
                No clip selected.
              </div>
            ),
            contentClassName: 'ke-download-center__selected-panel',
            disabled: !focusedJob,
            id: 'selected',
            label: 'Selected',
            panelAriaLabel: 'Selected clip download details',
          },
          {
            content: (
              <DownloadQueue
                focusedJobId={focusedJob?.id}
                jobs={listedJobs}
                onSelect={(jobId) => {
                  focusDownloadJob(jobId)
                  setActiveTab('selected')
                }}
              />
            ),
            contentClassName: 'ke-download-center__downloads-panel',
            id: 'downloads',
            label: (
              <span className="ke-download-center__tab-label">
                Downloads
                {activeCount > 0 ? (
                  <LoadingSpinnerIcon class="ke-icon ke-download-center__activity-indicator ke-icon--spinner" />
                ) : null}
              </span>
            ),
            panelAriaLabel: 'Clip download queue and history',
          },
        ]}
        value={activeTab}
      />
    </Modal>
  )
}

function DownloadQueue({
  focusedJobId,
  jobs,
  onSelect,
}: Readonly<{
  focusedJobId?: string
  jobs: readonly DownloadJobSnapshot[]
  onSelect: (jobId: string) => void
}>) {
  return (
    <ListView
      ariaLabel="Clip downloads"
      ariaLive="polite"
      className="ke-download-queue"
      columns={DOWNLOAD_COLUMNS}
      emptyContent={null}
      getItemKey={(job) => job.id}
      getRowAriaLabel={(job) =>
        `View ${job.title ?? job.clipId}, ${formatStatus(job)}`
      }
      getRowClassName={(job) =>
        job.id === focusedJobId ? 'ke-download-queue__row--selected' : undefined
      }
      items={jobs}
      onItemActivate={(job) => onSelect(job.id)}
    />
  )
}

function DownloadJobDetail({ job }: Readonly<{ job: DownloadJobSnapshot }>) {
  if (job.status === 'inspecting') {
    return (
      <section
        aria-live="polite"
        className="ke-download-detail-loading"
        role="status"
      >
        <LoadingSpinnerIcon class="ke-icon ke-download-detail-loading__icon ke-icon--spinner" />
        <p>Loading clip…</p>
      </section>
    )
  }

  return (
    <article className="ke-download-detail">
      <section
        className={`ke-download-detail__summary${
          job.thumbnailUrl ? '' : ' has-no-thumbnail'
        }`}
      >
        {job.thumbnailUrl ? (
          <div className="ke-download-detail__thumbnail-frame">
            <img
              alt=""
              className="ke-download-detail__thumbnail"
              referrerPolicy="no-referrer"
              src={job.thumbnailUrl}
            />
          </div>
        ) : null}
        <div className="ke-download-detail__overview">
          <header className="ke-download-detail__header">
            <div className="ke-download-detail__identity">
              {job.category || job.publishedAt ? (
                <div className="ke-download-detail__context">
                  {job.category ? (
                    <span className="ke-download-detail__category">
                      {job.category}
                    </span>
                  ) : null}
                  {job.publishedAt ? (
                    <time dateTime={new Date(job.publishedAt).toISOString()}>
                      {CLIP_DATE_FORMATTER.format(job.publishedAt)}
                    </time>
                  ) : null}
                </div>
              ) : null}
              <h3 className="ke-download-detail__title">
                {job.channel ? (
                  <a
                    className="ke-download-detail__title-link"
                    href={`https://kick.com/${encodeURIComponent(job.channel)}/clips/${encodeURIComponent(job.clipId)}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {job.title ?? 'KICK clip'}
                  </a>
                ) : (
                  (job.title ?? 'KICK clip')
                )}
              </h3>
              <p className="ke-download-detail__metadata">
                {job.channel ? (
                  <a
                    className="ke-download-detail__channel"
                    href={`https://kick.com/${encodeURIComponent(job.channel)}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {job.channel}
                  </a>
                ) : (
                  'Unknown channel'
                )}
                {job.creator ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="ke-download-detail__separator"
                    >
                      –
                    </span>
                    <span>
                      Clipped by{' '}
                      <a
                        className="ke-download-detail__creator"
                        href={`https://kick.com/${encodeURIComponent(job.creator)}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {job.creator}
                      </a>
                    </span>
                  </>
                ) : null}
              </p>
            </div>
          </header>

          {job.media ? <MediaFacts job={job} /> : null}
        </div>
      </section>

      {job.status === 'ready' ? <ReadyView job={job} /> : null}

      {job.status === 'queued' ? (
        <StatusPanel
          message={`Waiting in queue${
            job.queuePosition ? ` (position ${job.queuePosition})` : ''
          }.`}
        >
          <Button onClick={() => downloadManager.cancel(job.id)}>Cancel</Button>
        </StatusPanel>
      ) : null}

      {job.status === 'awaiting-destination' ? (
        <StatusPanel message="This download is next. Choose its destination to start.">
          <Button
            className="ke-button--primary"
            onClick={() => {
              void downloadManager.chooseDestination(job.id)
            }}
          >
            Choose file and start
          </Button>
          <Button onClick={() => downloadManager.cancel(job.id)}>Cancel</Button>
        </StatusPanel>
      ) : null}

      {job.status === 'choosing-destination' ? (
        <StatusPanel icon message="Waiting for a file destination…" />
      ) : null}

      {job.status === 'active' ? <ActiveView job={job} /> : null}

      {job.status === 'completed' ? (
        <TerminalView
          job={job}
          message={`Saved ${job.filename}`}
          primaryLabel="Download again"
        />
      ) : null}

      {job.status === 'failed' ? (
        <TerminalView
          job={job}
          message={job.error?.message ?? 'The clip download failed.'}
          primaryLabel="Retry"
        />
      ) : null}

      {job.status === 'cancelled' ? (
        <TerminalView
          job={job}
          message="The download was cancelled."
          primaryLabel="Retry"
        />
      ) : null}
    </article>
  )
}

function ReadyView({ job }: Readonly<{ job: DownloadJobSnapshot }>) {
  const hasFilePicker = Boolean(getSaveFilePicker())
  const isLargeFallback =
    job.media?.sourceBytes !== undefined &&
    job.media.sourceBytes >= MEMORY_WARNING_BYTES

  return (
    <form
      className="ke-download-ready"
      onSubmit={(event) => {
        event.preventDefault()
        downloadManager.requestDownload(
          job.id,
          hasFilePicker ? 'file-system' : 'memory',
        )
      }}
    >
      <TextField
        label="Output filename"
        maxLength={180}
        onValueChange={(value) => downloadManager.updateBasename(job.id, value)}
        suffix=".mp4"
        value={job.basename}
      />

      {job.error ? (
        <p className="ke-download-message is-error" role="alert">
          {job.error.message}
        </p>
      ) : null}

      {!hasFilePicker && isLargeFallback ? (
        <p className="ke-download-message is-warning">
          This browser must keep the final MP4 in memory. The clip is unusually
          large, so close memory-heavy tabs before continuing.
        </p>
      ) : null}

      {hasFilePicker ? (
        <p className="ke-download-message">
          If you select an existing file, the browser may clear it before
          processing finishes.
        </p>
      ) : null}

      <div className="ke-download-actions">
        <Button className="ke-button--primary" type="submit">
          Download
        </Button>
        {hasFilePicker ? (
          <Button
            onClick={() => downloadManager.requestDownload(job.id, 'memory')}
          >
            Use memory download
          </Button>
        ) : null}
        <Button onClick={() => removeDownload(job.id)}>Remove</Button>
      </div>
    </form>
  )
}

function ActiveView({ job }: Readonly<{ job: DownloadJobSnapshot }>) {
  const total = job.media?.sourceBytes
  const percentage =
    total && total > 0
      ? Math.min(100, (job.writtenBytes / total) * 100)
      : undefined
  const phaseLabel =
    job.phase === 'fetching'
      ? formatFetchingStatus(job, Date.now())
      : formatPhase(job.phase)

  return (
    <section className="ke-download-active">
      <div className="ke-download-progress">
        <div className="ke-download-progress__heading">
          <span>{phaseLabel}</span>
          <span>
            {formatBytes(job.writtenBytes)}
            {total
              ? ` of ${formatBytes(total)} - ${percentage?.toFixed(1)}%`
              : ` - ${job.completedSegments}/${job.media?.logicalSegmentCount ?? '?'} segments`}
          </span>
        </div>
        <progress
          aria-label="Download progress"
          className="ke-download-progress__bar"
          max={total ?? undefined}
          value={total ? job.writtenBytes : undefined}
        />
      </div>
      <div className="ke-download-actions">
        <Button tone="danger" onClick={() => downloadManager.cancel(job.id)}>
          Cancel
        </Button>
      </div>
    </section>
  )
}

function TerminalView({
  job,
  message,
  primaryLabel,
}: Readonly<{
  job: DownloadJobSnapshot
  message: string
  primaryLabel: string
}>) {
  return (
    <StatusPanel error={job.status === 'failed'} message={message}>
      <Button
        className="ke-button--primary"
        onClick={() => downloadManager.retry(job.id)}
      >
        {primaryLabel}
      </Button>
      <Button onClick={() => removeDownload(job.id)}>Remove</Button>
    </StatusPanel>
  )
}

function MediaFacts({ job }: Readonly<{ job: DownloadJobSnapshot }>) {
  const media = job.media

  if (!media) {
    return null
  }

  return (
    <dl className="ke-download-facts">
      <div>
        <dt>Duration</dt>
        <dd>{formatDuration(media.duration)}</dd>
      </div>
      <div>
        <dt>Download size</dt>
        <dd>
          {media.sourceBytes ? formatBytes(media.sourceBytes) : 'Unknown'}
          <span className="ke-download-facts__secondary">
            {' '}
            ({media.logicalSegmentCount}{' '}
            {media.logicalSegmentCount === 1 ? 'segment' : 'segments'})
          </span>
        </dd>
      </div>
      {job.viewCount !== undefined ? (
        <div>
          <dt>Views</dt>
          <dd>{COUNT_FORMATTER.format(job.viewCount)}</dd>
        </div>
      ) : null}
      {job.likeCount !== undefined ? (
        <div>
          <dt>Likes</dt>
          <dd>{COUNT_FORMATTER.format(job.likeCount)}</dd>
        </div>
      ) : null}
    </dl>
  )
}

function StatusPanel({
  children,
  error = false,
  icon = false,
  message,
}: Readonly<{
  children?: ComponentChildren
  error?: boolean
  icon?: boolean
  message: string
}>) {
  return (
    <section className="ke-download-status">
      <p
        className={`ke-download-message${error ? ' is-error' : ''}`}
        role={error ? 'alert' : 'status'}
      >
        {icon ? <LoadingSpinnerIcon class="ke-icon ke-icon--spinner" /> : null}
        <span>{message}</span>
      </p>
      {children ? <div className="ke-download-actions">{children}</div> : null}
    </section>
  )
}

function formatStatus(job: DownloadJobSnapshot) {
  const labels: Record<DownloadJobSnapshot['status'], string> = {
    active: formatPhase(job.phase),
    'awaiting-destination': 'Choose file',
    cancelled: 'Cancelled',
    'choosing-destination': 'Choosing file',
    completed: 'Completed',
    failed: 'Failed',
    inspecting: 'Inspecting',
    queued: job.queuePosition ? `Queued ${job.queuePosition}` : 'Queued',
    ready: 'Ready',
  }

  return labels[job.status]
}

function formatPhase(phase: DownloadJobSnapshot['phase']) {
  const labels = {
    fetching: 'Downloading',
    inspecting: 'Inspecting',
    transmuxing: 'Converting to MP4',
    writing: 'Writing MP4',
  }

  return phase ? labels[phase] : 'Working'
}

function formatFetchingStatus(job: DownloadJobSnapshot, now: number) {
  const segmentCount = job.media?.logicalSegmentCount
  const label =
    segmentCount && segmentCount > 1
      ? `Segment ${Math.min(
          segmentCount,
          job.completedSegments + 1,
        )}/${segmentCount}`
      : 'Downloading'
  const estimate = estimateDownloadTransfer(
    job.fetchedBytes,
    job.media?.sourceBytes,
    job.startedAt,
    now,
  )

  if (!estimate) {
    return label
  }

  const remaining =
    estimate.remainingSeconds === undefined
      ? ''
      : ` - ${formatRemainingTime(estimate.remainingSeconds)} remaining`

  return `${label}: ${formatBytes(estimate.bytesPerSecond)}/s${remaining}`
}

function formatRemainingTime(duration: number) {
  const seconds = Math.max(1, Math.ceil(duration))
  const hours = Math.floor(seconds / 3_600)
  const minutes = Math.floor((seconds % 3_600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }

  return `${remainingSeconds}s`
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  const units = ['KiB', 'MiB', 'GiB']
  let value = bytes / 1024
  let unit = units[0]

  for (let index = 1; index < units.length && value >= 1024; index += 1) {
    value /= 1024
    unit = units[index]
  }

  return `${value.toFixed(value >= 100 ? 0 : 1)} ${unit}`
}

function formatDuration(duration: number | undefined) {
  if (!duration) {
    return 'Unknown'
  }

  const seconds = Math.round(duration)
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}
