import { test, expect } from "@playwright/test";

test("custom 404 offers recovery links", async ({ page }) => {
  const res = await page.goto("/this-route-does-not-exist");
  expect(res?.status()).toBe(404);
  const main = page.locator("#main");
  await expect(main.getByRole("link", { name: /home/i })).toBeVisible();
  await expect(page.getByText(/can.?t find|not found|went looking/i).first()).toBeVisible();
});
