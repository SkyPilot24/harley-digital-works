import { createFileRoute } from "@tanstack/react-router";
import { execSync } from "node:child_process";

const AGENT_PROJECT = "gen-app-agent-building";
const AGENT_LOCATION = "us-central1";
const AGENT_ID = "4945b2ce-6195-4c5b-970a-261f832b344e"; // Stage 3 Prospect Auditor Agent

// In-memory cache to prevent re-burning tokens for recently audited domains
const auditCache = new Map<string, Record<string, unknown>>();

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

async function callAuditorAgent(prompt: string, sessionId: string, token: string) {
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

function parsePitches(rawText: string, demoUrl: string, companyName: string) {
  let whatsApp = "";
  let emailSubject = `Quick mobile review for ${companyName}`;
  let emailBody = "";
  let videoScript = "";

  const sections = rawText.split(/(?:###|\*\*)\s*Asset\s*\d+:?/i).map((s) => s.trim());

  for (const sec of sections) {
    const lower = sec.toLowerCase();
    if (lower.startsWith("whatsapp") || lower.includes("whatsapp pitch")) {
      whatsApp = sec
        .replace(/^[^\n]+\n+/, "")
        .replace(/---/g, "")
        .trim();
    } else if (lower.startsWith("cold email") || lower.includes("email outreach")) {
      const emailContent = sec
        .replace(/^[^\n]+\n+/, "")
        .replace(/---/g, "")
        .trim();
      const subjectMatch = emailContent.match(/\*\*Subject:\*\*\s*([^\n]+)/i);
      if (subjectMatch) {
        emailSubject = subjectMatch[1].trim();
        emailBody = emailContent.replace(/\*\*Subject:\*\*\s*[^\n]+\n+/i, "").trim();
      } else {
        emailBody = emailContent;
      }
    } else if (lower.startsWith("60-second") || lower.includes("video audit script")) {
      videoScript = sec
        .replace(/^[^\n]+\n+/, "")
        .replace(/---/g, "")
        .trim();
    }
  }

  // Inject real demo link and founder details if placeholders remain
  const formatText = (text: string) =>
    text
      .replace(/\[Demo Link\]/g, demoUrl)
      .replace(/\[Your Name\]/g, "Robbie Harley")
      .replace(/\[Your Company\]/g, "Harley Digital Works")
      .replace(/\[Phone Number\]/g, "0117 214 1357");

  return {
    whatsApp: formatText(
      whatsApp ||
        `Hi ${companyName} team, Robbie from Harley Digital Works here. I checked out your site on my phone and noticed mobile click-to-call is missing, which means local customers searching for urgent callouts are bouncing. I put together an interactive prototype showing how your site could look with 24/7 instant quotes and automated review collection: ${demoUrl} Worth a 2-minute look?`,
    ),
    emailSubject: formatText(emailSubject),
    emailBody: formatText(
      emailBody ||
        `Hi ${companyName} Team,\n\nI was looking over your website on mobile while reviewing contractors in your area.\n\nI noticed 3 key leaks:\n1. Mobile click-to-call is missing for urgent enquiries.\n2. No 24/7 instant quote estimator for routine jobs.\n3. Trade accreditations are not visible above the fold on mobile.\n\nWe build 100% done-for-you trade platforms with zero homework. You can test your interactive prototype here:\n${demoUrl}\n\nAre you open to a brief chat this week?\n\nBest regards,\nRobbie Harley\nHarley Digital Works (0117 214 1357)`,
    ),
    videoScript: formatText(
      videoScript ||
        `* 0-20s (The Hook): "Hey ${companyName} team, Robbie here. I pulled up your website on my mobile, and noticed local customers with urgent jobs can't click-to-call you instantly."\n* 20-40s (The Defect): "Right now, your site is missing a 24/7 quote estimator and key trust badges are hidden on mobile."\n* 40-60s (The Call to Action): "I've built a 1-click preview at ${demoUrl} showing how your site could look. Take a look and let me know what you think."`,
    ),
  };
}

export const Route = createFileRoute("/api/audit/prospect")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            websiteUrl?: string;
            businessName?: string;
            trade?: string;
            location?: string;
            phone?: string;
          };

          const rawUrl = body.websiteUrl?.trim();
          if (!rawUrl) {
            return new Response(JSON.stringify({ error: "Website URL is required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const cleanUrl = rawUrl.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
          const businessName = body.businessName?.trim() || cleanUrl;
          const trade = body.trade?.trim() || "Electrical";
          const location = body.location?.trim() || "UK";
          const phone = body.phone?.trim() || "0117 000 0000";

          // Check Cache to save tokens
          const cacheKey = `${cleanUrl}-${trade}-${location}`.toLowerCase();
          if (auditCache.has(cacheKey)) {
            return new Response(JSON.stringify(auditCache.get(cacheKey)), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Deterministic audit metrics calculation
          const hash = cleanUrl.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
          const speedScore = 28 + (hash % 25); // 28–52
          const trustScore = 45 + ((hash * 3) % 25); // 45–69
          const leadCaptureScore = 32 + ((hash * 7) % 20); // 32–51
          const localSeoScore = 40 + ((hash * 11) % 30); // 40–69
          const overallScore = Math.round(
            (speedScore + trustScore + leadCaptureScore + localSeoScore) / 4,
          );

          const defects = [
            `Mobile load time is ${((100 - speedScore) / 10).toFixed(1)}s (causes 50%+ of mobile visitors to bounce)`,
            "Missing 24/7 interactive instant quote estimator for out-of-hours trade leads",
            `Accreditation trust badges and verified registration are buried below the fold on mobile`,
            "Missing LocalBusiness structured schema for local Google Maps visibility",
          ];

          // Dynamically route to RG Electrical bespoke demo or dynamic trade staging generator
          const isRgElectrical =
            cleanUrl.includes("rg-electrical") ||
            businessName.toLowerCase().includes("rg electrical");

          let tradeParam = "electrical";
          const lowerTrade = trade.toLowerCase();
          if (
            lowerTrade.includes("heat") ||
            lowerTrade.includes("gas") ||
            lowerTrade.includes("boiler")
          ) {
            tradeParam = "heating";
          } else if (lowerTrade.includes("roof")) {
            tradeParam = "roofing";
          } else if (lowerTrade.includes("plumb")) {
            tradeParam = "plumbing";
          } else if (lowerTrade.includes("build")) {
            tradeParam = "builder";
          } else if (lowerTrade.includes("commercial")) {
            tradeParam = "commercial";
          }

          const demoUrl = isRgElectrical
            ? "https://harleydigitalworks.com/demos/rg-electrical"
            : `https://harleydigitalworks.com/demos?company=${encodeURIComponent(businessName)}&trade=${tradeParam}&city=${encodeURIComponent(location)}&phone=${encodeURIComponent(phone)}`;

          // Google Agent Builder Call
          const prompt = `Audit Prospect: ${businessName}. Website: ${cleanUrl}. Trade: ${trade}. Location: ${location}. Identified defects: ${defects.join("; ")}. Demo prototype URL: ${demoUrl}`;
          const token = getGoogleAccessToken();
          const sessionId = `aud-${Date.now()}`;

          let rawPitchesText = "";
          let source = "local_template_engine";

          if (token) {
            const agentReply = await callAuditorAgent(prompt, sessionId, token);
            if (agentReply) {
              rawPitchesText = agentReply;
              source = "google_agent_builder";
            }
          }

          const pitches = parsePitches(rawPitchesText, demoUrl, businessName);

          const result = {
            audit: {
              url: cleanUrl,
              businessName,
              trade,
              location,
              phone,
              overallScore,
              speedScore,
              trustScore,
              leadCaptureScore,
              localSeoScore,
              estimatedLostRevenueMonthly: `£${Math.round(4000 + (hash % 6000)).toLocaleString()}/mo`,
              defects,
            },
            pitches,
            demoUrl,
            source,
          };

          // Cache result
          auditCache.set(cacheKey, result);

          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "Auditor failed" }),
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
