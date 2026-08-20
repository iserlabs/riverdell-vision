"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { track } from "@/lib/analytics";
import { STATUS_LABELS, type ReviewStatus } from "@/lib/review-types";
import {
  IconBox,
  IconCircle,
  IconClose,
  IconDraw,
  IconEye,
  IconPage,
  IconPoint,
  IconSection,
  IconUndo,
} from "./ReviewIcons";
import "./review.css";

/**
 * Review Mode, directive section 14.
 *
 * The whole point is that Robin and Arabela stop making screenshots. So the bar is not
 * "a drawing tool exists", it is: point at the thing, say what you mean in your own
 * words, press send, and know it arrived attached to the right page and build.
 *
 * SHIPPED HERE: point, rectangle, ellipse, freehand, whole-section select, page note,
 * undo, plain-language issue types, device, a canvas screenshot of the selection, the
 * notes already left on this page drawn back onto it, and a keyboard route through all
 * of it.
 *
 * NOT SHIPPED: lasso, DOM change proposals, live cursors, session replay. Section 14.2
 * defers them and they would each be a build of their own.
 *
 * THE REGISTER. Jake, 2 August: "This looks amateurish. make this a truly high end
 * design UI UX." The chrome is now an INSTRUMENT rather than more of the website: ink
 * glass, one brass accent that lives only on the tool you are in, drawn glyphs on one
 * grid, and Instrument Sans at tool scale. It deliberately does not share a palette
 * with the page, because chrome that borrows the design's own colours is chrome you
 * cannot judge the design through. Anchor: Linear's command surface.
 *
 * THE BUNDLE. This component is only ever mounted after an auth check on the server
 * (see ReviewGate), so an ordinary visitor never downloads it. Section 17 asks for
 * exactly that.
 */

type Tool = "point" | "rectangle" | "ellipse" | "freehand" | "section" | "page";

type Draft = {
  tool: Tool;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: Array<{ x: number; y: number }>;
  reviewId?: string;
  excerpt?: string;
};

type Box = { left: number; top: number; width: number; height: number };

type PastMark = {
  id: string;
  route: string;
  reviewerName: string;
  createdAt: string;
  status: ReviewStatus;
  comment: string;
  tool: Tool;
  geometry: Draft;
};

const TOOLS: Array<{ id: Tool; label: string; hint: string; icon: () => React.ReactElement }> = [
  { id: "point", label: "Point", hint: "Tap the exact spot", icon: IconPoint },
  { id: "rectangle", label: "Box", hint: "Drag a box around it", icon: IconBox },
  { id: "ellipse", label: "Circle", hint: "Drag a circle around it", icon: IconCircle },
  { id: "freehand", label: "Draw", hint: "Draw freely", icon: IconDraw },
  { id: "section", label: "Section", hint: "Pick a whole section", icon: IconSection },
  { id: "page", label: "Page", hint: "About the page as a whole", icon: IconPage },
];

const ISSUE_TYPES = [
  { value: "change", label: "Change this" },
  { value: "broken", label: "Broken" },
  { value: "question", label: "Question" },
  { value: "approval", label: "Keep this" },
  { value: "remove", label: "Remove" },
  { value: "mobile", label: "Mobile" },
  { value: "future", label: "Future idea" },
] as const;

/** The note box is 320px wide, and everything that positions it needs to agree. */
const POP_W = 320;

export default function ReviewMode({ reviewerName }: { reviewerName: string }) {
  const [on, setOn] = useState(false);
  const [tool, setTool] = useState<Tool>("point");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [sections, setSections] = useState<Array<{ id: string; label: string }>>([]);
  const [sent, setSent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [comment, setComment] = useState("");
  const [issueType, setIssueType] = useState<(typeof ISSUE_TYPES)[number]["value"]>("change");

  const [pins, setPins] = useState(false);
  const [past, setPast] = useState<PastMark[]>([]);
  const [pastState, setPastState] = useState<"idle" | "loading" | "error">("idle");
  const [openPin, setOpenPin] = useState<string | null>(null);
  /* Two taps to delete, never one. The pin card is a thing a reviewer opens to READ, so
     a single destructive tap on it would eventually remove somebody's note by accident,
     which is exactly the problem this feature exists to fix. */
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const startRef = useRef<{ x: number; y: number } | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const sectionEls = useRef<Map<string, HTMLElement>>(new Map());
  const [docSize, setDocSize] = useState<{ w: number; h: number } | null>(null);

  /**
   * Nothing here renders until after mount, which kills a hydration mismatch that has
   * been throwing React #418 on every page a signed-in reviewer opened. It predates
   * this work and only ever fired for reviewers, never for ordinary visitors, which is
   * the tell: the page HTML is cacheable and gets populated by whoever asks first, so a
   * reviewer could be handed markup that was rendered without this chrome in it.
   */
  /* Riverdell's lint forbids setState in an effect, and for a hydration flag it is
     right to: useSyncExternalStore gives the same answer with no effect and no
     extra render. false on the server, true once hydrated. */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  /**
   * Not on the desk. Review Mode was mounting on /review too, where it has nothing to
   * annotate and its launch button sat on top of the Send control of the reply form.
   * You do not review the review desk.
   */
  const onDesk = mounted && window.location.pathname.startsWith("/review");

  /**
   * The surface has to cover the DOCUMENT, not the first screenful.
   *
   * It is position:absolute with no positioned ancestor, so inset:0 sized it to the
   * INITIAL containing block, which is the viewport. Every tool worked above the fold
   * and nothing worked below it. There is no CSS length meaning "as tall as the
   * document", so it is measured here and re-measured on resize.
   */
  useEffect(() => {
    if (!on) return;
    const measure = () => {
      const d = document.documentElement;
      const w = d.scrollWidth;
      const h = d.scrollHeight;
      setDocSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [on]);

  /* The corner note box sits above the bar, and the bar changes height between its
     floating and docked states, so the offset is measured rather than guessed. */
  useEffect(() => {
    const bar = barRef.current;
    if (!on || !bar) return;
    const publish = () =>
      document.documentElement.style.setProperty("--rv-bar-h", `${bar.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(bar);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--rv-bar-h");
    };
  }, [on, tool, draft]);

  /**
   * The section menu is the keyboard alternative to drawing, section 14.13.
   *
   * Tagged blocks win where they exist, since their ids are stable and mean something.
   * Where a route carries none, the page's own landmarks stand in, so the tool works on
   * pages nobody has annotated yet.
   */
  useEffect(() => {
    if (!on) return;
    const map = new Map<string, HTMLElement>();
    const tagged = Array.from(document.querySelectorAll<HTMLElement>("[data-review-id]"));
    const els = tagged.length
      ? tagged
      : Array.from(document.querySelectorAll<HTMLElement>("main section, main article"));
    const found = els.map((el, i) => {
      const id = el.dataset.reviewId || el.id || `section-${i + 1}`;
      map.set(id, el);
      return { id, label: readableName(el, i) };
    });
    sectionEls.current = map;
    /* This one stays. The list can only be built by measuring the real DOM after
       the layer opens, so an effect is the correct place and there is no primitive
       that reads layout without one. It runs once per open, not per render. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSections(found);
  }, [on]);

  useEffect(() => {
    if (!on) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openPin) setOpenPin(null);
      else if (draft) clearDraft();
      else setOn(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [on, draft, openPin]);

  /**
   * The notes already left on this page, drawn back onto it. Jake picked this as the one
   * addition worth building: a reviewer who cannot see what has already been said either
   * repeats it or stays quiet, and both cost a round.
   *
   * Fetched only when the layer is switched on, so opening Review Mode never pays for it.
   */
  /* The guard is a ref, not state. It was `pastState`, which is also in this effect's
     dependency list, so setting it to "loading" re-ran the effect, the first run's
     cleanup marked its own in-flight fetch stale, and the second run bailed out on the
     flag the first one had just set. The layer switched on and stayed empty forever.
     A ref carries the same fact without being a dependency. */
  const pastLoaded = useRef(false);
  useEffect(() => {
    if (!on || !pins || pastLoaded.current) return;
    pastLoaded.current = true;
    let live = true;
    setPastState("loading");
    (async () => {
      const res = await fetch("/api/review").catch(() => null);
      if (!live) return;
      if (!res?.ok) {
        setPastState("error");
        pastLoaded.current = false;
        return;
      }
      const body = (await res.json().catch(() => null)) as { annotations?: PastMark[] } | null;
      if (!live) return;
      const here = (body?.annotations ?? [])
        .filter((a) => a.route === window.location.pathname)
        .filter((a) => a.geometry && (a.geometry.x != null || (a.geometry.points?.length ?? 0) > 0))
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      setPast(here);
      setPastState("idle");
    })();
    return () => {
      live = false;
    };
  }, [on, pins]);

  const docPoint = (e: { clientX: number; clientY: number }) => ({
    x: (e.clientX + window.scrollX) / document.documentElement.scrollWidth,
    y: (e.clientY + window.scrollY) / document.documentElement.scrollHeight,
  });

  function clearDraft() {
    setDraft(null);
    setError(null);
  }

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      if (tool === "page" || tool === "section") return;
      // Only the drawing surface starts a drag; the bar, the note box and the pins are chrome.
      if ((e.target as HTMLElement).closest(".rv-ui")) return;
      e.preventDefault();
      setOpenPin(null);
      const p = docPoint(e);
      startRef.current = p;
      setDrawing(true);
      if (tool === "point") {
        setDraft({ tool, x: p.x, y: p.y, ...hitInfo(e) });
        setDrawing(false);
      } else if (tool === "freehand") {
        setDraft({ tool, points: [p], ...hitInfo(e) });
      } else {
        setDraft({ tool, x: p.x, y: p.y, width: 0, height: 0, ...hitInfo(e) });
      }
    },
    [tool],
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!drawing || !startRef.current) return;
      const p = docPoint(e);
      const s = startRef.current;
      setDraft((d) => {
        if (!d) return d;
        if (d.tool === "freehand") {
          const pts = [...(d.points ?? []), p];
          return { ...d, points: pts.length > 400 ? pts.slice(-400) : pts };
        }
        return {
          ...d,
          x: Math.min(s.x, p.x),
          y: Math.min(s.y, p.y),
          width: Math.abs(p.x - s.x),
          height: Math.abs(p.y - s.y),
        };
      });
    },
    [drawing],
  );

  /**
   * Mark first, THEN the note box. Jake, 2 August: "I need the feature to FIRST allow
   * them to draw mark or select the area, item, etc. BEFORE the feedback box comes up."
   *
   * A press with no drag is thrown away rather than opening the box on a zero-size mark:
   * a stray click on the page should not become a note. Point is exempt, since a tap is
   * the whole gesture.
   */
  const onCancel = useCallback(() => {
    setDrawing(false);
    startRef.current = null;
    setDraft(null);
  }, []);

  const onUp = useCallback(() => {
    setDrawing(false);
    startRef.current = null;
    setDraft((d) => {
      if (!d) return d;
      if (d.tool === "rectangle" || d.tool === "ellipse") {
        const tooSmall = (d.width ?? 0) < 0.004 && (d.height ?? 0) < 0.004;
        return tooSmall ? null : d;
      }
      if (d.tool === "freehand") return (d.points?.length ?? 0) < 3 ? null : d;
      return d;
    });
  }, []);

  async function submit() {
    if (!comment.trim()) {
      setError("Say what you would like changed, in your own words.");
      return;
    }
    setBusy(true);
    setError(null);

    const shot = await captureSelection(draft).catch(() => undefined);

    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nonce: Math.floor(Math.random() * 1e6),
        pageUrl: window.location.href,
        route: window.location.pathname,
        pageTitle: document.title,
        reviewerName,
        tool: draft?.tool ?? "page",
        geometry: draft
          ? { x: draft.x, y: draft.y, width: draft.width, height: draft.height, points: draft.points }
          : {},
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        },
        selectedElement: draft?.reviewId
          ? { dataReviewId: draft.reviewId, textExcerpt: draft.excerpt }
          : undefined,
        issueType,
        /* WHICH DEVICE IS NOT A QUESTION. Jake, 2 August, on the picker: "I DO NOT want
           or like this." It went the way priority went: asking a reviewer to classify
           their own note is asking them to do the reading for us, and the answer is
           already in the record. Every note carries the viewport it was written on, so
           the desk reads the screen instead of asking about it. */
        deviceContext: "current",
        comment,
        shot,
        clientContext: { browser: navigator.userAgent.slice(0, 120), os: navigator.platform },
      }),
    }).catch(() => null);

    setBusy(false);

    if (!res?.ok) {
      const j = await res?.json().catch(() => null);
      setError(j?.error ?? "That did not send. Your note is still here, try again.");
      return;
    }

    const j = await res.json();
    track("review_annotation_submitted", { type: issueType });
    setSent(j.reference ?? j.id);
    setDraft(null);
    setComment("");
    /* The layer reloads next time it is opened, so a note just left shows up with the rest. */
    setPast([]);
    pastLoaded.current = false;
  }

  if (!mounted || onDesk) return null;

  const W = docSize?.w ?? 0;
  const H = docSize?.h ?? 0;
  const box = draft ? markBox(draft, W, H) : null;
  const anchored =
    box && draft?.tool !== "page" && draft?.tool !== "section"
      ? placePop(box, W, window.innerWidth, window.innerHeight, window.scrollY)
      : null;
  const noteOpen = (draft && !drawing) || tool === "page" || tool === "section";
  const openPast = openPin ? past.find((p) => p.id === openPin) : null;

  if (!on) {
    return (
      <button
        type="button"
        className="rv-launch rv-ui"
        onClick={() => {
          setOn(true);
          track("review_mode_opened");
        }}
      >
        <span className="rv-live" aria-hidden />
        Review this page
      </button>
    );
  }

  return (
    <>
      {/* The surface stands down the moment a mark is committed, so the note box and the
          page underneath are both reachable without fighting an invisible sheet. */}
      <div
        className={`rv-surface${
          tool === "page" || tool === "section" || (draft && !drawing) ? " rv-surface--passive" : ""
        }`}
        style={docSize ? { width: docSize.w, height: docSize.h } : undefined}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        /* The browser can take a touch gesture back to scroll the page mid-drag, which
           fires pointercancel and leaves us holding half a rectangle. Throw it away
           rather than committing a mark the reviewer did not finish drawing. */
        onPointerCancel={onCancel}
      >
        {draft ? <Mark draft={draft} W={W} H={H} live={drawing} /> : null}

        {/* Everything already said about this page, drawn where it was said. */}
        {pins
          ? past.map((p, i) => {
              const b = markBox(p.geometry, W, H);
              const done = p.status !== "submitted" && p.status !== "needs_clarification";
              return (
                <div key={p.id}>
                  <div
                    className="rv-ghost"
                    style={{ left: b.left, top: b.top, width: b.width, height: b.height }}
                  />
                  <button
                    type="button"
                    className={`rv-pin rv-ui${done ? " is-done" : ""}${openPin === p.id ? " is-open" : ""}`}
                    style={{ left: b.left + b.width - 12, top: b.top - 12 }}
                    onClick={() => {
                      setOpenPin(openPin === p.id ? null : p.id);
                      setConfirmDelete(null);
                      setError(null);
                    }}
                    aria-label={`Note ${i + 1} from ${p.reviewerName}`}
                  >
                    {i + 1}
                  </button>
                </div>
              );
            })
          : null}

        {/* A note already left, read where it was left. */}
        {openPast
          ? (() => {
              const b = markBox(openPast.geometry, W, H);
              const at = placePop(b, W, window.innerWidth, window.innerHeight, window.scrollY);
              const n = past.findIndex((p) => p.id === openPast.id) + 1;
              return (
                <div className="rv-pop rv-ui" style={{ left: at.left, top: at.top }} role="dialog">
                  <div className="rv-pop__lead">
                    <b>{openPast.reviewerName}</b>
                    <em>{new Date(openPast.createdAt).toLocaleDateString()}</em>
                  </div>
                  <p className="rv-read">{openPast.comment}</p>
                  <p className="rv-meta">
                    {STATUS_LABELS[openPast.status] ?? openPast.status} &middot; note {n}
                  </p>
                  {error ? (
                    <p className="rv-error" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <div className="rv-pop__row">
                    <button
                      type="button"
                      className="rv-ghostbtn"
                      onClick={() => {
                        setOpenPin(null);
                        setConfirmDelete(null);
                        setError(null);
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className={`rv-ghostbtn rv-delete${confirmDelete === openPast.id ? " is-armed" : ""}`}
                      disabled={deleting}
                      onClick={async () => {
                        if (confirmDelete !== openPast.id) {
                          setConfirmDelete(openPast.id);
                          setError(null);
                          return;
                        }
                        setDeleting(true);
                        const res = await fetch(`/api/review/${openPast.id}`, { method: "DELETE" }).catch(
                          () => null,
                        );
                        setDeleting(false);
                        if (!res?.ok) {
                          const j = await res?.json().catch(() => null);
                          setError(j?.error ?? "That note is still there. Try again.");
                          return;
                        }
                        setPast((list) => list.filter((p) => p.id !== openPast.id));
                        setOpenPin(null);
                        setConfirmDelete(null);
                      }}
                    >
                      {deleting ? "Removing" : confirmDelete === openPast.id ? "Really delete" : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })()
          : null}

        {/* The note box grows out of the mark it belongs to. Page and section notes have
            no mark to grow from, so those sit in the corner above the bar. */}
        {noteOpen && !openPast ? (
          <form
            className={`rv-pop rv-ui${anchored ? "" : " rv-pop--corner"}`}
            style={anchored ? { left: anchored.left, top: anchored.top } : undefined}
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
          >
            <div className="rv-pop__lead">
              <b>
                {tool === "page"
                  ? "About this page"
                  : tool === "section" && !draft?.reviewId
                    ? "Which part of the page?"
                    : "What should change?"}
              </b>
              <em>{TOOLS.find((t) => t.id === tool)?.label ?? "Note"}</em>
            </div>

            {/* A LIST, NOT A DROPDOWN. The last native control in the tool, and it read
                like a form field dropped into an instrument. A reviewer picking a part of
                the page should see the parts, not open a menu to find out what they are:
                every section is on screen, the page scrolls to whichever one is touched,
                and the chosen one holds the brass the same way the active tool does. */}
            {tool === "section" ? (
              <div className="rv-list" role="listbox" aria-label="Which part of the page">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="option"
                    aria-selected={draft?.reviewId === s.id}
                    className={`rv-listrow${draft?.reviewId === s.id ? " is-on" : ""}`}
                    onClick={() => {
                      const el = sectionEls.current.get(s.id);
                      el?.scrollIntoView({ block: "center", behavior: "smooth" });
                      setDraft({
                        tool: "section",
                        reviewId: s.id,
                        excerpt: el?.textContent?.replace(/\s+/g, " ").trim().slice(0, 200) || undefined,
                      });
                    }}
                  >
                    {s.label}
                  </button>
                ))}
                {sections.length === 0 ? (
                  <p className="rv-meta">Nothing on this page carries a name to point at. Use Box instead.</p>
                ) : null}
              </div>
            ) : null}

            {tool === "section" && !draft?.reviewId ? null : (
              <>
                <textarea
                  className="rv-field rv-textarea"
                  aria-label="What should change"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="In your own words. Dictation works here too."
                />

                {/* Chips, not a dropdown. Seven plain-language kinds are quicker to pick
                    from than to open, and they read as a set rather than a form field. */}
                <div className="rv-chips" role="group" aria-label="Kind of note">
                  {ISSUE_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className={`rv-chip${issueType === t.value ? " is-on" : ""}`}
                      aria-pressed={issueType === t.value}
                      onClick={() => setIssueType(t.value)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {error ? (
                  <p className="rv-error" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className="rv-pop__row">
                  <button type="submit" className="rv-send" disabled={busy}>
                    {busy ? "Sending" : "Send to Jake"}
                  </button>
                  <button type="button" className="rv-ghostbtn" onClick={clearDraft}>
                    Clear
                  </button>
                </div>
              </>
            )}
          </form>
        ) : null}
      </div>

      <div className="rv-bar rv-ui" role="toolbar" aria-label="Review tools" ref={barRef}>
        <div className="rv-brand">
          <span className="rv-live" aria-hidden />
          <span className="rv-brand__who">Reviewing</span>
        </div>

        <div className="rv-tools">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                data-tool={t.id}
                className={`rv-tool${tool === t.id ? " is-on" : ""}`}
                aria-pressed={tool === t.id}
                /* The name is the LABEL, not the label plus the tooltip. The hint is
                   decoration for a pointer; a screen reader gets it from the title, and
                   every control keeps one short unambiguous name. */
                aria-label={t.label}
                title={t.hint}
                onClick={() => {
                  setTool(t.id);
                  setOpenPin(null);
                  setDraft(t.id === "page" ? { tool: "page" } : null);
                }}
              >
                <Icon />
                <span className="rv-tool__label">{t.label}</span>
                <i className="rv-tip" aria-hidden>
                  {t.hint}
                </i>
              </button>
            );
          })}
        </div>

        <span className="rv-sep" />

        <div className="rv-act">
          <button
            type="button"
            data-act="pins"
            className={`rv-icb${pins ? " is-on" : ""}`}
            aria-pressed={pins}
            aria-label="Notes already left here"
            onClick={() => {
              setPins((v) => !v);
              setOpenPin(null);
            }}
          >
            <IconEye />
            <i className="rv-tip" aria-hidden>
              {pastState === "error"
                ? "Could not load past notes"
                : pastState === "loading"
                  ? "Reading the desk"
                  : pins
                    ? past.length
                      ? `${past.length} note${past.length === 1 ? "" : "s"} left here`
                      : "Nothing left here yet"
                    : "Notes already left here"}
            </i>
          </button>
          <button
            type="button"
            data-act="undo"
            className="rv-icb"
            aria-label="Undo"
            onClick={clearDraft}
            disabled={!draft}
          >
            <IconUndo />
            <i className="rv-tip" aria-hidden>
              Undo
            </i>
          </button>
          <button
            type="button"
            data-act="exit"
            className="rv-icb"
            aria-label="Exit review"
            onClick={() => {
              setOn(false);
              clearDraft();
            }}
          >
            <IconClose />
            <i className="rv-tip" aria-hidden>
              Exit review
            </i>
          </button>
        </div>
      </div>

      {sent ? (
        <div className="rv-sent rv-ui" role="status">
          <p>Received. This note is attached to this page and this version of the site.</p>
          <p className="rv-ref">Reference {sent}</p>
          <button type="button" className="rv-ghostbtn" onClick={() => setSent(null)}>
            Close
          </button>
        </div>
      ) : null}
    </>
  );
}

function Mark({ draft, W, H, live }: { draft: Draft; W: number; H: number; live: boolean }) {
  if (draft.tool === "page" || draft.tool === "section") return null;
  /* `is-live` carries the dimming, and only while the gesture is running: the page drops
     back so the eye goes to what is being pointed at, and comes back the moment the mark
     commits, because a reviewer judging contrast must not be judging it through a scrim. */
  const cls = live ? " is-live" : " is-set";

  if (draft.tool === "point" && draft.x != null && draft.y != null) {
    return <div className={`rv-point${cls}`} style={{ left: draft.x * W, top: draft.y * H }} />;
  }
  if (draft.tool === "freehand" && draft.points?.length) {
    const d = draft.points.map((p, i) => `${i ? "L" : "M"}${p.x * W},${p.y * H}`).join(" ");
    return (
      <svg className={`rv-draw${cls}`} width={W} height={H}>
        <path d={d} />
      </svg>
    );
  }
  if (draft.x != null && draft.y != null) {
    return (
      <div
        className={`${draft.tool === "ellipse" ? "rv-ellipse" : "rv-rect"}${cls}`}
        style={{
          left: draft.x * W,
          top: draft.y * H,
          width: (draft.width ?? 0) * W,
          height: (draft.height ?? 0) * H,
        }}
      />
    );
  }
  return null;
}

/** A mark's box in DOCUMENT pixels, which is the space the surface and every mark live in. */
function markBox(d: Draft, W: number, H: number): Box {
  if (d.tool === "freehand" && d.points?.length) {
    const xs = d.points.map((p) => p.x);
    const ys = d.points.map((p) => p.y);
    const l = Math.min(...xs);
    const t = Math.min(...ys);
    return { left: l * W, top: t * H, width: (Math.max(...xs) - l) * W, height: (Math.max(...ys) - t) * H };
  }
  if (d.tool === "point") {
    return { left: (d.x ?? 0) * W - 11, top: (d.y ?? 0) * H - 11, width: 22, height: 22 };
  }
  return {
    left: (d.x ?? 0) * W,
    top: (d.y ?? 0) * H,
    width: (d.width ?? 0) * W,
    height: (d.height ?? 0) * H,
  };
}

/**
 * Beside the mark on a wide screen, under it on a narrow one.
 *
 * A 320px box cannot sit beside anything on a 390px phone: the flip-to-the-other-side
 * rule just threw it against the left edge, which is anchoring in name only. So on a
 * narrow screen the box anchors VERTICALLY, under the mark, or above it when the mark is
 * low enough that under would land beneath the docked bar. The relationship the gate
 * asked for is kept, on the axis that has the room.
 */
function placePop(b: Box, W: number, vw: number, vh: number, scrollY: number) {
  /* The same cap the stylesheet applies, so the arithmetic and the CSS agree about how
     tall this thing can get. Then the top is clamped to keep it inside the screen and
     off the bar, whichever axis it was anchored on. */
  const cap = Math.min(vh * 0.62, 560);
  const lo = scrollY + 12;
  const hi = Math.max(lo, scrollY + vh - 84 - cap);
  const clamp = (t: number) => Math.min(Math.max(t, lo), hi);

  /* Ask whether it FITS beside the mark, do not guess from the viewport width. The
     guess was `vw < 440`, so a 440px phone took the wide path, found 120px of room for
     a 320px box, and threw it at the left edge: anchored to nothing. The question is
     the same one on every screen, so there is one answer for all of them. */
  const right = b.left + b.width + 14;
  const leftOf = b.left - POP_W - 14;
  if (right + POP_W <= W - 12) return { left: right, top: clamp(b.top - 8) };
  if (leftOf >= 12) return { left: leftOf, top: clamp(b.top - 8) };

  /* No room either side, so it stacks: under the mark, or above it when under would
     land beneath the bar. */
  const below = b.top + b.height + 14;
  const roomBelow = below - scrollY + cap < vh - 70;
  const left = Math.max(12, Math.min(b.left, W - POP_W - 12));
  return { left, top: clamp(roomBelow ? below : b.top - cap - 8) };
}

function readableName(el: HTMLElement, index: number) {
  const id = el.dataset.reviewId ?? "";
  const heading = el.querySelector("h1, h2, h3")?.textContent?.trim();
  const name = (heading || el.textContent?.trim() || "").replace(/\s+/g, " ").slice(0, 56);
  if (id) return name ? `${name} (${id})` : id;
  return name || `Section ${index + 1}`;
}

/**
 * What is UNDER the mark, read past the review chrome.
 *
 * elementFromPoint returns the topmost element, and the topmost element is always the
 * drawing surface, because covering the document is its whole job. So every mark was
 * recorded against the overlay: no section, and an excerpt of nothing. elementsFromPoint
 * hands back the entire stack, so the first thing that is not review chrome is the thing
 * the reviewer actually pointed at.
 */
function hitInfo(e: React.PointerEvent) {
  const stack = Array.from(document.elementsFromPoint(e.clientX, e.clientY)) as HTMLElement[];
  const el = stack.find((n) => !n.closest(".rv-surface") && !n.closest(".rv-ui")) ?? null;
  const host = el?.closest<HTMLElement>("[data-review-id]");
  return {
    reviewId: host?.dataset.reviewId,
    excerpt: (el?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 200) || undefined,
  };
}

/**
 * The screenshot, section 14.7.
 *
 * html2canvas and friends are a large dependency for something used by two people a
 * handful of times, and this repo's whole dependency list is five packages. So this
 * draws the SELECTION GEOMETRY over a solid card instead of rasterising the DOM: what
 * Jake needs from the image is which part of which page, and the geometry plus the
 * route already carry that.
 *
 * No form values are read, so nothing a visitor typed can be captured.
 */
async function captureSelection(draft: Draft | null): Promise<string | undefined> {
  if (!draft) return undefined;
  const W = 640;
  const H = 360;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) return undefined;

  ctx.fillStyle = "#14130f";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#2c2921";
  ctx.strokeRect(8, 8, W - 16, H - 16);

  ctx.fillStyle = "#cfc9be";
  ctx.font = "14px system-ui, sans-serif";
  ctx.fillText(document.title.slice(0, 60), 20, 34);
  ctx.fillText(window.location.pathname, 20, 54);
  if (draft.reviewId) ctx.fillText(`section: ${draft.reviewId}`, 20, 74);

  ctx.strokeStyle = "#c9a227";
  ctx.lineWidth = 3;
  const px = (v: number | undefined) => 20 + (v ?? 0) * (W - 40);
  const py = (v: number | undefined) => 90 + (v ?? 0) * (H - 110);

  if (draft.tool === "point") {
    ctx.beginPath();
    ctx.arc(px(draft.x), py(draft.y), 10, 0, Math.PI * 2);
    ctx.stroke();
  } else if (draft.tool === "freehand" && draft.points?.length) {
    ctx.beginPath();
    draft.points.forEach((p, i) => (i ? ctx.lineTo(px(p.x), py(p.y)) : ctx.moveTo(px(p.x), py(p.y))));
    ctx.stroke();
  } else if (draft.width != null) {
    if (draft.tool === "ellipse") {
      ctx.beginPath();
      ctx.ellipse(
        px(draft.x) + (draft.width * (W - 40)) / 2,
        py(draft.y) + ((draft.height ?? 0) * (H - 110)) / 2,
        Math.max(6, (draft.width * (W - 40)) / 2),
        Math.max(6, ((draft.height ?? 0) * (H - 110)) / 2),
        0,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
    } else {
      ctx.strokeRect(px(draft.x), py(draft.y), draft.width * (W - 40), (draft.height ?? 0) * (H - 110));
    }
  }

  return c.toDataURL("image/png");
}
