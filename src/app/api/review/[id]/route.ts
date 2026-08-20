import { NextResponse } from "next/server";
import { deleteAnnotation } from "@/lib/review-store";
import { reviewAuthed } from "@/lib/review-auth";

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await reviewAuthed())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const { id } = await ctx.params;
  const gone = await deleteAnnotation(id);
  if (!gone) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
