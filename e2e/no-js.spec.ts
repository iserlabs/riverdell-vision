import { test, expect } from "@playwright/test";

// Content-stranding guard: the homepage service ladder (EditorialIndex) and
// its neighboring reveal-gated sections are a primary conversion path. If
// JavaScript never runs (blocked, fails, or the IntersectionObserver never
// fires), that content must still render at full opacity rather than being
// stranded invisible behind a `useInView`-gated inline style meant only for
// the post-hydration scroll-reveal animation.
test.use({ javaScriptEnabled: false });

test("homepage service ladder is visible without JS", async ({ page }) => {
  await page.goto("/");

  // EditorialIndex renders SERVICE_LADDER as <li> rows inside the #care
  // section. Each row is individually opacity-gated by useInView, so check
  // every row rather than just the first.
  const rows = page.locator("#care li");
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    await expect(row).toBeVisible();
    const opacity = await row.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0);
  }
});

test("homepage editorial list / process timeline content is visible without JS", async ({
  page,
}) => {
  await page.goto("/");

  // ProcessTimeline: step titles/bodies are opacity-gated spans/nodes.
  const timelineNodes = page.locator("ol li h3");
  const timelineCount = await timelineNodes.count();
  if (timelineCount > 0) {
    for (let i = 0; i < timelineCount; i++) {
      const node = timelineNodes.nth(i);
      await expect(node).toBeVisible();
      const opacity = await node.evaluate((el) => getComputedStyle(el).opacity);
      expect(Number(opacity)).toBeGreaterThan(0);
    }
  }
});
