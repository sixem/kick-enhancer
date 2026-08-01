import { readFileSync } from 'node:fs'

import preact from '@preact/preset-vite'
import { defineConfig, type Plugin } from 'vite'
import monkey from 'vite-plugin-monkey'

const PROJECT_URL = 'https://github.com/sixem/kick-enhancer'
const RELEASE_BASE_URL =
  'https://raw.githubusercontent.com/sixem/kick-enhancer/main/dist'
const GREASY_FORK_PREACT_BASE_URL =
  'https://cdn.jsdelivr.net/npm/preact@10.29.7'
const USERSCRIPT_ICON = `data:image/png;base64,${readFileSync(
  new URL('./src/assets/userscript-icon.png', import.meta.url),
  'base64',
)}`
const USERSCRIPT_DESCRIPTION =
  'Enhances KICK with viewer counts, stream uptime, content controls, and direct clip downloads.'

export default defineConfig(({ mode }) => {
  const development = mode === 'development'
  const greasyFork = mode === 'greasyfork'
  const readableBuild = development || greasyFork

  return {
    build: {
      cssMinify: readableBuild ? false : 'lightningcss',
      minify: readableBuild ? false : 'oxc',
      outDir: greasyFork ? 'dist/greasyfork' : 'dist',
    },
    plugins: [
      preact(),
      ...(greasyFork ? [readableInlineWorkerPlugin()] : []),
      monkey({
        entry: 'src/main.ts',
        generate: ({ userscript, mode: outputMode }) => {
          if (development || outputMode !== 'build') {
            return userscript
          }

          return `${userscript}\n\n${createThirdPartyLicenseNotices()}`
        },
        userscript: {
          name: 'KICK Enhancer',
          namespace: 'kick-enhancer/userscript',
          author: 'emy',
          description: USERSCRIPT_DESCRIPTION,
          icon: USERSCRIPT_ICON,
          homepageURL: PROJECT_URL,
          source: PROJECT_URL,
          supportURL: `${PROJECT_URL}/issues`,
          ...(greasyFork
            ? {}
            : {
                downloadURL: `${RELEASE_BASE_URL}/kick-enhancer.user.js`,
                updateURL: `${RELEASE_BASE_URL}/kick-enhancer.meta.js`,
              }),
          match: ['https://kick.com/*'],
          'run-at': 'document-start',
          noframes: true,
          grant: ['GM.getValue', 'GM.setValue', 'unsafeWindow'],
        },
        build: {
          fileName: 'kick-enhancer.user.js',
          metaFileName: greasyFork ? false : true,
          autoGrant: false,
          externalGlobals: greasyFork
            ? {
                preact: [
                  'preact',
                  `${GREASY_FORK_PREACT_BASE_URL}/dist/preact.umd.js`,
                ],
                'preact/hooks': [
                  'preactHooks',
                  `${GREASY_FORK_PREACT_BASE_URL}/hooks/dist/hooks.umd.js`,
                ],
                'preact/compat': [
                  'preactCompat',
                  `${GREASY_FORK_PREACT_BASE_URL}/compat/dist/compat.umd.js`,
                ],
                'preact/jsx-runtime': [
                  'jsxRuntime',
                  `${GREASY_FORK_PREACT_BASE_URL}/jsx-runtime/dist/jsxRuntime.umd.js`,
                ],
              }
            : {},
        },
      }),
    ],
  }
})

function readableInlineWorkerPlugin(): Plugin {
  return {
    name: 'kick-enhancer:readable-inline-worker',
    enforce: 'post',
    transform(code, id) {
      if (!id.includes('?worker&inline')) {
        return
      }

      const marker = 'const jsContent = '
      const assignmentStart = code.indexOf(marker)

      if (assignmentStart === -1) {
        throw new Error(`Unable to find the inline worker source in ${id}.`)
      }

      const valueStart = assignmentStart + marker.length
      const valueEnd = findStringLiteralEnd(code, valueStart)
      const serializedSource = code.slice(valueStart, valueEnd + 1)
      let workerSource: unknown

      try {
        workerSource = JSON.parse(escapeJsonControlCharacters(serializedSource))
      } catch (error) {
        throw new Error(
          `Unable to decode the inline worker source in ${id}: ${JSON.stringify(
            serializedSource.slice(0, 80),
          )}`,
          { cause: error },
        )
      }

      if (typeof workerSource !== 'string') {
        throw new Error(`The inline worker source in ${id} is not a string.`)
      }

      return {
        code:
          code.slice(0, valueStart) +
          createReadableTemplateLiteral(workerSource) +
          code.slice(valueEnd + 1),
        map: null,
      }
    },
  }
}

function findStringLiteralEnd(code: string, start: number) {
  if (code[start] !== '"') {
    throw new Error('The inline worker source is not JSON encoded.')
  }

  let escaped = false

  for (let index = start + 1; index < code.length; index += 1) {
    const character = code[index]

    if (escaped) {
      escaped = false
    } else if (character === '\\') {
      escaped = true
    } else if (character === '"') {
      return index
    }
  }

  throw new Error('The inline worker source is unterminated.')
}

function escapeJsonControlCharacters(value: string) {
  // eslint-disable-next-line no-control-regex -- These are the characters being escaped.
  return value.replace(/[\u0000-\u001f]/g, (character) =>
    JSON.stringify(character).slice(1, -1),
  )
}

function createReadableTemplateLiteral(source: string) {
  return `\`${source
    .replaceAll('\\', '\\\\')
    .replaceAll('`', '\\`')
    .replaceAll('${', '\\${')}\``
}

function createThirdPartyLicenseNotices() {
  const dependencies = [
    {
      license: readFileSync(
        new URL('./node_modules/preact/LICENSE', import.meta.url),
        'utf8',
      ).trim(),
      name: 'Preact',
      source: 'https://github.com/preactjs/preact',
      version: readPackageVersion('preact'),
    },
    {
      license: readFileSync(
        new URL('./node_modules/mux.js/LICENSE', import.meta.url),
        'utf8',
      ).trim(),
      name: 'mux.js',
      source: 'https://github.com/videojs/mux.js',
      version: readPackageVersion('mux.js'),
    },
  ]
  const text = dependencies
    .map(
      ({ license, name, source, version }) =>
        `${name} ${version}\nSource: ${source}\n\n${license}`,
    )
    .join('\n\n---\n\n')

  return `/*!\n${text
    .split('\n')
    .map((line) => (line ? ` * ${line}` : ' *'))
    .join('\n')}\n */`
}

function readPackageVersion(packageName: 'mux.js' | 'preact') {
  const metadata = JSON.parse(
    readFileSync(
      new URL(`./node_modules/${packageName}/package.json`, import.meta.url),
      'utf8',
    ),
  ) as { version?: unknown }

  if (typeof metadata.version !== 'string') {
    throw new Error(`Unable to read ${packageName} version.`)
  }

  return metadata.version
}
