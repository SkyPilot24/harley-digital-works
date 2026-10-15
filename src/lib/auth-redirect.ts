export function safeAuthRedirect(value: unknown): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    Array.from(value).some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)
  )
    return "/admin";
  try {
    const url = new URL(value, "https://auth.invalid");
    if (url.origin !== "https://auth.invalid") return "/admin";
    return url.pathname + url.search + url.hash;
  } catch {
    return "/admin";
  }
}
