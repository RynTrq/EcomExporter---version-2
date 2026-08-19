"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const SURFACE_SELECTOR = [
  ".constraint-card",
  ".service-card",
  ".solution-card",
  ".insight-card",
  ".marketplace-card",
  ".service-feature-card",
  ".calculator-card-grid a",
].join(",");

const SEQUENCE_GROUPS = [
  [".loop-grid", "rail"],
  [".before-after-console", "handoff"],
  [
    ".proof-band-grid, .results-stats, .trust-stats, .preview-kpis, .metric-band .container",
    "stats",
  ],
  [".detail-scorecard, .ops-panel", "panel"],
] as const;

function revealVariant(element: HTMLElement) {
  if (
    element.querySelector(":scope > .eyebrow") &&
    element.querySelector(":scope > h1, :scope > h2, :scope > h3")
  ) {
    return "heading";
  }
  if (element.matches(SURFACE_SELECTOR) || element.matches("article")) {
    return "card";
  }
  return "copy";
}

function sectionLabel(section: HTMLElement) {
  return (
    section.dataset.sectionLabel ||
    section.querySelector<HTMLElement>(".eyebrow")?.textContent?.trim() ||
    section.querySelector<HTMLElement>("h1, h2")?.textContent?.trim() ||
    "Overview"
  );
}

export function ExperienceEffects() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLElement>(null);
  const compassIndexRef = useRef<HTMLSpanElement>(null);
  const compassLabelRef = useRef<HTMLSpanElement>(null);
  const compassMeterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".site-header");
    const bar = barRef.current;
    let lastY = window.scrollY;
    let maxScroll = 0;
    let frame = 0;

    const measureScrollRange = () => {
      maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
    };

    const renderScrollState = () => {
      const y = window.scrollY;
      root.toggleAttribute("data-scrolled", y > 12);
      if (header) {
        const delta = y - lastY;
        const hasNavFocus = header.contains(document.activeElement);
        header.classList.toggle(
          "is-hidden",
          !hasNavFocus && y > window.innerHeight && delta > 9,
        );
        if (delta < -6 || y < 200) header.classList.remove("is-hidden");
      }
      if (bar) {
        bar.style.transform = `scaleX(${maxScroll > 0 ? y / maxScroll : 0})`;
      }
      lastY = y;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(renderScrollState);
    };
    const onHeaderFocus = () => header?.classList.remove("is-hidden");

    measureScrollRange();
    renderScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    header?.addEventListener("focusin", onHeaderFocus);
    const onResize = () => {
      measureScrollRange();
      onScroll();
    };
    window.addEventListener("resize", onResize, { passive: true });
    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            measureScrollRange();
            onScroll();
          })
        : null;
    if (document.body) resizeObserver?.observe(document.body);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      header?.removeEventListener("focusin", onHeaderFocus);
      root.removeAttribute("data-scrolled");
      header?.classList.remove("is-hidden");
    };
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    SEQUENCE_GROUPS.forEach(([selector, name]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        element.dataset.sequence = name;
        if (!element.hasAttribute("data-reveal")) {
          element.dataset.reveal = "sequence";
        }
      });
    });
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    reveals.forEach((element) => {
      element.dataset.revealVariant = revealVariant(element);
    });

    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      root.classList.add("experience-ready");
      return () => root.classList.remove("experience-ready");
    }

    reveals
      .filter((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < window.innerHeight * 0.94;
      })
      .forEach((element) => element.classList.add("is-visible"));
    root.classList.add("experience-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    reveals
      .filter((element) => !element.classList.contains("is-visible"))
      .forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("experience-ready");
    };
  }, [pathname]);

  useEffect(() => {
    const compass = compassRef.current;
    const index = compassIndexRef.current;
    const label = compassLabelRef.current;
    const meter = compassMeterRef.current;
    const main = document.querySelector<HTMLElement>("#main-content");
    if (!compass || !index || !label || !meter || !main || !("IntersectionObserver" in window)) {
      return;
    }

    const sections = Array.from(
      main.querySelectorAll<HTMLElement>(
        ":scope > section, :scope > .proof-band, :scope > article > header, :scope > article > .article-layout",
      ),
    ).filter((section) => section.querySelector("h1, h2, .eyebrow"));

    if (sections.length < 2) return;
    compass.dataset.ready = "true";

    const activate = (section: HTMLElement) => {
      const sectionIndex = sections.indexOf(section);
      if (sectionIndex < 0) return;
      index.textContent = `${String(sectionIndex + 1).padStart(2, "0")} / ${String(
        sections.length,
      ).padStart(2, "0")}`;
      label.textContent = sectionLabel(section);
      meter.style.transform = `scaleX(${(sectionIndex + 1) / sections.length})`;
    };

    activate(sections[0]);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (visible) activate(visible.target as HTMLElement);
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      compass.removeAttribute("data-ready");
    };
  }, [pathname]);

  useEffect(() => {
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-surface]"));
    if (!surfaces.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visibility = new Map<HTMLElement, boolean>();
    const sync = () => {
      surfaces.forEach((surface) => {
        const active =
          !reducedMotion.matches &&
          !document.hidden &&
          visibility.get(surface) === true;
        surface.dataset.motionActive = String(active);
      });
    };

    if (!("IntersectionObserver" in window)) {
      sync();
      return () => surfaces.forEach((surface) => surface.removeAttribute("data-motion-active"));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibility.set(entry.target as HTMLElement, entry.isIntersecting));
        sync();
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );
    surfaces.forEach((surface) => observer.observe(surface));
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
      surfaces.forEach((surface) => surface.removeAttribute("data-motion-active"));
    };
  }, [pathname]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor) return;

    const label = cursor.querySelector<HTMLElement>("[data-cursor-label]");
    const cursorInner = cursor.querySelector<HTMLElement>(".interaction-cursor-inner");
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>(SURFACE_SELECTOR));
    const rateFrames = new Map<Animation, number>();
    let activeElement: HTMLElement | null = null;
    let activeColumn: HTMLElement | null = null;
    let activeSurface: HTMLElement | null = null;
    let pointerFrame = 0;
    let measureFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let cursorWidth = 0;
    let cursorHeight = 0;

    const enabled = () => finePointer.matches && !reducedMotion.matches;

    const syncEnhancementState = () => {
      if (enabled()) {
        surfaces.forEach((surface) => surface.setAttribute("data-premium-surface", ""));
        return;
      }
      activeElement?.removeAttribute("data-cursor-active");
      activeSurface?.removeAttribute("data-surface-active");
      activeSurface?.removeAttribute("data-surface-pressed");
      activeElement = null;
      activeSurface = null;
      cursor.dataset.visible = "false";
      surfaces.forEach((surface) => surface.removeAttribute("data-premium-surface"));
    };

    const tweenRate = (animation: Animation | undefined, target: number, duration: number) => {
      if (!animation) return;
      const existingFrame = rateFrames.get(animation);
      if (existingFrame) cancelAnimationFrame(existingFrame);

      const startRate = animation.playbackRate;
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        animation.updatePlaybackRate(startRate + (target - startRate) * eased);
        if (progress < 1) {
          rateFrames.set(animation, requestAnimationFrame(step));
        } else {
          rateFrames.delete(animation);
        }
      };
      rateFrames.set(animation, requestAnimationFrame(step));
    };

    const columnAnimation = (column: HTMLElement | null) => {
      const animations = column
        ?.querySelector<HTMLElement>(".commerce-hero-track")
        ?.getAnimations();
      return animations?.find(
        (animation) =>
          typeof CSSAnimation !== "undefined" &&
          animation instanceof CSSAnimation &&
          animation.animationName.startsWith("commerce-"),
      );
    };

    const setActiveElement = (next: HTMLElement | null) => {
      if (next === activeElement) return;
      activeElement?.removeAttribute("data-cursor-active");
      activeElement = next;
      activeElement?.setAttribute("data-cursor-active", "true");

      if (label) label.textContent = activeElement?.dataset.cursor ?? "";
      cursor.dataset.visible = String(Boolean(activeElement));
      if (measureFrame) cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(() => {
        cursorWidth = cursorInner?.offsetWidth ?? 0;
        cursorHeight = cursorInner?.offsetHeight ?? 0;
        measureFrame = 0;
      });

      const nextColumn = activeElement?.closest<HTMLElement>(".commerce-hero-column") ?? null;
      if (nextColumn !== activeColumn) {
        tweenRate(columnAnimation(activeColumn), 1, 520);
        tweenRate(columnAnimation(nextColumn), 0.08, 280);
        activeColumn = nextColumn;
      }
    };

    const setActiveSurface = (next: HTMLElement | null) => {
      if (next === activeSurface) return;
      activeSurface?.removeAttribute("data-surface-active");
      activeSurface?.removeAttribute("data-surface-pressed");
      activeSurface = next;
      activeSurface?.setAttribute("data-surface-active", "true");
    };

    const closestCursorTarget = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>("[data-cursor]") : null;
    const closestSurface = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest<HTMLElement>("[data-premium-surface]")
        : null;

    const onPointerOver = (event: PointerEvent) => {
      if (!enabled()) return;
      setActiveElement(closestCursorTarget(event.target));
      setActiveSurface(closestSurface(event.target));
    };
    const onPointerOut = (event: PointerEvent) => {
      const from = closestCursorTarget(event.target);
      if (from && from === activeElement) {
        setActiveElement(closestCursorTarget(event.relatedTarget));
      }
      const surface = closestSurface(event.target);
      if (surface && surface === activeSurface) {
        setActiveSurface(closestSurface(event.relatedTarget));
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!enabled() || (!activeElement && !activeSurface)) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        if (activeElement) {
          const x = Math.max(8, Math.min(pointerX, window.innerWidth - cursorWidth - 24));
          const y = Math.max(8, Math.min(pointerY, window.innerHeight - cursorHeight - 24));
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        if (activeSurface) {
          const bounds = activeSurface.getBoundingClientRect();
          const localX = Math.max(0, Math.min(bounds.width, pointerX - bounds.left));
          const localY = Math.max(0, Math.min(bounds.height, pointerY - bounds.top));
          activeSurface.style.setProperty("--mx", `${localX}px`);
          activeSurface.style.setProperty("--my", `${localY}px`);
        }
        pointerFrame = 0;
      });
    };
    const onDocumentLeave = () => {
      setActiveElement(null);
      setActiveSurface(null);
    };
    const onPointerDown = () => {
      cursor.dataset.pressed = "true";
      activeSurface?.setAttribute("data-surface-pressed", "true");
    };
    const onPointerUp = () => {
      cursor.dataset.pressed = "false";
      activeSurface?.removeAttribute("data-surface-pressed");
    };

    syncEnhancementState();
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onDocumentLeave);
    finePointer.addEventListener("change", syncEnhancementState);
    reducedMotion.addEventListener("change", syncEnhancementState);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onDocumentLeave);
      finePointer.removeEventListener("change", syncEnhancementState);
      reducedMotion.removeEventListener("change", syncEnhancementState);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      if (measureFrame) cancelAnimationFrame(measureFrame);
      rateFrames.forEach((frame, animation) => {
        cancelAnimationFrame(frame);
        animation.updatePlaybackRate(1);
      });
      activeElement?.removeAttribute("data-cursor-active");
      activeSurface?.removeAttribute("data-surface-active");
      surfaces.forEach((surface) => {
        surface.removeAttribute("data-premium-surface");
        surface.removeAttribute("data-surface-pressed");
        surface.style.removeProperty("--mx");
        surface.style.removeProperty("--my");
      });
      cursor.dataset.visible = "false";
    };
  }, [pathname]);

  useEffect(() => {
    const toggle = document.querySelector<HTMLButtonElement>("[data-hero-motion-toggle]");
    const hero = toggle?.closest<HTMLElement>(".commerce-hero");
    const label = toggle?.querySelector<HTMLElement>("[data-hero-motion-label]");
    if (!toggle || !hero || !label) return;

    const onToggle = () => {
      const paused = hero.dataset.userMotion !== "paused";
      hero.dataset.userMotion = paused ? "paused" : "playing";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute(
        "aria-label",
        paused ? "Resume hero gallery motion" : "Pause hero gallery motion",
      );
      label.textContent = paused ? "Resume motion" : "Pause motion";
    };

    toggle.addEventListener("click", onToggle);
    return () => toggle.removeEventListener("click", onToggle);
  }, [pathname]);

  useEffect(() => {
    const details = Array.from(document.querySelectorAll<HTMLDetailsElement>(".faq-list details"));
    if (!details.length) return;

    const syncLabel = (item: HTMLDetailsElement) => {
      const summary = item.querySelector<HTMLElement>("summary[data-cursor]");
      if (!summary) return;
      summary.dataset.cursor = item.open ? "Hide answer" : "Show answer";
      if (summary.hasAttribute("data-cursor-active")) {
        const cursorLabel = cursorRef.current?.querySelector<HTMLElement>("[data-cursor-label]");
        if (cursorLabel) cursorLabel.textContent = summary.dataset.cursor;
      }
    };
    const onToggle = (event: Event) => syncLabel(event.currentTarget as HTMLDetailsElement);

    details.forEach((item) => {
      syncLabel(item);
      item.addEventListener("toggle", onToggle);
    });
    return () => details.forEach((item) => item.removeEventListener("toggle", onToggle));
  }, [pathname]);

  return (
    <>
      <div className="scroll-progress" ref={barRef} aria-hidden="true" />
      <div className="interaction-cursor" ref={cursorRef} aria-hidden="true">
        <span className="interaction-cursor-inner">
          <i />
          <span data-cursor-label="" />
        </span>
      </div>
      <aside className="section-compass" ref={compassRef} aria-hidden="true">
        <span className="section-compass-index" ref={compassIndexRef}>01 / 01</span>
        <span className="section-compass-track"><i ref={compassMeterRef} /></span>
        <span className="section-compass-label" ref={compassLabelRef}>Overview</span>
      </aside>
    </>
  );
}
