// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const PRODUCT = "simple note pad";

// Page canvas: white, as requested, in place of the ivory brand background.
const PAGE_BACKGROUND = "#ffffff";

// Emails that already have an account on the server (AC-002).
const REGISTERED_EMAILS = [
  "daisy.fay@westegg.example",
  "nick.carraway@westegg.example",
  "jordan.baker@westegg.example",
];

const MIN_PASSWORD = 10;

export default function Screen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [taken, setTaken] = React.useState(false);
  const [status, setStatus] = React.useState("idle"); // idle | creating | created

  React.useEffect(() => {
    if (status !== "creating") return undefined;
    const t = window.setTimeout(() => setStatus("created"), 700);
    return () => window.clearTimeout(t);
  }, [status]);

  React.useEffect(() => {
    if (status !== "created") return undefined;
    const t = window.setTimeout(() => navigate("notes"), 900);
    return () => window.clearTimeout(t);
  }, [status]);

  const frame = { border: `1px solid ${brand.accentColor}`, outline: `1px solid ${brand.primaryColor}`, outlineOffset: 3, borderRadius: brand.radius };
  const caps = { fontFamily: brand.fontHeading, textTransform: "uppercase", letterSpacing: "0.3em" };
  const fieldStyle = { border: `1px solid ${brand.accentColor}`, borderRadius: brand.radius, color: brand.primaryColor };
  const labelStyle = { color: brand.neutralColor };
  const rule = (
    <div aria-hidden className="flex items-center gap-3">
      <span className="h-px flex-1" style={{ backgroundColor: brand.accentColor }} />
      <span className="text-xs" style={{ color: brand.accentColor }}>◆</span>
      <span className="h-px flex-1" style={{ backgroundColor: brand.accentColor }} />
    </div>
  );

  const busy = status === "creating" || status === "created";

  function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    const next = {};
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      next.email = "Enter an email address in the form name@example.com.";
    }
    if (password.length < MIN_PASSWORD) {
      next.password = `Use at least ${MIN_PASSWORD} characters — you have ${password.length}.`;
    }
    if (confirm !== password) {
      next.confirm = "The two passwords do not match.";
    }
    const already = !next.email && REGISTERED_EMAILS.includes(trimmed.toLowerCase());
    setErrors(next);
    setTaken(already);
    if (Object.keys(next).length > 0 || already) return;
    setStatus("creating");
  }

  function clearError(key) {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12" style={{ color: brand.primaryColor, fontFamily: brand.fontBody, backgroundColor: PAGE_BACKGROUND }}>
      <style>{`
        .ga-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 2px; }
        .ga-field:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 2px; }
        .ga-enter { animation: gaEnter 260ms ease-out both; }
        @keyframes gaEnter { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .ga-enter { animation: none; }
        }
      `}</style>

      <main className="w-full max-w-md p-10 text-center" style={frame}>
        <p aria-hidden className="text-sm tracking-[0.5em]" style={{ color: brand.accentColor }}>◆ ◆ ◆</p>
        <p className="mt-4 text-[11px] tracking-[0.4em]" style={{ ...caps, color: brand.neutralColor, letterSpacing: "0.4em" }}>{PRODUCT}</p>

        <h1 data-wf="b-0-0" className="mt-3 text-2xl" style={caps}>Create your account</h1>

        <div className="mt-6">{rule}</div>

        <p data-wf="b-1-0" className="mx-auto mt-6 max-w-[42ch] text-sm leading-relaxed" style={{ color: brand.primaryColor }}>
          Your notes are private to you. Sign up with an email address and a password to start a free notepad.
        </p>

        {status === "created" ? (
          <div className="ga-enter mt-8" role="status">
            <p className="text-lg" style={caps}>Account opened</p>
            <p className="mt-3 text-sm" style={{ color: brand.neutralColor }}>
              Taking you to your empty notepad…
            </p>
          </div>
        ) : (
          <form data-wf="b-2-0" className="mt-8 text-left" onSubmit={handleSubmit} noValidate aria-label="Sign up">
            <h2 className="text-[10px]" style={{ ...caps, letterSpacing: "0.35em", color: brand.neutralColor }}>Sign up</h2>

            <div className="mt-5 space-y-5">
              <div className="space-y-2">
                <label htmlFor="ga-email" className="block text-[10px] uppercase tracking-[0.25em]" style={labelStyle}>Email address</label>
                <input
                  data-wf="i-2-0-0"
                  id="ga-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  disabled={busy}
                  aria-invalid={errors.email || taken ? "true" : undefined}
                  aria-describedby={errors.email ? "ga-email-error" : taken ? "b-3-0" : undefined}
                  onChange={(e) => { setEmail(e.target.value); clearError("email"); setTaken(false); }}
                  className="ga-field h-11 w-full bg-transparent px-3 text-center text-sm outline-none disabled:opacity-60"
                  style={fieldStyle}
                />
                {errors.email ? (
                  <p id="ga-email-error" className="ga-enter text-center text-xs" style={{ color: brand.accentColor }}>
                    <span aria-hidden>◆ </span>{errors.email}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="ga-password" className="block text-[10px] uppercase tracking-[0.25em]" style={labelStyle}>Password (at least 10 characters)</label>
                <input
                  data-wf="i-2-0-1"
                  id="ga-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  disabled={busy}
                  aria-invalid={errors.password ? "true" : undefined}
                  aria-describedby={errors.password ? "ga-password-error ga-password-count" : "ga-password-count"}
                  onChange={(e) => { setPassword(e.target.value); clearError("password"); clearError("confirm"); }}
                  className="ga-field h-11 w-full bg-transparent px-3 text-center text-sm outline-none disabled:opacity-60"
                  style={fieldStyle}
                />
                <p id="ga-password-count" className="text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>
                  {password.length} of {MIN_PASSWORD} characters
                </p>
                {errors.password ? (
                  <p id="ga-password-error" className="ga-enter text-center text-xs" style={{ color: brand.accentColor }}>
                    <span aria-hidden>◆ </span>{errors.password}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="ga-confirm" className="block text-[10px] uppercase tracking-[0.25em]" style={labelStyle}>Confirm password</label>
                <input
                  data-wf="i-2-0-2"
                  id="ga-confirm"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  disabled={busy}
                  aria-invalid={errors.confirm ? "true" : undefined}
                  aria-describedby={errors.confirm ? "ga-confirm-error" : undefined}
                  onChange={(e) => { setConfirm(e.target.value); clearError("confirm"); }}
                  className="ga-field h-11 w-full bg-transparent px-3 text-center text-sm outline-none disabled:opacity-60"
                  style={fieldStyle}
                />
                {errors.confirm ? (
                  <p id="ga-confirm-error" className="ga-enter text-center text-xs" style={{ color: brand.accentColor }}>
                    <span aria-hidden>◆ </span>{errors.confirm}
                  </p>
                ) : null}
              </div>
            </div>

            <div data-wf="b-3-0" className="mt-5 min-h-[1.25rem] text-center" aria-live="polite">
              {taken ? (
                <p id="b-3-0" className="ga-enter px-3 py-2 text-xs leading-relaxed" style={{ border: `1px solid ${brand.accentColor}`, color: brand.accentColor, borderRadius: brand.radius }}>
                  <span aria-hidden>◆ </span>That email is already registered. Try logging in instead.
                </p>
              ) : null}
            </div>

            <button
              data-wf="b-4-0"
              type="submit"
              disabled={busy}
              aria-busy={status === "creating" ? "true" : undefined}
              className="ga-focus mt-5 h-12 w-full text-xs transition-opacity duration-200 disabled:opacity-70"
              style={{ ...caps, backgroundColor: brand.primaryColor, color: brand.accentColor, borderRadius: brand.radius }}
            >
              {status === "creating" ? "Creating account…" : "Create account"}
            </button>
          </form>
        )}

        <div className="mt-7">{rule}</div>

        <p className="mt-6 text-[10px] uppercase tracking-[0.25em]" style={{ color: brand.neutralColor }}>
          Already have an account?{" "}
          <button
            data-wf="b-5-0"
            type="button"
            onClick={() => navigate("login")}
            className="ga-focus underline underline-offset-4"
            style={{ color: brand.accentColor }}
          >
            Log in
          </button>
        </p>
      </main>
    </div>
  );
}
