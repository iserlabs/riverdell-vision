import { describe, it, expect } from "vitest";
import { legacyRedirects } from "./redirects";

describe("legacyRedirects", () => {
  it("covers all 59 legacy URLs (29 pages + 30 blog posts)", () => {
    expect(legacyRedirects).toHaveLength(59);
  });

  it("has no duplicate source paths", () => {
    const sources = legacyRedirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("every destination is an absolute path and every redirect is a permanent 301", () => {
    for (const r of legacyRedirects) {
      expect(r.source.startsWith("/")).toBe(true);
      expect(r.destination.startsWith("/")).toBe(true);
      expect(r.permanent).toBe(true);
    }
  });

  it("maps representative page and blog URLs to the correct new routes", () => {
    const map = Object.fromEntries(legacyRedirects.map((r) => [r.source, r.destination]));
    expect(map["/services/myopia-control.html"]).toBe("/myopia-management");
    expect(map["/request-an-appointment.html"]).toBe("/book");
    expect(map["/our-team.html"]).toBe("/about");
    expect(map["/financing.html"]).toBe("/cost-and-insurance");
    expect(map["/blog/tips-for-managing-winter-dry-eye.html"]).toBe("/dry-eye-treatment");
    expect(map["/blog/atropine-eye-drops-how-they-help-slow-myopia-progression-in-kids.html"]).toBe("/myopia-management");
  });
});
