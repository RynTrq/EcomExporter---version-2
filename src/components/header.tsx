"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  {
    label: "Services",
    href: "/services",
    children: [
      ["Smart Product Cataloging", "/services/smart-product-cataloging"],
      ["Account Management", "/services/marketplace-account-management"],
      ["Performance Advertising", "/services/performance-advertising"],
      ["Sales & Growth Management", "/services/sales-growth-management"],
      ["All services", "/services"],
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      ["Strategy & Consulting", "/solutions/ecommerce-strategy-consulting"],
      ["Global Entity & Formation", "/solutions/global-entity"],
      ["Ecom Website Development", "/solutions/ecom-website-development"],
      ["Graphic Designing", "/solutions/graphic-designing"],
      ["All solutions", "/solutions"],
    ],
  },
  {
    label: "Marketplaces",
    href: "/marketplaces",
    children: [
      ["Amazon India", "/marketplaces/amazon-india"],
      ["Amazon US", "/marketplaces/amazon-us"],
      ["Walmart", "/marketplaces/walmart"],
      ["eBay", "/marketplaces/ebay"],
      ["Etsy", "/marketplaces/etsy"],
      ["Flipkart", "/marketplaces/flipkart"],
      ["Meesho", "/marketplaces/meesho"],
      ["All marketplaces", "/marketplaces"],
    ],
  },
  { label: "Platform", href: "/platform" },
  { label: "Blog", href: "/insights" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const navElement = mobileNavRef.current;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    const focusableLinks = Array.from(
      navElement?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [],
    );
    const focusFrame = requestAnimationFrame(() => focusableLinks[0]?.focus());

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButton?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusableLinks.length || !menuButton) return;

      const firstLink = focusableLinks[0];
      const lastLink = focusableLinks.at(-1);
      if (event.shiftKey && document.activeElement === firstLink) {
        event.preventDefault();
        menuButton.focus();
      } else if (!event.shiftKey && document.activeElement === menuButton) {
        event.preventDefault();
        firstLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        menuButton.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="announcement">
        <span>Free marketplace profit audit for qualified brands</span>
        <Link href="/contact">Book your audit</Link>
      </div>
      <div className="nav-shell container">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <div className="nav-item" key={item.label}>
              <Link
                href={item.href}
                className={isActive(item.href) ? "is-active" : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
                {item.children && <ChevronDown size={14} aria-hidden="true" />}
              </Link>
              {item.children && (
                <div className="nav-dropdown">
                  <span>{item.label}</span>
                  {item.children.map(([label, href]) => (
                    <Link href={href} key={href}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link className="text-link desktop-only" href="/partners">
            Partners
          </Link>
          <Link
            className="button button-small"
            href="/contact"
          >
            Get a growth plan
          </Link>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav
        ref={mobileNavRef}
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        data-open={open ? "" : undefined}
        inert={!open}
      >
        {nav.map((item) => (
          <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>
            {item.label}
            <span>↗</span>
          </Link>
        ))}
        <Link href="/partners" onClick={() => setOpen(false)}>
          Partners <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
