import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested Ecom Exporter page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="page-hero not-found-page">
      <div className="container not-found-grid">
        <div>
          <span className="eyebrow">404 — route not found</span>
          <h1>This page has left the marketplace.</h1>
          <p>
            The address may have changed, or the page may no longer exist.
            Return home to continue exploring Ecom Exporter.
          </p>
          <Link className="button button-accent" href="/">
            <ArrowLeft size={16} aria-hidden="true" /> Back to home
          </Link>
        </div>
        <SearchX size={150} strokeWidth={0.8} aria-hidden="true" />
      </div>
    </section>
  );
}
