import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  BarChart3,
  CircleCheck,
  Clock3,
  FileCheck2,
  FileClock,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { DisplayCards } from "@/components/display-cards";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Commerce operations platform",
  description:
    "The shared operating layer for roadmap, profitability, approvals, tasks, account health, and marketplace reporting.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <section className="platform-hero section-dark">
        <div className="container platform-hero-grid">
          <div>
            <span className="eyebrow light" data-reveal="">
              Ecom Exporter Operations Cloud
            </span>
            <h1>The place where marketplace work becomes accountable.</h1>
            <p
              data-reveal=""
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              A shared operating layer for your team and ours: priorities,
              approvals, performance, economics, and the full history of what
              changed.
            </p>
            <div
              className="hero-actions"
              data-reveal=""
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <Link
                className="button button-accent"

                data-cursor="DEMO"
                href="/contact"
              >
                Request an operations demo <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <div
            className="platform-preview"
            data-reveal=""
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <div className="preview-header">
              <span><Sparkles size={15} /> Weekly command center</span>
              <small>All systems synced</small>
            </div>
            <div className="preview-kpis">
              <div><small>Net sales</small><strong data-counter="">₹24.8L</strong><span>+18.4%</span></div>
              <div><small>Margin</small><strong data-counter="">21.6%</strong><span>+3.2 pts</span></div>
              <div><small>Health</small><strong data-counter="">96</strong><span>Stable</span></div>
            </div>
            <div className="preview-board">
              <div className="preview-column">
                <span>Priority</span>
                <article><i className="red" /><strong>Recover suppressed ASINs</strong><small>Amazon · Today</small></article>
                <article><i className="amber" /><strong>Approve summer campaign</strong><small>Flipkart · 2h</small></article>
              </div>
              <div className="preview-column">
                <span>In progress</span>
                <article><i className="blue" /><strong>Rebuild listing content</strong><small>12 of 30 SKUs</small></article>
                <article><i className="green" /><strong>Settlement audit</strong><small>May cycle</small></article>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container section-heading centered" data-reveal="">
          <span className="eyebrow">Built around the operating questions</span>
          <h2>No more wondering what the agency is doing.</h2>
          <p>
            The platform gives leaders the answer without requiring another
            status meeting.
          </p>
        </div>
        <div className="container feature-grid" style={{ marginTop: "56px" }}>
          {[
            [ListChecks, "What matters now?", "A ranked roadmap and active sprint make priorities visible across every channel."],
            [Clock3, "Who owns the action?", "Every task has an owner, due date, service level, and escalation path."],
            [BarChart3, "Did it improve the business?", "KPIs connect activity to sales, margin, ads, inventory, and account health."],
            [CircleCheck, "What needs approval?", "Content, budgets, promotions, and strategy changes move through explicit approvals."],
            [FileClock, "What changed?", "A searchable audit history captures decisions, completed work, and marketplace events."],
            [ShieldCheck, "Is access controlled?", "Role-aware workflows and disciplined credential handling reduce unnecessary exposure."],
          ].map(([Icon, title, text], index) => (
            <article
              key={title as string}
              data-reveal=""
              style={{ "--reveal-delay": `${(index % 3) * 55}ms` } as React.CSSProperties}
            >
              {typeof Icon !== "string" && <Icon size={25} />}
              <h3>{title as string}</h3>
              <p>{text as string}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-dark artifact-section">
        <div className="container split-heading">
          <div data-reveal="">
            <span className="eyebrow light">The weekly paper trail</span>
            <h2>Operating work leaves artifacts, not anecdotes.</h2>
          </div>
          <div className="intro-copy" data-reveal="">
            <p>
              Every cycle closes with reviewable output: a reprioritized
              roadmap, explicit approvals, and reconciled economics. Hover the
              stack — each artifact is a real deliverable, not a status update.
            </p>
          </div>
        </div>
        <div className="container">
          <DisplayCards
            cards={[
              {
                icon: <ListChecks size={15} />,
                title: "Growth roadmap",
                description: "Reprioritized with owners and deadlines",
                meta: "Updated Monday 09:00",
              },
              {
                icon: <FileCheck2 size={15} />,
                title: "Approvals queue",
                description: "2 campaign decisions waiting on you",
                meta: "Service level — 24h",
                tone: "amber",
              },
              {
                icon: <BadgeIndianRupee size={15} />,
                title: "Settlement audit",
                description: "May cycle reconciled, ₹38K recovered",
                meta: "Closed yesterday",
              },
            ]}
          />
        </div>
      </section>
      <section className="section platform-roadmap-section">
        <div className="container process-wide">
          <div data-reveal="">
            <span className="eyebrow">Production direction</span>
            <h2>Designed to become a real seller operating system.</h2>
          </div>
          <div data-reveal="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p>
              The current experience demonstrates the operating layer and lead
              workflow. The production architecture extends into secure
              marketplace connectors, catalog approvals, settlement
              reconciliation, task boards, compliance deadlines, and
              organization-level access controls.
            </p>
            <Link className="arrow-link" data-cursor="TALK" href="/contact">
              Discuss platform access <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
