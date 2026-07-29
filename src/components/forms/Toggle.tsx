import type { JSX } from 'preact'
import { useId } from 'preact/hooks'

import { joinClassNames } from '../utils'

type ToggleProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'onChange' | 'type'
> & {
  className?: string
  description?: string
  label: string
  onCheckedChange?: (checked: boolean) => void
}

export function Toggle({
  className,
  description,
  id,
  label,
  onCheckedChange,
  ...props
}: ToggleProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined

  return (
    <label className={joinClassNames('ke-toggle', className)} htmlFor={inputId}>
      <span className="ke-toggle__copy">
        <span className="ke-form-field__label">{label}</span>
        {description ? (
          <span className="ke-form-field__description" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </span>
      <span className="ke-toggle__control">
        <input
          {...props}
          aria-describedby={descriptionId}
          className="ke-toggle__input"
          id={inputId}
          onChange={(event) =>
            onCheckedChange?.(event.currentTarget.checked)
          }
          role="switch"
          type="checkbox"
        />
        <span aria-hidden="true" className="ke-toggle__track">
          <span className="ke-toggle__thumb" />
        </span>
      </span>
    </label>
  )
}
