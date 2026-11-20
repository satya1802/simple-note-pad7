// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { X, ChevronRight, Clock, AlertCircle, CheckCircle } = Icons;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LAST_SESSION = {
  signedOut: "18 Nov 2026, 09:42",
  device: "Chrome on macOS",
  lifetime: "14 days",
};

const RGB = (hex) => {
  const h = String(hex || "#000000").replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const alpha = (hex, a) => {
  const [r, g, b] = RGB(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const mix = (a, b, t) => {
  const A = RGB(a);
  const B = RGB(b);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)}, ${Math.round(
    A[1] + (B[1] - A[1]) * t
  )}, ${Math.round(A[2] + (B[2] - A[2]) * t)})`;
};

const Diamond = ({ size = 7, color, hollow = false }) => (
  <span
    aria-hidden="true"
    className="inline-block shrink-0"
    style={{
      width: size,
      height: size,
      transform: "rotate(45deg)",
      backgroundColor: hollow ? "transparent" : color,
      border: hollow ? `1px solid ${color}` : "none",
    }}
  />
);

const DecoRule = ({ line, gem }) => (
  <div aria-hidden="true" className="flex items-center gap-3 w-full">
    <span className="flex-1 flex flex-col gap-[3px]">
      <span className="block h-px w-full" style={{ backgroundColor: line }} />
      <span className="block h-px w-full" style={{ backgroundColor: line }} />
    </span>
    <span className="flex items-center gap-[5px]">
      <Diamond size={5} color={gem} hollow />
      <Diamond size={8} color={gem} />
      <Diamond size={5} color={gem} hollow />
    </span>
    <span className="flex-1 flex flex-col gap-[3px]">
      <span className="block h-px w-full" style={{ backgroundColor: line }} />
      <span className="block h-px w-full" style={{ backgroundColor: line }} />
    </span>
  </div>
);

export default function Screen() {
  const navigate = useNavigate();
  const P = brand.primaryColor;
  const A = brand.accentColor;
  const N = brand.neutralColor;
  const BG = brand.backgroundColor;

  const ink = P;
  const inkSoft = alpha(P, 0.72);
  const hairline = alpha(P, 0.18);
  const field = alpha(N, 0.1);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // idle | submitting | error | success
  const [errorKind, setErrorKind] = React.useState(null); // credentials | network
  const [attempts, setAttempts] = React.useState(0);
  const [noticeOpen, setNoticeOpen] = React.useState(true);
  const [resetOpen, setResetOpen] = React.useState(false);
  const [capsOn, setCapsOn] = React.useState(false);

  const timers = React.useRef([]);
  React.useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    },
    []
  );
  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const busy = status === "submitting" || status === "success";

  const handleCaps = (e) => {
    if (typeof e.getModifierState === "function") {
      setCapsOn(e.getModifierState("CapsLock"));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (busy) return;

    const next = {};
    if (!email.trim()) {
      next.email = "Enter the email address on your account.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "That address is missing an @ or a domain.";
    }
    if (!password) next.password = "Enter your password.";

    setFieldErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      setErrorKind(null);
      return;
    }

    setStatus("submitting");
    setErrorKind(null);

    later(() => {
      const addr = email.trim().toLowerCase();
      if (addr.endsWith(".test") || addr.endsWith(".invalid")) {
        setStatus("error");
        setErrorKind("network");
        return;
      }
      if (password.length < 8) {
        setStatus("error");
        setErrorKind("credentials");
        setAttempts((a) => a + 1);
        return;
      }
      setStatus("success");
      later(() => navigate("notes"), 760);
    }, 900);
  };

  const css = `
.gz :focus-visible { outline: 2px solid var(--gz-accent); outline-offset: 3px; }
.gz-input { transition: border-color .18s ease, background-color .18s ease; }
.gz-input:hover:not(:disabled) { border-color: var(--gz-ink-50); }
.gz-btn { transition: background-color .18s ease, transform .1s ease; }
.gz-btn:not(:disabled):hover { background-color: var(--gz-lift); }
.gz-btn:not(:disabled):active { transform: translateY(1px); }
.gz-btn:disabled { cursor: progress; }
.gz-link { transition: color .15s ease; }
.gz-link:hover { color: var(--gz-accent); }
@keyframes gz-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes gz-spin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
.gz-rise { animation: gz-rise .3s ease-out both; }
.gz-spin { animation: gz-spin 1.2s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .gz-rise, .gz-spin { animation: none !important; }
  .gz-btn, .gz-input, .gz-link { transition: none !important; }
}`;

  const corner = (pos) => (
    <span
      aria-hidden="true"
      className={"absolute " + pos}
      style={{
        width: 7,
        height: 7,
        transform: "rotate(45deg)",
        backgroundColor: A,
      }}
    />
  );

  return (
    <div
      className="gz min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16"
      style={{
        backgroundColor: BG,
        fontFamily: brand.fontBody,
        color: ink,
        "--gz-accent": A,
        "--gz-ink-50": alpha(P, 0.5),
        "--gz-lift": mix(P, BG, 0.16),
      }}
    >
      <style>{css}</style>

      <div className="w-full max-w-[560px]">
        {/* Wordmark */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Diamond size={6} color={A} />
            <span
              className="text-[13px] sm:text-sm"
              style={{
                fontFamily: brand.fontHeading,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: ink,
                paddingLeft: "0.42em",
              }}
            >
              Notepad
            </span>
            <Diamond size={6} color={A} />
          </div>
          <span
            className="text-[11px]"
            style={{
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: inkSoft,
            }}
          >
            Private notes, kept server-side
          </span>
        </div>

        {/* Signature double frame */}
        <div style={{ border: `1px solid ${P}`, padding: 6 }}>
          <div
            className="relative px-5 py-8 sm:px-10 sm:py-10"
            style={{ border: `1px solid ${A}`, backgroundColor: alpha(BG, 0.6) }}
          >
            {corner("-top-[4px] -left-[4px]")}
            {corner("-top-[4px] -right-[4px]")}
            {corner("-bottom-[4px] -left-[4px]")}
            {corner("-bottom-[4px] -right-[4px]")}

            {/* b-0-0 */}
            <h1
              data-wf="b-0-0"
              className="text-center text-[25px] leading-tight sm:text-[32px]"
              style={{
                fontFamily: brand.fontHeading,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                paddingLeft: "0.14em",
                color: ink,
              }}
            >
              Log in to Notepad
            </h1>

            <div className="mt-6">
              <DecoRule line={alpha(P, 0.35)} gem={A} />
            </div>

            {/* b-1-0 — expired session notice */}
            <div data-wf="b-1-0" className="mt-6">
              {noticeOpen ? (
                <div
                  className="gz-rise relative px-4 py-4 sm:px-8"
                  style={{
                    border: `1px solid ${alpha(P, 0.25)}`,
                    backgroundColor: field,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setNoticeOpen(false)}
                    aria-label="Dismiss the expired session notice"
                    className="absolute right-1 top-1 inline-flex h-9 w-9 items-center justify-center"
                    style={{ color: inkSoft }}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Clock className="h-4 w-4" aria-hidden="true" style={{ color: A }} />
                    <p
                      className="text-[14px] leading-6 max-w-[42ch]"
                      style={{ color: ink }}
                    >
                      Your session has expired. Please log in again to see your notes.
                    </p>
                    <p
                      className="text-[11px]"
                      style={{
                        color: inkSoft,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      Signed out {LAST_SESSION.signedOut} · {LAST_SESSION.device} · Sessions
                      last {LAST_SESSION.lifetime}
                    </p>
                  </div>
                </div>
              ) : (
                <p
                  className="text-center text-[12px]"
                  style={{ color: inkSoft, fontVariantNumeric: "tabular-nums" }}
                >
                  Last session ended {LAST_SESSION.signedOut} · {LAST_SESSION.device}
                </p>
              )}
            </div>

            <form onSubmit={onSubmit} noValidate className="mt-7">
              {/* b-2-0 — the log in form */}
              <fieldset data-wf="b-2-0" className="m-0 border-0 p-0" disabled={busy}>
                <legend
                  className="mx-auto px-3 text-center text-[11px]"
                  style={{
                    fontFamily: brand.fontHeading,
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: A,
                    paddingLeft: "0.3em",
                  }}
                >
                  Log in
                </legend>

                <div className="mt-5 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="login-email"
                      className="text-[11px]"
                      style={{
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        color: inkSoft,
                      }}
                    >
                      Email address
                    </Label>
                    <Input
                      data-wf="i-2-0-0"
                      id="login-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="off"
                      spellCheck="false"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email)
                          setFieldErrors((f) => ({ ...f, email: undefined }));
                      }}
                      aria-invalid={fieldErrors.email ? "true" : undefined}
                      aria-describedby={
                        fieldErrors.email ? "login-email-error" : undefined
                      }
                      className="gz-input h-12 w-full px-4 text-[15px]"
                      style={{
                        borderRadius: 0,
                        border: `1px solid ${
                          fieldErrors.email ? A : alpha(P, 0.3)
                        }`,
                        backgroundColor: field,
                        color: ink,
                        fontFamily: brand.fontBody,
                      }}
                    />
                    {fieldErrors.email ? (
                      <p
                        id="login-email-error"
                        className="gz-rise flex items-center gap-2 text-[12px]"
                        style={{ color: A }}
                      >
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="login-password"
                      className="text-[11px]"
                      style={{
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        color: inkSoft,
                      }}
                    >
                      Password
                    </Label>
                    <Input
                      data-wf="i-2-0-1"
                      id="login-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password)
                          setFieldErrors((f) => ({ ...f, password: undefined }));
                      }}
                      onKeyUp={handleCaps}
                      onKeyDown={handleCaps}
                      aria-invalid={fieldErrors.password ? "true" : undefined}
                      aria-describedby={
                        [
                          fieldErrors.password ? "login-password-error" : null,
                          capsOn ? "login-caps-hint" : null,
                        ]
                          .filter(Boolean)
                          .join(" ") || undefined
                      }
                      className="gz-input h-12 w-full px-4 text-[15px]"
                      style={{
                        borderRadius: 0,
                        border: `1px solid ${
                          fieldErrors.password ? A : alpha(P, 0.3)
                        }`,
                        backgroundColor: field,
                        color: ink,
                        fontFamily: brand.fontBody,
                        letterSpacing: "0.08em",
                      }}
                    />
                    {fieldErrors.password ? (
                      <p
                        id="login-password-error"
                        className="gz-rise flex items-center gap-2 text-[12px]"
                        style={{ color: A }}
                      >
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {fieldErrors.password}
                      </p>
                    ) : null}
                    {capsOn ? (
                      <p
                        id="login-caps-hint"
                        className="gz-rise text-[12px]"
                        style={{ color: inkSoft }}
                      >
                        Caps lock is on — passwords are case sensitive.
                      </p>
                    ) : null}
                  </div>
                </div>
              </fieldset>

              {/* b-3-0 — sign-in result message */}
              <div
                data-wf="b-3-0"
                role="status"
                aria-live="polite"
                className="mt-5 empty:mt-0"
              >
                {status === "error" && errorKind === "credentials" ? (
                  <div
                    className="gz-rise flex flex-col items-center gap-2 px-4 py-4 text-center"
                    style={{
                      border: `1px solid ${alpha(A, 0.55)}`,
                      backgroundColor: alpha(A, 0.08),
                    }}
                  >
                    <span className="flex items-center gap-2" style={{ color: A }}>
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      <span
                        className="text-[13px]"
                        style={{
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          fontFamily: brand.fontHeading,
                        }}
                      >
                        Not signed in
                      </span>
                    </span>
                    <p className="text-[14px] leading-6" style={{ color: ink }}>
                      Email or password is incorrect.
                    </p>
                    {attempts >= 3 ? (
                      <p
                        className="text-[12px]"
                        style={{ color: inkSoft, fontVariantNumeric: "tabular-nums" }}
                      >
                        {attempts} attempts missed. Your email is still in the field — check
                        caps lock, or use the reset link below.
                      </p>
                    ) : (
                      <p className="text-[12px]" style={{ color: inkSoft }}>
                        Your email is kept in the field. Try the password again.
                      </p>
                    )}
                  </div>
                ) : null}

                {status === "error" && errorKind === "network" ? (
                  <div
                    className="gz-rise flex flex-col items-center gap-2 px-4 py-4 text-center"
                    style={{
                      border: `1px solid ${alpha(P, 0.4)}`,
                      backgroundColor: field,
                    }}
                  >
                    <span className="flex items-center gap-2" style={{ color: ink }}>
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      <span
                        className="text-[13px]"
                        style={{
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          fontFamily: brand.fontHeading,
                        }}
                      >
                        Notepad is out of reach
                      </span>
                    </span>
                    <p className="text-[14px] leading-6" style={{ color: ink }}>
                      We couldn't reach the note server, so the sign-in never went through.
                      Nothing you typed was lost — press Log in to try the connection again.
                    </p>
                  </div>
                ) : null}

                {status === "success" ? (
                  <div
                    className="gz-rise flex items-center justify-center gap-2 px-4 py-3 text-center"
                    style={{
                      border: `1px solid ${alpha(P, 0.4)}`,
                      backgroundColor: field,
                    }}
                  >
                    <CheckCircle className="h-4 w-4" aria-hidden="true" style={{ color: A }} />
                    <p className="text-[13px]" style={{ color: ink }}>
                      Session opened. Taking you to your notes.
                    </p>
                  </div>
                ) : null}
              </div>

              {/* b-4-0 — primary action */}
              <div className="mt-7">
                <Button
                  data-wf="b-4-0"
                  type="submit"
                  disabled={busy}
                  aria-busy={status === "submitting" ? "true" : undefined}
                  className="gz-btn flex h-14 w-full items-center justify-center gap-3 text-[13px]"
                  style={{
                    backgroundColor: busy ? mix(P, BG, 0.18) : P,
                    color: BG,
                    borderRadius: 0,
                    border: `1px solid ${A}`,
                    boxShadow: `0 0 0 3px ${BG}, 0 0 0 4px ${P}`,
                    fontFamily: brand.fontHeading,
                    textTransform: "uppercase",
                    letterSpacing: "0.26em",
                    paddingLeft: "0.26em",
                  }}
                >
                  {status === "submitting" ? (
                    <>
                      <span
                        className="gz-spin inline-block"
                        aria-hidden="true"
                        style={{
                          width: 9,
                          height: 9,
                          border: `1px solid ${BG}`,
                        }}
                      />
                      Opening
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle className="h-4 w-4" aria-hidden="true" />
                      Signed in
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>
                <p
                  className="mt-3 text-center text-[11px]"
                  style={{
                    color: inkSoft,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Stays signed in for {LAST_SESSION.lifetime}, then asks again
                </p>
              </div>
            </form>

            <div className="mt-8">
              <DecoRule line={alpha(P, 0.25)} gem={alpha(A, 0.8)} />
            </div>

            {/* Row 6 — b-5-0 / b-5-1 */}
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div data-wf="b-5-0" className="flex justify-center sm:justify-end sm:pr-6">
                  <button
                    type="button"
                    className="gz-link inline-flex min-h-[44px] items-center text-[13px] underline underline-offset-4"
                    style={{ color: ink, textDecorationColor: alpha(A, 0.6) }}
                    aria-expanded={resetOpen}
                    aria-controls="reset-help"
                    onClick={() => setResetOpen((v) => !v)}
                  >
                    Forgot your password?
                  </button>
                </div>
                <div
                  data-wf="b-5-1"
                  className="flex justify-center border-t sm:justify-start sm:border-l sm:border-t-0 sm:pl-6"
                  style={{ borderColor: hairline }}
                >
                  <button
                    type="button"
                    className="gz-link inline-flex min-h-[44px] items-center gap-2 text-[13px] underline underline-offset-4"
                    style={{ color: ink, textDecorationColor: alpha(A, 0.6) }}
                    onClick={() => navigate("sign-up")}
                  >
                    Create an account
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {resetOpen ? (
                <div
                  id="reset-help"
                  className="gz-rise mt-4 px-4 py-4 text-center"
                  style={{
                    border: `1px solid ${alpha(P, 0.22)}`,
                    backgroundColor: field,
                  }}
                >
                  <p
                    className="text-[11px]"
                    style={{
                      fontFamily: brand.fontHeading,
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: A,
                      paddingLeft: "0.22em",
                    }}
                  >
                    Reset by email
                  </p>
                  <p
                    className="mx-auto mt-2 max-w-[46ch] text-[13px] leading-6"
                    style={{ color: ink }}
                  >
                    A reset link is sent to the address on your account and stays valid for
                    30 minutes. Write to help@notepad.app from that address and we'll send a
                    fresh one.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <p
          className="mx-auto mt-8 max-w-[52ch] text-center text-[12px] leading-6"
          style={{ color: inkSoft }}
        >
          Every note belongs to the account that wrote it. Notepad has no sharing and no
          collaborators, and nothing is shown without a valid session.
        </p>
      </div>
    </div>
  );
}
