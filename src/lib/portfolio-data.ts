export type PortfolioItemType = "concept" | "verified_client";

export interface CommercialScenario {
  monthlyVisitors: number;
  conversionBefore: number;
  conversionAfter: number;
  enquiriesBefore: number;
  enquiriesAfter: number;
  monthlyExtraEnquiries: number;
  assumedAvgJobValue: string;
  illustrativeAnnualGain: string;
  assumptions: string[];
}

export interface FictionalTestimonial {
  quote: string;
  situation: string;
  intendedBenefit: string;
  businessOwner: string;
  tradingName: string;
  location: string;
  isFictional: true;
}

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
    commercialScenario: CommercialScenario;
  };
  supportingSocialProof: FictionalTestimonial;
  tags: string[];
}

export const PORTFOLIO_TRANSFORMATIONS: PortfolioTransformation[] = [
  {
    id: "heating-plumbing",
    type: "concept",
    tradeSlug: "heating-engineers",
    tradeName: "Plumbing & Heating",
    industry: "Boiler Installation, Servicing & Heat Pumps",
    locationContext: "Bristol, Bath & North Somerset",
    summary:
      "Transforming a cluttered, text-heavy 2008-era plumber’s page into a high-trust emergency heating & fixed-price combi boiler specialist website.",
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
        "Worcester Bosch & Vaillant accredited boiler installations, annual servicing, and emergency breakdown response across Bristol & Bath.",
      accentWord: "Fixed written quotes.",
      badge: "Gas Safe Registered #589214 · Which? Trusted Trader",
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
      secondaryCta: "Emergency Callout: 0117 910 2480",
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
        "A crisp, mobile-first experience makes accreditation obvious, explains boiler packages clearly, and offers instantaneous 1-tap contact.",
      potentialImpact:
        "Designed to help turn casual local searchers into confirmed, high-value boiler replacement and servicing enquiries.",
      commercialScenario: {
        monthlyVisitors: 450,
        conversionBefore: 1.1,
        conversionAfter: 3.3,
        enquiriesBefore: 5,
        enquiriesAfter: 15,
        monthlyExtraEnquiries: 10,
        assumedAvgJobValue: "£2,450 (Combi replacement)",
        illustrativeAnnualGain: "£8,575 / month gross potential pipeline",
        assumptions: [
          "Illustrative scenario based on typical UK local search volume for suburban heating services",
          "Assumes 35% enquiry-to-sale close rate at an average replacement job ticket of £2,450",
          "Hypothetical calculation for illustrative planning purposes — not a guaranteed commercial result",
        ],
      },
    },
    supportingSocialProof: {
      quote:
        "“Before our new website, 80% of calls were tyre-kickers asking for free advice. The clear boiler packages and Gas Safe verification mean customers now call ready to book a site survey.”",
      situation:
        "Outdated 1-page website created in 2012; lost high-margin boiler installations to national aggregators.",
      intendedBenefit:
        "Clear service tiers, verified credentials, and mobile click-to-call triage.",
      businessOwner: "Illustrative scenario: Bristol Heating Specialist",
      tradingName: "Concept: Severn & Vale Heating",
      location: "Bristol & South Gloucestershire",
      isFictional: true,
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
      "Upgrading an amateur domestic electrician site into an authoritative NICEIC-approved commercial & smart EV installation company presence.",
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
        "Prominent NICEIC badge and £5M public liability insurance verification",
      ],
      conversionBoosters: [
        "Tap-to-call mobile header with average 45-minute emergency response notice",
        "Interactive electrical scope questionnaire tailored for property managers",
        "Case study photographs demonstrating neat, laser-level consumer unit installations",
      ],
      callToAction: "Book an Electrical Assessment",
      secondaryCta: "Emergency Response: 0161 820 4910",
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
        "Establishes institutional authority, technical compliance, and clear pathways for commercial contracts and £800+ EV installations.",
      potentialImpact:
        "Attracts higher-ticket corporate and commercial work alongside steady domestic inspection revenue.",
      commercialScenario: {
        monthlyVisitors: 550,
        conversionBefore: 1.4,
        conversionAfter: 3.8,
        enquiriesBefore: 8,
        enquiriesAfter: 21,
        monthlyExtraEnquiries: 13,
        assumedAvgJobValue: "£980 (Weighted average across EV & commercial)",
        illustrativeAnnualGain: "£4,459 / month gross potential pipeline",
        assumptions: [
          "Illustrative scenario based on typical UK trade search volumes for EV charging & commercial electrical services",
          "Assumes 35% close rate on qualified enquiries with a blended job value of £980",
          "Hypothetical calculation for illustrative planning purposes — not a guaranteed commercial result",
        ],
      },
    },
    supportingSocialProof: {
      quote:
        "“Commercial facility managers used to ignore us because our website looked like a one-man-band. The new site positioned us as approved contractors, and we secured two commercial maintenance accounts in the first quarter.”",
      situation:
        "Competent NICEIC electrician struggling to win higher-margin commercial contracts due to dated web appearance.",
      intendedBenefit:
        "Clean, corporate presentation, accreditation transparency, and structured commercial RFQ forms.",
      businessOwner: "Illustrative scenario: NICEIC Electrical Contractor",
      tradingName: "Concept: Vanguard Electrical & Renewable",
      location: "Manchester & Cheshire",
      isFictional: true,
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
      "Transforming a scam-vulnerable 'cheap roofer' template into a master roofing craftsman brand that commands premium fees for heritage tile & slate builds.",
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
        "Specialist Welsh slate, Cotswold stone tiling, and heritage leadwork with a 25-year insurance-backed guarantee across Bath & the Cotswolds.",
      accentWord: "Master craftsmanship.",
      badge: "NFRC Member · CompetentRoofer Certified · £5M Liability Insured",
      keyFeatures: [
        "High-resolution drone inspection imagery and completed heritage slate portfolios",
        "Interactive storm damage & roof replacement diagnostic wizard with photo upload",
        "Clear 25-year insurance-backed workmanship guarantee explanation",
        "Detailed breakdown of materials: Welsh slate, clay pantiles, and code 5 leadwork",
      ],
      conversionBoosters: [
        "Emergency storm-triage button with guaranteed same-day weatherproofing dispatch",
        "Transparent schedule expectations and written fixed-price quotations",
        "Direct line to the Master Roofer rather than an outsourced call centre",
      ],
      callToAction: "Request a Roof Inspection & Quote",
      secondaryCta: "Storm Triage: 01225 740 180",
      colorScheme: {
        bg: "#f8fafc",
        heroBg: "#1c1917",
        text: "#1c1917",
        accent: "#d97706",
      },
    },
    commercialBenefits: {
      beforeSummary:
        "Homeowners suspecting cowboy builders hesitated to book site visits; high-end slate projects went to established regional firms.",
      afterSummary:
        "Showcases impeccable craftsmanship, drone inspection rigor, and authentic UK materials, converting high-ticket reroofing briefs.",
      potentialImpact:
        "Positions the firm for £10,000–£35,000 full reroofing contracts rather than sub-£200 emergency gutter patches.",
      commercialScenario: {
        monthlyVisitors: 380,
        conversionBefore: 0.9,
        conversionAfter: 2.8,
        enquiriesBefore: 3,
        enquiriesAfter: 11,
        monthlyExtraEnquiries: 8,
        assumedAvgJobValue: "£6,800 (Full slate/tile reroofing average)",
        illustrativeAnnualGain: "£13,600 / month gross potential pipeline",
        assumptions: [
          "Illustrative scenario based on UK regional roofing search patterns",
          "Assumes 25% close rate on qualified site surveys with an average ticket of £6,800",
          "Hypothetical calculation for illustrative planning purposes — not a guaranteed commercial result",
        ],
      },
    },
    supportingSocialProof: {
      quote:
        "“In roofing, trust is everything. Our old website looked like a fly-by-night operation. The new site with our NFRC credentials, drone photos, and written guarantee led to our biggest domestic contract in five years.”",
      situation:
        "High-skill roofing team losing large replacement projects because their digital presence did not match their standard of work.",
      intendedBenefit:
        "Drone inspection photography, insurance-backed guarantee prominence, and photo triage for quotes.",
      businessOwner: "Illustrative scenario: Heritage Slate Roofer",
      tradingName: "Concept: Peak & Slate Roofing Craftsmen",
      location: "Bath & The Cotswolds",
      isFictional: true,
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
      "Repositioning a general builder into a premier architectural extension specialist that homeowners trust with £60k–£150k structural transformations.",
    before: {
      title: "Bobs Building & Joinery Ltd",
      urlPlaceholder: "http://bobsbuilding-repairs.wixsite.com/home",
      headline: "ALL GENERAL BUILDING WORK - BRICKWORK, PLASTER, EXTENSIONS, ROOFS",
      subheadline:
        "Friendly local builders. Free estimates on all jobs. Ring Bob on the mobile. Check out our photos page for recent jobs.",
      flaws: [
        "Messy gallery of low-res photos showing messy demolition sites and rubble skips",
        "No mention of architectural coordination, structural engineers, or building control sign-offs",
        "Amateur free Wix subdomain that signals an unstable or under-capitalised business",
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
        "Homeowners planning £80,000 extensions felt uncomfortable entrusting their life savings to an unverified builder with a free Wix website.",
      afterSummary:
        "Editorial-grade architectural presentation, FMB membership proof, and clear structural stage guides attract high-budget private clients.",
      potentialImpact:
        "Filters out low-margin odd jobs and positions the company for full turnkey residential builds.",
      commercialScenario: {
        monthlyVisitors: 420,
        conversionBefore: 0.8,
        conversionAfter: 2.4,
        enquiriesBefore: 3,
        enquiriesAfter: 10,
        monthlyExtraEnquiries: 7,
        assumedAvgJobValue: "£65,000 (Average ground-floor rear extension)",
        illustrativeAnnualGain: "£45,500 / quarter gross potential pipeline",
        assumptions: [
          "Illustrative scenario based on UK residential extension and renovation demand",
          "Assumes 10% enquiry-to-contract close rate given large project values (£65,000 average build ticket)",
          "Hypothetical calculation for illustrative planning purposes — not a guaranteed commercial result",
        ],
      },
    },
    supportingSocialProof: {
      quote:
        "“Clients spending eighty grand on a rear extension want to see that you take craftsmanship seriously before they invite you into their home. The new site established our professional reputation and eliminated haggling over day rates.”",
      situation:
        "Master builder delivering top-tier structural work but losing lucrative architectural contracts to lesser builders with slicker branding.",
      intendedBenefit:
        "Architectural photography layout, transparent build phases, and FMB credential endorsement.",
      businessOwner: "Illustrative scenario: Master Builder & Renovator",
      tradingName: "Concept: Oakwood Architectural Builders",
      location: "Bristol & North Somerset",
      isFictional: true,
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
      "Transforming a 'lawn mowing and turf' noticeboard into a high-end landscape architecture and luxury outdoor living design studio website.",
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
        "1-minute garden project estimator with budget tier guidance (£15k to £50k+)",
        "Mobile-optimised video walk-throughs of completed country garden transformations",
        "Marshalls 10-year installation guarantee badging to eliminate workmanship doubts",
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
        "Attracted budget-conscious lawn care queries; homeowners with £25k patio budgets booked landscape architects instead.",
      afterSummary:
        "Positions the business as an aspirational outdoor design studio with verified supplier approvals and engineering discipline.",
      potentialImpact:
        "Shifts the enquiry pipeline from £40 maintenance visits to £15,000–£40,000 full garden transformations.",
      commercialScenario: {
        monthlyVisitors: 360,
        conversionBefore: 1.0,
        conversionAfter: 3.1,
        enquiriesBefore: 4,
        enquiriesAfter: 11,
        monthlyExtraEnquiries: 7,
        assumedAvgJobValue: "£18,500 (Full garden & porcelain patio project)",
        illustrativeAnnualGain: "£25,900 / month gross potential pipeline",
        assumptions: [
          "Illustrative scenario based on UK regional garden design & landscape construction search volumes",
          "Assumes 20% close rate on high-ticket design proposals (£18,500 average project ticket)",
          "Hypothetical calculation for illustrative planning purposes — not a guaranteed commercial result",
        ],
      },
    },
    supportingSocialProof: {
      quote:
        "“We were fed up competing on price for basic lawn work. The new website shifted us into the design-and-build bracket. We are now booking high-end porcelain patio projects three months in advance.”",
      situation: "Talented landscape team undervalued due to basic gardening branding.",
      intendedBenefit:
        "Aspirational imagery, 3D design consultation workflow, and Marshalls approved installer credential display.",
      businessOwner: "Illustrative scenario: Landscape Designer & Contractor",
      tradingName: "Concept: Meadow & Stone Landscapes",
      location: "Gloucestershire & Bristol",
      isFictional: true,
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
      "Elevating a 'cheap paint and roller' trader page into a master decorating brand that commands £400+/day rates for flawless heritage spray and wallpaper finishes.",
    before: {
      title: "Quick-Paint Painters Bristol",
      urlPlaceholder: "http://quickpaint-painters.mysite.org",
      headline: "FAST PAINTING - CHEAPEST PRICES IN TOWN! ROOMS FROM £120",
      subheadline:
        "Interior and exterior painting. Quick turnaround. Fast drying emulsion. Wallpaper hanging. Call Garry on 07911 234567 anytime.",
      flaws: [
        "Cheap pricing anchors ('£120 per room') that invite micro-managing bargain hunters",
        "Stock clip-art paint can graphics that look like a 1990s clip-art collection",
        "No mention of surface preparation, dustless sanding, or heritage paint brands",
        "Zero photos of sharp cutting-in, sash window restoration, or clean, edge-to-edge wallpapering",
      ],
      mobileIssues: [
        "Unstyled mobile form where fields overflow beyond the screen width",
        "No photo attachment field to allow clients to send wall condition pictures",
        "Broken SSL certificate warning ('Not Secure') that scares off affluent homeowners",
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
        "Dustless extraction sanding demonstration ensuring 99.8% dust-free home environments",
        "Authentic heritage colour palette pairings and bespoke architectural finish galleries",
        "Clear 5-step preparation process: filling, priming, micro-sanding, and dual topcoats",
        "Clear daily rate and fixed-room quotation models with zero hidden paint surcharges",
      ],
      conversionBoosters: [
        "Rapid photo enquiry tool allowing homeowners to upload room dimensions for instant quote triage",
        "Commercial and domestic portfolio showcasing period Georgian and Victorian properties",
        "PDA member badge and £2M public liability insurance reassurance",
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
        "Attracted price-sensitive customers seeking quick touch-ups; period homeowners booking Farrow & Ball decorators went elsewhere.",
      afterSummary:
        "Communicates dust-free preparation, heritage brand expertise, and perfectionism, justifying top-tier professional decorator rates.",
      potentialImpact:
        "Attracts whole-house interior contracts (£4,000–£12,000) rather than single-room patch jobs.",
      commercialScenario: {
        monthlyVisitors: 310,
        conversionBefore: 1.3,
        conversionAfter: 3.5,
        enquiriesBefore: 4,
        enquiriesAfter: 11,
        monthlyExtraEnquiries: 7,
        assumedAvgJobValue: "£3,200 (Multi-room period interior redecoration)",
        illustrativeAnnualGain: "£7,840 / month gross potential pipeline",
        assumptions: [
          "Illustrative scenario based on UK period decorating & spray finishing search trends",
          "Assumes 35% close rate on detailed written quotes (£3,200 average project ticket)",
          "Hypothetical calculation for illustrative planning purposes — not a guaranteed commercial result",
        ],
      },
    },
    supportingSocialProof: {
      quote:
        "“Period property owners in Bath won't let just anyone into their homes. Having a website that showcases dustless sanding, Farrow & Ball paint finishes, and our PDA accreditation completely changed the type of enquiries we receive.”",
      situation:
        "Fine decorator producing high-end finishes but burdened with budget enquiries due to an amateur digital presence.",
      intendedBenefit:
        "Dustless sanding process explanation, heritage colour brand alignment, and PDA accreditation proof.",
      businessOwner: "Illustrative scenario: Period Decorator & Spray Specialist",
      tradingName: "Concept: Crown & Bristle Fine Decorators",
      location: "Bath & Cheltenham",
      isFictional: true,
    },
    tags: ["Decorating", "Heritage", "Sash Windows", "PDA"],
  },
];
