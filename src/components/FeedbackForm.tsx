import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { appendFeedbackToSheet } from "@/lib/feedback.functions";
import { translations, type Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  isDark: boolean;
}

export function FeedbackForm({ lang, isDark }: Props) {
  const t = translations[lang];
  const submit = useServerFn(appendFeedbackToSheet);

  const [rating, setRating]     = useState(0);
  const [hovered, setHovered]   = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading]   = useState(false);

  /* ── Tokens ── */
  const tok = {
    cardBg:      isDark ? "rgba(24,27,32,0.72)"     : "rgba(255,255,255,0.85)",
    cardBorder:  isDark ? "rgba(255,255,255,0.07)"  : "rgba(0,0,0,0.08)",
    cardShadow:  isDark ? "none"                    : "0 2px 16px rgba(0,0,0,0.06)",
    textMain:    isDark ? "#FFFFFF"                 : "#0a0a0a",
    textSub:     isDark ? "rgba(255,255,255,0.45)"  : "rgba(0,0,0,0.45)",
    inputBg:     isDark ? "rgba(255,255,255,0.04)"  : "rgba(0,0,0,0.03)",
    inputBorder: isDark ? "rgba(255,255,255,0.10)"  : "rgba(0,0,0,0.12)",
    inputFocus:  isDark ? "rgba(204,255,0,0.40)"    : "rgba(61,90,0,0.35)",
    accent:      isDark ? "#CCFF00"                 : "#3D5A00",
    btnBg:       isDark ? "#CCFF00"                 : "#3D5A00",
    btnText:     isDark ? "#0a0a0a"                 : "#FFFFFF",
    starActive:  "#CCFF00",
    starInactive: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setLoading(true);
    try {
      await submit({ data: { lang, rating, feedback } });
      toast.success(t.feedback_success);
      setRating(0);
      setFeedback("");
    } catch {
      toast.error(t.feedback_error);
    } finally {
      setLoading(false);
    }
  }

  const activeStars = hovered || rating;

  return (
    <section className="relative z-10 mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader badge={t.feedback_badge} title={t.feedback_title} isDark={isDark} />

      <div
        className="rounded-2xl p-6 backdrop-blur-sm sm:p-8"
        style={{
          background:  tok.cardBg,
          border:      `1px solid ${tok.cardBorder}`,
          boxShadow:   tok.cardShadow,
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Star rating row */}
          <div className="flex flex-col items-center gap-3">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: tok.textSub }}
            >
              {t.feedback_rating_label}
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Rate ${n} star${n !== 1 ? "s" : ""}`}
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform duration-150 hover:scale-110 active:scale-95"
                >
                  <Star
                    size={32}
                    strokeWidth={1.5}
                    fill={n <= activeStars ? tok.starActive : "none"}
                    color={n <= activeStars ? tok.starActive : tok.starInactive}
                    className="transition-colors duration-150"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <textarea
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t.feedback_placeholder}
            className="w-full resize-none rounded-xl px-4 py-3 text-sm
                       transition-all duration-200 outline-none
                       placeholder:opacity-40"
            style={{
              background:   tok.inputBg,
              border:       `1px solid ${tok.inputBorder}`,
              color:        tok.textMain,
              fontFamily:   "inherit",
            }}
            onFocus={(e)  => (e.currentTarget.style.borderColor = tok.inputFocus)}
            onBlur={(e)   => (e.currentTarget.style.borderColor = tok.inputBorder)}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={rating === 0 || loading}
            className="w-full rounded-xl py-3 text-sm font-bold
                       tracking-wide transition-all duration-200
                       hover:opacity-90 active:scale-[0.98]
                       disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: tok.btnBg, color: tok.btnText }}
          >
            {loading ? "…" : t.feedback_submit}
          </button>
        </form>
      </div>
    </section>
  );
}
