import { MozaicLogo } from '../ui/MozaicLogo';

/**
 * Global Footer Component
 * Aturan:
 * - Level 0 Flat: Tanpa shadow, latar putih murni #ffffff
 * - Garis pemisah hairline-soft: 1px solid #f1f1f1
 * - Tinta teks #000000 murni (hierarki via font-weight & mono caption)
 */
export function Footer() {
  return (
    <footer className="w-full bg-[#ffffff] border-t border-[#f1f1f1] py-12 mt-24">
      <div className="container-mozaic flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <MozaicLogo size="md" />
          <p className="font-body-sm text-[#000000] font-normal">
            Rakit Tim Lintas Fakultas, Tanpa Drama.
          </p>
          <p className="font-caption text-[#000000] opacity-70">
            STACK 2026 (GDGoC ITB) — Case 1: Smarter Campus and Learning
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-1">
          <p className="font-caption text-[#000000]">
            TIM: PEMALU BUKAN PEMULA
          </p>
          <p className="font-caption text-[#000000] opacity-70">
            Nabil (Lead/UI/UX) · Fajar (FE) · Akmal (BE) · Yandra (QA)
          </p>
          <p className="font-caption text-[#000000] opacity-50 mt-2">
            © 2026 MOZAIC • MONOCHROME EDITORIAL FRAME DESIGN SYSTEM
          </p>
        </div>
      </div>
    </footer>
  );
}
