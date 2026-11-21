/**
 * Demo Compliance Badge
 * Wajib untuk kepatuhan video Semifinal STACK 2026.
 * Ditampilkan sebagai lencana JetBrains Mono kecil:
 * "EARLY PROTOTYPE • SYNTHETIC DATA"
 */
export function DemoBadge({ className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[50px] bg-[#f7f7f5] border border-[#e6e6e6] text-[#000000] font-mono text-[11px] uppercase tracking-[0.60px] select-none ${className}`.trim()}
    >
      <span className="w-2 h-2 rounded-full bg-[#1ea64a] animate-pulse" />
      <span>EARLY PROTOTYPE • SYNTHETIC DATA</span>
    </div>
  );
}
