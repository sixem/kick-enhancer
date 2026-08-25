import { useLayoutEffect, useRef } from 'preact/hooks'

import { renderAnimatedNumber } from './numberReel.ts'

export function AnimatedNumber({
  value,
}: Readonly<{
  value: number
}>) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (elementRef.current) {
      renderAnimatedNumber(elementRef.current, value)
    }
  }, [value])

  return (
    <span
      aria-label={value.toLocaleString()}
      className="ke-animated-number"
      ref={elementRef}
    />
  )
}
