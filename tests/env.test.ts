import { describe, expect, it } from "vitest";
import { normalizeEnvironment } from "@/server/config/env";

describe("server environment normalization", () => {
  it("treats empty deployment values as unset so defaults can apply", () => {
    expect(
      normalizeEnvironment({
        NEXT_PUBLIC_SITE_URL: "",
        DATABASE_URL: "   ",
        RATE_LIMIT_LEADS: "5",
      }),
    ).toEqual({
      NEXT_PUBLIC_SITE_URL: undefined,
      DATABASE_URL: undefined,
      RATE_LIMIT_LEADS: "5",
    });
  });
});
