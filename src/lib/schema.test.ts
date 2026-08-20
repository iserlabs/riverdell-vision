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

test("localBusiness publishes no self-serving rating or review nodes", () => {
  /* Inverted deliberately. A rating a business places on its own site, or aggregates
     from another platform, is ineligible for review rich results and risks a manual
     action. The real scores stay in visible copy, linked to the unfiltered originals. */
  const s = localBusinessSchema() as Record<string, unknown>;
  expect(s.aggregateRating).toBeUndefined();
  expect(s.review).toBeUndefined();
});

test("localBusiness states Saturday hours rather than declaring the practice closed", () => {
  const s = localBusinessSchema() as unknown as {
    openingHoursSpecification: { dayOfWeek: string }[];
  };
  const days = s.openingHoursSpecification.map((h) => h.dayOfWeek);
  expect(days.some((d) => d.endsWith("Saturday"))).toBe(true);
});

test("telephone is E.164 for entity matching", () => {
  const s = localBusinessSchema() as unknown as { telephone: string };
  expect(s.telephone).toMatch(/^\+1\d{10}$/);
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
