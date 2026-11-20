// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Clock, Trash, AlertCircle, CheckCircle } = Icons;

const ACCOUNT = {
  name: "Sam Rivera",
  email: "sam.rivera@example.com",
  memberSince: "4 March 2026",
  noteCount: 12,
  sessionExpires: "21 November 2026, 11:04 PM",
  lastSync: "20 November 2026 at 11:04 PM",
  device: "Chrome on macOS · this device",
};

const SURFACE = "rgba(255,255,255,0.45)";
const SURFACE_DEEP = "rgba(255,255,255,0.7)";
const INK_SOFT = "rgba(18,32,28,0.72)";
const HAIRLINE = "rgba(18,32,28,0.14)";

// Double rule broken by a centre diamond — the house ornament.
const Rule = (props) => (
  <div aria-hidden="true" className={"flex items-center justify-center gap-4 " + (props.className || "")}>
    <span className="flex-1 flex flex-col gap-[3px]">
      <span className="block h-px w-full" style={{ backgroundColor: brand.accentColor, opacity: 0.7 }} />
      <span className="block h-px w-full" style={{ backgroundColor: brand.primaryColor, opacity: 0.35 }} />
    </span>
    <span
      className="block shrink-0"
      style={{ width: 8, height: 8, transform: "rotate(45deg)", backgroundColor: brand.accentColor }}
    />
    <span className="flex-1 flex flex-col gap-[3px]">
      <span className="block h-px w-full" style={{ backgroundColor: brand.accentColor, opacity: 0.7 }} />
      <span className="block h-px w-full" style={{ backgroundColor: brand.primaryColor, opacity: 0.35 }} />
    </span>
  </div>
);

// Signature frame: gold inner hairline, black hairline offset outside it.
const Frame = (props) => (
  <div
    className={props.className || ""}
    style={{ border: "1px solid " + brand.primaryColor, padding: 4, borderRadius: brand.radius }}
  >
    <div
      style={{
        border: "1px solid " + brand.accentColor,
        backgroundColor: props.surface || SURFACE,
        borderRadius: brand.radius,
      }}
    >
      {props.children}
    </div>
  </div>
);

export default function Screen() {
  const navigate = useNavigate();
  const [syncState, setSyncState] = React.useState("syncing");
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const deleteTriggerRef = React.useRef(null);
  const confirmRef = React.useRef(null);
  const cancelRef = React.useRef(null);
  const dialogRef = React.useRef(null);

  React.useEffect(() => {
    const t = window.setTimeout(() => setSyncState("synced"), 1800);
    return () => window.clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (!confirmOpen) return;
    const t = window.setTimeout(() => {
      if (cancelRef.current) cancelRef.current.focus();
    }, 20);
    return () => window.clearTimeout(t);
  }, [confirmOpen]);

  const logOutTimer = React.useRef(null);
  const deleteTimer = React.useRef(null);
  React.useEffect(
    () => () => {
      if (logOutTimer.current) window.clearTimeout(logOutTimer.current);
      if (deleteTimer.current) window.clearTimeout(deleteTimer.current);
    },
    []
  );

  const busy = loggingOut || deleting;

  const handleLogOut = () => {
    if (busy) return;
    setLoggingOut(true);
    logOutTimer.current = window.setTimeout(() => navigate("login"), 900);
  };

  const closeDialog = () => {
    if (deleting) return;
    setConfirmOpen(false);
    if (deleteTriggerRef.current) deleteTriggerRef.current.focus();
  };

  const handleDelete = () => {
    if (deleting) return;
    setDeleting(true);
    deleteTimer.current = window.setTimeout(() => navigate("login"), 1500);
  };

  const onDialogKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeDialog();
      return;
    }
    if (e.key !== "Tab") return;
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

  const capsHeading = {
    fontFamily: brand.fontHeading,
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: brand.primaryColor,
  };

  return (
    <div
      className="w-full px-4 py-10 sm:px-8 sm:py-14"
      style={{ fontFamily: brand.fontBody, color: brand.primaryColor, backgroundColor: brand.backgroundColor }}
    >
      <style>{`
        .gz-focus:focus-visible { outline: 2px solid ${brand.accentColor}; outline-offset: 3px; }
        .gz-enter { animation: gz-fade-up .5s ease-out both; }
        .gz-veil { animation: gz-veil .18s ease-out both; }
        .gz-dialog { animation: gz-dialog .24s cubic-bezier(.2,.8,.2,1) both; }
        .gz-pulse { animation: gz-pulse 1.2s ease-in-out infinite; }
        .gz-swap { animation: gz-fade-up .4s ease-out both; }
        @keyframes gz-fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes gz-veil { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gz-dialog { from { opacity: 0; transform: translateY(10px) scale(.975); } to { opacity: 1; transform: none; } }
        @keyframes gz-pulse { 0%,100% { opacity: .35; transform: rotate(45deg) scale(.82); } 50% { opacity: 1; transform: rotate(45deg) scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .gz-enter, .gz-veil, .gz-dialog, .gz-pulse, .gz-swap { animation: none !important; }
          .gz-trans { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-2xl gz-enter">
        {/* ── Account ─────────────────────────────────────────────── */}
        <header data-wf="b-0-0" className="text-center">
          <p
            className="text-[11px]"
            style={{ ...capsHeading, color: brand.accentColor, letterSpacing: "0.42em" }}
          >
            Notepad
          </p>
          <h1 className="mt-4 text-[32px] leading-tight sm:text-[38px]" style={capsHeading}>
            Account
          </h1>
          <Rule className="mt-6" />
        </header>

        <Frame className="mt-8">
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {/* ── Signed in as ──────────────────────────────────── */}
            <section data-wf="b-1-0" className="text-center">
              <h2 className="text-[11px]" style={{ ...capsHeading, letterSpacing: "0.34em", color: INK_SOFT }}>
                Signed in as
              </h2>
              <p
                className="mt-3 break-words text-[20px] sm:text-[23px]"
                style={{ fontFamily: brand.fontHeading, letterSpacing: "0.05em", color: brand.primaryColor }}
              >
                {ACCOUNT.email}
              </p>
              <p
                className="mx-auto mt-4 max-w-[58ch] text-[15px] leading-relaxed"
                style={{ color: INK_SOFT, fontVariantNumeric: "tabular-nums" }}
              >
                Member since {ACCOUNT.memberSince}. Notepad is free to use — there are no plans or payments.
              </p>

              <dl
                className="mx-auto mt-7 grid max-w-md grid-cols-1 gap-px sm:grid-cols-2"
                style={{ backgroundColor: HAIRLINE, border: "1px solid " + HAIRLINE }}
              >
                <div className="px-4 py-4" style={{ backgroundColor: SURFACE_DEEP }}>
                  <dt className="text-[10px]" style={{ ...capsHeading, letterSpacing: "0.3em", color: INK_SOFT }}>
                    Notes on file
                  </dt>
                  <dd
                    className="mt-2 text-[26px] leading-none"
                    style={{
                      fontFamily: brand.fontHeading,
                      color: brand.accentColor,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {ACCOUNT.noteCount}
                  </dd>
                </div>
                <div className="px-4 py-4" style={{ backgroundColor: SURFACE_DEEP }}>
                  <dt className="text-[10px]" style={{ ...capsHeading, letterSpacing: "0.3em", color: INK_SOFT }}>
                    Session expires
                  </dt>
                  <dd
                    className="mt-2 text-[14px] leading-snug"
                    style={{ color: brand.primaryColor, fontVariantNumeric: "tabular-nums" }}
                  >
                    {ACCOUNT.sessionExpires}
                  </dd>
                </div>
              </dl>

              <p
                key={syncState}
                className="gz-swap mt-5 flex items-center justify-center gap-2 text-[13px]"
                style={{ color: INK_SOFT, fontVariantNumeric: "tabular-nums" }}
                aria-live="polite"
              >
                {syncState === "syncing" ? (
                  <React.Fragment>
                    <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Syncing 1 note to the server — hold on before logging out.</span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <CheckCircle className="h-4 w-4 shrink-0" style={{ color: brand.accentColor }} aria-hidden="true" />
                    <span>All 12 notes synced · {ACCOUNT.lastSync}</span>
                  </React.Fragment>
                )}
              </p>
            </section>

            {/* ── Log out (primary action) ──────────────────────── */}
            <div data-wf="b-2-0" className="mt-9 flex flex-col items-center">
              <Button
                type="button"
                onClick={handleLogOut}
                disabled={busy}
                aria-busy={loggingOut ? "true" : "false"}
                className="gz-focus gz-trans w-full max-w-sm min-h-[52px] px-8 text-[12px] transition-opacity duration-200"
                style={{
                  backgroundColor: brand.primaryColor,
                  color: brand.backgroundColor,
                  border: "1px solid " + brand.accentColor,
                  outline: "1px solid " + brand.primaryColor,
                  outlineOffset: "4px",
                  borderRadius: brand.radius,
                  fontFamily: brand.fontHeading,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  opacity: busy ? 0.6 : 1,
                  cursor: busy ? "not-allowed" : "pointer",
                }}
              >
                {loggingOut ? (
                  <span className="flex items-center justify-center gap-3">
                    <span
                      className="gz-pulse block"
                      style={{ width: 8, height: 8, backgroundColor: brand.backgroundColor }}
                      aria-hidden="true"
                    />
                    Ending session
                  </span>
                ) : (
                  "Log out"
                )}
              </Button>
              <p className="mt-4 max-w-[52ch] text-center text-[13px]" style={{ color: INK_SOFT }}>
                {loggingOut
                  ? "Closing your session on this device. Your notes stay safe on the server."
                  : "Ends this session on " + ACCOUNT.device + ". You will need your password to get back in."}
              </p>
            </div>

            <Rule className="my-10" />

            {/* ── Delete account ────────────────────────────────── */}
            <section className="text-center">
              <h2 data-wf="b-3-0" className="text-[20px] sm:text-[23px]" style={capsHeading}>
                Delete account
              </h2>

              <p
                data-wf="b-4-0"
                className="mx-auto mt-4 max-w-[60ch] text-[15px] leading-relaxed"
                style={{ color: INK_SOFT }}
              >
                Deleting your account permanently removes all{" "}
                <span
                  style={{
                    fontFamily: brand.fontHeading,
                    color: brand.accentColor,
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "17px",
                  }}
                >
                  12
                </span>{" "}
                of your notes from the server and ends your sessions on every device.
              </p>

              <div data-wf="b-5-0" className="mt-7 flex flex-col items-center">
                <Button
                  type="button"
                  ref={deleteTriggerRef}
                  onClick={() => setConfirmOpen(true)}
                  disabled={busy}
                  aria-haspopup="dialog"
                  aria-expanded={confirmOpen ? "true" : "false"}
                  className="gz-focus gz-trans min-h-[48px] px-7 text-[11px] transition-colors duration-200"
                  style={{
                    backgroundColor: "transparent",
                    color: brand.accentColor,
                    border: "1px solid " + brand.accentColor,
                    borderRadius: brand.radius,
                    fontFamily: brand.fontHeading,
                    textTransform: "uppercase",
                    letterSpacing: "0.26em",
                    opacity: busy ? 0.55 : 1,
                    cursor: busy ? "not-allowed" : "pointer",
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <Trash className="h-4 w-4" aria-hidden="true" />
                    Delete my account and notes
                  </span>
                </Button>
                <p className="mt-4 max-w-[52ch] text-center text-[13px]" style={{ color: INK_SOFT }}>
                  This cannot be undone. Nothing is deleted until you confirm on the next step.
                </p>
              </div>
            </section>
          </div>
        </Frame>
      </div>

      {/* ── Confirmation dialog ───────────────────────────────── */}
      {confirmOpen ? (
        <div
          data-wf="b-6-0"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          onKeyDown={onDialogKeyDown}
        >
          <div
            className="gz-veil absolute inset-0"
            style={{ backgroundColor: "rgba(18,32,28,0.66)" }}
            aria-hidden="true"
            onClick={closeDialog}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gz-del-title"
            aria-describedby="gz-del-desc"
            className="gz-dialog relative w-full max-w-lg"
            style={{ boxShadow: "0 24px 60px rgba(18,32,28,0.45)" }}
          >
            <Frame surface={brand.backgroundColor}>
              <div className="px-6 py-8 text-center sm:px-10">
                <span
                  className="mx-auto block"
                  style={{ width: 10, height: 10, transform: "rotate(45deg)", backgroundColor: brand.accentColor }}
                  aria-hidden="true"
                />
                <h2 id="gz-del-title" className="mt-6 text-[19px] leading-snug sm:text-[22px]" style={capsHeading}>
                  Permanently delete your account?
                </h2>
                <Rule className="my-6" />
                <p
                  data-wf="i-6-0-0"
                  id="gz-del-desc"
                  className="mx-auto max-w-[52ch] text-[15px] leading-relaxed"
                  style={{ color: INK_SOFT }}
                >
                  Your account and all your notes will be removed and you will not be able to log in again.
                </p>

                <p
                  className="mt-5 flex items-center justify-center gap-2 text-[13px]"
                  style={{ color: brand.accentColor, fontVariantNumeric: "tabular-nums" }}
                >
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {deleting
                      ? "Removing 12 notes and closing every session…"
                      : "12 notes · " + ACCOUNT.email + " · no recovery"}
                  </span>
                </p>

                <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:justify-center">
                  <Button
                    type="button"
                    data-wf="i-6-0-2"
                    ref={cancelRef}
                    onClick={closeDialog}
                    disabled={deleting}
                    className="gz-focus gz-trans min-h-[48px] px-7 text-[11px] transition-opacity duration-200"
                    style={{
                      backgroundColor: "transparent",
                      color: brand.primaryColor,
                      border: "1px solid " + brand.primaryColor,
                      borderRadius: brand.radius,
                      fontFamily: brand.fontHeading,
                      textTransform: "uppercase",
                      letterSpacing: "0.24em",
                      opacity: deleting ? 0.5 : 1,
                      cursor: deleting ? "not-allowed" : "pointer",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    data-wf="i-6-0-1"
                    ref={confirmRef}
                    onClick={handleDelete}
                    disabled={deleting}
                    aria-busy={deleting ? "true" : "false"}
                    className="gz-focus gz-trans min-h-[48px] px-7 text-[11px] transition-opacity duration-200"
                    style={{
                      backgroundColor: brand.accentColor,
                      color: brand.backgroundColor,
                      border: "1px solid " + brand.primaryColor,
                      borderRadius: brand.radius,
                      fontFamily: brand.fontHeading,
                      textTransform: "uppercase",
                      letterSpacing: "0.24em",
                      opacity: deleting ? 0.75 : 1,
                      cursor: deleting ? "not-allowed" : "pointer",
                    }}
                  >
                    {deleting ? (
                      <span className="flex items-center justify-center gap-3">
                        <span
                          className="gz-pulse block"
                          style={{ width: 8, height: 8, backgroundColor: brand.backgroundColor }}
                          aria-hidden="true"
                        />
                        Deleting everything
                      </span>
                    ) : (
                      "Yes, delete everything"
                    )}
                  </Button>
                </div>

                <p className="mt-6 text-[12px]" style={{ color: INK_SOFT }}>
                  Press Esc to keep your account.
                </p>
              </div>
            </Frame>
          </div>
        </div>
      ) : null}
    </div>
  );
}
