import { describe, it, expect } from "vitest";
import { medicalWebPageSchema, lastReviewedISO } from "./schema";

describe("lastReviewedISO", () => {
  it("converts 'Month YYYY' to ISO year-month", () => {
    expect(lastReviewedISO("June 2026")).toBe("2026-06");
    expect(lastReviewedISO("December 2025")).toBe("2025-12");
  });
  it("returns undefined for unrecognized input (never fabricates a date)", () => {
    expect(lastReviewedISO("recently")).toBeUndefined();
    expect(lastReviewedISO("2026")).toBeUndefined();
  });
});

describe("medicalWebPageSchema", () => {
  const s = medicalWebPageSchema({
    slug: "myopia-management",
    name: "Myopia Management for Children in Oradell & Bergen County, NJ",
    description: "Slow your child's worsening nearsightedness.",
    reviewedBy: "Dr. Mina Han, OD",
    dateReviewed: "June 2026",
    aboutType: "MedicalProcedure",
    aboutName: "Myopia Management",
  });

  it("is a MedicalWebPage about the procedure", () => {
    expect(s["@type"]).toBe("MedicalWebPage");
    expect(s.about).toEqual({ "@type": "MedicalProcedure", name: "Myopia Management" });
  });

  it("ties the byline to a credentialed physician entity", () => {
    expect(s.reviewedBy).toBeDefined();
    expect(s.reviewedBy["@type"]).toBe("Physician");
    expect(s.reviewedBy["@id"]).toContain("/about#dr-mina-han");
    expect(s.reviewedBy.hasCredential.name).toBe("OD");
  });

  it("carries a structured last-reviewed date", () => {
    expect(s.lastReviewed).toBe("2026-06");
  });
});
