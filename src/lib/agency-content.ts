export const agencyStats = [
  { label: "Delivery schedule", value: "Agreed timeline" },
  { label: "Copywriting", value: "Included in full" },
  { label: "Ongoing care", value: "£249/mo (Hosting + Edits)" },
] as const;

export const agencyOffers = [
  {
    slug: "launch-website",
    eyebrow: "Turnkey Trade Website",
    title: "Managed Trade Website",
    price: "£1,495 setup",
    summary:
      "A clean, professional website built to give trade contractors credibility and clear customer enquiries.",
    outcome: "You get a finished website to an agreed delivery schedule with copywriting included.",
    bullets: [
      "5 bespoke trade pages",
      "Copywriting based on your confirmed business facts",
      "Mobile-first design with direct click-to-call and enquiry routing",
      "Structured local business microdata",
      "Ongoing £249/mo managed care, Cloudflare hosting, and prompt support",
    ],
    cta: "Choose Managed Website",
    surface: "sage" as const,
  },
  {
    slug: "managed-care-plans",
    eyebrow: "Ongoing Support",
    title: "Website Care & Managed Hosting",
    price: "£249 / month",
    summary:
      "We look after your digital presence so you can run your business. Hosting and backup arrangements are confirmed in your proposal.",
    outcome:
      "Your website stays updated, maintained, and secure. Just message us when you need text or photos updated.",
    bullets: [
      "Cloudflare hosting and SSL maintenance",
      "Hosting and backup arrangements confirmed in your proposal",
      "Monthly content edits up to 30 minutes",
      "Direct email and WhatsApp support during business hours",
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
    body: "We write your copy, curate professional trade imagery, and assemble your website.",
  },
  {
    step: "03",
    title: "Review & Launch",
    body: "We review the working preview together, apply any tweaks, and launch to an agreed delivery schedule.",
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
  "List your 3 most profitable services or jobs.",
  "Confirm your primary service areas or postcodes.",
  "Relax while we write, design, and build your digital presence.",
] as const;
