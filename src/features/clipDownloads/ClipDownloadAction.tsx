import { type JSX } from 'preact'

import { DownloadIcon } from '../../icons'
import {
  activateClipDownload,
  type ClipSelectionHandler,
} from './clipCards'

type ClipDownloadActionProps = Readonly<{
  clipId: string
  onSelectClip: ClipSelectionHandler
}>

export function ClipDownloadAction({
  clipId,
  onSelectClip,
}: ClipDownloadActionProps) {
  function stopPointerPropagation(
    event:
      | JSX.TargetedMouseEvent<HTMLButtonElement>
      | JSX.TargetedPointerEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation()
  }

  return (
    <button
      aria-label="Download source clip"
      class="ke-clip-download-action"
      data-ke-clip-download
      onClick={(event) =>
        activateClipDownload(event, clipId, onSelectClip)
      }
      onMouseDown={stopPointerPropagation}
      onPointerDown={stopPointerPropagation}
      type="button"
    >
      <DownloadIcon class="ke-icon ke-clip-download-action__icon" />
    </button>
  )
}
