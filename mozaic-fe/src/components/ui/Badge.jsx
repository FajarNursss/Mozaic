/**
 * Badge Component for Status, Tags, and Categories
 * Aturan:
 * - Font JetBrains Mono uppercase, letter-spacing +0.54px s.d. +0.60px
 * - Radius sm: 6px (rounded-[6px])
 * - Tanpa drop shadow
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center uppercase tracking-[0.54px] font-mono select-none';

  const sizeStyles = {
    sm: 'text-[10px] md:text-[11px] px-2 py-0.5 rounded-[4px]',
    md: 'text-[11px] md:text-[12px] px-2.5 py-1 rounded-[6px]',
    lg: 'text-[13px] md:text-[14px] px-3 py-1.5 rounded-[6px]',
  };

  const variantStyles = {
    // Default neutral tag
    default: 'bg-[#f7f7f5] text-[#000000] border border-[#e6e6e6]',
    // Active filter or inverted tag
    active: 'bg-[#000000] text-[#ffffff]',
    // Role status: OPEN (mint highlight)
    open: 'bg-[#c8e6cd] text-[#000000]',
    // Role status: FILLED (neutral soft)
    filled: 'bg-[#f7f7f5] text-[#000000] line-through opacity-70',
    // Application status: ACCEPTED (centang hijau aksen)
    accepted: 'bg-[#c8e6cd] text-[#000000] border border-[#1ea64a]',
    // Application status: PENDING (pastel cream)
    pending: 'bg-[#f4ecd6] text-[#000000]',
    // Application status: REJECTED (pastel pink)
    rejected: 'bg-[#efd4d4] text-[#000000]',
    // DeepSeek AI Scoper tag (pastel lilac)
    ai: 'bg-[#c5b0f4] text-[#000000]',
    // Category tag (pastel cream)
    category: 'bg-[#f4ecd6] text-[#000000]',
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.default
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
