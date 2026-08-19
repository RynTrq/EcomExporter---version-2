import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="footer" data-motion-surface="">
      <div className="container footer-top">
        <div className="footer-pitch">
          <span className="eyebrow light">Your next growth chapter</span>
          <h2>Build a commerce operation that gets stronger every week.</h2>
          <Link className="button button-light" href="/contact">
            Talk to an operator <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo variant="lockup" />
            <p>
              We help ecommerce brands build, manage, and scale their online
              business across leading marketplaces.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/services">Services</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/marketplaces">Marketplaces</Link>
            <Link href="/platform">Platform</Link>
            <Link href="/insights">Blog</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/about">About</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/solutions/ecom-website-development">
              Ecom Website Development
            </Link>
            <Link href="/solutions/graphic-designing">Graphic Designing</Link>
          </div>
          <div className="footer-contact">
            <h3>India office</h3>
            <p>
              <MapPin size={17} />
              Cabin-25, Ground Floor &amp; A-4 &amp; 5, First Floor, Logix Park,
              Sector 16
            </p>
            <a href="tel:+918447077283">
              <Phone size={17} />
              +91 84470 77283
            </a>
            <a href="mailto:info@ecomexporter.com">
              <Mail size={17} />
              info@ecomexporter.com
            </a>
          </div>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        {"ECOMEXPORTER".split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>
      <div className="footer-bottom container">
        <span>© 2026 Ecom Exporter. All rights reserved.</span>
        <span className="footer-credit">
          Designed &amp; built by{" "}
          <a
            className="signature"
            href="https://ryntrq.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Sparkles size={15} aria-hidden="true" />
            RAIYAAN TARIQUE
          </a>
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund">Refunds</Link>
        </div>
      </div>
    </footer>
  );
}
