import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { CountdownTimer } from "./CountdownTimer";

const LEADERBOARD = [
  { name: "GPT-4o", score: 92 },
  { name: "Claude 3.7", score: 88 },
  { name: "Gemini 2.5", score: 84 },
  { name: "Llama 3.3", score: 77 },
];

const BENCHMARK_TAGS = ["MMLU", "HumanEval", "MATH", "HellaSwag", "ARC"];

function BentoCard({
  children,
  className = "",
  glowColor = "lime",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: "lime" | "orange";
}) {
  const lime = glowColor === "lime";
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-bento p-6 transition-all duration-300 ${className}`}
      style={{
        border: `1px solid ${lime ? "rgba(204,255,0,0.18)" : "rgba(255,85,0,0.22)"}`,
        boxShadow: lime
          ? "0 1px 2px rgba(0,0,0,0.12)"
          : "0 0 24px rgba(255,85,0,0.10), 0 1px 2px rgba(0,0,0,0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = lime
          ? "rgba(204,255,0,0.45)"
          : "rgba(255,85,0,0.50)";
        e.currentTarget.style.boxShadow = lime
          ? "0 0 28px rgba(204,255,0,0.14), 0 4px 16px rgba(0,0,0,0.16)"
          : "0 0 32px rgba(255,85,0,0.20), 0 4px 16px rgba(0,0,0,0.16)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = lime
          ? "rgba(204,255,0,0.18)"
          : "rgba(255,85,0,0.22)";
        e.currentTarget.style.boxShadow = lime
          ? "0 1px 2px rgba(0,0,0,0.12)"
          : "0 0 24px rgba(255,85,0,0.10), 0 1px 2px rgba(0,0,0,0.12)";
      }}
    >
      {children}
      {/* Corner glow on hover */}
      <div
        className="pointer-events-none absolute -right-20 -bottom-20 h-52 w-52 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: lime
            ? "radial-gradient(circle, rgba(204,255,0,0.18), transparent 70%)"
            : "radial-gradient(circle, rgba(255,85,0,0.18), transparent 70%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}

export function BentoGrid({
  lang,
  isDark,
  slotsLeft,
}: {
  lang: Lang;
  isDark: boolean;
  slotsLeft: number;
}) {
  const t = translations[lang];
  const MAX_SLOTS = 500;
  const pct = Math.max(4, Math.round((slotsLeft / MAX_SLOTS) * 100));
  const limeColor = isDark ? "#CCFF00" : "oklch(0.58 0.25 115)";

  return (
    <section className="mx-auto mt-20 w-full max-w-6xl px-6">
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground/75 sm:text-3xl">
        {t.bento_title}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* ── LARGE: Live Leaderboard (2 cols) ── */}
        <BentoCard className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mb-1 text-3xl">🏆</div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {t.bento_rankings_title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.bento_rankings_desc}</p>
            </div>
            <span
              className="shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.12)", color: limeColor }}
            >
              LIVE
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {LEADERBOARD.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="w-5 shrink-0 text-xs font-bold text-muted-foreground/50">
                  #{i + 1}
                </span>
                <div className="flex-1 overflow-hidden rounded-full bg-foreground/8">
                  <div
                    className="h-2.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${m.score}%`,
                      background:
                        i === 0
                          ? "linear-gradient(90deg, #CCFF00, #AAEE00)"
                          : i === 1
                            ? "rgba(204,255,0,0.55)"
                            : i === 2
                              ? "rgba(204,255,0,0.35)"
                              : "rgba(204,255,0,0.20)",
                    }}
                  />
                </div>
                <span className="shrink-0 text-xs font-semibold text-foreground/70">{m.name}</span>
                <span
                  className="shrink-0 text-xs font-bold"
                  style={{ color: i === 0 ? limeColor : undefined }}
                >
                  {m.score}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* ── Benchmarks ── */}
        <BentoCard>
          <div className="mb-3 text-3xl">📊</div>
          <h3 className="font-display text-lg font-bold text-foreground">
            {t.bento_benchmarks_title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{t.bento_benchmarks_desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {BENCHMARK_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                style={{
                  border: `1px solid ${isDark ? "rgba(204,255,0,0.30)" : "rgba(100,130,0,0.30)"}`,
                  color: limeColor,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </BentoCard>

        {/* ── Countdown ── */}
        <BentoCard glowColor="orange">
          <CountdownTimer lang={lang} isDark={isDark} />
        </BentoCard>

        {/* ── Wide: Early Access Perks (2 cols) ── */}
        <BentoCard className="sm:col-span-2">
          <div className="mb-1 text-3xl">🔑</div>
          <h3 className="font-display text-lg font-bold text-foreground">{t.bento_access_title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t.bento_access_desc}</p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(t.bento_access_perks as readonly string[]).map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-sm text-foreground/80">
                <span style={{ color: limeColor }}>✓</span>
                {perk}
              </div>
            ))}
          </div>
        </BentoCard>

        {/* ── Community + Slots ── */}
        <BentoCard glowColor="orange">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-3xl">🌐</span>
            <span className="animate-slots-pulse rounded-full border border-orange/40 bg-orange/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-orange">
              {t.slots_urgency.split("—")[0].trim()}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-foreground">
            {t.bento_community_title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.bento_community_desc}</p>

          {/* Slots meter */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t.slots_label}</span>
              <span className="font-bold text-orange">{slotsLeft.toLocaleString()}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #FF5500, #FF7733)",
                }}
              />
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
