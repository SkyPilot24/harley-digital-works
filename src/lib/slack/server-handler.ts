/**
 * Slack HTTP Server Request Handlers
 * Handles webhooks, interactive actions, slash commands, and URL challenge verification
 */

import { verifySlackSignature } from "./verify.ts";
import { handleSlackBlockAction } from "./actions.ts";
import { handleSlackCommand } from "./commands.ts";
import type { SlackInteractionPayload, SlackCommandPayload } from "./types.ts";

export async function handleSlackIncomingRequest(
  request: Request,
  path: string,
): Promise<Response | null> {
  // Only process routes under /api/slack/
  if (!path.startsWith("/api/slack/")) {
    return null;
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-slack-signature");
  const timestamp = request.headers.get("x-slack-request-timestamp");
  const signingSecret = process.env.SLACK_SIGNING_SECRET;

  // Signature verification (enforced when signing secret is configured)
  if (signingSecret) {
    const verified = await verifySlackSignature({
      signingSecret,
      signatureHeader: signature,
      timestampHeader: timestamp,
      rawBody,
    });

    if (!verified.valid) {
      console.warn("[Slack Request] Signature verification failed:", verified.reason);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
  }

  // 1. URL Challenge (Slack Events API URL Verification)
  if (path === "/api/slack/events") {
    try {
      const json = JSON.parse(rawBody);
      if (json.type === "url_verification") {
        return new Response(JSON.stringify({ challenge: json.challenge }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
    } catch {
      // not json, continue
    }
  }

  // 2. Interactive Block Actions (/api/slack/interactions)
  if (path === "/api/slack/interactions") {
    try {
      const params = new URLSearchParams(rawBody);
      const payloadString = params.get("payload");
      if (!payloadString) {
        return new Response(JSON.stringify({ error: "Missing payload parameter" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      const payload = JSON.parse(payloadString) as SlackInteractionPayload;
      const result = await handleSlackBlockAction(payload);

      return new Response(
        JSON.stringify({
          replace_original: result.replaceOriginal,
          text: result.text,
          blocks: result.blocks,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      );
    } catch (err) {
      console.error("[Slack Interactions] Handler error:", err);
      return new Response(JSON.stringify({ error: "Interaction processing failed" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  }

  // 3. Slash Commands (/api/slack/commands)
  if (path === "/api/slack/commands") {
    try {
      const params = new URLSearchParams(rawBody);
      const commandPayload: SlackCommandPayload = {
        command: params.get("command") || "/thg",
        text: params.get("text") || "",
        user_id: params.get("user_id") || "",
        user_name: params.get("user_name") || "",
        channel_id: params.get("channel_id") || "",
        channel_name: params.get("channel_name") || "",
        response_url: params.get("response_url") || undefined,
        trigger_id: params.get("trigger_id") || undefined,
      };

      const result = await handleSlackCommand(commandPayload);

      return new Response(
        JSON.stringify({
          response_type: "in_channel",
          text: result.text,
          blocks: result.blocks,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      );
    } catch (err) {
      console.error("[Slack Commands] Handler error:", err);
      return new Response(JSON.stringify({ error: "Command processing failed" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  }

  return new Response("Not found", { status: 404 });
}
