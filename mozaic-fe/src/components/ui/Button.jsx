/**
 * Strict Pill Button Component for Mozaic
 * Aturan:
 * - Wajib pill-shaped: border-radius 50px (rounded-[50px])
 * - Dilarang tombol kotak!
 * - Dilarang menambahkan drop shadow
 * - Min tinggi touch target: 44px
 * - Font: Inter weight 480, tracking -0.10px
 * - Kelangkaan tombol hitam: Max 1 button-primary per area fokus
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-button transition-colors select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2';

  const shapeStyles = 'rounded-[50px]';

  const sizeStyles = {
    sm: 'min-h-[40px] px-4 py-1.5 text-[15px]',
    md: 'min-h-[44px] px-6 py-2.5 text-[16px] md:text-[18px]',
    lg: 'min-h-[50px] px-8 py-3.5 text-[18px] md:text-[20px]',
  };

  const variantStyles = {
    // Primary: Hitam murni, teks putih, tanpa shadow
    primary:
      'bg-[#000000] text-[#ffffff] hover:bg-[#222222] active:bg-[#000000] border-none',
    // Secondary: Putih murni, teks hitam, border hairline #e6e6e6
    secondary:
      'bg-[#ffffff] text-[#000000] border border-[#e6e6e6] hover:bg-[#f7f7f5] active:bg-[#ffffff]',
    // Tertiary text: Tanpa background, tanpa border
    tertiary:
      'bg-transparent text-[#000000] hover:underline underline-offset-4 px-3 min-h-[40px]',
    // Accent: Promo CTA tunggal (#ff3d8b) — maks 1 per halaman
    accent:
      'bg-[#ff3d8b] text-[#ffffff] hover:opacity-90 active:opacity-100 border-none',
  };

  const disabledStyles = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none'
    : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${shapeStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${disabledStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
