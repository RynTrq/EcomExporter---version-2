import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { getPartners, type PartnerId } from "@/components/partner-logos";

type HeroImage = {
  src: string;
  shape: "short" | "tall";
  label: string;
  position?: string;
};

const columns: HeroImage[][] = [
  [
    { src: "/hero/ebay-dashboard.webp", shape: "short", label: "Take your products global" },
    { src: "/hero/building-brands.webp", shape: "tall", label: "Build brands people trust" },
    { src: "/hero/meesho-mobile.webp", shape: "short", label: "Operate fast-moving marketplaces" },
    { src: "/hero/creative-commerce.webp", shape: "tall", label: "Turn brand strategy into storefronts" },
    { src: "/hero/etsy-collections.webp", shape: "short", label: "Shape collections shoppers can navigate" },
    { src: "/hero/plant-sale.webp", shape: "tall", label: "Make every product easier to buy" },
    { src: "/hero/shopify-sign.webp", shape: "short", label: "Build a storefront you control" },
  ],
  [
    { src: "/hero/brand-kit.webp", shape: "short", label: "Create a brand system that travels" },
    { src: "/hero/ebay-payoneer.webp", shape: "tall", label: "Connect selling with global payouts" },
    { src: "/hero/flipkart-mobile.webp", shape: "short", label: "Win attention on mobile marketplaces" },
    { src: "/hero/jewelry-marketplace.webp", shape: "tall", label: "Position premium products for discovery" },
    { src: "/hero/marketplace-app-grid.webp", shape: "short", label: "Run every channel from one rhythm" },
    { src: "/hero/sales-promo.webp", shape: "tall", label: "Turn campaign ideas into commerce" },
  ],
  [
    { src: "/hero/walmart-store.webp", shape: "short", label: "Prepare products for retail scale" },
    { src: "/hero/greatness-billboard.webp", shape: "tall", label: "Build for durable marketplace growth" },
    { src: "/hero/amazon-marketplace.webp", shape: "short", label: "Meet shoppers where demand moves" },
    { src: "/hero/sale-campaign.webp", shape: "tall", label: "Design campaigns that earn attention" },
    { src: "/hero/amazon-operations.webp", shape: "short", label: "Keep marketplace operations in control" },
    {
      src: "/hero/global-craft.webp",
      shape: "tall",
      label: "Take local craftsmanship to global buyers",
      position: "70% center",
    },
  ],
];

const marketplaces: PartnerId[] = [
  "etsy",
  "ebay",
  "walmart",
  "flipkart",
  "amazon-india",
  "amazon-global",
  "shopify",
  "alibaba",
  "meesho",
  "myntra",
];

const operatingSnapshot = [
  ["Margin review", "Flagged"],
  ["Listing queue", "Prioritized"],
  ["Owner actions", "Assigned"],
] as const;

const chapters = [
  {
    label: "SIGNAL 01 — BEFORE",
    title: "Every channel tells a different story.",
    text: "Ads look healthy, inventory is tight, catalog issues are hidden, and no one owns the next decision. This is the noise every serious seller lives inside.",
  },
  {
    label: "SIGNAL 02 — DURING",
    title: "Ecom Exporter pulls the noise into orbit.",
    text: "We connect marketplace signals, SKU economics, account health, approvals, and owners into one visible weekly operating rhythm.",
  },
  {
    label: "SIGNAL 03 — AFTER",
    title: "The business gets calmer as it grows.",
    text: "Leaders see what changed, why it mattered, what needs approval, and where margin is being protected. Order, from chaos.",
  },
];

function HeroCard({
  image,
  eager = false,
  fetchHigh = false,
}: {
  image: HeroImage;
  eager?: boolean;
  fetchHigh?: boolean;
}) {
  return (
    <div
      className={`commerce-hero-card is-${image.shape}`}
      data-cursor={image.label}
    >
      <Image
        alt=""
        fill
        loading={eager ? "eager" : "lazy"}
        fetchPriority={fetchHigh ? "high" : undefined}
        quality={75}
        sizes="(min-width: 1280px) 15vw, 140px"
        src={image.src}
        style={{ objectPosition: image.position ?? "center" }}
      />
    </div>
  );
}

function ImageStrip({
  images,
  clone = false,
  fetchHigh = false,
}: {
  images: HeroImage[];
  clone?: boolean;
  fetchHigh?: boolean;
}) {
  return (
    <div className="commerce-hero-strip" aria-hidden={clone || undefined}>
      {images.map((image, index) => (
        <HeroCard
          image={image}
          key={`${image.src}-${clone ? "clone" : "original"}`}
          eager={!clone && fetchHigh && index === 0}
          fetchHigh={!clone && fetchHigh && index === 0}
        />
      ))}
    </div>
  );
}

export function HomeHero() {
  return (
    <>
      <section
        className="commerce-hero"
        id="home-hero"
        data-motion-surface=""
        data-section-label="Marketplace growth"
        aria-labelledby="commerce-hero-title"
      >
        <div className="commerce-hero-layout">
          <div className="commerce-hero-copy">
            <p className="commerce-hero-status">
              <i aria-hidden="true" />
              LIVE — 10+ MARKETPLACES UNDER MANAGEMENT
            </p>
            <h1 id="commerce-hero-title">
              <span>Accelerate your</span>
              <em>ecommerce success</em>
              <span>with expert management.</span>
            </h1>
            <p className="commerce-hero-summary">
              Ecom Exporter helps ecommerce brands scale faster with strategic,
              data-driven marketplace management — from optimizing daily
              operations to improving brand visibility and sales performance
              across leading platforms.
            </p>
            <div className="commerce-hero-actions">
              <Link className="button button-accent" href="#growth-plan">
                Find my growth constraint <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="commerce-hero-secondary" href="/platform">
                Explore the operating model
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <dl className="commerce-hero-telemetry" aria-label="Illustrative operating workflow">
              {operatingSnapshot.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="commerce-hero-wall" aria-hidden="true">
            {columns.map((images, index) => (
              <div
                className={`commerce-hero-column direction-${index === 1 ? "up" : "down"}`}
                key={`column-${index}`}
              >
                <div className="commerce-hero-track">
                  <ImageStrip images={images} fetchHigh={index === 0} />
                  <ImageStrip images={images} clone />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="commerce-hero-marketplaces" aria-label="Marketplaces Ecom Exporter operates">
          <div className="commerce-hero-marketplace-heading">
            <span>OPERATING ACROSS</span>
            <button
              aria-label="Pause hero gallery motion"
              aria-pressed="false"
              className="hero-motion-toggle"
              data-hero-motion-toggle=""
              type="button"
            >
              <span className="hero-motion-icon" aria-hidden="true">
                <Pause className="hero-motion-pause" size={12} />
                <Play className="hero-motion-play" size={12} />
              </span>
              <span data-hero-motion-label="">Pause motion</span>
            </button>
          </div>
          <div className="commerce-hero-partners">
            <div className="commerce-hero-partner-track">
              {[false, true].map((clone) => (
                <div
                  aria-hidden={clone || undefined}
                  className="commerce-hero-partner-set"
                  key={clone ? "partner-clone" : "partner-original"}
                >
                  {getPartners(marketplaces).map((partner) => (
                    <span
                      className="commerce-hero-partner"
                      key={`${partner.id}-${clone ? "clone" : "original"}`}
                    >
                      {partner.render()}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="signal-story" aria-labelledby="signal-story-title">
        <div className="container">
          <h2 className="sr-only" id="signal-story-title">
            How Ecom Exporter turns marketplace noise into clear action
          </h2>
          <div className="signal-story-grid">
            {chapters.map((chapter, index) => (
              <article key={chapter.label} data-reveal="">
                <div className="signal-story-index" aria-hidden="true">0{index + 1}</div>
                <span>{chapter.label}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
