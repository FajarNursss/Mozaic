import { Check, AlertCircle } from 'lucide-react';

/**
 * FitGapBox Component
 * AI Fit & Gap Analysis Box
 * Aturan:
 * - Latar Lime (#dceeb1), rounded-[16px], padding 16px–20px
 * - Tanpa drop shadow
 * - Eyebrow JetBrains Mono: "AI FIT & GAP ANALYSIS (DEEPSEEK)"
 * - Poin kecocokan dengan centang #1ea64a
 * - Poin celah kompetensi ringkas
 */
export function FitGapBox({
  fitPoints = [],
  gapPoints = [],
  gapSummary = '',
  className = '',
}) {
  return (
    <div
      className={`bg-[#dceeb1] text-[#000000] rounded-[16px] p-5 ${className}`.trim()}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-caption text-[#000000] font-semibold tracking-[0.60px]">
          AI FIT & GAP ANALYSIS (DEEPSEEK)
        </span>
      </div>

      {/* Poin Kelebihan / Kecocokan */}
      {fitPoints.length > 0 && (
        <div className="mb-3">
          <p className="font-caption text-[10px] text-[#000000] opacity-70 mb-1.5 font-medium">
            POIN KECOCOKAN KEAHLIAN:
          </p>
          <ul className="space-y-1.5">
            {fitPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1ea64a] flex-shrink-0 mt-0.5" />
                <span className="font-body-sm text-[13px] text-[#000000] leading-snug">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Poin Celah Kompetensi (Gap) */}
      {(gapPoints.length > 0 || gapSummary) && (
        <div className="pt-2 border-t border-[#000000]/10">
          <p className="font-caption text-[10px] text-[#000000] opacity-70 mb-1 font-medium">
            CATATAN PENDAMPINGAN (GAP):
          </p>
          {gapPoints.map((gap, idx) => (
            <div key={idx} className="flex items-start gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-[#000000] opacity-60 flex-shrink-0 mt-0.5" />
              <span className="font-body-sm text-[13px] text-[#000000] font-light leading-snug">
                {gap}
              </span>
            </div>
          ))}
          {gapSummary && (
            <p className="font-body-sm text-[12px] text-[#000000] opacity-80 italic mt-1.5">
              &quot;{gapSummary}&quot;
            </p>
          )}
        </div>
      )}
    </div>
  );
}
