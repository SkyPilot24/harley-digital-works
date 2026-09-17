export interface MilestoneStage {
  id: string;
  stageNumber: number;
  dayRange: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  completedDate?: string;
  actionRequired?: string;
}

export interface ClientTrackProject {
  token: string;
  clientName: string;
  companyName: string;
  trade: string;
  package: string;
  startDate: string;
  targetLaunchDate: string;
  currentDay: number;
  totalDays: number;
  projectManager: {
    name: string;
    role: string;
    phone: string;
    whatsapp: string;
    email: string;
  };
  domain: {
    url: string;
    status: "pending_verification" | "configured" | "dns_cutover_ready";
    registrar: string;
    cnameValue: string;
    aRecordValue: string;
  };
  milestones: MilestoneStage[];
}

export const SAMPLE_PROJECTS: Record<string, ClientTrackProject> = {
  "HDW-APEX-2026": {
    token: "HDW-APEX-2026",
    clientName: "Mark Taylor",
    companyName: "Apex Electrical & Solar Ltd",
    trade: "Electrical & Solar Contracting",
    package: "Growth Website (£2,995) + £95/mo Care Plan",
    startDate: "10 Sept 2026",
    targetLaunchDate: "24 Sept 2026",
    currentDay: 8,
    totalDays: 14,
    projectManager: {
      name: "Jack Miller",
      role: "Lead Web Producer & Technical Director",
      phone: "0161 820 4910",
      whatsapp: "07700 900142",
      email: "direct@harleydigitalworks.com",
    },
    domain: {
      url: "apexelectricalmcr.co.uk",
      status: "dns_cutover_ready",
      registrar: "GoDaddy",
      cnameValue: "cname.harleydigitalworks.com",
      aRecordValue: "185.199.108.153",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        dayRange: "Days 1–3",
        title: "Trade Discovery & Onboarding",
        description: "Services verified, coverage postcodes mapped, NICEIC & EV accreditation numbers logged.",
        status: "completed",
        completedDate: "12 Sept 2026",
      },
      {
        id: "m2",
        stageNumber: 2,
        dayRange: "Days 4–6",
        title: "Bespoke Copywriting & Content Creation",
        description: "Full professional copywriting completed for all service pages, local SEO titles, and trade guarantees.",
        status: "completed",
        completedDate: "15 Sept 2026",
      },
      {
        id: "m3",
        stageNumber: 3,
        dayRange: "Days 7–10",
        title: "Interactive Web Build & Lead Flow Wiring",
        description: "Building responsive mobile layout, instant electrical quote calculator, and WhatsApp lead dispatch integration.",
        status: "in_progress",
        actionRequired: "Build actively underway. Live preview link ready on Day 11.",
      },
      {
        id: "m4",
        stageNumber: 4,
        dayRange: "Days 11–12",
        title: "Client Review & 1-Click Polish",
        description: "Client tests live staging link on mobile, requests any final text tweaks, and approves for launch.",
        status: "pending",
      },
      {
        id: "m5",
        stageNumber: 5,
        dayRange: "Days 13–14",
        title: "Domain Cutover & Public Launch",
        description: "SSL certificate deployment, Google Business Profile indexation, Schema.org verification, and live rollout.",
        status: "pending",
      },
    ],
  },
  "HDW-VANGUARD-2026": {
    token: "HDW-VANGUARD-2026",
    clientName: "Dave Evans",
    companyName: "Vanguard Roofing & Property Care",
    trade: "Roofing & GRP Flat Roofs",
    package: "14-Day Launch Website (£1,495) + £95/mo Care Plan",
    startDate: "05 Sept 2026",
    targetLaunchDate: "19 Sept 2026",
    currentDay: 12,
    totalDays: 14,
    projectManager: {
      name: "Jack Miller",
      role: "Lead Web Producer",
      phone: "0161 820 4910",
      whatsapp: "07700 900142",
      email: "direct@harleydigitalworks.com",
    },
    domain: {
      url: "vanguardroofingmidlands.co.uk",
      status: "dns_cutover_ready",
      registrar: "123-Reg",
      cnameValue: "cname.harleydigitalworks.com",
      aRecordValue: "185.199.108.153",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        dayRange: "Days 1–3",
        title: "Discovery & Accreditations",
        description: "CORC membership confirmed, Solihull/Birmingham coverage radius loaded.",
        status: "completed",
        completedDate: "07 Sept 2026",
      },
      {
        id: "m2",
        stageNumber: 2,
        dayRange: "Days 4–6",
        title: "Copywriting & Drone Asset Setup",
        description: "Persuasive service copy written for GRP flat roofing, dry ridge systems, and emergency storm repairs.",
        status: "completed",
        completedDate: "10 Sept 2026",
      },
      {
        id: "m3",
        stageNumber: 3,
        dayRange: "Days 7–10",
        title: "Mobile Build & Quote Form Setup",
        description: "Full site built with click-to-call, WhatsApp quote estimator, and 20-year warranty badges.",
        status: "completed",
        completedDate: "14 Sept 2026",
      },
      {
        id: "m4",
        stageNumber: 4,
        dayRange: "Days 11–12",
        title: "Client Preview & Approval",
        description: "Staging preview approved by Dave Evans with 100% sign-off.",
        status: "completed",
        completedDate: "16 Sept 2026",
      },
      {
        id: "m5",
        stageNumber: 5,
        dayRange: "Days 13–14",
        title: "DNS Cutover & Public Launch",
        description: "Switching 123-Reg A-records to point live for launch tomorrow.",
        status: "in_progress",
        actionRequired: "Awaiting DNS propagation across UK telecoms networks.",
      },
    ],
  },
};
