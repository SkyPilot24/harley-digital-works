/**
 * Slack Request Signature Verification
 * Uses Web Crypto API (HMAC-SHA256) compatible with Cloudflare Workers and Node.js.
 */

export async function verifySlackSignature(options: {
  signingSecret?: string;
  signatureHeader?: string | null;
  timestampHeader?: string | null;
  rawBody: string;
  nowInSeconds?: number;
}): Promise<{ valid: boolean; reason?: string }> {
  const { signingSecret, signatureHeader, timestampHeader, rawBody } = options;

  if (!signingSecret) {
    return { valid: false, reason: "Missing SLACK_SIGNING_SECRET configuration." };
  }

  if (!signatureHeader || !timestampHeader) {
    return { valid: false, reason: "Missing X-Slack-Signature or X-Slack-Request-Timestamp." };
  }

  const timestamp = parseInt(timestampHeader, 10);
  if (isNaN(timestamp)) {
    return { valid: false, reason: "Invalid X-Slack-Request-Timestamp header." };
  }

  const now = options.nowInSeconds ?? Math.floor(Date.now() / 1000);
  // Replay attack prevention: reject requests older or newer than 5 minutes (300s)
  if (Math.abs(now - timestamp) > 300) {
    return { valid: false, reason: "Request timestamp out of bounds (replay protection)." };
  }

  const signatureBase = `v0:${timestamp}:${rawBody}`;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(signingSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(signatureBase));
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const calculatedHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  const expectedSignature = `v0=${calculatedHex}`;

  if (timingSafeEqual(signatureHeader, expectedSignature)) {
    return { valid: true };
  }

  return { valid: false, reason: "Signature mismatch." };
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
