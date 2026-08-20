// Review Mode's server side: list and create the notes Dr. Han leaves on the page.
//
// Ported from the PLFA review widget. Two things changed on the way over.
//
// 1) Storage is Upstash rather than Vercel Blob, because Upstash is already a
//    dependency here and Blob would have meant a new store, a new token and a
//    manual step before anything worked at all.
// 2) The screenshot is not persisted. PLFA puts it in Blob behind an
//    authenticated proxy; there is nowhere equivalent here yet, so rather than
//    invent one the note carries everything else and says so. A lost screenshot
//    must never lose the note, which was true in the original too.
import { NextResponse } from "next/server";
import { cleanText, type ReviewAnnotation } from "@/lib/review-types";
import { readAnnotations, writeAnnotation, reviewStoreConfigured } from "@/lib/review-store";
import { reviewAuthed } from "@/lib/review-auth";

export async function GET() {
  if (!(await reviewAuthed())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const annotations = await readAnnotations();
  return NextResponse.json({ annotations, configured: reviewStoreConfigured() });
}

export async function POST(req: Request) {
  if (!(await reviewAuthed())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const comment = cleanText(body.comment);
  if (!comment) {
    return NextResponse.json({ error: "Say what you would change and it will send." }, { status: 400 });
  }

  // Fails loudly rather than accepting a note into nowhere. The widget shows
  // this text and keeps the note in the box so nothing typed is lost.
  if (!reviewStoreConfigured()) {
    return NextResponse.json(
      {
        error:
          "Notes cannot be saved yet: the store is not connected on this deployment. Your note is still here. Copy it and send it to Jake, or ask him to set the Upstash keys.",
        delivery: "unconfigured",
      },
      { status: 503 },
    );
  }

  const now = new Date().toISOString();
  const id = `RV-${now.slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 7)}`;
  const geometry = (body.geometry ?? {}) as ReviewAnnotation["geometry"];

  const record: ReviewAnnotation = {
    id,
    pageUrl: cleanText(body.pageUrl, 500),
    route: cleanText(body.route, 200),
    pageTitle: cleanText(body.pageTitle, 200) || undefined,
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? "local",
    environment: (process.env.VERCEL_ENV as ReviewAnnotation["environment"]) ?? "development",
    reviewerName: cleanText(body.reviewerName, 80) || "Reviewer",
    createdAt: now,
    updatedAt: now,
    tool: (body.tool as ReviewAnnotation["tool"]) ?? "page",
    geometry: { ...geometry, coordinateSpace: "document_normalized" },
    viewport: body.viewport as ReviewAnnotation["viewport"],
    selectedElement: body.selectedElement as ReviewAnnotation["selectedElement"],
    issueType: (body.issueType as ReviewAnnotation["issueType"]) ?? "change",
    priority: "normal",
    deviceContext: "current",
    comment,
    status: "submitted",
    thread: [],
    clientContext: body.clientContext as ReviewAnnotation["clientContext"],
  };

  const stored = await writeAnnotation(record);
  if (!stored) {
    return NextResponse.json(
      { error: "That did not save. Your note is still here, try again.", delivery: "error" },
      { status: 503 },
    );
  }

  return NextResponse.json({ id, reference: id });
}
