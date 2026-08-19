import { describe, expect, it } from "vitest";

describe("security primitives", () => {
  it("uses stable canonical JSON for semantically identical payloads", async () => {
    const { canonicalJson, getBodyHash } = await import(
      "@/server/security/idempotency"
    );

    const left = { marketplace: "Amazon India", nested: { b: 2, a: 1 } };
    const right = { nested: { a: 1, b: 2 }, marketplace: "Amazon India" };

    expect(canonicalJson(left)).toBe(canonicalJson(right));
    expect(getBodyHash(left)).toBe(getBodyHash(right));
  });

  it("compares secrets by value", async () => {
    const { safeEqual } = await import("@/server/security/crypto");

    expect(safeEqual("same-secret", "same-secret")).toBe(true);
    expect(safeEqual("same-secret", "same-secrex")).toBe(false);
    expect(safeEqual("short", "much-longer")).toBe(false);
  });
});
