import { Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Talk to an Ecom Exporter commerce operator about marketplace growth, operations, advertising, creative, logistics, or expansion.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="section contact-page">
      <div className="container contact-grid">
        <div className="contact-copy" data-reveal="">
          <span className="eyebrow">Let’s make the next move useful</span>
          <h1>Tell us where commerce feels harder than it should.</h1>
          <p>
            We’ll review the brief, route it to the right operator, and respond
            within one business day with a practical next step.
          </p>
          <div
            className="contact-details"
            data-reveal=""
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            <a href="tel:+918447077283" data-cursor="CALL">
              <span><Phone size={19} /></span>
              <p><small>Call us</small><strong>+91 84470 77283</strong></p>
            </a>
            <a href="mailto:info@ecomexporter.com" data-cursor="MAIL">
              <span><Mail size={19} /></span>
              <p><small>Email us</small><strong>info@ecomexporter.com</strong></p>
            </a>
            <div>
              <span><MapPin size={19} /></span>
              <p><small>Visit us</small><strong>Cabin-25, Ground Floor &amp; A-4 &amp; 5, First Floor, Logix Park, Sector 16</strong></p>
            </div>
          </div>
        </div>
        <div
          className="lead-card contact-form-card"
          data-reveal=""
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
        >
          <LeadForm source="contact-page" />
        </div>
      </div>
    </section>
  );
}
