import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NeonBackground } from "@/components/NeonBackground";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SuccessModal } from "@/components/SuccessModal";
import { ProblemsGrid } from "@/components/ProblemsGrid";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { translations, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Rank — The Future of AI Ranking is Coming" },
      {
        name: "description",
        content:
          "Join the AI Rank waitlist and get the exclusive launch link delivered to your inbox.",
      },
      { property: "og:title", content: "AI Rank — Waitlist" },
      {
        property: "og:description",
        content: "Be the first to rank, benchmark and dominate the AI landscape.",
      },
    ],
  }),
  component: Landing,
});

/* ── Icons — shared, no theme dependency ── */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function Landing() {
  const [lang, setLang]       = useState<Lang>("en");
  const [modalOpen, setModal] = useState(false);
  const [isDark, setIsDark]   = useState(true);
  const [slotsLeft]           = useState(312);


  const t = translations[lang];

  /* ── html attributes ── */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir  = t.dir;
  }, [lang, t.dir]);

  /* ── restore saved theme ── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("airank-theme");
      if (saved) setIsDark(saved === "dark");
    } catch {}
  }, []);

  /* ── theme toggle ── */
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("airank-theme", next ? "dark" : "light"); } catch {}
  };

  /* ── lang toggle ── */
  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));

  /* ────────────────────────────────────────────────────────────────
     Semantic design tokens — ALL theme variance lives here.
     The JSX below references only these variables; never raw isDark ternaries.
  ──────────────────────────────────────────────────────────────── */
  const tok = {
    // Brand accent
    accent:       isDark ? "#CCFF00"                   : "#3D5A00",
    accentGlow:   isDark ? "rgba(204,255,0,0.45)"      : "rgba(61,90,0,0.28)",

    // Accent gradient (headline_b)
    accentGradient: isDark
      ? "linear-gradient(120deg, #B8FF00, #CCFF00 45%, #AAEE00)"
      : "linear-gradient(120deg, #2E4500, #3D5A00 45%, #2A4000)",
    accentFilter: isDark
      ? "drop-shadow(0 0 24px rgba(204,255,0,0.45))"
      : "drop-shadow(0 0 14px rgba(61,90,0,0.28))",

    // Pill / badge borders & backgrounds
    accentBorder: isDark ? "rgba(204,255,0,0.35)"      : "rgba(61,90,0,0.30)",
    accentBg:     isDark ? "rgba(204,255,0,0.10)"      : "rgba(61,90,0,0.07)",

    // Nav
    navGlass: isDark
      ? { background: "transparent" }
      : {
          background:          "rgba(255,255,255,0.75)",
          backdropFilter:      "blur(14px)",
          WebkitBackdropFilter:"blur(14px)",
          borderBottom:        "1px solid rgba(0,0,0,0.06)",
        },
    navItemBg:    isDark ? "rgba(8,9,12,0.75)"         : "rgba(255,255,255,0.82)",

    // Logo badge glow
    logoBadgeShadow: isDark
      ? "0 0 18px rgba(204,255,0,0.35)"
      : "0 0 14px rgba(61,90,0,0.18)",

    // Logo wordmark — crisp white glow dark / solid deep black light
    logoWordColor:  isDark ? "#FFFFFF"                     : "#0a0a0a",
    logoWordShadow: isDark ? "0 0 22px rgba(255,255,255,0.13)" : "none",
  };

  return (
    <div dir={t.dir} className="relative min-h-screen overflow-x-hidden text-foreground">
      <NeonBackground isDark={isDark} />

      {/* ══════════════════════════ NAV ══════════════════════════ */}
      <header
        className="relative z-20 w-full transition-all duration-300"
        style={tok.navGlass}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">

          {/* Logo */}
          <a href="/" className="group flex items-center gap-3">
            <span
              className="relative flex h-11 w-11 items-center justify-center rounded-xl
                         transition-transform duration-200 group-hover:scale-105"
              style={{
                border:     `1px solid ${tok.accentBorder}`,
                background: tok.navItemBg,
                boxShadow:  tok.logoBadgeShadow,
              }}
            >
              <img src="/ai-rank-logo.png" alt="AI Rank" className="h-8 w-8 object-contain" />
            </span>
            <span
              className="font-display text-[17px] font-bold"
              style={{
                color:       tok.logoWordColor,
                textShadow:  tok.logoWordShadow,
                letterSpacing: "-0.01em",
              }}
            >
              Ai<span style={{ color: tok.accent }}>Rank</span>
            </span>
          </a>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full
                         transition-all duration-200"
              style={{
                border:     `1px solid ${tok.accentBorder}`,
                background: tok.navItemBg,
                color:      tok.accent,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = tok.accentBg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = tok.navItemBg)}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-2 rounded-full px-4 py-2
                         text-xs font-semibold uppercase tracking-widest
                         transition-all duration-200"
              style={{
                border:     `1px solid ${tok.accentBorder}`,
                background: tok.navItemBg,
                color:      tok.accent,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = tok.accentBg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = tok.navItemBg)}
            >
              <GlobeIcon />
              {t.nav_lang}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center
                       px-4 pb-12 pt-10 text-center
                       sm:px-6 sm:pt-16
                       lg:px-8 lg:pt-20">

        {/* Hype badge — orange accent, identical padding in both modes */}
        <div
          className="animate-rise mb-4 inline-flex items-center gap-2 rounded-full
                     px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{
            animationDelay: "0s",
            background: "rgba(255,85,0,0.12)",
            border:     "1px solid rgba(255,85,0,0.35)",
            color:      "#FF5500",
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full animate-slots-pulse"
            style={{ background: "#FF5500" }}
          />
          {t.hype_badge}
        </div>

        {/* Private-beta pill — lime accent */}
        <span
          className="animate-rise inline-flex items-center gap-2 rounded-full
                     px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{
            animationDelay: "0.08s",
            border:     `1px solid ${tok.accentBorder}`,
            background: tok.accentBg,
            color:      tok.accent,
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full lime-glow-pulse"
            style={{ background: tok.accent }}
          />
          {t.badge}
        </span>

        {/* ── Launch timing badge ─────────────────────────────────── */}
        <div
          className="animate-rise mt-5 inline-flex items-center gap-2.5 rounded-full
                     px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            animationDelay: "0.14s",
            border:     `1px solid ${tok.accentBorder}`,
            background: tok.accentBg,
          }}
        >
          <span style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}>
            {lang === "ar" ? "الإطلاق خلال" : "Launching in"}
          </span>

          <span
            className="font-display text-sm font-black tabular-nums"
            style={{
              color:      tok.accent,
              textShadow: isDark ? "0 0 14px rgba(204,255,0,0.55)" : "none",
              lineHeight: 1,
            }}
          >
            3
          </span>

          <span style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}>
            {lang === "ar" ? "أسابيع" : "weeks"}
          </span>
        </div>

        {/* Headline — identical weight/size/tracking in both modes */}
        <h1
          className="animate-rise mt-6 font-display font-bold tracking-tight
                     text-3xl  leading-tight
                     sm:text-5xl sm:leading-[1.05]
                     md:text-6xl
                     lg:text-7xl lg:leading-none"
          style={{ animationDelay: "0.18s" }}
        >
          {/* headline_a — neutral, max contrast */}
          <span className="block text-zinc-950 dark:text-white/95">
            {t.headline_a}
          </span>

          {/* headline_b — brand accent gradient */}
          <span
            className="block"
            style={{
              backgroundImage:    tok.accentGradient,
              WebkitBackgroundClip: "text",
              backgroundClip:     "text",
              color:              "transparent",
              filter:             tok.accentFilter,
            }}
          >
            {t.headline_b}
          </span>

          {/* headline_c — neutral, max contrast */}
          <span className="block text-zinc-950 dark:text-white/95">
            {t.headline_c}
          </span>
        </h1>

        {/* Sub-heading */}
        <p
          className="animate-rise mx-auto mt-5 text-sm text-zinc-500 dark:text-zinc-400
                     max-w-xs
                     sm:mt-6 sm:text-base sm:max-w-xl
                     md:text-lg md:max-w-2xl"
          style={{ animationDelay: "0.32s" }}
        >
          {t.subhead}
        </p>

        {/* Slots urgency pill */}
        <div
          className="animate-rise mt-5 inline-flex items-center gap-2 rounded-full
                     px-4 py-1.5 text-xs font-semibold"
          style={{
            animationDelay: "0.44s",
            background: "rgba(255,85,0,0.10)",
            border:     "1px solid rgba(255,85,0,0.28)",
            color:      "#FF5500",
          }}
        >
          <span className="animate-slots-pulse">🔥</span>
          <span>{slotsLeft.toLocaleString()} {t.slots_label}</span>
        </div>

        {/* Email form */}
        <div
          className="animate-rise w-full"
          style={{ animationDelay: "0.52s" }}
        >
          <WaitlistForm lang={lang} onSuccess={() => setModal(true)} />
        </div>
      </main>

      {/* ══════════════════════════ PROBLEMS ══════════════════════════ */}
      <ProblemsGrid lang={lang} isDark={isDark} />

      {/* ══════════════════════════ FEEDBACK ══════════════════════════ */}
      <FeedbackForm lang={lang} isDark={isDark} />

      {/* ══════════════════════════ FAQ ══════════════════════════════ */}
      <FaqAccordion lang={lang} isDark={isDark} />

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer
        className="relative z-10 mt-14 border-t py-6 text-center
                   text-xs text-zinc-400 dark:text-zinc-500
                   sm:mt-20 sm:py-7"
        style={{
          borderColor: isDark ? "rgba(204,255,0,0.10)" : "rgba(0,0,0,0.08)",
        }}
      >
        {t.footer}
      </footer>

      {/* ══════════════════════════ SUCCESS MODAL ══════════════════════════ */}
      <SuccessModal open={modalOpen} onClose={() => setModal(false)} lang={lang} />
    </div>
  );
}
