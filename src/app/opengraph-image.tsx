import { ImageResponse } from "next/og";

export const alt =
  "Ecom Exporter — ecommerce marketplace growth and operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#120b05",
        color: "#fff5df",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "64px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,194,71,0.44), rgba(255,137,31,0.06) 52%, transparent 70%)",
          border: "2px solid rgba(255,194,71,0.42)",
          borderRadius: "999px",
          display: "flex",
          height: "520px",
          position: "absolute",
          right: "-70px",
          top: "-150px",
          width: "520px",
        }}
      />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          fontSize: "27px",
          fontWeight: 700,
          gap: "14px",
          letterSpacing: "-0.02em",
        }}
      >
        <span
          style={{
            background: "#ffc247",
            borderRadius: "6px",
            display: "flex",
            height: "22px",
            width: "22px",
          }}
        />
        Ecom Exporter
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "880px" }}>
        <span
          style={{
            color: "#ffc247",
            display: "flex",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            marginBottom: "22px",
            textTransform: "uppercase",
          }}
        >
          Marketplace growth, operated
        </span>
        <span
          style={{
            display: "flex",
            fontSize: "68px",
            fontWeight: 750,
            letterSpacing: "-0.055em",
            lineHeight: 1.02,
          }}
        >
          Build, manage and scale ecommerce with control.
        </span>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,245,223,0.2)",
          color: "#d5bfa4",
          display: "flex",
          fontSize: "20px",
          justifyContent: "space-between",
          paddingTop: "24px",
        }}
      >
        <span style={{ display: "flex" }}>Catalog · Operations · Advertising · Growth</span>
        <span style={{ color: "#fff5df", display: "flex" }}>ecomexporter.com</span>
      </div>
    </div>,
    size,
  );
}
