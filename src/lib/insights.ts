export type InsightSection = {
  heading: string;
  paragraphs: string[];
  checklist?: string[];
};

export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  dek: string;
  readTime: string;
  date: string;
  publishedAt: string;
  modifiedAt: string;
  takeaways: string[];
  sections: InsightSection[];
  relatedService: { label: string; path: string };
};

export const insights: Insight[] = [
  {
    slug: "true-marketplace-profit",
    category: "Profitability",
    title: "Revenue is not profit: the marketplace P&L sellers actually need",
    excerpt:
      "A practical model for connecting fees, ads, returns, landed cost, and settlements at SKU level.",
    dek:
      "A marketplace P&L becomes useful when every order can be traced from selling price to contribution margin—and when settlement cash agrees with the operating model.",
    readTime: "8 min",
    date: "June 3, 2026",
    publishedAt: "2026-06-03",
    modifiedAt: "2026-06-03",
    takeaways: [
      "Separate revenue, settlement cash, gross margin, and contribution margin.",
      "Model costs at SKU and order level before rolling them into a channel total.",
      "Reconcile the model to settlement statements instead of treating reports as separate truths.",
    ],
    sections: [
      {
        heading: "Start with the decision, not the dashboard",
        paragraphs: [
          "Gross merchandise value can rise while cash quality deteriorates. Discounts, marketplace fees, advertising, returns, logistics, taxes, and landed product cost sit between the order value and the money available to operate the business. A useful P&L makes those layers visible rather than compressing them into one margin percentage.",
          "Begin by naming the decisions the model must support: which SKUs deserve advertising, which promotions remain viable, where pricing needs to change, and which channel is producing durable contribution. That keeps the model commercial and prevents a spreadsheet from becoming an accounting archive nobody uses.",
        ],
        checklist: [
          "Net selling price after customer discounts",
          "Marketplace, payment, fulfilment, and logistics charges",
          "Advertising cost attributed with a stated method",
          "Returns, cancellations, replacements, and reverse-logistics cost",
          "Landed product cost and any channel-specific packaging cost",
        ],
      },
      {
        heading: "Build the contribution bridge at SKU level",
        paragraphs: [
          "For each SKU, bridge from net sales to contribution in a consistent order. Subtract variable channel charges, fulfilment and shipping, return provisions, advertising, and landed cost. Keep fixed overhead outside the first contribution view so operators can see whether one additional sale helps or hurts before the wider business cost base is allocated.",
          "Document every assumption beside the number. If advertising is allocated by attributed sales, say so. If return cost uses a rolling category rate, record the window. Transparent assumptions make the model debatable and improvable; hidden assumptions make it look precise while weakening decisions.",
        ],
      },
      {
        heading: "Reconcile economics with settlement cash",
        paragraphs: [
          "The P&L explains economic performance; the settlement statement explains cash movement. They should connect. Create a reconciliation queue for fee adjustments, withheld balances, reimbursements, claims, and timing differences. Do not force unexplained differences into a miscellaneous line and move on.",
          "Use stable identifiers wherever available: order, SKU, settlement period, marketplace transaction, and claim reference. The goal is not only to close a period. It is to identify repeat leakage patterns and assign an owner to prevent or recover them.",
        ],
        checklist: [
          "Separate timing differences from genuine leakage",
          "Keep an evidence link for each disputed charge or recovery",
          "Age unresolved items and give each one an owner",
          "Feed confirmed cost changes back into pricing and advertising rules",
        ],
      },
      {
        heading: "Turn the P&L into a weekly operating rhythm",
        paragraphs: [
          "A strong model ends with action. Review the largest contribution changes, the SKUs below the agreed floor, return-cost movement, advertising efficiency, and settlement exceptions. Rank interventions by financial impact, urgency, and effort, then record the decision and expected signal.",
          "Over time, this creates a useful history: what changed, why it changed, who approved it, and whether the economics improved. That history is more valuable than a static monthly report because it teaches the business which levers actually compound.",
        ],
      },
    ],
    relatedService: { label: "Explore sales and growth management", path: "/services/sales-growth-management" },
  },
  {
    slug: "amazon-account-health",
    category: "Amazon",
    title: "A 30-day operating system for stronger Amazon account health",
    excerpt:
      "The daily and weekly controls that prevent avoidable listing, fulfillment, and policy issues.",
    dek:
      "Account health is easier to protect when alerts, catalog changes, fulfilment signals, and policy work move through one owned operating queue.",
    readTime: "6 min",
    date: "May 28, 2026",
    publishedAt: "2026-05-28",
    modifiedAt: "2026-05-28",
    takeaways: [
      "Use current Seller Central notices and policy pages as the source of truth.",
      "Separate monitoring, investigation, response, and prevention into named work.",
      "Keep evidence and approval history for every material account-health action.",
    ],
    sections: [
      {
        heading: "Treat account health as operations, not firefighting",
        paragraphs: [
          "Marketplace rules and account signals can change, so a static checklist is never the authority. The operating system should route current notices, performance signals, listing suppressions, customer-experience issues, and fulfilment exceptions into one visible queue. The seller portal and the marketplace’s current policy documentation remain the source of truth for each case.",
          "Assign four states to every item: detected, investigating, action ready, and verified. This prevents a warning from disappearing into chat and makes it obvious whether the team is still gathering facts or waiting for an approval.",
        ],
      },
      {
        heading: "Design a daily control loop",
        paragraphs: [
          "The daily review should be short and exception-led. Check account notifications, suppressed or inactive listings, fulfilment and inventory exceptions, unresolved customer issues, and changes that could affect the buying experience. Record only what requires action; a control loop is not a screenshot collection.",
          "For each exception, capture the affected ASIN or SKU, first-seen time, customer or commercial risk, owner, next action, and evidence location. High-impact issues need an escalation path that does not depend on one person noticing a message.",
        ],
        checklist: [
          "New account and policy notifications reviewed",
          "Listing status changes assigned",
          "Fulfilment and inventory exceptions triaged",
          "Customer-facing defects linked to a corrective action",
        ],
      },
      {
        heading: "Use the weekly review to remove repeat causes",
        paragraphs: [
          "A weekly review should group incidents by root cause: product data, packaging, dispatch, inventory accuracy, customer expectation, or internal approval delay. Review repeat issues and decide which rule, template, or ownership boundary needs to change.",
          "This is also the moment to inspect upcoming promotions, inventory risk, catalog changes, and operational dependencies. Prevention work belongs in the same roadmap as growth work because an unstable account cannot compound demand reliably.",
        ],
      },
      {
        heading: "Close the month with evidence",
        paragraphs: [
          "At day 30, summarize incidents opened and closed, repeat causes, material listing downtime, ageing items, and preventive changes completed. Avoid presenting a single score without the work behind it. Leaders need to see both current risk and whether the operating system is becoming more reliable.",
          "Keep the summary factual. Do not promise reinstatement, ranking, or a policy outcome; marketplaces control those decisions. A good operating system improves response quality, ownership, and learning even when the external decision remains uncertain.",
        ],
      },
    ],
    relatedService: { label: "Explore marketplace account management", path: "/services/marketplace-account-management" },
  },
  {
    slug: "cross-border-readiness",
    category: "Global commerce",
    title: "Are your products ready for cross-border marketplaces?",
    excerpt:
      "Score compliance, margin, logistics, and localized demand before committing launch capital.",
    dek:
      "Cross-border readiness is a sequence of evidence gates—not a decision to translate a listing and switch on international shipping.",
    readTime: "9 min",
    date: "May 21, 2026",
    publishedAt: "2026-05-21",
    modifiedAt: "2026-05-21",
    takeaways: [
      "Resolve product, entity, tax, and documentation questions before demand planning.",
      "Model landed contribution and cash timing under conservative assumptions.",
      "Pilot a narrow assortment with explicit pass, adapt, and stop criteria.",
    ],
    sections: [
      {
        heading: "Gate one: can the product be sold and supported?",
        paragraphs: [
          "Begin with product eligibility, documentation, labelling, intellectual-property rights, safety obligations, and marketplace category requirements for the destination. Requirements vary by product and jurisdiction, so obtain current specialist advice where legal, tax, customs, or regulatory judgment is required.",
          "Also test the service promise. Confirm warranty handling, instructions, sizing, plugs or voltage where relevant, language needs, and the path for returns or replacements. A product can be technically listable and still create a poor customer experience.",
        ],
        checklist: [
          "Product and category eligibility verified from current sources",
          "Brand, image, and distribution rights documented",
          "Destination-specific labels and customer information planned",
          "Returns, warranty, and support ownership confirmed",
        ],
      },
      {
        heading: "Gate two: do the landed economics survive reality?",
        paragraphs: [
          "Build an order-level model in the destination currency. Include product cost, international freight, duties and taxes where applicable, marketplace charges, fulfilment, local delivery, advertising, returns, currency conversion, payout cost, and a provision for exceptions. Model cash timing as well as margin because inventory can be profitable on paper and still strain working capital.",
          "Run conservative cases for slower sell-through, higher returns, promotional pressure, and exchange-rate movement. The aim is not to predict one perfect outcome. It is to identify which assumption can break the launch and what evidence will resolve it.",
        ],
      },
      {
        heading: "Gate three: is localized demand observable?",
        paragraphs: [
          "Demand in the home market does not automatically transfer. Review destination search language, price architecture, competitor propositions, review themes, delivery expectations, and seasonal patterns. Rewrite the value proposition for the customer context instead of translating it word for word.",
          "Select a pilot assortment that can teach efficiently: enough variation to test demand, but small enough to protect cash and operational focus. Avoid launching the entire catalog before the team knows which content, price, and fulfilment assumptions hold.",
        ],
      },
      {
        heading: "Gate four: can the operation learn quickly?",
        paragraphs: [
          "Define pass, adapt, and stop criteria before inventory moves. Review traffic quality, conversion, contribution, return reasons, customer questions, delivery performance, and cash release on a fixed cadence. Each signal should have an owner and a pre-agreed response.",
          "A readiness score is useful only when a failed gate changes the plan. If compliance evidence is missing, stop. If economics are marginal, change the assortment or route. If demand evidence is weak, run a smaller test. The discipline to delay a launch can protect more value than speed alone.",
        ],
      },
    ],
    relatedService: { label: "Explore global entity and expansion support", path: "/solutions/global-entity" },
  },
  {
    slug: "meesho-rto",
    category: "Meesho",
    title: "Reducing RTO without sacrificing marketplace growth",
    excerpt:
      "How catalog promises, pricing, dispatch speed, and customer communication shape RTO.",
    dek:
      "RTO improves when teams diagnose the promise, price, customer, and fulfilment conditions behind each return-to-origin—not when they apply one blanket rule.",
    readTime: "7 min",
    date: "May 15, 2026",
    publishedAt: "2026-05-15",
    modifiedAt: "2026-05-15",
    takeaways: [
      "Segment RTO by SKU, location, order conditions, fulfilment path, and reason.",
      "Align the listing promise with what arrives in the parcel.",
      "Test one operational lever at a time and judge it on contribution, not dispatch volume alone.",
    ],
    sections: [
      {
        heading: "Build a reason map before choosing a remedy",
        paragraphs: [
          "RTO is an outcome with multiple causes. Segment it by product, variant, customer location, price or promotion, dispatch timing, fulfilment path, and the reason codes available in current marketplace reports. Add customer-support or courier evidence where it exists, and label unknowns rather than guessing.",
          "Rank segments by contribution impact, not count alone. A frequent issue on a low-value SKU and a smaller issue on a high-cost or high-shipping product may need different priorities. The analysis should reveal where an operational change can protect both customer experience and margin.",
        ],
      },
      {
        heading: "Inspect the promise customers are buying",
        paragraphs: [
          "Product titles, images, variants, quantity, dimensions, materials, colours, and included accessories must agree with the delivered product. Make important limits visible before purchase. Avoid creative that makes a product look larger, more complete, or more premium than the parcel can support.",
          "Review the promise on the same mobile surfaces customers use, not only inside a catalog sheet. Look for cropped text, ambiguous variant choices, hidden pack sizes, and images whose scale lacks context. Clearer expectations may reduce unqualified orders while improving the quality of demand.",
        ],
        checklist: [
          "Hero image and title describe the same variant",
          "Pack quantity, size, material, and colour are explicit",
          "Dispatch and delivery expectations are not overstated",
          "Packaging protects the product and matches the visible promise",
        ],
      },
      {
        heading: "Connect fulfilment signals to catalog decisions",
        paragraphs: [
          "Track order confirmation, pick and pack, handover, delivery attempt, and return milestones. Late or inconsistent dispatch can weaken intent that was valid at purchase. Repeated damage, wrong-item, or variant errors should trigger a listing or warehouse control—not remain a courier-only conversation.",
          "Create a closed loop between operators who see return evidence and the people who own catalog, pricing, packaging, and inventory. The fastest learning often comes from connecting evidence already held by different teams.",
        ],
      },
      {
        heading: "Run controlled tests with a commercial guardrail",
        paragraphs: [
          "Choose a defined SKU or segment, change one material lever, and compare a meaningful period with the previous baseline. Watch RTO alongside conversion, net contribution, customer issues, dispatch performance, and order mix. A lower RTO rate is not a win if the change removes profitable demand or creates another defect.",
          "Marketplace controls and available reports can change. Use the current supplier panel and policy materials when setting up the test, keep a record of the exact change, and avoid claiming that any single intervention guarantees an outcome.",
        ],
      },
    ],
    relatedService: { label: "Explore sales and growth management", path: "/services/sales-growth-management" },
  },
  {
    slug: "marketplace-ad-efficiency",
    category: "Advertising",
    title: "From ACoS to contribution margin: a better advertising scorecard",
    excerpt:
      "Why ad decisions should account for organic lift, inventory, returns, and unit economics.",
    dek:
      "Advertising efficiency becomes commercially useful when campaign metrics are reconciled with product economics, inventory, returns, and the role each campaign is meant to play.",
    readTime: "10 min",
    date: "May 7, 2026",
    publishedAt: "2026-05-07",
    modifiedAt: "2026-05-07",
    takeaways: [
      "Set the campaign objective and economic guardrail before changing bids.",
      "Connect attributed sales to SKU contribution and return-adjusted value.",
      "Separate discovery, defence, launch, and efficiency work in the review.",
    ],
    sections: [
      {
        heading: "ACoS answers one question",
        paragraphs: [
          "Advertising cost of sales shows ad spend relative to attributed sales. It does not, by itself, show whether those sales produced contribution, whether returns changed the result, whether stock can support demand, or whether the campaign is deliberately learning. A low figure can still sit on weak unit economics; a higher figure can be rational during a controlled launch.",
          "Start every campaign group with an objective: protect branded demand, discover queries, launch a product, clear a planned inventory position, or harvest efficient demand. Then define the economic and operational guardrails appropriate to that job.",
        ],
      },
      {
        heading: "Create a return-adjusted contribution view",
        paragraphs: [
          "At SKU level, connect attributed net sales with marketplace charges, fulfilment and logistics, expected returns, landed cost, promotions, and ad spend. Keep the attribution method visible. This produces an estimated contribution after advertising rather than treating revenue as the finish line.",
          "Use ranges when input quality is uncertain. A transparent estimate with a documented return assumption is more useful than a precise-looking number built on incomplete fees. Reconcile the model to settlements and confirmed return outcomes as data matures.",
        ],
        checklist: [
          "Campaign role and decision owner",
          "Attributed net sales and stated attribution window",
          "Return-adjusted contribution estimate",
          "Inventory cover and replenishment constraint",
          "Query or placement evidence behind the next action",
        ],
      },
      {
        heading: "Review portfolios, not isolated percentages",
        paragraphs: [
          "Group activity by role and product economics. Discovery work should be judged on useful search-term learning as well as immediate sales. Brand defence should be reviewed in the context of organic demand. Mature efficiency campaigns need tighter economic control and clear rules for waste.",
          "Look at changes over time and record why a bid, budget, target, or placement changed. Without an experiment log, teams repeatedly relearn the same lesson and cannot separate seasonality from an actual operating improvement.",
        ],
      },
      {
        heading: "Make the weekly scorecard actionable",
        paragraphs: [
          "A practical review highlights material contribution movement, spend without useful evidence, inventory-constrained winners, return-heavy products, and campaigns whose objective no longer matches the business need. Each item ends with an owner, action, guardrail, and review date.",
          "Marketplace reporting definitions and controls evolve. Confirm current field definitions in the relevant advertising console before automating decisions, and keep business rules easy to update when the source data changes.",
        ],
      },
    ],
    relatedService: { label: "Explore performance advertising", path: "/services/performance-advertising" },
  },
  {
    slug: "catalog-quality-system",
    category: "Catalog",
    title: "The catalog quality system behind scalable marketplace operations",
    excerpt:
      "Build a reusable product data, content, image, and compliance workflow across channels.",
    dek:
      "A scalable catalog is a governed product-data system: one source of truth, explicit channel translations, evidence-led quality checks, and owned change control.",
    readTime: "5 min",
    date: "April 29, 2026",
    publishedAt: "2026-04-29",
    modifiedAt: "2026-04-29",
    takeaways: [
      "Separate canonical product truth from marketplace-specific presentation.",
      "Validate required attributes, claims, images, and relationships before submission.",
      "Treat suppressions and corrections as inputs to a reusable prevention system.",
    ],
    sections: [
      {
        heading: "Define a canonical product record",
        paragraphs: [
          "Create one governed record for the facts that should not drift by channel: identifiers, brand, product name, variant relationships, dimensions, material, quantity, technical details, safety information, and approved claims. Record the evidence source and owner for sensitive fields.",
          "Marketplace titles, bullets, search terms, and image sequences are translations of that truth for a specific channel. Keeping truth separate from presentation makes it easier to update one product safely without copying old errors across templates.",
        ],
        checklist: [
          "Stable product and variant identifiers",
          "Required attributes with source evidence",
          "Approved customer-facing claims",
          "Image set mapped to product and variant",
          "Owner and last-reviewed date for material fields",
        ],
      },
      {
        heading: "Build channel rules as versioned transformations",
        paragraphs: [
          "Each marketplace has its own category structures, field limits, allowed values, relationship models, and creative rules. Maintain those rules as versioned mapping logic or controlled templates. When a requirement changes, update the transformation rather than manually correcting hundreds of disconnected listings.",
          "Use current marketplace documentation and in-product validation as the authority. Avoid assuming a rule remains identical across categories or countries. Where the requirement is ambiguous, record the decision and evidence so the team can revisit it quickly.",
        ],
      },
      {
        heading: "Add quality gates before and after submission",
        paragraphs: [
          "Before submission, validate completeness, allowed values, variant logic, image ownership, claim consistency, spelling, units, and mobile readability. After submission, confirm the live detail page rather than relying only on a successful feed response. A technically accepted record can still render poorly or lose important information.",
          "Sample high-value and high-change items more frequently. Catalog quality is risk-based: a minor copy issue and a broken parent-child relationship do not deserve the same urgency.",
        ],
      },
      {
        heading: "Turn catalog incidents into prevention",
        paragraphs: [
          "For every suppression, rejected update, incorrect merge, or customer-facing mismatch, capture the root cause and the control that would have prevented it. Update the schema, validation, template, or approval route, then verify the fix on the live channel.",
          "Track ageing, repeat causes, affected revenue or inventory risk, and time to verified resolution. The objective is not a catalog with no change; it is a catalog system that absorbs change without losing product truth or operational control.",
        ],
      },
    ],
    relatedService: { label: "Explore smart product cataloging", path: "/services/smart-product-cataloging" },
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
