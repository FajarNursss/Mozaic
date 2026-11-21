/**
 * ColorBlock Component
 * Oversized Pastel Color-Block Surfaces (Pengganti Drop Shadow)
 * Aturan:
 * - Level 0 Elevation: Tanpa drop shadow, tanpa border
 * - Border radius lg: 24px (rounded-[24px]) di desktop/tablet, mobile full-bleed support
 * - Padding: 48px di desktop (p-12), 24px di mobile (p-6)
 * - Ritme: Wajib diselingi kanvas putih di luar blok
 */
export function ColorBlock({
  variant = 'lime',
  children,
  className = '',
  fullBleedOnMobile = true,
  ...props
}) {
  const variantBg = {
    lime: 'bg-[#dceeb1] text-[#000000]',
    lilac: 'bg-[#c5b0f4] text-[#000000]',
    cream: 'bg-[#f4ecd6] text-[#000000]',
    mint: 'bg-[#c8e6cd] text-[#000000]',
    pink: 'bg-[#efd4d4] text-[#000000]',
    coral: 'bg-[#f3c9b6] text-[#000000]',
    navy: 'bg-[#1f1d3d] text-[#ffffff]',
  };

  const roundedClasses = fullBleedOnMobile
    ? 'rounded-none md:rounded-[24px]'
    : 'rounded-[24px]';

  return (
    <section
      className={`w-full p-6 md:p-12 ${roundedClasses} ${
        variantBg[variant] || variantBg.lime
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
}
