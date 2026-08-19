import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { ArticleJsonLd, Breadcrumbs } from "@/components/seo-structure";
import { getInsight, insights } from "@/lib/insights";
import { createMetadata } from "@/lib/seo";

type InsightPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { robots: { index: false, follow: false } };

  const metadata = createMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    imagePath: `/insights/${insight.slug}.jpg`,
    imageAlt: `${insight.title} — Ecom Exporter insight`,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: insight.publishedAt,
      modifiedTime: insight.modifiedAt,
      authors: ["Ecom Exporter Editorial Team"],
      section: insight.category,
    },
  };
}

export default async function InsightPage({
  params,
}: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const imagePath = `/insights/${insight.slug}.jpg`;

  return (
    <>
      <ArticleJsonLd
        title={insight.title}
        description={insight.excerpt}
        path={`/insights/${insight.slug}`}
        imagePath={imagePath}
        publishedAt={insight.publishedAt}
        modifiedAt={insight.modifiedAt}
      />
      <article className="article-page">
        <header className="article-hero section-dark">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: insight.title, path: `/insights/${insight.slug}` },
            ]}
          />
          <div className="container article-hero-grid">
            <div>
              <span className="eyebrow light">{insight.category}</span>
              <h1>{insight.title}</h1>
              <p>{insight.dek}</p>
              <div className="article-byline">
                <span>Ecom Exporter Editorial Team</span>
                <time dateTime={insight.publishedAt}>{insight.date}</time>
                <span>{insight.readTime} read</span>
              </div>
            </div>
            <div className="article-cover">
              <Image
                alt={`${insight.title} article cover`}
                fill
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 42vw"
                src={imagePath}
              />
            </div>
          </div>
        </header>

        <div className="container article-layout">
          <aside className="article-takeaways" aria-labelledby="takeaways-title">
            <span className="eyebrow" id="takeaways-title">Key takeaways</span>
            <ul>
              {insight.takeaways.map((takeaway) => (
                <li key={takeaway}><Check size={16} aria-hidden="true" />{takeaway}</li>
              ))}
            </ul>
          </aside>

          <div className="article-content">
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.checklist ? (
                  <ul>
                    {section.checklist.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}

            <aside className="article-note">
              <strong>Editorial note</strong>
              <p>
                This article presents an operating framework, not legal, tax,
                financial, or marketplace-policy advice. Confirm current rules
                in the relevant seller portal and obtain specialist advice where required.
              </p>
            </aside>

            <div className="article-next">
              <Link className="arrow-link" data-cursor="BACK" href="/insights">
                <ArrowLeft size={15} aria-hidden="true" /> All insights
              </Link>
              <Link className="button button-accent" href={insight.relatedService.path}>
                {insight.relatedService.label} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
