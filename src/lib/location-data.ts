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
    featuredTrades: [
      "NICEIC Electricians",
      "Roofing Contractors",
      "Gas Safe Heating Engineers",
      "Commercial Cleaners",
    ],
    localCaseStudy: {
      name: "Apex Electrical & Solar",
      trade: "Electrical Contractor",
      location: "Didsbury, Manchester",
      result: "+180% Qualified Commercial & Solar Enquiries in 60 Days",
      quote:
        "Harley Digital Works took total ownership. Our site looks 10x better than our competitors and quotes come straight to WhatsApp.",
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
    featuredTrades: [
      "Roofing & GRP Specialists",
      "Plumbing & Heating",
      "Home Extensions & Builders",
      "Joinery & Fit-Out",
    ],
    localCaseStudy: {
      name: "Vanguard Roofing & Cladding",
      trade: "Roofing Specialists",
      location: "Solihull, Birmingham",
      result: "£145k in Closed GRP Flat Roof & Commercial Contracts",
      quote:
        "The free drone survey CTA and instant roof calculator doubled our incoming phone enquiries within the first fortnight.",
    },
  },
  leeds: {
    slug: "leeds",
    cityName: "Leeds",
    regionName: "West & North Yorkshire",
    county: "West Yorkshire",
    headline: "Custom Websites & Lead Capture for Yorkshire Trades.",
    subheadline:
      "High-speed websites that rank on Google Map Pack and deliver qualified jobs across Leeds, Bradford, Harrogate, Wakefield, and York.",
    localPhone: "0113 490 2810",
    boroughs: [
      "Leeds City Centre",
      "Headingley & Horsforth",
      "Harrogate & Knaresborough",
      "Bradford & Shipley",
      "Wakefield & Pontefract",
      "Wetherby & Boston Spa",
      "Ilkley & Otley",
      "Halifax & Huddersfield",
    ],
    nearbyPostcodes: ["LS1-LS29", "BD1-BD24", "HG1-HG5", "WF1-WF17", "HX1-HX7"],
    stats: {
      tradeSitesLaunched: 19,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 35,
    },
    featuredTrades: [
      "Heating & Heat Pumps",
      "Commercial Plumbers",
      "Domestic Rewires",
      "Driveways & Landscaping",
    ],
    localCaseStudy: {
      name: "White Rose Heating Solutions",
      trade: "Boiler & Heat Pump Specialist",
      location: "Harrogate & Leeds",
      result: "+14 Boiler Installations Sold per Month on Average",
      quote:
        "Having the exact Gas Safe badge and transparent upfront finance calculator turned website visits into booked surveys immediately.",
    },
  },
  cheshire: {
    slug: "cheshire",
    cityName: "Cheshire",
    regionName: "Cheshire & South Manchester",
    county: "Cheshire",
    headline: "Prestigious Websites for Cheshire Luxury Home Contractors.",
    subheadline:
      "Tailored for builders, bespoke kitchen fitters, landscapers, and electricians working in Wilmslow, Alderley Edge, Knutsford, Hale, and Chester.",
    localPhone: "01625 912 340",
    boroughs: [
      "Wilmslow & Handforth",
      "Alderley Edge & Prestbury",
      "Knutsford & Mobberley",
      "Hale, Hale Barns & Bowdon",
      "Chester City & Tarporley",
      "Macclesfield & Bollington",
      "Northwich & Hartford",
      "Warrington & Lymm",
    ],
    nearbyPostcodes: ["SK9", "SK10", "WA16", "WA14", "WA15", "CH1-CH4", "CW8-CW9"],
    stats: {
      tradeSitesLaunched: 24,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 46,
    },
    featuredTrades: [
      "Luxury Kitchen & Bathroom Fitters",
      "High-End Architectural Builders",
      "Bespoke Landscaping",
      "Smart Home Automation",
    ],
    localCaseStudy: {
      name: "Alderley Architectural Build",
      trade: "High-End Residential Construction",
      location: "Wilmslow & Alderley Edge",
      result: "£620k in Secured Luxury Renovation & Extension Tenders",
      quote:
        "Our previous agency site took 6 months and brought zero leads. Harley Digital Works launched in 14 days with outstanding craft.",
    },
  },
  liverpool: {
    slug: "liverpool",
    cityName: "Liverpool",
    regionName: "Merseyside & The Wirral",
    county: "Merseyside",
    headline: "Fast-Loading Websites for Liverpool & Wirral Trades.",
    subheadline:
      "Turn local searchers into paying domestic and commercial jobs across Liverpool, Sefton, St Helens, Southport, and the Wirral peninsula.",
    localPhone: "0151 670 1920",
    boroughs: [
      "Liverpool City Centre",
      "Crosby & Formby",
      "Birkenhead & Wallasey",
      "Heswall & West Kirby",
      "St Helens & Prescot",
      "Southport & Ainsdale",
      "Bootle & Maghull",
      "Speke & Woolton",
    ],
    nearbyPostcodes: ["L1-L40", "CH41-CH66", "WA9-WA12", "PR8-PR9"],
    stats: {
      tradeSitesLaunched: 16,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 32,
    },
    featuredTrades: [
      "Commercial Glazing",
      "Drainage & Emergency Plumbing",
      "Plastering & Rendering",
      "Industrial Electrical",
    ],
    localCaseStudy: {
      name: "Mersey Glaze & Facades",
      trade: "Commercial Glaziers",
      location: "Liverpool & Birkenhead",
      result: "3x Commercial Tenders Won in First Quarter Post-Launch",
      quote:
        "The Care Plan gives total peace of mind. We just WhatsApp over site photos from our van and HDW updates the website within hours.",
    },
  },
  london: {
    slug: "london",
    cityName: "London",
    regionName: "Greater London & Home Counties",
    county: "Greater London",
    headline: "High-End Websites for London & Home Counties Contractors.",
    subheadline:
      "Cut through extreme London trade competition with 100% done-for-you copywriting, 95+ PageSpeed scores, and local map-pack dominance.",
    localPhone: "020 8194 7210",
    boroughs: [
      "Central London (Westminster & City)",
      "Kensington, Chelsea & Fulham",
      "Richmond, Kingston & Wimbledon",
      "Islington, Camden & Hampstead",
      "Greenwich, Bromley & Dulwich",
      "Chiswick, Ealing & Acton",
      "Clapham, Battersea & Wandsworth",
      "Barnet, Enfield & Finchley",
    ],
    nearbyPostcodes: [
      "EC1-EC4",
      "WC1-WC2",
      "W1-W14",
      "SW1-SW20",
      "NW1-NW11",
      "N1-N22",
      "SE1-SE28",
      "E1-E20",
    ],
    stats: {
      tradeSitesLaunched: 34,
      avgTurnaroundDays: 14,
      avgInquiriesMonthly: 55,
    },
    featuredTrades: [
      "Prime Residential Electricians",
      "Commercial HVAC Contractors",
      "Loft & Basement Specialists",
      "High-End Joinery",
    ],
    localCaseStudy: {
      name: "Kensington Prime Mechanical",
      trade: "HVAC & Prime Mechanical",
      location: "Fulham & Kensington, London",
      result: "+240% Inbound Enquiries for Commercial Air-Conditioning Refits",
      quote:
        "London clients expect perfection before they invite you to quote. The site paid for itself on day 4 of going live.",
    },
  },
  bristol: {
    slug: "bristol",
    cityName: "Bristol",
    regionName: "South West & Severn",
    county: "Bristol",
    headline: "Fast Turnkey Websites for Bristol & Bath Trades.",
    subheadline:
      "Rank higher on Google across Clifton, Bedminster, Keynsham, and Bath with done-for-you technical copy.",
    localPhone: "0117 490 8120",
    boroughs: [
      "Clifton & Redland",
      "Bedminster & Southville",
      "Bath Central",
      "Keynsham & Kingswood",
      "Portishead & Clevedon",
    ],
    nearbyPostcodes: ["BS1-BS49", "BA1-BA3"],
    stats: { tradeSitesLaunched: 15, avgTurnaroundDays: 14, avgInquiriesMonthly: 29 },
    featuredTrades: [
      "Solar PV Installers",
      "Eco Heating Engineers",
      "Carpentry & Joinery",
      "Domestic Rewires",
    ],
    localCaseStudy: {
      name: "Severn Solar & Electrical",
      trade: "Solar & EV Installer",
      location: "Clifton, Bristol",
      result: "+195% Solar Installation Quotes in 90 Days",
      quote:
        "The instant EV and Solar ROI calculator converted browsing homeowners into booked surveys instantly.",
    },
  },
  sheffield: {
    slug: "sheffield",
    cityName: "Sheffield",
    regionName: "South Yorkshire & Peak District",
    county: "South Yorkshire",
    headline: "Engineered Websites for Sheffield & South Yorkshire Contractors.",
    subheadline:
      "Capture high-margin trade work across Sheffield, Rotherham, Barnsley, Chesterfield, and the Peak District.",
    localPhone: "0114 490 1830",
    boroughs: [
      "City Centre",
      "Ecclesall & Dore",
      "Hillsborough & Walkley",
      "Rotherham",
      "Chesterfield & Dronfield",
    ],
    nearbyPostcodes: ["S1-S81"],
    stats: { tradeSitesLaunched: 14, avgTurnaroundDays: 14, avgInquiriesMonthly: 27 },
    featuredTrades: [
      "Steel Fabricators",
      "Roofing & Cladding",
      "Plumbing & Heating",
      "Commercial Joinery",
    ],
    localCaseStudy: {
      name: "Peak Steel & Fabrication",
      trade: "Structural Steel",
      location: "Sheffield & Peak District",
      result: "£180k in Structural Framework Quotes",
      quote:
        "Harley Digital Works understands trade reality. No jargon, just results and quotes on WhatsApp.",
    },
  },
  newcastle: {
    slug: "newcastle",
    cityName: "Newcastle",
    regionName: "North East & Tyneside",
    county: "Tyne and Wear",
    headline: "High-Speed Websites for Newcastle & Gateshead Trades.",
    subheadline:
      "Dominate Google Map Pack rankings across Newcastle, Gateshead, Sunderland, and North & South Shields.",
    localPhone: "0191 590 2840",
    boroughs: [
      "Newcastle City",
      "Jesmond & Gosforth",
      "Gateshead & Quayside",
      "Tynemouth & Whitley Bay",
      "Sunderland",
    ],
    nearbyPostcodes: ["NE1-NE71", "SR1-SR8"],
    stats: { tradeSitesLaunched: 12, avgTurnaroundDays: 14, avgInquiriesMonthly: 24 },
    featuredTrades: [
      "Emergency Plumbers",
      "Commercial Electricians",
      "Roofing Contractors",
      "Scaffolding",
    ],
    localCaseStudy: {
      name: "Tyne Heating & Gas",
      trade: "Gas Safe Heating",
      location: "Gosforth, Newcastle",
      result: "+12 Boiler Upgrades Sold per Month",
      quote:
        "The automated Google review booster took us from 8 to 64 five-star reviews in 2 months.",
    },
  },
  nottingham: {
    slug: "nottingham",
    cityName: "Nottingham",
    regionName: "East Midlands",
    county: "Nottinghamshire",
    headline: "Custom Websites for Nottingham & East Midlands Contractors.",
    subheadline:
      "Win profitable commercial and domestic jobs across Nottingham, West Bridgford, Mansfield, and Newark.",
    localPhone: "0115 690 3820",
    boroughs: [
      "City Centre",
      "West Bridgford & Gamston",
      "Beeston & Wollaton",
      "Mansfield",
      "Newark-on-Trent",
    ],
    nearbyPostcodes: ["NG1-NG34"],
    stats: { tradeSitesLaunched: 17, avgTurnaroundDays: 14, avgInquiriesMonthly: 31 },
    featuredTrades: [
      "Heating & Boilers",
      "Driveways & Paving",
      "Commercial Fit-Outs",
      "Electrical Rewires",
    ],
    localCaseStudy: {
      name: "Trent Valley Paving",
      trade: "Resin & Block Paving",
      location: "West Bridgford, Nottingham",
      result: "£85k in Spring Driveway Bookings",
      quote:
        "The site paid for itself on the very first driveway booking we received via the quote form.",
    },
  },
  edinburgh: {
    slug: "edinburgh",
    cityName: "Edinburgh",
    regionName: "Scotland & Lothians",
    county: "City of Edinburgh",
    headline: "Specialist Websites for Edinburgh & Lothian Trades.",
    subheadline:
      "Designed for Edinburgh stonemasons, Gas Safe engineers, roofers, and luxury home builders.",
    localPhone: "0131 490 1940",
    boroughs: [
      "Old & New Town",
      "Morningside & Bruntsfield",
      "Leith & Stockbridge",
      "Corstorphine",
      "Musselburgh",
    ],
    nearbyPostcodes: ["EH1-EH55"],
    stats: { tradeSitesLaunched: 13, avgTurnaroundDays: 14, avgInquiriesMonthly: 26 },
    featuredTrades: [
      "Traditional Stonemasons",
      "Tenement Roofing Specialists",
      "Gas Safe Engineers",
      "Joiners",
    ],
    localCaseStudy: {
      name: "Lothian Heritage Stone & Roof",
      trade: "Stonemasonry & Roofing",
      location: "Stockbridge, Edinburgh",
      result: "£210k in Period Property Restoration Contracts",
      quote: "The high-resolution project gallery showcased our conservation stonework perfectly.",
    },
  },
  glasgow: {
    slug: "glasgow",
    cityName: "Glasgow",
    regionName: "Greater Glasgow & Clyde Valley",
    county: "Glasgow City",
    headline: "Fast Lead-Generating Websites for Glasgow Trades.",
    subheadline:
      "Capture domestic repairs and commercial building contracts across Glasgow, Paisley, and Lanarkshire.",
    localPhone: "0141 690 2810",
    boroughs: [
      "City Centre & Merchant City",
      "West End & Hillhead",
      "Southside & Shawlands",
      "East Kilbride",
      "Paisley",
    ],
    nearbyPostcodes: ["G1-G84", "PA1-PA19"],
    stats: { tradeSitesLaunched: 18, avgTurnaroundDays: 14, avgInquiriesMonthly: 33 },
    featuredTrades: [
      "Commercial Mechanical",
      "Roofing Specialists",
      "Electrical Contractors",
      "Plumbers",
    ],
    localCaseStudy: {
      name: "Clyde Mechanical Services",
      trade: "Commercial Plumbing",
      location: "Glasgow West End",
      result: "+160% Inbound Commercial Enquiries",
      quote: "Fast, reliable, zero tech headaches. The £95/mo Care Plan is worth every penny.",
    },
  },
  leicester: {
    slug: "leicester",
    cityName: "Leicester",
    regionName: "Leicestershire & East Midlands",
    county: "Leicestershire",
    headline: "Websites for Leicestershire Trades & Contractors.",
    subheadline:
      "Win domestic and commercial contracts across Leicester, Loughborough, Market Harborough, and Hinckley.",
    localPhone: "0116 490 2930",
    boroughs: [
      "City Centre",
      "Oadby & Wigston",
      "Loughborough",
      "Market Harborough",
      "Hinckley & Bosworth",
    ],
    nearbyPostcodes: ["LE1-LE67"],
    stats: { tradeSitesLaunched: 11, avgTurnaroundDays: 14, avgInquiriesMonthly: 22 },
    featuredTrades: ["Electricians", "Boiler Installers", "Builders", "Security & Alarms"],
    localCaseStudy: {
      name: "Fox Secure Alarms & Fire",
      trade: "Security & Fire Systems",
      location: "Leicester",
      result: "+130% Commercial Fire Alarm Enquiries",
      quote: "The site looks sharp, fast, and professional. We rank top 3 on Google Map Pack.",
    },
  },
  southampton: {
    slug: "southampton",
    cityName: "Southampton",
    regionName: "Hampshire & South Coast",
    county: "Hampshire",
    headline: "High-Speed Websites for Hampshire & South Coast Trades.",
    subheadline:
      "Serve clients across Southampton, Portsmouth, Winchester, Eastleigh, and the New Forest.",
    localPhone: "023 8190 2840",
    boroughs: [
      "City Centre",
      "Winchester",
      "Portsmouth & Southsea",
      "Eastleigh & Chandlers Ford",
      "New Forest",
    ],
    nearbyPostcodes: ["SO14-SO53", "PO1-PO22"],
    stats: { tradeSitesLaunched: 14, avgTurnaroundDays: 14, avgInquiriesMonthly: 28 },
    featuredTrades: [
      "Marine & Commercial Electricians",
      "Heating Engineers",
      "Roofing",
      "Carpentry",
    ],
    localCaseStudy: {
      name: "Solent Heating Specialists",
      trade: "Boiler Installation",
      location: "Winchester & Southampton",
      result: "+15 New Boilers Installed Monthly",
      quote: "Direct leads to my phone, no shared directory lead rubbish. Fantastic service.",
    },
  },
  cardiff: {
    slug: "cardiff",
    cityName: "Cardiff",
    regionName: "South Wales & Severn",
    county: "Cardiff",
    headline: "Done-For-You Websites for Cardiff & South Wales Trades.",
    subheadline:
      "Win high-value domestic jobs and commercial refits across Cardiff, Newport, Penarth, and Swansea.",
    localPhone: "029 2190 3820",
    boroughs: [
      "Cardiff Bay & City",
      "Penarth & Barry",
      "Newport",
      "Pontypridd & Rhondda",
      "Bridgend & Swansea",
    ],
    nearbyPostcodes: ["CF1-CF99", "NP1-NP44"],
    stats: { tradeSitesLaunched: 12, avgTurnaroundDays: 14, avgInquiriesMonthly: 25 },
    featuredTrades: ["Builders & Extensions", "Gas Safe Plumbers", "Electricians", "Roofers"],
    localCaseStudy: {
      name: "Dragon Build & Extensions",
      trade: "Home Extensions",
      location: "Penarth, Cardiff",
      result: "£340k in Signed Extension Projects",
      quote: "The 14-day launch guarantee was met with 2 days to spare. Brilliant design quality.",
    },
  },
};
