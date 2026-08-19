import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { insights } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Ecommerce insights",
  description:
    "Practical marketplace growth, operations, catalog, advertising, and profitability thinking for e-commerce leaders.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <section className="page-hero insights-hero">
        <div className="container page-hero-grid">
          <div data-reveal="">
            <span className="eyebrow">Blog — sell smarter</span>
            <h1>Clear thinking for people running marketplace businesses.</h1>
          </div>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            Useful operating ideas, commercial models, and channel guidance,
            written for decisions rather than search-engine theatre.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container insight-grid insight-grid-full">
          {insights.map((insight, index) => (
            <Link
              className="insight-card"
              data-reveal=""
              data-cursor="READ"
              href={`/insights/${insight.slug}`}
              key={insight.slug}
              style={{ "--reveal-delay": `${(index % 3) * 60}ms` } as React.CSSProperties}
            >
              <div className={`insight-art insight-art-${(index % 3) + 1}`}>
                <Image
                  src={`/insights/${insight.slug}.jpg`}
                  alt={`${insight.title} article cover`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 420px"
                />
                <span>{insight.category}</span>
              </div>
              <small><time dateTime={insight.publishedAt}>{insight.date}</time> · {insight.readTime}</small>
              <h2>{insight.title}</h2>
              <p>{insight.excerpt}</p>
              <span className="arrow-link">
                Read insight <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
