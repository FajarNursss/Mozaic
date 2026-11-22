import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { MozaicLogo } from '../components/ui/MozaicLogo';
import { Eye, EyeOff, X } from 'lucide-react';

/**
 * Page 02 — Auth: Login & Register (/auth)
 * Refactored 1:1 mengikuti Figma Screenshot Desktop (Gambar 1) & Mobile (Gambar 2):
 * - Desktop: Split 2 Kolom (Kiri: Form Auth Bersih; Kanan: Navy Card #1f1d3d dengan Live Match Card Stack)
 * - Mobile: Header Bar dengan tombol tutup (X) + Navy Banner atas + Form di bawahnya
 * - Kepatuhan Token: Tanpa teks abu-abu di permukaan terang (#000000 murni), pill buttons rounded-[50px]
 */
export function AuthPage() {
  const navigate = useNavigate();
  const { switchPersona, personas } = useMozaic();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Default pre-filled credentials sesuai spesifikasi mockup
  const [email, setEmail] = useState('raka.pratama@ui.ac.id');
  const [password, setPassword] = useState('secretpassword123');
  const [fullName, setFullName] = useState('');
  const [faculty, setFaculty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Otomatis login sebagai persona default (Raka Pratama) saat form disubmit
    if (personas.length > 0) {
      switchPersona(personas[0]);
    }
    navigate('/workspace');
  };

  const handleGoogleLogin = () => {
    if (personas.length > 0) {
      switchPersona(personas[0]);
    }
    navigate('/workspace');
  };

  return (
    <div className="w-full min-h-screen bg-[#ffffff] text-[#000000] flex flex-col justify-between">
      {/* =========================================================================
          HEADER BAR DESKTOP (>= 960px)
          ========================================================================= */}
      <header className="hidden lg:flex items-center justify-between px-8 xl:px-14 py-6 w-full max-w-[1360px] mx-auto">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="focus:outline-none cursor-pointer"
        >
          <MozaicLogo size="md" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="font-sans font-[330] text-[13px] text-[#000000] hover:underline cursor-pointer transition-colors"
        >
          ← Kembali ke Beranda
        </button>
      </header>

      {/* =========================================================================
          HEADER BAR MOBILE (< 960px)
          ========================================================================= */}
      <header className="flex lg:hidden items-center justify-between px-5 py-3.5 border-b border-[#e6e6e6] bg-[#ffffff] sticky top-0 z-40">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="focus:outline-none cursor-pointer"
        >
          <MozaicLogo size="md" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-9 h-9 rounded-full bg-[#f7f7f5] border border-[#e6e6e6] flex items-center justify-center text-[#000000] hover:bg-[#e6e6e6] transition-colors cursor-pointer"
          aria-label="Tutup dan kembali ke beranda"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* =========================================================================
          MOBILE ONLY TOP NAVY BANNER (< 960px) — GAMBAR 2
          ========================================================================= */}
      <div className="block lg:hidden bg-[#1f1d3d] text-[#ffffff] px-5 py-6">
        <span className="font-mono text-[10.5px] tracking-[0.54px] uppercase text-[#ffffff]/80 font-normal block mb-1.5">
          STANDARDIZED COLLABORATION
        </span>
        <h1 className="font-sans font-[340] text-[20px] sm:text-[22px] leading-snug text-[#ffffff] mb-2">
          Satu profil terstandar untuk semua proyek lintas fakultas.
        </h1>
        <span className="font-mono text-[10px] tracking-[0.54px] uppercase text-[#ffffff]/60 font-normal block">
          HACKATHON · PKM · GEMASTIK · CAPSTONE
        </span>
      </div>

      {/* =========================================================================
          MAIN AUTH WRAPPER (SPLIT 2 COLUMNS ON DESKTOP) — GAMBAR 1
          ========================================================================= */}
      <main className="flex-1 w-full max-w-[1360px] mx-auto px-5 sm:px-8 xl:px-14 py-6 sm:py-8 lg:py-4 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-center">
          {/* -----------------------------------------------------------------------
              KOLOM KIRI: FORM AUTHENTICATION (Col Span 6 / 50%)
              ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 w-full flex flex-col justify-center items-center lg:items-start">
            <div className="w-full max-w-[420px]">
              {/* Tab Switcher: Masuk vs Daftar Akun */}
              <div className="bg-[#f7f7f5] p-1 rounded-[50px] border border-[#e6e6e6] flex items-center w-full mb-8">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 rounded-[50px] font-sans font-[480] text-[14px] text-center transition-colors cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-[#000000] text-[#ffffff]'
                      : 'text-[#000000] hover:bg-[#ffffff]'
                  }`}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 rounded-[50px] font-sans font-[480] text-[14px] text-center transition-colors cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-[#000000] text-[#ffffff]'
                      : 'text-[#000000] hover:bg-[#ffffff]'
                  }`}
                >
                  Daftar Akun
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 className="font-sans font-[700] text-[24px] sm:text-[26px] leading-tight text-[#000000] mb-2">
                  {authMode === 'login'
                    ? 'Masuk ke Workspace Mozaic'
                    : 'Daftar Akun Mahasiswa'}
                </h2>
                <p className="font-sans font-[320] text-[13.5px] leading-relaxed text-[#000000]">
                  {authMode === 'login'
                    ? 'Gunakan email kampus atau akun Google untuk mulai berkolaborasi.'
                    : 'Buat profil kompetensi terstandar untuk bergabung dalam formasi tim.'}
                </p>
              </div>

              {/* Tombol Lanjutkan dengan Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-[48px] rounded-[50px] border border-[#e6e6e6] bg-[#ffffff] hover:bg-[#f7f7f5] transition-colors flex items-center justify-center gap-2.5 font-sans font-[480] text-[14px] text-[#000000] cursor-pointer mb-5 select-none"
              >
                {/* Official Google G SVG Icon */}
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Lanjutkan dengan Google</span>
              </button>

              {/* Divider ATAU EMAIL KAMPUS */}
              <div className="flex items-center gap-3 my-5">
                <span className="flex-1 h-[1px] bg-[#e6e6e6]" />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.54px] uppercase text-[#000000] whitespace-nowrap font-normal">
                  ATAU EMAIL KAMPUS
                </span>
                <span className="flex-1 h-[1px] bg-[#e6e6e6]" />
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <>
                    <div>
                      <label className="font-mono text-[11px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-1.5 block">
                        NAMA LENGKAP
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nama lengkap Anda"
                        className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans font-[330] text-[14px] text-[#000000] focus:outline-none focus:border-[#000000]"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[11px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-1.5 block">
                        FAKULTAS &amp; PRODI
                      </label>
                      <input
                        type="text"
                        required
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        placeholder="Contoh: Fasilkom UI / FSRD ITB"
                        className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans font-[330] text-[14px] text-[#000000] focus:outline-none focus:border-[#000000]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="font-mono text-[11px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-1.5 block">
                    EMAIL KAMPUS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@kampus.ac.id"
                    className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans font-[330] text-[14px] text-[#000000] focus:outline-none focus:border-[#000000]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-[11px] tracking-[0.54px] uppercase text-[#000000] font-normal">
                      PASSWORD
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Fitur reset password demo: Silakan gunakan password default')}
                      className="font-sans font-[330] text-[12px] text-[#000000] hover:underline cursor-pointer"
                    >
                      Lupa password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 8 karakter"
                      className="w-full h-[48px] pl-4 pr-11 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans font-[330] text-[14px] text-[#000000] focus:outline-none focus:border-[#000000]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#000000] hover:opacity-70 cursor-pointer focus:outline-none"
                      aria-label="Lihat kata sandi"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Tombol Submit Masuk (Primary Pill Black) */}
                <button
                  type="submit"
                  className="w-full h-[48px] rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[15px] sm:text-[16px] hover:bg-[#1a1a1a] transition-colors cursor-pointer mt-5"
                >
                  {authMode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="text-center mt-6">
                {authMode === 'login' ? (
                  <p className="font-sans font-[320] text-[13px] text-[#000000]">
                    Baru di Mozaic?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="font-[540] underline hover:opacity-80 cursor-pointer"
                    >
                      Buat Profil Kompetensi
                    </button>
                  </p>
                ) : (
                  <p className="font-sans font-[320] text-[13px] text-[#000000]">
                    Sudah punya akun?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="font-[540] underline hover:opacity-80 cursor-pointer"
                    >
                      Masuk ke Workspace
                    </button>
                  </p>
                )}
                {/* Monospace Caption Subline */}
                <span className="font-mono text-[10px] tracking-[0.54px] uppercase text-[#000000] block mt-2.5 font-normal">
                  BUAT PROFIL KOMPETENSI MAHASISWA ·
                </span>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              KOLOM KANAN: NAVY EDITORIAL CARD (#1f1d3d) — KHUSUS DESKTOP (GAMBAR 1)
              ----------------------------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-6 w-full h-full min-h-[580px]">
            <div className="w-full bg-[#1f1d3d] text-[#ffffff] rounded-[28px] p-8 xl:p-12 flex flex-col justify-between">
              {/* Header Box */}
              <div>
                <span className="font-mono text-[11px] tracking-[0.54px] uppercase text-[#ffffff]/80 font-normal block mb-3">
                  STANDARDIZED COLLABORATION
                </span>
                <h2 className="font-sans font-[340] text-[34px] xl:text-[40px] leading-[1.12] text-[#ffffff] tracking-[-0.96px] mb-8">
                  Satu profil<br />
                  terstandar untuk<br />
                  semua lomba dan<br />
                  riset.
                </h2>

                {/* Nested Live Profile & Match Card Stack */}
                <div className="space-y-3 max-w-[460px]">
                  {/* Kartu 1: Cream Block (#f4ecd6) — Profil Kandidat */}
                  <div className="bg-[#f4ecd6] text-[#000000] rounded-[18px] p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#000000] text-[#ffffff] font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                          RP
                        </div>
                        <div>
                          <h4 className="font-sans font-[700] text-[14px] leading-tight text-[#000000]">
                            Raka Pratama
                          </h4>
                          <p className="font-sans font-[320] text-[11px] text-[#000000] mt-0.5">
                            Ilmu Komputer · Fasilkom UI
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold tracking-[0.54px] text-[#000000] uppercase whitespace-nowrap">
                        12 JAM/MINGGU
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-[50px] bg-[#ffffff] border border-[#e6e6e6] font-mono text-[10px] text-[#000000]">
                        BACKEND
                      </span>
                      <span className="px-2.5 py-0.5 rounded-[50px] bg-[#ffffff] border border-[#e6e6e6] font-mono text-[10px] text-[#000000]">
                        DATA/AI
                      </span>
                      <span className="px-2.5 py-0.5 rounded-[50px] bg-[#ffffff] border border-[#e6e6e6] font-mono text-[10px] text-[#000000]">
                        PRODUCT MANAGEMENT
                      </span>
                    </div>

                    <p className="font-sans font-[320] text-[12px] leading-relaxed text-[#000000]">
                      &ldquo;Pengembang arsitektur microservices Go &amp; pipeline scraping data iklim.&rdquo;
                    </p>
                  </div>

                  {/* Kartu 2: Mint Block (#c8e6cd) — Status Lamaran & Quota Lock */}
                  <div className="bg-[#c8e6cd] text-[#000000] rounded-[18px] p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[10px] font-bold tracking-[0.54px] text-[#000000] uppercase">
                        92% MATCH SCORE · FIT &amp; GAP READY
                      </span>
                      <span className="px-2.5 py-0.5 rounded-[50px] bg-[#ffffff] text-[#1ea64a] border border-[#e6e6e6] font-mono text-[9.5px] font-bold uppercase whitespace-nowrap">
                        ✓ ACCEPTED
                      </span>
                    </div>

                    <h4 className="font-sans font-[700] text-[13.5px] text-[#000000] mb-3">
                      TaniLensa: Deteksi Dini Hama Padi (Gemastik)
                    </h4>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1ea64a]" />
                        <span className="font-mono text-[10px] font-bold tracking-[0.54px] text-[#000000] uppercase">
                          KUOTA TERKUNCI (FILLED)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => window.open('https://wa.me/6281200000001', '_blank')}
                        className="px-3.5 py-1 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[11px] leading-none hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                      >
                        Chat via WhatsApp →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Editorial Caption */}
              <div className="mt-8 pt-4">
                <span className="font-mono text-[10.5px] tracking-[0.54px] uppercase text-[#ffffff]/60 font-normal block">
                  HACKATHON · PKM · GEMASTIK · CAPSTONE/RISET
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Spacer bawah untuk desktop */}
      <footer className="hidden lg:block py-4" />
    </div>
  );
}
