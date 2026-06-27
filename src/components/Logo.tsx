"use client";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
}

const SW = 1.2;

const iconOnlySizes = {
  sm: "h-8 w-9",
  md: "h-10 w-11",
  lg: "h-11 w-12",
  hero: "h-16 w-[72px] md:h-20 md:w-[88px]",
};

const wordmarkSizes = {
  sm: {
    icon: "h-8 w-9",
    text: "text-lg",
    gap: "gap-1.5",
    tagline: "text-[8px]",
  },
  md: {
    icon: "h-10 w-11 sm:h-11 sm:w-12",
    text: "text-xl sm:text-2xl",
    gap: "gap-2 sm:gap-2.5",
    tagline: "text-[9px]",
  },
  lg: {
    icon: "h-11 w-12 sm:h-12 sm:w-[52px]",
    text: "text-2xl sm:text-3xl",
    gap: "gap-2.5 sm:gap-3",
    tagline: "text-[10px]",
  },
  hero: {
    icon: "h-14 w-[60px] md:h-16 md:w-[68px] lg:h-[88px] lg:w-[96px]",
    text: "text-3xl md:text-4xl lg:text-[2.75rem]",
    gap: "gap-3 md:gap-3.5",
    tagline: "text-xs md:text-sm",
  },
};

function ExplorerKidsMark({ className }: { className: string }) {
  const ink = "stroke-brand-purple dark:stroke-brand-cream";
  const dot = "fill-brand-purple dark:fill-brand-cream";
  const hair = "fill-brand-gold/[0.14] stroke-brand-gold";

  const line = {
    strokeWidth: SW,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none" as const,
  };

  return (
    <svg
      viewBox="8 6 70 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="geometricPrecision"
      aria-hidden="true"
    >
      <g opacity={0.9}>
        <path d="M73 17c4-1 8 2 9 7 1 6-2 13-6 17" {...line} className="stroke-brand-gold" />
        <path
          d="M50 26c2-11 12-17 22-13 7 3 11 9 11 17 0 4-2 7-4 8-6-9-16-13-26-9-3 1-5 4-5 7z"
          strokeWidth={SW}
          strokeLinejoin="round"
          className={hair}
        />
        <path d="M46 34c0-10 8-18 18-18 8 0 14 6 14 16 0 8-6 14-14 14s-18-4-18-12z" {...line} className={ink} />
        <ellipse cx="54" cy="32.5" rx="1.35" ry="1.55" className={dot} />
        <ellipse cx="64" cy="32.5" rx="1.35" ry="1.55" className={dot} />
        <path d="M54 38.5c3 1.5 7 1.5 10 0" {...line} className={ink} />
      </g>
      <g>
        <path
          d="M16 28c0-13 11-23 24-23s24 10 24 23c-5-7-13-11-22-11s-19 4-24 11z"
          strokeWidth={SW}
          strokeLinejoin="round"
          className={hair}
        />
        <path
          d="M22 14c6-4 14-4 20 0M20 20c7-3 15-3 22 0"
          strokeWidth={0.85}
          strokeLinecap="round"
          className="stroke-brand-gold/50"
        />
        <path
          d="M16 36c0-12 9-22 22-22s22 10 22 22c0 10-8 18-18 18h-8c-10 0-18-8-18-18z"
          {...line}
          className={ink}
        />
        <ellipse cx="28.5" cy="34.5" rx="1.4" ry="1.6" className={dot} />
        <ellipse cx="40.5" cy="34.5" rx="1.4" ry="1.6" className={dot} />
        <path d="M27 41c4 2 10 2 14 0" {...line} className={ink} />
      </g>
    </svg>
  );
}

/** Single-line lockup: kids icon + Young AI (purple) Explorers (gold) */
function BrandWordmark({
  iconClass,
  textClass,
  gapClass,
  className = "",
}: {
  iconClass: string;
  textClass: string;
  gapClass: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center min-w-0 ${gapClass} ${className}`}>
      <ExplorerKidsMark className={`${iconClass} shrink-0`} />
      <span className={`font-heading font-bold tracking-tight whitespace-nowrap leading-none ${textClass}`}>
        <span className="text-brand-purple dark:text-brand-cream">Young AI </span>
        <span className="text-brand-gold">Explorers</span>
      </span>
    </span>
  );
}

export function Logo({
  className = "",
  showWordmark = false,
  showTagline = false,
  size = "md",
}: LogoProps) {
  if (!showWordmark) {
    return <ExplorerKidsMark className={`${iconOnlySizes[size]} shrink-0 ${className}`} />;
  }

  const s = wordmarkSizes[size];

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <BrandWordmark iconClass={s.icon} textClass={s.text} gapClass={s.gap} />
      {showTagline && (
        <span
          className={`mt-1.5 font-logo font-normal tracking-[0.06em] text-brand-purple/55 dark:text-brand-cream/55 leading-snug text-center ${s.tagline}`}
        >
          A Kid&apos;s Guide to the Future
        </span>
      )}
    </div>
  );
}

export { ExplorerKidsMark };

/** Nav: same lockup as Logo showWordmark — large on desktop */
export function NavWordmark({ className = "" }: { className?: string }) {
  return (
    <BrandWordmark
      iconClass="h-10 w-11 sm:h-11 sm:w-12 lg:h-14 lg:w-[60px] shrink-0"
      textClass="text-2xl sm:text-3xl lg:text-4xl"
      gapClass="gap-2 sm:gap-2.5 lg:gap-3"
      className={className}
    />
  );
}
