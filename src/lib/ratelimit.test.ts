import { afterEach, beforeEach, expect, test } from "vitest";
import { checkRateLimit } from "./ratelimit";

const saved = { url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN };

beforeEach(() => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
});
afterEach(() => {
  process.env.UPSTASH_REDIS_REST_URL = saved.url;
  process.env.UPSTASH_REDIS_REST_TOKEN = saved.token;
});

test("skips gracefully when Upstash env is unset", async () => {
  const r = await checkRateLimit("1.2.3.4");
  expect(r).toEqual({ ok: true, configured: false });
});

test("never throws on an empty id", async () => {
  await expect(checkRateLimit("")).resolves.toBeTruthy();
});
