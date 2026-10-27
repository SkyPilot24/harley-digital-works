export type PortfolioItemType = "concept" | "verified_client";

export interface BeforeDesign {
  title: string;
  urlPlaceholder: string;
  headline: string;
  subheadline: string;
  flaws: string[];
  mobileIssues: string[];
  colorScheme: {
    bg: string;
    headerBg: string;
    text: string;
    accent: string;
  };
}

export interface AfterDesign {
  title: string;
  urlPlaceholder: string;
  headline: string;
  subheadline: string;
  accentWord?: string;
  badge: string;
  keyFeatures: string[];
  conversionBoosters: string[];
  callToAction: string;
  secondaryCta: string;
  colorScheme: {
    bg: string;
    heroBg: string;
    text: string;
    accent: string;
  };
}

export interface PortfolioTransformation {
  id: string;
  type: PortfolioItemType;
  tradeSlug: string;
  tradeName: string;
  industry: string;
  locationContext: string;
  summary: string;
  before: BeforeDesign;
  after: AfterDesign;
  commercialBenefits: {
    beforeSummary: string;
    afterSummary: string;
    potentialImpact: string;
  };
  tags: string[];
}

export type PortfolioDesignStudy = PortfolioTransformation;

export const PORTFOLIO_TRANSFORMATIONS: PortfolioTransformation[] = [
  {
    id: "heating-plumbing",
    type: "concept",
    tradeSlug: "heating-engineers",
    tradeName: "Plumbing & Heating",
    industry: "Boiler Installation, Servicing & Heat Pumps",
    locationContext: "Bristol, Bath & North Somerset",
    summary:
      "A design study showing a cluttered, text-heavy plumbing page redesigned into a clear heating and boiler specialist website.",
    before: {
      title: "Dave's Plumbing & Heating Services",
      urlPlaceholder: "http://daves-plumbing-bristol.mysite.co.uk",
      headline: "ALL PLUMBING & HEATING WORK UNDERTAKEN - NO JOB TOO BIG OR SMALL!!",
      subheadline:
        "Call Dave on his mobile anytime. 24/7 call out, leaks, taps, radiators, boilers, gas certificates. Download our 12-page pricing PDF brochure.",
      flaws: [
        "Unformatted wall of text with flashing red emergency banners and yellow highlights",
        "No visible Gas Safe registration number or proof of public liability insurance",
        "Generic mobile number with no click-to-call functionality or WhatsApp route",
        "14-field enquiry questionnaire asking for boiler model numbers before basic contact",
      ],
      mobileIssues: [
        "Desktop-only horizontal table that requires continuous pinch-zooming on phones",
        "Tiny unclickable text links clustered tightly together",
        "Enquiry button pushed far off-screen below 2,000 words of unindexed copy",
      ],
      colorScheme: {
        bg: "#0f172a",
        headerBg: "#1e293b",
        text: "#cbd5e1",
        accent: "#ef4444",
      },
    },
    after: {
      title: "Severn & Vale Heating Engineers",
      urlPlaceholder: "https://severnvaleheating.co.uk",
      headline: "Warmth you can rely on.",
      subheadline:
        "Accredited boiler installations, annual servicing, and emergency breakdown response across Bristol & Bath.",
      accentWord: "Fixed written quotes.",
      badge: "Gas Safe Reg. No. [your number] · Which? Trusted Trader",
      keyFeatures: [
        "Instant emergency triage bar with live on-call engineer indicator",
        "Transparent boiler replacement price guide with fixed written quotes",
        "Verified Gas Safe accreditation badge with one-click credential verification",
        "1-tap WhatsApp triage allowing homeowners to send photos of leaking valves",
      ],
      conversionBoosters: [
        "Mobile-optimised 3-field quick quote form with same-day confirmation",
        "Clear service radius map covering Bristol, Keynsham, Bath, and Portishead",
        "10-year manufacturer warranty reassurance prominently positioned beside pricing",
      ],
      callToAction: "Request a Fixed Boiler Quote",
      secondaryCta: "Emergency Callout: 01632 960480",
      colorScheme: {
        bg: "#f8fafc",
        heroBg: "#0f172a",
        text: "#0f172a",
        accent: "#ea580c",
      },
    },
    commercialBenefits: {
      beforeSummary:
        "Visitors struggle to confirm Gas Safe credentials, see clear boiler prices, or quickly request assistance from a mobile phone.",
      afterSummary:
        "A crisp, mobile-first experience makes accreditation obvious, explains boiler packages clearly, and offers straightforward contact options.",
      potentialImpact:
        "Designed to help turn local searchers into confirmed boiler replacement and servicing enquiries.",
    },
    tags: ["Heating", "Boilers", "Gas Safe", "Bristol"],
  },
  {
    id: "electrical-ev",
    type: "concept",
    tradeSlug: "electricians",
    tradeName: "Electrical Services",
    industry: "Domestic, Commercial & EV Charging Solutions",
    locationContext: "Greater Manchester & Cheshire",
    summary:
      "A design study showing an amateur domestic electrician page redesigned into an authoritative commercial and smart EV installation company presence.",
    before: {
      title: "Sparky Dave Electrical Bristol",
      urlPlaceholder: "http://sparkydave-electrician.freehost.com",
      headline: "CHEAPEST ELECTRICIAN IN TOWN - 24HR REWIRES & FUSEBOARDS",
      subheadline:
        "No job too small! Ring Steve on 07700 900123. Sockets, lighting, faults, testing. Email me at sparky_dave1984@hotmail.co.uk.",
      flaws: [
        "Unregulated claims ('Cheapest in town') that repel high-value commercial clients",
        "Hotmail email address that creates immediate credibility doubts",
        "No mention of 18th Edition wiring regulations or OZEV EV installer accreditations",
        "Disorganised list of 30 bulleted items without photos of clean commercial work",
      ],
      mobileIssues: [
        "Phone number is plain static text that cannot be tapped to dial",
        "Tiny buttons impossible to press accurately with one hand on a phone",
        "Slow-loading uncompressed images of unfinished building sites",
      ],
      colorScheme: {
        bg: "#111827",
        headerBg: "#1f2937",
        text: "#e5e7eb",
        accent: "#f59e0b",
      },
    },
    after: {
      title: "Vanguard Electrical & Renewable",
      urlPlaceholder: "https://vanguardelectrical.co.uk",
      headline: "Precision power.",
      subheadline:
        "NICEIC approved electrical contractors specialising in commercial fit-outs, EICR certification, and smart workplace EV charging infrastructure.",
      accentWord: "Engineered for compliance.",
      badge: "NICEIC Approved Contractor · OZEV Authorised · ECA Member",
      keyFeatures: [
        "Commercial and domestic service segmentation with transparent project scopes",
        "Dedicated EV charger & battery storage selector with grant guidance",
        "Instant EICR landlord certificate booking system with digital PDF dispatch",
        "Prominent NICEIC badge and public liability insurance verification",
      ],
      conversionBoosters: [
        "Tap-to-call mobile header with responsive emergency triage notice",
        "Interactive electrical scope questionnaire tailored for property managers",
        "Case study photographs demonstrating neat, laser-level consumer unit installations",
      ],
      callToAction: "Book an Electrical Assessment",
      secondaryCta: "Emergency Response: 0161 496 0910",
      colorScheme: {
        bg: "#ffffff",
        heroBg: "#0b1329",
        text: "#0b1329",
        accent: "#0284c7",
      },
    },
    commercialBenefits: {
      beforeSummary:
        "Positioned as a low-margin domestic repairman; commercial facilities managers and EV buyers bounced immediately.",
      afterSummary:
        "Establishes institutional authority, technical compliance, and clear pathways for commercial contracts and EV installations.",
      potentialImpact:
        "Attracts higher-ticket corporate and commercial work alongside steady domestic inspection enquiries.",
    },
    tags: ["Electrical", "NICEIC", "EV Charging", "Commercial"],
  },
  {
    id: "roofing-leadwork",
    type: "concept",
    tradeSlug: "roofing",
    tradeName: "Roofing",
    industry: "Pitched Slate, Flat Roofing & Heritage Leadwork",
    locationContext: "Cotswolds, Bath & Wiltshire",
    summary:
      "A design study showing a generic roofing template redesigned into a master roofing craftsman brand that reflects heritage slate and tile standards.",
    before: {
      title: "Fast-Fit Roofing UK",
      urlPlaceholder: "http://fastfitroofers-local.co.uk",
      headline: "BEST ROOF REPAIRS IN 1 HOUR! SPECIAL DISCOUNT TODAY ONLY!!",
      subheadline:
        "Don't let rogue traders rip you off, call us! Tile replacement, chimney stacks, moss removal, felt roofs. Free quotes within 5 miles.",
      flaws: [
        "High-pressure sales banners ('Today only!') that trigger rogue trader anxiety",
        "Stock photos of American shingle houses that look completely fake in the UK",
        "Vague trading address with no physical workshop or verifiable registered company details",
        "No details on roofing warranties, insurance backed guarantees, or slate provenance",
      ],
      mobileIssues: [
        "Unresponsive pop-ups that block the screen on smartphones and cannot be closed",
        "Slow loading times causing visitors experiencing leaks to leave immediately",
        "No simple method to upload photos of storm damage or leaking chimneys",
      ],
      colorScheme: {
        bg: "#18181b",
        headerBg: "#27272a",
        text: "#e4e4e7",
        accent: "#dc2626",
      },
    },
    after: {
      title: "Peak & Slate Roofing Craftsmen",
      urlPlaceholder: "https://peakslateroofing.co.uk",
      headline: "Built to weather generations.",
      subheadline:
        "Specialist Welsh slate, Cotswold stone tiling, and heritage leadwork with insurance-backed workmanship across Bath & the Cotswolds.",
      accentWord: "Master craftsmanship.",
      badge: "NFRC Member · CompetentRoofer Certified · Insured",
      keyFeatures: [
        "High-resolution inspection imagery and completed heritage slate portfolios",
        "Interactive storm damage & roof replacement diagnostic wizard with photo upload",
        "Clear insurance-backed workmanship guarantee explanation",
        "Detailed breakdown of materials: Welsh slate, clay pantiles, and code 5 leadwork",
      ],
      conversionBoosters: [
        "Emergency storm-triage button with responsive weatherproofing dispatch",
        "Transparent schedule expectations and written fixed-price quotations",
        "Direct communication with the master roofer",
      ],
      callToAction: "Request a Roof Inspection & Quote",
      secondaryCta: "Storm Triage: 01632 960180",
      colorScheme: {
        bg: "#f8fafc",
        heroBg: "#1c1917",
        text: "#1c1917",
        accent: "#d97706",
      },
    },
    commercialBenefits: {
      beforeSummary:
        "Homeowners suspecting poor quality hesitated to book site visits; high-end slate projects went to established regional firms.",
      afterSummary:
        "Showcases craftsmanship, inspection rigor, and authentic UK materials, converting reroofing briefs.",
      potentialImpact:
        "Positions the firm for full reroofing contracts rather than emergency gutter patches.",
    },
    tags: ["Roofing", "Slate & Tile", "Leadwork", "Heritage"],
  },
  {
    id: "building-renovations",
    type: "concept",
    tradeSlug: "builders",
    tradeName: "Building & Renovations",
    industry: "Bespoke Extensions, Loft Conversions & Structural Remodels",
    locationContext: "Bristol, Clifton & Somerset",
    summary:
      "A design study showing a general builder page redesigned into an architectural extension specialist website.",
    before: {
      title: "Bobs Building & Joinery Ltd",
      urlPlaceholder: "http://bobsbuilding-repairs.wixsite.com/home",
      headline: "ALL GENERAL BUILDING WORK - BRICKWORK, PLASTER, EXTENSIONS, ROOFS",
      subheadline:
        "Friendly local builders. Free estimates on all jobs. Ring Bob on the mobile. Check out our photos page for recent jobs.",
      flaws: [
        "Messy gallery of low-res photos showing demolition sites and rubble skips",
        "No mention of architectural coordination, structural engineers, or building control sign-offs",
        "Amateur free Wix subdomain that signals an unestablished business",
        "Vague estimates without structured project stages or contracts",
      ],
      mobileIssues: [
        "Unresponsive photo carousel that crashes mobile Safari browsers",
        "Contact form with missing submit validation that drops enquiries silently",
        "No structured breakdown of past projects or build timeframes",
      ],
      colorScheme: {
        bg: "#09090b",
        headerBg: "#18181b",
        text: "#d4d4d8",
        accent: "#e11d48",
      },
    },
    after: {
      title: "Oakwood Architectural Builders",
      urlPlaceholder: "https://oakwoodbuilders.co.uk",
      headline: "Space to live. Room to dream.",
      subheadline:
        "Bespoke residential extensions, structural renovations, and architectural transformations delivered with transparent project management across Bristol.",
      accentWord: "Considered craft.",
      badge: "Federation of Master Builders (FMB) · TrustMark Endorsed",
      keyFeatures: [
        "Full case-study format showing before, during, and finished architectural extensions",
        "Transparent 5-stage build process from architectural plans to final building control sign-off",
        "Fixed-schedule milestone commitments and structured payment plans",
        "Integrated architect and structural engineer collaboration workflow",
      ],
      conversionBoosters: [
        "Feasibility enquiry consultation questionnaire capturing timeline, drawings, and budget tier",
        "Dedicated advice guide for navigating local planning permission and permitted development",
        "Professional mobile portfolio showing natural timber, Crittall glass, and polished concrete finishes",
      ],
      callToAction: "Book a Project Feasibility Consultation",
      secondaryCta: "Explore Extension Case Studies",
      colorScheme: {
        bg: "#fcfbf9",
        heroBg: "#18181b",
        text: "#18181b",
        accent: "#0d9488",
      },
    },
    commercialBenefits: {
      beforeSummary:
        "Homeowners planning major extensions felt uncomfortable entrusting their investment to an unverified builder with an amateur website.",
      afterSummary:
        "Architectural presentation, FMB membership proof, and clear structural stage guides attract private residential clients.",
      potentialImpact:
        "Filters out low-margin odd jobs and positions the company for full turnkey residential builds.",
    },
    tags: ["Building", "Extensions", "FMB", "Renovation"],
  },
  {
    id: "landscaping-gardens",
    type: "concept",
    tradeSlug: "landscaping",
    tradeName: "Landscaping & Gardening",
    industry: "Outdoor Living Spaces, Porcelain Patios & Garden Design",
    locationContext: "Gloucestershire & Somerset",
    summary:
      "A design study showing a basic gardening noticeboard redesigned into a landscape architecture and outdoor living studio website.",
    before: {
      title: "Green Grass & Paving Dave",
      urlPlaceholder: "http://greengrass-bristol.blogspot.com",
      headline: "GARDENING & DRIVEWAYS - CALL FOR FREE MEASURE UP",
      subheadline:
        "Grass cutting, hedge trimming, weed killing, slabs laid, fence posts replaced. Ring my home phone in the evenings after 6pm.",
      flaws: [
        "Mixed low-margin domestic maintenance with high-end porcelain paving projects",
        "No project gallery, only blurry photos of muddy lawns before seeding",
        "Evening-only contact restrictions that frustrate busy professional clients",
        "Zero information on drainage design, sub-base specifications, or material provenance",
      ],
      mobileIssues: [
        "Blogspot layout with non-responsive sidebar that cuts off contact details",
        "Small clickable links that cause accidental clicks to external adverts",
        "No interactive quote pathway or project specification tool",
      ],
      colorScheme: {
        bg: "#064e3b",
        headerBg: "#065f46",
        text: "#d1fae5",
        accent: "#84cc16",
      },
    },
    after: {
      title: "Meadow & Stone Landscapes",
      urlPlaceholder: "https://meadowandstonelandscapes.co.uk",
      headline: "Outdoor living, crafted for seasons.",
      subheadline:
        "Bespoke garden design, Italian porcelain paving, architectural planting, and contemporary outdoor kitchens across the South West.",
      accentWord: "Natural distinction.",
      badge: "BALI Registered Contractor · Marshalls Approved Installer",
      keyFeatures: [
        "Curated portfolio of porcelain terraces, cedar pergolas, and architectural planting plans",
        "Clear 4-step design journey from initial 3D concept render to final soft landscaping",
        "Sub-base and drainage engineering breakdown showing longevity and weed prevention",
        "Transparent seasonal project timeline guides for spring/summer build reservations",
      ],
      conversionBoosters: [
        "1-minute garden project estimator with structured scope guidance",
        "Mobile-optimised walkthroughs of completed country garden transformations",
        "Marshalls installation guarantee badging to eliminate workmanship doubts",
      ],
      callToAction: "Book a Design Consultation",
      secondaryCta: "View South West Garden Portfolio",
      colorScheme: {
        bg: "#f4f7f4",
        heroBg: "#14281d",
        text: "#14281d",
        accent: "#4d7c0f",
      },
    },
    commercialBenefits: {
      beforeSummary:
        "Attracted budget-conscious lawn care queries; homeowners with substantial patio budgets booked landscape architects instead.",
      afterSummary:
        "Positions the business as an aspirational outdoor design studio with verified supplier approvals and engineering discipline.",
      potentialImpact:
        "Shifts the enquiry pipeline from basic maintenance visits to full garden design and installation projects.",
    },
    tags: ["Landscaping", "Porcelain Paving", "Garden Design", "BALI"],
  },
  {
    id: "painting-decorating",
    type: "concept",
    tradeSlug: "decorating",
    tradeName: "Painting & Decorating",
    industry: "High-End Interior Decorating, Heritage Sash Windows & Spray Finishes",
    locationContext: "Bath, Cheltenham & Wiltshire",
    summary:
      "A design study showing a basic trader page redesigned into a master decorating brand for heritage spray and wallpaper finishes.",
    before: {
      title: "Quick-Paint Painters Bristol",
      urlPlaceholder: "http://quickpaint-painters.mysite.org",
      headline: "FAST PAINTING - CHEAPEST PRICES IN TOWN! ROOMS FROM £120",
      subheadline:
        "Interior and exterior painting. Quick turnaround. Fast drying emulsion. Wallpaper hanging. Call Garry on 07700 900567 anytime.",
      flaws: [
        "Low pricing anchors ('£120 per room') that invite micro-managing bargain hunters",
        "Stock clip-art paint can graphics that look like an outdated collection",
        "No mention of surface preparation, dustless sanding, or heritage paint brands",
        "Zero photos of sharp cutting-in, sash window restoration, or clean, edge-to-edge wallpapering",
      ],
      mobileIssues: [
        "Unstyled mobile form where fields overflow beyond the screen width",
        "No photo attachment field to allow clients to send wall condition pictures",
        "Broken SSL certificate warning ('Not Secure') that scares off homeowners",
      ],
      colorScheme: {
        bg: "#1e1b4b",
        headerBg: "#312e81",
        text: "#e0e7ff",
        accent: "#ec4899",
      },
    },
    after: {
      title: "Crown & Bristle Fine Decorators",
      urlPlaceholder: "https://crownandbristle.co.uk",
      headline: "Flawless finishes. Lasting distinction.",
      subheadline:
        "Specialist interior decorating, heritage sash window restoration, and precision airless spray finishing using Farrow & Ball, Little Greene, and Mylands.",
      accentWord: "Craftsmanship in every coat.",
      badge: "Dulux Select Decorator · Painting & Decorating Association (PDA)",
      keyFeatures: [
        "Dustless extraction sanding demonstration ensuring clean home environments",
        "Authentic heritage colour palette pairings and bespoke architectural finish galleries",
        "Clear 5-step preparation process: filling, priming, micro-sanding, and dual topcoats",
        "Clear daily rate and fixed-room quotation models with zero hidden paint surcharges",
      ],
      conversionBoosters: [
        "Rapid photo enquiry tool allowing homeowners to upload room dimensions for instant quote triage",
        "Commercial and domestic portfolio showcasing period Georgian and Victorian properties",
        "PDA member badge and public liability insurance reassurance",
      ],
      callToAction: "Request a Room-by-Room Quotation",
      secondaryCta: "View Heritage Decorating Portfolio",
      colorScheme: {
        bg: "#faf8f5",
        heroBg: "#1e1e24",
        text: "#1e1e24",
        accent: "#b45309",
      },
    },
    commercialBenefits: {
      beforeSummary:
        "Attracted price-sensitive customers seeking quick touch-ups; period homeowners booking heritage decorators went elsewhere.",
      afterSummary:
        "Communicates dust-free preparation, heritage brand expertise, and perfectionism, justifying professional decorator rates.",
      potentialImpact:
        "Attracts whole-house interior contracts rather than single-room patch jobs.",
    },
    tags: ["Decorating", "Heritage", "Sash Windows", "PDA"],
  },
];

export const PORTFOLIO_DESIGN_STUDIES = PORTFOLIO_TRANSFORMATIONS;
