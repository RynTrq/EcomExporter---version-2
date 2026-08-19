import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs, ServiceJsonLd } from "@/components/seo-structure";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  return solution
    ? createMetadata({
        title: solution.name,
        description: solution.summary,
        path: `/solutions/${solution.slug}`,
        imageAlt: `${solution.name} by Ecom Exporter`,
      })
    : { robots: { index: false, follow: false } };
}

export default async function SolutionPage({
  params,
}: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  const Icon = solution.icon;

  return (
    <>
      <ServiceJsonLd
        name={solution.name}
        description={solution.description}
        path={`/solutions/${solution.slug}`}
      />
      <section
        className="detail-hero solution-detail-hero section-dark"
        data-motion-surface=""
        style={{ "--detail-accent": solution.accent } as React.CSSProperties}
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: solution.name, path: `/solutions/${solution.slug}` },
          ]}
        />
        <div className="container detail-hero-grid">
          <div>
            <span
              className="detail-icon"
              data-reveal=""
              style={{ backgroundColor: solution.accent, color: "#111410" }}
            >
              <Icon size={27} />
            </span>
            <span
              className="eyebrow light"
              data-reveal=""
              style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            >
              Commerce capability
            </span>
            <h1>{solution.name} that moves the commercial needle.</h1>
            <p
              data-reveal=""
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            >
              {solution.description}
            </p>
            <div
              className="hero-actions"
              data-reveal=""
              style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
            >
              <Link
                className="button button-accent"

                data-cursor="SCOPE"
                href="/contact"
              >
                Scope this solution <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <div
            className="solution-poster"
            data-reveal=""
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
          >
            <span>{solution.name}</span>
            <div className="poster-rings">
              <i />
              <i />
              <i />
            </div>
            <strong>Design → Operate → Improve</strong>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container capability-grid">
          <div data-reveal="">
            <span className="eyebrow">What the pod covers</span>
            <h2>A complete capability, integrated into your wider operation.</h2>
            <p>
              Strategy and delivery sit together. You get senior judgment,
              specialist execution, clear approvals, and reporting that connects
              work to outcomes.
            </p>
          </div>
          <div className="capability-list">
            {solution.capabilities.map((capability, index) => (
              <div
                key={capability}
                data-reveal=""
                style={{ "--reveal-delay": `${index * 45}ms` } as React.CSSProperties}
              >
                <CheckCircle2 size={20} />
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="container process-wide">
          <div data-reveal="">
            <span className="eyebrow">Designed to fit</span>
            <h2>Bring a focused brief or a complicated business problem.</h2>
          </div>
          <div data-reveal="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p>
              We scope around your commercial constraint, existing team, systems,
              and timeline. The engagement can run as a sprint, retained pod, or
              part of a broader marketplace operation.
            </p>
            <Link className="arrow-link" data-cursor="TALK" href="/contact">
              Talk through the brief <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
