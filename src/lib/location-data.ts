export interface LocationInfo {
  slug: string;
  cityName: string;
  regionName: string;
  county: string;
  headline: string;
  subheadline: string;
  localPhone: string;
  boroughs: string[];
  nearbyPostcodes: string[];
  stats: {
    tradeSitesLaunched: number;
    avgTurnaroundDays: number;
    avgInquiriesMonthly: number;
  };
  featuredTrades: string[];
  localCaseStudy: {
    name: string;
    trade: string;
    location: string;
    result: string;
    quote: string;
  };
}

export const UK_LOCATIONS: Record<string, LocationInfo> = {
  manchester: {
    slug: "manchester",
    cityName: "Manchester",
    regionName: "Greater Manchester & North West",
    county: "Greater Manchester",
    headline: "The Website & Lead Partner for Greater Manchester Trades.",
    subheadline:
      "We design, write, and manage high-converting websites for electricians, builders, plumbers, and roofers across Manchester, Stockport, Salford, and Cheshire.",
    localPhone: "0161 820 4910",
    boroughs: [
      "City Centre",
      "Didsbury & Chorlton",
      "Stockport & Cheadle",
      "Salford & MediaCity",
      "Altrincham & Sale",
      "Trafford & Stretford",
      "Bolton & Bury",
      "Wigan & Leigh",
    ],
    nearbyPostcodes: ["M1-M90", "SK1-SK12", "WA14-WA15", "WN1-WN8", "BL0-BL9"],
    stats: {
      tradeSitesLaunched: 28,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 42,
    },
    featuredTrades: ["NICEIC Electricians", "Roofing Contractors", "Gas Safe Heating Engineers", "Commercial Cleaners"],
    localCaseStudy: {
      name: "Apex Electrical & Solar",
      trade: "Electrical Contractor",
      location: "Didsbury, Manchester",
      result: "+180% Qualified Commercial & Solar Enquiries in 60 Days",
      quote: "Harley Digital Works took total ownership. Our site looks 10x better than our competitors and quotes come straight to WhatsApp.",
    },
  },
  birmingham: {
    slug: "birmingham",
    cityName: "Birmingham",
    regionName: "West Midlands",
    county: "West Midlands",
    headline: "High-Performing Websites for Birmingham & Midlands Contractors.",
    subheadline:
      "Complete 100% Done-For-You websites with built-in instant quote calculators and care plans for tradespeople in Birmingham, Solihull, Sutton Coldfield, and Wolverhampton.",
    localPhone: "0121 740 8820",
    boroughs: [
      "Birmingham Central",
      "Solihull & Knowle",
      "Sutton Coldfield",
      "Wolverhampton",
      "Dudley & Stourbridge",
      "Walsall & West Bromwich",
      "Bromsgrove & Redditch",
      "Coventry",
    ],
    nearbyPostcodes: ["B1-B98", "WV1-WV16", "WS1-WS15", "CV1-CV8"],
    stats: {
      tradeSitesLaunched: 22,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 38,
    },
    featuredTrades: ["Roofing & GRP Specialists", "Plumbing & Heating", "Home Extensions & Builders", "Joinery & Fit-Out"],
    localCaseStudy: {
      name: "Vanguard Roofing & Cladding",
      trade: "Roofing Specialists",
      location: "Solihull, Birmingham",
      result: "£145k in Closed GRP Flat Roof & Commercial Contracts",
      quote: "The free drone survey CTA and instant roof calculator doubled our incoming phone enquiries within the first fortnight.",
    },
  },
  leeds: {
    slug: "leeds",
    cityName: "Leeds",
    regionName: "West & North Yorkshire",
    county: "West Yorkshire",
    headline: "Custom Websites & Lead Capture for Yorkshire Trades.",
    subheadline:
      "Fixed-price 14-day websites built for boiler installers, electrical contractors, groundworkers, and trade professionals across Leeds, Harrogate, Bradford, and York.",
    localPhone: "0113 490 1280",
    boroughs: [
      "Leeds City & Roundhay",
      "Harrogate & Knaresborough",
      "Bradford & Shipley",
      "Wakefield & Pontefract",
      "Wetherby & Boston Spa",
      "York & North Yorkshire",
      "Ilkley & Otley",
      "Huddersfield & Halifax",
    ],
    nearbyPostcodes: ["LS1-LS29", "HG1-HG5", "BD1-BD23", "WF1-WF17", "YO1-YO62"],
    stats: {
      tradeSitesLaunched: 19,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 35,
    },
    featuredTrades: ["Gas Safe Heating Engineers", "Air Conditioning & HVAC", "Solar PV Installers", "Groundwork & Paving"],
    localCaseStudy: {
      name: "Harley Heating & Gas",
      trade: "Heating Engineers",
      location: "Roundhay, Leeds",
      result: "3.4x Increase in Next-Day Boiler Replacement Bookings",
      quote: "Zero hassle. They wrote all the copy, added our Worcester Bosch badges, and we have steady weekly installs.",
    },
  },
  cheshire: {
    slug: "cheshire",
    cityName: "Cheshire",
    regionName: "Cheshire & South Manchester Golden Triangle",
    county: "Cheshire",
    headline: "Premium Websites for High-End Cheshire Contractors & Trades.",
    subheadline:
      "Showcase luxury home renovations, EV charging, bespoke joinery, and landscaping for affluent homeowners across Wilmslow, Alderley Edge, Knutsford, and Chester.",
    localPhone: "01625 910 240",
    boroughs: [
      "Wilmslow & Alderley Edge",
      "Knutsford & Mere",
      "Prestbury & Macclesfield",
      "Chester City & Tarporley",
      "Altrincham & Hale",
      "Warrington & Lymm",
      "Northwich & Poynton",
      "Congleton & Sandbach",
    ],
    nearbyPostcodes: ["SK9-SK11", "WA13-WA16", "CH1-CH4", "CW1-CW12"],
    stats: {
      tradeSitesLaunched: 17,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 46,
    },
    featuredTrades: ["High-End Home Renovations", "Architectural Joinery", "Smart Home & Automation", "Luxury Landscaping"],
    localCaseStudy: {
      name: "Alderley Bespoke Living",
      trade: "Building & Renovation",
      location: "Alderley Edge, Cheshire",
      result: "Booked Out 6 Months in Advance with £80k+ Projects",
      quote: "The dark luxury branding perfectly matches the high-net-worth clients we target in Cheshire.",
    },
  },
  london: {
    slug: "london",
    cityName: "London",
    regionName: "Greater London & Home Counties",
    county: "Greater London",
    headline: "Fast, Reliable Websites for London Contractors & Trade Services.",
    subheadline:
      "Stand out in the competitive London market with instant WhatsApp dispatch, 24/7 emergency banners, and £95/mo fully managed maintenance.",
    localPhone: "020 8191 7840",
    boroughs: [
      "Central & City of London",
      "Kensington & Chelsea",
      "Richmond & Wandsworth",
      "Islington & Camden",
      "Greenwich & Southwark",
      "Surrey & Kent Borders",
      "Watford & Hertfordshire",
      "Ealing & West London",
    ],
    nearbyPostcodes: ["EC1-EC4", "WC1-WC2", "SW1-SW20", "W1-W14", "NW1-NW11", "N1-N22", "SE1-SE28", "E1-E20"],
    stats: {
      tradeSitesLaunched: 34,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 58,
    },
    featuredTrades: ["Commercial Maintenance", "Emergency Locksmiths & Glaziers", "HVAC & Climate Control", "Fit-Out Contractors"],
    localCaseStudy: {
      name: "Capital Property Response",
      trade: "Commercial Facilities",
      location: "City of London",
      result: "+240% Inbound B2B Facility Management Contracts",
      quote: "London clients expect speed and professionalism. Our website loads in 0.4s and delivers hot leads daily.",
    },
  },
  bristol: {
    slug: "bristol",
    cityName: "Bristol",
    regionName: "South West & West of England",
    county: "Bristol / Somerset / Gloucestershire",
    headline: "Turnkey Trade Websites for Bristol & South West Contractors.",
    subheadline:
      "From solar PV and heat pump installers to heritage roofers and electricians in Bristol, Bath, Cheltenham, and Gloucester.",
    localPhone: "0117 460 2190",
    boroughs: [
      "Bristol Central & Clifton",
      "Bath & Somerset",
      "Cheltenham & Gloucester",
      "Swindon & Wiltshire",
      "Weston-super-Mare",
      "Stroud & Cotswolds",
      "Portishead & Clevedon",
      "Keynsham & South Glos",
    ],
    nearbyPostcodes: ["BS1-BS49", "BA1-BA3", "GL1-GL54", "SN1-SN26"],
    stats: {
      tradeSitesLaunched: 16,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 31,
    },
    featuredTrades: ["Heat Pump & Renewables", "Heritage Stonemasons & Roofers", "Electrical Contractors", "Drainage & Groundworks"],
    localCaseStudy: {
      name: "Avon Valley Renewables",
      trade: "Solar & Heat Pumps",
      location: "Clifton, Bristol",
      result: "Generated 64 Heat Pump Survey Bookings in Q1",
      quote: "The grant calculator on the homepage made it so easy for homeowners to see their government savings and book.",
    },
  },
};
