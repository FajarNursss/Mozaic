import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check } from 'lucide-react';

/**
 * ApplyDrawer Component
 * 1:1 Mengikuti Gambar 2 Figma:
 * - Slide-in effect dari kanan layar (transition-transform duration-300 ease-out)
 * - Header: Eyebrow '● ONE-CLICK APPLICATION' + 'Lamar: {role_name}' + Subtitle proyek & kategori + Tombol Tutup (X)
 * - Notice Box Cream (#f4ecd6): "Data dari Profil Kompetensi terstandarmu akan dikirim otomatis. Tidak perlu mengisi formulir ulang."
 * - Kartu Profil Terstandar (Border border-[#e6e6e6], rounded-[18px], bg-[#ffffff]):
 *   - Avatar inisial + Nama + Fakultas — Program Studi + Badge 'AKTIF'
 *   - KEAHLIAN TERPILIH (X/5): Tag chip keahlian
 *   - MINI-PORTFOLIO: Teks rangkuman + Tautan Portofolio (github.com/...)
 *   - KOMITMEN: X JAM/MINGGU + ● WHATSAPP TERVERIFIKASI
 * - Tombol Aksi Bawah:
 *   - Black pill 'Konfirmasi & Kirim Lamaran →'
 *   - Link 'Edit Profil Kompetensi' -> Navigasi ke /profile
 */
export function ApplyDrawer({
  isOpen,
  onClose,
  project,
  role,
  currentUser,
  onConfirmApply,
  isSubmitting = false,
}) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // Efek transisi mount / unmount untuk slide-in yang halus
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Tutup drawer dengan tombol ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!visible && !isOpen) return null;

  // Data profil mahasiswa yang dikirim
  const userName = currentUser?.name || 'Raka Pratama';
  const userInitials =
    currentUser?.initials ||
    userName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  const userFaculty = currentUser?.faculty || 'Fasilkom';
  const userMajor = currentUser?.major || 'Ilmu Komputer';
  const userSkills =
    currentUser?.skills && currentUser.skills.length > 0
      ? currentUser.skills
      : role?.required_skills && role.required_skills.length > 0
      ? role.required_skills
      : ['BACKEND', 'DATA/AI', 'PRODUCT MANAGEMENT'];
  const userMiniPortfolio =
    currentUser?.mini_portfolio ||
    'Membangun REST API Laravel & pipeline analitik data untuk 2 proyek riset kampus. Fokus pada arsitektur backend yang rapi dan cepat.';
  const userPortfolioUrl =
    currentUser?.portfolio_url || 'github.com/rakapratama_/';
  const userWeeklyHours = currentUser?.weekly_hours || 12;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background Backdrop dengan efek fade-in/out */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Slide-In Drawer Panel dari kanan layar */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Lamar peran ${role?.role_name}`}
        className={`fixed inset-y-0 right-0 w-full sm:w-[460px] md:w-[480px] bg-[#ffffff] shadow-2xl z-50 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto transform transition-transform duration-300 ease-out border-l border-[#e6e6e6] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header Drawer (1:1 Gambar 2) */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#f1f1f1]">
            <div className="min-w-0">
              <span className="font-mono text-[11px] font-bold tracking-[0.54px] uppercase text-[#000000] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#000000]" />
                <span>ONE-CLICK APPLICATION</span>
              </span>
              <h2 className="font-sans font-[700] text-[22px] sm:text-[24px] text-[#000000] leading-tight mt-1.5 truncate">
                Lamar: {role?.role_name}
              </h2>
              <p className="font-sans text-[12px] text-[#000000] opacity-75 mt-1 truncate">
                {project?.title} · {project?.activity_category}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f7f7f5] hover:bg-[#e6e6e6] text-[#000000] flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
              aria-label="Tutup form lamaran"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Kotak Pemberitahuan Cream (#f4ecd6) */}
          <div className="bg-[#f4ecd6] text-[#000000] rounded-[14px] p-4 my-5 border border-[#e6e6e6]/60">
            <p className="font-sans font-[340] text-[12.5px] leading-relaxed text-[#000000]">
              Data dari Profil Kompetensi terstandarmu akan dikirim otomatis. Tidak
              perlu mengisi formulir ulang.
            </p>
          </div>

          {/* Kartu Profil Terstandar Kandidat (1:1 Gambar 2) */}
          <div className="rounded-[18px] border border-[#e6e6e6] p-5 bg-[#ffffff] space-y-4 mb-6">
            {/* Baris 1: Avatar, Nama, Fakultas, Badge AKTIF */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#dceeb1] text-[#000000] font-mono text-[12px] font-bold flex items-center justify-center border border-[#e6e6e6] flex-shrink-0">
                  {userInitials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-sans font-bold text-[15px] text-[#000000] truncate">
                    {userName}
                  </h3>
                  <p className="font-sans font-[330] text-[11.5px] text-[#000000] opacity-70 truncate">
                    {userFaculty} — {userMajor}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-[50px] bg-[#c8e6cd] text-[#1ea64a] font-mono text-[9px] font-bold uppercase tracking-[0.5px] whitespace-nowrap">
                AKTIF
              </span>
            </div>

            {/* Baris 2: Keahlian Terpilih */}
            <div>
              <span className="font-mono text-[10px] font-bold tracking-[0.54px] uppercase text-[#000000] opacity-80 mb-1.5 block">
                KEAHLIAN TERPILIH ({userSkills.length}/5)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {userSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-[6px] bg-[#f7f7f5] border border-[#e6e6e6] font-mono text-[10px] text-[#000000] uppercase font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Baris 3: Mini-Portfolio */}
            <div>
              <span className="font-mono text-[10px] font-bold tracking-[0.54px] uppercase text-[#000000] opacity-80 mb-1 block">
                MINI-PORTFOLIO
              </span>
              <p className="font-sans font-[330] text-[12.5px] leading-relaxed text-[#000000]">
                {userMiniPortfolio}
              </p>
              {userPortfolioUrl && (
                <span className="font-mono text-[11px] text-[#000000] underline mt-1.5 block truncate">
                  {userPortfolioUrl}
                </span>
              )}
            </div>

            {/* Baris 4: Komitmen Jam & WhatsApp Verifikasi */}
            <div className="pt-3 border-t border-[#f1f1f1] flex items-center justify-between text-[#000000]">
              <span className="font-mono text-[10.5px] font-bold tracking-[0.54px] uppercase">
                KOMITMEN: {userWeeklyHours} JAM/MINGGU
              </span>
              <span className="font-mono text-[10.5px] font-bold tracking-[0.54px] uppercase text-[#1ea64a] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1ea64a]" />
                <span>WHATSAPP TERVERIFIKASI</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Tombol Aksi (1:1 Gambar 2) */}
        <div className="pt-4 border-t border-[#f1f1f1]">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirmApply}
            className="w-full py-3.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[500] text-[14px] text-center hover:bg-[#1a1a1a] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>
              {isSubmitting
                ? 'Mengirimkan Lamaran...'
                : 'Konfirmasi & Kirim Lamaran →'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/profile');
            }}
            className="w-full font-sans text-[12px] text-[#000000] hover:underline text-center cursor-pointer mt-3 block"
          >
            Edit Profil Kompetensi
          </button>
        </div>
      </aside>
    </div>
  );
}
