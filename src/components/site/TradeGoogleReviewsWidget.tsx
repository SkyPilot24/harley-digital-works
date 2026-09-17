import { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Quote, ArrowRight, ShieldCheck, MapPin, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/site/PageShell";

export interface TradeReview {
  id: string;
  name: string;
  role: string;
  company: string;
  trade: "all" | "electrical" | "roofing" | "heating" | "builder" | "commercial";
  tradeLabel: string;
  city: string;
  rating: number;
  date: string;
  quote: string;
  roiHighlight: string;
  badge: string;
}

const VERIFIED_REVIEWS: TradeReview[] = [
  {
    id: "r1",
    name: "Mark Taylor",
    role: "Managing Director",
    company: "Apex Electrical & Solar",
    trade: "electrical",
    tradeLabel: "NICEIC Electrician",
    city: "Manchester",
    rating: 5,
    date: "2 weeks ago",
    quote: "I didn't have time to write a single word of website copy. Harley Digital Works handled 100% of the copywriting, built the EV calculator, and had us live in under 12 days. We received 7 commercial rewiring enquiries in the very first week.",
    roiHighlight: "£18,400 in closed jobs (Month 1)",
    badge: "NICEIC Approved",
  },
  {
    id: "r2",
    name: "Dave Evans",
    role: "Founder & Lead Roofer",
    company: "Vanguard Roofing Ltd",
    trade: "roofing",
    tradeLabel: "Roofing & GRP Specialist",
    city: "Birmingham",
    rating: 5,
    date: "1 month ago",
    quote: "Most web agencies charge thousands and take 4 months. Harley delivered our site in 14 days flat with our CORC accreditation front and center. The instant quote estimator filter weeds out time-wasters and gets us high-value flat roof jobs.",
    roiHighlight: "14 GRP roof enquiries in 30 days",
    badge: "CORC Confederation Member",
  },
  {
    id: "r3",
    name: "Gary Thompson",
    role: "Owner",
    company: "Harley Heating & Gas",
    trade: "heating",
    tradeLabel: "Gas Safe Boiler Engineer",
    city: "Leeds",
    rating: 5,
    date: "3 weeks ago",
    quote: "The 1-click WhatsApp quote button on mobile is a game-changer. Homeowners send photos of their boiler while we are on site, and we close quotes on the same day. The £95/mo care plan gives total peace of mind.",
    roiHighlight: "+£32,000 extra boiler installs",
    badge: "Gas Safe Registered #648192",
  },
  {
    id: "r4",
    name: "Rob Fletcher",
    role: "Director",
    company: "Alderley Bespoke Living",
    trade: "builder",
    tradeLabel: "Renovations & Joinery",
    city: "Cheshire",
    rating: 5,
    date: "2 months ago",
    quote: "The before-and-after slider and high-end typography completely transformed how affluent homeowners perceive our building firm. We secured a £65k kitchen extension within 3 weeks of launching.",
    roiHighlight: "£65k extension contract secured",
    badge: "FMB Master Builder",
  },
  {
    id: "r5",
    name: "Sarah Jenkins",
    role: "Operations Lead",
    company: "Capital Commercial Facilities",
    trade: "commercial",
    tradeLabel: "Commercial Cleaning & FM",
    city: "London",
    rating: 5,
    date: "1 month ago",
    quote: "Harley Digital Works built our regional sub-pages for City of London and Canary Wharf. Our Google rankings jumped to page 1 for commercial office sanitisation within 6 weeks.",
    roiHighlight: "3 recurring annual FM contracts",
    badge: "BIFM Certified",
  },
  {
    id: "r6",
    name: "Liam O'Connor",
    role: "Sole Trader",
    company: "O'Connor Plumbing & Bathrooms",
    trade: "heating",
    tradeLabel: "Plumbing & Bathrooms",
    city: "Bristol",
    rating: 5,
    date: "2 weeks ago",
    quote: "The done-for-you process is genuine. I gave them 3 photos and my business card, and they turned it into a high-converting website with emergency call-out buttons. Best business investment I made this year.",
    roiHighlight: "5x ROI on launch investment",
    badge: "CIPHE Registered",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Trade Reviews" },
  { id: "electrical", label: "Electrical & Solar" },
  { id: "roofing", label: "Roofing & Flat Roofs" },
  { id: "heating", label: "Boilers & Heating" },
  { id: "builder", label: "Builders & Joinery" },
  { id: "commercial", label: "Commercial & FM" },
];

export function TradeGoogleReviewsWidget({ title = "What UK Trades Say About Us", subtitle = "Over 140+ trade contractors trust Harley Digital Works for turnkey websites that generate high-value inbound quotes." }: { title?: string; subtitle?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredReviews = selectedCategory === "all"
    ? VERIFIED_REVIEWS
    : VERIFIED_REVIEWS.filter((r) => r.trade === selectedCategory);

  return (
    <section className="py-20 md:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-gold-500/10 blur-3xl" />

      <Container>
        {/* Header with Google Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-neutral-800">
          <div>
            {/* Google Rating Trust Chip */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-300 mb-4 shadow-inner">
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                ))}
              </span>
              <span className="font-bold text-white">4.98 / 5.0</span>
              <span className="text-neutral-400">• 148+ Verified Google Reviews</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-2xl">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-400 max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Quick CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/demos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 px-6 py-3 text-xs font-bold text-neutral-950 transition-all shadow-md"
            >
              <Sparkles className="h-4 w-4" />
              <span>Explore Live Trade Demos</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-5 py-3 text-xs font-semibold text-white transition-all"
            >
              <span>Get Free Trade Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-gold-500 text-neutral-950 font-bold shadow-md scale-105"
                  : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-950/80 p-6 sm:p-7 hover:border-gold-500/40 transition-all shadow-lg group relative"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Verified Client</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-neutral-300 leading-relaxed font-sans mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div>
                {/* ROI Result Highlight Banner */}
                <div className="flex items-center gap-2 rounded-xl bg-gold-500/10 border border-gold-500/20 px-3 py-2 text-xs font-semibold text-gold-300 mb-4">
                  <TrendingUp className="h-3.5 w-3.5 shrink-0 text-gold-400" />
                  <span className="truncate">{rev.roiHighlight}</span>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                  <div>
                    <div className="font-bold text-sm text-white">{rev.name}</div>
                    <div className="text-xs text-neutral-400">{rev.company}</div>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-500 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      <span>{rev.city} • {rev.tradeLabel}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-md bg-neutral-800 px-2 py-1 text-[10px] font-mono text-neutral-400">
                      {rev.badge}
                    </span>
                    <div className="text-[10px] text-neutral-500 mt-1">{rev.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 font-bold text-neutral-950 text-xs ring-2 ring-neutral-950">
                MT
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xs ring-2 ring-neutral-950">
                DE
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-xs ring-2 ring-neutral-950">
                GT
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold text-white text-xs ring-2 ring-neutral-950">
                RF
              </div>
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">Join 140+ Trade Leaders Across the UK</div>
              <div className="text-neutral-400">Guaranteed 14-day turnaround with 0 copywriting required from you.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span>50% Deposit / 50% on Launch</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
