"use client";

import { Moon, Sun } from "lucide-react";

// Stateless on purpose: the inline script in the root layout sets
// data-theme before paint, and the sun/moon icons swap via CSS on
// [data-theme] — so the markup is identical in both themes and there
// is nothing to hydrate.
export function ThemeToggle() {
  const toggle = () => {
    const next =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = next === "light" ? "#fff6e8" : "#120b05";
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable (private mode) — theme still applies for the session
    }
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label="Toggle light/dark theme"
      title="Toggle theme"
    >
      <Sun className="theme-icon-sun" size={17} aria-hidden="true" />
      <Moon className="theme-icon-moon" size={17} aria-hidden="true" />
    </button>
  );
}
