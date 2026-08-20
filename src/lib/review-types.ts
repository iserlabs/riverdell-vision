/**
 * Review Mode's shared vocabulary. Directive section 14.
 *
 * SPLIT FROM lib/review.ts ON PURPOSE. That file imports next/headers and
 * @vercel/blob, so anything a client component touches has to live here instead, or
 * Next drags the server modules into the browser bundle and the build fails. Types,
 * label maps and pure functions only. Nothing in this file may import a server API.
 */

// The cookie name lives in lib/review-auth.ts, which is where the door is.
// Kept out of here so a client component importing these types cannot reach it.

export type ReviewTool = "point" | "rectangle" | "ellipse" | "freehand" | "section" | "page";

export type IssueType = "change" | "broken" | "question" | "approval" | "remove" | "mobile" | "future";

export type ReviewStatus =
  | "submitted"
  | "needs_clarification"
  | "accepted"
  | "in_progress"
  | "ready_for_review"
  | "approved"
  | "completed"
  | "declined"
  | "duplicate"
  | "deferred"
  | "cannot_reproduce"
  | "reopened";

/** Plain language, section 14.3. Nobody is asked to pick "frontend" or "CSS". */
export const ISSUE_TYPES: Array<{ value: IssueType; label: string }> = [
  { value: "change", label: "Change this" },
  { value: "broken", label: "This is broken" },
  { value: "question", label: "Question" },
  { value: "approval", label: "Keep this" },
  { value: "remove", label: "Remove this" },
  { value: "mobile", label: "Mobile issue" },
  { value: "future", label: "Future idea" },
];

export const STATUS_LABELS: Record<ReviewStatus, string> = {
  submitted: "Submitted",
  needs_clarification: "Needs clarification",
  accepted: "Accepted",
  in_progress: "In progress",
  ready_for_review: "Ready for review",
  approved: "Approved",
  completed: "Completed",
  declined: "Declined",
  duplicate: "Duplicate",
  deferred: "Deferred",
  cannot_reproduce: "Cannot reproduce",
  reopened: "Reopened",
};

export type ReviewComment = {
  at: string;
  who: string;
  text: string;
};

export type ReviewAnnotation = {
  id: string;
  pageUrl: string;
  route: string;
  pageTitle?: string;
  deploymentId: string;
  environment: "preview" | "staging" | "production" | "development";
  reviewerName: string;
  createdAt: string;
  updatedAt: string;

  tool: ReviewTool;
  /**
   * Normalised 0..1 against the DOCUMENT, not the screen, per section 14.6. Raw pixels
   * drift the moment a spacing token changes; a fraction of the document survives it.
   */
  geometry: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    points?: Array<{ x: number; y: number }>;
    coordinateSpace: "document_normalized";
  };

  viewport: { width: number; height: number; devicePixelRatio?: number; scrollX: number; scrollY: number };

  selectedElement?: {
    tagName?: string;
    dataReviewId?: string;
    textExcerpt?: string;
    accessibleName?: string;
  };

  issueType: IssueType;
  priority: "normal" | "high" | "urgent";
  deviceContext: "current" | "desktop" | "tablet" | "mobile" | "all";
  comment: string;
  suggestedCopy?: string;

  assets?: { annotationImageUrl?: string; viewportImageUrl?: string };
  clientContext?: { browser?: string; os?: string; consoleErrors?: string[] };

  status: ReviewStatus;
  thread: ReviewComment[];
};

/**
 * Free text is sanitised at the boundary, not at render, so nothing unclean ever
 * reaches the store. Section 14.12 asks for validation and sanitisation of all text.
 */
export function cleanText(input: unknown, max = 4000): string {
  if (typeof input !== "string") return "";

  /*
   * Control characters are dropped by code point rather than by a regex literal. An
   * earlier version embedded the raw bytes in the pattern, which is invisible in a
   * diff and one typo away from a negated class that strips every printable character
   * instead. Tab and newline are kept, because a reviewer pasting two lines meant to.
   */
  const stripped = Array.from(input)
    .filter((ch) => {
      const c = ch.codePointAt(0) ?? 0;
      if (c === 9 || c === 10) return true;
      return c >= 32 && c !== 127;
    })
    .join("");

  // Anything tag-shaped, so a pasted snippet can never execute in the inbox.
  return stripped
    .replace(/<\/?[a-zA-Z][\s\S]*?>/g, "")
    .trim()
    .slice(0, max);
}
