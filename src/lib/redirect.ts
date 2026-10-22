const LINK_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

export function isValidLinkId(id: string): boolean {
  return LINK_ID_PATTERN.test(id);
}

/**
 * Returns the parsed URL only if it is https, has no embedded credentials and
 * its hostname exactly matches an allow-listed host. Anything else is null, so
 * callers can never redirect to an unvetted destination.
 */
export function safeDestination(raw: string, allowedHosts: readonly string[]): URL | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username !== "" || url.password !== "") return null;
  const host = url.hostname.toLowerCase();
  return allowedHosts.some((allowed) => allowed.toLowerCase() === host) ? url : null;
}
