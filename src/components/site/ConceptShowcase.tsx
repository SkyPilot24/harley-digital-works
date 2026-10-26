import { useRef, useState } from "react";
import { ArrowUpRight, Monitor, Smartphone, Sun } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PillButton } from "./PillButton";

export type ConceptKey = "architecture" | "solar" | "interior";

const studioConcepts = {
  architecture: {
    name: "FORM & FIELD",
    category: "Building & renovation",
    title: "Exceptional domestic extensions. A fitting first impression.",
    description:
      "A confident digital showcase for an established domestic builder. Completed rear kitchen extensions, structural steelwork, and open-plan living give prospective clients confidence to invest.",
    image: "/images/home/extension-renovation.jpg",
    alt: "High-spec open-plan kitchen and living extension with exposed steel RSJ beam and bifold doors opening to a garden",
    services: "Art direction / Website design / Copywriting",
    number: "01",
  },
  solar: {
    name: "SOLIS",
    category: "Solar & renewable energy",
    title: "A brighter way to present clean energy.",
    description:
      "A confident direction for a South West renewable energy contractor. Clear domestic PV packages, home EV charging points, and local van branding make technical services approachable.",
    image: "/images/home/renewables-solar-ev.jpg",
    alt: "Domestic rooftop solar installation and wall-mounted EV charger on a British home with South West Renewables trade van",
    services: "Brand expression / Website design / Mobile UX",
    number: "02",
  },
  interior: {
    name: "Stillwater",
    category: "Bathrooms & interiors",
    title: "Craftsmanship you can almost feel.",
    description:
      "A quieter, tactile direction for a bespoke bathroom renovation specialist. Fluted oak, brushed brass rainfall showers, and natural stone tiles showcase exceptional attention to detail.",
    image: "/images/home/bathroom-interior.jpg",
    alt: "Bespoke master bathroom with brushed brass rainfall shower, fluted oak vanity and natural light through sash window",
    services: "Art direction / Website design / Enquiry journey",
    number: "03",
  },
} as const;

/** Real HTML design studies, not fabricated screenshots or client results. */
export function ConceptScreen({
  concept,
  priority = false,
}: {
  concept: ConceptKey;
  priority?: boolean;
}) {
  const data = studioConcepts[concept];
  return (
    <div
      className={`concept-screen concept-screen--${concept}`}
      role="img"
      aria-label={`${data.name}: independent ${data.category.toLowerCase()} website design concept`}
    >
      <div className="concept-content" aria-hidden="true">
        <div className="concept-nav">
          <span className="concept-brand">
            {concept === "solar" && <Sun />}
            {data.name}
            <span className="concept-brand-dot">.</span>
          </span>
          <span className="concept-nav-links">
            Our approach <span>Selected projects</span>
          </span>
          <span className="concept-nav-cta">
            Let’s talk <ArrowUpRight />
          </span>
        </div>
        {concept === "architecture" ? (
          <>
            <div className="concept-photo architecture-photo">
              <img
                src={data.image}
                alt=""
                width="1800"
                height="1200"
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                {...(priority ? { fetchPriority: "high" } : {})}
              />
              <div className="architecture-copy">
                <span>CONSIDERED DESIGN. EXCEPTIONAL BUILD.</span>
                <p>
                  Space to live.
                  <br />
                  <em>Room to dream.</em>
                </p>
                <span className="concept-image-cta">
                  Discover our approach <ArrowUpRight />
                </span>
              </div>
              <span className="concept-photo-index">01 — THE GARDEN HOUSE</span>
            </div>
            <div className="concept-bottom">
              <span>
                Beautiful homes.
                <br />
                Thoughtfully built.
              </span>
              <p>
                From the first conversation to the finishing touches.
                <br />A considered approach to the place you call home.
              </p>
              <ArrowUpRight />
            </div>
          </>
        ) : concept === "solar" ? (
          <>
            <div className="solar-copy">
              <span>A BETTER KIND OF ENERGY</span>
              <p>
                Power your home.
                <br />
                <em>Lighten your footprint.</em>
              </p>
              <span className="concept-solid-cta">
                Find your solar solution <ArrowUpRight />
              </span>
            </div>
            <div className="concept-photo solar-photo">
              <img src={data.image} alt="" width="1200" height="798" loading="lazy" />
              <span className="solar-photo-note">Solar. Storage. A smarter future.</span>
            </div>
          </>
        ) : (
          <div className="interior-layout">
            <div className="interior-copy">
              <span>BEAUTIFULLY PERSONAL BATHROOMS</span>
              <p>
                Your everyday.
                <br />
                <em>Extraordinary.</em>
              </p>
              <span className="concept-image-cta">
                Find your inspiration <ArrowUpRight />
              </span>
              <span className="interior-note">
                Designed around you.
                <br />
                Finished with care.
              </span>
            </div>
            <div className="concept-photo interior-photo">
              <img src={data.image} alt="" width="1200" height="801" loading="lazy" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ConceptShowcase({
  concept,
  featured = false,
}: {
  concept: ConceptKey;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const data = studioConcepts[concept];
  return (
    <article className={`studio-project ${featured ? "studio-project--featured" : ""}`}>
      <button
        className={`project-stage project-stage--${concept}`}
        onClick={(event) => {
          opener.current = event.currentTarget;
          setOpen(true);
        }}
        aria-label={`View ${data.name} design study`}
      >
        <span className="project-stage-label">{data.number} / INDEPENDENT DESIGN STUDY</span>
        <span className="project-browser">
          <span className="browser-toolbar">
            <i />
            <i />
            <i />
            <span>{data.name.toLowerCase()} — design concept</span>
          </span>
          <ConceptScreen concept={concept} />
        </span>
        {featured && (
          <span className="project-phone" aria-hidden="true">
            <ConceptScreen concept={concept} />
          </span>
        )}
        <span className="project-open">
          <ArrowUpRight size={20} />
        </span>
      </button>
      <div className="project-caption">
        <div>
          <p className="studio-kicker">{data.category}</p>
          <h3>{data.title}</h3>
          <p>{data.services}</p>
        </div>
        <button
          onClick={(event) => {
            opener.current = event.currentTarget;
            setOpen(true);
          }}
          className="studio-text-link"
        >
          View design <ArrowUpRight size={17} />
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="concept-dialog sm:max-w-5xl"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
        >
          <DialogHeader>
            <DialogTitle>{data.name} — design study</DialogTitle>
            <DialogDescription>
              {data.description} This is an independent concept using illustrative stock
              photography, not a commissioned client project.
            </DialogDescription>
          </DialogHeader>
          <div className="concept-device-switch" aria-label="Preview size">
            <button aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}>
              <Monitor size={16} /> Desktop
            </button>
            <button aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")}>
              <Smartphone size={16} /> Mobile
            </button>
          </div>
          <div className={`concept-dialog-preview ${device === "mobile" ? "is-mobile" : ""}`}>
            <ConceptScreen concept={concept} />
          </div>
          <div className="concept-dialog-footer">
            <span>Like this direction? Let’s make it your own.</span>
            <PillButton
              as="link"
              to="/contact"
              search={{ service: `${data.category} website` }}
              variant="dark"
            >
              Discuss your website
            </PillButton>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
