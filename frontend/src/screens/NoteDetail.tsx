// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Textarea, Label } = UI;

const NOTE = {
  id: "note_8142",
  title: "Grocery list",
  body:
    "Oats, coffee beans, olive oil, two lemons. Pick up the parcel from the locker before six.\n\nAsk at the deli counter whether they still cure their own pancetta — Rosalind swears by it.\n\nIf the market is shut, the corner shop on Willow Lane keeps the same olive oil at half the price.",
  created_at: "18 Nov 2026, 19:42",
  updated_at: "20 Nov 2026, 09:14",
  owner_email: "satya.ganaraju@quorq.ai",
};

const INITIAL_SAVED_AT = "09:14";

const rgba = (hex, alpha) => {
  const h = String(hex).replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

export default function Screen() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState(NOTE.title);
  const [body, setBody] = React.useState(NOTE.body);
  const [status, setStatus] = React.useState("saved"); // saved | pending | saving | error
  const [savedAt, setSavedAt] = React.useState(INITIAL_SAVED_AT);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const debounceRef = React.useRef(null);
  const flightRef = React.useRef(null);
  const deleteRef = React.useRef(null);
  const attempts = React.useRef(0);

  const deleteBtnRef = React.useRef(null);
  const confirmRef = React.useRef(null);
  const cancelRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current);
      clearTimeout(flightRef.current);
      clearTimeout(deleteRef.current);
    };
  }, []);

  const clock = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const runSave = (isRetry) => {
    clearTimeout(flightRef.current);
    setStatus("saving");
    flightRef.current = setTimeout(() => {
      attempts.current += 1;
      // One flaky connection on the second autosave of the session, so the
      // "not saved" state is reachable the way it would be in the wild.
      if (!isRetry && attempts.current === 2) {
        setStatus("error");
      } else {
        setSavedAt(clock());
        setStatus("saved");
      }
    }, 760);
  };

  const queueSave = () => {
    clearTimeout(debounceRef.current);
    clearTimeout(flightRef.current);
    setStatus("pending");
    debounceRef.current = setTimeout(() => runSave(false), 1000);
  };

  const onTitle = (e) => {
    setTitle(e.target.value);
    queueSave();
  };

  // Plain text only: strip anything the clipboard tries to smuggle in.
  const onBody = (e) => {
    setBody(e.target.value.replace(/ /g, " "));
    queueSave();
  };

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    if (deleting) return;
    setModalOpen(false);
    if (deleteBtnRef.current) deleteBtnRef.current.focus();
  };

  const confirmDelete = () => {
    setDeleting(true);
    deleteRef.current = setTimeout(() => navigate("notes"), 850);
  };

  React.useEffect(() => {
    if (modalOpen && confirmRef.current) confirmRef.current.focus();
  }, [modalOpen]);

  const onDialogKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeModal();
      return;
    }
    if (e.key !== "Tab" || deleting) return;
    const first = cancelRef.current;
    const last = confirmRef.current;
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const ink = brand.primaryColor;
  const gild = brand.accentColor;
  const sage = brand.neutralColor;
  const ivory = brand.backgroundColor;

  const hair = rgba(ink, 0.22);
  const surface = "rgba(255,255,255,0.52)";

  const headingFont = { fontFamily: brand.fontHeading };
  const num = { fontVariantNumeric: "tabular-nums" };

  const trimmedTitle = title.trim();
  const firstLine = body.split("\n").find((l) => l.trim().length > 0) || "";
  const listLabel = trimmedTitle || (firstLine ? firstLine.slice(0, 48) : "Untitled note");
  const words = body.trim() ? body.trim().split(/\s+/).length : 0;
  const chars = body.length;

  const statusCopy = {
    saved: { text: `Saved ${savedAt}`, help: "Every change is stored on the server." },
    pending: { text: "Saving in a moment", help: "Pause typing and it saves itself." },
    saving: { text: "Saving…", help: "Sending this change to the server." },
    error: { text: "Not saved", help: "Your words are kept here until it goes through." },
  }[status];

  const Ornament = ({ width = "100%" }) => (
    <div className="flex items-center justify-center gap-3" style={{ width }} aria-hidden="true">
      <span className="h-px flex-1" style={{ backgroundColor: hair }} />
      <span className="h-px flex-1 -mt-[3px] hidden" />
      <span
        className="inline-block"
        style={{ width: 7, height: 7, backgroundColor: gild, transform: "rotate(45deg)" }}
      />
      <span className="h-px flex-1" style={{ backgroundColor: hair }} />
    </div>
  );

  return (
    <div
      className="min-h-full w-full px-4 py-8 sm:px-8 sm:py-12"
      style={{
        backgroundColor: ivory,
        color: ink,
        fontFamily: brand.fontBody,
        ["--gq-accent"]: gild,
      }}
    >
      <style>{`
        @keyframes gq-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes gq-pop { from { opacity: 0; transform: scale(.975); } to { opacity: 1; transform: none; } }
        @keyframes gq-veil { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gq-pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
        .gq-up { animation: gq-up .3s cubic-bezier(.2,.7,.3,1) both; }
        .gq-pop { animation: gq-pop .22s cubic-bezier(.2,.7,.3,1) both; }
        .gq-veil { animation: gq-veil .18s ease-out both; }
        .gq-pulse { animation: gq-pulse 1.1s ease-in-out infinite; }
        .gq-focus:focus-visible { outline: 2px solid var(--gq-accent); outline-offset: 3px; }
        .gq-field:focus { outline: 2px solid var(--gq-accent); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .gq-up, .gq-pop, .gq-veil, .gq-pulse { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-4xl">
        {/* Row 1 — toolbar */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
          <div className="sm:col-span-1 flex justify-start">
            <button
              type="button"
              data-wf="b-0-0"
              onClick={() => navigate("notes")}
              className="gq-focus inline-flex min-h-[44px] items-center gap-2 px-1 text-[12px] uppercase"
              style={{ ...headingFont, letterSpacing: "0.22em", color: ink }}
            >
              <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All notes
            </button>
          </div>

          <div className="sm:col-span-1 flex justify-start sm:justify-center">
            <p
              data-wf="b-0-1"
              className="inline-flex items-center gap-2 text-[12px] uppercase"
              style={{
                ...headingFont,
                ...num,
                letterSpacing: "0.18em",
                color: status === "error" ? gild : sage,
              }}
              aria-live="polite"
            >
              {status === "saved" && <Icons.Check className="h-4 w-4" aria-hidden="true" />}
              {status === "saving" && (
                <Icons.Clock className="h-4 w-4 gq-pulse" aria-hidden="true" />
              )}
              {status === "pending" && <Icons.Edit className="h-4 w-4" aria-hidden="true" />}
              {status === "error" && <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />}
              {statusCopy.text}
            </p>
          </div>

          <div className="sm:col-span-1 flex justify-start sm:justify-end">
            <button
              type="button"
              data-wf="b-0-2"
              ref={deleteBtnRef}
              onClick={openModal}
              className="gq-focus inline-flex min-h-[44px] items-center gap-2 px-4 text-[12px] uppercase transition-colors duration-150"
              style={{
                ...headingFont,
                letterSpacing: "0.2em",
                color: gild,
                border: `1px solid ${rgba(gild, 0.55)}`,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = rgba(gild, 0.08))}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Icons.Trash className="h-4 w-4" aria-hidden="true" />
              Delete note
            </button>
          </div>
        </div>

        {/* Double-framed editor panel — the signature */}
        <div className="mt-6 p-[4px]" style={{ border: `1px solid ${ink}` }}>
          <div
            className="px-5 py-8 sm:px-12 sm:py-12"
            style={{ border: `1px solid ${gild}`, backgroundColor: surface }}
          >
            <header className="text-center">
              <p
                className="text-[11px] uppercase"
                style={{ ...headingFont, ...num, letterSpacing: "0.34em", color: sage }}
              >
                Note · {NOTE.id}
              </p>
              <h1
                className="mt-3 text-[26px] leading-tight sm:text-[34px] uppercase break-words"
                style={{ ...headingFont, letterSpacing: "0.12em", color: ink }}
              >
                {listLabel}
              </h1>
              <div className="mt-5">
                <Ornament />
              </div>
            </header>

            {/* Row 2 — title */}
            <div className="mt-8" data-wf="b-1-0">
              <Label
                htmlFor="note-title"
                className="block text-[11px] uppercase"
                style={{ ...headingFont, letterSpacing: "0.26em", color: sage }}
              >
                Title
              </Label>
              <Input
                id="note-title"
                data-wf="b-1-0"
                value={title}
                onChange={onTitle}
                placeholder="Untitled note"
                aria-describedby="note-title-help"
                className="gq-field mt-3 w-full bg-transparent px-0 py-2 text-[20px] sm:text-[22px]"
                style={{
                  ...headingFont,
                  letterSpacing: "0.04em",
                  color: ink,
                  border: "none",
                  borderBottom: `1px solid ${hair}`,
                  borderRadius: brand.radius,
                  backgroundColor: "transparent",
                }}
              />
              <p id="note-title-help" className="mt-2 text-[13px]" style={{ color: sage }}>
                {trimmedTitle
                  ? "Changes to the title reorder your list the next time it loads."
                  : `No title yet — your list will show “${
                      firstLine ? firstLine.slice(0, 40) : "Untitled note"
                    }” instead.`}
              </p>
            </div>

            {/* Row 3 — body */}
            <div className="mt-8" data-wf="b-2-0">
              <div className="flex items-baseline justify-between gap-4">
                <Label
                  htmlFor="note-body"
                  className="block text-[11px] uppercase"
                  style={{ ...headingFont, letterSpacing: "0.26em", color: sage }}
                >
                  Body (plain text)
                </Label>
                <span className="text-[12px]" style={{ ...num, color: sage }}>
                  {words} words · {chars} characters
                </span>
              </div>
              <Textarea
                id="note-body"
                data-wf="b-2-0"
                value={body}
                onChange={onBody}
                rows={12}
                spellCheck="true"
                aria-describedby="note-body-help"
                className="gq-field mt-3 w-full px-4 py-4 text-[15px] leading-[1.65]"
                style={{
                  color: ink,
                  backgroundColor: rgba(ivory, 0.75),
                  border: `1px solid ${hair}`,
                  borderRadius: brand.radius,
                  minHeight: 280,
                  resize: "vertical",
                }}
              />
              <p id="note-body-help" className="mt-2 text-[13px]" style={{ color: sage }}>
                Plain text only. Formatting, folders and attachments are not stored — what you
                type is exactly what is kept.
              </p>
            </div>

            <div className="mt-10">
              <Ornament />
            </div>

            <footer className="mt-5 flex flex-col items-center gap-2 text-center text-[12px]" style={{ color: sage }}>
              <p className="inline-flex items-center gap-2">
                <Icons.User className="h-4 w-4" aria-hidden="true" />
                Private to {NOTE.owner_email}. No one else can open this note.
              </p>
              <p style={num}>
                Created {NOTE.created_at} · Last saved {savedAt} today
              </p>
            </footer>
          </div>
        </div>

        {/* Row 4 — not saved */}
        {status === "error" ? (
          <div
            className="gq-up mt-6 grid grid-cols-1 gap-4 p-5 sm:grid-cols-12 sm:items-center"
            style={{
              border: `1px solid ${gild}`,
              borderLeft: `4px double ${gild}`,
              backgroundColor: rgba(gild, 0.07),
            }}
            role="status"
          >
            <div className="sm:col-span-8" data-wf="b-3-0">
              <p
                className="inline-flex items-start gap-2 text-[14px] font-semibold"
                style={{ color: gild }}
              >
                <Icons.AlertCircle className="mt-[2px] h-4 w-4 shrink-0" aria-hidden="true" />
                Not saved — we could not reach the server. Retrying…
              </p>
              <p className="mt-2 pl-6 text-[13px]" style={{ color: ink }}>
                Your edit is still here on this device. Keep writing; nothing is thrown away.
              </p>
            </div>
            <div className="sm:col-span-4 flex sm:justify-end">
              <Button
                type="button"
                data-wf="b-3-1"
                onClick={() => runSave(true)}
                className="gq-focus inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-6 text-[12px] uppercase sm:w-auto"
                style={{
                  ...headingFont,
                  letterSpacing: "0.22em",
                  backgroundColor: ink,
                  color: ivory,
                  border: `1px solid ${ink}`,
                  borderRadius: brand.radius,
                }}
              >
                <Icons.Upload className="h-4 w-4" aria-hidden="true" />
                Retry save
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-center text-[12px]" style={{ ...num, color: sage }}>
            {statusCopy.help}
          </p>
        )}
      </div>

      {/* Row 5 — delete confirmation */}
      {modalOpen && (
        <div
          className="gq-veil fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          style={{ backgroundColor: rgba(ink, 0.62) }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            data-wf="b-4-0"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-note-heading"
            aria-describedby="delete-note-copy"
            onKeyDown={onDialogKeyDown}
            className="gq-pop w-full max-w-lg p-[4px]"
            style={{ border: `1px solid ${gild}`, boxShadow: `0 24px 60px ${rgba(ink, 0.45)}` }}
          >
            <div
              className="px-6 py-8 sm:px-10 sm:py-10 text-center"
              style={{ border: `1px solid ${gild}`, backgroundColor: ivory }}
            >
              <h2
                id="delete-note-heading"
                className="text-[20px] uppercase sm:text-[24px]"
                style={{ ...headingFont, letterSpacing: "0.16em", color: ink }}
              >
                Delete this note?
              </h2>
              <div className="mx-auto mt-5 w-40">
                <Ornament />
              </div>

              <p
                id="delete-note-copy"
                data-wf="i-4-0-0"
                className="mx-auto mt-5 max-w-sm text-[14px] leading-[1.6]"
                style={{ color: ink }}
              >
                “{listLabel}” will be removed from all your devices. This cannot be undone.
              </p>

              <div className="mt-8 flex flex-col-reverse items-stretch justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  data-wf="i-4-0-2"
                  ref={cancelRef}
                  onClick={closeModal}
                  disabled={deleting}
                  className="gq-focus min-h-[44px] px-6 text-[12px] uppercase transition-colors duration-150 disabled:opacity-45"
                  style={{
                    ...headingFont,
                    letterSpacing: "0.22em",
                    color: ink,
                    border: `1px solid ${hair}`,
                    backgroundColor: "transparent",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-wf="i-4-0-1"
                  ref={confirmRef}
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="gq-focus inline-flex min-h-[44px] items-center justify-center gap-2 px-6 text-[12px] uppercase transition-opacity duration-150 disabled:opacity-80"
                  style={{
                    ...headingFont,
                    letterSpacing: "0.22em",
                    color: ivory,
                    backgroundColor: gild,
                    border: `1px solid ${gild}`,
                  }}
                >
                  {deleting ? (
                    <>
                      <Icons.Clock className="h-4 w-4 gq-pulse" aria-hidden="true" />
                      Deleting…
                    </>
                  ) : (
                    <>
                      <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                      Delete note
                    </>
                  )}
                </button>
              </div>

              <p className="mt-6 text-[12px]" style={{ color: sage }}>
                Press Esc to keep the note.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
