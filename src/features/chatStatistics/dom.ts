export type ChatStatisticsAnchors = Readonly<{
  eventStack: HTMLElement | null
  title: HTMLElement
}>

const CHATROOM_SELECTOR = '#channel-chatroom'
const MESSAGES_SELECTOR = '#chatroom-messages'
const TITLE_POSITION_CLASSES = [
  'absolute',
  'left-1/2',
  '-translate-x-1/2',
] as const

export function findChatStatisticsAnchors(
  ownerDocument: Document = document,
): ChatStatisticsAnchors | null {
  const chatroom =
    ownerDocument.querySelector<HTMLElement>(CHATROOM_SELECTOR)

  if (!chatroom) {
    return null
  }

  let title: HTMLElement | undefined

  for (const candidate of chatroom.querySelectorAll<HTMLElement>(
    'span',
  )) {
    if (
      candidate.parentElement?.parentElement?.parentElement !==
      chatroom
    ) {
      continue
    }

    let matchesPosition = true

    for (const className of TITLE_POSITION_CLASSES) {
      if (!candidate.classList.contains(className)) {
        matchesPosition = false
        break
      }
    }

    if (matchesPosition) {
      title = candidate
      break
    }
  }

  if (!title) {
    return null
  }

  const messages =
    chatroom.querySelector<HTMLElement>(MESSAGES_SELECTOR)
  const stackRoot = messages?.previousElementSibling
  const eventStack =
    stackRoot?.classList.contains('absolute') &&
    stackRoot.classList.contains('w-full') &&
    stackRoot.firstElementChild
      ? (stackRoot.firstElementChild as HTMLElement)
      : null

  return {
    eventStack,
    title,
  }
}
