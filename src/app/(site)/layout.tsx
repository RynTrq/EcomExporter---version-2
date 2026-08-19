import { Suspense } from "react";
import { ExperienceEffects } from "@/components/experience-effects";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

// Public routes share one lightweight navigation, footer, and motion runtime.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <ExperienceEffects />
      </Suspense>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
