import { describe, it, expect } from "vitest";
import { legacyRedirects } from "./redirects";

describe("legacyRedirects", () => {
  /* The old site serves each page at both `/x.html` and `/x/`, and Google indexed the
     directory form, so a count alone proved nothing about whether the form that carries
     the ranking history is covered. These assert the shape instead. */
  it("covers every legacy URL in BOTH the .html and the extensionless form", () => {
    const sources = new Set(legacyRedirects.map((r) => r.source));
    const html = [...sources].filter((s) => s.endsWith(".html"));
    expect(html.length).toBeGreaterThanOrEqual(59);
    for (const s of html) {
      const bare = s.replace(/\.html$/, "");
      const dest = legacyRedirects.find((r) => r.source === s)!.destination;
      // Skipped only when the bare form IS the destination, which would self-redirect.
      if (bare !== dest) {
        expect(sources.has(bare), `${bare} is missing, so the indexed form would 404`).toBe(true);
      }
    }
  });

  it("never redirects a path to itself", () => {
    for (const r of legacyRedirects) {
      expect(r.source, "a self-redirect makes the real page unreachable").not.toBe(r.destination);
    }
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
