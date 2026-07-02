import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    // The site's scroll-reveal animations respect `prefers-reduced-motion`
    // (src/app/globals.css) by collapsing transitions to ~0. Emulating it here
    // makes the a11y scan deterministic: it reads the settled, final-state DOM
    // instead of racing an in-flight opacity/transform transition, which was
    // producing flaky mid-transition color-contrast readings.
    contextOptions: { reducedMotion: "reduce" },
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : { command: "npm run build && npm run start", url: "http://localhost:3000", timeout: 180_000, reuseExistingServer: true },
});
