import type { MetadataRoute } from "next";
import {
  calculatorPlatforms,
  services,
  solutions,
} from "@/lib/content";
import { insights } from "@/lib/insights";
import { getCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services",
    "/solutions",
    "/marketplaces",
    "/platform",
    "/insights",
    "/about",
    "/partners",
    "/contact",
    "/privacy",
    "/terms",
    "/refund",
  ];

  return [
    ...staticRoutes.map((route) => ({ url: getCanonicalUrl(route) })),
    ...services.map((item) => ({
      url: getCanonicalUrl(`/services/${item.slug}`),
    })),
    ...solutions.map((item) => ({
      url: getCanonicalUrl(`/solutions/${item.slug}`),
    })),
    ...calculatorPlatforms.map((item) => ({
      url: getCanonicalUrl(`/marketplaces/${item.slug}`),
    })),
    ...insights.map((item) => ({
      url: getCanonicalUrl(`/insights/${item.slug}`),
      lastModified: item.modifiedAt,
    })),
  ];
}
