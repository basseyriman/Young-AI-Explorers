interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: "h-7 w-7", text: "text-base", gap: "gap-2" },
  md: { icon: "h-9 w-9", text: "text-xl", gap: "gap-2.5" },
  lg: { icon: "h-11 w-11", text: "text-2xl", gap: "gap-3" },
};

export function Logo({ className = "", showWordmark = false, size = "md" }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${s.icon} shrink-0`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="yae-purple" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5B3480" />
            <stop offset="1" stopColor="#3D2066" />
          </linearGradient>
          <linearGradient id="yae-gold" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8C872" />
            <stop offset="1" stopColor="#C9A04E" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="url(#yae-purple)" />
        <circle cx="20" cy="20" r="13" stroke="url(#yae-gold)" strokeWidth="1.5" fill="none" opacity="0.9" />
        <path
          d="M20 8 L22.5 17.5 L32 20 L22.5 22.5 L20 32 L17.5 22.5 L8 20 L17.5 17.5 Z"
          fill="url(#yae-gold)"
          opacity="0.95"
        />
        <circle cx="20" cy="20" r="3" fill="#FAF8F5" />
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={`font-heading font-bold tracking-tight text-brand-purple dark:text-brand-cream ${s.text}`}>
            Young AI
          </span>
          <span className={`font-heading font-medium tracking-[0.15em] uppercase text-brand-gold text-[0.55em] mt-0.5`}>
            Explorers
          </span>
        </div>
      )}
    </div>
  );
}
