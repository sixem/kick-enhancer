import { useId } from 'preact/hooks'

import icon from '../../assets/icon.png?inline'
import { DownloadIcon } from '../../icons'
import {
  activateClipDownload,
  type ClipSelectionHandler,
} from './clipCards'

type DirectClipDownloadActionProps = Readonly<{
  clipId: string
  onSelectClip: ClipSelectionHandler
}>

export function DirectClipDownloadAction({
  clipId,
  onSelectClip,
}: DirectClipDownloadActionProps) {
  const tooltipId = useId()
  const label = 'Download source clip (KICK Enhancer)'

  return (
    <>
      <button
        aria-describedby={tooltipId}
        aria-label={label}
        className="ke-direct-clip-download-action"
        data-ke-direct-clip-download
        onClick={(event) =>
          activateClipDownload(event, clipId, onSelectClip)
        }
        type="button"
      >
        <img
          alt=""
          className="ke-direct-clip-download-action__brand"
          draggable={false}
          src={icon}
        />
        <DownloadIcon class="ke-icon ke-direct-clip-download-action__icon" />
      </button>
      <span
        className="ke-direct-clip-download-tooltip"
        id={tooltipId}
        role="tooltip"
      >
        {label}
      </span>
    </>
  )
}
