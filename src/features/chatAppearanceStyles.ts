import type {
  ChatFontFamily,
  ChatFontWeight,
} from '../settings/settings'

type ChatAppearanceValues = Readonly<{
  fontFamily: ChatFontFamily | null
  fontSize: number | null
  fontWeight: ChatFontWeight | null
  messageDividers: boolean
  messageSpacing: number | null
}>

export function createChatAppearanceStyles({
  fontFamily,
  fontSize,
  fontWeight,
  messageDividers,
  messageSpacing,
}: ChatAppearanceValues) {
  const declarations = [
    fontFamily === null
      ? undefined
      : `font-family: ${FONT_FAMILY_STACKS[fontFamily]};`,
    fontSize === null
      ? undefined
      : `--chatroom-font-size: ${fontSize}px;`,
    messageSpacing === null
      ? undefined
      : `--chatroom-message-spacing: ${messageSpacing}px;`,
  ].filter(
    (declaration): declaration is string =>
      declaration !== undefined,
  )

  const rules = []

  if (declarations.length > 0) {
    rules.push(
      `#channel-chatroom {\n  ${declarations.join('\n  ')}\n}`,
    )
  }

  if (messageDividers) {
    rules.push(
      [
        '#chatroom-messages > div > [data-index]::after {',
        '  position: absolute;',
        '  right: 0;',
        '  bottom: 0;',
        '  left: 0;',
        '  height: 1px;',
        '  pointer-events: none;',
        '  content: "";',
        '  background: #161616;',
        '}',
      ].join('\n'),
    )
  }

  if (fontWeight !== null) {
    rules.push(
      [
        '#chatroom-messages > div > [data-index] .font-normal[class~="leading-[1.55]"] {',
        `  font-weight: ${fontWeight};`,
        '}',
      ].join('\n'),
    )
  }

  if (rules.length === 0) {
    return ''
  }

  return rules.join('\n\n')
}

const FONT_FAMILY_STACKS: Readonly<Record<ChatFontFamily, string>> = {
  arial: 'Arial, Helvetica, sans-serif',
  georgia: 'Georgia, "Times New Roman", serif',
  monospace: 'ui-monospace, Consolas, "Courier New", monospace',
  tahoma: 'Tahoma, Verdana, sans-serif',
  trebuchet: '"Trebuchet MS", Arial, sans-serif',
  verdana: 'Verdana, Geneva, sans-serif',
}
