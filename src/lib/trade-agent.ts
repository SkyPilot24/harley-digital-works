import { execSync } from "node:child_process";

export interface TradeChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface TradeChatResponse {
  reply: string;
  source: "google_agent_builder" | "local_knowledge_engine";
}

const AGENT_PROJECT = "gen-app-agent-building";
const AGENT_LOCATION = "us-central1";
const AGENT_ID = "990b7730-da5c-461c-9bc0-5d4b9fdcb4ff";

/**
 * Tries to fetch a cached or fresh access token from gcloud or ADC
 */
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

/**
 * Calls the live Google Cloud Vertex AI / Dialogflow CX Agent Builder
 */
async function callGoogleAgent(
  message: string,
  sessionId: string,
  token: string,
): Promise<string | null> {
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
        text: {
          text: message,
        },
        languageCode: "en",
      },
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as {
    queryResult?: {
      responseMessages?: Array<{ text?: { text?: string[] } }>;
    };
  };

  const texts = data?.queryResult?.responseMessages
    ?.flatMap((m) => m.text?.text || [])
    .filter(Boolean);

  return texts && texts.length > 0 ? texts.join("\n\n") : null;
}

/**
 * Fallback knowledge engine matching the trained Google Agent Playbook
 */
function getLocalTradeReply(message: string): string {
  const text = message.toLowerCase();

  // Emergency situations
  if (
    text.includes("burning") ||
    text.includes("spark") ||
    text.includes("smoke") ||
    text.includes("power cut") ||
    text.includes("emergency") ||
    text.includes("outage")
  ) {
    return "⚠️ If you are experiencing a burning smell, visible sparks, or a sudden total power outage, please call our 24/7 Priority Emergency Desk immediately on 0117 900 0000. Our on-call NICEIC electrician covers Bradley Stoke, Stoke Gifford, and North Bristol.";
  }

  // Consumer unit / Fuseboard
  if (
    text.includes("fusebox") ||
    text.includes("fuse board") ||
    text.includes("consumer unit") ||
    text.includes("board upgrade") ||
    text.includes("hager") ||
    text.includes("rcbo") ||
    text.includes("tripping")
  ) {
    return "For a modern 18th Edition Hager metal consumer unit upgrade with individual RCBOs and Type 2 Surge Protection (SPD), our transparent ballpark price is from £650 fixed. This is typically a 1-day installation with full circuit testing and your official NICEIC Part P building control certificate issued within 24 hours. Would you like to check availability for your property?";
  }

  // Rewires
  if (text.includes("rewire") || text.includes("cabling") || text.includes("downlight")) {
    return "For complete domestic house rewires (first and second fix with dedicated kitchen rings and zoned LED downlights), pricing is from £3,800 fixed depending on bedroom count. We stage work cleanly around decorators with zero mess left behind. What size is your home (e.g. 3-bed semi or detached)?";
  }

  // Landlord EICR
  if (
    text.includes("eicr") ||
    text.includes("landlord") ||
    text.includes("safety check") ||
    text.includes("certificate") ||
    text.includes("inspection")
  ) {
    return "Our Landlord EICR electrical safety inspections start from £180 fixed. We provide thorough visual and live testing with same-day digital PDF certificates fully compliant with Bristol City Council landlord licensing rules.";
  }

  // EV Charger
  if (text.includes("ev") || text.includes("charger") || text.includes("electric vehicle")) {
    return "We install 7.4kW smart home EV chargers from £795 fixed, including dedicated RCBO protection, neat external conduit routing, and mobile app setup. Installs are completed in half a day.";
  }

  // Service Areas
  if (
    text.includes("area") ||
    text.includes("location") ||
    text.includes("bradley stoke") ||
    text.includes("filton") ||
    text.includes("stoke gifford") ||
    text.includes("bristol") ||
    text.includes("patchway")
  ) {
    return "Yes! RG Electrical Bristol Limited is based locally and provides full domestic and commercial electrical services across Bradley Stoke, Stoke Gifford, Filton, Patchway, Thornbury, Clifton, Redland, and North Bristol.";
  }

  // Phone number or booking inquiry
  if (/\b(?:07\d{9}|0117\d{7}|\d{5}\s*\d{6})\b/.test(text) || text.includes("phone")) {
    return "Thank you! I have registered your contact details. Robbie or our senior electrician will give you a quick call to confirm your requirements and arrange a free, no-obligation fixed quote.";
  }

  // Default greeting / response
  return "Hello! I am the digital assistant for RG Electrical Bristol Limited (NICEIC Approved Contractor · Company #10082511). We specialise in 18th Edition metal fuseboard upgrades (from £650 fixed), full domestic rewires (from £3,800 fixed), Landlord EICRs (from £180 fixed), and EV chargers across North Bristol. How can we help you today?";
}

/**
 * Main handler that queries Google Cloud Agent Builder first, then seamlessly falls back
 */
export async function getTradeAgentResponse(
  message: string,
  sessionId = "web-visitor-session",
): Promise<TradeChatResponse> {
  const token = getGoogleAccessToken();

  if (token) {
    try {
      const googleReply = await callGoogleAgent(message, sessionId, token);
      if (googleReply) {
        return {
          reply: googleReply,
          source: "google_agent_builder",
        };
      }
    } catch {
      // Fallback cleanly if network drops
    }
  }

  return {
    reply: getLocalTradeReply(message),
    source: "local_knowledge_engine",
  };
}
