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

export async function createRequestFingerprint(ip: string, secretOverride?: string) {
  const secret = secretOverride || process.env.LEAD_RATE_LIMIT_SECRET;
  if (!secret) throw new Error("Lead rate-limit secret is not configured.");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export async function verifyTurnstileToken(
  token: string | undefined,
  ip?: string,
): Promise<boolean> {
  const isEnabled = process.env.TURNSTILE_ENABLED === "true";
  if (!isEnabled) {
    return true;
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured.");
  }

  if (!token || !token.trim()) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip && ip !== "unknown") {
      formData.append("remoteip", ip);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) {
      return false;
    }

    const body = (await response.json()) as { success: boolean };
    return Boolean(body.success);
  } catch (err) {
    console.error("Turnstile siteverify error:", err);
    return false;
  }
}
