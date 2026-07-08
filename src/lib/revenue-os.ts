export type RevenueStream = "YouTube" | "Domains" | "Web Services" | "AI Automation" | "SaaS" | "Digital Products" | "Care Plans";

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
    nextAction: "Complete a full external website review, prioritise conversion fixes, and ship improvements that support lead capture and recurring revenue.",
    targetRevenue: 2000,
    mrrPotential: 750,
    scores: { revenuePotential: 5, speedToRevenue: 5, easeOfImplementation: 4, automationPotential: 4, scalability: 4, strategicFit: 5, recurringRevenuePotential: 4 },
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
    scores: { revenuePotential: 5, speedToRevenue: 4, easeOfImplementation: 4, automationPotential: 5, scalability: 5, strategicFit: 5, recurringRevenuePotential: 4 },
  },
  {
    id: "domains-top-10",
    name: "Publish premium sales pages for top domains",
    stream: "Domains",
    status: "Validating",
    owner: "Robert",
    nextAction: "Rank top 10 domains and write buyer-specific bundle use cases.",
    targetRevenue: 5000,
    mrrPotential: 250,
    scores: { revenuePotential: 4, speedToRevenue: 5, easeOfImplementation: 5, automationPotential: 3, scalability: 4, strategicFit: 5, recurringRevenuePotential: 3 },
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
    scores: { revenuePotential: 4, speedToRevenue: 5, easeOfImplementation: 5, automationPotential: 4, scalability: 4, strategicFit: 5, recurringRevenuePotential: 5 },
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
    scores: { revenuePotential: 5, speedToRevenue: 3, easeOfImplementation: 3, automationPotential: 5, scalability: 4, strategicFit: 5, recurringRevenuePotential: 5 },
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
    scores: { revenuePotential: 5, speedToRevenue: 2, easeOfImplementation: 3, automationPotential: 4, scalability: 5, strategicFit: 5, recurringRevenuePotential: 5 },
  },
];

export function priorityScore(scores: PriorityScores) {
  return Object.values(scores).reduce((total, score) => total + score, 0);
}

export function rankedRevenueAssets(assets: RevenueAsset[] = revenueAssets) {
  return [...assets].sort((a, b) => priorityScore(b.scores) - priorityScore(a.scores));
}

export function generateExecutionTasks(assets: RevenueAsset[] = revenueAssets, limit = 8): ExecutionTask[] {
  return rankedRevenueAssets(assets).slice(0, limit).map((asset) => {
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


