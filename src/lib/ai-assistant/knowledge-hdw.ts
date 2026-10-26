import type { AssistantConfig } from "./types.ts";

export const HDW_ASSISTANT_CONFIG: AssistantConfig = {
  brand: "hdw",
  agentId: "07495933-b944-44ed-9528-7ea30007e477",
  agentName: "Callum",
  agentTitle: "HDW Trade Specialist",
  avatarIcon: "Wrench",
  welcomeMessage:
    "Hello! I am Callum, trade digital specialist at Harley Digital Works. We build and look after high-converting websites for UK tradespeople with 100% done-for-you copywriting and zero homework. How can I help your business today?",
  quickPrompts: [
    "How much does a trade website cost?",
    "What is included in the £249/mo care plan?",
    "How does the 24/7 AI Phone Receptionist work?",
    "How long does a website build take?",
  ],
  primaryColor: "#081B30",
  accentColor: "#059669",
  directPhone: "07394 041487",
  directPhoneTel: "07394041487",
  whatsappNumber: "447394041487",
  disclaimer:
    "AI Digital Assistant · Data handled under UK GDPR · Answers verified by Harley Digital Works",
};

/**
 * Returns grounded, verified answers for Harley Digital Works visitors in natural British English.
 * Strictly adheres to commercial boundaries and claims-guard rules.
 */
export function getHdwLocalAnswer(query: string): string {
  const text = query.toLowerCase();

  // 1. Pricing & Packages
  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("how much") ||
    text.includes("package") ||
    text.includes("fee") ||
    text.includes("rates")
  ) {
    return (
      "Our Managed Website Package is straightforward and transparent:\n\n" +
      "• Setup & Build: £1,495 total, split 50% (£747.50) upfront to reserve your build slot, and 50% (£747.50) only once you have previewed and approved your new website.\n" +
      "• Ongoing Managed Care: £249 per month on a rolling 30-day agreement.\n\n" +
      "There are no hidden fees. We take the website headache completely away—we write all the text for you, connect your domain and business email safely, and host everything on fast Cloudflare edge servers. Would you like to check our current build availability for your trade?"
    );
  }

  // 2. VAT inquiry
  if (text.includes("vat") || text.includes("tax")) {
    return (
      "The Harley Group Ltd operates below the statutory HMRC VAT threshold and is not currently VAT registered. " +
      "This means VAT is not charged or added to your invoices. The price you see is the exact price you pay."
    );
  }

  // 3. Ongoing Care Plan Inclusions
  if (
    text.includes("care plan") ||
    text.includes("monthly") ||
    text.includes("maintenance") ||
    text.includes("support") ||
    text.includes("hosting")
  ) {
    return (
      "Our £249/month Managed Care Plan covers everything needed to keep your website fast, secure, and working:\n\n" +
      "1. High-speed Cloudflare edge hosting and automatic SSL certificate renewals.\n" +
      "2. Enquiry desk health checks so you never miss a prospective customer message.\n" +
      "3. 1 batch of content updates every month (up to 30 mins) for adding project photos, new reviews, or price changes.\n" +
      "4. Standard business-day support SLA with direct founder escalation.\n" +
      "5. Rolling 30-day agreement with zero long-term lock-in—you own your domain and brand assets 100%."
    );
  }

  // 4. Delivery Timescales & Capacity
  if (
    text.includes("how long") ||
    text.includes("time") ||
    text.includes("timeline") ||
    text.includes("timescale") ||
    text.includes("speed") ||
    text.includes("turnaround") ||
    text.includes("schedule")
  ) {
    return (
      "We build projects on an agreed milestone schedule, typically completing the full design, 100% done-for-you copywriting, and preview review within two to three weeks.\n\n" +
      "To ensure quality and direct founder oversight from Robbie Harley, we strictly cap our capacity at a maximum of 2 active concurrent builds at any time. When would you ideally like your new website live?"
    );
  }

  // 5. 24/7 AI Virtual Phone Receptionist
  if (
    text.includes("receptionist") ||
    text.includes("phone") ||
    text.includes("call") ||
    text.includes("answering") ||
    text.includes("missed call") ||
    text.includes("voice")
  ) {
    return (
      "Our 24/7 AI Virtual Phone Receptionist answers inbound customer calls when you are on the tools, up a ladder, or driving:\n\n" +
      "• Answers warmly in a natural British voice.\n" +
      "• Explains your trade services and answers common job questions.\n" +
      "• Safely triages urgent emergencies (such as burning smells, power cuts, or burst pipes).\n" +
      "• Captures the caller's name, phone number, postcode, and job brief, sending an instant WhatsApp notification to your mobile.\n\n" +
      "Pricing: Available as an add-on to our Website Care Plan for just +£99/mo (£348/mo total bundle), or as a standalone service starting from £79/mo for Solo trades."
    );
  }

  // 6. Copywriting & "No Homework" Guarantee
  if (
    text.includes("homework") ||
    text.includes("copy") ||
    text.includes("writing") ||
    text.includes("content") ||
    text.includes("text") ||
    text.includes("write")
  ) {
    return (
      "With Harley Digital Works, you do zero homework. Most web agencies send contractors a 20-page questionnaire asking you to write your own copy—which sits on your desk for months.\n\n" +
      "Instead, Robbie conducts one brief discovery phone call, and we write 100% of the professional trade copy for you. We tailor the wording to UK regulations, your trade accreditations (like NICEIC, Gas Safe, NAPIT), and your target high-ticket jobs."
    );
  }

  // 7. Specific Trades (Electricians, Gas/Heating, Roofers, Plumbers, Builders)
  if (
    text.includes("electric") ||
    text.includes("spark") ||
    text.includes("niceic") ||
    text.includes("napit") ||
    text.includes("heating") ||
    text.includes("gas safe") ||
    text.includes("boiler") ||
    text.includes("plumb") ||
    text.includes("roof") ||
    text.includes("builder") ||
    text.includes("contractor")
  ) {
    return "We specifically engineer websites for UK trade contractors. Whether you specialise in domestic rewires, 18th Edition consumer units, combi boiler installations, heritage roofing, or commercial facilities, our designs showcase your workmanship with high-contrast before/after galleries, accreditation trust panels, and instant contact desks.";
  }

  // 8. Domain Ownership & Email
  if (
    text.includes("domain") ||
    text.includes("email") ||
    text.includes("mx") ||
    text.includes("own") ||
    text.includes("ownership")
  ) {
    return "You retain 100% legal ownership of your domain name, company name, and brand assets at all times. When we connect your domain, we preserve your existing business email (MX records) with zero downtime, so your daily emails remain uninterrupted.";
  }

  // 9. Contact / Consultation / Booking
  if (
    text.includes("contact") ||
    text.includes("speak") ||
    text.includes("call") ||
    text.includes("robbie") ||
    text.includes("quote") ||
    text.includes("consultation") ||
    text.includes("book")
  ) {
    return (
      "You can speak directly with Robbie Harley, founder of Harley Digital Works:\n\n" +
      "• Telephone: 07394 041487\n" +
      "• WhatsApp: Available directly on 07394 041487\n" +
      "• Email: robbie@theharleygroup.org\n\n" +
      "Alternatively, tell me your name, business name, and phone number right here, and I will register your enquiry directly for a same-day callback."
    );
  }

  // Default HDW response
  return (
    "Harley Digital Works provides productised website design, 100% done-for-you copywriting, and managed monthly care for UK trades. " +
    "Our standard package is £1,495 setup (50% upfront, 50% on approval) plus £249/mo care. " +
    "Would you like to know what is included, ask about our 24/7 AI virtual receptionist, or speak with Robbie Harley?"
  );
}
