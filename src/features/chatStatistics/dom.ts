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
  let fallback: ChatStatisticsAnchors | null = null
  let visible: ChatStatisticsAnchors | null = null

  for (const chatroom of ownerDocument.querySelectorAll<HTMLElement>(
    CHATROOM_SELECTOR,
  )) {
    const anchors = findChatroomAnchors(chatroom)

    if (!anchors) {
      continue
    }

    fallback = anchors

    if (isVisible(chatroom)) {
      visible = anchors
    }
  }

  return visible ?? fallback
}

function findChatroomAnchors(
  chatroom: HTMLElement,
): ChatStatisticsAnchors | null {
  let title: HTMLElement | undefined

  for (const candidate of chatroom.querySelectorAll<HTMLElement>('span')) {
    let matchesPosition = true

    for (const className of TITLE_POSITION_CLASSES) {
      if (!candidate.classList.contains(className)) {
        matchesPosition = false
        break
      }
    }

    const header = candidate.parentElement
    const isNearChatroomRoot =
      header?.parentElement === chatroom ||
      header?.parentElement?.parentElement === chatroom

    if (matchesPosition && isNearChatroomRoot) {
      title = candidate
      break
    }
  }

  if (!title) {
    return null
  }

  const messages = chatroom.querySelector<HTMLElement>(MESSAGES_SELECTOR)
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

function isVisible(element: HTMLElement) {
  return (
    typeof element.checkVisibility !== 'function' ||
    element.checkVisibility({
      checkOpacity: true,
      checkVisibilityCSS: true,
    })
  )
}
