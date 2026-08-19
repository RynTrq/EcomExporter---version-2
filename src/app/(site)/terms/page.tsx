import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of service",
  description:
    "Terms governing the Ecom Exporter website, calculators, professional services, client responsibilities, and marketplace outcomes.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of service" updated="June 10, 2026">
      <h2>Scope</h2>
      <p>
        These terms govern use of the Ecom Exporter website, calculators, and
        professional services. A signed proposal or statement of work controls
        where it conflicts with these website terms.
      </p>
      <h2>Marketplace outcomes</h2>
      <p>
        Marketplaces retain control over approvals, rankings, policies, fees,
        suspensions, and platform availability. We provide professional
        services but do not guarantee sales, approvals, rankings, or unchanged
        platform rules.
      </p>
      <h2>Client responsibilities</h2>
      <p>
        Clients must provide accurate information, lawful products, timely
        approvals, required access, and sufficient inventory and budgets. The
        client remains responsible for legal, tax, product, and marketplace
        compliance unless a signed scope says otherwise.
      </p>
      <h2>Calculators</h2>
      <p>
        Calculator outputs are planning estimates based on representative
        assumptions. They are not marketplace quotes, accounting advice, tax
        advice, or a substitute for current official fee schedules.
      </p>
      <h2>Fees and payment</h2>
      <p>
        Pricing, billing cadence, taxes, payment terms, and service levels are
        defined in the applicable proposal. Overdue amounts may pause delivery.
      </p>
    </LegalPage>
  );
}
