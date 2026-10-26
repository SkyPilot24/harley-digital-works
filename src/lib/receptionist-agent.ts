import { execSync } from "node:child_process";

export interface ReceptionistCallRequest {
  message: string;
  sessionId: string;
  mode?: "hdw_agency" | "contractor_upsell";
}

export interface ExtractedLeadInfo {
  callerName?: string;
  callerPhone?: string;
  callerLocation?: string;
  callerTrade?: string;
  callerFleetSize?: string;
  urgency?: "standard" | "urgent_emergency";
  serviceScope?: string;
}

export interface ReceptionistCallResponse {
  replyText: string;
  audioBase64: string | null;
  audioDataUri: string | null;
  source: "google_dialogflow_cx" | "local_knowledge_engine";
  leadInfo: ExtractedLeadInfo;
}

const AGENT_PROJECT = "gen-app-agent-building";
const AGENT_LOCATION = "us-central1";
const AGENT_ID = "4eb1d76c-5561-4f63-a7d0-5a1d5e1687c3"; // HDW Virtual Phone Receptionist

/**
 * Retrieves Google Access Token via gcloud or Application Default Credentials
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
 * Extracts structured lead details from caller conversation
 */
function extractLeadFromConversation(message: string): ExtractedLeadInfo {
  const text = message.toLowerCase();
  const lead: ExtractedLeadInfo = {};

  // Detect phone numbers
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

  // Detect urgency
  if (
    text.includes("burning") ||
    text.includes("spark") ||
    text.includes("smoke") ||
    text.includes("emergency") ||
    text.includes("urgent") ||
    text.includes("power cut") ||
    text.includes("leak")
  ) {
    lead.urgency = "urgent_emergency";
  } else {
    lead.urgency = "standard";
  }

  // Detect trade
  if (text.includes("electric") || text.includes("fusebox") || text.includes("rewire")) {
    lead.callerTrade = "Electrical Contractor";
  } else if (text.includes("roof") || text.includes("tile") || text.includes("gutter")) {
    lead.callerTrade = "Roofing Contractor";
  } else if (
    text.includes("plumb") ||
    text.includes("boiler") ||
    text.includes("heating") ||
    text.includes("gas")
  ) {
    lead.callerTrade = "Plumbing & Heating";
  } else if (text.includes("build") || text.includes("extension") || text.includes("carpenter")) {
    lead.callerTrade = "Building & Joinery";
  }

  // Detect UK locations
  const ukCities = [
    "bristol",
    "bath",
    "clifton",
    "bradley stoke",
    "gloucester",
    "cheltenham",
    "swindon",
    "cardiff",
    "london",
    "birmingham",
    "manchester",
    "leeds",
    "surrey",
    "reading",
    "oxford",
  ];
  for (const city of ukCities) {
    if (text.includes(city)) {
      lead.callerLocation = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }

  return lead;
}

/**
 * Fallback local HDW receptionist logic in case network connection drops
 */
function getLocalReceptionistReply(message: string): string {
  const text = message.toLowerCase();

  // Price & package enquiry
  if (
    text.includes("website") ||
    text.includes("package") ||
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("how much")
  ) {
    return "Our signature managed website package for UK trade contractors is a fixed £1,495 setup plus £249 per month for ongoing care. We require a 50% deposit (£747.50) on agreement, and the remaining 50% only when you approve the final preview. It includes 100% done-for-you copywriting with zero homework and zero tech jargon. And as an exclusive capability, we can also install this exact 24/7 AI Phone Receptionist on your trade business, so you never miss a quote while up on a ladder or driving. What trade do you run, and where are you based?";
  }

  // Trade & fleet details
  if (
    text.includes("van") ||
    text.includes("electric") ||
    text.includes("roof") ||
    text.includes("plumb") ||
    text.includes("heating") ||
    text.includes("build")
  ) {
    return "Understood. We specifically build high-converting websites for established UK trade contractors with vans on the road. We strictly cap our agency capacity to 2 active builds at any time so Robbie gives your business complete personal attention. Could I take your full name and best mobile number so Robbie Harley can call you personally to review your business?";
  }

  // Receptionist upsell enquiry
  if (
    text.includes("receptionist") ||
    text.includes("phone") ||
    text.includes("service") ||
    text.includes("missed call") ||
    text.includes("test")
  ) {
    return "You are speaking directly with our live 24/7 Virtual Phone Receptionist. When we build your trade website, we can deploy this exact AI voice receptionist on your business number—answering emergency calls, explaining ballpark prices, and texting you the lead within 30 seconds. Could I take your name, trade, and mobile number so Robbie can set up a tailored demonstration for you?";
  }

  return "Thank you for calling Harley Digital Works. I am your 24/7 virtual receptionist. Are you calling to enquire about a new bespoke website for your trade business, or would you like to see how our digital services and virtual receptionist can help you win more jobs?";
}

/**
 * Dispatches query to Dialogflow CX with British voice synthesis
 */
export async function processReceptionistCall(
  message: string,
  sessionId: string,
  mode: "hdw_agency" | "contractor_upsell" = "hdw_agency",
): Promise<ReceptionistCallResponse> {
  const token = getGoogleAccessToken();
  const leadInfo = extractLeadFromConversation(message);

  if (token) {
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
                name: "en-GB-Neural2-B",
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
          };
        }
      }
    } catch {
      // Fallback below
    }
  }

  // Resilient fallback
  const fallbackText = getLocalReceptionistReply(message);
  return {
    replyText: fallbackText,
    audioBase64: null,
    audioDataUri: null,
    source: "local_knowledge_engine",
    leadInfo,
  };
}
