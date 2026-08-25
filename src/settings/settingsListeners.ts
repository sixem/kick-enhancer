export function notifySettingsListeners<Value>(
  listeners: Iterable<(value: Value) => void>,
  value: Value,
  onError: (error: unknown) => void,
) {
  for (const listener of listeners) {
    try {
      listener(value)
    } catch (error) {
      try {
        onError(error)
      } catch {
        // Error reporting must not interrupt the remaining listeners.
      }
    }
  }
}
