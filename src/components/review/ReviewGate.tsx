import { reviewAuthed } from "@/lib/review-auth";
import ReviewLoader from "./ReviewLoader";

/**
 * The door. A server component, so the passphrase check never reaches the
 * browser. It renders nothing at all for an ordinary patient, and the loader it
 * hands off to only resolves the Review Mode import once `enabled` is true, so
 * the bundle stays off the wire rather than merely out of the render.
 */
export default async function ReviewGate() {
  const enabled = await reviewAuthed();
  if (!enabled) return null;
  return <ReviewLoader enabled reviewerName="Dr. Han" />;
}
