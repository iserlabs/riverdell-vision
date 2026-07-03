import { expect, test } from "vitest";
import { faqSchema, breadcrumbSchema, localBusinessSchema, physicianSchema } from "./schema";
import { providers } from "./site";

test("faqSchema builds a FAQPage with questions", () => {
  const s = faqSchema([{ q: "Q1", a: "A1" }]);
  expect(s["@type"]).toBe("FAQPage");
  expect(s.mainEntity[0]["@type"]).toBe("Question");
  expect(s.mainEntity[0].acceptedAnswer.text).toBe("A1");
});

test("breadcrumbSchema numbers positions from 1 and builds absolute URLs", () => {
  const s = breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Dry Eye", path: "/dry-eye" }]);
  expect(s.itemListElement[0].position).toBe(1);
  expect(s.itemListElement[1].item).toMatch(/^https?:\/\/.+\/dry-eye$/);
});

test("localBusiness carries real aggregate rating", () => {
  const s = localBusinessSchema();
  expect(Number(s.aggregateRating.ratingValue)).toBeGreaterThan(0);
  expect(Number(s.aggregateRating.reviewCount)).toBeGreaterThan(0);
});

test("physicianSchema returns a valid Physician for every provider slug", () => {
  const schemas = providers.map((p) => physicianSchema(p.slug)).filter(Boolean);
  expect(schemas).toHaveLength(providers.length);
  for (const s of schemas) {
    expect(s!["@type"]).toBe("Physician");
    expect(s!.name).toContain(",");
    expect(s!.image).toMatch(/^https?:\/\//);
  }
});

test("physicianSchema returns null for an unknown slug", () => {
  expect(physicianSchema("not-a-real-doctor")).toBeNull();
});
