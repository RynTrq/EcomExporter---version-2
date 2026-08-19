import type { Metadata } from "next";

export const DEFAULT_SITE_ORIGIN = "https://ecomexporter.com";
export const SITE_NAME = "Ecom Exporter";
export const SITE_LOCALE = "en_IN";
export const DEFAULT_SOCIAL_IMAGE_PATH = "/opengraph-image";

export function isPreviewDeployment(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function normalizeSiteOrigin(value?: string | null): string {
  if (!value?.trim()) return DEFAULT_SITE_ORIGIN;

  try {
    const url = new URL(value.trim());
    const isWebOrigin = url.protocol === "https:" || url.protocol === "http:";

    if (!isWebOrigin || !url.hostname || url.username || url.password) {
      return DEFAULT_SITE_ORIGIN;
    }

    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function getSiteOrigin(): string {
  return normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getCanonicalUrl(path = "/"): string {
  const safePath = `/${path.trim().replace(/^\/+/, "")}`;
  const url = new URL(safePath, `${getSiteOrigin()}/`);

  url.search = "";
  url.hash = "";

  return url.toString();
}

type CreateMetadataOptions = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  imageAlt?: string;
  robots?: Metadata["robots"];
};

export function createMetadata({
  title,
  description,
  path,
  imagePath = DEFAULT_SOCIAL_IMAGE_PATH,
  imageAlt = `${SITE_NAME} — ecommerce marketplace growth and operations`,
  robots,
}: CreateMetadataOptions): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const socialImageUrl = getCanonicalUrl(imagePath);
  const socialTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const deploymentRobots = isPreviewDeployment()
    ? { index: false, follow: false, noarchive: true }
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImageUrl],
    },
    ...(robots || deploymentRobots ? { robots: robots ?? deploymentRobots } : {}),
  };
}
