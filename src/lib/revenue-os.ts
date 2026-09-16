export type RevenueStream =
  | "YouTube"
  | "Domains"
  | "Web Services"
  | "AI Automation"
  | "SaaS"
  | "Digital Products"
  | "Care Plans"
  | "Content Engine";

export type PriorityScores = {
  revenuePotential: number;
  speedToRevenue: number;
  easeOfImplementation: number;
  automationPotential: number;
  scalability: number;
  strategicFit: number;
  recurringRevenuePotential: number;
};

export type RevenueAsset = {
  id: string;
  name: string;
  stream: RevenueStream;
  status: "Idea" | "Validating" | "Building" | "Live" | "Monetising" | "Paused";
  owner: string;
  nextAction: string;
  targetRevenue: number;
  mrrPotential: number;
  scores: PriorityScores;
};

export type RevenueAssetForm = Omit<RevenueAsset, "id"> & { id?: string };

export type ExecutionTask = {
  id: string;
  title: string;
  category: "Revenue OS";
  priority: "High" | "Medium" | "Low";
  dueInDays: number;
  sourceAsset: string;
  sourceAssetId?: string;
};

export const emptyScores: PriorityScores = {
  revenuePotential: 3,
  speedToRevenue: 3,
  easeOfImplementation: 3,
  automationPotential: 3,
  scalability: 3,
  strategicFit: 4,
  recurringRevenuePotential: 3,
};

export const revenueAssets: RevenueAsset[] = [
  {
    id: "external-website-review",
    name: "Fully review and improve the external website",
    stream: "Web Services",
    status: "Building",
    owner: "Robbie",
    nextAction:
      "Complete a full external website review, prioritise conversion fixes, and ship improvements that support lead capture and recurring revenue.",
    targetRevenue: 2000,
    mrrPotential: 750,
    scores: {
      revenuePotential: 5,
      speedToRevenue: 5,
      easeOfImplementation: 4,
      automationPotential: 4,
      scalability: 4,
      strategicFit: 5,
      recurringRevenuePotential: 4,
    },
  },
  {
    id: "youtube-ai-ops",
    name: "Launch first faceless YouTube channel",
    stream: "YouTube",
    status: "Building",
    owner: "Robbie",
    nextAction: "Validate 20 titles, batch 5 scripts, and map affiliate/product CTAs.",
    targetRevenue: 1500,
    mrrPotential: 500,
    scores: {
      revenuePotential: 5,
      speedToRevenue: 4,
      easeOfImplementation: 4,
      automationPotential: 5,
      scalability: 5,
      strategicFit: 5,
      recurringRevenuePotential: 4,
    },
  },
  {
    id: "domains-top-10",
    name: "Sell owned domain portfolio",
    stream: "Domains",
    status: "Validating",
    owner: "Robert",
    nextAction:
      "Start with valuecurrencies.com, 5gdata.org, aiwearables.co.uk, myartificialintelligence.co.uk, and virtualavatars.co.uk: list them, write buyer notes, and contact 10 likely buyers.",
    targetRevenue: 5000,
    mrrPotential: 250,
    scores: {
      revenuePotential: 4,
      speedToRevenue: 5,
      easeOfImplementation: 5,
      automationPotential: 3,
      scalability: 4,
      strategicFit: 5,
      recurringRevenuePotential: 3,
    },
  },
  {
    id: "care-plan-conversion",
    name: "Convert every website delivery into a care plan",
    stream: "Care Plans",
    status: "Live",
    owner: "Robbie",
    nextAction: "Add care-plan upsell to proposals, onboarding, and delivery emails.",
    targetRevenue: 1200,
    mrrPotential: 1200,
    scores: {
      revenuePotential: 4,
      speedToRevenue: 5,
      easeOfImplementation: 5,
      automationPotential: 4,
      scalability: 4,
      strategicFit: 5,
      recurringRevenuePotential: 5,
    },
  },
  {
    id: "automation-audit",
    name: "Productise AI automation audit",
    stream: "AI Automation",
    status: "Building",
    owner: "Robbie",
    nextAction: "Create a 45-minute audit checklist and 3 fixed implementation packages.",
    targetRevenue: 2500,
    mrrPotential: 900,
    scores: {
      revenuePotential: 5,
      speedToRevenue: 3,
      easeOfImplementation: 3,
      automationPotential: 5,
      scalability: 4,
      strategicFit: 5,
      recurringRevenuePotential: 5,
    },
  },
  {
    id: "micro-agency-saas",
    name: "Validate micro-agency control dashboard SaaS",
    stream: "SaaS",
    status: "Validating",
    owner: "Robbie",
    nextAction: "Dogfood the admin control centre and collect 5 paid-pilot conversations.",
    targetRevenue: 3000,
    mrrPotential: 3000,
    scores: {
      revenuePotential: 5,
      speedToRevenue: 2,
      easeOfImplementation: 3,
      automationPotential: 4,
      scalability: 5,
      strategicFit: 5,
      recurringRevenuePotential: 5,
    },
  },
];

export type RevenueStreamPlaybook = {
  stream: RevenueStream;
  goal: string;
  dailyStep: string;
  tools: string;
  nextMilestones: string[];
};

export const revenueStreamPlaybooks: RevenueStreamPlaybook[] = [
  {
    stream: "Web Services",
    goal: "Sell Launch Plan builds and convert each delivery into a care plan.",
    dailyStep:
      "Find one business with a weak website, write a specific improvement note, and invite them to a 15-minute call.",
    tools:
      "ChatGPT for outreach copy, Manus for prospect research, Control Centre for leads and tasks.",
    nextMilestones: [
      "Publish one clear case study",
      "Send 10 targeted outreach messages",
      "Close first Launch Plan client",
    ],
  },
  {
    stream: "Care Plans",
    goal: "Turn one-off website work into recurring monthly support.",
    dailyStep:
      "Review one past or current project and write the care-plan upsell: hosting, updates, monitoring, and small improvements.",
    tools:
      "ChatGPT for proposal language, Diagnostics for monitoring, Revenue OS for renewal tasks.",
    nextMilestones: [
      "Add care plan to every proposal",
      "Create onboarding email",
      "Reach GBP 500 MRR",
    ],
  },
  {
    stream: "AI Automation",
    goal: "Sell practical audits and small automations that save operators time.",
    dailyStep:
      "Document one repeated admin task, score its value, and turn it into an audit example.",
    tools: "Manus for workflow research, ChatGPT for SOPs, Google AI Pro for longer audit docs.",
    nextMilestones: [
      "Finish audit checklist",
      "Create 3 fixed implementation packages",
      "Book 3 audit calls",
    ],
  },
  {
    stream: "Content Engine",
    goal: "Create consistent authority content that supports lead generation.",
    dailyStep:
      "Turn one service, objection, or client question into a short post or resource draft.",
    tools:
      "ChatGPT for outlines, Google AI Pro for long-form drafts, Resources CMS for publishing.",
    nextMilestones: [
      "Publish 5 playbooks",
      "Create 30-day content calendar",
      "Repurpose each post into outreach",
    ],
  },
  {
    stream: "Digital Products",
    goal: "Package internal templates and prompts into low-friction products.",
    dailyStep:
      "Identify one repeatable agency document and simplify it into a template a client could use.",
    tools: "Google AI Pro for docs, ChatGPT for instructions, Control Centre for product tasks.",
    nextMilestones: ["Choose first product", "Write sales page", "Create delivery file"],
  },
  {
    stream: "Domains",
    goal: "Sell owned domains directly through listings, buyer outreach, and sensible bundles.",
    dailyStep:
      "Pick one domain, find 10 likely buyers with Manus, draft one short outreach message with ChatGPT, and log the follow-up.",
    tools:
      "Manus for buyer research, ChatGPT for outreach copy, Domain OS for prices and next actions.",
    nextMilestones: [
      "List high-priority domains",
      "Create AI and autonomous-driving bundles",
      "Contact 20 likely buyers",
    ],
  },
  {
    stream: "YouTube",
    goal: "Build a content channel that supports authority, affiliate revenue, or product sales.",
    dailyStep: "Validate one title, outline one script, or map one video CTA to an offer.",
    tools: "ChatGPT for scripts, Google AI Pro for research, Manus for competitor/title analysis.",
    nextMilestones: ["Validate 20 titles", "Batch 5 scripts", "Publish first 3 videos"],
  },
  {
    stream: "SaaS",
    goal: "Dogfood the Control Centre as a future product for micro-agencies.",
    dailyStep:
      "Note one admin task that could become a repeatable SaaS feature and test it inside this agency first.",
    tools: "Control Centre for dogfooding, ChatGPT for specs, Revenue OS for validation tasks.",
    nextMilestones: ["List 10 pain points", "Interview 5 operators", "Define paid pilot scope"],
  },
];
export function priorityScore(scores: PriorityScores) {
  return Object.values(scores).reduce((total, score) => total + score, 0);
}

export function rankedRevenueAssets(assets: RevenueAsset[] = revenueAssets) {
  return [...assets].sort((a, b) => priorityScore(b.scores) - priorityScore(a.scores));
}

export function generateExecutionTasks(
  assets: RevenueAsset[] = revenueAssets,
  limit = 8,
): ExecutionTask[] {
  return rankedRevenueAssets(assets)
    .slice(0, limit)
    .map((asset) => {
      const score = priorityScore(asset.scores);
      return {
        id: `task-${asset.id}`,
        title: asset.nextAction,
        category: "Revenue OS",
        priority: score >= 30 ? "High" : score >= 24 ? "Medium" : "Low",
        dueInDays: score >= 30 ? 1 : score >= 24 ? 3 : 7,
        sourceAsset: asset.name,
        sourceAssetId: asset.id,
      };
    });
}
