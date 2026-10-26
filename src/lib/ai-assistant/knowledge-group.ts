import type { AssistantConfig } from "./types.ts";

export const GROUP_ASSISTANT_CONFIG: AssistantConfig = {
  brand: "group",
  agentId: "9761cd1b-2014-4173-8848-1b6db1b18390",
  agentName: "Victoria",
  agentTitle: "Senior Group Advisor",
  avatarIcon: "Building2",
  welcomeMessage:
    "Good day. I am Victoria, corporate advisor at The Harley Group Ltd. We oversee a portfolio of focused digital operating businesses, including Harley Digital Works, Harley Labs, and our commercial domain portfolio. How may I assist your enquiry today?",
  quickPrompts: [
    "What services does The Harley Group provide?",
    "Tell me about Harley Digital Works",
    "What is Harley Labs and ContentFlow AI?",
    "How can I acquire or lease a premium domain?",
  ],
  primaryColor: "#0F172A",
  accentColor: "#D97706",
  directPhone: "07394 041487",
  directPhoneTel: "07394041487",
  whatsappNumber: "447394041487",
  disclaimer:
    "Corporate AI Advisor · The Harley Group Ltd · UK Registered Company · Data handled under UK GDPR",
};

/**
 * Returns grounded, verified answers for The Harley Group visitors in natural British English.
 * Guides visitors to the relevant business division or founder contact desk.
 */
export function getGroupLocalAnswer(query: string): string {
  const text = query.toLowerCase();

  // 1. Group Overview & Corporate Structure
  if (
    text.includes("the harley group") ||
    text.includes("about") ||
    text.includes("company") ||
    text.includes("portfolio") ||
    text.includes("overview") ||
    text.includes("divisions")
  ) {
    return (
      "The Harley Group Ltd, founded and led by Robbie Harley, is the parent enterprise and oversight organisation for three focused commercial divisions:\n\n" +
      "1. Harley Digital Works: Our flagship customer-facing brand, providing productised websites, 100% done-for-you copywriting, and managed Cloudflare edge care for UK trade contractors.\n" +
      "2. Harley Labs: Our artificial intelligence and software automation studio, developing tools like ContentFlow AI and commercial SaaS prototypes.\n" +
      "3. Domain Asset Portfolio: A curated portfolio of premium UK brand and trade domain names available for acquisition or commercial lease.\n\n" +
      "Which area of our portfolio matches your current objective?"
    );
  }

  // 2. Harley Digital Works inquiry
  if (
    text.includes("digital works") ||
    text.includes("trade website") ||
    text.includes("electrician") ||
    text.includes("tradesperson") ||
    text.includes("builder") ||
    text.includes("hdw")
  ) {
    return (
      "Harley Digital Works specialises in turnkey digital infrastructure for UK tradespeople (electricians, heating engineers, roofers, commercial contractors).\n\n" +
      "• Package: £1,495 setup (50% upfront deposit, 50% on approval) plus £249 per month ongoing managed care.\n" +
      "• Service: 100% done-for-you copywriting, local schema SEO, Google Map Pack optimisation, and business email preservation with zero homework.\n" +
      "• 24/7 AI Virtual Phone Receptionist: Available as an integrated trade add-on.\n\n" +
      "You can explore Harley Digital Works directly at harleydigitalworks.com or let me know if you would like to discuss a project."
    );
  }

  // 3. Harley Labs & AI Automation inquiry
  if (
    text.includes("labs") ||
    text.includes("ai") ||
    text.includes("contentflow") ||
    text.includes("automation") ||
    text.includes("saas") ||
    text.includes("prototype")
  ) {
    return (
      "Harley Labs is the research, AI engineering, and software prototyping division of The Harley Group.\n\n" +
      "• Key Products: ContentFlow AI, an automated multi-channel publishing engine for businesses, alongside bespoke workflow automation experiments.\n" +
      "• Focus: High-utility software automation, lightweight operational tools, and validated digital assets.\n\n" +
      "You can review our current research initiatives at theharleygroup.org/labs."
    );
  }

  // 4. Domain Portfolio & Digital Real Estate
  if (
    text.includes("domain") ||
    text.includes("lease") ||
    text.includes("buy domain") ||
    text.includes("real estate") ||
    text.includes("brand name")
  ) {
    return (
      "The Harley Group manages an authoritative portfolio of digital brand assets and trade domain names across the UK.\n\n" +
      "• Acquisition & Lease: Select high-value commercial domains are available for outright acquisition or flexible 12-month lease-to-own agreements.\n" +
      "• Verification: All domain transactions are securely escrowed and handled directly under corporate oversight.\n\n" +
      "You can browse our active domain roster at theharleygroup.org/domains, or share the specific name or trade vertical you are seeking."
    );
  }

  // 5. Contact / Founder / Robbie Harley
  if (
    text.includes("contact") ||
    text.includes("robbie") ||
    text.includes("phone") ||
    text.includes("email") ||
    text.includes("call") ||
    text.includes("director") ||
    text.includes("founder") ||
    text.includes("address")
  ) {
    return (
      "You may contact our executive leadership directly:\n\n" +
      "• Robbie Harley, Founder & CEO\n" +
      "• Telephone: 07394 041487\n" +
      "• Email: robbie@theharleygroup.org\n" +
      "• Headquarters: The Harley Group Ltd, Bath & Bristol, United Kingdom\n\n" +
      "If you share your name, organisation, and the nature of your enquiry, I can lodge your details directly with the founder's desk."
    );
  }

  // 6. Partnerships & Commercial Enquiries
  if (
    text.includes("partner") ||
    text.includes("invest") ||
    text.includes("corporate") ||
    text.includes("proposal") ||
    text.includes("b2b")
  ) {
    return (
      "The Harley Group welcomes commercial discussions with established trade contractors, enterprise software partners, and institutional stakeholders. " +
      "Please provide your contact information and brief project scope, and our corporate office will coordinate a formal consultation."
    );
  }

  // Default Group response
  return (
    "The Harley Group Ltd oversees practical, high-value digital enterprises across the UK: Harley Digital Works (websites & digital care for trades), " +
    "Harley Labs (AI & software automation), and our commercial Domain Portfolio. " +
    "Which division or service can I connect you with today?"
  );
}
