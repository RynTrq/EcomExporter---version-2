import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { ProfitCalculator } from "@/components/profit-calculator";
import {
  calculatorPlatforms,
  getCalculatorPlatform,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs, CalculatorJsonLd } from "@/components/seo-structure";

export function generateStaticParams() {
  return calculatorPlatforms.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/marketplaces/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const platform = getCalculatorPlatform(slug);
  return platform
    ? createMetadata({
        title: `${platform.name} fee and profit calculator`,
        description: `Estimate ${platform.name} fees, costs, profit, and contribution margin.`,
        path: `/marketplaces/${platform.slug}`,
        imageAlt: `${platform.name} fee and profit calculator from Ecom Exporter`,
      })
    : { robots: { index: false, follow: false } };
}

export default async function CalculatorPage({
  params,
}: PageProps<"/marketplaces/[slug]">) {
  const { slug } = await params;
  const platform = getCalculatorPlatform(slug);
  if (!platform) notFound();

  return (
    <>
      <CalculatorJsonLd
        name={`${platform.name} fee and profit calculator`}
        description={`Estimate ${platform.name} fees, costs, profit, and contribution margin.`}
        path={`/marketplaces/${platform.slug}`}
      />
      <section className="calculator-detail-hero">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Marketplaces", path: "/marketplaces" },
            { name: platform.name, path: `/marketplaces/${platform.slug}` },
          ]}
        />
        <div className="container">
          <span className="eyebrow" data-reveal="">
            Seller economics tool
          </span>
          <h1>{platform.name} fee and profit calculator</h1>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            Plan pricing with a clearer view of channel costs, ads, shipping,
            taxes, and the margin left to run your business.
          </p>
        </div>
      </section>
      <section className="section calculator-workspace-section">
        <div
          className="container"
          data-reveal=""
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <ProfitCalculator
            platform={platform.slug}
            currency={platform.currency}
          />
        </div>
      </section>
      <section className="section calculator-explain">
        <div className="container capability-grid">
          <div data-reveal="">
            <span className="eyebrow">What this model includes</span>
            <h2>A useful decision model, not a mysterious final number.</h2>
            <p>
              Use it to compare price points, understand ad-spend tolerance, and
              identify products that need better sourcing or fulfillment
              economics.
            </p>
          </div>
          <div className="capability-list">
            {[
              "Category-based marketplace referral or commission",
              "Closing, payment, and representative weight fees",
              "Advertising as a percentage of selling price",
              "Tax on marketplace fees where applicable",
              "Product and shipping cost",
              "Profit and contribution margin health",
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
            <span className="eyebrow light">Want the complete SKU truth?</span>
            <h2>We can build a profitability model from your real settlements.</h2>
          </div>
          <Link
            className="button button-accent"

            data-reveal=""
            data-cursor="AUDIT"
            href="/contact"
          >
            Request a profit audit <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
