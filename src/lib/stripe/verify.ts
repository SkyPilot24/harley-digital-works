/**
 * Stripe Webhook Signature Verification
 * Uses Web Crypto API (HMAC-SHA256) compatible with Cloudflare Workers and Node.js.
 * Verifies standard Stripe-Signature header: t=timestamp,v1=signature
 */

export async function verifyStripeSignature(options: {
  webhookSecret: string;
  signatureHeader: string | null;
  rawBody: string;
  toleranceInSeconds?: number;
  nowInSeconds?: number;
}): Promise<{ valid: boolean; reason?: string }> {
  const { webhookSecret, signatureHeader, rawBody, toleranceInSeconds = 300 } = options;

  if (!webhookSecret) {
    return { valid: false, reason: "Missing STRIPE_WEBHOOK_SECRET." };
  }

  if (!signatureHeader) {
    return { valid: false, reason: "Missing Stripe-Signature header." };
  }

  // Parse Stripe-Signature header components: t=timestamp, v1=signature (can be multiple v1)
  const items = signatureHeader.split(",");
  let timestamp: number | null = null;
  const signatures: string[] = [];

  for (const item of items) {
    const [key, val] = item.trim().split("=");
    if (!key || !val) continue;
    if (key === "t") {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        timestamp = parsed;
      }
    } else if (key === "v1") {
      signatures.push(val);
    }
  }

  if (timestamp === null || signatures.length === 0) {
    return { valid: false, reason: "Malformed Stripe-Signature header." };
  }

  const now = options.nowInSeconds ?? Math.floor(Date.now() / 1000);

  // Replay attack tolerance check
  if (Math.abs(now - timestamp) > toleranceInSeconds) {
    return { valid: false, reason: "Signature timestamp outside tolerance window." };
  }

  // Stripe signature payload: `${timestamp}.${rawBody}`
  const signaturePayload = `${timestamp}.${rawBody}`;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(signaturePayload));
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const calculatedHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // Check if any v1 signature matches the computed HMAC
  const matches = signatures.some((sig) => timingSafeEqual(sig, calculatedHex));

  if (!matches) {
    return { valid: false, reason: "Signature mismatch." };
  }

  return { valid: true };
}

/**
 * Constant-time comparison function to mitigate timing attacks
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

/**
 * Helper to generate a valid Stripe-Signature header for tests
 */
export async function generateTestStripeSignature(
  webhookSecret: string,
  rawBody: string,
  timestamp?: number,
): Promise<string> {
  const t = timestamp ?? Math.floor(Date.now() / 1000);
  const payload = `${t}.${rawBody}`;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return `t=${t},v1=${hex}`;
}
