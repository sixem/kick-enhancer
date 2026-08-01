import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const modernJavaScriptRules = {
  'no-var': 'error',
  'object-shorthand': ['error', 'always'],
  'prefer-arrow-callback': 'error',
  'prefer-const': 'error',
  'prefer-exponentiation-operator': 'error',
  'prefer-object-spread': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
}

export default defineConfig(
  {
    ignores: ['.dev/**', 'dist/**', 'HTML/**', 'references/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: modernJavaScriptRules,
  },
  {
    files: ['scripts/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['scripts/kick-enhancer.dev.user.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        GM_xmlhttpRequest: 'readonly',
      },
    },
  },
  {
    files: ['tests/**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'vite.config.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...modernJavaScriptRules,
      '@typescript-eslint/require-await': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['src/features/clipDownloads/download.worker.ts'],
    languageOptions: {
      globals: globals.worker,
    },
  },
  {
    files: ['vite.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
)
