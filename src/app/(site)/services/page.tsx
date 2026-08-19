import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Ecommerce growth services",
  description:
    "Smart product cataloging, marketplace account management, performance advertising, and sales & growth management across Amazon, Flipkart, Meesho, Myntra, Walmart and more.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero section-dark">
        <div className="container page-hero-grid">
          <div data-reveal="">
            <span className="eyebrow light">Our services</span>
            <h1>Complete ecommerce growth solutions — from launch to scale.</h1>
          </div>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            From SEO-focused cataloging and daily account operations to
            performance advertising and growth management — one accountable
            team across every marketplace you sell on.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container service-grid service-grid-full">
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
                    "--reveal-delay": `${(index % 3) * 55}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="service-card-top">
                  <span className="service-icon">
                    <Icon size={23} />
                  </span>
                  <ArrowUpRight size={19} />
                </div>
                <small>{service.eyebrow}</small>
                <h2>{service.name}</h2>
                <p>{service.summary}</p>
                <span className="service-line" />
              </Link>
            );
          })}
        </div>
      </section>
      <section className="band-cta">
        <div className="container">
          <div data-reveal="">
            <span className="eyebrow light">Not sure where to begin?</span>
            <h2>Start with a marketplace opportunity and operations audit.</h2>
          </div>
          <Link
            className="button button-accent"

            data-reveal=""
            data-cursor="AUDIT"
            href="/contact"
          >
            Get your audit <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
