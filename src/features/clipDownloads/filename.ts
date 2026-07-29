const INVALID_FILENAME_CHARACTERS = /[\u0000-\u001f<>:"/\\|?*]/g
const RESERVED_WINDOWS_NAME =
  /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i
const MAX_BASENAME_LENGTH = 180

type FilenameMetadata = Readonly<{
  channel?: string
  clipId: string
  title?: string
}>

export function createDefaultBasename({
  channel,
  clipId,
  title,
}: FilenameMetadata) {
  const candidates = [
    channel && title ? `${channel} - ${title}` : undefined,
    title,
    channel ? `${channel} - ${clipId}` : undefined,
    clipId,
  ]

  for (const candidate of candidates) {
    if (!candidate) {
      continue
    }

    const sanitized = sanitizeBasename(candidate, clipId)

    if (sanitized) {
      return sanitized
    }
  }

  return clipId
}

export function sanitizeBasename(value: string, fallback: string) {
  let basename = value
    .replace(INVALID_FILENAME_CHARACTERS, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[ .]+$/g, '')

  if (basename.length > MAX_BASENAME_LENGTH) {
    basename = basename.slice(0, MAX_BASENAME_LENGTH).trimEnd()
  }

  if (RESERVED_WINDOWS_NAME.test(basename)) {
    basename = `${basename}_`
  }

  if (!basename) {
    basename = fallback
      .replace(INVALID_FILENAME_CHARACTERS, ' ')
      .trim()
  }

  return basename || 'kick-clip'
}

export function createMp4Filename(basename: string, fallback: string) {
  return `${sanitizeBasename(basename, fallback)}.mp4`
}
