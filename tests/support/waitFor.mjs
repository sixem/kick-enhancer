export async function waitFor(predicate, description, maximumAttempts = 25) {
  for (let attempt = 0; attempt < maximumAttempts; attempt += 1) {
    const result = predicate()

    if (result) {
      return result
    }

    await Promise.resolve()
  }

  throw new Error(`Timed out waiting for ${description}.`)
}
