/**
 * Mozaic Logo Component
 * Aturan:
 * - 4 ubin persegi geometris saling bertaut: 3 ubin #000000, 1 ubin #dceeb1 (radius 2px)
 * - Wordmark "Mozaic" dalam Inter 700, tracking -0.5px
 * - Tanpa efek gradien atau drop shadow
 */
export function MozaicLogo({
  size = 'md',
  showWordmark = true,
  className = '',
  invert = false,
}) {
  const iconSizes = {
    sm: { container: 'w-6 h-6 gap-0.5', tile: 'w-2.5 h-2.5 rounded-[2px]' },
    md: { container: 'w-8 h-8 gap-1', tile: 'w-3.5 h-3.5 rounded-[2px]' },
    lg: { container: 'w-10 h-10 gap-1.5', tile: 'w-4 h-4 rounded-[3px]' },
  };

  const textSizes = {
    sm: 'text-[18px]',
    md: 'text-[22px]',
    lg: 'text-[28px]',
  };

  const currentIcon = iconSizes[size] || iconSizes.md;
  const currentText = textSizes[size] || textSizes.md;

  const blackTileColor = invert ? 'bg-[#ffffff]' : 'bg-[#000000]';
  const limeTileColor = 'bg-[#dceeb1]';
  const textColor = invert ? 'text-[#ffffff]' : 'text-[#000000]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`.trim()}>
      {/* 4 Interlocking Geometric Tiles (2x2 grid) */}
      <div
        className={`grid grid-cols-2 flex-shrink-0 items-center justify-center ${currentIcon.container}`}
        aria-hidden="true"
      >
        <span className={`${currentIcon.tile} ${blackTileColor}`} />
        <span className={`${currentIcon.tile} ${limeTileColor}`} />
        <span className={`${currentIcon.tile} ${blackTileColor}`} />
        <span className={`${currentIcon.tile} ${blackTileColor}`} />
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-sans font-bold tracking-[-0.5px] leading-none ${currentText} ${textColor}`}
        >
          Mozaic
        </span>
      )}
    </div>
  );
}
