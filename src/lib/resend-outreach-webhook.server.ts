import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

const DEFAULT_MAX_BODY_BYTES = 131_072;
const DEFAULT_TIMESTAMP_TOLERANCE_SECONDS = 300;

const providerEventSchema = z
  .object({
    type: z.enum([
      "email.sent",
      "email.delivered",
      "email.bounced",
      "email.complained",
      "email.failed",
      "email.suppressed",
    ]),
    created_at: z.string().datetime({ offset: true }),
    data: z
      .object({
        email_id: z.string().uuid(),
      })
      .passthrough(),
  })
  .passthrough();

type ProviderEvent = z.infer<typeof providerEventSchema>;
type StoredResult = "recorded" | "duplicate" | "ignored";

type CrmWebhookRpc = {
  rpc: (
    functionName: "record_resend_outreach_webhook_event",
    args: {
      p_provider_event_id: string;
      p_provider_email_id: string;
      p_provider_event_type: ProviderEvent["type"];
      p_occurred_at: string;
    },
  ) => Promise<{
    data: StoredResult | null;
    error: { code?: string; message: string } | null;
  }>;
};

export type ResendWebhookOptions = {
  enabled: boolean;
  signingSecret?: string;
  record: (event: { svixId: string; payload: ProviderEvent }) => ReturnType<CrmWebhookRpc["rpc"]>;
  maxBodyBytes?: number;
  timestampToleranceSeconds?: number;
  now?: () => number;
};

/**
 * Server entry point. The service-role client is dynamically loaded only after
 * signature and payload validation, so unsigned requests never reach Supabase.
 */
export async function configuredResendOutreachWebhook(request: Request): Promise<Response> {
  return receiveResendOutreachWebhook(request, {
    enabled: process.env.RESEND_WEBHOOK_ENABLED === "true",
    signingSecret: process.env.RESEND_WEBHOOK_SIGNING_SECRET,
    record: async (event) => {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const db = supabaseAdmin as unknown as CrmWebhookRpc;
      return db.rpc("record_resend_outreach_webhook_event", {
        p_provider_event_id: event.svixId,
        p_provider_email_id: event.payload.data.email_id,
        p_provider_event_type: event.payload.type,
        p_occurred_at: event.payload.created_at,
      });
    },
  });
}

/**
 * Verifies and accepts only the Resend events handled by the outreach CRM
 * recorder. The recorder must perform persistent svix-id deduplication and the
 * atomic suppression/state transition described in the accompanying migration.
 */
export async function receiveResendOutreachWebhook(
  request: Request,
  options: ResendWebhookOptions,
): Promise<Response> {
  const respond = (status: number, result: string, allowPost = false) =>
    Response.json(
      { result },
      {
        status,
        headers: {
          "Cache-Control": "no-store",
          ...(allowPost ? { Allow: "POST" } : {}),
        },
      },
    );

  if (request.method !== "POST") return respond(405, "method_not_allowed", true);
  if (!options.enabled || !options.signingSecret) return respond(503, "unconfigured");

  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");
  if (
    !svixId ||
    !svixTimestamp ||
    !svixSignature ||
    svixId.length > 255 ||
    svixTimestamp.length > 32 ||
    svixSignature.length > 4096
  ) {
    return respond(400, "invalid_request");
  }

  const rawBody = await readBoundedUtf8Body(
    request,
    options.maxBodyBytes ?? DEFAULT_MAX_BODY_BYTES,
  );
  if (rawBody === null) return respond(400, "invalid_request");
  if (rawBody === "__payload_too_large__") return respond(413, "payload_too_large");

  if (
    !hasValidSvixSignature({
      rawBody,
      svixId,
      svixTimestamp,
      svixSignature,
      signingSecret: options.signingSecret,
      now: options.now ?? Date.now,
      timestampToleranceSeconds:
        options.timestampToleranceSeconds ?? DEFAULT_TIMESTAMP_TOLERANCE_SECONDS,
    })
  ) {
    return respond(400, "invalid_signature_or_payload");
  }

  let payload: ProviderEvent;
  try {
    payload = providerEventSchema.parse(JSON.parse(rawBody));
  } catch {
    return respond(400, "invalid_signature_or_payload");
  }

  let recorded: Awaited<ReturnType<CrmWebhookRpc["rpc"]>>;
  try {
    recorded = await options.record({ svixId, payload });
  } catch {
    console.error("[Outreach webhook] verified event recorder threw", {
      providerEventType: payload.type,
      svixId,
    });
    return respond(503, "persistence_unavailable");
  }

  const { data: result, error } = recorded;
  if (error || !isStoredResult(result)) {
    // Return a retryable response without exposing provider, database or PII details.
    console.error("[Outreach webhook] verified event could not be recorded", {
      providerEventType: payload.type,
      svixId,
      errorCode: error?.code,
    });
    return respond(503, "persistence_unavailable");
  }

  // `ignored` acknowledges valid events for non-outreach sends; no retry needed.
  return respond(200, result);
}

export function hasValidSvixSignature({
  rawBody,
  svixId,
  svixTimestamp,
  svixSignature,
  signingSecret,
  now = Date.now,
  timestampToleranceSeconds = DEFAULT_TIMESTAMP_TOLERANCE_SECONDS,
}: {
  rawBody: string;
  svixId: string;
  svixTimestamp: string;
  svixSignature: string;
  signingSecret: string;
  now?: () => number;
  timestampToleranceSeconds?: number;
}): boolean {
  if (!signingSecret.startsWith("whsec_") || timestampToleranceSeconds < 0) return false;
  if (!/^\d{1,13}$/.test(svixTimestamp)) return false;

  const timestampSeconds = Number(svixTimestamp);
  if (!Number.isSafeInteger(timestampSeconds)) return false;
  if (Math.abs(Math.floor(now() / 1000) - timestampSeconds) > timestampToleranceSeconds)
    return false;

  let secretBytes: Buffer;
  try {
    secretBytes = Buffer.from(signingSecret.slice("whsec_".length), "base64");
  } catch {
    return false;
  }
  if (secretBytes.length === 0) return false;

  const expected = createHmac("sha256", secretBytes)
    .update(`${svixId}.${svixTimestamp}.${rawBody}`)
    .digest();

  let match = false;
  for (const part of svixSignature.split(/\s+/)) {
    const [version, encodedSignature, ...unexpected] = part.split(",");
    if (version !== "v1" || !encodedSignature || unexpected.length !== 0) continue;

    let received: Buffer;
    try {
      received = Buffer.from(encodedSignature, "base64");
    } catch {
      continue;
    }
    if (received.length === expected.length && timingSafeEqual(received, expected)) match = true;
  }
  return match;
}

function isStoredResult(value: unknown): value is StoredResult {
  return value === "recorded" || value === "duplicate" || value === "ignored";
}

async function readBoundedUtf8Body(
  request: Request,
  maxBytes: number,
): Promise<string | null | "__payload_too_large__"> {
  if (!Number.isSafeInteger(maxBytes) || maxBytes < 1) return null;

  const reader = request.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        return "__payload_too_large__";
      }
      chunks.push(value);
    }
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}
