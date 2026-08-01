import { useEffect, useState } from 'preact/hooks'

import icon from '../../assets/icon.png?inline'
import { ListView, type ListViewColumn } from '../../components/ListView'
import { Modal } from '../../components/Modal'
import { Tabs } from '../../components/Tabs'
import { Button } from '../../components/forms'
import { LoadingSpinnerIcon } from '../../icons'
import {
  focusDownloadJob,
  minimizeDownloadCenter,
} from './downloadCenterController'
import { formatBytes, formatDuration, formatStatus } from './downloadFormatting'
import { DownloadJobDetail } from './DownloadJobDetail'
import { downloadManager, type DownloadJobSnapshot } from './downloadManager'
import {
  useDownloadCenter,
  useDownloadActivity,
  useDownloads,
} from './useDownloads'

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
              <DownloadJobDetail job={focusedJob} onRemove={removeDownload} />
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
