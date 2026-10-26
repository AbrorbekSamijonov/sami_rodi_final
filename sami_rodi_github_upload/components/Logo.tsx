/** SamiRodi mark: a 3×3 cell array whose centre cell is isolated while current flows around it. */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="8" fill="#0A1522" />
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => {
          const center = r === 1 && c === 1;
          return (
            <rect key={`${r}${c}`} x={6 + c * 10} y={6 + r * 10} width={8} height={8} rx={1.5} fill={center ? "none" : "#1B3A57"} stroke={center ? "#C9A24A" : "#2B5379"} strokeWidth={center ? 1.4 : 0.6} strokeDasharray={center ? "1.6 1.4" : undefined} />
          );
        })
      )}
      {/* current routed around the protected centre cell */}
      <path d="M10 10 H30 V20 H30 V30 H10" fill="none" stroke="#C9A24A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
      <path d="M10 10 H20 M20 10 H30 M30 10 V20 M30 20 V30 M30 30 H20 M20 30 H10 M10 30 V20 M10 20 V10" fill="none" stroke="#C9A24A" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2.2" fill="#C9A24A" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-xl font-semibold tracking-tight">
        Sami<span className="text-amber">Rodi</span>
      </span>
    </span>
  );
}
