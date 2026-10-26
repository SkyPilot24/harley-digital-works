import { PageShell } from "./PageShell";
import { PillButton } from "./PillButton";
import { WebsitePackagesSection } from "./WebsitePackagesSection";
import { ConceptScreen } from "./ConceptShowcase";
import { BeforeAfterComparison } from "./BeforeAfterComparison";
import { ArrowRight } from "lucide-react";
const details = {
  website: {
    kicker: "WEBSITE DESIGN & BUILD",
    title: "Your workmanship.\nOur craft.",
    intro: "A website that makes it easy to see what you do, trust your work and get in touch.",
    points: [
      [
        "Made to feel like your business",
        "A proven design foundation, tailored with your identity, services and real project photographs.",
      ],
      [
        "The words, taken care of",
        "We turn your business knowledge into clear copy. You check the facts; we shape the story.",
      ],
      [
        "A clear path to an enquiry",
        "Useful service pages, prominent contact details and a mobile experience that respects your customer’s time.",
      ],
    ],
  },
  care: {
    kicker: "ONGOING DIGITAL CARE",
    title: "Launched.\nAnd looked after.",
    intro:
      "Your website should keep up with your business. Monthly care gives the important details a place to go.",
    points: [
      [
        "Keep the essentials working",
        "Hosting, routine maintenance and enquiry checks within your agreed service.",
      ],
      [
        "Keep your business current",
        "New project photos, changing services and updated information, with a defined monthly change allowance.",
      ],
      [
        "Make useful improvements",
        "Clear reporting and a prioritised next step. Additional search, review or integration work is scoped before it starts.",
      ],
    ],
  },
  launch: {
    kicker: "HOW WE WORK",
    title: "A clear plan.\nA considered launch.",
    intro:
      "From the first conversation to a website you’re proud to share. You know what happens next at each stage.",
    points: [
      [
        "Agree the plan",
        "Confirm scope, build fee, monthly service, content, access and a realistic schedule in writing.",
      ],
      [
        "Review the website",
        "We prepare the copy and build a private preview. You check the facts and give feedback before approving the final version.",
      ],
      [
        "Launch with care",
        "Check mobile layouts, contact routes and domain setup, preserving business email. Then move into the agreed monthly service.",
      ],
    ],
  },
};
export function ManagedServicePage({ kind = "website" }: { kind?: keyof typeof details }) {
  const d = details[kind];
  return (
    <PageShell quiet>
      <div className="studio-home">
        <section className="studio-hero">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">{d.kicker}</p>
              <h1>
                {d.title.split("\n")[0]}
                <br />
                <span>{d.title.split("\n")[1]}</span>
              </h1>
              <p className="hero-description">{d.intro}</p>
              <div className="studio-actions">
                <PillButton
                  as="link"
                  to="/contact"
                  search={{
                    service:
                      kind === "care" ? "Monthly website care" : "Managed website and ongoing care",
                  }}
                  variant="dark"
                >
                  Get your website plan
                </PillButton>
                <a href="#details" className="studio-text-link">
                  See what’s involved ↓
                </a>
              </div>
            </div>
            <div className="service-preview">
              <ConceptScreen concept={kind === "care" ? "interior" : "solar"} priority />
              <p>Independent design study · illustrative business</p>
            </div>
          </div>
        </section>
        <section id="details" className="studio-section studio-wrap">
          <div className="process-rows">
            {d.points.map(([title, copy], i) => (
              <div className="process-row" key={title}>
                <span className="process-number">0{i + 1}</span>
                <h2>{title}</h2>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>
        {kind === "website" && (
          <section className="studio-section bg-stone-50/80 border-y border-stone-200 py-16">
            <div className="studio-wrap">
              <BeforeAfterComparison
                initialTradeId="electrical-ev"
                title="Transforming Trades Websites"
                subtitle="See how our design standard and commercial copywriting replace generic templates with high-trust trade platforms."
                sectionKicker="PROVEN CONVERSION DESIGN"
              />
            </div>
          </section>
        )}
        {kind === "care" && (
          <section className="studio-section bg-[#081B30] text-white py-16 border-y border-white/10">
            <div className="studio-wrap max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                SIGNATURE CARE PLAN ADD-ON
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Your Website Wins Their Interest. Your AI Receptionist Makes Sure Their Call Gets
                Answered.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Upgrade your £249/mo Managed Website Care Plan with a dedicated 24/7 AI Phone
                Receptionist for just +£99/month (saving £50/month compared to the standalone
                £149/mo rate). It answers homeowner calls in natural British English, qualifies
                quotes, and sends instant WhatsApp briefs to you while you work on tools.
              </p>
              <div className="pt-2">
                <a
                  href="/virtual-receptionist"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#081B30] font-bold text-xs tracking-wide transition-all shadow-md"
                >
                  <span>Explore 24/7 AI Phone Receptionist</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        )}
        <WebsitePackagesSection />
      </div>
    </PageShell>
  );
}
