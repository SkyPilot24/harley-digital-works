export const agencyStats = [
  { label: "Delivery schedule", value: "Agreed timeline" },
  { label: "Copy & images", value: "100% Done-For-You" },
  { label: "Ongoing care", value: "£249/mo (Hosting + Edits)" },
] as const;

export const agencyOffers = [
  {
    slug: "launch-website",
    eyebrow: "Turnkey Web Presence (Ratified MVP)",
    title: "Managed Trade Website",
    price: "£1,495 (No VAT)",
    summary:
      "A fast, clean, professional website built to give trades and local businesses immediate credibility and inbound calls.",
    outcome:
      "You get a finished, conversion-ready website to an agreed delivery schedule without writing a line of copy or dealing with technical hassle.",
    bullets: [
      "5 bespoke conversion-focused pages",
      "We write all the industry copy and curate high-res photography",
      "Mobile-first design with direct click-to-call and WhatsApp routing",
      "Local Map Pack Schema JSON-LD microdata and Google Business Profile setup",
      "Ongoing £249/mo managed care, Cloudflare edge hosting, and prompt support",
    ],
    cta: "Choose Managed Website",
    surface: "sage" as const,
  },
  {
    slug: "growth-website",
    eyebrow: "Multi-Location Expansion",
    title: "Expansion Platform",
    price: "£2,495 (No VAT)",
    summary:
      "The complete online lead-generation engine designed to showcase multiple service hubs and regional service areas.",
    outcome:
      "You win higher-value projects, outshine local competitors, and receive qualified job enquiries directly to your phone.",
    bullets: [
      "Up to 10 custom pages with dedicated local service areas",
      "Interactive quick-quote estimator and enquiry routing",
      "Google Reviews integration and verified trust badges",
      "Advanced local SEO schema for top Google Maps ranking",
      "Cloudflare edge hosting, daily backups, and priority support",
    ],
    cta: "Choose Expansion Platform",
    surface: "mist" as const,
  },
  {
    slug: "managed-care-plans",
    eyebrow: "Zero Tech Hassle",
    title: "Website Care & Managed Hosting",
    price: "£249 / month (No VAT)",
    summary:
      "We manage your digital presence so you can run your business. Ultra-fast UK cloud hosting, daily backups, and routine edit batches.",
    outcome:
      "You never touch a server, update a plugin, or worry about your website breaking. Just message us when you need changes.",
    bullets: [
      "Blazing-fast UK green cloud hosting and SSL security",
      "Daily off-site cloud backups and 24/7 uptime monitoring",
      "Monthly content edits (photos, phone numbers, prices, new reviews up to 30 mins)",
      "Direct UK email and WhatsApp support during business hours",
      "Monthly performance and enquiry summary report",
    ],
    cta: "Explore Care Plans",
    surface: "stone" as const,
  },
] as const;

export const agencyProcess = [
  {
    step: "01",
    title: "15-Minute Intro",
    body: "A brief chat about your trade, services, and target jobs. No tech jargon, no homework for you.",
  },
  {
    step: "02",
    title: "We Build & Write Everything",
    body: "We write your sales copy, curate professional trade imagery, and engineer your website within 10 days.",
  },
  {
    step: "03",
    title: "Review & Launch",
    body: "We review the working preview together, apply any tweaks, and launch live to Google in 14 days.",
  },
  {
    step: "04",
    title: "Ongoing Managed Care",
    body: "We keep your site fast, secure, and updated every month. When you want a photo or text changed, we handle it.",
  },
] as const;

export const onboardingChecklist = [
  "Choose your website package or care tier.",
  "Share your logo, current website/socials, and contact details.",
  "List your top 3 most profitable services or jobs.",
  "Confirm your primary service areas or postcodes.",
  "Relax while we write, design, and build your digital presence.",
] as const;
