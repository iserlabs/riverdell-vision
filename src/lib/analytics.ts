// Small shim so the review widget can report what happened without dragging
// PLFA's ingest pipeline across with it. Riverdell already loads Vercel
// Analytics in the layout, so events land there and nowhere else.
//
// No-ops on the server and swallows its own failures: telemetry must never be
// the reason a reviewer cannot leave a note.
import { track as vercelTrack } from "@vercel/analytics";

type Scalar = string | number | boolean | null;

export function track(event: string, props: Record<string, Scalar> = {}) {
  if (typeof window === "undefined") return;
  try {
    vercelTrack(event, props);
  } catch {
    // ignore
  }
}
