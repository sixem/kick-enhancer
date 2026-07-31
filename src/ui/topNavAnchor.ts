const LOGGED_IN_ANCHOR_SELECTOR =
  'button[data-testid="kicks-top-nav"]'
const LOGGED_OUT_ANCHOR_SELECTOR =
  'nav button[data-testid="login"]'

export function findTopNavActions(
  ownerDocument: Document = document,
): HTMLElement | null {
  const anchor =
    ownerDocument.querySelector<HTMLButtonElement>(
      LOGGED_IN_ANCHOR_SELECTOR,
    ) ??
    ownerDocument.querySelector<HTMLButtonElement>(
      LOGGED_OUT_ANCHOR_SELECTOR,
    )

  return anchor?.parentElement ?? null
}
