import assert from 'node:assert/strict'
import test from 'node:test'

import { createChatAppearanceStyles } from '../../../src/features/chatAppearance/styles.ts'

test('inherits Kick when no chat appearance overrides are set', () => {
  assert.equal(
    createChatAppearanceStyles({
      fontFamily: null,
      fontSize: null,
      fontWeight: null,
      messageDividers: false,
      messageSpacing: null,
    }),
    '',
  )
})

test('creates scoped chat appearance variable overrides', () => {
  assert.equal(
    createChatAppearanceStyles({
      fontFamily: null,
      fontSize: 16,
      fontWeight: null,
      messageDividers: false,
      messageSpacing: 6,
    }),
    [
      '#channel-chatroom {',
      '  --chatroom-font-size: 16px;',
      '  --chatroom-message-spacing: 6px;',
      '}',
    ].join('\n'),
  )
})

test('can override either chat appearance value independently', () => {
  const cases = [
    {
      declaration: '--chatroom-font-size: 16px;',
      fontSize: 16,
      messageSpacing: null,
    },
    {
      declaration: '--chatroom-message-spacing: 2px;',
      fontSize: null,
      messageSpacing: 2,
    },
  ]

  for (const { declaration, fontSize, messageSpacing } of cases) {
    assert.equal(
      createChatAppearanceStyles({
        fontFamily: null,
        fontSize,
        fontWeight: null,
        messageDividers: false,
        messageSpacing,
      }),
      ['#channel-chatroom {', `  ${declaration}`, '}'].join('\n'),
    )
  }
})

test('adds message dividers with measured emotes and full-row hover', () => {
  assert.equal(
    createChatAppearanceStyles({
      fontFamily: null,
      fontSize: null,
      fontWeight: null,
      messageDividers: true,
      messageSpacing: null,
    }),
    [
      '#chatroom-messages > div > [data-index] [data-emote-id] {',
      '  height: calc(var(--chatroom-font-size)*28/13);',
      '}',
      '',
      '#chatroom-messages > div > [data-index]::before {',
      '  position: absolute;',
      '  inset: 0;',
      '  pointer-events: none;',
      '  content: "";',
      '}',
      '',
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
      '',
      '@media (hover: hover) {',
      '  #chatroom-messages > div > [data-index]:hover::before {',
      '    background: var(--neon-surface-highest, #232629);',
      '  }',
      '',
      '  #chatroom-messages > div > [data-index] [class~="betterhover:group-hover:bg-surface-highest"] {',
      '    background: transparent !important;',
      '    border-radius: 0;',
      '  }',
      '}',
    ].join('\n'),
  )
})

test('uses a fixed safe stack for a selected chat font', () => {
  assert.equal(
    createChatAppearanceStyles({
      fontFamily: 'trebuchet',
      fontSize: null,
      fontWeight: null,
      messageDividers: false,
      messageSpacing: null,
    }),
    [
      '#channel-chatroom {',
      '  font-family: "Trebuchet MS", Arial, sans-serif;',
      '}',
    ].join('\n'),
  )
})

test('changes message weight without changing chat metadata', () => {
  assert.equal(
    createChatAppearanceStyles({
      fontFamily: null,
      fontSize: null,
      fontWeight: 600,
      messageDividers: false,
      messageSpacing: null,
    }),
    [
      '#chatroom-messages > div > [data-index] .font-normal[class~="leading-[1.55]"] {',
      '  font-weight: 600;',
      '}',
    ].join('\n'),
  )
})
