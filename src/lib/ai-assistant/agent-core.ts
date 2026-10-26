import type {
  AssistantBrand,
  AssistantChatRequest,
  AssistantChatResponse,
  ExtractedChatLead,
} from "./types.ts";
import { HDW_ASSISTANT_CONFIG, getHdwLocalAnswer } from "./knowledge-hdw.ts";
import { GROUP_ASSISTANT_CONFIG, getGroupLocalAnswer } from "./knowledge-group.ts";

const AGENT_PROJECT = "gen-app-agent-building";
const AGENT_LOCATION = "us-central1";

// Rate limiting state: sessionId -> array of timestamps
const sessionRequestTimes = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 25;

/**
 * Checks in-memory session rate limit
 */
function isRateLimited(sessionId: string): boolean {
  const now = Date.now();
  const timestamps = sessionRequestTimes.get(sessionId) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  sessionRequestTimes.set(sessionId, validTimestamps);
  return false;
}

/**
 * Safely fetches Google Cloud Access Token across Node and Edge environments
 */
function getGoogleAccessToken(): string | null {
  if (typeof process !== "undefined" && process.env?.GOOGLE_ACCESS_TOKEN) {
    return process.env.GOOGLE_ACCESS_TOKEN.trim();
  }

  if (typeof process !== "undefined" && process.versions?.node) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { execSync } = require("node:child_process");
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

  return null;
}

/**
 * Calls Google Cloud Dialogflow CX / Gen App Agent Builder
 */
async function callGoogleDialogflowAgent(
  message: string,
  sessionId: string,
  agentId: string,
  token: string,
): Promise<string | null> {
  const cleanSessionId = sessionId.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 36) || "default-session";
  const url = `https://${AGENT_LOCATION}-dialogflow.googleapis.com/v3/projects/${AGENT_PROJECT}/locations/${AGENT_LOCATION}/agents/${agentId}/sessions/${cleanSessionId}:detectIntent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-goog-user-project": AGENT_PROJECT,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      queryInput: {
        text: { text: message },
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
 * Extracts structured lead data from natural conversational messages
 */
export function extractLeadFromMessage(message: string): ExtractedChatLead {
  const text = message.toLowerCase();
  const lead: ExtractedChatLead = {
    isQualified: false,
    rawMessageSnippet: message.slice(0, 300),
  };

  // 1. Phone number detection (UK mobile & landlines)
  const phoneMatch = message.match(
    /(?:(?:\+44\s?|0)(?:7\d{3}|1\d{3}|2\d{3})\s?\d{3}\s?\d{3,4}|\b07\d{9}\b)/,
  );
  if (phoneMatch) {
    lead.phone = phoneMatch[0].trim();
  }

  // 2. Email detection
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    lead.email = emailMatch[0].trim().toLowerCase();
  }

  // 3. Trade detection
  const trades: Record<string, string> = {
    electric: "Electrician",
    spark: "Electrician",
    niceic: "Electrician",
    napit: "Electrician",
    gas: "Gas & Heating Engineer",
    boiler: "Gas & Heating Engineer",
    heating: "Gas & Heating Engineer",
    plumb: "Plumber",
    roof: "Roofer",
    build: "General Builder",
    carpenter: "Carpenter & Joiner",
    commercial: "Commercial Facilities Contractor",
    fire: "Fire & Security",
    security: "Fire & Security",
  };

  for (const [key, tradeName] of Object.entries(trades)) {
    if (text.includes(key)) {
      lead.trade = tradeName;
      break;
    }
  }

  // 4. Company name heuristics: "at [Company]", "from [Company]", "called [Company]", "[Company] Ltd"
  const companyMatch = message.match(
    /(?:from|at|called|business is|company is)\s+([A-Z][A-Za-z0-9&'\s]+?)(?:,|\.|\band\b|$)/i,
  );
  if (companyMatch && companyMatch[1]) {
    lead.company = companyMatch[1].trim();
  } else if (text.includes(" ltd") || text.includes(" limited")) {
    const ltdMatch = message.match(/([A-Z][A-Za-z0-9&'\s]+?\s(?:Ltd|Limited))/i);
    if (ltdMatch && ltdMatch[1]) {
      lead.company = ltdMatch[1].trim();
    }
  }

  // 5. Name heuristics: "my name is [Name]", "i am [Name]", "i'm [Name]", "this is [Name]"
  const nameMatch = message.match(
    /(?:my name is|i am|i'm|this is)\s+([A-Za-z]+(?:\s+(?!from\b|at\b|with\b)[A-Za-z]+)?)/i,
  );
  if (nameMatch && nameMatch[1]) {
    lead.name = nameMatch[1].trim();
  }

  // 6. Service needed
  if (text.includes("receptionist") || text.includes("phone answering")) {
    lead.serviceNeeded = "24/7 AI Phone Receptionist";
  } else if (text.includes("care") || text.includes("maintenance")) {
    lead.serviceNeeded = "Website Care Plan (£249/mo)";
  } else if (text.includes("website") || text.includes("build") || text.includes("redesign")) {
    lead.serviceNeeded = "Managed Website Package (£1,495 setup + £249/mo)";
  } else if (text.includes("domain")) {
    lead.serviceNeeded = "Domain Portfolio Acquisition / Lease";
  } else if (text.includes("automation") || text.includes("labs")) {
    lead.serviceNeeded = "Harley Labs / AI Automation";
  }

  // 7. Preferred contact
  if (text.includes("whatsapp")) lead.preferredContact = "whatsapp";
  else if (text.includes("email")) lead.preferredContact = "email";
  else if (text.includes("call") || text.includes("phone")) lead.preferredContact = "phone";

  lead.isQualified = Boolean(lead.phone || lead.email);
  return lead;
}

/**
 * Checks for prompt injection or prompt manipulation attempts
 */
function isPromptInjection(text: string): boolean {
  const lower = text.toLowerCase();
  const injectionPatterns = [
    "ignore previous instructions",
    "disregard all previous",
    "reveal your prompt",
    "system instructions",
    "repeat the instructions above",
    "print your system message",
    "you are now a",
    "bypass safety filters",
    "output raw json schema",
  ];

  return injectionPatterns.some((pattern) => lower.includes(pattern));
}

/**
 * Main conversation handler
 */
export async function processAssistantMessage(
  request: AssistantChatRequest,
): Promise<AssistantChatResponse> {
  const { message, sessionId, brand } = request;
  const trimmed = message.trim();

  // 1. Rate limiting check
  if (isRateLimited(sessionId)) {
    return {
      reply:
        "You have sent several messages in a short time. To protect our service, please pause for a few minutes or call our direct office line on 07394 041487.",
      source: "local_knowledge_engine",
      brand,
    };
  }

  // 2. Prompt injection safety guard
  if (isPromptInjection(trimmed)) {
    const config = brand === "hdw" ? HDW_ASSISTANT_CONFIG : GROUP_ASSISTANT_CONFIG;
    return {
      reply: `I am ${config.agentName}, an AI digital assistant for ${brand === "hdw" ? "Harley Digital Works" : "The Harley Group Ltd"}. I am here specifically to assist with our verified services, pricing, and project enquiries. How can I help you today?`,
      source: "local_knowledge_engine",
      brand,
    };
  }

  // 3. Extract any lead qualification signals
  const extractedLead = extractLeadFromMessage(trimmed);

  // 4. Try Google Cloud Agent Builder if credentials are present
  const config = brand === "hdw" ? HDW_ASSISTANT_CONFIG : GROUP_ASSISTANT_CONFIG;
  const token = getGoogleAccessToken();

  if (token && config.agentId) {
    try {
      const googleReply = await callGoogleDialogflowAgent(
        trimmed,
        sessionId,
        config.agentId,
        token,
      );
      if (googleReply && googleReply.trim().length > 0) {
        return {
          reply: googleReply,
          source: "google_agent_builder",
          brand,
          quickPrompts: config.quickPrompts,
          extractedLead: extractedLead.isQualified ? extractedLead : undefined,
        };
      }
    } catch {
      // Clean fallback to deterministic local knowledge engine
    }
  }

  // 5. Fallback to Grounded Local Knowledge Engine
  const localReply = brand === "hdw" ? getHdwLocalAnswer(trimmed) : getGroupLocalAnswer(trimmed);

  return {
    reply: localReply,
    source: "local_knowledge_engine",
    brand,
    quickPrompts: config.quickPrompts,
    extractedLead: extractedLead.isQualified ? extractedLead : undefined,
  };
}
