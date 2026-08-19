import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCanonicalUrl } from "@/lib/seo";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

function JsonLd({ value }: { value: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };

  return (
    <>
      <JsonLd value={breadcrumbSchema} />
      <nav className="container seo-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <li key={item.path}>
                {index > 0 ? <ChevronRight size={12} aria-hidden="true" /> : null}
                {current ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: getCanonicalUrl(path),
        provider: {
          "@type": "Organization",
          "@id": `${getCanonicalUrl("/")}#organization`,
          name: "Ecom Exporter",
        },
      }}
    />
  );
}

export function CalculatorJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url: getCanonicalUrl(path),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        provider: {
          "@type": "Organization",
          "@id": `${getCanonicalUrl("/")}#organization`,
          name: "Ecom Exporter",
        },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  path,
  imagePath,
  publishedAt,
  modifiedAt,
}: {
  title: string;
  description: string;
  path: string;
  imagePath: string;
  publishedAt: string;
  modifiedAt: string;
}) {
  const url = getCanonicalUrl(path);

  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: getCanonicalUrl(imagePath),
        datePublished: publishedAt,
        dateModified: modifiedAt,
        author: {
          "@type": "Organization",
          name: "Ecom Exporter Editorial Team",
          url: getCanonicalUrl("/about"),
        },
        publisher: {
          "@type": "Organization",
          "@id": `${getCanonicalUrl("/")}#organization`,
          name: "Ecom Exporter",
          logo: {
            "@type": "ImageObject",
            url: getCanonicalUrl("/brand/logo.png"),
          },
        },
        isAccessibleForFree: true,
        inLanguage: "en-IN",
      }}
    />
  );
}
