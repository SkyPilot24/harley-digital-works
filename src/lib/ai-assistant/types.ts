export type AssistantBrand = "hdw" | "group";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  source?: "google_agent_builder" | "local_knowledge_engine";
  quickActions?: QuickAction[];
}

export interface QuickAction {
  label: string;
  action: "prompt" | "open_lead_form" | "call" | "whatsapp" | "link";
  value: string;
}

export interface AssistantConfig {
  brand: AssistantBrand;
  agentId: string;
  agentName: string;
  agentTitle: string;
  avatarIcon: string;
  welcomeMessage: string;
  quickPrompts: string[];
  primaryColor: string;
  accentColor: string;
  directPhone: string;
  directPhoneTel: string;
  whatsappNumber?: string;
  disclaimer: string;
}

export interface AssistantChatRequest {
  message: string;
  sessionId: string;
  brand: AssistantBrand;
}

export interface ExtractedChatLead {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  trade?: string;
  serviceNeeded?: string;
  preferredContact?: "phone" | "email" | "whatsapp";
  rawMessageSnippet?: string;
  isQualified: boolean;
}

export interface AssistantChatResponse {
  reply: string;
  source: "google_agent_builder" | "local_knowledge_engine";
  brand: AssistantBrand;
  quickPrompts?: string[];
  extractedLead?: ExtractedChatLead;
}

export interface LeadCaptureRequest {
  startedAt: number;
  turnstileToken?: string;
  website?: string;
  brand: AssistantBrand;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  trade?: string;
  serviceNeeded?: string;
  notes?: string;
  sessionId?: string;
}

export interface LeadCaptureResponse {
  ok: boolean;
  message: string;
}
