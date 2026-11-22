import { Link } from 'react-router-dom';
import { MozaicLogo } from '../ui/MozaicLogo';

/**
 * Global Footer Component (1:1 Gambar 3)
 * Aturan:
 * - Level 0 Flat: Tanpa shadow, latar putih murni #ffffff
 * - Garis pemisah hairline-soft: 1px solid #f1f1f1
 * - Tinta teks #000000 murni (Dilarang abu-abu, hierarki via font-weight & mono caption)
 * - 5 Kolom: Logo deskripsi + PRODUK, KATEGORI, KOMUNITAS, LEGAL
 * - Bottom Bar: Copyright + Indikator Hijau "SEMUA SISTEM OPERASIONAL"
 */
export function Footer() {
  return (
    <footer className="w-full bg-[#ffffff] border-t border-[#f1f1f1] pt-16 pb-12">
      <div className="container-mozaic">
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Kolom 1: Logo & Tagline (Col Span 4) */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-start">
            <Link to="/" className="inline-block focus:outline-none">
              <MozaicLogo size="md" />
            </Link>
            <p className="font-sans font-[340] text-[14px] text-[#000000] mt-3 max-w-xs leading-relaxed">
              Rakit Tim Lintas Fakultas, Tanpa Drama.
            </p>
          </div>

          {/* Kolom 2: PRODUK (Col Span 2) */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-1">
              PRODUK
            </span>
            <Link
              to="/explore"
              className="font-sans font-[330] text-[14px] text-[#000000] hover:underline"
            >
              Explore Proyek
            </Link>
            <Link
              to="/create"
              className="font-sans font-[330] text-[14px] text-[#000000] hover:underline"
            >
              AI Project Scoper
            </Link>
            <Link
              to="/profile"
              className="font-sans font-[330] text-[14px] text-[#000000] hover:underline"
            >
              Profil Kompetensi
            </Link>
          </div>

          {/* Kolom 3: KATEGORI (Col Span 2) */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-1">
              KATEGORI
            </span>
            <Link
              to="/explore?kategori=Hackathon"
              className="font-sans font-[330] text-[14px] text-[#000000] hover:underline"
            >
              Hackathon
            </Link>
            <Link
              to="/explore?kategori=PKM"
              className="font-sans font-[330] text-[14px] text-[#000000] hover:underline"
            >
              PKM
            </Link>
            <Link
              to="/explore?kategori=Gemastik"
              className="font-sans font-[330] text-[14px] text-[#000000] hover:underline"
            >
              Gemastik
            </Link>
            <Link
              to="/explore?kategori=Capstone"
              className="font-sans font-[330] text-[14px] text-[#000000] hover:underline"
            >
              Capstone/Riset
            </Link>
          </div>

          {/* Kolom 4: KOMUNITAS (Col Span 2) */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-1">
              KOMUNITAS
            </span>
            <span className="font-sans font-[330] text-[14px] text-[#000000] cursor-pointer hover:underline">
              Panduan Ketua Tim
            </span>
            <span className="font-sans font-[330] text-[14px] text-[#000000] cursor-pointer hover:underline">
              FAQ
            </span>
            <span className="font-sans font-[330] text-[14px] text-[#000000] cursor-pointer hover:underline">
              Kontak Kampus
            </span>
          </div>

          {/* Kolom 5: LEGAL (Col Span 2) */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-1">
              LEGAL
            </span>
            <span className="font-sans font-[330] text-[14px] text-[#000000] cursor-pointer hover:underline">
              Privasi
            </span>
            <span className="font-sans font-[330] text-[14px] text-[#000000] cursor-pointer hover:underline">
              Ketentuan Layanan
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Operational Status */}
        <div className="border-t border-[#f1f1f1] mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[11px] sm:text-[12px] tracking-[0.54px] text-[#000000]">
            © 2026 Mozaic — Rakit Tim Lintas Fakultas, Tanpa Drama.
          </p>

          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1ea64a]" />
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.54px] uppercase text-[#000000]">
              SEMUA SISTEM OPERASIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
