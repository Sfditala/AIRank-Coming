interface SectionHeaderProps {
  badge: string;
  title: string;
  isDark: boolean;
}

export function SectionHeader({ badge, title, isDark }: SectionHeaderProps) {
  const accent       = isDark ? "#CCFF00"              : "#3D5A00";
  const accentBorder = isDark ? "rgba(204,255,0,0.28)" : "rgba(61,90,0,0.24)";
  const accentBg     = isDark ? "rgba(204,255,0,0.07)" : "rgba(61,90,0,0.06)";

  return (
    <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-12">
      {/* Label badge — mirrors hero pill structure exactly */}
      <span
        className="inline-flex items-center rounded-full
                   px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]"
        style={{ border: `1px solid ${accentBorder}`, background: accentBg, color: accent }}
      >
        {badge}
      </span>

      {/* Section title */}
      <h2
        className="font-display font-bold tracking-tight
                   text-zinc-950 dark:text-white
                   text-2xl sm:text-3xl md:text-4xl"
      >
        {title}
      </h2>
    </div>
  );
}
