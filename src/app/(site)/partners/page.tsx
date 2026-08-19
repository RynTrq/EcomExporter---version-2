import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPartners, type PartnerId } from "@/components/partner-logos";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Partners",
  description:
    "Ecom Exporter onboarding partners: Etsy, eBay, Meesho, Flipkart, Amazon India, Amazon Global, IndiaMART, and Walmart.",
  path: "/partners",
});

const onboardingPartnerIds: PartnerId[] = [
  "etsy",
  "ebay",
  "meesho",
  "flipkart",
  "amazon-india",
  "amazon-global",
  "indiamart",
  "walmart",
];

export default function PartnersPage() {
  return (
    <>
      <section className="page-hero partner-hero">
        <div className="container page-hero-grid">
          <div data-reveal="">
            <span className="eyebrow">Our partners</span>
            <h1>Onboarding partners for serious sellers.</h1>
          </div>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            Ecom Exporter onboards, manages, and grows seller accounts across
            the leading marketplaces — from registration and store setup to
            daily operations and growth.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container partner-wall">
          {getPartners(onboardingPartnerIds).map((partner, index) => (
            <article
              key={partner.id}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 50}ms` } as React.CSSProperties}
            >
              {partner.render()}
              <small>{partner.note}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="section partner-process">
        <div className="container process-wide">
          <div data-reveal="">
            <span className="eyebrow">Start selling where it matters</span>
            <h2>
              One team to onboard, manage, and grow every marketplace account.
            </h2>
          </div>
          <div data-reveal="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p>
              Whether you are launching your first store or expanding into new
              marketplaces, our onboarding specialists handle registration,
              account setup, catalog creation, and the operating rhythm that
              follows.
            </p>
            <Link className="button button-outline" data-cursor="JOIN" href="/contact">
              Get onboarded <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
