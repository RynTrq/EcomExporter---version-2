import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, CircleCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { Breadcrumbs, ServiceJsonLd } from "@/components/seo-structure";
import { getService, services } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return service
    ? createMetadata({
        title: service.seoTitle,
        description: service.summary,
        path: `/services/${service.slug}`,
        imageAlt: service.imageAlt,
      })
    : { robots: { index: false, follow: false } };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const Icon = service.icon;

  return (
    <>
      <ServiceJsonLd
        name={service.name}
        description={service.description}
        path={`/services/${service.slug}`}
      />
      <section
        className="detail-hero section-dark"
        style={{ "--detail-accent": service.color } as React.CSSProperties}
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]}
        />
        <div className="container detail-hero-grid">
          <div>
            <span className="detail-icon" data-reveal="">
              <Icon size={27} />
            </span>
            <span
              className="eyebrow light"
              data-reveal=""
              style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            >
              {service.eyebrow}
            </span>
            <h1>{service.headline}</h1>
            <p
              data-reveal=""
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            >
              {service.description}
            </p>
            <div
              className="hero-actions"
              data-reveal=""
              style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
            >
              <Link
                className="button button-accent"

                data-cursor="START"
                href="/contact"
              >
                Get a channel growth plan <ArrowRight size={17} />
              </Link>
              <Link
                className="button button-ghost"

                data-cursor="MODEL"
                href="/marketplaces"
              >
                Model the economics
              </Link>
            </div>
          </div>
          <div
            className="detail-scorecard"
            data-reveal=""
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
          >
            <div className="scorecard-head">
              <span>90-day operating plan</span>
              <small>Live engagement view</small>
            </div>
            {service.deliverables.map((deliverable, index) => (
              <div className="scorecard-row" key={deliverable}>
                <span>
                  <Check size={15} />
                </span>
                <p>
                  <small>Phase 0{index + 1}</small>
                  <strong>{deliverable}</strong>
                </p>
                <b>{index === 0 ? "Live" : `${(index + 1) * 2} wk`}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="metric-band">
        <div className="container">
          {service.metrics.map((metric, index) => (
            <div
              key={metric.label}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <strong data-counter="">{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container capability-grid">
          <div data-reveal="">
            <span className="eyebrow">Complete channel operations</span>
            <h2>Focused specialists. Commercial context. One accountable plan.</h2>
            <p>
              We do the detailed work marketplace growth demands while keeping
              your team close to the decisions that shape brand, inventory, and
              margin.
            </p>
          </div>
          <div className="capability-list">
            {service.capabilities.map((capability, index) => (
              <div
                key={capability}
                data-reveal=""
                style={{ "--reveal-delay": `${index * 45}ms` } as React.CSSProperties}
              >
                <CircleCheck size={20} />
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container section-heading centered" data-reveal="">
          <span className="eyebrow">How the engagement works</span>
          <h2>From ambiguity to an operating rhythm in four steps.</h2>
        </div>
        <div className="container process-grid">
          {[
            ["01", "Diagnose", "Audit account health, economics, catalog, ads, operations, and constraints."],
            ["02", "Prioritize", "Create a 90-day roadmap ranked by commercial impact and urgency."],
            ["03", "Operate", "Execute through weekly sprints with clear owners, approvals, and service levels."],
            ["04", "Compound", "Measure movement, standardize what works, and expand into the next constraint."],
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

      <section className="section lead-section" data-motion-surface="">
        <div className="container lead-grid">
          <div className="lead-copy" data-reveal="">
            <span className="eyebrow">Talk to a {service.name} operator</span>
            <h2>Bring us the messy version. We’ll find the useful next move.</h2>
            <p>
              Share the current account stage, the biggest constraint, and your
              growth ambition. We’ll return with a focused point of view.
            </p>
          </div>
          <div
            className="lead-card"
            data-reveal=""
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <LeadForm source={`service:${service.slug}`} compact />
          </div>
        </div>
      </section>
    </>
  );
}
