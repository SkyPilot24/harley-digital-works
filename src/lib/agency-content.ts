export const agencyStats = [
  { label: "Build rhythm", value: "1-2 weeks" },
  { label: "Core focus", value: "AI + web" },
  { label: "Support style", value: "Plain English" },
] as const;

export const agencyOffers = [
  {
    slug: "ai-driven-web-digital",
    eyebrow: "Applied AI for real work",
    title: "AI-Driven Web/Digital",
    price: "Project or sprint scope",
    summary:
      "Fast, thoughtful websites and digital tools built with AI-assisted workflows, clear copy, and practical lead capture.",
    outcome:
      "You get a credible digital presence that explains the offer, collects enquiries, and can keep improving after launch.",
    bullets: [
      "Websites, landing pages, and service pages",
      "AI-assisted planning, copy, design, and build workflows",
      "Lead capture, basic SEO, analytics, and launch checks",
      "Figma-to-build delivery with a bias for working software",
    ],
    cta: "Start a web project",
    surface: "sage" as const,
  },
  {
    slug: "creative-content-production",
    eyebrow: "Content people can use",
    title: "Creative Content Production",
    price: "Campaign or monthly support",
    summary:
      "Video, graphics, Canva assets, and campaign content for churches, community groups, small teams, and growing brands.",
    outcome:
      "You can explain your work clearly across web, social, email, and events without starting from scratch every week.",
    bullets: [
      "Short-form video, graphics, and content packs",
      "Canva-ready templates for repeatable publishing",
      "Messaging that sounds human, direct, and useful",
      "Content systems for events, outreach, and updates",
    ],
    cta: "Plan content support",
    surface: "mist" as const,
  },
  {
    slug: "technical-consultancy",
    eyebrow: "Reliable technical partner",
    title: "Technical Consultancy",
    price: "Audit, advisory, or retainer",
    summary:
      "Practical guidance on digital workflows, automation, web platforms, security basics, and scalable ways of working.",
    outcome:
      "You get calm technical judgement, clearer decisions, and systems that are easier for real people to run.",
    bullets: [
      "Workflow audits and automation roadmaps",
      "Website, hosting, security, and integration advice",
      "Hands-on problem solving for teams with limited time",
      "Support shaped by NHS IT discipline and service values",
    ],
    cta: "Ask for technical help",
    surface: "stone" as const,
  },
] as const;

export const agencyProcess = [
  {
    step: "01",
    title: "Listen",
    body: "We start with the people, the pressure points, and the outcome you need. No giant discovery theatre.",
  },
  {
    step: "02",
    title: "Shape",
    body: "We turn the problem into a clear scope: what gets built, what can wait, and how success will be measured.",
  },
  {
    step: "03",
    title: "Build",
    body: "We work in short cycles, using AI where it helps and human judgement where it matters most.",
  },
  {
    step: "04",
    title: "Improve",
    body: "After launch, we look at what people actually do and make the next small improvement instead of guessing.",
  },
] as const;

export const onboardingChecklist = [
  "Choose the package or outcome you want first.",
  "Share your current website, socials, brand assets, and login constraints.",
  "Add 3 examples of websites or brands you like and 3 you do not like.",
  "Write the top 3 actions you want visitors to take.",
  "Confirm who approves copy, design, and launch decisions.",
] as const;
