import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

const LAUNCH_DATE = new Date("2026-06-16T00:00:00Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label, isDark }: { value: number; label: string; isDark: boolean }) {
  const [prevValue, setPrevValue] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setFlip(true);
      const id = setTimeout(() => {
        setPrevValue(value);
        setFlip(false);
      }, 400);
      return () => clearTimeout(id);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-xl
                   h-[52px] w-[52px]
                   sm:h-16 sm:w-16
                   md:h-[72px] md:w-[72px]"
        style={{
          background: isDark ? "rgba(204,255,0,0.06)" : "rgba(100,130,0,0.06)",
          border: `1px solid ${isDark ? "rgba(204,255,0,0.25)" : "rgba(100,130,0,0.22)"}`,
          boxShadow: isDark ? "0 0 16px rgba(204,255,0,0.15)" : "0 0 12px rgba(100,130,0,0.10)",
        }}
      >
        <span
          className="font-display font-bold tabular-nums text-2xl sm:text-3xl md:text-4xl"
          style={{
            color: isDark ? "#CCFF00" : "oklch(0.58 0.25 115)",
            animation: flip ? "count-flip 0.4s cubic-bezier(0.4,0,0.2,1) both" : undefined,
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
        {/* Bottom glint */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: isDark ? "rgba(204,255,0,0.4)" : "rgba(100,130,0,0.3)" }}
        />
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ lang, isDark }: { lang: Lang; isDark: boolean }) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);
  const t = translations[lang];

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px]">
        {t.countdown_label}
      </p>
      <div className="flex items-end gap-1.5 sm:gap-3">
        <Digit value={time.days}    label={t.countdown_days}  isDark={isDark} />
        <span className="mb-5 font-display text-lg font-bold text-muted-foreground/40 sm:mb-7 sm:text-2xl">:</span>
        <Digit value={time.hours}   label={t.countdown_hours} isDark={isDark} />
        <span className="mb-5 font-display text-lg font-bold text-muted-foreground/40 sm:mb-7 sm:text-2xl">:</span>
        <Digit value={time.minutes} label={t.countdown_mins}  isDark={isDark} />
        <span className="mb-5 font-display text-lg font-bold text-muted-foreground/40 sm:mb-7 sm:text-2xl">:</span>
        <Digit value={time.seconds} label={t.countdown_secs}  isDark={isDark} />
      </div>
    </div>
  );
}
