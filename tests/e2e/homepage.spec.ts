import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => {
    window.scrollTo({ left: 9999, behavior: "instant" });
    const detected = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
      window.scrollX + window.innerWidth,
    ) - window.innerWidth;
    window.scrollTo({ left: 0, behavior: "instant" });
    return Math.max(0, detected);
  });

  expect(overflow).toBeLessThanOrEqual(2);
}

function collectBrowserErrors(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test.describe("homepage experience", () => {
  test("desktop motion islands and conversion path stay healthy", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    const browserErrors = collectBrowserErrors(page);

    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Accelerate your");
    await expect(page.locator("h1")).toContainText("management.");
    await expect(page.locator(".commerce-hero-telemetry")).toBeVisible();
    await expect(page.locator(".commerce-hero-marketplaces")).toBeVisible();
    await expect(page.locator(".commerce-hero-wall")).toBeVisible();
    await expect(page.locator(".commerce-hero-column")).toHaveCount(3);
    await expectNoHorizontalOverflow(page);

    const wall = await page.locator(".commerce-hero-wall").boundingBox();
    expect(wall).not.toBeNull();
    await page.mouse.move(24, 500);
    await page.mouse.move(
      wall!.x + wall!.width / 6,
      wall!.y + wall!.height / 2,
    );
    await expect(page.locator(".interaction-cursor")).toHaveAttribute(
      "data-visible",
      "true",
    );
    await expect(page.locator("[data-cursor-label]")).not.toHaveText("");
    await page.waitForTimeout(350);
    const slowedRate = await page
      .locator(".commerce-hero-column")
      .first()
      .locator(".commerce-hero-track")
      .evaluate((track) => track.getAnimations()[0]?.playbackRate ?? 1);
    expect(slowedRate).toBeLessThan(0.12);
    expect(slowedRate).toBeGreaterThan(0);

    await expect(page.locator(".signal-story")).toBeAttached();

    await page.locator(".constraint-grid").scrollIntoViewIfNeeded();
    await expect(
      page.getByText("Why choose Ecom Exporter"),
    ).toBeVisible();
    await expect(page.locator(".constraint-card")).toHaveCount(6);
    await expectNoHorizontalOverflow(page);

    await page.locator(".loop-grid").scrollIntoViewIfNeeded();
    await expect(page.locator(".loop-grid article")).toHaveCount(4);
    await expectNoHorizontalOverflow(page);

    const faq = page
      .locator(".faq-list details summary")
      .filter({ hasText: "What is Ecom Exporter and how can it help my business?" });
    await faq.scrollIntoViewIfNeeded();
    await faq.click();
    await expect(
      page.getByText("full-service ecommerce growth", { exact: false }).first(),
    ).toBeVisible();

    await page.locator(".commerce-hero-actions a[href='#growth-plan']").click();
    await expect(page.locator("#growth-plan")).toBeInViewport();
    await expect(page.locator(".deliverable-preview-card")).toBeVisible();

    expect(browserErrors).toEqual([]);
  });

  test("mobile layout keeps navigation, motion sections, and CTA usable", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Mobile-only coverage");

    const browserErrors = collectBrowserErrors(page);

    await page.goto("/");
    await expect(page.locator(".commerce-hero-telemetry")).toBeVisible();
    await expect(page.locator(".commerce-hero-wall")).toBeVisible();
    await expect(page.locator(".commerce-hero-column")).toHaveCount(3);
    await expect(page.locator(".commerce-hero-card")).toHaveCount(38);
    await expectNoHorizontalOverflow(page);

    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNav = page.getByRole("navigation", {
      name: "Mobile navigation",
    });
    await expect(mobileNav).toBeVisible();
    await expect(
      mobileNav.getByRole("link", { name: "Platform ↗" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close menu" }).click();

    await page.locator(".constraint-grid").scrollIntoViewIfNeeded();
    await expect(page.getByText("Why choose Ecom Exporter")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.locator("#growth-plan").scrollIntoViewIfNeeded();
    await expect(page.locator(".deliverable-preview-card")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    expect(browserErrors).toEqual([]);
  });

  test("reduced motion keeps the story readable without continuous motion", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator(".commerce-hero")).toHaveAttribute(
      "data-motion-active",
      "false",
    );

    const story = page.locator(".signal-story");
    await story.scrollIntoViewIfNeeded();
    await expect(
      story.getByRole("heading", { name: /Every channel tells a different story/ }),
    ).toBeVisible();
    await expect(
      story.getByRole("heading", { name: /The business gets calmer as it grows/ }),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("dark is the first-visit theme and an explicit light choice persists", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("theme"));
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { name: "Toggle light/dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});

test.describe("responsive route integrity", () => {
  test("content-heavy public routes do not scroll or bleed horizontally on phones", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Mobile-only coverage");

    const browserErrors = collectBrowserErrors(page);
    const routes = [
      "/insights",
      "/services",
      "/solutions",
      "/marketplaces",
      "/platform",
      "/about",
      "/partners",
    ];

    for (const width of [320, 360, 390, 414]) {
      await page.setViewportSize({ width, height: 844 });

      for (const theme of ["light", "dark"]) {
        for (const route of routes) {
          await page.goto(route);
          await page.evaluate((selectedTheme) => {
            localStorage.setItem("theme", selectedTheme);
            document.documentElement.dataset.theme = selectedTheme;
          }, theme);

          await expect(page.locator("h1")).toBeVisible();
          await expectNoHorizontalOverflow(page);

          const layout = await page.evaluate(() => {
            const overflowingText = [
              ...document.querySelectorAll("h2, h3, p"),
            ].filter((element) => {
              const node = element as HTMLElement;
              return node.scrollWidth - node.clientWidth > 2;
            }).length;
            const wordmark = document.querySelector(".footer-wordmark");
            const wordmarkBounds = wordmark?.getBoundingClientRect();
            const footerBrandBounds = document
              .querySelector(".footer-brand")
              ?.getBoundingClientRect();
            const footerContactBounds = document
              .querySelector(".footer-contact")
              ?.getBoundingClientRect();
            const fitsViewport = (bounds?: DOMRect) =>
              !bounds ||
              (bounds.left >= -1 && bounds.right <= window.innerWidth + 1);

            return {
              overflowingText,
              wordmarkFits: fitsViewport(wordmarkBounds),
              footerBrandFits: fitsViewport(footerBrandBounds),
              footerContactFits: fitsViewport(footerContactBounds),
            };
          });

          expect(
            layout.overflowingText,
            `${route} contains overflowing text at ${width}px in ${theme} mode`,
          ).toBe(0);
          expect(
            layout.wordmarkFits,
            `${route} footer wordmark does not fit at ${width}px in ${theme} mode`,
          ).toBe(true);
          expect(
            layout.footerBrandFits,
            `${route} footer brand does not fit at ${width}px in ${theme} mode`,
          ).toBe(true);
          expect(
            layout.footerContactFits,
            `${route} footer contact does not fit at ${width}px in ${theme} mode`,
          ).toBe(true);
        }
      }
    }

    expect(browserErrors).toEqual([]);
  });
});

test.describe("client-side navigation", () => {
  test("navigating from homepage to inner pages does not crash React", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    const browserErrors = collectBrowserErrors(page);

    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/experience-ready/);

    // Regression: ScrollTrigger's pin-spacer re-parented React-owned DOM and
    // crashed unmount with removeChild errors on soft navigation.
    await page.locator('.desktop-nav a[href="/services"]').first().click();
    await expect(page.locator("h1")).toContainText("Complete ecommerce growth solutions");

    await page.locator(".site-header .brand").first().click();
    await expect(page.locator("h1")).toContainText("Accelerate your");

    await page.locator('.desktop-nav a[href="/about"]').click();
    await expect(page.locator("h1")).toContainText("A trusted ecommerce partner");

    expect(browserErrors).toEqual([]);
  });
});

test.describe("detail pages", () => {
  test("insight articles stay within the phone viewport", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Mobile-only coverage");

    const slugs = [
      "true-marketplace-profit",
      "amazon-account-health",
      "cross-border-readiness",
      "meesho-rto",
      "marketplace-ad-efficiency",
      "catalog-quality-system",
    ];

    for (const slug of slugs) {
      await page.goto(`/insights/${slug}`);
      await expect(page.locator(".article-content")).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
  });

  test("insight detail publishes complete editorial and structured data", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    await page.goto("/insights/true-marketplace-profit");
    await expect(page.locator("h1")).toContainText("Revenue is not profit");
    await expect(page.locator(".article-content > section")).toHaveCount(4);
    await expect(page.locator("time[datetime='2026-06-03']")).toBeVisible();
    const articleSchema = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(articleSchema.some((value) => value.includes('"@type":"BlogPosting"'))).toBe(true);
  });

  test("service detail page renders plan, metrics, and capabilities", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    const browserErrors = collectBrowserErrors(page);

    await page.goto("/services/smart-product-cataloging");
    await expect(page.locator("h1")).toContainText(
      "Marketplace catalogs engineered for discovery and conversion.",
    );
    await expect(page.locator(".detail-scorecard")).toBeVisible();
    await expect(page.locator(".scorecard-row")).toHaveCount(4);
    await expect(page.locator(".metric-band strong")).toHaveCount(3);
    await expect(page.locator(".capability-list > div")).toHaveCount(6);
    await expectNoHorizontalOverflow(page);

    expect(browserErrors).toEqual([]);
  });

  test("solution detail page renders poster and capabilities", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    await page.goto("/solutions/digital-marketing-brand-growth");
    await expect(page.locator("h1")).toContainText("Digital Marketing & Brand Growth");
    await expect(page.locator(".solution-poster")).toBeVisible();
    await expect(page.locator(".capability-list > div")).toHaveCount(6);
    await expectNoHorizontalOverflow(page);
  });

  test("calculator estimates profit end to end", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    await page.goto("/marketplaces/amazon-india");
    await expect(page.locator("h1")).toContainText("Amazon India");
    // The form is React-driven; wait for hydration before submitting,
    // otherwise the click triggers a native GET submit and a reload.
    await expect(page.locator("html")).toHaveClass(/experience-ready/);

    await page.getByRole("button", { name: /Calculate margin/ }).click();
    await expect(page.getByText("Estimated profit")).toBeVisible();
    await expect(page.locator(".health-badge")).toBeVisible();
    await expect(
      page.getByText("Contribution margin", { exact: true }),
    ).toBeVisible();
  });

  test("unknown service slug returns not-found", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop-only coverage");

    const response = await page.goto("/services/not-a-real-marketplace");
    expect(response?.status()).toBe(404);
  });
});
