import type { JSX } from 'preact'
import { useId } from 'preact/hooks'

import { joinClassNames } from '../utils'

type TextFieldProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'id' | 'onInput'
> & {
  className?: string
  description?: string
  id?: string
  label: string
  onValueChange?: (value: string) => void
  suffix?: string
}

export function TextField({
  className,
  description,
  id,
  label,
  onValueChange,
  suffix,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined
  const suffixId = suffix ? `${inputId}-suffix` : undefined
  const describedBy =
    [descriptionId, suffixId].filter(Boolean).join(' ') || undefined

  return (
    <label className="ke-form-field" htmlFor={inputId}>
      <span className="ke-form-field__label">{label}</span>
      {description ? (
        <span className="ke-form-field__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      <span className={suffix ? 'ke-text-field-shell' : undefined}>
        <input
          {...props}
          aria-describedby={describedBy}
          className={joinClassNames('ke-text-field', className)}
          id={inputId}
          onInput={(event) => onValueChange?.(event.currentTarget.value)}
        />
        {suffix ? (
          <span className="ke-text-field__suffix" id={suffixId}>
            {suffix}
          </span>
        ) : null}
      </span>
    </label>
  )
}
