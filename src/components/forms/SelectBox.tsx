import type { JSX } from 'preact'
import { useId } from 'preact/hooks'

import { joinClassNames } from '../utils'

export type SelectBoxOption = {
  disabled?: boolean
  label: string
  value: string
}

type SelectBoxProps = Omit<
  JSX.SelectHTMLAttributes<HTMLSelectElement>,
  'className' | 'id' | 'onChange'
> & {
  className?: string
  description?: string
  id?: string
  label: string
  onValueChange?: (value: string) => void
  options: readonly SelectBoxOption[]
}

export function SelectBox({
  className,
  description,
  id,
  label,
  onValueChange,
  options,
  ...props
}: SelectBoxProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const descriptionId = description ? `${selectId}-description` : undefined

  return (
    <label className="ke-form-field" htmlFor={selectId}>
      <span className="ke-form-field__label">{label}</span>
      {description ? (
        <span className="ke-form-field__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      <span className="ke-select-box">
        <select
          {...props}
          aria-describedby={descriptionId}
          className={joinClassNames('ke-select-box__input', className)}
          id={selectId}
          onChange={(event) => onValueChange?.(event.currentTarget.value)}
        >
          {options.map((option) => (
            <option
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="ke-select-box__chevron" />
      </span>
    </label>
  )
}
