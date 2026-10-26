import { getReceptionistTenant, type ReceptionistTenantConfig } from "./receptionist-tenants.ts";

export interface ReceptionistCallRequest {
  message: string;
  sessionId: string;
  tenantId?: string;
  mode?: "hdw_agency" | "contractor_upsell" | "tenant_switchboard";
}

export interface ExtractedLeadInfo {
  callerName?: string;
  callerPhone?: string;
  callerLocation?: string;
  callerTrade?: string;
  callerFleetSize?: string;
  urgency?: "standard" | "urgent_emergency";
  serviceScope?: string;
  jobDetails?: string;
}

export interface ReceptionistCallResponse {
  replyText: string;
  audioBase64: string | null;
  audioDataUri: string | null;
  source: "google_dialogflow_cx" | "local_knowledge_engine";
  leadInfo: ExtractedLeadInfo;
  tenantSlug: string;
  businessName: string;
  isEmergency: boolean;
}

const AGENT_PROJECT = "gen-app-agent-building";
const AGENT_LOCATION = "us-central1";
const AGENT_ID = "4eb1d76c-5561-4f63-a7d0-5a1d5e1687c3"; // HDW Virtual Phone Receptionist

/**
 * Safely retrieves Google Access Token across Node.js and Serverless Edge environments
 */
function getGoogleAccessToken(): string | null {
  // Check environment variables first (Cloudflare / Serverless safe)
  if (typeof process !== "undefined" && process.env?.GOOGLE_ACCESS_TOKEN) {
    return process.env.GOOGLE_ACCESS_TOKEN.trim();
  }

  // Check Node environment with child_process dynamically
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
 * Extracts structured lead details from caller conversation across trade disciplines
 */
export function extractLeadFromConversation(
  message: string,
  tenant: ReceptionistTenantConfig,
): ExtractedLeadInfo {
  const text = message.toLowerCase();
  const lead: ExtractedLeadInfo = {};

  // Detect phone numbers (UK standard mobile and landline patterns)
  const phoneMatch = message.match(
    /(?:(?:\+44\s?|0)(?:7\d{3}|1\d{3}|2\d{3})\s?\d{3}\s?\d{3,4}|\b07\d{9}\b)/,
  );
  if (phoneMatch) {
    lead.callerPhone = phoneMatch[0].trim();
  }

  // Detect van count / fleet size
  const vanMatch = message.match(/(\d+)\s*(?:van|vehicle|truck|engineer|staff|crew|team)/i);
  if (vanMatch) {
    lead.callerFleetSize = `${vanMatch[1]} vans/team`;
  }

  // Detect emergency urgency from tenant's emergency keywords or explicit emergency/urgent words
  const isEmergency =
    tenant.emergencyKeywords.some((keyword) => text.includes(keyword.toLowerCase())) ||
    text.includes("emergency") ||
    text.includes("urgent");
  lead.urgency = isEmergency ? "urgent_emergency" : "standard";

  // Detect UK postcodes / locations
  const ukLocations = [
    "bristol",
    "bath",
    "clifton",
    "redland",
    "cotham",
    "keynsham",
    "bradley stoke",
    "gloucester",
    "cheltenham",
    "swindon",
    "cardiff",
    "london",
    "birmingham",
    "surrey",
    "reading",
  ];
  for (const loc of ukLocations) {
    if (text.includes(loc)) {
      lead.callerLocation = loc.charAt(0).toUpperCase() + loc.slice(1);
      break;
    }
  }

  // Detect service scope
  if (text.includes("rewire") || text.includes("fuseboard") || text.includes("consumer unit")) {
    lead.serviceScope = "Fuseboard Upgrade / Rewire";
  } else if (text.includes("ev charger") || text.includes("zappi")) {
    lead.serviceScope = "EV Charger Installation";
  } else if (text.includes("boiler") || text.includes("heating") || text.includes("radiator")) {
    lead.serviceScope = "Boiler Fault / Heating Service";
  } else if (text.includes("roof") || text.includes("leak") || text.includes("slate")) {
    lead.serviceScope = "Roof Repair / Leadwork";
  } else if (text.includes("website") || text.includes("marketing")) {
    lead.serviceScope = "Trade Website Package";
  }

  return lead;
}

/**
 * High-speed local knowledge engine for tenant-isolated trade responses
 */
function getTenantLocalReply(message: string, tenant: ReceptionistTenantConfig): string {
  const text = message.toLowerCase();

  // Check emergency keywords first
  const isEmergency =
    tenant.emergencyKeywords.some((k) => text.includes(k.toLowerCase())) ||
    text.includes("emergency") ||
    text.includes("urgent");
  if (isEmergency) {
    if (tenant.tradeType === "electrical_contractor") {
      return `SAFETY ALERT: If you smell burning or see sparking from your consumer unit, please switch off the main switch immediately if safe to do so. I have flagged this as an urgent emergency. An on-call electrician from ${tenant.businessName} will call your mobile within 15 minutes. May I confirm your full name and exact address?`;
    }
    if (tenant.tradeType === "heating_and_gas") {
      return `SAFETY NOTICE: If you smell gas, please extinguish naked flames, open windows, and turn off the gas emergency control valve at the meter. I have logged this as an emergency callout with ${tenant.businessName}. May I take your phone number and address so our on-call Gas Safe engineer can call you immediately?`;
    }
    if (tenant.tradeType === "roofing_contractor") {
      return `I understand you have an active roof leak causing water ingress. We have emergency tarpaulin teams available across ${tenant.serviceAreas[0]}. Please confirm your name and postcode so we can dispatch the nearest roofing crew.`;
    }
    return `I have flagged your enquiry as high priority. An emergency on-call team member from ${tenant.businessName} has received an instant alert and will contact you directly within 15 minutes. Could you confirm your full name and best contact number?`;
  }

  // Check tenant FAQs
  for (const faq of tenant.faqKnowledge) {
    const qKeywords = faq.question
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .filter((w) => w.length > 3);
    const matchCount = qKeywords.filter((k) => text.includes(k)).length;
    if (matchCount >= 2 || (qKeywords.length === 1 && matchCount === 1)) {
      return `${faq.answer} Would you like me to take your contact details so our team can schedule this for you?`;
    }
  }

  // Pricing / quotation request
  if (
    text.includes("how much") ||
    text.includes("cost") ||
    text.includes("price") ||
    text.includes("quote") ||
    text.includes("estimate")
  ) {
    if (tenant.tradeType === "digital_agency") {
      return "Our signature managed website package for UK trade contractors is a fixed £1,495 setup plus £249 per month for ongoing care, with a 50% deposit (£747.50) on agreement and 50% only when you approve the final preview. It includes 100% done-for-you copywriting and the option to add this 24/7 AI Phone Receptionist to your business. What trade do you run and where are you based?";
    }
    return `For ${tenant.businessName}, we provide clear upfront pricing before any job starts. We can provide a ballpark estimate or arrange an on-site survey. Could I take your name, phone number, and postcode so one of our specialists can provide an exact quotation?`;
  }

  // Generic greeting / opening fallback
  if (tenant.tradeType === "digital_agency") {
    return "Thank you for calling Harley Digital Works. I am your 24/7 virtual receptionist. Are you calling to enquire about a new bespoke website for your trade business, or would you like to see how our digital services and virtual receptionist can help you win more jobs?";
  }

  return `Thank you for calling ${tenant.businessName}. I am the 24/7 virtual receptionist. How can we assist you with your project or enquiry today?`;
}

/**
 * Dispatches query to Dialogflow CX or multi-tenant conversational engine
 */
export async function processReceptionistCall(
  message: string,
  sessionId: string,
  tenantIdentifier: string = "hdw-primary",
  mode: "hdw_agency" | "contractor_upsell" | "tenant_switchboard" = "hdw_agency",
): Promise<ReceptionistCallResponse> {
  const tenant = getReceptionistTenant(tenantIdentifier);
  const leadInfo = extractLeadFromConversation(message, tenant);
  const isEmergency = leadInfo.urgency === "urgent_emergency";
  const token = getGoogleAccessToken();

  // For HDW primary agent, attempt Google Dialogflow CX if token is available
  if (token && tenant.tenantSlug === "hdw-primary") {
    try {
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
            text: { text: message },
            languageCode: "en",
          },
          outputAudioConfig: {
            audioEncoding: "OUTPUT_AUDIO_ENCODING_MP3",
            synthesizeSpeechConfig: {
              speakingRate: 1.0,
              pitch: 0.0,
              voice: {
                name: tenant.voiceId || "en-GB-Neural2-B",
              },
            },
          },
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          queryResult?: {
            responseMessages?: Array<{ text?: { text?: string[] } }>;
          };
          outputAudio?: string;
        };

        const texts = data?.queryResult?.responseMessages
          ?.flatMap((m) => m.text?.text || [])
          .filter(Boolean);

        if (texts && texts.length > 0) {
          const audioBase64 = data.outputAudio || null;
          return {
            replyText: texts.join("\n\n"),
            audioBase64,
            audioDataUri: audioBase64 ? `data:audio/mp3;base64,${audioBase64}` : null,
            source: "google_dialogflow_cx",
            leadInfo,
            tenantSlug: tenant.tenantSlug,
            businessName: tenant.businessName,
            isEmergency,
          };
        }
      }
    } catch {
      // Fall through to resilient local tenant engine
    }
  }

  // Resilient multi-tenant local engine
  const replyText = getTenantLocalReply(message, tenant);
  return {
    replyText,
    audioBase64: null,
    audioDataUri: null,
    source: "local_knowledge_engine",
    leadInfo,
    tenantSlug: tenant.tenantSlug,
    businessName: tenant.businessName,
    isEmergency,
  };
}
