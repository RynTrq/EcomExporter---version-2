import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BadgeCheck, Calculator, Check } from "lucide-react";
import {
  authorisedPartnerPoints,
  calculatorPlatforms,
  marketplaceAccounts,
  marketplaceProcess,
  marketplaceServices,
  marketplaceValueProps,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { getPartners, type PartnerId } from "@/components/partner-logos";

export const metadata = createMetadata({
  title: "Marketplaces we operate — authorized partner services",
  description:
    "Authorized onboarding and account-management partner across Amazon India, Amazon Global, Walmart, eBay, Etsy, Flipkart, Meesho, and Shopify — with transparent profit calculators.",
  path: "/marketplaces",
});

const marketplaceIds: PartnerId[] = [
  "amazon-india",
  "amazon-global",
  "walmart",
  "ebay",
  "etsy",
  "flipkart",
  "meesho",
  "shopify",
];

export default function MarketplacesPage() {
  const marketplaces = getPartners(marketplaceIds);

  return (
    <>
      <section className="page-hero calculator-page-hero">
        <div className="container page-hero-grid">
          <div data-reveal="">
            <span className="eyebrow">Authorized marketplace partners</span>
            <h1>
              Complete marketplace solutions, from setup to sales growth.
            </h1>
          </div>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            We are an authorized onboarding and account-management partner across
            every major marketplace — running cataloging, advertising, and
            operations end to end so you can scale with control.
          </p>
        </div>
      </section>

      <section className="auth-banner-section">
        <div className="container auth-banner" data-reveal="">
          <div className="auth-banner-head">
            <BadgeCheck size={26} />
            <h2>Authorised Partner</h2>
          </div>
          <ul className="auth-banner-points">
            {authorisedPartnerPoints.map((point) => (
              <li key={point}>
                <Check size={16} /> {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container trust-grid">
          <div className="trust-media" data-reveal="">
            <Image
              src="/services/trusted-partner.jpg"
              alt="Ecom Exporter marketplace account management team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="trust-stamp">
              <BadgeCheck size={15} /> Authorized partner
            </span>
          </div>
          <div
            className="trust-copy"
            data-reveal=""
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <span className="eyebrow">Why sellers trust us</span>
            <h2>
              Trusted by 2,000+ sellers to run their marketplace growth.
            </h2>
            <p>
              From listing optimization, cataloguing, advertising campaigns,
              inventory &amp; order management, and pricing to boosting product
              visibility — we operate it end to end, on your behalf.
            </p>
            <div className="trust-stats">
              <div>
                <strong>2,000+</strong>
                <small>Sellers trusted</small>
              </div>
              <div>
                <strong>9</strong>
                <small>Marketplaces managed</small>
              </div>
              <div>
                <strong>End-to-end</strong>
                <small>Account operations</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading centered" data-reveal="">
          <span className="eyebrow">What we run for you</span>
          <h2>
            Complete e-commerce solutions, from setup to sales growth.
          </h2>
        </div>
        <div className="container service-feature-grid">
          {marketplaceServices.map((service, index) => (
            <article
              className="service-feature-card"
              data-reveal=""
              key={service.slug}
              style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
            >
              <div className="service-feature-art">
                <Image
                  src={`/services/${service.slug}.jpg`}
                  alt={`${service.title} ecommerce service`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 420px"
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
          <Link className="service-feature-card service-feature-cta" href="/contact" data-cursor="ALL">
            <span className="eyebrow">Ready when you are</span>
            <h3>Get a tailored growth plan</h3>
            <span className="arrow-link">
              Talk to an operator <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading centered" data-reveal="">
          <span className="eyebrow">Everything it takes to win</span>
          <h2>Why sellers choose Ecom Exporter.</h2>
        </div>
        <div className="container valueprop-grid">
          {marketplaceValueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <article
                className="valueprop-card"
                data-reveal=""
                key={prop.title}
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
              >
                <span className="valueprop-icon">
                  <Icon size={22} />
                </span>
                <h3>{prop.title}</h3>
                <p>{prop.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading centered" data-reveal="">
          <span className="eyebrow">Where we sell on your behalf</span>
          <h2>Account management for every major marketplace.</h2>
        </div>
        <div className="container marketplace-grid">
          {marketplaces.map((marketplace, index) => {
            const account = marketplaceAccounts[marketplace.id];
            return (
              <article
                className="marketplace-card"
                data-reveal=""
                key={marketplace.id}
                style={{ "--reveal-delay": `${(index % 2) * 70}ms` } as React.CSSProperties}
              >
                <div className="marketplace-art">
                  <Image
                    src={`/marketplaces/${marketplace.id}.jpg`}
                    alt={`${marketplace.name} marketplace account management`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 420px"
                  />
                  <span className="marketplace-badge">
                    <BadgeCheck size={13} /> Authorised partner
                  </span>
                </div>
                <div className="marketplace-logo">{marketplace.render()}</div>
                <h3>{marketplace.name} Account Management Service</h3>
                <p>{account?.description ?? marketplace.note}</p>
                {account ? (
                  <div className="marketplace-tags">
                    {account.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : null}
                <Link className="arrow-link" href="/contact" data-cursor="ALL">
                  Start onboarding <ArrowUpRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section process-section">
        <div className="container section-heading-row">
          <div data-reveal="">
            <span className="eyebrow">How it works</span>
            <h2>Three steps to a working growth plan.</h2>
          </div>
          <Link className="button button-accent" href="/contact">
            Book a call <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="container process-steps">
          {marketplaceProcess.map((item, index) => (
            <article
              className="process-step"
              data-reveal=""
              key={item.step}
              style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <span className="process-step-num">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-dark system-section">
        <div className="container section-heading-row">
          <div data-reveal="">
            <span className="eyebrow light">Free seller tools</span>
            <h2>
              Know the unit economics before you chase the revenue.
            </h2>
          </div>
          <p className="section-side-copy" data-reveal="">
            Model marketplace fees, ads, shipping, product cost, tax, and
            contribution margin with every assumption on the table.
          </p>
        </div>
        <div className="container calculator-card-grid">
          {calculatorPlatforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <Link
                className={`calculator-card calculator-card-${(index % 4) + 1}`}
                data-reveal=""
                data-cursor={`Model ${platform.name}`}
                href={`/marketplaces/${platform.slug}`}
                key={platform.slug}
                style={{ "--reveal-delay": `${(index % 2) * 60}ms` } as React.CSSProperties}
              >
                <div>
                  <span className="calculator-card-icon">
                    <Icon size={24} />
                  </span>
                  <ArrowUpRight size={19} />
                </div>
                <small>{platform.currency} economics</small>
                <h3>{platform.name}</h3>
                <p>
                  Estimate channel fees, cost to serve, profit, and contribution
                  margin for a single product scenario.
                </p>
                <span className="calculator-card-cta">
                  Open calculator <Calculator size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="methodology-band">
        <div className="container" data-reveal="">
          <span className="eyebrow light">Transparent methodology</span>
          <h2>
            Every estimate shows what is included and what can change.
          </h2>
          <p>
            Marketplace fee schedules vary by category, region, fulfillment,
            seller tier, and effective date. These tools are for planning, not
            tax or legal advice. We expose the assumptions so you can challenge
            them.
          </p>
        </div>
      </section>
    </>
  );
}
