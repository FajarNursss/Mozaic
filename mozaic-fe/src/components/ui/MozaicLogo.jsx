/**
 * Mozaic Logo Component
 * Menggunakan asset logo resmi dari folder public (/logo_mozaic-removebg-preview.png)
 * dan wordmark "Mozaic" dalam font Inter bold sesuai design system.
 */
export function MozaicLogo({
  size = 'md',
  showWordmark = true,
  className = '',
  invert = false,
}) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-[18px]',
    md: 'text-[22px]',
    lg: 'text-[28px]',
  };

  const currentIcon = iconSizes[size] || iconSizes.md;
  const currentText = textSizes[size] || textSizes.md;
  const textColor = invert ? 'text-[#ffffff]' : 'text-[#000000]';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`.trim()}>
      <img
        src="/logo_mozaic-removebg-preview.png"
        alt="Mozaic Logo"
        className={`${currentIcon} object-contain flex-shrink-0`}
      />

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
