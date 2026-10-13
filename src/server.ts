import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function applySecurityHeaders(response: Response, isHttps: boolean): Response {
  const headers = new Headers(response.headers);
  if (!headers.has("X-Frame-Options")) {
    headers.set("X-Frame-Options", "SAMEORIGIN");
  }
  if (!headers.has("X-Content-Type-Options")) {
    headers.set("X-Content-Type-Options", "nosniff");
  }
  if (!headers.has("Referrer-Policy")) {
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }
  if (!headers.has("Permissions-Policy")) {
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  }
  if (isHttps && !headers.has("Strict-Transport-Security")) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // Propagate worker environment bindings to process.env if present
      if (env && typeof env === "object") {
        for (const [key, value] of Object.entries(env)) {
          if (typeof value === "string" && process.env[key] === undefined) {
            process.env[key] = value;
          }
        }
      }

      const url = new URL(request.url);
      const host = url.hostname.toLowerCase();
      const isHttps = url.protocol === "https:";

      // Intercept Slack interactive actions, slash commands, and event callbacks
      if (url.pathname.startsWith("/api/slack/")) {
        const { handleSlackIncomingRequest } = await import("./lib/slack/server-handler");
        const slackResponse = await handleSlackIncomingRequest(request, url.pathname);
        if (slackResponse) {
          return applySecurityHeaders(slackResponse, isHttps);
        }
      }

      // Intercept Stripe payment webhooks
      if (url.pathname === "/api/stripe/webhook" || url.pathname === "/api/webhooks/stripe") {
        const { handleStripeIncomingRequest } = await import("./lib/stripe/server-handler");
        const stripeResponse = await handleStripeIncomingRequest(request, url.pathname);
        if (stripeResponse) {
          return applySecurityHeaders(stripeResponse, isHttps);
        }
      }

      // Multi-Tenant Host Routing: If visiting theharleygroup.org/ -> redirect to /the-harley-group
      if (
        [
          "theharleygroup.org",
          "www.theharleygroup.org",
          "theharleygroup.co.uk",
          "www.theharleygroup.co.uk",
        ].includes(host) &&
        (url.pathname === "/" || url.pathname === "")
      ) {
        return Response.redirect(`${url.origin}/the-harley-group`, 302);
      }

      const handler = await getServerEntry();
      const rawResponse = await handler.fetch(request, env, ctx);
      const normalizedResponse = await normalizeCatastrophicSsrResponse(rawResponse);
      return applySecurityHeaders(normalizedResponse, isHttps);
    } catch (error) {
      console.error(error);
      const errResponse = new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
      return applySecurityHeaders(errResponse, request.url.startsWith("https:"));
    }
  },
};
