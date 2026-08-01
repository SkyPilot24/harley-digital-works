export type DomainPriority = "High" | "Medium" | "Low";

export type DomainAsset = {
  name: string;
  category: string;
  priority: DomainPriority;
  suggestedAsk: string;
  quickSale: string;
  targetBuyer: string;
  useCase: string;
  nextAction: string;
  caution?: string;
};

export const domainPortfolio: DomainAsset[] = [
  {
    name: "valuecurrencies.com",
    category: "Finance",
    priority: "High",
    suggestedAsk: "GBP 2,500-7,500",
    quickSale: "GBP 750-1,500",
    targetBuyer:
      "Fintech publisher, currency comparison site, newsletter, or financial education brand.",
    useCase: "A value-led currency education, FX insights, or alternative money publication.",
    nextAction: "List on Afternic/Sedo with buy-now pricing and prepare a fintech buyer list.",
  },
  {
    name: "5gdata.org",
    category: "Telecoms",
    priority: "High",
    suggestedAsk: "GBP 1,500-4,000",
    quickSale: "GBP 500-1,000",
    targetBuyer: "Telecoms analyst, connectivity consultancy, IoT data publisher, or trade body.",
    useCase: "Research hub for 5G data, IoT connectivity, or enterprise network insights.",
    nextAction: "Contact telecoms newsletters, IoT consultancies, and data research publishers.",
  },
  {
    name: "aiwearables.co.uk",
    category: "AI / Wearables",
    priority: "High",
    suggestedAsk: "GBP 1,250-3,500",
    quickSale: "GBP 400-900",
    targetBuyer: "UK wearable startup, affiliate site, health-tech founder, or ecommerce operator.",
    useCase: "A UK store, review site, or content brand for AI-enabled wearable devices.",
    nextAction: "Create a short sales note for wearable, health-tech, and AI gadget companies.",
  },
  {
    name: "myartificialintelligence.co.uk",
    category: "AI",
    priority: "High",
    suggestedAsk: "GBP 1,000-3,000",
    quickSale: "GBP 350-800",
    targetBuyer:
      "AI training provider, AI consultant, education brand, or consumer AI tool directory.",
    useCase: "Friendly UK-facing AI education, consultancy, or personal AI assistant brand.",
    nextAction: "Pitch to UK AI trainers and consultants with a simple landing-page concept.",
  },
  {
    name: "yourartificialintelligence.co.uk",
    category: "AI",
    priority: "Medium",
    suggestedAsk: "GBP 750-2,000",
    quickSale: "GBP 250-600",
    targetBuyer: "AI consultant, training business, or personal productivity product.",
    useCase: "A human-sounding AI training or assistant brand.",
    nextAction: "Bundle with myartificialintelligence.co.uk for a stronger AI naming package.",
  },
  {
    name: "virtualavatars.co.uk",
    category: "AI / Avatars",
    priority: "High",
    suggestedAsk: "GBP 1,000-3,000",
    quickSale: "GBP 350-800",
    targetBuyer: "Avatar SaaS, video tool, training platform, or digital identity startup.",
    useCase: "A UK brand for AI avatars, virtual presenters, or digital identity tools.",
    nextAction:
      "Research avatar/video AI companies and list the domain with a clear use-case page.",
  },
  {
    name: "driveautonomous.org",
    category: "Autonomous Vehicles",
    priority: "Medium",
    suggestedAsk: "GBP 750-2,000",
    quickSale: "GBP 250-600",
    targetBuyer: "Autonomous vehicle advocacy group, safety initiative, or industry publication.",
    useCase: "Education or policy hub for autonomous driving.",
    nextAction: "Bundle with the other autonomous-driving names for one buyer conversation.",
  },
  {
    name: "driveautonomously.co.uk",
    category: "Autonomous Vehicles",
    priority: "Medium",
    suggestedAsk: "GBP 500-1,500",
    quickSale: "GBP 150-400",
    targetBuyer: "UK driving-tech brand, mobility educator, or autonomous vehicle blog.",
    useCase: "Consumer education around self-driving and assisted driving.",
    nextAction: "Bundle with driveautonomous.org, drivingautonomous.org, and self-driving names.",
  },
  {
    name: "drivingautonomous.org",
    category: "Autonomous Vehicles",
    priority: "Medium",
    suggestedAsk: "GBP 500-1,500",
    quickSale: "GBP 150-400",
    targetBuyer: "Mobility publisher, research group, or transport safety organisation.",
    useCase: "Autonomous-driving commentary, safety education, or policy content.",
    nextAction: "Add to autonomous bundle and target mobility organisations.",
  },
  {
    name: "myselfdrivingcar.co.uk",
    category: "Autonomous Vehicles",
    priority: "Medium",
    suggestedAsk: "GBP 500-1,500",
    quickSale: "GBP 150-400",
    targetBuyer: "UK car content site, EV dealer, or autonomous vehicle education brand.",
    useCase: "Consumer-friendly guide to self-driving cars.",
    nextAction: "Bundle with myselfdriving.co.uk and pitch as a consumer education pair.",
  },
  {
    name: "myselfdriving.co.uk",
    category: "Autonomous Vehicles",
    priority: "Medium",
    suggestedAsk: "GBP 400-1,200",
    quickSale: "GBP 100-300",
    targetBuyer: "Self-driving content brand, mobility blogger, or assisted-driving guide.",
    useCase: "Short consumer brand for self-driving topics.",
    nextAction: "Bundle with myselfdrivingcar.co.uk.",
  },
  {
    name: "greenautomotive.co.uk",
    category: "Green Transport",
    priority: "Medium",
    suggestedAsk: "GBP 750-2,000",
    quickSale: "GBP 250-600",
    targetBuyer: "EV dealer, fleet consultancy, green transport publication, or installer.",
    useCase: "UK green automotive news, reviews, or lead generation.",
    nextAction: "Target EV dealers and fleet consultancies.",
  },
  {
    name: "drivinggreen.co.uk",
    category: "Green Transport",
    priority: "Medium",
    suggestedAsk: "GBP 500-1,500",
    quickSale: "GBP 150-400",
    targetBuyer: "Eco-driving trainer, EV blog, or green fleet consultant.",
    useCase: "Consumer-friendly eco-driving and EV content brand.",
    nextAction: "Bundle with greenautomotive.co.uk.",
  },
  {
    name: "valuedrones.co.uk",
    category: "Drones",
    priority: "Medium",
    suggestedAsk: "GBP 500-1,500",
    quickSale: "GBP 150-400",
    targetBuyer: "Drone retailer, review site, training provider, or affiliate publisher.",
    useCase: "UK drone reviews, deals, or buyer guides.",
    nextAction: "Contact drone retailers and training providers.",
  },
  {
    name: "roboticpharmacist.co.uk",
    category: "Health Tech",
    priority: "Medium",
    suggestedAsk: "GBP 500-1,500",
    quickSale: "GBP 150-400",
    targetBuyer: "Pharmacy automation vendor, health-tech publisher, or robotics researcher.",
    useCase: "Healthcare automation thought leadership or pharmacy robotics content.",
    nextAction: "Pitch carefully to pharmacy automation companies.",
  },
  {
    name: "theiotshop.co.uk",
    category: "IoT",
    priority: "Medium",
    suggestedAsk: "GBP 500-1,500",
    quickSale: "GBP 150-400",
    targetBuyer: "IoT ecommerce store, smart-home seller, or B2B devices reseller.",
    useCase: "Straightforward UK shop name for IoT and smart devices.",
    nextAction: "Contact smart-home and IoT ecommerce operators.",
  },
  {
    name: "mydigitalhouse.co.uk",
    category: "Smart Home",
    priority: "Medium",
    suggestedAsk: "GBP 400-1,200",
    quickSale: "GBP 100-300",
    targetBuyer: "Smart-home installer, home automation consultant, or proptech service.",
    useCase: "Residential smart-home advice, installation, or product comparison.",
    nextAction: "Bundle with theiotshop.co.uk for smart-home buyers.",
  },
  {
    name: "letscarshop.co.uk",
    category: "Automotive",
    priority: "Low",
    suggestedAsk: "GBP 250-900",
    quickSale: "GBP 75-200",
    targetBuyer: "Used car dealer, local car marketplace, or automotive lead-gen site.",
    useCase: "Friendly UK car-shopping lead generation brand.",
    nextAction: "List with modest buy-now pricing.",
  },
  {
    name: "buyblockchaincurrency.co.uk",
    category: "Crypto",
    priority: "Low",
    suggestedAsk: "GBP 250-900",
    quickSale: "GBP 75-200",
    targetBuyer: "Crypto education site or affiliate publisher.",
    useCase: "Long-tail educational site for buying blockchain currency.",
    nextAction: "List passively; avoid overinvesting outreach time.",
  },
  {
    name: "value-lights.co.uk",
    category: "Retail",
    priority: "Low",
    suggestedAsk: "GBP 200-700",
    quickSale: "GBP 50-150",
    targetBuyer: "Lighting retailer, discount lighting ecommerce shop, or affiliate site.",
    useCase: "Budget lighting shop or comparison site.",
    nextAction: "List passively with a low buy-now price.",
  },
  {
    name: "bristol2020.co.uk",
    category: "Geo / Event",
    priority: "Low",
    suggestedAsk: "GBP 100-400",
    quickSale: "GBP 25-100",
    targetBuyer: "Local archive, community project, or campaign owner.",
    useCase: "Archive or redirect for Bristol 2020 activity.",
    nextAction: "Keep only if renewal is cheap; otherwise consider dropping.",
  },
  {
    name: "wales2020.co.uk",
    category: "Geo / Event",
    priority: "Low",
    suggestedAsk: "GBP 100-400",
    quickSale: "GBP 25-100",
    targetBuyer: "Welsh archive, campaign, or community project.",
    useCase: "Archive or redirect for Wales 2020 activity.",
    nextAction: "Passive listing only.",
  },
  {
    name: "trends2020.co.uk",
    category: "Archive",
    priority: "Low",
    suggestedAsk: "GBP 100-300",
    quickSale: "GBP 25-75",
    targetBuyer: "Trend archive or content project.",
    useCase: "Historical trend archive.",
    nextAction: "Passive listing only.",
  },
  {
    name: "recession2020.co.uk",
    category: "Archive",
    priority: "Low",
    suggestedAsk: "GBP 100-300",
    quickSale: "GBP 25-75",
    targetBuyer: "Economic archive, blogger, or campaign owner.",
    useCase: "Historical content around the 2020 recession period.",
    nextAction: "Passive listing only.",
  },
  {
    name: "tokoyo2020.co.uk",
    category: "Event",
    priority: "Low",
    suggestedAsk: "GBP 50-200",
    quickSale: "GBP 10-50",
    targetBuyer: "Unclear due to likely spelling issue.",
    useCase: "Likely typo of Tokyo 2020; value is limited.",
    nextAction: "Check spelling and renewal cost before investing time.",
    caution: "Likely typo; verify it is intentional.",
  },
  {
    name: "theolympics2020.co.uk",
    category: "Event",
    priority: "Low",
    suggestedAsk: "Do not actively market",
    quickSale: "N/A",
    targetBuyer: "Not recommended for outbound sale.",
    useCase: "Potential trademark-sensitive term.",
    nextAction: "Review trademark risk before listing or renewing.",
    caution: "Contains Olympics wording; handle carefully.",
  },
  {
    name: "disneynostalgia.co.uk",
    category: "Entertainment",
    priority: "Low",
    suggestedAsk: "Do not actively market",
    quickSale: "N/A",
    targetBuyer: "Not recommended for outbound sale.",
    useCase: "Potential fan/archive use, but trademark-sensitive.",
    nextAction: "Review trademark risk before listing or renewing.",
    caution: "Contains Disney wording; handle carefully.",
  },
  {
    name: "baggasm.co.uk",
    category: "Retail",
    priority: "Low",
    suggestedAsk: "GBP 100-500",
    quickSale: "GBP 25-100",
    targetBuyer: "Bag retailer or novelty fashion brand.",
    useCase: "Memorable but polarising bag ecommerce name.",
    nextAction: "List passively; only renew if you like the brand angle.",
  },
  {
    name: "douladeliveryhobart",
    category: "Needs Review",
    priority: "Low",
    suggestedAsk: "Needs TLD check",
    quickSale: "Needs TLD check",
    targetBuyer: "Birth support provider in Hobart if this is a full domain.",
    useCase: "Local doula delivery or birth support lead generation.",
    nextAction: "Confirm the full domain extension before pricing.",
    caution: "No extension was provided.",
  },
];

export const domainBundles = [
  {
    name: "AI names",
    domains: [
      "aiwearables.co.uk",
      "myartificialintelligence.co.uk",
      "yourartificialintelligence.co.uk",
      "virtualavatars.co.uk",
    ],
    action: "Pitch as a package to AI training, avatar, and wearable startups.",
  },
  {
    name: "Autonomous driving names",
    domains: [
      "driveautonomous.org",
      "driveautonomously.co.uk",
      "drivingautonomous.org",
      "myselfdrivingcar.co.uk",
      "myselfdriving.co.uk",
    ],
    action: "Pitch as one mobility education or autonomous-vehicle content package.",
  },
  {
    name: "Green transport names",
    domains: ["greenautomotive.co.uk", "drivinggreen.co.uk"],
    action: "Pitch to EV dealers, fleet consultants, and green motoring publishers.",
  },
  {
    name: "Smart device names",
    domains: ["5gdata.org", "theiotshop.co.uk", "mydigitalhouse.co.uk", "valuedrones.co.uk"],
    action: "Pitch to IoT, smart-home, drone, and connectivity operators.",
  },
];

export function priorityRank(priority: DomainPriority) {
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  return 1;
}

export function rankedDomains(domains: DomainAsset[] = domainPortfolio) {
  return [...domains].sort(
    (a, b) => priorityRank(b.priority) - priorityRank(a.priority) || a.name.localeCompare(b.name),
  );
}

export const domainBuyNowPrices: Record<string, number | null> = {
  "valuecurrencies.com": 4995,
  "5gdata.org": 2495,
  "aiwearables.co.uk": 1995,
  "myartificialintelligence.co.uk": 1795,
  "virtualavatars.co.uk": 1795,
  "yourartificialintelligence.co.uk": 1295,
  "driveautonomous.org": 1495,
  "driveautonomously.co.uk": 995,
  "drivingautonomous.org": 995,
  "myselfdrivingcar.co.uk": 995,
  "myselfdriving.co.uk": 795,
  "greenautomotive.co.uk": 1495,
  "drivinggreen.co.uk": 995,
  "valuedrones.co.uk": 995,
  "roboticpharmacist.co.uk": 995,
  "theiotshop.co.uk": 995,
  "mydigitalhouse.co.uk": 795,
  "letscarshop.co.uk": 495,
  "buyblockchaincurrency.co.uk": 495,
  "value-lights.co.uk": 395,
  "bristol2020.co.uk": 195,
  "wales2020.co.uk": 195,
  "trends2020.co.uk": 145,
  "recession2020.co.uk": 145,
  "tokoyo2020.co.uk": 95,
  "baggasm.co.uk": 195,
  "theolympics2020.co.uk": null,
  "disneynostalgia.co.uk": null,
  douladeliveryhobart: null,
};

export function getDomainBuyNowPrice(domainName: string) {
  return domainBuyNowPrices[domainName] ?? null;
}

export function formatGbp(value: number | null) {
  if (!value) return "Enquire only";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}
