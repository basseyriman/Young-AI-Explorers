export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="ai-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" /> {/* Cyan 400 */}
          <stop offset="0.5" stopColor="#3b82f6" /> {/* Blue 500 */}
          <stop offset="1" stopColor="#c084fc" /> {/* Purple 400 */}
        </linearGradient>
      </defs>
      {/* Four-pointed spark/star representing AI and exploration */}
      <path 
        d="M12 1.5L14.6 9.4L22.5 12L14.6 14.6L12 22.5L9.4 14.6L1.5 12L9.4 9.4L12 1.5Z" 
        fill="url(#ai-gradient)" 
      />
      {/* Inner core giving a high-tech feel */}
      <circle cx="12" cy="12" r="4" fill="#020617" />
      <circle cx="12" cy="12" r="2" fill="url(#ai-gradient)" />
    </svg>
  )
}
