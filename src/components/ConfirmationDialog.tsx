import type { JSX } from 'preact'
import { useEffect, useId, useRef } from 'preact/hooks'

import { Button } from './forms'

export type ConfirmationDialogProps = Readonly<{
  cancelLabel?: string
  confirmLabel?: string
  confirmTone?: 'danger' | 'default' | 'primary'
  description: string
  onCancel?: () => void
  onConfirm: () => void
  onDismiss?: () => void
  open: boolean
  title: string
}>

export function ConfirmationDialog({
  cancelLabel = 'Cancel',
  confirmLabel = 'OK',
  confirmTone = 'primary',
  description,
  onCancel,
  onConfirm,
  onDismiss,
  open,
  title,
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    dialogRef.current?.querySelector('button')?.focus()

    return () => {
      if (previousFocus?.isConnected) {
        previousFocus.focus()
      }
    }
  }, [open])

  if (!open) {
    return null
  }

  const dismiss = onDismiss ?? onCancel
  const handleKeyDown = (
    event: JSX.TargetedKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Escape') {
      if (dismiss) {
        event.preventDefault()
        event.stopPropagation()
        dismiss()
      }
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>(
      'button:not(:disabled)',
    )
    const firstButton = buttons?.item(0)
    const lastButton = buttons?.item((buttons?.length ?? 1) - 1)

    if (!firstButton || !lastButton) {
      return
    }

    if (event.shiftKey && document.activeElement === firstButton) {
      event.preventDefault()
      lastButton.focus()
    } else if (
      !event.shiftKey &&
      document.activeElement === lastButton
    ) {
      event.preventDefault()
      firstButton.focus()
    }
  }

  return (
    <div className="ke-confirmation-layer">
      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="ke-confirmation-dialog"
        onKeyDown={handleKeyDown}
        ref={dialogRef}
        role="alertdialog"
      >
        <div className="ke-confirmation-dialog__copy">
          <h3 className="ke-confirmation-dialog__title" id={titleId}>
            {title}
          </h3>
          <p
            className="ke-confirmation-dialog__description"
            id={descriptionId}
          >
            {description}
          </p>
        </div>
        <div className="ke-confirmation-dialog__actions">
          {onCancel ? (
            <Button onClick={onCancel}>
              {cancelLabel}
            </Button>
          ) : null}
          <Button onClick={onConfirm} tone={confirmTone}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
