import { SectionHeader } from "./SectionHeader";
import { translations, type Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  isDark: boolean;
}

export function ProblemsGrid({ lang, isDark }: Props) {
  const t = translations[lang];

  /* ── Card color tokens ── */
  const card = {
    bg:     isDark ? "rgba(24,27,32,0.72)"    : "rgba(255,255,255,0.85)",
    border: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    shadow: isDark ? "none"                   : "0 2px 16px rgba(0,0,0,0.06)",
    numBg:  isDark ? "rgba(204,255,0,0.08)"   : "rgba(61,90,0,0.06)",
    numCol: isDark ? "#CCFF00"                : "#3D5A00",
    title:  isDark ? "#FFFFFF"                : "#0a0a0a",
    desc:   isDark ? "rgba(255,255,255,0.52)" : "rgba(0,0,0,0.52)",
    hoverBorder: isDark ? "rgba(204,255,0,0.22)" : "rgba(61,90,0,0.20)",
  };

  const problems = [
    { num: "01", title: t.problem_1_title, desc: t.problem_1_desc },
    { num: "02", title: t.problem_2_title, desc: t.problem_2_desc },
    { num: "03", title: t.problem_3_title, desc: t.problem_3_desc },
    { num: "04", title: t.problem_4_title, desc: t.problem_4_desc },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader badge={t.problems_badge} title={t.problems_title} isDark={isDark} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {problems.map((p) => (
          <div
            key={p.num}
            className="group relative rounded-2xl p-6 transition-all duration-300
                       backdrop-blur-sm sm:p-7"
            style={{
              background:   card.bg,
              border:       `1px solid ${card.border}`,
              boxShadow:    card.shadow,
            }}
            /* Subtle border brightens on hover via inline style swap */
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = card.hoverBorder)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = card.border)
            }
          >
            {/* Number badge */}
            <span
              className="mb-4 inline-flex items-center justify-center
                         rounded-lg px-2.5 py-1
                         font-display text-[11px] font-bold tracking-widest"
              style={{ background: card.numBg, color: card.numCol }}
            >
              {p.num}
            </span>

            {/* Title */}
            <h3
              className="mb-2 font-display text-base font-bold sm:text-lg"
              style={{ color: card.title }}
            >
              {p.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: card.desc }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
