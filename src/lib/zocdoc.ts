import { practice } from "@/lib/site";

/**
 * Zocdoc's Book Online Button.
 *
 * What it actually is, verified against the plugin source at
 * https://offsiteschedule.zocdoc.com/plugin/embed rather than from documentation:
 * a script that upgrades an anchor carrying `data-type="book-button"` and
 * `data-practice-id` into an in-page scheduling modal served from bob.zocdoc.com.
 *
 * What it is NOT: an embeddable availability grid. There is no way to render Zocdoc's
 * calendar inside our own layout. Anything grid-shaped in the hero would therefore be
 * invented, which is exactly the defect removed from this hero on 19 August.
 *
 * WHY THIS IS GATED ON AN ENV VAR. The practice ID exists only inside Riverdell's own
 * Zocdoc account and cannot be derived from the public profile URL. Rather than guess it,
 * the widget stays off until it is set, and the button falls back to the plain outbound
 * link that has always worked. A misconfigured widget must never look like a working one.
 *
 * REAL-TIME IS CONDITIONAL. The modal shows genuinely live availability only if the
 * practice has Zocdoc Calendar Integration switched on. Until that is confirmed, no copy
 * anywhere may say "real-time".
 */

export const ZOCDOC_PLUGIN_SRC = "https://offsiteschedule.zocdoc.com/plugin/embed";

/** Origins the plugin touches, taken from its own bundle. Used by the CSP. */
export const ZOCDOC_ORIGINS = {
  script: ["https://offsiteschedule.zocdoc.com", "https://static.zocdoc.com"],
  frame: ["https://bob.zocdoc.com", "https://www.zocdoc.com"],
  connect: ["https://api.zocdoc.com", "https://api2.zocdoc.com", "https://bob.zocdoc.com"],
} as const;

export const zocdoc = {
  profileUrl: practice.zocdocUrl,
  /** From the practice's Zocdoc account. Empty until someone sets it. */
  practiceId: process.env.NEXT_PUBLIC_ZOCDOC_PRACTICE_ID ?? "",
} as const;

export function zocdocWidgetEnabled(): boolean {
  return zocdoc.practiceId.trim().length > 0;
}
