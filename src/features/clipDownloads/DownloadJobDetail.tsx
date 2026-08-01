import type { ComponentChildren } from 'preact'

import { Button, TextField } from '../../components/forms'
import { LoadingSpinnerIcon } from '../../icons'
import {
  formatBytes,
  formatDuration,
  formatFetchingStatus,
  formatPhase,
} from './downloadFormatting'
import { downloadManager, type DownloadJobSnapshot } from './downloadManager'
import { getSaveFilePicker } from './outputSinks'

const MEMORY_WARNING_BYTES = 128 * 1024 * 1024
const CLIP_DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})
const COUNT_FORMATTER = new Intl.NumberFormat()

type DownloadJobDetailProps = Readonly<{
  job: DownloadJobSnapshot
  onRemove: (jobId: string) => void
}>

export function DownloadJobDetail({ job, onRemove }: DownloadJobDetailProps) {
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

      {job.status === 'ready' ? (
        <ReadyView job={job} onRemove={onRemove} />
      ) : null}

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
          onRemove={onRemove}
          primaryLabel="Download again"
        />
      ) : null}

      {job.status === 'failed' ? (
        <TerminalView
          job={job}
          message={job.error?.message ?? 'The clip download failed.'}
          onRemove={onRemove}
          primaryLabel="Retry"
        />
      ) : null}

      {job.status === 'cancelled' ? (
        <TerminalView
          job={job}
          message="The download was cancelled."
          onRemove={onRemove}
          primaryLabel="Retry"
        />
      ) : null}
    </article>
  )
}

function ReadyView({ job, onRemove }: DownloadJobDetailProps) {
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
        <Button onClick={() => onRemove(job.id)}>Remove</Button>
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
  onRemove,
  primaryLabel,
}: DownloadJobDetailProps &
  Readonly<{
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
      <Button onClick={() => onRemove(job.id)}>Remove</Button>
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
