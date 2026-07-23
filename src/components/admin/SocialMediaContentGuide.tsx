import { ClipboardList } from "lucide-react";
import type { ReactNode } from "react";

const socialPlatformStrategy = [
  {
    platform: "LinkedIn",
    role: "Primary sales and authority channel",
    guidance:
      "Use LinkedIn for useful posts, founder-led authority, warm conversations, and enquiries. This is where small business owners and community leaders are most likely to make buying decisions.",
  },
  {
    platform: "Instagram",
    role: "Credibility and visual proof channel",
    guidance:
      "Use Instagram to show the work: before/after website reveals, short videos, behind-the-scenes progress, domain highlights, and simple proof that the agency is active.",
  },
  {
    platform: "TikTok / YouTube Shorts",
    role: "Future optional channels",
    guidance:
      "Do not spread thin at launch. Add short-form video channels later, once LinkedIn and Instagram have a steady weekly rhythm.",
  },
] as const;

const contentIdeas = [
  "Website tips",
  "Before/after website reveals",
  "Founder story posts",
  "Client wins",
  "Common website mistakes",
  "Domain name highlights",
  "Behind-the-scenes content",
  "Rate my website prompts",
  "Educational carousel ideas",
] as const;

const weeklyPlanner = [
  {
    day: "Monday",
    type: "Authority post",
    prompt:
      "Name a problem your audience has, explain why it matters, then show the simple fix you offer.",
  },
  {
    day: "Wednesday",
    type: "Value post",
    prompt: "Share a tip, checklist, mistake, tutorial, or carousel someone can use immediately.",
  },
  {
    day: "Friday",
    type: "Personal/story post",
    prompt:
      "Show the person behind the work: process, lessons learned, client win, community story, or behind the scenes.",
  },
] as const;

const launchTemplates = [
  {
    title: "Launch post",
    template:
      "Introducing [business name]. We help [audience] with [offer] so they can [outcome]. If your current [website/content/workflow] is holding you back, send a message or book a call.",
  },
  {
    title: "Problem post",
    template:
      "Most [audience] websites have the same problem: [problem 1], [problem 2], and [problem 3]. The fix is simpler than it looks: [solution]. Want a quick view on yours? Drop the link.",
  },
  {
    title: "Value carousel",
    template:
      "Carousel idea: 5 signs your website is losing enquiries. End with: If any of these feel familiar, start with one clear page, one clear offer, and one clear next step.",
  },
  {
    title: "Credibility post",
    template:
      "Why work with a small specialist? You get direct attention, faster decisions, plain language, and a build shaped around what you actually need.",
  },
  {
    title: "Personal founder story",
    template:
      "I started [business name] because I kept seeing [audience] struggle with [problem]. The skill was there. The service was there. The digital presence was not. That is the gap we fill.",
  },
] as const;

const profileSetup = [
  {
    title: "Instagram bio",
    guidance:
      "Keep it short: Websites. Domains. Content. Built with AI. Delivered fast. Add Bristol/UK location and one clear link to book a call.",
  },
  {
    title: "LinkedIn personal profile",
    guidance:
      "Use Robbie's profile as the primary sales asset. Headline should say who you help and what you build. Pin the website in Featured.",
  },
  {
    title: "LinkedIn company page",
    guidance:
      "Use a clear tagline, short about section, website link, Bristol location, HDW logo, and invite relevant connections to follow.",
  },
  {
    title: "Story Highlights",
    guidance:
      "Create Highlights for Our Work, Services, Domains, and Book a Call so visitors can understand the offer quickly.",
  },
  {
    title: "Profile images",
    guidance:
      "Use a professional headshot for Robbie's personal LinkedIn profile. Use the HDW logo mark for company and Instagram profiles.",
  },
] as const;

const engagementRules = [
  "Reply to every comment quickly, especially during the first 30 minutes after posting.",
  "Comment on 5 posts per day from small business owners, local brands, solo founders, and community leaders.",
  "Send friendly DMs to people who engage with launch or offer posts. Keep it helpful, not pushy.",
  "Never post and ghost. Stay online, reply, and engage with other people in the same window.",
] as const;

const contentPrompt =
  "Act as a social media strategist for a small business. Create 5 LinkedIn post ideas and 5 Instagram content ideas based on this business: [describe business]. Focus on content that builds trust, explains the offer clearly, and encourages enquiries. Format the output as a table with post type, topic, hook, caption idea, and CTA.";

export function SocialMediaContentGuide() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">Social Media Content Guide</h2>
          <p className="mt-1 max-w-3xl text-sm text-ink-muted">
            A weekly toolkit for planning posts, setting up profiles, generating ideas, and turning
            attention into useful conversations.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
          <ClipboardList size={14} /> Weekly content kit
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GuidePanel title="Social Media Strategy">
          <div className="space-y-3">
            {socialPlatformStrategy.map((item) => (
              <div key={item.platform} className="rounded-xl bg-ink/[0.03] p-4">
                <div className="text-sm font-semibold text-ink">{item.platform}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-ink-muted">
                  {item.role}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.guidance}</p>
              </div>
            ))}
          </div>
        </GuidePanel>

        <GuidePanel title="Content Ideas Library">
          <div className="grid gap-2 sm:grid-cols-2">
            {contentIdeas.map((idea) => (
              <div
                key={idea}
                className="rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink/75"
              >
                {idea}
              </div>
            ))}
          </div>
        </GuidePanel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <GuidePanel title="Weekly Content Planner">
          <div className="space-y-3">
            {weeklyPlanner.map((item) => (
              <div key={item.day} className="rounded-xl border border-ink/10 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-ink">{item.day}</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-ink">
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.prompt}</p>
              </div>
            ))}
          </div>
        </GuidePanel>

        <GuidePanel title="Social Media Profile Setup">
          <div className="space-y-3">
            {profileSetup.map((item) => (
              <div key={item.title} className="rounded-xl border border-ink/10 bg-white p-4">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.guidance}</p>
              </div>
            ))}
          </div>
        </GuidePanel>

        <GuidePanel title="Engagement Rules">
          <ul className="space-y-3">
            {engagementRules.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </GuidePanel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GuidePanel title="Launch Content Templates">
          <div className="grid gap-3 md:grid-cols-2">
            {launchTemplates.map((item) => (
              <div key={item.title} className="rounded-xl border border-ink/10 bg-white p-4">
                <div className="text-xs uppercase tracking-wider text-ink-muted">
                  Editable template
                </div>
                <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.template}</p>
              </div>
            ))}
          </div>
        </GuidePanel>

        <GuidePanel title="Content Prompt Generator">
          <p className="text-sm leading-relaxed text-ink-muted">
            Copy this into ChatGPT when you need fresh LinkedIn and Instagram ideas for a client,
            campaign, or weekly planning session.
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-ink p-4 text-xs leading-relaxed text-white/80">
            {contentPrompt}
          </pre>
        </GuidePanel>
      </div>
    </section>
  );
}

function GuidePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <h3 className="mb-4 text-base font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}
