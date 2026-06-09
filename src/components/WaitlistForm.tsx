import { useRef, useState, type MouseEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { translations, type Lang } from "@/lib/i18n";
import { appendWaitlistToSheet } from "@/lib/sheets.functions";

export function WaitlistForm({ lang, onSuccess }: { lang: Lang; onSuccess: () => void }) {
  const t = translations[lang];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const appendToSheet = useServerFn(appendWaitlistToSheet);

  /* ── Magnetic hover effect ── */
  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const b = btnRef.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    b.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    b.style.setProperty("--mx", `${e.clientX - r.left}px`);
    b.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error(t.invalid_email, { duration: 3500 });
      return;
    }

    setLoading(true);

    try {
      await appendToSheet({ data: { email: trimmed, lang } });

      toast.success(t.toast_success, {
        description: t.toast_success_sub,
        duration: 5000,
      });
      setEmail("");
      onSuccess();
    } catch (err) {
      console.error("[Sheets] append error:", err);
      toast.error(t.toast_error, { duration: 4500 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="relative mx-auto mt-10 w-full max-w-xl">
      {/* Outer glow wrapper — lime #CCFF00 */}
      <div
        className="relative rounded-2xl p-[1.5px] transition-all duration-300"
        style={{
          background: focused
            ? "linear-gradient(135deg, rgba(204,255,0,0.85), rgba(204,255,0,0.25) 60%, rgba(255,85,0,0.30))"
            : "linear-gradient(135deg, rgba(204,255,0,0.30), rgba(204,255,0,0.10) 60%, rgba(255,85,0,0.12))",
          boxShadow: focused
            ? "0 0 32px rgba(204,255,0,0.30), 0 0 80px rgba(204,255,0,0.12)"
            : "0 0 18px rgba(204,255,0,0.14)",
        }}
      >
        <div className="flex flex-col gap-2 rounded-2xl bg-card/80 p-2 backdrop-blur-xl sm:flex-row sm:items-center">
          {/* Email input */}
          <div className="relative flex-1">
            {/* Mail icon */}
            <div
              className="pointer-events-none absolute inset-y-0 start-3 flex items-center transition-colors duration-200"
              style={{ color: focused ? "#CCFF00" : "rgba(204,255,0,0.45)" }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={t.email_placeholder}
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="w-full bg-transparent px-12 py-4 text-base text-foreground outline-none placeholder:text-muted-foreground/55"
              aria-label="Email address"
              autoComplete="email"
            />
          </div>

          {/* Submit button — magnetic + shimmer */}
          <button
            ref={btnRef}
            type="submit"
            disabled={loading}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="group relative overflow-hidden rounded-xl px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-[#08090C] transition-transform duration-200 disabled:opacity-70"
            style={{
              background: "linear-gradient(120deg, #B8FF00, #CCFF00 50%, #AAEE00)",
              boxShadow:
                "0 0 24px rgba(204,255,0,0.55), 0 0 60px rgba(204,255,0,0.22)",
            }}
          >
            <span className="relative z-10 whitespace-nowrap">
              {loading ? t.cta_loading : t.cta}
            </span>

            {/* Pointer-light radial shine */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(160px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.55), transparent 60%)",
              }}
            />

            {/* Horizontal shimmer sweep */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent group-hover:animate-[shimmer_0.9s_ease]"
            />
          </button>
        </div>
      </div>
    </form>
  );
}
