import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { translations, type Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  isDark: boolean;
}

export function FaqAccordion({ lang, isDark }: Props) {
  const t = translations[lang];
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  /* ── Tokens ── */
  const tok = {
    divider:    isDark ? "rgba(255,255,255,0.07)"  : "rgba(0,0,0,0.07)",
    itemBg:     isDark ? "rgba(24,27,32,0.72)"     : "rgba(255,255,255,0.85)",
    itemBorder: isDark ? "rgba(255,255,255,0.07)"  : "rgba(0,0,0,0.08)",
    itemShadow: isDark ? "none"                    : "0 2px 12px rgba(0,0,0,0.04)",
    qText:      isDark ? "#FFFFFF"                 : "#0a0a0a",
    aText:      isDark ? "rgba(255,255,255,0.55)"  : "rgba(0,0,0,0.55)",
    chevron:    isDark ? "rgba(255,255,255,0.40)"  : "rgba(0,0,0,0.35)",
    accent:     isDark ? "#CCFF00"                 : "#3D5A00",
  };

  const items = [
    { q: t.faq_1_q, a: t.faq_1_a },
    { q: t.faq_2_q, a: t.faq_2_a },
    { q: t.faq_3_q, a: t.faq_3_a },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader badge={t.faq_badge} title={t.faq_title} isDark={isDark} />

      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300"
              style={{
                background:  tok.itemBg,
                border:      `1px solid ${isOpen ? tok.accent : tok.itemBorder}`,
                boxShadow:   tok.itemShadow,
              }}
            >
              {/* Question row — clickable */}
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4
                           px-5 py-4 text-left sm:px-6 sm:py-5"
                aria-expanded={isOpen}
              >
                <span
                  className="font-display text-sm font-semibold leading-snug sm:text-base"
                  style={{ color: tok.qText }}
                >
                  {item.q}
                </span>

                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className="shrink-0 transition-transform duration-300"
                  style={{
                    color:     isOpen ? tok.accent : tok.chevron,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Answer — smooth height transition via max-height */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? "400px" : "0px" }}
              >
                <p
                  className="px-5 pb-5 text-sm leading-relaxed sm:px-6 sm:pb-6"
                  style={{ color: tok.aText }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
