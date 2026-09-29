export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  // Safe window-level diagnostic logging
  console.error("[Stradmont App Error]", {
    message,
    stack,
    route: window.location.pathname,
    ...context,
  });
}
