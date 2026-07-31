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

  const title = Array.from(
    chatroom.querySelectorAll<HTMLElement>('span'),
  ).find(
    (candidate) =>
      TITLE_POSITION_CLASSES.every((className) =>
        candidate.classList.contains(className),
      ) &&
      candidate.parentElement?.parentElement?.parentElement ===
        chatroom,
  )

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
