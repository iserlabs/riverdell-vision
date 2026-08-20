"use client";

import { lazy, Suspense } from "react";

// The client boundary that actually keeps Review Mode off a patient's device.
//
// The previous version called next/dynamic from the server gate. That defers
// rendering but NOT the download: Next records the referenced client component
// in the build-time client manifest and emits its script for the whole segment
// regardless of what the runtime gate returns. Measured on production, every
// patient was fetching 63,691 bytes of JavaScript and an 11,719-byte
// render-blocking stylesheet for a tool they can never open.
//
// React.lazy inside a client component is evaluated at runtime, so the import
// only resolves once `enabled` is true. The server gate still decides; this just
// makes the decision reach the network.

const ReviewMode = lazy(() => import("./ReviewMode"));

export default function ReviewLoader({
  enabled,
  reviewerName,
}: {
  enabled: boolean;
  reviewerName: string;
}) {
  if (!enabled) return null;
  return (
    <Suspense fallback={null}>
      <ReviewMode reviewerName={reviewerName} />
    </Suspense>
  );
}
