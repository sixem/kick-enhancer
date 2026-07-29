import type { JSX } from 'preact'

import { joinClassNames } from '../utils'

type ButtonProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  className?: string
  density?: 'compact' | 'default'
  tone?: 'danger' | 'default' | 'primary'
}

export function Button({
  children,
  className,
  density = 'default',
  tone = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={joinClassNames(
        'ke-button',
        `ke-button--${density}`,
        `ke-button--${tone}`,
        className,
      )}
      type={type}
    >
      {children}
    </button>
  )
}
