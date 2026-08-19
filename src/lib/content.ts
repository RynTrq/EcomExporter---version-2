import {
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  GaugeCircle,
  Globe2,
  Megaphone,
  PackageCheck,
  Palette,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Store,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  seoTitle: string;
  headline: string;
  imageAlt: string;
  eyebrow: string;
  summary: string;
  description: string;
  color: string;
  icon: LucideIcon;
  metrics: { value: string; label: string }[];
  capabilities: string[];
  deliverables: string[];
};

export type Solution = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    slug: "smart-product-cataloging",
    name: "Smart Product Cataloging",
    seoTitle: "Marketplace product cataloging and listing optimization",
    headline: "Marketplace catalogs engineered for discovery and conversion.",
    imageAlt: "Marketplace product cataloging and listing optimization by Ecom Exporter",
    eyebrow: "Catalog + listing engine",
    summary:
      "SEO-focused catalog management that improves visibility, boosts discoverability, and drives higher conversions across marketplaces.",
    description:
      "We optimize and structure your product listings with optimized titles, descriptions, keywords, and high-converting catalog structures that improve search visibility and sales performance across ecommerce marketplaces.",
    color: "#ffb15d",
    icon: FileSearch,
    metrics: [
      { value: "SEO", label: "listing-led discoverability" },
      { value: "100%", label: "marketplace-compliant catalogs" },
      { value: "Weekly", label: "catalog health reviews" },
    ],
    capabilities: [
      "SEO titles, descriptions, and keyword research",
      "Catalog structure and category mapping",
      "Image and A+ content coordination",
      "Attribute and size-chart governance",
      "Suppressed listing recovery",
      "Catalog quality and compliance QA",
    ],
    deliverables: [
      "Catalog health audit",
      "Keyword and tag library",
      "Listing content system",
      "Conversion-focused catalog plan",
    ],
  },
  {
    slug: "marketplace-account-management",
    name: "Marketplace Account Management",
    seoTitle: "Marketplace account management services",
    headline: "Marketplace account management, built around profitable operations.",
    imageAlt: "Marketplace account management services by Ecom Exporter",
    eyebrow: "End-to-end operations",
    summary:
      "From store setup to day-to-day operations, our experts manage your ecommerce accounts so you can focus on scaling.",
    description:
      "We handle everything from product listing creation and optimization to inventory coordination, advertising management, performance monitoring, customer support guidance, and marketplace compliance across Amazon, Flipkart, Meesho, Myntra, Ajio, JioMart, Etsy, Walmart, and eBay.",
    color: "#5f89ff",
    icon: Store,
    metrics: [
      { value: "10+", label: "marketplaces managed" },
      { value: "Daily", label: "account operations" },
      { value: "< 24h", label: "critical issue response" },
    ],
    capabilities: [
      "Marketplace registration and store setup",
      "Daily account and order operations",
      "Inventory coordination",
      "Account health and compliance monitoring",
      "Customer support guidance",
      "Multichannel and cross-border operations",
    ],
    deliverables: [
      "Onboarding readiness pack",
      "Operating rhythm and owners",
      "Account health scorecard",
      "Monthly executive review",
    ],
  },
  {
    slug: "performance-advertising",
    name: "Performance Advertising",
    seoTitle: "Marketplace advertising management",
    headline: "Marketplace advertising governed by contribution, not vanity.",
    imageAlt: "Marketplace advertising management by Ecom Exporter",
    eyebrow: "Data-driven campaigns",
    summary:
      "Data-driven advertising campaigns that increase visibility, cut ad spend wastage, and generate profitable sales growth.",
    description:
      "We handle marketplace advertising campaigns, promotional strategies, deal setups, keyword targeting, budget optimization, and real-time performance monitoring across leading ecommerce platforms — continuously analyzing campaign data to maximize returns.",
    color: "#f7c965",
    icon: Megaphone,
    metrics: [
      { value: "Lower", label: "ad spend wastage" },
      { value: "Real-time", label: "performance monitoring" },
      { value: "ROI", label: "first campaign governance" },
    ],
    capabilities: [
      "Campaign architecture and keyword targeting",
      "Bid and budget optimization",
      "Promotional strategies and deal setups",
      "Marketplace event planning",
      "ACoS and TACoS governance",
      "Campaign data analysis and reporting",
    ],
    deliverables: [
      "Advertising audit",
      "Campaign launch plan",
      "Budget allocation model",
      "Advertising performance report",
    ],
  },
  {
    slug: "sales-growth-management",
    name: "Sales & Growth Management",
    seoTitle: "Ecommerce sales growth management",
    headline: "Sales growth management that turns channel data into action.",
    imageAlt: "Ecommerce sales growth management by Ecom Exporter",
    eyebrow: "Compounding performance",
    summary:
      "Monitor performance, uncover new growth opportunities, and implement strategic improvements for consistent sales success.",
    description:
      "We track your store's growth with detailed analytics and actionable performance reports — identifying opportunities, monitoring trends, and implementing strategies that improve results consistently across every channel you sell on.",
    color: "#7adca5",
    icon: ChartNoAxesCombined,
    metrics: [
      { value: "45–60", label: "days to steady growth" },
      { value: "Weekly", label: "growth dashboards" },
      { value: "SKU", label: "level profitability" },
    ],
    capabilities: [
      "Performance analytics and reporting",
      "Growth opportunity identification",
      "Trend monitoring and benchmarks",
      "Pricing and promotion strategy",
      "New marketplace expansion planning",
      "Strategic improvement roadmaps",
    ],
    deliverables: [
      "Growth roadmap",
      "Performance analytics reports",
      "Opportunity pipeline",
      "Quarterly strategy review",
    ],
  },
];

export const solutions: Solution[] = [
  {
    slug: "ecommerce-strategy-consulting",
    name: "Ecommerce Strategy & Growth Consulting",
    summary:
      "Customized growth strategies tailored to your business goals, helping you improve operations and scale profitably.",
    description:
      "We create customized growth strategies tailored to your business goals, helping you improve operations, increase visibility, and scale profitably in competitive ecommerce marketplaces.",
    icon: ChartNoAxesCombined,
    accent: "#ffd66b",
    capabilities: [
      "Business goal and category assessment",
      "Marketplace selection and prioritization",
      "Pricing and margin strategy",
      "Competition and demand analysis",
      "Quarterly growth roadmaps",
      "Executive advisory reviews",
    ],
  },
  {
    slug: "digital-marketing-brand-growth",
    name: "Digital Marketing & Brand Growth",
    summary:
      "Powerful brand visibility through targeted advertising, performance marketing, and strategic promotions.",
    description:
      "Our team builds powerful brand visibility through targeted advertising, performance marketing, and strategic promotional campaigns designed to increase traffic and conversions.",
    icon: Megaphone,
    accent: "#ff8d68",
    capabilities: [
      "Targeted advertising campaigns",
      "Performance marketing",
      "Strategic promotional planning",
      "Brand visibility programs",
      "Audience and traffic growth",
      "Conversion optimization",
    ],
  },
  {
    slug: "analytics-performance-tracking",
    name: "Analytics, Reporting & Performance Tracking",
    summary:
      "Data-driven insights and advanced reporting that monitor marketplace performance and surface growth opportunities.",
    description:
      "Using data-driven insights and advanced reporting, we monitor marketplace performance, identify growth opportunities, and implement strategies for long-term business success.",
    icon: GaugeCircle,
    accent: "#65d7c0",
    capabilities: [
      "Marketplace performance dashboards",
      "Actionable performance reports",
      "Trend and benchmark monitoring",
      "Growth opportunity identification",
      "SKU-level profitability views",
      "Long-term strategy implementation",
    ],
  },
  {
    slug: "business-support-scaling",
    name: "Business Support & Scaling Solutions",
    summary:
      "Scalable solutions and ongoing support for launching a new ecommerce business or expanding an established brand.",
    description:
      "Whether you are launching a new ecommerce business or expanding an established brand, we provide scalable solutions and ongoing support to help your business grow confidently.",
    icon: ShieldCheck,
    accent: "#91e06f",
    capabilities: [
      "New seller launch support",
      "Onboarding and branding guidance",
      "Daily operations support",
      "Issue escalation and resolution",
      "Flexible service plans",
      "Dedicated business support",
    ],
  },
  {
    slug: "global-entity",
    name: "Global Entity & Company Formation",
    summary:
      "Company registration in the USA, UK, and UAE with marketplace onboarding and cross-border selling strategies.",
    description:
      "We assist businesses with global ecommerce expansion: international company formation, business documentation, marketplace account setup, and ecommerce platform entry so brands can start selling internationally with confidence.",
    icon: FileCheck2,
    accent: "#8da8ff",
    capabilities: [
      "Company registration — USA, UK, UAE",
      "Business documentation guidance",
      "International marketplace onboarding",
      "Cross-border selling strategy",
      "Banking and payout coordination",
      "Compliance and renewal tracking",
    ],
  },
  {
    slug: "ecom-website-development",
    name: "Ecom Website Development",
    summary:
      "High-performance ecommerce storefronts engineered for conversions, speed, and growth.",
    description:
      "We design and build conversion-focused ecommerce websites — strategy, UX, development, integrations, and analytics — so your brand owns a storefront that grows alongside your marketplace business.",
    icon: Rocket,
    accent: "#bf8cff",
    capabilities: [
      "Store strategy and UX architecture",
      "Custom storefront development",
      "Catalog and payment integrations",
      "Performance and speed optimization",
      "Analytics instrumentation",
      "Ongoing release support",
    ],
  },
  {
    slug: "graphic-designing",
    name: "Graphic Designing",
    summary:
      "Marketplace-ready creative: product imagery, A+ content, banners, and brand identity that convert.",
    description:
      "Our design team produces marketplace-compliant creative — product image enhancement, A+ and enhanced brand content, storefront design, campaign banners, and brand identity systems.",
    icon: Palette,
    accent: "#ff6d9b",
    capabilities: [
      "Product image enhancement",
      "A+ and enhanced brand content",
      "Storefront and banner design",
      "Brand identity systems",
      "Campaign and promotion creative",
      "Marketplace compliance QA",
    ],
  },
];

export const calculatorPlatforms = [
  { slug: "amazon-india", name: "Amazon India", currency: "INR", icon: ShoppingBag },
  { slug: "amazon-us", name: "Amazon US", currency: "USD", icon: Globe2 },
  { slug: "walmart", name: "Walmart", currency: "USD", icon: Store },
  { slug: "etsy", name: "Etsy", currency: "USD", icon: Palette },
  { slug: "ebay", name: "eBay", currency: "USD", icon: Globe2 },
  { slug: "flipkart", name: "Flipkart", currency: "INR", icon: Store },
  { slug: "meesho", name: "Meesho", currency: "INR", icon: PackageCheck },
];

export const marketplaceServices = [
  {
    slug: "smart-cataloging",
    title: "Smart Cataloging",
    description:
      "We organize and enhance your listings to improve visibility and drive more sales.",
  },
  {
    slug: "build-a-brand",
    title: "Build a Brand",
    description:
      "Create a strong brand presence that builds trust and sets you apart from others.",
  },
  {
    slug: "account-management",
    title: "Account Management",
    description:
      "From setup to daily operations, we manage your account so you can scale with ease.",
  },
  {
    slug: "advertising-optimization",
    title: "Advertising Optimization",
    description:
      "Run targeted, high-impact ads that lower costs and deliver better sales results.",
  },
  {
    slug: "sales-management",
    title: "Sales Management",
    description:
      "Track performance, spot new opportunities, and keep your sales moving forward.",
  },
];

export const authorisedPartnerPoints = [
  "We are an authorised onboarding partner across every major marketplace",
  "Instant support from experts",
  "Dedicated account manager",
  "Support from onboarding to sales growth",
];

export const marketplaceAccounts: Record<
  string,
  { description: string; tags: string[] }
> = {
  "amazon-india": {
    description:
      "Navigating Amazon India's ever-changing landscape is daunting, especially early on. From account setup to full-scale optimization, our team handles everything so you can focus on product, pricing, and quality.",
    tags: ["Account setup", "Listings", "Ads"],
  },
  "amazon-global": {
    description:
      "Unlock the full potential of your business across borders. Dedicated experts provide personalized support, strategy, and tailored solutions to optimise your international selling on Amazon.",
    tags: ["Global reach", "Local expertise", "Seamless growth"],
  },
  walmart: {
    description:
      "Launch and scale on Walmart Marketplace in the US with fully managed listings, advertising, and order operations — built for cross-border sellers.",
    tags: ["US marketplace", "WFS", "Ads"],
  },
  ebay: {
    description:
      "Sell to a global audience on eBay with optimized listings, store management, and promoted-listing campaigns that compound visibility and sales.",
    tags: ["Global selling", "Promoted listings", "Store"],
  },
  etsy: {
    description:
      "Turn your creative catalog into a high-converting Etsy shop with search optimization, listing craft, and ads tuned for handmade and niche demand.",
    tags: ["Creative commerce", "SEO", "Ads"],
  },
  flipkart: {
    description:
      "Win on India's largest homegrown marketplace with managed cataloging, sharp pricing, and campaign operations built for Flipkart's ecosystem.",
    tags: ["Cataloging", "Pricing", "Campaigns"],
  },
  meesho: {
    description:
      "Grow as a Meesho supplier with catalog quality, competitive pricing, and RTO control that protects margin while you scale volume.",
    tags: ["Supplier growth", "Pricing", "RTO control"],
  },
  shopify: {
    description:
      "Build and operate your own D2C storefront on Shopify — from store build and merchandising to apps and conversion optimization.",
    tags: ["Storefront build", "CRO", "Operations"],
  },
};

export const marketplaceValueProps = [
  {
    icon: GaugeCircle,
    title: "Platform-Specific Experts",
    description:
      "Specialists who know each marketplace's rules, algorithms, and levers inside out.",
  },
  {
    icon: ShoppingBag,
    title: "Complete E-commerce Solutions",
    description:
      "Cataloging, content, ads, inventory, and pricing handled under one roof.",
  },
  {
    icon: ClipboardCheck,
    title: "Dedicated Account Management",
    description:
      "A named operator owns your account day to day — never a shared ticket queue.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Growth-Focused Optimization",
    description:
      "Every decision is tied to profit, contribution margin, and durable growth.",
  },
  {
    icon: FileSearch,
    title: "Transparent Reporting & Insights",
    description:
      "Clear, regular reporting with the numbers and assumptions fully visible.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by 2000+ Sellers",
    description:
      "A proven track record of sellers who scaled with us across every major channel.",
  },
];

export const marketplaceProcess = [
  {
    step: "01",
    title: "Book a call",
    description:
      "Tell us where commerce feels harder than it should — no generic deck.",
  },
  {
    step: "02",
    title: "Meet our team on a video call",
    description: "We review your account, catalog, and goals together, live.",
  },
  {
    step: "03",
    title: "Roadmap & plan the action",
    description:
      "You get a prioritized, profit-first action plan that is ready to execute.",
  },
];

export const operatingLoop = [
  {
    id: 1,
    icon: FileSearch,
    meta: "SIGNAL INTAKE",
    title: "Diagnose the constraint",
    text: "Channel, catalog, ad, margin, fulfillment, and account-health signals are reviewed together.",
    relatedIds: [4, 2],
  },
  {
    id: 2,
    icon: ChartNoAxesCombined,
    meta: "RANKING",
    title: "Choose the highest-leverage move",
    text: "The roadmap ranks work by commercial impact, urgency, dependency, and realistic execution capacity.",
    relatedIds: [1, 3],
  },
  {
    id: 3,
    icon: ClipboardCheck,
    meta: "EXECUTION",
    title: "Execute with visible ownership",
    text: "Every task has an owner, service level, approval path, and evidence trail.",
    relatedIds: [2, 4],
  },
  {
    id: 4,
    icon: GaugeCircle,
    meta: "REVIEW",
    title: "Review, learn, compound",
    text: "The weekly rhythm turns actions into better operating rules, not one-off agency activity.",
    relatedIds: [3, 1],
  },
];

export const operatingPillars = [
  {
    icon: ChartNoAxesCombined,
    title: "Profit before vanity",
    text: "Every recommendation connects to contribution margin, cash flow, or durable brand value.",
  },
  {
    icon: ShieldCheck,
    title: "Operational control",
    text: "Clear owners, service levels, approvals, and audit trails replace agency black boxes.",
  },
  {
    icon: CircleDollarSign,
    title: "Commercial clarity",
    text: "Transparent scopes and reporting make it obvious what is happening and why it matters.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

export function getCalculatorPlatform(slug: string) {
  return calculatorPlatforms.find((platform) => platform.slug === slug);
}

export { insights } from "@/lib/insights";
