import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { MozaicLogo } from '../components/ui/MozaicLogo';
import { Button } from '../components/ui/Button';
import { InitialAvatar } from '../components/ui/InitialAvatar';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * Page 02 — Auth: Login & Register (/auth)
 * Aturan:
 * - Layout: Split-Screen 50/50 (Desktop), 1 kolom (Mobile)
 * - Panel Kiri: #ffffff, Form Masuk/Daftar + Quick Demo Persona Switcher (4 persona)
 * - Panel Kanan: --block-navy #1f1d3d, teks WAJIB #ffffff, kutipan survei 40 mahasiswa
 * - Tanpa drop shadow berat, tombol pill ketat
 */
export function AuthPage() {
  const navigate = useNavigate();
  const { switchPersona, personas } = useMozaic();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [faculty, setFaculty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Untuk mode demo, langsung masuk sebagai persona pertama jika login standar
    if (personas.length > 0) {
      switchPersona(personas[0]);
    }
    navigate('/explore');
  };

  const handleQuickPersonaLogin = async (persona) => {
    await switchPersona(persona);
    navigate('/explore');
  };

  return (
    <div className="w-full min-h-[calc(100vh-56px)] grid grid-cols-1 lg:grid-cols-12 bg-[#ffffff]">
      {/* 1. PANEL KIRI: FORM & DEMO PERSONA SWITCHER (Col 6 / 50%) */}
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 border-r border-[#e6e6e6]">
        <div>
          {/* Brand Logo Header */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="cursor-pointer focus:outline-none"
            >
              <MozaicLogo size="md" />
            </button>
          </div>

          {/* Pill Tab Switcher: Masuk vs Daftar */}
          <div className="flex items-center gap-2 mb-8 bg-[#f7f7f5] p-1.5 rounded-[50px] border border-[#e6e6e6] w-fit">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`px-5 py-2 rounded-[50px] font-button text-[14px] transition-colors cursor-pointer ${
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
              className={`px-5 py-2 rounded-[50px] font-button text-[14px] transition-colors cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#000000] text-[#ffffff]'
                  : 'text-[#000000] hover:bg-[#ffffff]'
              }`}
            >
              Daftar Akun
            </button>
          </div>

          <div className="mb-6">
            <h2 className="font-card-title text-[24px] text-[#000000]">
              {authMode === 'login'
                ? 'Selamat Datang di Mozaic'
                : 'Buat Profil Kolaborator Baru'}
            </h2>
            <p className="font-body-sm text-[#000000] font-light mt-1">
              {authMode === 'login'
                ? 'Masuk untuk mengelola formasi tim atau melamar peran lomba.'
                : 'Daftarkan diri Anda untuk mulai terhubung dengan mahasiswa lintas fakultas.'}
            </p>
          </div>

          {/* Form Standar */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="font-caption text-[#000000] block mb-1">
                    NAMA LENGKAP
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama lengkap Anda"
                    className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
                  />
                </div>

                <div>
                  <label className="font-caption text-[#000000] block mb-1">
                    FAKULTAS & PRODI
                  </label>
                  <input
                    type="text"
                    required
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="Contoh: Fasilkom UI / FSRD ITB"
                    className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="font-caption text-[#000000] block mb-1">
                EMAIL KAMPUS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@kampus.ac.id"
                className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
              />
            </div>

            <div>
              <label className="font-caption text-[#000000] block mb-1">
                KATA SANDI
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
            >
              {authMode === 'login' ? 'Masuk ke Mozaic' : 'Daftar Sekarang'}
            </Button>
          </form>

          {/* Quick Demo Persona Switcher (Khusus Video Semifinal 2 Menit) */}
          <div className="mt-10 pt-8 border-t border-[#f1f1f1] max-w-md">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#ff3d8b]" />
              <span className="font-caption text-[11px] text-[#000000] font-bold tracking-[0.54px]">
                QUICK DEMO PERSONA SWITCHER (1-KLIK MASUK):
              </span>
            </div>
            <p className="font-caption text-[11px] opacity-60 mb-4">
              Pilih persona instan untuk mencoba seluruh alur demo tanpa perlu login
              manual:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {personas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleQuickPersonaLogin(p)}
                  className="flex items-center gap-2.5 p-3 rounded-[12px] border border-[#e6e6e6] bg-[#ffffff] hover:bg-[#f7f7f5] hover:border-[#000000] text-left transition-all cursor-pointer"
                >
                  <InitialAvatar
                    initials={p.initials}
                    bgColor={p.avatarColor}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <p className="font-sans text-[13px] font-medium text-[#000000] truncate">
                      {p.name}
                    </p>
                    <p className="font-caption text-[10px] text-[#000000] opacity-60 truncate">
                      {p.skills[0]} • {p.faculty.split(' ')[0]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 text-center sm:text-left">
          <p className="font-caption text-[11px] opacity-50">
            STACK 2026 PROTOTYPE • SYNTHETIC TEST USER SESSIONS
          </p>
        </div>
      </div>

      {/* 2. PANEL KANAN: NAVY EDITORIAL SURVEI PANEL (Col 6 / 50%) */}
      <div className="lg:col-span-6 bg-[#1f1d3d] text-[#ffffff] p-8 sm:p-12 md:p-16 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[50px] bg-[#ffffff]/10 border border-[#ffffff]/20 mb-8">
            <ShieldCheck className="w-4 h-4 text-[#dceeb1]" />
            <span className="font-eyebrow text-[12px] text-[#dceeb1]">
              VALIDATED BY 40 STUDENTS SURVEY
            </span>
          </div>

          <h2 className="font-display-lg text-[#ffffff] text-[32px] md:text-[44px] leading-tight mb-6">
            &quot;80% mahasiswa terjebak di circle kelas sendiri. Saatnya membangun
            tim yang seimbang.&quot;
          </h2>

          <p className="font-body-lg text-[#ffffff] font-light opacity-90 max-w-xl mb-10 leading-relaxed">
            Survei internal kami membuktikan friksi terbesar mahasiswa bukan
            ketiadaan ide lomba, melainkan ketiadaan wadah terstruktur untuk mencari
            kandidat dengan keahlian pelengkap di luar fakultas mereka.
          </p>

          {/* 3 Kartu Bukti Metrik Datar */}
          <div className="space-y-4 max-w-xl">
            {[
              {
                percent: '80%',
                title: 'Batal Daftar Lomba',
                desc: 'Pernah batal mendaftar akibat lambatnya pencarian anggota (3 hari s.d. >2 minggu).',
              },
              {
                percent: '75%',
                title: 'Ketimpangan Keahlian',
                desc: 'Tim didominasi satu rumpun ilmu; kekurangan desainer produk, presenter, atau engineer teknis.',
              },
              {
                percent: '60%',
                title: 'Isolasi Antar-Fakultas',
                desc: 'Tidak memiliki kontak rekan potensial di fakultas lain di kampus sendiri.',
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[16px] bg-[#ffffff]/5 border border-[#ffffff]/10 flex items-start gap-4"
              >
                <div className="flex-shrink-0 font-mono text-[24px] font-bold text-[#dceeb1]">
                  {stat.percent}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-sans text-[15px] font-medium text-[#ffffff]">
                      {stat.title}
                    </h4>
                    <Check className="w-3.5 h-3.5 text-[#1ea64a]" />
                  </div>
                  <p className="font-body-sm text-[13px] text-[#ffffff] opacity-75 font-light leading-snug">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Panel Kanan */}
        <div className="pt-10 mt-10 border-t border-[#ffffff]/10 flex items-center justify-between text-[#ffffff] opacity-60">
          <span className="font-caption text-[11px]">
            DATASET SURVEI N = 40 • GDGOC ITB
          </span>
          <span className="font-caption text-[11px]">
            PEMALU BUKAN PEMULA
          </span>
        </div>
      </div>
    </div>
  );
}
