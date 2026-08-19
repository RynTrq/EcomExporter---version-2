"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  User,
} from "lucide-react";
import { FormEvent, useId, useState } from "react";

export function LeadForm({
  source = "website",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const idempotencyKey =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({ ...payload, source }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Please check your details and try again.");
      }
      setStatus("success");
      event.currentTarget.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={34} />
        <h3>Your growth brief is in.</h3>
        <p>
          An operator will review it and get back to you within one business day.
        </p>
        <button className="text-button" type="button" onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className={`lead-form ${compact ? "lead-form-compact" : ""}`} onSubmit={submit}>
      {!compact && (
        <div className="lead-form-head">
          <span className="lead-form-badge">
            <Sparkles size={13} /> Free growth plan
          </span>
          <span className="lead-form-reply">Reply within 1 business day</span>
        </div>
      )}
      <div className="field-grid">
        <label htmlFor={`${id}-name`}>
          Name
          <span className="field-control">
            <User size={16} />
            <input id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder="Your name" required />
          </span>
        </label>
        <label htmlFor={`${id}-email`}>
          Work email
          <span className="field-control">
            <Mail size={16} />
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </span>
        </label>
      </div>
      <div className="field-grid">
        <label htmlFor={`${id}-phone`}>
          Phone
          <span className="field-control">
            <Phone size={16} />
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+91 …" required />
          </span>
        </label>
        <label htmlFor={`${id}-company`}>
          Company
          <span className="field-control">
            <Building2 size={16} />
            <input id={`${id}-company`} name="company" type="text" autoComplete="organization" placeholder="Brand or company" />
          </span>
        </label>
      </div>
      <div className="field-grid">
        <label htmlFor={`${id}-marketplace`}>
          Priority marketplace
          <span className="field-control">
            <Store size={16} />
            <select id={`${id}-marketplace`} name="marketplace" defaultValue="" required>
              <option value="" disabled>
                Select one
              </option>
              <option>Amazon India</option>
              <option>Amazon Global</option>
              <option>Flipkart</option>
              <option>Meesho</option>
              <option>Walmart</option>
              <option>Etsy / eBay</option>
              <option>Shopify / D2C</option>
              <option>Multiple marketplaces</option>
            </select>
          </span>
        </label>
        <label htmlFor={`${id}-monthly-revenue`}>
          Monthly online revenue
          <span className="field-control">
            <TrendingUp size={16} />
            <select id={`${id}-monthly-revenue`} name="monthlyRevenue" defaultValue="">
              <option value="">Prefer not to say</option>
              <option>Pre-launch</option>
              <option>Under ₹5 lakh</option>
              <option>₹5–25 lakh</option>
              <option>₹25 lakh–₹1 crore</option>
              <option>₹1 crore+</option>
            </select>
          </span>
        </label>
      </div>
      {!compact && (
        <label htmlFor={`${id}-message`}>
          What would make this engagement a win?
          <span className="field-control field-control-area">
            <MessageSquare size={16} />
            <textarea id={`${id}-message`} name="message" rows={4} placeholder="Where commerce feels harder than it should…" />
          </span>
        </label>
      )}
      <label className="consent-check" htmlFor={`${id}-consent`}>
        <input id={`${id}-consent`} name="consentToContact" type="checkbox" value="true" required />
        <span>
          I agree to be contacted about my marketplace growth plan and accept
          Ecom Exporter’s practical, no-spam follow-up.
        </span>
      </label>
      <input name="privacyVersion" type="hidden" value="2026-06-10" />
      <input id={`${id}-website`} name="website" className="honeypot" tabIndex={-1} autoComplete="off" />
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button form-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            Sending <LoaderCircle className="spinner" size={17} />
          </>
        ) : (
          <>
            Build my growth plan <ArrowRight size={17} />
          </>
        )}
      </button>
      <p className="form-note">
        <ShieldCheck size={14} />
        Protected intake, no generic deck, and a practical next step within one
        business day.
      </p>
    </form>
  );
}
