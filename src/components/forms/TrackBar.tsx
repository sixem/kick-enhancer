import type { JSX } from 'preact'
import { useId, useState } from 'preact/hooks'

type TrackBarProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'max' | 'min' | 'onInput' | 'type' | 'value'
> & {
  defaultValue?: number
  description?: string
  formatValue?: (value: number) => string
  label: string
  max: number
  min: number
  onValueChange?: (value: number) => void
  value?: number
}

export function TrackBar({
  defaultValue,
  description,
  formatValue = String,
  id,
  label,
  max,
  min,
  onValueChange,
  value,
  ...props
}: TrackBarProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? min)
  const currentValue = value ?? internalValue
  const range = max - min
  const progress = range > 0 ? ((currentValue - min) / range) * 100 : 0

  const handleInput = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.valueAsNumber

    if (value === undefined) {
      setInternalValue(nextValue)
    }

    onValueChange?.(nextValue)
  }

  return (
    <label className="ke-form-field" htmlFor={inputId}>
      <span className="ke-track-bar__heading">
        <span className="ke-form-field__label">{label}</span>
        <output className="ke-track-bar__value" htmlFor={inputId}>
          {formatValue(currentValue)}
        </output>
      </span>
      {description ? (
        <span className="ke-form-field__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      <input
        {...props}
        aria-describedby={descriptionId}
        className="ke-track-bar"
        id={inputId}
        max={max}
        min={min}
        onInput={handleInput}
        style={{ '--ke-track-progress': `${progress}%` }}
        type="range"
        value={currentValue}
      />
    </label>
  )
}
