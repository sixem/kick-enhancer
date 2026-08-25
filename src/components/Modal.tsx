import type { ComponentChildren, JSX, RefObject } from 'preact'
import { createPortal } from 'preact/compat'
import { useEffect, useId, useRef } from 'preact/hooks'

import { Button } from './forms'
import { useModalFocusRestoration } from './modalFocus'
import { joinClassNames } from './utils'

type ModalProps = {
  children: ComponentChildren
  className?: string
  closeLabel?: string
  description?: string
  dismissDisabled?: boolean
  footer?: ComponentChildren
  icon?: string
  initialFocusRef?: RefObject<HTMLElement>
  onRequestClose: () => void
  open: boolean
  title: string
}

export function Modal({
  children,
  className,
  closeLabel = 'Close settings',
  description,
  dismissDisabled = false,
  footer,
  icon,
  initialFocusRef,
  onRequestClose,
  open,
  title,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useModalFocusRestoration(open)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      dialog.showModal()
      initialFocusRef?.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [initialFocusRef, open])

  const requestClose = () => {
    if (!dismissDisabled) {
      onRequestClose()
    }
  }

  const handleCancel = (event: JSX.TargetedEvent<HTMLDialogElement>) => {
    event.preventDefault()
    requestClose()
  }

  const handleBackdropPointerDown = (
    event: JSX.TargetedPointerEvent<HTMLDialogElement>,
  ) => {
    if (event.target === event.currentTarget) {
      requestClose()
    }
  }

  if (!open) {
    return null
  }

  return createPortal(
    <dialog
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={joinClassNames('ke-modal', className)}
      onCancel={handleCancel}
      onPointerDown={handleBackdropPointerDown}
      ref={dialogRef}
    >
      <div className="ke-modal__surface">
        <header className="ke-modal__header">
          <div className="ke-modal__identity">
            {icon ? (
              <img
                alt=""
                className="ke-modal__icon"
                draggable={false}
                src={icon}
              />
            ) : null}
            <div className="ke-modal__heading">
              <h2 className="ke-modal__title" id={titleId}>
                {title}
              </h2>
              {description ? (
                <p className="ke-modal__description" id={descriptionId}>
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          <Button
            aria-label={closeLabel}
            className="ke-modal__close"
            disabled={dismissDisabled}
            onClick={requestClose}
          >
            <span aria-hidden="true">×</span>
          </Button>
        </header>
        <div className="ke-modal__body">{children}</div>
        {footer ? <footer className="ke-modal__footer">{footer}</footer> : null}
      </div>
    </dialog>,
    document.body,
  )
}
