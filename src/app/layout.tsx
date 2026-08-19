import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import Script from "next/script";
import { createMetadata, getCanonicalUrl, getSiteOrigin } from "@/lib/seo";

const baseMetadata = createMetadata({
  title: "Expert marketplace management for ecommerce brands",
  description:
    "Ecom Exporter helps ecommerce brands scale faster with strategic, data-driven marketplace management — cataloging, account management, advertising, and sales growth across Amazon, Flipkart, Meesho, Myntra, Walmart and more.",
  path: "/",
});

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(getSiteOrigin()),
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png", sizes: "64x64" }],
    apple: [
      {
        url: "/brand/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  title: {
    default:
      "Ecom Exporter | Expert marketplace management for ecommerce brands",
    template: "%s | Ecom Exporter",
  },
};

export const viewport: Viewport = {
  themeColor: "#120b05",
};

// Runs before first paint. New visitors begin in the designed dark theme;
// after an explicit choice, that preference is restored without a flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==="light"?"#fff6e8":"#120b05"}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getCanonicalUrl("/");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "Ecom Exporter",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: getCanonicalUrl("/brand/logo.png"),
        width: 1254,
        height: 1254,
      },
      email: "info@ecomexporter.com",
      telephone: "+91-84470-77283",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+91-84470-77283",
        email: "info@ecomexporter.com",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      name: "Ecom Exporter",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}#organization` },
      inLanguage: "en-IN",
    },
  ];

  return (
    <html lang="en-IN" data-theme="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Theme is applied before paint via next/script `beforeInteractive`,
            which Next injects into the document head through its own pipeline
            rather than as a React-reconciled child. A raw <script> child in
            <head> breaks hydration when a browser extension injects its own
            node at that position; this avoids that entire failure class. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
