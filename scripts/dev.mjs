import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const host = '127.0.0.1'
const port = 5173
const files = new Map([
  [
    '/kick-enhancer.dev.user.js',
    resolve(root, 'scripts/kick-enhancer.dev.user.js'),
  ],
  ['/kick-enhancer.user.js', resolve(root, '.dev/kick-enhancer.user.js')],
])

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? '/', `http://${host}:${port}`)
    .pathname
  const file = files.get(pathname)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Cache-Control', 'no-store')

  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }

  try {
    const source = await readFile(file)
    response.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
    })
    response.end(source)
  } catch (error) {
    const buildPending =
      pathname === '/kick-enhancer.user.js' &&
      error instanceof Error &&
      'code' in error &&
      error.code === 'ENOENT'

    response.writeHead(buildPending ? 503 : 500, {
      'Content-Type': 'text/plain; charset=utf-8',
    })
    response.end(buildPending ? 'Build not ready' : 'Unable to read userscript')
  }
})

const vitePath = resolve(root, 'node_modules/vite/bin/vite.js')
const watcher = spawn(
  process.execPath,
  [vitePath, 'build', '--watch', '--mode', 'development'],
  {
    cwd: root,
    stdio: 'inherit',
  },
)

server.listen(port, host, () => {
  console.log(
    `\nInstall the development loader once:\nhttp://localhost:${port}/kick-enhancer.dev.user.js\n`,
  )
})

watcher.on('exit', (code, signal) => {
  if (signal) {
    return
  }

  server.close()
  process.exitCode = code ?? 1
})

function stop(signal) {
  watcher.kill(signal)
  server.close()
}

process.once('SIGINT', () => stop('SIGINT'))
process.once('SIGTERM', () => stop('SIGTERM'))
