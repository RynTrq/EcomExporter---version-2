import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "Ecom Exporter is a trusted ecommerce partner focused on your growth — strategic account management, marketplace expertise, and performance-driven solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero section-dark">
        <div className="container page-hero-grid">
          <div data-reveal="">
            <span className="eyebrow light">About Ecom Exporter</span>
            <h1>
              A trusted ecommerce partner focused on your growth.
            </h1>
          </div>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            We believe every business deserves the opportunity to grow, scale,
            and succeed in the digital marketplace. Whether you are a startup,
            manufacturer, local seller, or established brand, our mission is to
            help you build a strong ecommerce presence and unlock new growth
            opportunities across leading online platforms.
          </p>
        </div>
      </section>
      <section className="section" data-motion-surface="">
        <div className="container story-grid">
          <div className="story-card story-card-large" data-reveal="">
            <span>OUR MISSION</span>
            <h2>
              We simplify the complexities of ecommerce.
            </h2>
            <p>
              Ecom Exporter combines strategic account management, marketplace
              expertise, and performance-driven solutions that help businesses
              operate more efficiently and grow faster online. From store setup
              and product optimization to advertising management and
              marketplace expansion, our team handles the day-to-day operations
              that power successful ecommerce brands — so you can focus on your
              core business.
            </p>
          </div>
          <div
            className="story-card story-visual"
            data-reveal=""
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <div className="story-sphere" />
            <strong>India rooted.<br />Globally fluent.</strong>
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="container section-heading" data-reveal="">
          <span className="eyebrow">Why choose Ecom Exporter</span>
          <h2>Standards that hold when the work gets complicated.</h2>
        </div>
        <div className="container values-grid">
          {[
            ["01", "Ecommerce expertise", "Our experienced team brings deep marketplace knowledge and proven ecommerce strategies that help businesses grow faster, improve performance, and stay competitive across major online platforms."],
            ["02", "Customized growth solutions", "We create tailored ecommerce strategies based on your business goals, product category, and marketplace requirements to deliver scalable, long-term results."],
            ["03", "Affordable & scalable services", "Our solutions provide maximum value with flexible service plans that support businesses of all sizes without compromising on quality or performance."],
            ["04", "Dedicated ongoing support", "From daily account management to growth optimization, our team provides continuous support and strategic guidance for smooth operations and sustained ecommerce success."],
          ].map(([number, title, text], index) => (
            <article
              key={number}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 55}ms` } as React.CSSProperties}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container capability-grid">
          <div data-reveal="">
            <span className="eyebrow">What we do</span>
            <h2>
              Complete ecommerce growth solutions across leading marketplaces.
            </h2>
          </div>
          <div className="capability-list">
            {[
              "Ecommerce strategy & growth consulting",
              "Marketplace setup & account management",
              "Digital marketing & brand growth",
              "Product listing & catalog optimization",
              "Analytics, reporting & performance tracking",
              "Business support & scaling solutions",
            ].map((item, index) => (
              <div
                key={item}
                data-reveal=""
                style={{ "--reveal-delay": `${index * 45}ms` } as React.CSSProperties}
              >
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="band-cta">
        <div className="container">
          <div data-reveal="">
            <span className="eyebrow light">Our vision</span>
            <h2>
              A trusted global partner for ecommerce growth — empowering
              businesses with innovative, scalable, results-driven digital
              commerce.
            </h2>
          </div>
          <Link
            className="button button-accent"

            data-reveal=""
            data-cursor="TALK"
            href="/contact"
          >
            Partner with Ecom Exporter <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
