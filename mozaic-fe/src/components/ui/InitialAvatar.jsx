  /**
   * InitialAvatar Component
   * Aturan:
   * - Lingkaran rounded-full (9999px)
   * - Ukuran 36px - 48px
   * - Inisial 2 huruf dalam JetBrains Mono (font-mono)
   * - Latar pastel (#dceeb1, #c5b0f4, #f4ecd6, #c8e6cd, dll.)
   * - Tinta teks #000000 murni
   * - Tanpa drop shadow
   */
  export function InitialAvatar({
    initials = 'MZ',
    bgColor = '#dceeb1',
    size = 'md',
    className = '',
    alt = '',
  }) {
    const sizeStyles = {
      sm: 'w-[32px] h-[32px] text-[12px]',
      md: 'w-[40px] h-[40px] text-[14px]',
      lg: 'w-[48px] h-[48px] text-[16px]',
    };

    // Validasi inisial maks 2 huruf uppercase
    const safeInitials = (initials || 'MZ').slice(0, 2).toUpperCase();

    return (
      <div
        role="img"
        aria-label={alt || `Avatar ${safeInitials}`}
        className={`inline-flex items-center justify-center rounded-full font-mono font-medium text-[#000000] select-none flex-shrink-0 border border-transparent ${
          sizeStyles[size] || sizeStyles.md
        } ${className}`.trim()}
        style={{ backgroundColor: bgColor }}
      >
        <span>{safeInitials}</span>
      </div>
    );
  }
