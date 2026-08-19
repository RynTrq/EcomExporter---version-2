import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy policy",
  description:
    "How Ecom Exporter collects, uses, stores, protects, and responds to requests about personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy policy" updated="June 10, 2026">
      <h2>Information we collect</h2>
      <p>
        We collect information you provide through enquiry forms, including
        contact details, company information, marketplace priorities, revenue
        ranges, and messages. We may also collect limited technical and usage
        data required to operate and improve the site.
      </p>
      <h2>How we use information</h2>
      <p>
        Information is used to respond to enquiries, assess service fit,
        provide requested tools, operate engagements, protect the service, and
        improve product and marketing performance. We do not sell personal data.
      </p>
      <h2>Storage and processors</h2>
      <p>
        Production deployments may use vetted hosting, analytics, email,
        customer relationship, payment, and support providers. Access is
        restricted to authorized personnel and processors with a legitimate
        need.
      </p>
      <h2>Retention and rights</h2>
      <p>
        We retain information only as long as needed for the stated purpose,
        legal obligations, dispute resolution, and security. You may request
        access, correction, or deletion by contacting privacy@ecomexporter.com.
      </p>
      <h2>Security</h2>
      <p>
        We use reasonable administrative and technical controls. No internet
        system is completely secure, and production integrations should use
        OAuth or delegated credentials rather than shared seller passwords.
      </p>
    </LegalPage>
  );
}
