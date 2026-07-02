import { expect, test } from "vitest";
import { parseLead } from "./validate-lead";

const valid = { name: "Ada", email: "ada@example.com", phone: "201-555-0100" };

test("accepts a valid payload", () => {
  const r = parseLead(valid);
  expect(r.ok).toBe(true);
});

test("rejects a malformed email", () => {
  const r = parseLead({ ...valid, email: "not-an-email" });
  expect(r.ok).toBe(false);
});

test("rejects missing required fields", () => {
  const r = parseLead({ name: "Ada" });
  expect(r.ok).toBe(false);
});

test("rejects an over-long field", () => {
  const r = parseLead({ ...valid, name: "x".repeat(5000) });
  expect(r.ok).toBe(false);
});
