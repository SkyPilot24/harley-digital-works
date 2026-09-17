export interface TradeServiceOption {
  id: string;
  name: string;
  basePrice: number;
  unit: string;
  description: string;
}

export interface TradeDemoBusiness {
  id: "electrical" | "roofing" | "heating";
  name: string;
  badge: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  coverageArea: string;
  accreditations: { name: string; idNumber?: string; iconText: string }[];
  rating: { score: string; reviewsCount: number; platform: string };
  heroHeadline: string;
  heroSubheadline: string;
  emergencyBanner: string;
  popularServices: {
    title: string;
    description: string;
    turnaround: string;
    priceGuide: string;
  }[];
  calculator: {
    title: string;
    subtitle: string;
    jobTypes: TradeServiceOption[];
    propertySizes: { id: string; name: string; multiplier: number }[];
    urgencyOptions: { id: string; name: string; surcharge: number }[];
  };
  beforeAfter: {
    title: string;
    location: string;
    jobSummary: string;
    beforeDesc: string;
    afterDesc: string;
    badge: string;
  };
  reviews: {
    author: string;
    location: string;
    text: string;
    service: string;
    rating: number;
  }[];
}

export const TRADE_DEMOS: Record<string, TradeDemoBusiness> = {
  electrical: {
    id: "electrical",
    name: "Apex Electrical & Solar",
    badge: "NICEIC Approved Contractor #D604921",
    tagline: "Certified Domestic & Commercial Electricians across Greater Manchester",
    phone: "0161 820 4910",
    whatsapp: "07700 900142",
    coverageArea: "Manchester, Stockport, Altrincham, Salford & Cheshire",
    accreditations: [
      { name: "NICEIC Approved Contractor", idNumber: "D604921", iconText: "⚡" },
      { name: "OZEV Authorized EV Installer", idNumber: "EV-9941", iconText: "🔌" },
      { name: "TrustMark Government Endorsed", iconText: "🛡️" },
      { name: "£5,000,000 Public Liability Insurance", iconText: "📋" },
    ],
    rating: { score: "4.98", reviewsCount: 147, platform: "Google Verified & Checkatrade" },
    heroHeadline: "Fast, Certified Electrical Services With Zero Hassle.",
    heroSubheadline:
      "From emergency call-outs and modern fuse board upgrades to solar PV & EV charger installations. Fixed written quotes and 6-year workmanship guarantee.",
    emergencyBanner: "🟢 2 On-Call Electricians Available Now • Average Manchester Response: 38 Mins",
    popularServices: [
      {
        title: "Consumer Unit / Fuse Board Upgrades",
        description: "18th Edition metal RCBO split-load consumer unit with full EICR certification.",
        turnaround: "Same-day installation",
        priceGuide: "From £550 fixed",
      },
      {
        title: "EV Home Charger Installation",
        description: "Smart 7.4kW tethered/untethered EV charger with app control & OZEV grant help.",
        turnaround: "Completed in 3-4 hours",
        priceGuide: "From £795 inc. unit",
      },
      {
        title: "Solar PV & Battery Storage",
        description: "Tier 1 high-efficiency solar panels with hybrid inverter and 5.12kWh battery pack.",
        turnaround: "2-day turnaround",
        priceGuide: "From £4,995 fully installed",
      },
      {
        title: "Landlord EICR Safety Inspections",
        description: "Full testing, certification, and instant digital PDF report issued same day.",
        turnaround: "Booked within 48 hours",
        priceGuide: "From £140 flat rate",
      },
    ],
    calculator: {
      title: "Instant Electrical Estimate Calculator",
      subtitle: "Get a realistic ballpark price in 15 seconds. No sales pressure.",
      jobTypes: [
        { id: "fuseboard", name: "18th Edition Fuse Board Upgrade", basePrice: 550, unit: "fixed", description: "Full RCBO board + test certificate" },
        { id: "eicr", name: "Landlord EICR Safety Certificate", basePrice: 150, unit: "per inspection", description: "Full digital safety certificate" },
        { id: "ev", name: "Home EV Charger (7.4kW Smart)", basePrice: 820, unit: "inc. installation", description: "Smart charger + dedicated supply" },
        { id: "rewire", name: "Full / Partial House Rewire", basePrice: 2800, unit: "starting guide", description: "New cables, sockets, switches & board" },
        { id: "emergency", name: "Emergency Fault Finding & Repair", basePrice: 110, unit: "first hour", description: "Immediate diagnostic & make-safe" },
      ],
      propertySizes: [
        { id: "1-2bed", name: "1–2 Bed Flat / Terraced", multiplier: 1.0 },
        { id: "3bed", name: "3 Bed Semi-Detached", multiplier: 1.25 },
        { id: "4-5bed", name: "4–5 Bed Detached", multiplier: 1.6 },
        { id: "commercial", name: "Commercial / Office Unit", multiplier: 1.85 },
      ],
      urgencyOptions: [
        { id: "routine", name: "Standard (Next 1–2 Weeks)", surcharge: 0 },
        { id: "priority", name: "Priority (Next 48 Hours)", surcharge: 45 },
        { id: "emergency", name: "Emergency (Today / Tonight)", surcharge: 95 },
      ],
    },
    beforeAfter: {
      title: "1970s Rewire & Modern Consumer Unit Replacement",
      location: "Didsbury, South Manchester",
      jobSummary: "Replaced an outdated, fire-risk rewireable fuse box with a surge-protected RCBO consumer unit and fitted LED downlights throughout.",
      beforeDesc: "Dangerous ceramic fuses with exposed copper wiring and no RCD earth fault protection.",
      afterDesc: "Fully compliant 18th Edition metal enclosure with dual surge protection and individual RCBO trip switches.",
      badge: "Completed in 1 Day • Full NICEIC Certificate Issued",
    },
    reviews: [
      {
        author: "Mark & Sarah T.",
        location: "Altrincham",
        text: "Apex sorted our old fuse board and installed our EV charger in one visit. Arrived dead on 8:00 AM, spotless clean-up, and paperwork emailed that evening. Superb service.",
        service: "Fuse Board & EV Charger",
        rating: 5,
      },
      {
        author: "David H. (Letting Agent)",
        location: "Manchester City Centre",
        text: "We use Apex for all 42 of our rental properties' EICR certificates. Fast booking, reliable, and fair pricing. Highly recommended.",
        service: "Landlord EICR Checks",
        rating: 5,
      },
    ],
  },
  roofing: {
    id: "roofing",
    name: "Vanguard Roofing & Property Care",
    badge: "Confederation of Roofing Contractors #C7741",
    tagline: "Specialist Slate, Tile & GRP Flat Roof Specialists in Birmingham & West Midlands",
    phone: "0121 740 8820",
    whatsapp: "07700 900288",
    coverageArea: "Birmingham, Solihull, Sutton Coldfield, Wolverhampton & Bromsgrove",
    accreditations: [
      { name: "CORC Confederation Member", idNumber: "C7741", iconText: "🏠" },
      { name: "Free HD Drone Roof Surveys", iconText: "🚁" },
      { name: "20-Year Guarantee on GRP Flat Roofs", iconText: "🛡️" },
      { name: "£5,000,000 Public Liability Insurance", iconText: "📋" },
    ],
    rating: { score: "4.95", reviewsCount: 184, platform: "Trustpilot & Google Reviews" },
    heroHeadline: "Honest Roof Repairs & Replacements With Zero High-Pressure Sales.",
    heroSubheadline:
      "From emergency storm leak repairs and repointing to full dry ridge systems and seamless GRP fibreglass flat roofs. We provide free HD drone footage with every inspection.",
    emergencyBanner: "🟢 Emergency Roof Tarping & Repair Team Active • Solihull & Birmingham",
    popularServices: [
      {
        title: "GRP Fibreglass Flat Roofing",
        description: "Seamless, joint-free flat roof system impervious to ponding water and rot.",
        turnaround: "20-year watertight guarantee",
        priceGuide: "From £95/m² fully installed",
      },
      {
        title: "Emergency Chimney & Ridge Repointing",
        description: "Dry ridge conversion and structural chimney stack repointing with lead flashing.",
        turnaround: "Done in 1-2 days",
        priceGuide: "From £420",
      },
      {
        title: "Full Slate & Tile Re-Roofing",
        description: "Complete strip-and-relay with breathable membrane, treated battens, and new dry verge.",
        turnaround: "3-5 day completion",
        priceGuide: "From £3,850 complete",
      },
      {
        title: "UPVC Fascias, Soffits & Guttering",
        description: "Maintenance-free roofline replacement with deep-flow guttering and bird comb guards.",
        turnaround: "1 day installation",
        priceGuide: "From £65 per linear metre",
      },
    ],
    calculator: {
      title: "Instant Roofing Cost Guide",
      subtitle: "Select your project type for a realistic West Midlands estimate.",
      jobTypes: [
        { id: "leak", name: "Emergency Storm Damage / Leak Fix", basePrice: 240, unit: "callout & repair", description: "Replace cracked tiles, seal flashing, make watertight" },
        { id: "flat", name: "GRP Fibreglass Flat Roof (Garage/Extension)", basePrice: 1250, unit: "standard garage", description: "Full OSB deck + seamless resin topcoat" },
        { id: "dryridge", name: "Dry Ridge & Dry Verge Upgrade System", basePrice: 680, unit: "ridge run", description: "Maintenance-free mechanical fixing (no mortar)" },
        { id: "reroof", name: "Full Re-Roof (Slate or Concrete Tile)", basePrice: 4200, unit: "standard 3-bed", description: "New breathable felt, battens, tile & leadwork" },
      ],
      propertySizes: [
        { id: "small", name: "Single Garage / Porch", multiplier: 0.8 },
        { id: "medium", name: "Standard 3-Bed Semi", multiplier: 1.0 },
        { id: "large", name: "Large 4-Bed Detached", multiplier: 1.45 },
        { id: "commercial", name: "Commercial Unit / Block", multiplier: 2.1 },
      ],
      urgencyOptions: [
        { id: "planned", name: "Flexible / Planning Ahead (2-4 Weeks)", surcharge: 0 },
        { id: "priority", name: "Urgent (Within 7 Days)", surcharge: 50 },
        { id: "emergency", name: "Active Water Leak (Emergency Today)", surcharge: 120 },
      ],
    },
    beforeAfter: {
      title: "Failing Felt Garage Roof to Seamless GRP Fibreglass",
      location: "Solihull, West Midlands",
      jobSummary: "Stripped leaking felt and rotted decking. Installed 18mm tongue-and-groove OSB3 boards and applied heavy-duty Cure-It GRP fibreglass system with dark slate finish.",
      beforeDesc: "Blistered bitumen felt with sagging pooling areas leaking water directly into the garage workshop.",
      afterDesc: "Tough, walkable seamless GRP resin finish with pre-formed edge trims and 20-year structural warranty.",
      badge: "Completed in 1 Day • 20-Year Guarantee",
    },
    reviews: [
      {
        author: "Colin W.",
        location: "Sutton Coldfield",
        text: "The drone survey was brilliant—they showed me exactly where the water was coming past the chimney lead flashing on their iPad. Fixed it two days later for the exact quote. No drama.",
        service: "Chimney Lead Flashing & Ridge",
        rating: 5,
      },
      {
        author: "Emma R.",
        location: "Solihull",
        text: "Vanguard replaced our rotten garage flat roof with fibreglass. Left the driveway cleaner than they found it and provided the written 20-year warranty document straight away.",
        service: "GRP Flat Roof",
        rating: 5,
      },
    ],
  },
  heating: {
    id: "heating",
    name: "Harley Heating & Gas Engineers",
    badge: "Gas Safe Registered #648192 • Worcester Bosch Diamond Accredited",
    tagline: "Boiler Replacements, Power Flushing & Central Heating across Yorkshire & Leeds",
    phone: "0113 490 1280",
    whatsapp: "07700 900355",
    coverageArea: "Leeds, Harrogate, Bradford, Wakefield, Wetherby & York",
    accreditations: [
      { name: "Gas Safe Registered", idNumber: "648192", iconText: "🔥" },
      { name: "Worcester Bosch Diamond Installer", idNumber: "Up to 12 Yr Warranty", iconText: "⭐" },
      { name: "Vaillant Advance Master Installer", iconText: "🔧" },
      { name: "0% APR Boiler Finance Available", iconText: "💳" },
    ],
    rating: { score: "4.99", reviewsCount: 231, platform: "Which? Trusted Trader & Google" },
    heroHeadline: "New Boiler Installed Next Day with Up to 12 Years Guarantee.",
    heroSubheadline:
      "A-rated condensing boilers from Worcester Bosch, Vaillant & Viessmann. Fixed prices, MagnaClean magnetic filter included, and zero deposit finance options.",
    emergencyBanner: "🟢 3 Gas Safe Engineers Available Today • Next-Day Boiler Installations Bookable",
    popularServices: [
      {
        title: "Combi-to-Combi Boiler Swap",
        description: "Supply and fit new A-rated boiler with smart thermostat and chemical power flush.",
        turnaround: "Installed in 1 Day",
        priceGuide: "From £1,695 fixed",
      },
      {
        title: "System-to-Combi Conversion",
        description: "Remove old water cylinders and tanks to free up cupboard space with high-flow combi.",
        turnaround: "Completed in 2 Days",
        priceGuide: "From £2,450 complete",
      },
      {
        title: "Annual Boiler Service & Safety Check",
        description: "Comprehensive 28-point inspection, flue gas analysis, and Gas Safe digital record.",
        turnaround: "45 min appointment",
        priceGuide: "£85 flat fee",
      },
      {
        title: "Magnaclean Power Flush",
        description: "Restores radiator heat distribution, removes black iron oxide sludge, and cuts gas bills.",
        turnaround: "Full day clean",
        priceGuide: "From £390",
      },
    ],
    calculator: {
      title: "Instant Boiler & Heating Estimator",
      subtitle: "Calculate your fixed-price installation estimate with standard extras included.",
      jobTypes: [
        { id: "combi-swap", name: "Combi Boiler Swap (Same Location)", basePrice: 1695, unit: "fully fitted", description: "New A-rated boiler + wireless thermostat + MagnaClean filter" },
        { id: "conversion", name: "System to Combi Conversion (Remove Tanks)", basePrice: 2450, unit: "complete job", description: "Tank removal + pipework upgrade + high-output combi" },
        { id: "relocate", name: "Boiler Replacement + Move Location", basePrice: 2150, unit: "inc. pipework", description: "Move boiler into loft/garage/kitchen cupboard" },
        { id: "service", name: "Full Annual Service & Gas Certificate", basePrice: 85, unit: "per boiler", description: "28-point check + flue test + warranty stamp" },
      ],
      propertySizes: [
        { id: "1-2bed", name: "1–2 Bed Flat / 1 Bath (24kW - 28kW)", multiplier: 1.0 },
        { id: "3bed", name: "3–4 Bed House / 1–2 Baths (30kW - 32kW)", multiplier: 1.15 },
        { id: "large", name: "4–5 Bed House / 2+ Baths (36kW+ or Storage Combi)", multiplier: 1.38 },
      ],
      urgencyOptions: [
        { id: "flexible", name: "Standard Booking (Within 1–2 Weeks)", surcharge: 0 },
        { id: "next-day", name: "Next-Day Installation Guarantee", surcharge: 90 },
        { id: "no-heat", name: "No Heating / Emergency Breakdown Today", surcharge: 120 },
      ],
    },
    beforeAfter: {
      title: "Outdated Inefficient Back Boiler to Worcester Bosch 8000 Life",
      location: "Roundhay, North Leeds",
      jobSummary: "Decommissioned 24-year-old inefficient back boiler and cold water header tank in the loft. Installed compact Worcester Bosch 8000 Life 30kW in the kitchen with Hive smart control.",
      beforeDesc: "Loud, rattling back boiler rated G for energy efficiency, causing cold radiator spots and high gas bills.",
      afterDesc: "Quiet, 94% ErP A-rated condensing combi with 12-year parts and labour warranty and smart smartphone thermostat.",
      badge: "Saved £410/year on Gas • Installed in 1.5 Days",
    },
    reviews: [
      {
        author: "James & Helen P.",
        location: "Harrogate",
        text: "Our boiler broke on a freezing Tuesday morning. Harley Heating gave us a fixed price over the phone and fitted our new Worcester Bosch by Wednesday afternoon. Incredible work ethic.",
        service: "Emergency Boiler Replacement",
        rating: 5,
      },
      {
        author: "Rachel K.",
        location: "Leeds (Roundhay)",
        text: "So refreshing to deal with tradesmen who turn up on time, put dust sheets everywhere, and explain the controls clearly. The 12-year guarantee gives total peace of mind.",
        service: "Combi Conversion & Power Flush",
        rating: 5,
      },
    ],
  },
};
