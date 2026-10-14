/** One icon component over the Material Symbols font (CMP-ICON-01). Decorative by default; the control carries the label. */
export function Icon({ name, filled = false, className = '' }: { name: string; filled?: boolean; className?: string }) {
  return (
    <span
      className={`msym ${className}`}
      aria-hidden="true"
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}
