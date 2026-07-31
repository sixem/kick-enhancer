const DIGIT_REPETITIONS = 3
const DIGITS = Array.from(
  { length: 10 * DIGIT_REPETITIONS },
  (_, index) => index % 10,
)

type AnimationState = {
  animations: Animation[]
  frame?: number
  value: string
}

const states = new WeakMap<HTMLElement, AnimationState>()

export function renderAnimatedNumber(
  container: HTMLElement,
  value: number,
) {
  const formatted = formatNumber(value)
  const existing = states.get(container)

  if (existing?.value === formatted) {
    return
  }

  cancelState(existing)

  if (prefersReducedMotion()) {
    container.textContent = formatted
    states.set(container, {
      animations: [],
      value: formatted,
    })
    return
  }

  const fragment = document.createDocumentFragment()
  const reels: Array<{
    digit: number
    element: HTMLElement
    index: number
    viewport: HTMLElement
  }> = []
  let digitIndex = 0

  for (const character of formatted) {
    if (!/\d/.test(character)) {
      const separator = document.createElement('span')
      separator.className = 'ke-animated-number__separator'
      separator.textContent = character
      fragment.append(separator)
      continue
    }

    const viewport = document.createElement('span')
    viewport.className = 'ke-animated-number__digit'

    const reel = document.createElement('span')
    reel.className = 'ke-animated-number__reel'

    for (const digit of DIGITS) {
      const cell = document.createElement('span')
      cell.className = 'ke-animated-number__cell'
      cell.textContent = String(digit)
      reel.append(cell)
    }

    viewport.append(reel)
    fragment.append(viewport)
    reels.push({
      digit: Number(character),
      element: reel,
      index: digitIndex,
      viewport,
    })
    digitIndex += 1
  }

  container.replaceChildren(fragment)

  const state: AnimationState = {
    animations: [],
    value: formatted,
  }
  states.set(container, state)

  state.frame = window.requestAnimationFrame(() => {
    state.frame = undefined

    if (
      states.get(container) !== state ||
      !container.isConnected
    ) {
      return
    }

    for (const reel of reels) {
      const digitHeight = reel.viewport.getBoundingClientRect().height

      if (digitHeight <= 0) {
        continue
      }

      const target =
        -(20 + reel.digit) * digitHeight
      const animation = reel.element.animate(
        [
          { transform: 'translateY(0)' },
          {
            offset: 0.82,
            transform: `translateY(${target - digitHeight * 0.3}px)`,
          },
          {
            offset: 0.93,
            transform: `translateY(${target + digitHeight * 0.1}px)`,
          },
          { transform: `translateY(${target}px)` },
        ],
        {
          delay: reel.index * 35,
          duration: 520 + reel.index * 70,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'backwards',
        },
      )

      reel.element.style.transform = `translateY(${target}px)`
      state.animations.push(animation)
    }
  })
}

function formatNumber(value: number) {
  return value.toLocaleString()
}

function cancelState(state: AnimationState | undefined) {
  if (!state) {
    return
  }

  if (state.frame !== undefined) {
    window.cancelAnimationFrame(state.frame)
  }

  for (const animation of state.animations) {
    animation.cancel()
  }
}

function prefersReducedMotion() {
  return window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
}
