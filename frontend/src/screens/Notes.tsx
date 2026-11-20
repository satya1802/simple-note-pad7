// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Badge, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, Search, X, ChevronRight, AlertCircle } = Icons;

const CURRENT_USER = { email: "satya.ganaraju@quorq.ai", last_sync: "20 Nov 2026, 09:16" };

const NOTES = [
  {
    id: "n_8f21",
    title: "Grocery list",
    body: "Green lentils, sourdough, oat milk, two lemons, Parmesan, tinned tomatoes, coffee for the Thursday pot. Skip the market stall — closed until the 24th.",
    updated_at: "2026-11-20T09:14:00",
    updated_label: "20 Nov 2026, 09:14",
  },
  {
    id: "n_7c04",
    title: "Meeting notes: Thursday standup",
    body: "Priya is blocked on the import job until the staging key is rotated. Marcus to confirm the freeze date before the 27th. I owe Elena the migration summary by Monday.",
    updated_at: "2026-11-19T16:40:00",
    updated_label: "19 Nov 2026, 16:40",
  },
  {
    id: "n_6b93",
    title: "",
    body: "Remember to book the dentist — Dr Ellory, the one on Marlow Street. Ask about the night guard and whether the Saturday clinic is still running.",
    updated_at: "2026-11-18T21:02:00",
    updated_label: "18 Nov 2026, 21:02",
  },
  {
    id: "n_5a17",
    title: "Books to read next",
    body: "Stoner (John Williams), The Dispossessed, A Month in the Country, Piranesi. Borrow the Didion from Ana before she moves in January.",
    updated_at: "2026-11-14T08:27:00",
    updated_label: "14 Nov 2026, 08:27",
  },
  {
    id: "n_4d52",
    title: "Flat 3B — questions for the landlord",
    body: "Where is the boiler service record? Who holds the spare key? Bin collection has moved to Tuesday mornings. Ask again about the hallway light.",
    updated_at: "2026-11-12T19:55:00",
    updated_label: "12 Nov 2026, 19:55",
  },
  {
    id: "n_3e88",
    title: "Lentil soup — Nana's version",
    body: "Soften onion, carrot and celery in olive oil for a slow twenty minutes. 300g green lentils, bay, a strip of lemon peel. Never salt it before the lentils give way.",
    updated_at: "2026-11-11T18:12:00",
    updated_label: "11 Nov 2026, 18:12",
  },
  {
    id: "n_2f31",
    title: "Passport renewal checklist",
    body: "Form D1, two photographs at 45 x 35 mm, the old passport, countersignature from someone who has known me five years. Post it before the end of the month.",
    updated_at: "2026-11-09T13:31:00",
    updated_label: "09 Nov 2026, 13:31",
  },
  {
    id: "n_1a76",
    title: "Birthday ideas for Daniel",
    body: "Darkroom workshop in Peckham, the Shackleton biography he keeps mentioning, a decent chef's knife. He already owns the Leuchtturm notebook.",
    updated_at: "2026-11-06T20:48:00",
    updated_label: "06 Nov 2026, 20:48",
  },
  {
    id: "n_9c45",
    title: "Running log — week of 2 Nov",
    body: "Mon 5.2 km easy. Wed 8 km intervals, left calf tight by the fourth. Sat 16 km long run along the towpath, felt steady the whole way.",
    updated_at: "2026-11-05T07:05:00",
    updated_label: "05 Nov 2026, 07:05",
  },
  {
    id: "n_0b19",
    title: "",
    body: "Quotes worth keeping: the one from the Didion essay about staying on nodding terms with the people we used to be. And whatever Marcus said about patience in the kitchen.",
    updated_at: "2026-11-02T22:17:00",
    updated_label: "02 Nov 2026, 22:17",
  },
  {
    id: "n_7h62",
    title: "Wedding speech — rough draft",
    body: "Open with the canoe story. Keep it under four minutes. Thank Ana's parents by name. End on the line about the kitchen table, not the one about the airport.",
    updated_at: "2026-10-29T23:09:00",
    updated_label: "29 Oct 2026, 23:09",
  },
  {
    id: "n_6k03",
    title: "Plants — watering schedule",
    body: "Monstera every ten days. Ferns twice a week, misted. The olive tree only when the topsoil is properly dry — it survived two years of neglect, do not drown it now.",
    updated_at: "2026-10-24T08:41:00",
    updated_label: "24 Oct 2026, 08:41",
  },
];

const GATSBY_CSS = `
.gq-focus:focus-visible{outline:2px solid var(--gq-accent);outline-offset:3px}
.gq-field:focus-within{outline:2px solid var(--gq-accent);outline-offset:3px}
.gq-row-btn{transition:background-color .18s ease}
.gq-row-btn:hover{background-color:var(--gq-tint)}
.gq-row-btn:active{background-color:var(--gq-tint-strong)}
.gq-btn{transition:background-color .18s ease}
.gq-btn:hover{background-color:var(--gq-primary-hover)}
.gq-ghost{transition:background-color .18s ease}
.gq-ghost:hover{background-color:var(--gq-tint)}
.gq-enter{animation:gq-rise .34s ease-out both}
@keyframes gq-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes gq-pulse{0%,100%{opacity:.26}50%{opacity:.52}}
.gq-skel{animation:gq-pulse 1.5s ease-in-out infinite}
@media (prefers-reduced-motion: reduce){
  .gq-enter,.gq-skel{animation:none}
  .gq-row-btn,.gq-btn,.gq-ghost{transition:none}
}
`;

const Rule = ({ className }) => (
  <div className={className} aria-hidden="true">
    <div className="flex items-center">
      <span className="h-px flex-1" style={{ backgroundColor: "var(--gq-hair-strong)" }} />
      <span
        className="mx-3 block h-[7px] w-[7px] rotate-45"
        style={{ backgroundColor: "var(--gq-accent)" }}
      />
      <span className="h-px flex-1" style={{ backgroundColor: "var(--gq-hair-strong)" }} />
    </div>
    <div className="mt-[3px] flex items-center">
      <span className="h-px flex-1" style={{ backgroundColor: "var(--gq-hair)" }} />
    </div>
  </div>
);

const Frame = ({ children, className }) => (
  <div
    className={className}
    style={{ border: "1px solid var(--gq-hair-strong)", padding: "3px", borderRadius: 0 }}
  >
    <div style={{ border: "1px solid var(--gq-accent)", borderRadius: 0 }}>{children}</div>
  </div>
);

export default function Screen() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("loading");
  const [notes] = React.useState(NOTES);
  const searchRef = React.useRef(null);

  React.useEffect(() => {
    const t = setTimeout(() => setStatus("ready"), 650);
    return () => clearTimeout(t);
  }, []);

  const vars = {
    "--gq-primary": brand.primaryColor,
    "--gq-accent": brand.accentColor,
    "--gq-neutral": brand.neutralColor,
    "--gq-bg": brand.backgroundColor,
    "--gq-primary-hover": `color-mix(in srgb, ${brand.primaryColor} 84%, ${brand.backgroundColor})`,
    "--gq-tint": `color-mix(in srgb, ${brand.accentColor} 7%, ${brand.backgroundColor})`,
    "--gq-tint-strong": `color-mix(in srgb, ${brand.accentColor} 13%, ${brand.backgroundColor})`,
    "--gq-hair": `color-mix(in srgb, ${brand.primaryColor} 18%, ${brand.backgroundColor})`,
    "--gq-hair-strong": `color-mix(in srgb, ${brand.primaryColor} 42%, ${brand.backgroundColor})`,
    "--gq-muted": `color-mix(in srgb, ${brand.primaryColor} 68%, ${brand.backgroundColor})`,
    "--gq-surface": `color-mix(in srgb, ${brand.backgroundColor} 94%, #ffffff)`,
  };

  const headingFont = { fontFamily: brand.fontHeading };
  const mutedText = { color: "var(--gq-muted)" };
  const num = { fontVariantNumeric: "tabular-nums" };

  const q = query.trim().toLowerCase();

  const sorted = React.useMemo(
    () => [...notes].sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1)),
    [notes]
  );

  const visible = React.useMemo(() => {
    if (!q) return sorted;
    return sorted.filter((n) => (n.title + " " + n.body).toLowerCase().includes(q));
  }, [sorted, q]);

  const labelFor = (note) => (note.title ? note.title : "Untitled note");
  const snippetFor = (note) =>
    note.body.length > 118 ? note.body.slice(0, 118).trimEnd() + "…" : note.body;

  const mark = (text, keyPrefix) => {
    if (!q) return text;
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return text;
    return [
      text.slice(0, i),
      <mark
        key={keyPrefix}
        style={{
          backgroundColor: "var(--gq-tint-strong)",
          color: brand.primaryColor,
          padding: "0 2px",
        }}
      >
        {text.slice(i, i + q.length)}
      </mark>,
      text.slice(i + q.length),
    ];
  };

  const openNote = () => navigate("note-detail");

  const clearSearch = () => {
    setQuery("");
    if (searchRef.current) searchRef.current.focus();
  };

  const retry = () => {
    setStatus("loading");
    setTimeout(() => setStatus("ready"), 650);
  };

  const wireIds = ["i-2-0-0", "i-2-0-1", "i-2-0-2", "i-2-0-3"];

  return (
    <div
      className="min-h-full w-full"
      style={{
        ...vars,
        backgroundColor: brand.backgroundColor,
        color: brand.primaryColor,
        fontFamily: brand.fontBody,
      }}
    >
      <style>{GATSBY_CSS}</style>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8 sm:py-14">
        {/* ── Row 1 ───────────────────────────────────────────── */}
        <div className="grid grid-cols-12 items-end gap-6">
          <div data-wf="b-0-0" className="col-span-12 sm:col-span-8">
            <p
              className="text-[11px] uppercase"
              style={{ ...headingFont, ...mutedText, letterSpacing: "0.38em" }}
            >
              Your private notepad
            </p>
            <h1
              className="mt-3 text-[30px] leading-tight sm:text-[38px]"
              style={{ ...headingFont, letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              My notes{" "}
              <span style={{ ...num, color: brand.accentColor }}>({notes.length})</span>
            </h1>
            <p className="mt-3 text-[13px] leading-relaxed" style={{ ...mutedText, ...num }}>
              Private to {CURRENT_USER.email} · all changes synced {CURRENT_USER.last_sync}
            </p>
          </div>

          <div className="col-span-12 flex sm:col-span-4 sm:justify-end">
            <div
              className="w-full sm:w-auto"
              style={{ border: "1px solid var(--gq-accent)", padding: "3px" }}
            >
              <Button
                data-wf="b-0-1"
                onClick={() => navigate("note-detail")}
                className="gq-btn gq-focus flex w-full items-center justify-center gap-2 rounded-none border-0 px-6 py-3 text-[12px] sm:w-auto"
                style={{
                  backgroundColor: brand.primaryColor,
                  color: brand.backgroundColor,
                  fontFamily: brand.fontHeading,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  borderRadius: 0,
                  minHeight: 44,
                }}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                New note
              </Button>
            </div>
          </div>
        </div>

        <Rule className="my-8 sm:my-10" />

        {/* ── Row 2 ───────────────────────────────────────────── */}
        <div data-wf="b-1-0">
          <Label
            htmlFor="note-search"
            className="block text-[11px] uppercase"
            style={{ ...headingFont, letterSpacing: "0.3em", color: "var(--gq-muted)" }}
          >
            Search my notes by keyword
          </Label>
          <div
            className="gq-field mt-3 flex items-center gap-3 px-4"
            style={{
              border: "1px solid var(--gq-hair-strong)",
              backgroundColor: "var(--gq-surface)",
              borderRadius: 0,
              minHeight: 52,
            }}
          >
            <Search
              className="h-[18px] w-[18px] shrink-0"
              style={{ color: brand.accentColor }}
              aria-hidden="true"
            />
            <Input
              id="note-search"
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="dentist, standup, lentils…"
              autoComplete="off"
              className="w-full rounded-none border-0 bg-transparent px-0 py-3 text-[15px] shadow-none outline-none focus:ring-0 focus-visible:ring-0"
              style={{ color: brand.primaryColor, borderRadius: 0 }}
            />
            {query ? (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="gq-ghost gq-focus flex h-9 w-9 shrink-0 items-center justify-center"
                style={{ border: "1px solid var(--gq-hair)", color: brand.primaryColor }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <p className="sr-only" aria-live="polite">
            {status === "ready"
              ? q
                ? `${visible.length} of ${notes.length} notes match ${query}`
                : `${notes.length} notes shown`
              : "Loading your notes"}
          </p>
        </div>

        {/* ── Row 3 ───────────────────────────────────────────── */}
        <Frame className="mt-8" data-wf="b-2-0">
          <div
            className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-4 sm:px-6"
            style={{ borderBottom: "1px solid var(--gq-hair-strong)" }}
          >
            <h2
              className="text-[12px] uppercase"
              style={{ ...headingFont, letterSpacing: "0.26em" }}
            >
              Notes, newest edited first
            </h2>
            <p className="text-[12px]" style={{ ...mutedText, ...num }}>
              {status === "ready"
                ? `Showing ${visible.length} of ${notes.length}`
                : "Reading your note space"}
            </p>
          </div>

          {status === "loading" ? (
            <div className="px-4 py-2 sm:px-6" aria-busy="true">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-5"
                  style={{ borderBottom: i < 3 ? "1px solid var(--gq-hair)" : "none" }}
                >
                  <span
                    className="gq-skel block h-3 w-6"
                    style={{ backgroundColor: brand.neutralColor, animationDelay: `${i * 120}ms` }}
                  />
                  <span className="flex-1">
                    <span
                      className="gq-skel mb-2 block h-3"
                      style={{
                        backgroundColor: brand.neutralColor,
                        width: `${58 - i * 7}%`,
                        animationDelay: `${i * 120}ms`,
                      }}
                    />
                    <span
                      className="gq-skel block h-2"
                      style={{
                        backgroundColor: brand.neutralColor,
                        width: `${80 - i * 6}%`,
                        animationDelay: `${i * 120 + 60}ms`,
                      }}
                    />
                  </span>
                </div>
              ))}
              <p className="py-5 text-center text-[12px] uppercase" style={{ ...headingFont, ...mutedText, letterSpacing: "0.24em" }}>
                Fetching your notes…
              </p>
            </div>
          ) : status === "error" ? (
            <div className="px-6 py-12 text-center">
              <AlertCircle
                className="mx-auto h-6 w-6"
                style={{ color: brand.accentColor }}
                aria-hidden="true"
              />
              <h3
                className="mt-4 text-[16px] uppercase"
                style={{ ...headingFont, letterSpacing: "0.2em" }}
              >
                Your notes did not come through
              </h3>
              <p
                className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed"
                style={mutedText}
              >
                The server did not answer in time, so nothing is shown rather than something
                half-true. Your notes are safe where you left them.
              </p>
              <Button
                onClick={retry}
                className="gq-btn gq-focus mt-6 rounded-none border-0 px-6 py-3 text-[12px]"
                style={{
                  backgroundColor: brand.primaryColor,
                  color: brand.backgroundColor,
                  fontFamily: brand.fontHeading,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  borderRadius: 0,
                  minHeight: 44,
                }}
              >
                Try loading again
              </Button>
            </div>
          ) : visible.length > 0 ? (
            <ul className="list-none">
              {visible.map((note, i) => (
                <li
                  key={note.id}
                  style={{ borderBottom: i < visible.length - 1 ? "1px solid var(--gq-hair)" : "none" }}
                >
                  <button
                    type="button"
                    data-wf={!q && wireIds[i] ? wireIds[i] : undefined}
                    onClick={openNote}
                    className="gq-row-btn gq-focus gq-enter flex w-full items-start gap-4 px-4 py-5 text-left sm:px-6"
                    style={{ animationDelay: `${Math.min(i, 7) * 45}ms`, minHeight: 44 }}
                  >
                    <span
                      className="mt-[2px] w-7 shrink-0 text-[12px]"
                      style={{ ...num, color: brand.accentColor, letterSpacing: "0.08em" }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span
                          className="text-[16px] sm:text-[17px]"
                          style={{
                            ...headingFont,
                            letterSpacing: "0.06em",
                            fontStyle: note.title ? "normal" : "italic",
                            color: note.title ? brand.primaryColor : "var(--gq-muted)",
                          }}
                        >
                          {note.title ? mark(note.title, note.id + "-t") : "Untitled note"}
                        </span>
                        {!note.title ? (
                          <Badge
                            className="rounded-none px-2 py-[2px] text-[10px] uppercase"
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid var(--gq-accent)",
                              color: brand.accentColor,
                              fontFamily: brand.fontHeading,
                              letterSpacing: "0.2em",
                              borderRadius: 0,
                            }}
                          >
                            No title
                          </Badge>
                        ) : null}
                      </span>
                      <span
                        className="mt-2 block truncate text-[13px] leading-relaxed"
                        style={mutedText}
                      >
                        {mark(snippetFor(note), note.id + "-b")}
                      </span>
                      <span
                        className="mt-2 block text-[12px] sm:hidden"
                        style={{ ...mutedText, ...num }}
                      >
                        Updated {note.updated_label}
                      </span>
                    </span>

                    <span className="hidden shrink-0 items-center gap-3 pt-1 sm:flex">
                      <span className="text-[12px]" style={{ ...mutedText, ...num }}>
                        Updated {note.updated_label}
                      </span>
                      <ChevronRight
                        className="h-4 w-4"
                        style={{ color: brand.accentColor }}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : notes.length > 0 ? (
            /* ── Row 4 ─────────────────────────────────────── */
            <div data-wf="b-3-0" className="gq-enter px-6 py-14 text-center">
              <span
                className="mx-auto mb-5 block h-[9px] w-[9px] rotate-45"
                style={{ backgroundColor: brand.accentColor }}
                aria-hidden="true"
              />
              <h3
                className="text-[15px] uppercase"
                style={{ ...headingFont, letterSpacing: "0.2em" }}
              >
                No matching notes for “{query.trim()}”
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed" style={mutedText}>
                Clear the search box to see all your notes.
              </p>
              <button
                type="button"
                onClick={clearSearch}
                className="gq-ghost gq-focus mt-6 inline-flex items-center gap-2 px-5 py-3 text-[12px] uppercase"
                style={{
                  border: "1px solid var(--gq-hair-strong)",
                  color: brand.primaryColor,
                  fontFamily: brand.fontHeading,
                  letterSpacing: "0.2em",
                  minHeight: 44,
                }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear search
              </button>
            </div>
          ) : (
            /* ── Row 5 ─────────────────────────────────────── */
            <div data-wf="b-4-0" className="px-4 py-10 sm:px-8">
              <span
                className="mx-auto mb-6 block h-[9px] w-[9px] rotate-45"
                style={{ backgroundColor: brand.accentColor }}
                aria-hidden="true"
              />
              <Empty
                className="text-center"
                title="You have no notes yet"
                description="This note space belongs to you alone. Begin with a grocery list, a half-formed idea, or the thing you keep meaning to do."
                action={
                  <Button
                    onClick={() => navigate("note-detail")}
                    className="gq-btn gq-focus rounded-none border-0 px-6 py-3 text-[12px]"
                    style={{
                      backgroundColor: brand.primaryColor,
                      color: brand.backgroundColor,
                      fontFamily: brand.fontHeading,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      borderRadius: 0,
                      minHeight: 44,
                    }}
                  >
                    Create your first note
                  </Button>
                }
              />
            </div>
          )}
        </Frame>

        <Rule className="mt-10" />
        <p
          className="mt-5 text-center text-[11px] uppercase"
          style={{ ...headingFont, ...mutedText, letterSpacing: "0.3em" }}
        >
          Free to use · Yours only · No sharing
        </p>
      </div>
    </div>
  );
}
