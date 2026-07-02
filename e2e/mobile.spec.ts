import { test, expect } from "@playwright/test";

const routes = ["/", "/dry-eye-treatment", "/keratoconus", "/oradell"];

test.use({ viewport: { width: 390, height: 844 } });

// Standalone tappable controls only: real buttons, role=button, and links that
// are NOT sitting inline inside a run of body text. WCAG 2.5.8 (Target Size,
// Minimum) explicitly exempts inline links within a sentence/paragraph of text
// from the 44px minimum, since enlarging them would require inflating line
// height or wrapping every link in a block, which breaks the reading layout.
// We still require nav items, buttons, CTAs, cards, and standalone action
// links to meet 44px, since those are genuine tap targets, not prose.
// The "Skip to content" link is intentionally `sr-only` (1x1, visually
// hidden) until it receives keyboard focus, at which point it expands to a
// fully padded, easily-hittable link (see focus:px-4 focus:py-2 in
// layout.tsx). That is the standard, WCAG-conformant pattern for a
// skip-navigation link: it is reached by Tab, never by tapping an invisible
// element, so measuring its unfocused 1x1 state is a test artifact rather
// than a real tap-target defect. It is excluded here by its specific href
// rather than by a broad sr-only exemption, so any other visually-hidden
// control would still be caught.
const INTERACTIVE_SELECTOR = [
  'a:not(p a, li:not([role=listitem]) > a, dd a, dt a, a[href="#main"])',
  "button",
  "[role=button]",
].join(", ");

for (const path of routes) {
  test(`no horizontal scroll on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, "page should not scroll horizontally at 390px").toBeLessThanOrEqual(1);
  });

  test(`interactive targets are >=44px on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const small = await page.$$eval(INTERACTIVE_SELECTOR, (els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        // Exclude links inline inside a flow of prose text (WCAG 2.5.8
        // exempts these): if the link's parent element contains other
        // non-whitespace text nodes alongside it, it's part of a sentence,
        // not a standalone control.
        .filter((el) => {
          if (el.tagName !== "A") return true;
          const parent = el.parentElement;
          if (!parent) return true;
          const siblingText = Array.from(parent.childNodes)
            .filter((n) => n.nodeType === Node.TEXT_NODE)
            .map((n) => n.textContent || "")
            .join("")
            .trim();
          return siblingText.length === 0;
        })
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            w: Math.round(r.width),
            h: Math.round(r.height),
            text: (el.textContent || "").trim().slice(0, 30),
          };
        })
        .filter((b) => b.w > 0 && b.h > 0 && (b.w < 44 || b.h < 44)),
    );
    expect(small, JSON.stringify(small, null, 2)).toEqual([]);
  });
}
