import { useEffect, useMemo, useRef, useState } from 'preact/hooks'

import {
  ListView,
  type ListViewColumn,
} from '../components/ListView'
import {
  Button,
  SelectBox,
  TextField,
  type SelectBoxOption,
} from '../components/forms'
import {
  getViewerEndpointObservations,
  runViewerEndpointChecks,
  subscribeViewerEndpointObservations,
  VIEWER_COUNT_ENDPOINT_LABELS,
  VIEWER_COUNT_ENDPOINTS,
  type EndpointCheckResult,
  type EndpointObservation,
} from '../features/viewerCounts/diagnostics'
import { getChannelSlugFromPath } from '../features/viewerCounts/slug'
import {
  formatLogEntry,
  formatLogMessage,
} from '../logging/format'
import {
  clearLogHistory,
  getLogHistory,
  subscribeLogHistory,
  type LogEntry,
} from '../logging/logger'

type PassiveEndpointRow = Readonly<{
  endpoint: EndpointObservation['endpoint']
  observation?: EndpointObservation
}>

type DiagnosticsTabProps = Readonly<{
  active: boolean
  onShowMessage: (title: string, description: string) => void
}>

const EMPTY_LOGS: readonly LogEntry[] = []
const EMPTY_OBSERVATIONS: readonly EndpointObservation[] = []

const LOG_LEVEL_OPTIONS: readonly SelectBoxOption[] = [
  { label: 'All levels', value: 'all' },
  { label: 'Debug', value: 'debug' },
  { label: 'Info', value: 'info' },
  { label: 'Warnings', value: 'warn' },
  { label: 'Errors', value: 'error' },
]

const TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
  second: '2-digit',
})

const CHECK_COLUMNS: readonly ListViewColumn<EndpointCheckResult>[] = [
  {
    header: 'Endpoint',
    id: 'endpoint',
    renderCell: (result) =>
      VIEWER_COUNT_ENDPOINT_LABELS[result.endpoint],
    width: '7.5rem',
  },
  {
    align: 'center',
    header: 'Status',
    id: 'status',
    renderCell: (result) => (
      <DiagnosticsPill
        label={result.status}
        tone={result.status}
      />
    ),
    width: '7.2rem',
  },
  {
    align: 'center',
    header: 'Response',
    id: 'response',
    renderCell: formatCheckResponse,
    width: '6.6rem',
  },
  {
    cellClassName: 'ke-diagnostics__details-cell',
    header: 'Details',
    id: 'details',
    renderCell: (result) => result.summary,
    width: 'minmax(12rem, 1fr)',
  },
]

const PASSIVE_COLUMNS: readonly ListViewColumn<PassiveEndpointRow>[] = [
  {
    header: 'Endpoint',
    id: 'endpoint',
    renderCell: (row) =>
      VIEWER_COUNT_ENDPOINT_LABELS[row.endpoint],
    width: '9rem',
  },
  {
    align: 'center',
    header: 'State',
    id: 'state',
    renderCell: (row) => (
      <DiagnosticsPill
        label={row.observation ? 'observed' : 'not seen'}
        tone={row.observation ? 'observed' : 'not-seen'}
      />
    ),
    width: '7.2rem',
  },
  {
    align: 'center',
    header: 'Last seen',
    id: 'last-seen',
    renderCell: (row) =>
      row.observation
        ? formatTime(row.observation.observedAt)
        : '—',
    width: '6.2rem',
  },
  {
    cellClassName: 'ke-diagnostics__details-cell',
    header: 'Normalized result',
    id: 'details',
    renderCell: (row) => formatObservation(row.observation),
    width: 'minmax(12rem, 1fr)',
  },
]

const LOG_COLUMNS: readonly ListViewColumn<LogEntry>[] = [
  {
    align: 'center',
    header: 'Level',
    id: 'level',
    renderCell: (entry) => (
      <DiagnosticsPill label={entry.level} tone={entry.level} />
    ),
    width: '6.25rem',
  },
  {
    align: 'center',
    header: 'Time',
    id: 'time',
    renderCell: (entry) => formatTime(entry.timestamp),
    width: '5.3rem',
  },
  {
    align: 'center',
    header: 'Scope',
    id: 'scope',
    renderCell: (entry) => (
      <DiagnosticsPill
        label={entry.scope}
        tone={getScopeTone(entry.scope)}
      />
    ),
    width: '10rem',
  },
  {
    cellClassName: 'ke-diagnostics__log-message',
    header: 'Message',
    id: 'message',
    renderCell: formatLogMessage,
    width: 'minmax(14rem, 1fr)',
  },
]

export function DiagnosticsTab({
  active,
  onShowMessage,
}: DiagnosticsTabProps) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [channelSlug, setChannelSlug] = useState(
    () => getChannelSlugFromPath(window.location.pathname) ?? '',
  )
  const [checks, setChecks] = useState<
    readonly EndpointCheckResult[]
  >([])
  const [checksRunning, setChecksRunning] = useState(false)
  const [observations, setObservations] = useState<
    readonly EndpointObservation[]
  >(() =>
    active
      ? getViewerEndpointObservations()
      : EMPTY_OBSERVATIONS,
  )
  const [logs, setLogs] = useState<readonly LogEntry[]>(() =>
    active ? getLogHistory() : EMPTY_LOGS,
  )
  const [logLevel, setLogLevel] = useState('all')
  const [logScope, setLogScope] = useState('all')

  useEffect(() => {
    if (!active) {
      setLogs(EMPTY_LOGS)
      setObservations(EMPTY_OBSERVATIONS)
      abortControllerRef.current?.abort()
      return
    }

    setLogs(getLogHistory())
    setObservations(getViewerEndpointObservations())
    const unsubscribeLogs = subscribeLogHistory(setLogs)
    const unsubscribeObservations =
      subscribeViewerEndpointObservations(setObservations)

    return () => {
      unsubscribeLogs()
      unsubscribeObservations()
      abortControllerRef.current?.abort()
    }
  }, [active])

  const passiveRows = useMemo<readonly PassiveEndpointRow[]>(() => {
    const byEndpoint = new Map(
      observations.map((observation) => [
        observation.endpoint,
        observation,
      ]),
    )

    return VIEWER_COUNT_ENDPOINTS.map((endpoint) => ({
      endpoint,
      observation: byEndpoint.get(endpoint),
    }))
  }, [observations])

  const scopeOptions = useMemo<readonly SelectBoxOption[]>(() => {
    const scopes = [...new Set(logs.map((entry) => entry.scope))].sort()

    return [
      { label: 'All scopes', value: 'all' },
      ...scopes.map((scope) => ({
        label: scope,
        value: scope,
      })),
    ]
  }, [logs])

  const filteredLogs = useMemo<readonly LogEntry[]>(() => {
    return logs
      .filter(
        (entry) =>
          (logLevel === 'all' || entry.level === logLevel) &&
          (logScope === 'all' || entry.scope === logScope),
      )
      .reverse()
  }, [logLevel, logScope, logs])

  const runChecks = async () => {
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller
    setChecksRunning(true)

    try {
      setChecks(
        await runViewerEndpointChecks(channelSlug, controller.signal),
      )
    } catch {
      if (!controller.signal.aborted) {
        setChecks([
          {
            endpoint: 'CHANNEL_DETAILS',
            status: 'failed',
            summary: 'The endpoint check stopped unexpectedly.',
          },
          {
            endpoint: 'CURRENT_VIEWERS',
            status: 'unavailable',
            summary: 'The channel check did not complete.',
          },
        ])
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null
        setChecksRunning(false)
      }
    }
  }

  const copyLogs = async () => {
    if (filteredLogs.length === 0) {
      onShowMessage(
        'No logs to copy',
        'No visible log entries match the current filters.',
      )
      return
    }

    const text = filteredLogs
      .map(formatLogEntry)
      .reverse()
      .join('\n')

    try {
      await navigator.clipboard.writeText(text)
      onShowMessage(
        'Session log copied',
        `Copied ${filteredLogs.length} log ${
          filteredLogs.length === 1 ? 'entry' : 'entries'
        } to the clipboard.`,
      )
    } catch {
      onShowMessage(
        'Could not copy session log',
        'Could not access the clipboard. Check your browser permissions and try again.',
      )
    }
  }

  return (
    <div className="ke-diagnostics">
      <section
        aria-labelledby="ke-diagnostics-checks-title"
        className="ke-diagnostics__section"
      >
        <div className="ke-diagnostics__section-heading">
          <div>
            <h3
              className="ke-diagnostics__title"
              id="ke-diagnostics-checks-title"
            >
              Endpoint health
            </h3>
            <p className="ke-diagnostics__description">
              Run the same channel and viewer requests used by stream
              enhancements. Checks only run when requested.
            </p>
          </div>
        </div>
        <form
          className="ke-diagnostics__check-controls"
          onSubmit={(event) => {
            event.preventDefault()

            if (!checksRunning) {
              void runChecks()
            }
          }}
        >
          <TextField
            autoComplete="off"
            label="Kick channel"
            onValueChange={setChannelSlug}
            placeholder="channel-name"
            spellcheck={false}
            value={channelSlug}
          />
          <Button
            className="ke-button--primary"
            disabled={checksRunning}
            type="submit"
          >
            {checksRunning ? 'Checking…' : 'Run checks'}
          </Button>
        </form>
        <ListView
          ariaLabel="Endpoint check results"
          ariaLive="polite"
          className="ke-diagnostics__check-list"
          columns={CHECK_COLUMNS}
          emptyContent={
            checksRunning
              ? 'Contacting Kick…'
              : 'Run checks to test endpoints.'
          }
          getItemKey={(result) => result.endpoint}
          heightMode="content"
          items={checks}
        />
      </section>

      <section
        aria-labelledby="ke-diagnostics-observed-title"
        className="ke-diagnostics__section"
      >
        <div className="ke-diagnostics__section-heading">
          <div>
            <h3
              className="ke-diagnostics__title"
              id="ke-diagnostics-observed-title"
            >
              Observed responses
            </h3>
            <p className="ke-diagnostics__description">
              Passive summaries from Kick responses already used by the
              page or Enhancer. No response bodies are retained.
            </p>
          </div>
        </div>
        <ListView
          ariaLabel="Observed viewer endpoint responses"
          className="ke-diagnostics__observation-list"
          columns={PASSIVE_COLUMNS}
          getItemKey={(row) => row.endpoint}
          items={passiveRows}
        />
      </section>

      <section
        aria-labelledby="ke-diagnostics-logs-title"
        className="ke-diagnostics__section"
      >
        <div className="ke-diagnostics__section-heading">
          <div>
            <h3
              className="ke-diagnostics__title"
              id="ke-diagnostics-logs-title"
            >
              Session log
            </h3>
            <p className="ke-diagnostics__description">
              Latest 250 entries from this page load. Sensitive fields
              and URL queries are redacted when displayed or copied.
            </p>
          </div>
        </div>
        <div className="ke-diagnostics__log-controls">
          <SelectBox
            label="Level"
            onValueChange={setLogLevel}
            options={LOG_LEVEL_OPTIONS}
            value={logLevel}
          />
          <SelectBox
            label="Scope"
            onValueChange={setLogScope}
            options={scopeOptions}
            value={logScope}
          />
          <div className="ke-diagnostics__actions">
            <Button onClick={() => void copyLogs()}>
              Copy
            </Button>
            <Button
              onClick={() => {
                clearLogHistory()
                setLogScope('all')
              }}
              tone="danger"
            >
              Clear
            </Button>
          </div>
        </div>
        <ListView
          ariaLabel="Kick Enhancer session logs"
          ariaLive="polite"
          className="ke-diagnostics__log-list"
          columns={LOG_COLUMNS}
          emptyContent="No log entries match these filters."
          getItemKey={(entry) => entry.id}
          items={filteredLogs}
          rowHeight={36}
        />
      </section>
    </div>
  )
}

function DiagnosticsPill({
  label,
  tone,
}: Readonly<{
  label: string
  tone: string
}>) {
  return (
    <span className="ke-diagnostics__pill" data-tone={tone}>
      <span className="ke-diagnostics__pill-label">{label}</span>
    </span>
  )
}

const SCOPE_TONES = [
  'scope-blue',
  'scope-cyan',
  'scope-green',
  'scope-amber',
  'scope-violet',
  'scope-rose',
] as const

function getScopeTone(scope: string) {
  let hash = 0

  for (const character of scope) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }

  return SCOPE_TONES[hash % SCOPE_TONES.length] ?? SCOPE_TONES[0]
}

function formatCheckResponse(result: EndpointCheckResult) {
  const duration =
    result.durationMs === undefined
      ? undefined
      : `${Math.round(result.durationMs)}ms`

  if (result.httpStatus !== undefined) {
    return duration
      ? `${result.httpStatus} (${duration})`
      : String(result.httpStatus)
  }

  return duration ?? '—'
}

function formatObservation(
  observation: EndpointObservation | undefined,
) {
  if (!observation) {
    return 'No matching response seen this session.'
  }

  const source =
    observation.source === 'captured'
      ? 'page traffic'
      : 'fallback request'
  const details = [
    `normalized=${observation.records}`,
    `hidden=${observation.hiddenViewerCounts}`,
    `startTimes=${observation.startTimes}`,
    `source=${source}`,
  ]

  return details.join('; ')
}

function formatTime(timestamp: number) {
  const date = new Date(timestamp)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown'
  }

  return TIME_FORMATTER.format(date)
}
