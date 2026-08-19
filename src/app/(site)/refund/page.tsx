import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Refund policy",
  description:
    "Ecom Exporter policy for service fees, cancellations, billing errors, refunds, and marketplace-related outcomes.",
  path: "/refund",
});

export default function RefundPage() {
  return (
    <LegalPage eyebrow="Legal" title="Refund policy" updated="June 10, 2026">
      <h2>Service fees</h2>
      <p>
        Fees cover reserved specialist capacity and work performed. Completed
        work, third-party charges, setup fees, and consumed service periods are
        non-refundable unless the signed proposal explicitly provides
        otherwise.
      </p>
      <h2>Cancellation</h2>
      <p>
        Cancellation and notice periods are set in the proposal. Where no term
        is stated, future uncommitted recurring service may be cancelled with
        30 days written notice.
      </p>
      <h2>Billing errors</h2>
      <p>
        Report suspected duplicate or incorrect charges within seven days.
        Verified billing errors will be corrected or refunded to the original
        payment method.
      </p>
      <h2>Marketplace decisions</h2>
      <p>
        Marketplace rejection, suspension, fee changes, policy changes, sales
        performance, or delays caused by missing client approvals are not by
        themselves grounds for refund.
      </p>
    </LegalPage>
  );
}
