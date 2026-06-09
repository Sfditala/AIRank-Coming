import { useEffect, useMemo, useState } from "react";
import { translations, type Lang } from "@/lib/i18n";

export function SuccessModal({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Lang }) {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);

  const pieces = useMemo(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 1.6 + Math.random() * 1.6,
      size: 6 + Math.random() * 8,
      hue: 110 + Math.random() * 40,
      rot: Math.random() * 360,
    })), [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const share = async () => {
    const url = window.location.href;
    const text = lang === "ar" ? "انضم إلى قائمة انتظار AI Rank" : "Join the AI Rank waitlist";
    if (navigator.share) {
      try { await navigator.share({ title: "AI Rank", text, url }); return; } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-rise">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {pieces.map((p, i) => (
          <span key={i}
            className="absolute top-[20%] block rounded-sm"
            style={{
              left: `${p.left}%`,
              width: p.size, height: p.size,
              background: `hsl(${p.hue} 100% 55%)`,
              boxShadow: `0 0 12px hsl(${p.hue} 100% 60% / 0.8)`,
              transform: `rotate(${p.rot}deg)`,
              animation: `confetti-fall ${p.duration}s ${p.delay}s ease-out forwards`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md rounded-2xl border border-neon glow-pulse bg-[#0a0f17]/95 p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-neon"
          style={{ background: "radial-gradient(circle, rgba(57,255,20,0.25), transparent 70%)" }}>
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="#39FF14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-neon">{t.modal_title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{t.modal_desc}</p>

        <div className="mt-6 flex flex-col gap-3">
          <button onClick={share}
            className="group relative overflow-hidden rounded-xl border border-neon px-5 py-3 text-sm font-semibold text-neon transition hover:bg-[#39FF14]/10">
            <span className="relative z-10">{copied ? t.copied : t.share}</span>
          </button>
          <button onClick={onClose} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
