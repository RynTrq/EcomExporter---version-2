import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CircleCheck,
  FileSearch,
  Gauge,
  Headphones,
  Layers3,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { LeadForm } from "@/components/lead-form";
import { getPartners, type PartnerId } from "@/components/partner-logos";
import {
  insights,
  operatingLoop,
  operatingPillars,
  services,
  solutions,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Accelerate your ecommerce success with expert marketplace management",
  description:
    "Ecom Exporter helps ecommerce brands scale faster with strategic, data-driven marketplace management — cataloging, account management, advertising, and sales growth across Amazon, Flipkart, Meesho, Myntra, Walmart and more.",
  path: "/",
});

const marqueePartnerIds: PartnerId[] = [
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

const whyChoose = [
  {
    icon: FileSearch,
    title: "Expert account optimization",
    metric: "Accounts",
    text: "We optimize your ecommerce accounts and product listings to improve search visibility, customer engagement, and overall sales performance.",
  },
  {
    icon: Megaphone,
    title: "Growth-focused marketing strategies",
    metric: "Marketing",
    text: "Data-driven campaigns tailored to your business goals — attract the right audience, increase traffic, and generate higher conversions.",
  },
  {
    icon: Headphones,
    title: "Dedicated business support",
    metric: "Support",
    text: "Reliable, responsive support from a team that understands ecommerce operations inside out, solving challenges quickly.",
  },
  {
    icon: BarChart3,
    title: "Advanced performance insights",
    metric: "Analytics",
    text: "Track your store's growth with detailed analytics and actionable performance reports that improve results consistently.",
  },
  {
    icon: Layers3,
    title: "Multichannel selling expertise",
    metric: "10+ channels",
    text: "Expand your reach across marketplaces with consistent branding and maximized sales opportunities online.",
  },
  {
    icon: TrendingUp,
    title: "Scalable ecommerce solutions",
    metric: "Any stage",
    text: "Whether you are just starting or looking to expand, our flexible solutions grow alongside your business needs.",
  },
];

const faqItems = [
  {
    question: "What is Ecom Exporter and how can it help my business?",
    answer:
      "Ecom Exporter is a full-service ecommerce growth and account management company that helps brands build, manage, and scale their online business across major marketplaces such as Amazon, Flipkart, Meesho, Myntra, and Walmart. From product listing optimization and advertising management to brand growth strategies and daily account operations, our team provides complete ecommerce solutions designed to improve visibility, increase sales, and accelerate long-term business growth.",
  },
  {
    question: "Which ecommerce platforms does Ecom Exporter support?",
    answer:
      "We provide complete ecommerce management and growth solutions across leading online marketplaces, including Amazon, Flipkart, Meesho, Myntra, Ajio, JioMart, Etsy, Walmart, and eBay. Our team also supports multichannel and cross-border ecommerce operations, helping businesses expand their reach, manage international marketplaces, and scale efficiently across multiple selling platforms.",
  },
  {
    question: "Can Ecom Exporter manage my entire ecommerce account?",
    answer:
      "Yes, we provide complete end-to-end ecommerce account management solutions tailored to your business needs. Our team handles everything from product listing creation and optimization to inventory coordination, advertising management, performance monitoring, customer support guidance, and marketplace compliance — so you can stay focused on growing your business.",
  },
  {
    question: "Do you help new sellers start their ecommerce journey?",
    answer:
      "Absolutely. Ecom Exporter specializes in helping new and first-time sellers launch their online business with confidence. From marketplace registration and account setup to product listing creation, branding, and onboarding support, we guide you through every step — ensuring your store is professionally structured and fully prepared to start selling successfully.",
  },
  {
    question: "Do you offer customized pricing plans?",
    answer:
      "Yes. Ecom Exporter provides flexible pricing solutions tailored to your business goals, marketplace requirements, and service needs. Since every ecommerce business operates differently, our plans are designed to match the level of support, management, and growth strategy your brand requires. Book a consultation with our team to receive a customized quote and a growth plan built specifically for your business.",
  },
  {
    question: "What makes Ecom Exporter different from other ecommerce agencies?",
    answer:
      "We combine marketplace expertise, performance-driven strategies, and dedicated account management to deliver measurable ecommerce growth. Our team focuses on creating customized solutions based on your business goals rather than one-size-fits-all approaches — combining strategic management, data-driven decision making, and personalized support.",
  },
  {
    question: "How quickly can I expect results after getting started?",
    answer:
      "Most businesses working with Ecom Exporter begin noticing improvements within the first few weeks, especially in product visibility, catalog optimization, account health, and overall marketplace performance. As strategies are implemented and optimized, brands typically experience stronger traffic, improved conversions, and steady sales growth within the first 45–60 days, depending on the marketplace, competition, and category.",
  },
  {
    question: "Do you manage ecommerce advertising and promotions?",
    answer:
      "Yes. Ecom Exporter offers complete advertising and promotional management services designed to increase product visibility, drive targeted traffic, and improve overall sales performance. We handle marketplace advertising campaigns, promotional strategies, deal setups, keyword targeting, budget optimization, and real-time performance monitoring — continuously analyzing campaign data to maximize returns.",
  },
  {
    question: "How can I get started with Ecom Exporter?",
    answer:
      "Getting started is simple. Schedule a free consultation with our team, and we'll take the time to understand your business goals, current challenges, and growth opportunities. Based on your requirements, we'll recommend the most effective ecommerce solutions and create a customized strategy to help your brand grow across leading online marketplaces.",
  },
  {
    question: "Can Ecom Exporter help with international selling and company registration?",
    answer:
      "Yes. We assist businesses with global ecommerce expansion by providing support for international company formation, marketplace onboarding, and cross-border selling strategies. Our services include assistance with company registration in countries such as the USA, UK, and UAE, along with guidance for business documentation, marketplace account setup, and ecommerce platform entry.",
  },
];

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <HomeHero />

      {/* ACT III · THE SYSTEM */}
      <section className="section system-section">
        <div className="container">
          <div className="section-heading" data-reveal="">
            <span className="eyebrow">Why choose Ecom Exporter</span>
            <h2>
              Expertise that delivers results — trusted by 2,000+ sellers.
            </h2>
            <p>
              We help brands grow faster with result-driven ecommerce solutions
              built for modern online marketplaces — combining strategy,
              technology, and marketplace expertise to create long-term
              business success.
            </p>
          </div>
          <div className="constraint-grid">
            {whyChoose.map((route, index) => {
              const Icon = route.icon;
              return (
                <Link
                  className={`constraint-card${index === 0 ? " is-primary" : ""}`}
                  data-reveal=""
                  data-cursor="DIAGNOSE"
                  href="#growth-plan"
                  key={route.title}
                  style={{ "--reveal-delay": `${index * 55}ms` } as React.CSSProperties}
                >
                  <span className="constraint-card-top">
                    <span className="constraint-icon">
                      <Icon size={20} />
                    </span>
                    <strong>{route.metric}</strong>
                  </span>
                  <h3>{route.title}</h3>
                  <p>{route.text}</p>
                  <span className="arrow-link">
                    Talk to our team <ArrowUpRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section system-section transformation-section">
        <div className="container transformation-grid">
          <div className="transformation-copy" data-reveal="">
            <span className="eyebrow">The uncomfortable truth</span>
            <h2>
              Most growth work fails because the system around it is weak.
            </h2>
            <p>
              Sellers do not lose momentum because one listing, ad campaign, or
              shipping lane is imperfect. They lose momentum because nobody is
              connecting the decisions. Ecom Exporter fixes the operating layer
              first, then compounds execution.
            </p>
          </div>
          <div
            className="before-after-console"
            data-reveal=""
          >
            <div className="chaos-column">
              <span>Before</span>
              <h3>Every channel tells a different story.</h3>
              {[
                ["Ads dashboard", "ACOS down, margin still leaking"],
                ["Catalog queue", "18 issues across 41 SKUs"],
                ["Ops thread", "Inventory risk without owner"],
              ].map(([label, text]) => (
                <p key={label}>
                  <small>{label}</small>
                  {text}
                </p>
              ))}
            </div>
            <div className="decision-bridge">
              <span>During</span>
              <strong>Decision layer</strong>
              <p>
                Marketplace signals, SKU economics, approvals, and owners in
                one visible growth rhythm.
              </p>
            </div>
            <div className="control-column">
              <span>After</span>
              <h3>The business gets calmer as it grows.</h3>
              {[
                ["Owner", "Marketplace lead assigned"],
                ["Economics", "₹1.42L margin protected"],
                ["Evidence", "Before/after proof attached"],
              ].map(([label, text]) => (
                <p key={label}>
                  <Check size={15} />
                  <span>
                    <small>{label}</small>
                    {text}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section system-section">
        <div className="container split-heading">
          <div data-reveal="">
            <span className="eyebrow">Not another disconnected agency</span>
            <h2>
              Growth work is only valuable when the operation behind it works.
            </h2>
          </div>
          <div className="intro-copy" data-reveal="">
            <p>
              Most sellers juggle specialists, spreadsheets, and marketplace
              support queues. Ecom Exporter turns that fragmented effort into one
              prioritized operating plan with visible owners and measurable
              economics.
            </p>
            <Link className="arrow-link" data-cursor="READ" href="/about">
              How we work <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="container pillar-grid">
          {operatingPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <article
                className="pillar-card"
                key={pillar.title}
                data-reveal=""
                style={{ "--reveal-delay": `${index * 55}ms` } as React.CSSProperties}
              >
                <span className="pillar-number">0{index + 1}</span>
                <Icon size={26} />
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section system-section operating-loop-section">
        <div className="container section-heading-row">
          <div data-reveal="">
            <span className="eyebrow">The operating loop</span>
            <h2>
              A weekly rhythm that makes growth feel less accidental.
            </h2>
          </div>
          <p className="section-side-copy" data-reveal="">
            The point is not more dashboards. The point is fewer blind spots,
            faster decisions, and a clear record of what moved the business.
          </p>
        </div>
        <div className="container loop-grid">
          {operatingLoop.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                data-reveal=""
                style={{ "--reveal-delay": `${index * 50}ms` } as React.CSSProperties}
              >
                <span className="loop-index">0{index + 1}</span>
                <span className="loop-icon">
                  <Icon size={22} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ACT IV · CONTROL */}
      <div className="proof-band" aria-label="Ecom Exporter operating footprint">
        <div className="container proof-band-grid">
          {[
            ["₹1.42L", "margin recovered this cycle"],
            ["18", "catalog issues prioritized"],
            ["10+", "marketplaces operated"],
            ["2,000+", "sellers trust Ecom Exporter"],
          ].map(([value, label], index) => (
            <div
              key={value}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 45}ms` } as React.CSSProperties}
            >
              <strong data-counter="">{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="section section-dark system-section" data-motion-surface="">
        <div className="container platform-grid">
          <div className="platform-copy" data-reveal="">
            <span className="eyebrow light">Clarity at operating speed</span>
            <h2>
              Know what is happening, what matters, and what happens next.
            </h2>
            <p>
              Every engagement runs through a shared operating layer: roadmap,
              approvals, service levels, KPI movement, profitability, and an
              audit trail of completed work.
            </p>
            <ul className="check-list">
              <li>
                <CircleCheck size={18} /> One prioritized growth roadmap
              </li>
              <li>
                <CircleCheck size={18} /> SKU and marketplace profitability
              </li>
              <li>
                <CircleCheck size={18} /> Visible actions, owners, and deadlines
              </li>
              <li>
                <CircleCheck size={18} /> Executive reporting without the theatre
              </li>
            </ul>
            <Link
              className="button button-light"

              data-cursor="EXPLORE"
              href="/platform"
            >
              Explore the platform <ArrowRight size={16} />
            </Link>
          </div>
          <div
            className="ops-panel"
            data-reveal=""
          >
            <div className="ops-panel-head">
              <div>
                <span className="status-dot" />
                weekly_growth_system
              </div>
              <small>MAY 18–24</small>
            </div>
            <div className="ops-score">
              <div>
                <small>Growth score</small>
                <strong data-counter="">84</strong>
                <span>+11 this month</span>
              </div>
              <div className="score-ring">
                <svg viewBox="0 0 44 44" aria-hidden="true">
                  <circle className="score-ring-track" cx="22" cy="22" r="19" pathLength="100" />
                  <circle className="score-ring-progress" cx="22" cy="22" r="19" pathLength="100" />
                </svg>
                <span>84%</span>
              </div>
            </div>
            <div className="ops-rows">
              <div>
                <span className="ops-icon coral">
                  <Gauge size={17} />
                </span>
                <p>
                  <strong>Advertising efficiency</strong>
                  <small>TACoS improved by 2.8 pts</small>
                </p>
                <b>92</b>
              </div>
              <div>
                <span className="ops-icon amber">
                  <Layers3 size={17} />
                </span>
                <p>
                  <strong>Catalog quality</strong>
                  <small>18 listings need action</small>
                </p>
                <b>78</b>
              </div>
              <div>
                <span className="ops-icon green">
                  <Check size={17} />
                </span>
                <p>
                  <strong>Account health</strong>
                  <small>No critical risks</small>
                </p>
                <b>96</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section system-section">
        <div className="container section-heading-row">
          <div data-reveal="">
            <span className="eyebrow">Our services</span>
            <h2>
              Complete ecommerce growth solutions — from launch to scale.
            </h2>
          </div>
          <Link
            className="button button-outline"

            data-reveal=""
            data-cursor="ALL"
            href="/services"
          >
            Explore every service <ArrowRight size={16} />
          </Link>
        </div>
        <div className="container service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                className="service-card"
                data-reveal=""
                data-cursor={service.name}
                href={`/services/${service.slug}`}
                key={service.slug}
                style={
                  {
                    "--card-accent": service.color,
                    "--reveal-delay": `${index * 50}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="service-card-top">
                  <span className="service-icon">
                    <Icon size={22} />
                  </span>
                  <ArrowUpRight size={19} />
                </div>
                <small>{service.eyebrow}</small>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <span className="service-line" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section system-section">
        <div className="container section-heading centered" data-reveal="">
          <span className="eyebrow">The capabilities behind the growth</span>
          <h2>
            Everything required to move from listing products to running
            commerce.
          </h2>
          <p>
            Bring in one focused capability or assemble a complete operating pod
            around your priorities.
          </p>
        </div>
        <div className="container solution-grid" style={{ marginTop: "56px" }}>
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Link
                className="solution-card"
                data-reveal=""
                data-cursor={solution.name}
                href={`/solutions/${solution.slug}`}
                key={solution.slug}
                style={{ "--reveal-delay": `${index * 45}ms` } as React.CSSProperties}
              >
                <span
                  className="solution-icon"
                  style={{ backgroundColor: solution.accent }}
                >
                  <Icon size={22} />
                </span>
                <h3>{solution.name}</h3>
                <p>{solution.summary}</p>
                <span className="arrow-link">
                  Learn more <ArrowUpRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section system-section">
        <div className="container section-heading centered" data-reveal="">
          <span className="eyebrow">Our partners</span>
          <h2>Onboarding partners across every major marketplace.</h2>
          <p>
            We onboard, manage, and grow seller accounts across the platforms
            where modern commerce actually happens.
          </p>
        </div>
        <div className="container partner-wall" style={{ marginTop: "56px" }}>
          {getPartners(marqueePartnerIds).map((partner, index) => (
            <article
              key={partner.id}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {partner.render()}
              <small>{partner.note}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section system-section results-section">
        <div className="container results-grid">
          <div className="results-quote" data-reveal="">
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              Partnering with Ecom Exporter has been a transformative experience
              for our Amazon and Flipkart accounts. Their dedicated team
              improved our operational efficiency, and we’ve seen a significant
              boost in sales that has exceeded our expectations.
            </blockquote>
            <div>
              <span className="quote-avatar">RK</span>
              <p>
                <strong>Rajesh Kumar</strong>
                <small>Marketplace seller, Amazon + Flipkart</small>
              </p>
            </div>
          </div>
          <div className="results-stats" data-reveal="">
            <span className="eyebrow">Built for outcomes</span>
            <div>
              <strong data-counter="">2,000+</strong>
              <span>sellers supported</span>
            </div>
            <div>
              <strong data-counter="">10+</strong>
              <span>marketplaces and channels</span>
            </div>
            <div>
              <strong data-counter="">24h</strong>
              <span>critical issue response target</span>
            </div>
            <div>
              <strong data-counter="">100%</strong>
              <span>transparent action ownership</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section system-section faq-section">
        <div className="container faq-grid">
          <div data-reveal="">
            <span className="eyebrow">Questions before a serious conversation</span>
            <h2>Clarity beats a sales pitch.</h2>
            <p>
              If the answers feel sensible, the next step is a practical
              diagnostic. If not, you still leave with a clearer view of what
              your commerce operation needs.
            </p>
          </div>
          <div className="faq-list" data-reveal="">
            {faqItems.map((item) => (
              <details key={item.question}>
                <summary data-cursor="Show answer">{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section system-section insights-section">
        <div className="container section-heading-row">
          <div data-reveal="">
            <span className="eyebrow">Sell smarter</span>
            <h2>Useful thinking for marketplace operators.</h2>
          </div>
          <Link className="arrow-link" data-reveal="" data-cursor="ALL" href="/insights">
            See all insights <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="container insight-grid">
          {insights.slice(0, 3).map((insight, index) => (
            <Link
              className="insight-card"
              data-reveal=""
              data-cursor="READ"
              href={`/insights/${insight.slug}`}
              key={insight.slug}
              style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <div className={`insight-art insight-art-${index + 1}`}>
                <Image
                  src={`/insights/${insight.slug}.jpg`}
                  alt={`${insight.title} article cover`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 420px"
                />
                <span>{insight.category}</span>
              </div>
              <small>
                <time dateTime={insight.publishedAt}>{insight.date}</time> · {insight.readTime}
              </small>
              <h3>{insight.title}</h3>
              <p>{insight.excerpt}</p>
              <span className="arrow-link">
                Read insight <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ACT V · HANDOFF */}
      <section className="section system-section lead-section" id="growth-plan" data-motion-surface="">
        <div className="container lead-grid">
          <div className="lead-copy" data-reveal="">
            <span className="eyebrow">Start with the truth</span>
            <h2>
              Get a practical growth plan for your marketplace business.
            </h2>
            <p>
              Tell us where you sell and what is getting in the way. We’ll
              review the opportunity, pressure-test the economics, and suggest
              the highest-leverage next move.
            </p>
            {[
              ["01", "20-minute discovery", "A focused conversation about goals and constraints."],
              ["02", "Operator review", "Your brief is reviewed by a channel specialist."],
              ["03", "Clear next step", "Scope, priorities, and realistic expected outcomes."],
            ].map(([number, title, text]) => (
              <div className="mini-proof" key={number}>
                <span>{number}</span>
                <p>
                  <strong>{title}</strong>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="lead-card" data-reveal="">
            <div
              className="deliverable-preview-card"
              aria-label="What the diagnostic produces"
            >
              <span>Diagnostic output</span>
              {[
                ["Constraint map", "Where growth is blocked right now"],
                ["90-day action order", "What should move first, second, and third"],
                ["First margin move", "The fastest practical profit lever"],
              ].map(([title, text]) => (
                <p key={title}>
                  <Check size={15} />
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </p>
              ))}
            </div>
            <p className="lead-card-promise">
              A useful first conversation, not a generic sales deck. Qualified
              brands receive a focused diagnostic and a practical next-step
              recommendation.
            </p>
            <LeadForm source="homepage" />
          </div>
        </div>
      </section>
    </>
  );
}
