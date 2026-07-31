import { AnimatedNumber } from '../../components/AnimatedNumber.tsx'
import { LoadingSpinnerIcon } from '../../icons'
import { type ChatStatisticsSnapshot } from './types.ts'

type ChatStatisticsTriggerProps = Readonly<{
  expanded: boolean
  onToggle: () => void
  snapshot: ChatStatisticsSnapshot
}>

export function ChatStatisticsTrigger({
  expanded,
  onToggle,
  snapshot,
}: ChatStatisticsTriggerProps) {
  const calibrating =
    snapshot.status === 'pending' ||
    (snapshot.status === 'active' &&
      Date.now() < snapshot.trendReadyAt)
  const unavailable = snapshot.status === 'unavailable'
  const trend =
    snapshot.status === 'active' && !calibrating
      ? formatTrend(snapshot.trendPercent)
      : null

  return (
    <button
      aria-controls="kick-enhancer-chat-statistics-card"
      aria-expanded={expanded}
      aria-label={
        unavailable
          ? 'Chat statistics unavailable'
          : 'Toggle chat statistics'
      }
      className="ke-chat-statistics-trigger"
      onClick={onToggle}
      type="button"
    >
      {unavailable ? (
        <span>Chat</span>
      ) : (
        <span>
          <AnimatedNumber
            value={
              snapshot.status === 'active'
                ? snapshot.messagesPerMinute
                : 0
            }
          />
          /min
        </span>
      )}
      {unavailable ? (
        <span
          aria-hidden="true"
          className="ke-chat-statistics-trigger__unavailable"
        >
          !
        </span>
      ) : calibrating ? (
        <LoadingSpinnerIcon class="ke-chat-statistics-trigger__trend-loader" />
      ) : trend ? (
        <span
          className="ke-chat-statistics-trigger__trend"
          data-tone={trend.tone}
        >
          {trend.direction}
          <AnimatedNumber value={trend.value} />%
        </span>
      ) : null}
    </button>
  )
}

export function ChatStatisticsCard({
  onClose,
  snapshot,
}: Readonly<{
  onClose: () => void
  snapshot: ChatStatisticsSnapshot
}>) {
  const calibrating =
    snapshot.status === 'pending' ||
    (snapshot.status === 'active' &&
      Date.now() < snapshot.trendReadyAt)
  const trend =
    snapshot.status === 'active'
      ? formatTrend(snapshot.trendPercent)
      : null

  return (
    <section
      aria-label="Chat statistics"
      className="ke-chat-statistics-card"
      id="kick-enhancer-chat-statistics-card"
    >
      <header className="ke-chat-statistics-card__header">
        <span className="ke-chat-statistics-card__title">
          <span
            aria-hidden="true"
            className="ke-chat-statistics-card__live-dot"
            data-status={
              calibrating ? 'calibrating' : snapshot.status
            }
          />
          {snapshot.status === 'active'
            ? (
                <span>
                  Chat Statistics (ID:{' '}
                  <span className="ke-chat-statistics-card__room-id">
                    {snapshot.chatroomId}
                  </span>
                  {')'}
                </span>
              )
            : 'Chat Statistics'}
        </span>
        <button
          aria-label="Close chat statistics"
          className="ke-chat-statistics-card__close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      </header>

      {snapshot.status === 'unavailable' ? (
        <p className="ke-chat-statistics-card__error">
          {snapshot.reason === 'multiple-sessions'
            ? 'Multiple compatible chat sessions were detected, so no room was selected.'
            : snapshot.reason === 'capture-failed'
              ? 'Chat socket observation could not be installed.'
              : 'The KICK chat socket connection failed.'}
        </p>
      ) : (
        <>
          <div className="ke-chat-statistics-card__primary">
            <span className="ke-chat-statistics-card__rate">
              <AnimatedNumber
                value={
                  snapshot.status === 'active'
                    ? snapshot.messagesPerMinute
                    : 0
                }
              />{' '}
              <small>msg/min</small>
            </span>
            {calibrating ? (
              <span className="ke-chat-statistics-card__calibrating">
                Calibrating...
              </span>
            ) : trend ? (
              <span
                className="ke-chat-statistics-card__trend"
                data-tone={trend.tone}
              >
                {trend.direction}{' '}
                <AnimatedNumber value={trend.value} />%
              </span>
            ) : null}
          </div>

          <div className="ke-chat-statistics-card__details">
            <span>
              <strong>
                <AnimatedNumber
                  value={
                    snapshot.status === 'active'
                      ? snapshot.activeChatters
                      : 0
                  }
                />
              </strong>{' '}
              unique chatters/min
            </span>
            <span>
              <strong>
                {snapshot.status !== 'active' ||
                snapshot.socketRttMs === null
                  ? '—'
                  : (
                      <>
                        <AnimatedNumber
                          value={snapshot.socketRttMs}
                        />{' '}
                        ms
                      </>
                    )}
              </strong>{' '}
              socket RTT
            </span>
            <span>
              Peak{' '}
              <strong>
                <AnimatedNumber
                  value={
                    snapshot.status === 'active'
                      ? snapshot.peakMessagesPerMinute
                      : 0
                  }
                />{' '}
                msg/min
              </strong>
            </span>
            <span>
              <strong>
                <AnimatedNumber
                  value={
                    snapshot.status === 'active'
                      ? snapshot.totalMessages
                      : 0
                  }
                />
              </strong>{' '}
              total messages
            </span>
          </div>
        </>
      )}
    </section>
  )
}

function formatTrend(value: number | null) {
  if (value === null) {
    return null
  }

  if (value > 0) {
    return {
      direction: '↑',
      tone: 'positive',
      value,
    }
  }

  if (value < 0) {
    return {
      direction: '↓',
      tone: 'negative',
      value: Math.abs(value),
    }
  }

  return {
    direction: '–',
    tone: 'neutral',
    value: 0,
  }
}
