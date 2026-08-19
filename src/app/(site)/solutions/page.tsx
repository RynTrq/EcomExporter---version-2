import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { solutions } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "E-commerce growth solutions",
  description:
    "Strategy consulting, digital marketing, analytics, business support, global entity formation, ecom website development, and graphic designing.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <section className="page-hero warm-hero">
        <div className="container page-hero-grid">
          <div data-reveal="">
            <span className="eyebrow">Commerce capabilities</span>
            <h1>Build the operational advantage your next stage requires.</h1>
          </div>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            Add a specialist capability or assemble an end-to-end operating pod.
            Every solution connects to the same roadmap and commercial truth.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container solution-grid solution-grid-full">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Link
                className="solution-card"
                data-reveal=""
                data-cursor={solution.name}
                href={`/solutions/${solution.slug}`}
                key={solution.slug}
                style={{ "--reveal-delay": `${(index % 3) * 55}ms` } as React.CSSProperties}
              >
                <span
                  className="solution-icon"
                  style={{ backgroundColor: solution.accent }}
                >
                  <Icon size={23} />
                </span>
                <h2>{solution.name}</h2>
                <p>{solution.summary}</p>
                <span className="arrow-link">
                  Explore solution <ArrowUpRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="band-cta">
        <div className="container">
          <div data-reveal="">
            <span className="eyebrow light">Assemble the right pod</span>
            <h2>We’ll help you prioritize capability around the constraint.</h2>
          </div>
          <Link
            className="button button-accent"

            data-reveal=""
            data-cursor="DESIGN"
            href="/contact"
          >
            Design my engagement <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
