import { readFileSync } from 'node:fs'

import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

const PROJECT_URL = 'https://github.com/sixem/kick-enhancer'
const RELEASE_BASE_URL =
  'https://raw.githubusercontent.com/sixem/kick-enhancer/main/dist'
const USERSCRIPT_ICON = `data:image/png;base64,${readFileSync(
  new URL('./src/assets/userscript-icon.png', import.meta.url),
  'base64',
)}`

export default defineConfig(({ mode }) => {
  const development = mode === 'development'

  return {
    build: {
      cssMinify: development ? false : 'lightningcss',
      minify: development ? false : 'oxc',
    },
    plugins: [
      preact(),
      monkey({
        entry: 'src/main.ts',
        userscript: {
          name: 'KICK Enhancer',
          namespace: 'kick-enhancer/userscript',
          author: 'emy',
          description: 'A lightweight, customizable enhancement layer for KICK.',
          icon: USERSCRIPT_ICON,
          homepageURL: PROJECT_URL,
          source: PROJECT_URL,
          supportURL: `${PROJECT_URL}/issues`,
          downloadURL: `${RELEASE_BASE_URL}/kick-enhancer.user.js`,
          updateURL: `${RELEASE_BASE_URL}/kick-enhancer.meta.js`,
          match: ['https://kick.com/*'],
          'run-at': 'document-start',
          noframes: true,
          grant: ['GM.getValue', 'GM.setValue', 'unsafeWindow'],
        },
        build: {
          fileName: 'kick-enhancer.user.js',
          metaFileName: true,
          autoGrant: false,
        },
      }),
    ],
  }
})
