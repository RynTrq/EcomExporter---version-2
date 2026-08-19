import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  createMetadata,
  DEFAULT_SITE_ORIGIN,
  getCanonicalUrl,
  normalizeSiteOrigin,
} from "@/lib/seo";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("SEO origin and canonical URL handling", () => {
  it("defaults unsafe or malformed origins to the production site", () => {
    expect(normalizeSiteOrigin()).toBe(DEFAULT_SITE_ORIGIN);
    expect(normalizeSiteOrigin("not a URL")).toBe(DEFAULT_SITE_ORIGIN);
    expect(normalizeSiteOrigin("ftp://example.com")).toBe(DEFAULT_SITE_ORIGIN);
    expect(normalizeSiteOrigin("https://user:secret@example.com")).toBe(
      DEFAULT_SITE_ORIGIN,
    );
  });

  it("normalizes a valid override to its origin", () => {
    expect(
      normalizeSiteOrigin(" https://preview.example.com:8443/a/path?x=1#top "),
    ).toBe("https://preview.example.com:8443");
  });

  it("keeps canonical paths on the configured origin and removes queries", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com/base");

    expect(getCanonicalUrl("/services/catalog?campaign=test#details")).toBe(
      "https://preview.example.com/services/catalog",
    );
    expect(getCanonicalUrl("//outside.example/path")).toBe(
      "https://preview.example.com/outside.example/path",
    );
  });
});

describe("page metadata", () => {
  it("emits canonical, Open Graph, and Twitter metadata", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com/");

    const metadata = createMetadata({
      title: "Marketplace services",
      description: "Page-specific description.",
      path: "/services",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://preview.example.com/services",
    );
    expect(metadata.openGraph).toMatchObject({
      title: "Marketplace services | Ecom Exporter",
      description: "Page-specific description.",
      url: "https://preview.example.com/services",
      siteName: "Ecom Exporter",
      locale: "en_IN",
      type: "website",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Marketplace services | Ecom Exporter",
      description: "Page-specific description.",
      images: ["https://preview.example.com/opengraph-image"],
    });
  });

  it("keeps preview deployments out of the index", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    const metadata = createMetadata({
      title: "Preview page",
      description: "Not for search results.",
      path: "/preview",
    });

    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(robots()).toEqual({ rules: [{ userAgent: "*", disallow: "/" }] });
  });
});

describe("crawler routes", () => {
  it("uses canonical sitemap URLs and only emits reviewed content dates", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com/");

    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://preview.example.com/");
    expect(urls).toContain(
      "https://preview.example.com/marketplaces/amazon-india",
    );
    expect(urls.some((url) => url.includes("/calculators/"))).toBe(false);
    expect(urls.some((url) => url.includes("/admin"))).toBe(false);
    expect(urls).toContain(
      "https://preview.example.com/insights/true-marketplace-profit",
    );
    expect(
      entries.find((entry) => entry.url.endsWith("/insights/true-marketplace-profit"))
        ?.lastModified,
    ).toBe("2026-06-03");
    expect(entries.find((entry) => entry.url.endsWith("/services"))?.lastModified).toBeUndefined();
  });

  it("keeps internal routes disallowed and links the canonical sitemap", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com/");

    expect(robots()).toEqual({
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/api"],
        },
      ],
      sitemap: "https://preview.example.com/sitemap.xml",
    });
  });
});
