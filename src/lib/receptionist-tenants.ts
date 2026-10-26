/**
 * Multi-Tenant AI Virtual Phone Receptionist Configuration Store
 * Provides isolated tenant profiles, trade personas, British voice selection,
 * service areas, FAQs, and emergency triage rules.
 */

export interface TenantFaqItem {
  question: string;
  answer: string;
}

export interface ReceptionistTenantConfig {
  id: string;
  tenantSlug: string;
  businessName: string;
  tradeType: string;
  assignedDid: string;
  transferPhone: string;
  status: "active" | "onboarding" | "paused" | "cancelled";
  tier: "solo" | "pro" | "fleet" | "bundle_addon";
  monthlyCallAllowance: number;
  voiceId: string;
  greetingText: string;
  businessHours: {
    mon_fri?: string;
    sat?: string;
    sun?: string;
    emergency_24_7?: boolean;
  };
  serviceAreas: string[];
  faqKnowledge: TenantFaqItem[];
  qualificationFields: string[];
  emergencyKeywords: string[];
  notificationDestination: {
    whatsapp?: string;
    email?: string;
    sms?: string;
  };
}

/**
 * Built-in default tenants representing verified Harley Group & Client configurations.
 * Tenant 'hdw-primary' is immutable and permanently dedicated to Harley Digital Works.
 */
export const BUILTIN_RECEPTIONIST_TENANTS: ReceptionistTenantConfig[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    tenantSlug: "hdw-primary",
    businessName: "Harley Digital Works",
    tradeType: "digital_agency",
    assignedDid: "+441172141357",
    transferPhone: "+447394041487",
    status: "active",
    tier: "fleet",
    monthlyCallAllowance: 1000,
    voiceId: "en-GB-Neural2-B",
    greetingText:
      "Thank you for calling Harley Digital Works. I am your 24/7 virtual receptionist. Are you calling to enquire about a new bespoke website for your trade business, or are you exploring our 24/7 phone receptionist system?",
    businessHours: {
      mon_fri: "08:00 - 18:00",
      sat: "09:00 - 14:00",
      sun: "closed",
      emergency_24_7: true,
    },
    serviceAreas: ["Bristol", "Bath", "Gloucester", "Cheltenham", "South West UK", "Nationwide"],
    faqKnowledge: [
      {
        question: "How much is your trade website package?",
        answer:
          "Our signature managed website package is a fixed £1,495 setup plus £249 per month for ongoing care. We require a 50% deposit (£747.50) on agreement, and the remaining 50% only when you approve the final staged preview.",
      },
      {
        question: "Do I have to write copy or do homework?",
        answer:
          "Zero homework and zero tech jargon. We write 100% of your technical trade copy and case studies for you.",
      },
      {
        question: "Can I deploy this phone receptionist on my trade business?",
        answer:
          "Yes. When we build your trade website, we can install this exact 24/7 virtual phone receptionist on your business number to capture quotes while you're on tools or driving.",
      },
      {
        question: "What is your build capacity?",
        answer:
          "We strictly cap agency intake to maximum 2 active client onboarding builds at any time so Robbie Harley gives your business complete personal attention.",
      },
    ],
    qualificationFields: [
      "caller_name",
      "trade_specialism",
      "van_count",
      "location",
      "contact_phone",
    ],
    emergencyKeywords: ["urgent", "emergency", "sparks", "burning smell", "gas leak"],
    notificationDestination: {
      whatsapp: "+447394041487",
      email: "hello@harleydigitalworks.com",
    },
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    tenantSlug: "rg-electrical",
    businessName: "RG Electrical & Renewable Solutions",
    tradeType: "electrical_contractor",
    assignedDid: "+441172141358",
    transferPhone: "+447394041487",
    status: "active",
    tier: "pro",
    monthlyCallAllowance: 150,
    voiceId: "en-GB-Neural2-B",
    greetingText:
      "Thank you for calling RG Electrical in Bristol and Bath. I am your 24/7 virtual receptionist. Whether you have an electrical emergency, need a consumer unit upgrade, or want a quote for EV charging, how can I help you today?",
    businessHours: {
      mon_fri: "07:30 - 17:30",
      sat: "08:00 - 13:00",
      sun: "emergency_only",
      emergency_24_7: true,
    },
    serviceAreas: ["Bristol", "Bath", "Clifton", "Keynsham", "Chepstow", "M4 Corridor"],
    faqKnowledge: [
      {
        question: "How much is an 18th edition fuseboard replacement?",
        answer:
          "Our full dual-RCD metal consumer unit upgrades with SPD surge protection start from £850 fully certified with NICEIC paperwork.",
      },
      {
        question: "Do you offer 24/7 emergency callouts?",
        answer:
          "Yes, our on-call electricians attend power cuts, burning smells, and tripped RCD emergencies within 60 to 90 minutes across Bristol and Bath.",
      },
      {
        question: "Do you install home EV chargers?",
        answer:
          "Yes, we are OZEV approved installers for Zappi, Hypervolt, and PodPoint chargers with complete electrical certificate sign-off.",
      },
    ],
    qualificationFields: ["caller_name", "postcode", "job_type", "urgency", "contact_phone"],
    emergencyKeywords: [
      "sparks",
      "burning smell",
      "smoke",
      "power cut",
      "tripping",
      "electric shock",
      "no power",
    ],
    notificationDestination: {
      whatsapp: "+447394041487",
      email: "dispatch@rgelectrical-demo.co.uk",
    },
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    tenantSlug: "apex-heating",
    businessName: "Apex Gas & Heating Engineers",
    tradeType: "heating_and_gas",
    assignedDid: "+441172141359",
    transferPhone: "+447394041487",
    status: "active",
    tier: "pro",
    monthlyCallAllowance: 150,
    voiceId: "en-GB-Neural2-F",
    greetingText:
      "Good day and thank you for calling Apex Gas & Heating. I am the virtual assistant. Are you experiencing a boiler breakdown with no heat or hot water, or would you like to book a boiler service or landlord gas safety check?",
    businessHours: {
      mon_fri: "08:00 - 18:00",
      sat: "08:00 - 14:00",
      emergency_24_7: true,
    },
    serviceAreas: ["Bath", "Bristol", "South Gloucestershire", "Wiltshire"],
    faqKnowledge: [
      {
        question: "What is your boiler breakdown callout charge?",
        answer:
          "Our initial emergency diagnostic callout is a fixed £95 which includes the first hour of fault diagnosis. Any required parts are quoted before fitting.",
      },
      {
        question: "How much is an annual boiler service and CP12 certificate?",
        answer:
          "A domestic boiler service is £85. For landlords, a combined annual boiler service and CP12 Gas Safety certificate is £120.",
      },
      {
        question: "Are your heating engineers Gas Safe registered?",
        answer:
          "Yes, every Apex heating technician carries a valid Gas Safe ID card with unvented cylinder and combi boiler accreditations.",
      },
    ],
    qualificationFields: [
      "caller_name",
      "boiler_make_model",
      "postcode",
      "has_heat",
      "contact_phone",
    ],
    emergencyKeywords: ["gas smell", "carbon monoxide", "boiler leak", "burst pipe", "flooding"],
    notificationDestination: {
      whatsapp: "+447394041487",
      email: "service@apexheating-demo.co.uk",
    },
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    tenantSlug: "clifton-roofing",
    businessName: "Clifton Roofing & Leadwork",
    tradeType: "roofing_contractor",
    assignedDid: "+441172141360",
    transferPhone: "+447394041487",
    status: "active",
    tier: "solo",
    monthlyCallAllowance: 50,
    voiceId: "en-GB-Neural2-B",
    greetingText:
      "Thank you for calling Clifton Roofing & Leadwork. I am your 24/7 receptionist. Are you calling regarding storm damage or an active roof leak, or would you like to arrange a free drone survey and estimate?",
    businessHours: {
      mon_fri: "07:30 - 17:00",
      sat: "08:00 - 12:00",
      emergency_24_7: true,
    },
    serviceAreas: ["Clifton", "Bristol", "Redland", "Cotham", "North Somerset"],
    faqKnowledge: [
      {
        question: "Do you charge for roof surveys?",
        answer:
          "We offer 100% free visual drone and roof inspections with full photographic quotation reports.",
      },
      {
        question: "Do you undertake period Victorian leadwork and heritage slate?",
        answer:
          "Yes, we specialise in heritage Welsh slate, Spanish slate, and Codes 4 to 8 lead valley guttering across Bristol's conservation areas.",
      },
    ],
    qualificationFields: ["caller_name", "property_type", "issue_description", "contact_phone"],
    emergencyKeywords: [
      "roof leak",
      "water coming through ceiling",
      "missing tiles",
      "storm damage",
      "gutter collapse",
    ],
    notificationDestination: {
      whatsapp: "+447394041487",
      email: "estimates@cliftonroofing-demo.co.uk",
    },
  },
];

/**
 * Finds a tenant by identifier: slug, ID, or assigned phone number DID.
 * Defaults to 'hdw-primary' if no matching tenant is found.
 */
export function getReceptionistTenant(identifier?: string | null): ReceptionistTenantConfig {
  if (!identifier) {
    return BUILTIN_RECEPTIONIST_TENANTS[0];
  }

  const clean = identifier.trim().toLowerCase().replace(/\s+/g, "");

  // Match HDW Primary on slug, Bristol VoIP number, WhatsApp mobile, or Google Phone Gateway
  if (
    clean === "hdw-primary" ||
    clean === "+441172141357" ||
    clean === "01172141357" ||
    clean === "+447394041487" ||
    clean === "07394041487" ||
    clean === "+12569408134" ||
    clean === "12569408134" ||
    clean === "2569408134" ||
    clean.includes("2569408134")
  ) {
    return BUILTIN_RECEPTIONIST_TENANTS[0];
  }

  const found = BUILTIN_RECEPTIONIST_TENANTS.find(
    (t) =>
      t.tenantSlug.toLowerCase() === clean ||
      t.id.toLowerCase() === clean ||
      t.assignedDid.replace(/\s+/g, "") === clean,
  );

  return found || BUILTIN_RECEPTIONIST_TENANTS[0];
}
