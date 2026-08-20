"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { ZOCDOC_PLUGIN_SRC, zocdoc, zocdocWidgetEnabled } from "@/lib/zocdoc";

/**
 * Books an appointment without leaving the site, when Zocdoc's plugin is configured.
 *
 * Degrades to the outbound link we already ship, which is the same control the rest of
 * the site uses, so a missing practice ID or a blocked script costs the visitor nothing.
 * The label never changes between the two states, because a patient should not be told
 * they are getting something different depending on our configuration.
 */
export function ZocdocBooking({ className }: { className?: string }) {
  const enabled = zocdocWidgetEnabled();

  useEffect(() => {
    if (!enabled) return;
    if (document.querySelector(`script[src="${ZOCDOC_PLUGIN_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = ZOCDOC_PLUGIN_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, [enabled]);

  return (
    <a
      href={zocdoc.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...(enabled
        ? { "data-type": "book-button", "data-practice-id": zocdoc.practiceId }
        : {})}
      className={
        "flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal px-5 text-base font-medium text-bone transition-colors hover:bg-teal-deep " +
        (className ?? "")
      }
    >
      Book on Zocdoc
      {/* The arrow stays whatever the plugin does. Tested with the plugin loaded: the
          anchor still opened a new tab rather than a modal, because the modal only
          activates once the site is registered in the practice's own Zocdoc account.
          Dropping the arrow on script-load alone would promise "opens in place" and then
          open a tab. Understating what a control does is safe; overstating it is not. */}
      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
    </a>
  );
}
