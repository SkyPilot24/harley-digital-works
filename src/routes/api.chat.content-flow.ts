import { createFileRoute } from "@tanstack/react-router";
import { execSync } from "node:child_process";

const AGENT_PROJECT = "gen-app-agent-building";
const AGENT_LOCATION = "us-central1";
const AGENT_ID = "7dd3a3db-7c9e-436d-ba19-776c76de10a7";

function getGoogleAccessToken(): string | null {
  try {
    const token = execSync("gcloud auth application-default print-access-token", {
      encoding: "utf8",
      timeout: 4000,
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    return token || null;
  } catch {
    return null;
  }
}

async function callContentFlowAgent(prompt: string, sessionId: string, token: string) {
  const url = `https://${AGENT_LOCATION}-dialogflow.googleapis.com/v3/projects/${AGENT_PROJECT}/locations/${AGENT_LOCATION}/agents/${AGENT_ID}/sessions/${sessionId}:detectIntent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-goog-user-project": AGENT_PROJECT,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      queryInput: {
        text: { text: prompt },
        languageCode: "en",
      },
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as {
    queryResult?: {
      responseMessages?: Array<{ text?: { text?: string[] } }>;
      parameters?: { execution_summary?: string };
    };
  };

  const texts = data?.queryResult?.responseMessages
    ?.flatMap((m) => m.text?.text || [])
    .filter(Boolean);

  if (texts && texts.length > 0) {
    return texts.join("\n\n");
  }

  if (data?.queryResult?.parameters?.execution_summary) {
    return data.queryResult.parameters.execution_summary;
  }

  return null;
}

export const Route = createFileRoute("/api/chat/content-flow")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { prompt?: string };
          const userPrompt = body.prompt?.trim();

          if (!userPrompt) {
            return new Response(JSON.stringify({ error: "Job details are required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const token = getGoogleAccessToken();
          const sessionId = `cf-${Date.now()}`;

          if (token) {
            const agentReply = await callContentFlowAgent(userPrompt, sessionId, token);
            if (agentReply) {
              return new Response(
                JSON.stringify({
                  result: agentReply,
                  source: "google_agent_builder",
                }),
                {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                },
              );
            }
          }

          // Fallback template generator with all 4 assets if Google token drops
          const fallbackReply = `### Asset 1: Google Business Profile Post\n\nRecent project completed by our team: ${userPrompt}. Work was carried out in full compliance with UK regulations, with zero disruption to the household and certified building control documentation issued promptly.\n\nFor professional domestic and commercial services across your local area, contact our team today on 01632 960000.\n\n### Asset 2: Website Case Study Card\n\n- **The Problem:** Outdated installation failing to meet modern safety requirements and current UK building standards.\n- **Technical Workmanship Solution:** Completed comprehensive upgrade and precision testing according to trade regulations.\n- **Building Control / Industry Certification:** Official safety certification and compliance paperwork issued.\n- **Project Value / Outcome:** Clean, fully certified installation delivered on schedule with complete peace of mind.\n\n### Asset 3: WhatsApp Review Request\n\nHi! Thank you for choosing us for your recent project. We hope you're delighted with the workmanship. If you have 30 seconds, would you mind leaving us a quick Google review here: [Insert Review Link]? It really helps our local family business. Thanks again!\n\n### Asset 4: Homeowner Safety & Maintenance Tip\n\nRegular check-in: We recommend testing your safety switches every six months by pressing the test button to ensure all circuits trip safely in an emergency.`;

          return new Response(
            JSON.stringify({
              result: fallbackReply,
              source: "local_template_engine",
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (err) {
          return new Response(
            JSON.stringify({
              error: err instanceof Error ? err.message : "Content engine error",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
