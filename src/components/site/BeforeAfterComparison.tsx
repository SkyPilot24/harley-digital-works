import { useId, useRef, useState, type PointerEvent } from "react";
import { ArrowLeftRight, ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { PORTFOLIO_TRANSFORMATIONS, type PortfolioTransformation } from "@/lib/portfolio-data";
import { PillButton } from "./PillButton";
import "./before-after-comparison.css";

interface BeforeAfterComparisonProps {
  initialTradeId?: string;
  showAllTrades?: boolean;
  featuredOnly?: boolean;
  compactMode?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  sectionKicker?: string;
}

// Authentic illustrative British trade photography for each vertical
const beforePhotography: Record<string, string> = {
  "heating-plumbing": "/images/home/before-heating-boiler.jpg",
  "electrical-ev": "/images/home/before-electrical-fusebox.jpg",
  "roofing-leadwork": "/images/home/before-roofing-leadwork.jpg",
  "building-renovations": "/images/home/before-kitchen-extension.jpg",
  "landscaping-gardens": "/images/home/before-landscaping-patio.jpg",
  "painting-decorating": "/images/home/before-bathroom-interior.jpg",
};

const afterPhotography: Record<string, string> = {
  "heating-plumbing": "/images/home/heating-plant-room.jpg",
  "electrical-ev": "/images/home/renewables-solar-ev.jpg",
  "roofing-leadwork": "/images/home/thg-pavilion.jpg",
  "building-renovations": "/images/home/extension-renovation.jpg",
  "landscaping-gardens": "/images/home/landscaping-patio.jpg",
  "painting-decorating": "/images/home/decorating-heritage.jpg",
};

function DesignPreview({
  item,
  version,
}: {
  item: PortfolioTransformation;
  version: "before" | "after";
}) {
  const modern = version === "after";
  const imageSrc = modern
    ? afterPhotography[item.id] || afterPhotography["heating-plumbing"]
    : beforePhotography[item.id] || afterPhotography[item.id];

  return (
    <div className={`comparison-design comparison-design--${version}`}>
      <div className="comparison-browser">
        <span className="comparison-browser-dots">● ● ●</span>
        <span>{modern ? "Redesigned concept" : "Original concept"}</span>
      </div>
      <div className="comparison-site-header">
        <span className="comparison-business-name">
          {modern ? item.after.title : item.before.title}
        </span>
        <span className="comparison-example-nav">Services · About · Contact</span>
      </div>
      <div className="comparison-hero">
        <img
          src={imageSrc}
          alt={
            modern
              ? `${item.tradeName} completed modern project`
              : `${item.tradeName} prior condition`
          }
          loading="lazy"
          decoding="async"
        />
        <div className="comparison-hero-shade" />
        <div className="comparison-hero-copy">
          <span className="comparison-eyebrow">
            {modern ? item.tradeName : "ALL WORK UNDERTAKEN · FREE QUOTES"}
          </span>
          <h3>{modern ? item.after.headline : item.before.headline}</h3>
          <p>
            {modern
              ? `Explore our ${item.tradeName.toLowerCase()} services and tell us about the work you have in mind.`
              : item.before.subheadline}
          </p>
          <span className="comparison-example-cta">
            {modern ? "Tell us about your project" : "CLICK HERE TO ENQUIRE"}
            {modern && <ArrowUpRight size={15} />}
          </span>
        </div>
      </div>
      <div className="comparison-site-footer">
        {modern
          ? "Clear services. A straightforward next step."
          : "HOME | SERVICES | PRICES | GALLERY | CONTACT"}
      </div>
    </div>
  );
}

export function BeforeAfterComparison({
  initialTradeId = "heating-plumbing",
  showAllTrades = true,
  featuredOnly = false,
  compactMode = false,
  className = "",
  title = "See what your website could become",
  subtitle = "Compare two illustrative designs for the same trade, from a cluttered page to a clear, considered website.",
  sectionKicker = "THE DESIGN DIFFERENCE",
}: BeforeAfterComparisonProps) {
  const instanceId = useId();
  const trades = featuredOnly ? PORTFOLIO_TRANSFORMATIONS.slice(0, 3) : PORTFOLIO_TRANSFORMATIONS;
  const [activeTradeId, setActiveTradeId] = useState(initialTradeId);
  const [afterPercentage, setAfterPercentage] = useState(50);
  const [phoneVersion, setPhoneVersion] = useState<"before" | "after">("after");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const dragPointer = useRef<number | null>(null);
  const item = trades.find((trade) => trade.id === activeTradeId) ?? trades[0];
  const headingId = `${instanceId}-heading`;
  const sliderId = `${instanceId}-slider`;

  function updatePosition(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const beforePercentage = ((event.clientX - bounds.left) / bounds.width) * 100;
    setAfterPercentage(Math.max(0, Math.min(100, Math.round(100 - beforePercentage))));
  }

  return (
    <div
      className={`trade-comparison ${compactMode ? "trade-comparison--compact" : ""} ${className}`}
      aria-labelledby={headingId}
    >
      <div className="comparison-intro">
        <p className="studio-kicker">
          <span className="studio-kicker-line" />
          {sectionKicker}
        </p>
        <h2 id={headingId}>{title}</h2>
        <p className="comparison-description">{subtitle}</p>
        <p className="comparison-disclosure">
          Independent design concepts · Fictional businesses · Illustrative photography
        </p>
      </div>

      {showAllTrades && (
        <div className="comparison-trades" role="group" aria-label="Choose a trade concept">
          {trades.map((trade) => (
            <button
              key={trade.id}
              type="button"
              aria-pressed={item.id === trade.id}
              onClick={() => {
                setActiveTradeId(trade.id);
                setAfterPercentage(50);
              }}
            >
              {trade.tradeName}
            </button>
          ))}
        </div>
      )}

      <div className="comparison-toolbar">
        <p className="comparison-desktop-help">
          {viewMode === "mobile"
            ? "Choose a version to see the complete design."
            : "Before on the left. After on the right. Drag to compare."}
        </p>
        <p className="comparison-phone-help">Choose a version to see the complete design.</p>
        <div className="comparison-device-controls" role="group" aria-label="Device preview mode">
          <button
            type="button"
            aria-pressed={viewMode === "desktop"}
            onClick={() => setViewMode("desktop")}
          >
            <Monitor size={15} />
            Desktop
          </button>
          <button
            type="button"
            aria-pressed={viewMode === "mobile"}
            onClick={() => setViewMode("mobile")}
          >
            <Smartphone size={15} />
            Mobile
          </button>
        </div>
      </div>

      <div
        className={`comparison-preview-wrap ${viewMode === "mobile" ? "comparison-preview-wrap--phone" : ""}`}
      >
        <div
          className="comparison-phone-controls"
          role="group"
          aria-label="Choose before or after design"
        >
          <button
            type="button"
            aria-pressed={phoneVersion === "before"}
            onClick={() => setPhoneVersion("before")}
          >
            Before
          </button>
          <button
            type="button"
            aria-pressed={phoneVersion === "after"}
            onClick={() => setPhoneVersion("after")}
          >
            After
          </button>
        </div>
        <div
          className="comparison-desktop-canvas"
          aria-hidden="true"
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            dragPointer.current = event.pointerId;
            event.currentTarget.setPointerCapture(event.pointerId);
            updatePosition(event);
          }}
          onPointerMove={(event) => {
            if (dragPointer.current === event.pointerId) updatePosition(event);
          }}
          onPointerUp={(event) => {
            if (dragPointer.current === event.pointerId) {
              dragPointer.current = null;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={() => {
            dragPointer.current = null;
          }}
        >
          <DesignPreview item={item} version="before" />
          <div
            className="comparison-after-layer"
            style={{ clipPath: `inset(0 0 0 ${100 - afterPercentage}%)` }}
          >
            <DesignPreview item={item} version="after" />
          </div>
          <div className="comparison-divider" style={{ left: `${100 - afterPercentage}%` }}>
            <span>
              <ArrowLeftRight size={18} />
            </span>
          </div>
        </div>
        <div className="comparison-phone-canvas" aria-hidden="true">
          <DesignPreview item={item} version={phoneVersion} />
        </div>
        <div className="comparison-range-controls">
          <div className="comparison-range-labels">
            <button type="button" onClick={() => setAfterPercentage(0)}>
              Show before
            </button>
            <span aria-hidden="true">{afterPercentage}% after</span>
            <button type="button" onClick={() => setAfterPercentage(100)}>
              Show after
            </button>
          </div>
          <label htmlFor={sliderId} className="sr-only">
            Compare before and after design for {item.tradeName}
          </label>
          <input
            id={sliderId}
            type="range"
            min="0"
            max="100"
            value={afterPercentage}
            onChange={(event) => setAfterPercentage(Number(event.target.value))}
            aria-valuetext={`${afterPercentage}% after design, ${100 - afterPercentage}% before design`}
          />
          <p>Use the arrow keys, or select a complete version above.</p>
        </div>
      </div>

      <div className="comparison-summary" aria-live="polite">
        <div>
          <p className="studio-kicker">Before</p>
          <h3>Harder to find the next step.</h3>
          <p>A crowded headline, competing messages and a generic enquiry link.</p>
        </div>
        <div>
          <p className="studio-kicker">After</p>
          <h3>Clearer services. Easier enquiries.</h3>
          <p>
            A focused introduction to {item.tradeName.toLowerCase()}, readable copy and a prominent
            route to enquire.
          </p>
        </div>
      </div>
      <div className="comparison-action">
        <div>
          <h3>See the possibilities for your business.</h3>
          <p>Tell us about your existing website and what you would like it to do better.</p>
        </div>
        <PillButton
          as="link"
          to="/contact"
          search={{ service: `Website Redesign: ${item.tradeName}` }}
          variant="dark"
          className="studio-button"
        >
          Get your website plan
        </PillButton>
      </div>
    </div>
  );
}
