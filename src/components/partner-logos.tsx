/* Marketplace partner logos.
   Each logo is a typographic recreation in the brand's own colors with a
   distinctive SVG glyph (amazon smile, walmart spark, shopify bag, myntra M)
   so the wall reads instantly without shipping bitmap assets. Neutral
   letterforms inherit the theme ink so both themes stay legible. */

function AmazonSmile() {
  return (
    <svg className="plogo-glyph plogo-smile" viewBox="0 0 60 14" aria-hidden="true">
      <path
        d="M2 3c14 9 42 9 54-1"
        fill="none"
        stroke="#ff9900"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M56 .5 57.5 8l-7-2.4z" fill="#ff9900" />
    </svg>
  );
}

function WalmartSpark() {
  return (
    <svg className="plogo-glyph" viewBox="0 0 24 24" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <rect
          key={angle}
          x="10.6"
          y="1.5"
          width="2.8"
          height="7.5"
          rx="1.4"
          fill="#ffc220"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

function ShopifyBag() {
  return (
    <svg className="plogo-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 7.2 16 5.6l2.8 1 1.7 13.2-7.6 2.2-9-1.6z"
        fill="#95bf47"
      />
      <path
        d="M13.9 10.2c-.6-.3-1.9-.5-2.5.1-.5.5-.4 1.1.5 1.7 1.3.8 2.2 1.7 1.9 3.1-.4 1.7-2 2.3-3.7 1.9-.8-.2-1.5-.6-1.9-1l.6-1.5c.5.4 1.2.8 1.8.8.6.1 1-.2 1-.7.1-.6-.5-1-1.2-1.6-1-.7-1.7-1.6-1.4-2.9.4-1.6 2-2.5 4-2.1.6.1 1.1.3 1.5.5z"
        fill="#fffdf8"
      />
      <path d="M14.8 4.1c.6.2 1.2.9 1.6 2l-1.7.5c-.2-1-.5-1.9-.9-2.4.3-.2.7-.2 1-.1z" fill="#5e8e3e" />
    </svg>
  );
}

/* Myntra: the official mark — an "M" built from four teardrop petals with
   POINTED tops and rounded bottoms. Two outer petals in magenta form the
   M's legs; two inner orange petals (lighter left, darker right) meet at
   the centre peak. White outlines separate them on any background.
   Petals are authored point-down then flipped vertically (matrix below) so
   the points sit at the top, matching the official logo.
   Colors sampled from the official logo: magenta #f0188f,
   orange #f68b1f / #ee5223. */
function MyntraM() {
  return (
    <svg className="plogo-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <g
        stroke="#fff"
        strokeWidth="0.45"
        strokeLinejoin="round"
        transform="matrix(1 0 0 -1 0 24)"
      >
        <path
          d="M6.8 21 C3.8 13.17 3.8 3.6 6.8 3.6 C9.8 3.6 9.8 13.17 6.8 21 Z"
          transform="rotate(-15 6.8 13)"
          fill="#f0188f"
        />
        <path
          d="M17.2 21 C14.2 13.17 14.2 3.6 17.2 3.6 C20.2 3.6 20.2 13.17 17.2 21 Z"
          transform="rotate(15 17.2 13)"
          fill="#f0188f"
        />
        <path
          d="M10.7 20.6 C8.2 13.04 8.2 3.8 10.7 3.8 C13.2 3.8 13.2 13.04 10.7 20.6 Z"
          transform="rotate(7 10.7 13)"
          fill="#f68b1f"
        />
        <path
          d="M13.3 20.6 C10.8 13.04 10.8 3.8 13.3 3.8 C15.8 3.8 15.8 13.04 13.3 20.6 Z"
          transform="rotate(-7 13.3 13)"
          fill="#ee5223"
        />
      </g>
    </svg>
  );
}

/* Flipkart: yellow shopping bag (official silhouette) on the brand-blue
   tile. The carved "f"/"k" counters show the blue tile through the bag. */
function FlipkartBag() {
  return (
    <svg className="plogo-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4.6" fill="#2874f0" />
      <g transform="translate(5.4 4.5) scale(0.56)">
        <path
          d="M3.833 1.333a.993.993 0 0 0-.333.061V1c0-.551.449-1 1-1h14.667c.551 0 1 .449 1 1v.333H3.833zm17.334 2.334H2.833c-.551 0-1 .449-1 1V23c0 .551.449 1 1 1h7.3l1.098-5.645h-2.24c-.051 0-5.158-.241-5.158-.241l4.639-.327-.078-.366-1.978-.285 1.882-.158-.124-.449-3.075-.467s3.341-.373 3.392-.373h3.232l.247-1.331c.289-1.616.945-2.807 1.973-3.693 1.033-.892 2.344-1.332 3.937-1.332.643 0 1.053.151 1.231.463.118.186.201.516.279.859.074.352.14.671.095.903-.057.345-.461.465-1.197.465h-.253c-1.327 0-2.134.763-2.405 2.31l-.243 1.355h1.54c.574 0 .781.402.622 1.306-.17.941-.539 1.36-1.111 1.36H14.9L13.804 24h7.362c.551 0 1-.449 1-1V4.667a1 1 0 0 0-.999-1zM20.5 2.333A.334.334 0 0 0 20.167 2H3.833a.334.334 0 0 0-.333.333V3h17v-.667z"
          fill="#ffe11b"
        />
      </g>
    </svg>
  );
}

/* Meesho: orange double-arch lowercase "m" (three legs, two rounded humps)
   on the brand aubergine tile. Colors sampled from the official mark. */
function MeeshoM() {
  return (
    <svg className="plogo-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4.6" fill="#580a46" />
      <path
        d="M5.6 18.2v-6.1a3 3 0 0 1 6 0v6.1M11.6 12.1a3 3 0 0 1 6 0v6.1"
        fill="none"
        stroke="#ff9d00"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Alibaba.com: the official smile / ribbon glyph in brand orange. */
function AlibabaMark() {
  return (
    <svg className="plogo-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.391 16.22c-.963.044-.865-.459-.302-1.234 1.32-1.768 3.82-4.236 3.906-5.982.151-2.283-2.143-3.026-4.501-3.004-1.645.022-3.344.492-4.501.906C5 8.315 2.489 10.576.909 13.076-.768 15.554-.216 17.923 3.322 18c2.716-.109 4.48-.862 6.32-1.802.01 0-5.086 1.453-6.958.383l-.008-.002c-.193-.11-.404-.264-.457-.683-.012-.885 1.46-1.802 2.283-2.097v-1.533a5.374 5.374 0 0 0 1.955.366 5.378 5.378 0 0 0 3.472-1.265c.037.13.056.278.044.447h.371c.048-.394-.172-.706-.172-.706-.333-.529-.915-.52-.915-.52s.315.137.529.466a4.953 4.953 0 0 1-4.665.932l1.21-1.2-.336-.874c2.435-.852 4.48-1.507 7.812-2.085l-.746-.624.389-.24c2.01.568 3.325.985 3.253 2.051a2.672 2.672 0 0 1-.202.611c-.584 1.158-2.326 3.09-3.029 3.898-.465.535-.92 1.06-1.245 1.562-.335.503-.54.971-.551 1.42.043 3.504 10.334-1.64 12.324-3.003-2.943 1.266-6.113 2.489-9.609 2.718Z"
        fill="#ff6a00"
      />
    </svg>
  );
}

/* IndiaMART: red oval enclosing two white figures (the "M"), with two red
   heads above — a simplified take on the official mark. */
function IndiamartMark() {
  return (
    <svg className="plogo-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="13.5" rx="10" ry="7.4" fill="#c8102e" />
      <circle cx="8.4" cy="4.2" r="2.2" fill="#c8102e" />
      <circle cx="15.6" cy="4.2" r="2.2" fill="#c8102e" />
      <path
        d="M5 19.6 8.4 7.2c.3-1 1.6-1 2 0L12 12l1.6-4.8c.4-1 1.7-1 2 0L19 19.6h-3.1l-1.7-6.4-1.4 4.2c-.3.9-1.5.9-1.8 0l-1.4-4.2-1.7 6.4z"
        fill="#fff"
      />
    </svg>
  );
}

export type PartnerId =
  | "amazon-india"
  | "amazon-global"
  | "flipkart"
  | "meesho"
  | "myntra"
  | "walmart"
  | "etsy"
  | "ebay"
  | "shopify"
  | "alibaba"
  | "indiamart";

type PartnerDef = {
  id: PartnerId;
  name: string;
  note: string;
  render: () => React.ReactNode;
};

export const partners: PartnerDef[] = [
  {
    id: "amazon-india",
    name: "Amazon India",
    note: "Account management services",
    render: () => (
      <span className="plogo plogo-amazon">
        <span className="plogo-stack">
          <b>amazon</b>
          <AmazonSmile />
        </span>
        <i>.in</i>
      </span>
    ),
  },
  {
    id: "amazon-global",
    name: "Amazon Global",
    note: "Cross-border account management",
    render: () => (
      <span className="plogo plogo-amazon">
        <span className="plogo-stack">
          <b>amazon</b>
          <AmazonSmile />
        </span>
        <i>global</i>
      </span>
    ),
  },
  {
    id: "flipkart",
    name: "Flipkart",
    note: "Account management services",
    render: () => (
      <span className="plogo plogo-flipkart">
        <FlipkartBag />
        <b>Flipkart</b>
      </span>
    ),
  },
  {
    id: "meesho",
    name: "Meesho",
    note: "Supplier growth services",
    render: () => (
      <span className="plogo plogo-meesho">
        <MeeshoM />
        <b>meesho</b>
      </span>
    ),
  },
  {
    id: "myntra",
    name: "Myntra",
    note: "Fashion marketplace services",
    render: () => (
      <span className="plogo plogo-myntra">
        <MyntraM />
        <b>Myntra</b>
      </span>
    ),
  },
  {
    id: "walmart",
    name: "Walmart",
    note: "US marketplace services",
    render: () => (
      <span className="plogo plogo-walmart">
        <b>Walmart</b>
        <WalmartSpark />
      </span>
    ),
  },
  {
    id: "etsy",
    name: "Etsy",
    note: "Creative commerce services",
    render: () => (
      <span className="plogo plogo-etsy">
        <b>Etsy</b>
      </span>
    ),
  },
  {
    id: "ebay",
    name: "eBay",
    note: "Global selling services",
    render: () => (
      <span className="plogo plogo-ebay">
        <b>
          <span style={{ color: "#e53238" }}>e</span>
          <span style={{ color: "#0064d2" }}>b</span>
          <span style={{ color: "#f5af02" }}>a</span>
          <span style={{ color: "#86b817" }}>y</span>
        </b>
      </span>
    ),
  },
  {
    id: "shopify",
    name: "Shopify",
    note: "Storefront build + operations",
    render: () => (
      <span className="plogo plogo-shopify">
        <ShopifyBag />
        <b>shopify</b>
      </span>
    ),
  },
  {
    id: "alibaba",
    name: "Alibaba",
    note: "B2B sourcing + wholesale",
    render: () => (
      <span className="plogo plogo-alibaba">
        <AlibabaMark />
        <b>Alibaba.com</b>
      </span>
    ),
  },
  {
    id: "indiamart",
    name: "IndiaMART",
    note: "B2B marketplace services",
    render: () => (
      <span className="plogo plogo-indiamart">
        <IndiamartMark />
        <b>indiamart</b>
      </span>
    ),
  },
];

export function getPartners(ids: PartnerId[]) {
  return ids
    .map((id) => partners.find((entry) => entry.id === id))
    .filter((entry): entry is PartnerDef => Boolean(entry));
}
