/**
 * Structured error logging for server-side errors.
 * In production this outputs to the platform logs (Vercel).
 */
export function logError(
  context: string,
  error: unknown,
  meta?: Record<string, unknown>
) {
  console.error(`[${context}]`, {
    error:
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : String(error),
    timestamp: new Date().toISOString(),
    ...meta,
  });
}
