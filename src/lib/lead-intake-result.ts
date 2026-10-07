export function checkIntakeResult(value: unknown): "saved" | "duplicate" {
  if (value === "rate_limited") {
    throw new Response("Too many requests. Please try again later.", { status: 429 });
  }
  if (value === "too_fast") {
    throw new Response("Please wait before trying again.", { status: 429 });
  }
  if (value !== "saved" && value !== "duplicate") throw new Error("Lead submission failed.");
  return value;
}

export function trustedIntakeIp(headers: Headers): string {
  // Cloudflare overwrites this header at its public edge. Never trust forwarded
  // headers on a directly exposed origin. Local acceptance uses one shared bucket.
  return headers.get("cf-connecting-ip") || "unknown";
}

export function assertIntakeBackend(serverUrl: string | undefined, browserUrl: string | undefined) {
  if (!serverUrl || !browserUrl || new URL(serverUrl).origin !== new URL(browserUrl).origin) {
    throw new Error("Enquiry backend configuration is missing or inconsistent.");
  }
}
