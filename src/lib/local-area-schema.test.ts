import { describe, it, expect } from "vitest";
import { localAreaSchema } from "./schema";

describe("localAreaSchema", () => {
  it("builds a town-scoped Service referencing the practice", () => {
    const s = localAreaSchema({
      town: "Ridgewood",
      slug: "optometrist-ridgewood-nj",
      serviceName: "Medical Eye Care",
      serviceSlug: "medical-eye-care",
    });
    expect(s["@type"]).toBe("Service");
    expect(s.name).toContain("Ridgewood");
    expect(s.serviceType).toBe("Medical Eye Care");
    expect(s.url).toContain("/areas/optometrist-ridgewood-nj");
    expect(s.areaServed).toEqual({ "@type": "City", name: "Ridgewood" });
    expect(s.provider).toHaveProperty("@id");
  });
});
