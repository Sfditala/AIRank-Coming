import { useEffect, useRef } from "react";

/**
 * NeonBackground — unified single render tree for both themes.
 *
 * Every layer exists in both dark and light mode. Only the token
 * values (colors, opacities) differ — the DOM structure is identical.
 *
 * Token convention:
 *   dark  → neon lime (#CCFF00) on deep charcoal (#08090C)
 *   light → deep brand-green on clean white (#FFFFFF)
 */
export function NeonBackground({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  /* ── Parallax tilt on mouse move ── */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--px", `${(e.clientX / window.innerWidth  - 0.5) * 20}px`);
      el.style.setProperty("--py", `${(e.clientY / window.innerHeight - 0.5) * 20}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Semantic color tokens — ONLY these values differ per mode ── */
  const tok = {
    /* canvas */
    base:        isDark ? "#08090C"                  : "#FFFFFF",

    /* central ambient glow (behind the hero headline) */
    glowLime:    isDark ? "rgba(204,255,0,0.09)"     : "rgba(204,255,0,0.10)",
    glowOrange:  isDark ? "rgba(255,85,0,0.07)"      : "rgba(255,85,0,0.04)",

    /* perspective grid lines */
    gridColor:   isDark ? "rgba(204,255,0,0.16)"     : "rgba(60,90,0,0.36)",

    /* secondary micro-grid (lower portion depth) */
    fineGrid:    isDark ? "rgba(204,255,0,0.07)"     : "rgba(60,90,0,0.07)",
    fineOpacity: isDark ? 0.35                       : 1,

    /* floating orbs */
    orbLime:     isDark ? "rgba(204,255,0,0.32)"     : "rgba(204,255,0,0.11)",
    orbOrange:   isDark ? "rgba(255,85,0,0.18)"      : "rgba(255,85,0,0.06)",
    orbBottom:   isDark ? "rgba(180,255,0,0.20)"     : "rgba(180,255,0,0.06)",

    /* scanline overlay — visually disappears in light (opacity 0) */
    scanOpacity: isDark ? 0.25                       : 0,

    /* edge vignette fades */
    fadeTop:     isDark ? "#08090C"                  : "rgba(255,255,255,0.93)",
    fadeBot:     isDark ? "#08090C"                  : "rgba(255,255,255,0.90)",
  } as const;

  const gridTransform =
    "translate3d(var(--px,0), var(--py,0), 0) perspective(900px) rotateX(55deg) scale(1.6) translateY(20%)";

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>

      {/* ① Base canvas + central ambient radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            `radial-gradient(ellipse 80% 55% at 50% 28%, ${tok.glowLime}, transparent 70%)`,
            `radial-gradient(ellipse at 80% 80%, ${tok.glowOrange}, transparent 60%)`,
            tok.base,
          ].join(", "),
        }}
      />

      {/* ② 3-D perspective grid — same transform, same mask, token-driven line color */}
      <div
        className="absolute inset-0 grid-bg-unified animate-grid"
        style={{
          // CSS custom property consumed by the @utility
          ["--grid-color" as string]: tok.gridColor,
          transform: gridTransform,
          transformOrigin: "50% 80%",
        }}
      />

      {/* ③ Secondary fine micro-grid — adds horizon-depth texture */}
      <div
        className="absolute inset-0"
        style={{
          opacity: tok.fineOpacity,
          backgroundImage: [
            `linear-gradient(${tok.fineGrid} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${tok.fineGrid} 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(ellipse at 50% 65%, #000 10%, transparent 62%)",
        }}
      />

      {/* ④ Lime orb — top-left corner warmth */}
      <div
        className="absolute -top-24 -left-16 animate-orb rounded-full
                   h-[260px] w-[260px]
                   sm:-top-32 sm:-left-24 sm:h-[380px] sm:w-[380px]
                   md:-top-40 md:-left-32 md:h-[520px] md:w-[520px]"
        style={{
          background: `radial-gradient(circle, ${tok.orbLime}, transparent 60%)`,
          filter: "blur(70px)",
        }}
      />

      {/* ⑤ Orange counter-accent — top-right */}
      <div
        className="absolute top-1/3 -right-16 animate-orb rounded-full
                   h-[280px] w-[280px]
                   sm:-right-28 sm:h-[400px] sm:w-[400px]
                   md:-right-40 md:h-[560px] md:w-[560px]"
        style={{
          background: `radial-gradient(circle, ${tok.orbOrange}, transparent 60%)`,
          filter: "blur(80px)",
          animationDelay: "-4s",
        }}
      />

      {/* ⑥ Bottom lime bloom */}
      <div
        className="absolute left-1/2 -translate-x-1/2 animate-orb rounded-full
                   bottom-[-80px]  h-[300px] w-[300px]
                   sm:bottom-[-140px] sm:h-[440px] sm:w-[440px]
                   md:bottom-[-200px] md:h-[600px] md:w-[600px]"
        style={{
          background: `radial-gradient(circle, ${tok.orbBottom}, transparent 65%)`,
          filter: "blur(90px)",
          animationDelay: "-7s",
        }}
      />

      {/* ⑦ Scanline texture — dark mode only (opacity: 0 in light, no reflow) */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: tok.scanOpacity,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(204,255,0,0.05) 0px, rgba(204,255,0,0.05) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* ⑧ Top edge fade — keeps nav readable over the grid */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: `linear-gradient(to bottom, ${tok.fadeTop}, transparent)`,
        }}
      />

      {/* ⑨ Bottom edge fade — grounds the page */}
      <div
        className="absolute inset-x-0 bottom-0 h-44"
        style={{
          background: `linear-gradient(to top, ${tok.fadeBot}, transparent)`,
        }}
      />
    </div>
  );
}
