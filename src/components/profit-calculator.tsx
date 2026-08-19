"use client";

import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

type Result = {
  currency: "INR" | "USD";
  referralFee: number;
  closingFee: number;
  paymentFee: number;
  weightFee: number;
  advertising: number;
  taxOnFees: number;
  totalFees: number;
  totalCosts: number;
  profit: number;
  margin: number;
  health: "healthy" | "watch" | "at-risk";
  note: string;
};

export function ProfitCalculator({
  platform,
  currency,
}: {
  platform: string;
  currency: string;
}) {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/calculators/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, platform }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to calculate.");
      setResult(data);
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "Unable to calculate.",
      );
    } finally {
      setLoading(false);
    }
  }

  const formatter = new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

  return (
    <div className="calculator-shell">
      <form className="calculator-form" onSubmit={calculate}>
        <div className="calculator-intro">
          <span className="eyebrow">Live economics model</span>
          <h2>Estimate your real marketplace margin.</h2>
          <p>
            Adjust product economics and ad spend to see the pressure points
            before you commit inventory or campaign budget.
          </p>
        </div>
        <div className="field-grid">
          <label>
            Selling price
            <input name="sellingPrice" type="number" min="0.01" step="0.01" defaultValue="1499" required />
          </label>
          <label>
            Product cost
            <input name="productCost" type="number" min="0" step="0.01" defaultValue="520" required />
          </label>
        </div>
        <div className="field-grid">
          <label>
            Shipping / fulfillment
            <input name="shippingCost" type="number" min="0" step="0.01" defaultValue="95" required />
          </label>
          <label>
            Packed weight (grams)
            <input name="weightGrams" type="number" min="0" defaultValue="650" required />
          </label>
        </div>
        <div className="field-grid">
          <label>
            Ad cost (% of revenue)
            <input name="adCostPercent" type="number" min="0" max="100" step="0.1" defaultValue="12" required />
          </label>
          <label>
            Tax on fees
            <input name="taxPercent" type="number" min="0" max="100" step="0.1" defaultValue={currency === "INR" ? "18" : "0"} required />
          </label>
        </div>
        <label>
          Product category
          <select name="category" defaultValue="general">
            <option value="general">General merchandise</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
          </select>
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="button form-submit" type="submit" disabled={loading}>
          {loading ? (
            <>
              Calculating <LoaderCircle className="spinner" size={17} />
            </>
          ) : (
            <>
              Calculate margin <ArrowRight size={17} />
            </>
          )}
        </button>
      </form>
      <div className={`calculator-result ${result ? "has-result" : ""}`}>
        {result ? (
          <>
            <div className="result-head">
              <div>
                <span>Estimated profit</span>
                <strong>{formatter.format(result.profit)}</strong>
              </div>
              <span className={`health-badge health-${result.health}`}>
                {result.health.replace("-", " ")}
              </span>
            </div>
            <div className="margin-bar">
              <span
                style={{
                  width: `${Math.max(2, Math.min(100, result.margin))}%`,
                }}
              />
            </div>
            <div className="result-margin">
              <span>Contribution margin</span>
              <strong>{result.margin.toFixed(1)}%</strong>
            </div>
            <div className="result-list">
              <div>
                <span>Marketplace + tax fees</span>
                <strong>{formatter.format(result.totalFees)}</strong>
              </div>
              <div>
                <span>Advertising</span>
                <strong>{formatter.format(result.advertising)}</strong>
              </div>
              <div>
                <span>Total cost to serve</span>
                <strong>{formatter.format(result.totalCosts)}</strong>
              </div>
            </div>
            <p className="result-note">{result.note}</p>
          </>
        ) : (
          <div className="result-empty">
            <span>
              <Sparkles size={22} />
            </span>
            <h3>Your economics will appear here.</h3>
            <p>
              We include marketplace commission, closing or payment fees,
              weight handling, ads, tax, shipping, and product cost.
            </p>
            <div className="empty-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
