import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { InitialAvatar } from '../components/ui/InitialAvatar';
import { ColorBlock } from '../components/ui/ColorBlock';
import { SKILL_CATEGORIES } from '../constants/taxonomies';
import { Check, ShieldCheck, Lock, ExternalLink, Save, User } from 'lucide-react';

function ProfileForm({ currentUser }) {
  const { updateProfile } = useMozaic();

  // Local form state diinisialisasi dari currentUser
  const [name, setName] = useState(currentUser?.name || '');
  const [faculty, setFaculty] = useState(currentUser?.faculty || '');
  const [major, setMajor] = useState(currentUser?.major || '');
  const [skills, setSkills] = useState(currentUser?.skills || []);
  const [miniPortfolio, setMiniPortfolio] = useState(
    currentUser?.mini_portfolio || ''
  );
  const [portfolioUrl, setPortfolioUrl] = useState(
    currentUser?.portfolio_url || ''
  );
  const [weeklyHours, setWeeklyHours] = useState(currentUser?.weekly_hours || 10);
  const [contactPlatform, setContactPlatform] = useState(
    currentUser?.contact_platform || 'whatsapp'
  );
  const [contactUrl, setContactUrl] = useState(currentUser?.contact_url || '');

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Toggle skill selection dengan batas ketat maks 5
  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      if (skills.length >= 5) return; // Kunci jika sudah 5
      setSkills([...skills, skill]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        name,
        faculty,
        major,
        skills,
        mini_portfolio: miniPortfolio,
        portfolio_url: portfolioUrl,
        weekly_hours: Number(weeklyHours),
        contact_platform: contactPlatform,
        contact_url: contactUrl,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan profil.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Kolom Kiri: Form Edit (60% -> col-span-7) */}
      <div className="lg:col-span-7">
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 rounded-[24px] elevation-1 bg-[#ffffff] flex flex-col gap-8"
        >
          {/* Feedback Banner */}
          {saveSuccess && (
            <div className="p-4 rounded-[12px] bg-[#c8e6cd] border border-[#1ea64a] text-[#000000] flex items-center gap-3">
              <Check className="w-5 h-5 text-[#1ea64a]" />
              <span className="font-sans text-[14px] font-medium">
                Profil berhasil diperbarui dan tersimpan ke sesi aktif!
              </span>
            </div>
          )}

          {/* Bagian 1: Data Dasar */}
          <div>
            <span className="font-caption text-[#000000] opacity-60 block mb-2">
              BAGIAN 1 • IDENTITAS AKADEMIK
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="font-caption text-[#000000] block mb-1.5">
                  NAMA LENGKAP
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap Mahasiswa"
                  className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[15px] focus:outline-none focus:border-[#000000]"
                />
              </div>

              <div>
                <label className="font-caption text-[#000000] block mb-1.5">
                  FAKULTAS
                </label>
                <input
                  type="text"
                  required
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="Contoh: Fasilkom UI / FSRD ITB"
                  className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[15px] focus:outline-none focus:border-[#000000]"
                />
              </div>

              <div>
                <label className="font-caption text-[#000000] block mb-1.5">
                  PROGRAM STUDI
                </label>
                <input
                  type="text"
                  required
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="Contoh: Ilmu Komputer / DKV"
                  className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[15px] focus:outline-none focus:border-[#000000]"
                />
              </div>
            </div>
          </div>

          {/* Bagian 2: 10 Kategori Keahlian Baku (Max 5) */}
          <div className="pt-6 border-t border-[#f1f1f1]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-caption text-[#000000] opacity-60">
                BAGIAN 2 • 10 KATEGORI KEAHLIAN RESMI
              </span>
              <span
                className={`font-mono text-[12px] font-medium ${
                  skills.length === 5 ? 'text-[#1ea64a]' : 'text-[#000000]'
                }`}
              >
                TERPILIH: {skills.length}/5
              </span>
            </div>
            <p className="font-body-sm text-[13px] text-[#000000] font-light mb-4">
              Pilih maksimal 5 kategori keahlian yang paling mewakili kompetensi Anda.
              Sisa tag akan terkunci otomatis saat kuota 5 tercapai.
            </p>

            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.map((skill) => {
                const isSelected = skills.includes(skill);
                const isLocked = !isSelected && skills.length >= 5;

                return (
                  <button
                    key={skill}
                    type="button"
                    disabled={isLocked}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3.5 py-2 rounded-[6px] font-mono text-[12px] uppercase tracking-[0.54px] select-none transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#000000] text-[#ffffff] border border-[#000000]'
                        : isLocked
                        ? 'bg-[#f7f7f5] text-[#000000] opacity-30 border border-[#e6e6e6] cursor-not-allowed'
                        : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6] hover:bg-[#f7f7f5]'
                    }`}
                  >
                    {isSelected ? `✓ ${skill}` : skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bagian 3: Mini-Portfolio (Max 280 chars) */}
          <div className="pt-6 border-t border-[#f1f1f1]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-caption text-[#000000] opacity-60">
                BAGIAN 3 • MINI-PORTFOLIO RINGKAS
              </span>
              <span
                className={`font-mono text-[12px] ${
                  miniPortfolio.length > 260 ? 'text-[#ff3d8b]' : 'text-[#000000]'
                }`}
              >
                {miniPortfolio.length}/280 KARAKTER
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={280}
              required
              value={miniPortfolio}
              onChange={(e) => setMiniPortfolio(e.target.value)}
              placeholder="Rangkum pengalaman proyek, hackathon, atau peran unggulan Anda dalam 1-2 kalimat (maks 280 karakter)..."
              className="w-full p-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] leading-relaxed focus:outline-none focus:border-[#000000] resize-none"
            />

            <div className="mt-3">
              <label className="font-caption text-[#000000] block mb-1.5">
                LINK PORTOFOLIO / REPOSITORY (OPSIONAL)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://github.com/... atau https://behance.net/..."
                  className="w-full h-[48px] px-4 pr-10 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
                />
                <ExternalLink className="w-4 h-4 text-[#000000] opacity-40 absolute right-3.5 top-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bagian 4: Komitmen Jam Kerja Mingguan */}
          <div className="pt-6 border-t border-[#f1f1f1]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-caption text-[#000000] opacity-60">
                BAGIAN 4 • KOMITMEN WAKTU KERJA
              </span>
              <span className="font-mono text-[14px] font-bold text-[#000000]">
                {weeklyHours} JAM/MINGGU
              </span>
            </div>
            <p className="font-body-sm text-[13px] text-[#000000] font-light mb-4">
              Tentukan alokasi waktu luang yang siap Anda curahkan untuk tim setiap
              minggunya (rentang 4 s.d. 30 jam).
            </p>
            <input
              type="range"
              min="4"
              max="30"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex justify-between font-caption text-[11px] opacity-60 mt-1">
              <span>4 Jam/Minggu (Kasual)</span>
              <span>15 Jam/Minggu (Optimal)</span>
              <span>30 Jam/Minggu (Intensif)</span>
            </div>
          </div>

          {/* Bagian 5: Kontak Instan & Catatan Privasi */}
          <div className="pt-6 border-t border-[#f1f1f1]">
            <span className="font-caption text-[#000000] opacity-60 block mb-2">
              BAGIAN 5 • KONTAK INSTAN (WHATSAPP / TELEGRAM)
            </span>

            {/* Radio Switcher Platform */}
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => setContactPlatform('whatsapp')}
                className={`px-4 py-2 rounded-[50px] font-button text-[14px] cursor-pointer transition-colors ${
                  contactPlatform === 'whatsapp'
                    ? 'bg-[#000000] text-[#ffffff]'
                    : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6]'
                }`}
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setContactPlatform('telegram')}
                className={`px-4 py-2 rounded-[50px] font-button text-[14px] cursor-pointer transition-colors ${
                  contactPlatform === 'telegram'
                    ? 'bg-[#000000] text-[#ffffff]'
                    : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6]'
                }`}
              >
                Telegram
              </button>
            </div>

            <div>
              <label className="font-caption text-[#000000] block mb-1.5">
                TAUTAN ATAU NOMOR/USERNAME ({contactPlatform.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={contactUrl}
                onChange={(e) => setContactUrl(e.target.value)}
                placeholder={
                  contactPlatform === 'whatsapp'
                    ? 'https://wa.me/62812xxxxxxx'
                    : 'https://t.me/username'
                }
                className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
              />
            </div>

            <div className="mt-3 p-3 rounded-[8px] bg-[#f7f7f5] border border-[#e6e6e6] flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-[#000000] opacity-70 flex-shrink-0 mt-0.5" />
              <p className="font-caption text-[11px] text-[#000000] opacity-70 leading-relaxed">
                Tautan kontak ini diamankan dan <strong>hanya terbuka</strong> bagi
                Ketua Tim saat lamaran Anda dinyatakan diterima (status ACCEPTED).
              </p>
            </div>
          </div>

          {/* Tombol Simpan Profil */}
          <div className="pt-6 border-t border-[#f1f1f1] flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSaving}
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Profil'}</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Kolom Kanan: Live Profile Preview (40% -> col-span-5) */}
      <div className="lg:col-span-5 lg:sticky lg:top-20">
        <ColorBlock variant="cream" fullBleedOnMobile={false}>
          <div>
            <span className="font-eyebrow text-[#000000]">
              LIVE PROFILE PREVIEW
            </span>
            <p className="font-caption text-[#000000] opacity-70 mt-1 mb-6">
              Tampilan kartu yang dilihat Ketua Tim saat Anda menekan Apply 1-Klik:
            </p>

            {/* Kartu Profil Live Preview */}
            <div className="bg-[#ffffff] elevation-1 rounded-[24px] p-6 text-[#000000]">
              {/* Header Profil */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#f1f1f1] mb-4">
                <InitialAvatar
                  initials={currentUser?.initials || 'MZ'}
                  bgColor={currentUser?.avatarColor || '#dceeb1'}
                  size="lg"
                />
                <div className="min-w-0">
                  <h3 className="font-card-title text-[20px] text-[#000000] truncate">
                    {name || 'Nama Kandidat'}
                  </h3>
                  <p className="font-caption text-[11px] text-[#000000] opacity-70 truncate">
                    {faculty || 'Fakultas'} {major ? `• ${major}` : ''}
                  </p>
                </div>
              </div>

              {/* Skill Chips */}
              <div className="mb-4">
                <p className="font-caption text-[10px] text-[#000000] opacity-60 mb-2">
                  KEAHLIAN TERPILIH ({skills.length}/5):
                </p>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <Badge key={s} size="sm" variant="default">
                        {s}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="font-caption text-[11px] opacity-40 italic">
                    Belum ada keahlian yang dipilih
                  </p>
                )}
              </div>

              {/* Mini Portfolio Preview */}
              <div className="mb-4">
                <p className="font-caption text-[10px] text-[#000000] opacity-60 mb-1.5">
                  MINI-PORTFOLIO:
                </p>
                <p className="font-body-sm text-[13px] text-[#000000] font-light bg-[#f7f7f5] p-3 rounded-[8px] border border-[#e6e6e6] italic">
                  &quot;{miniPortfolio || 'Tuliskan ringkasan portofolio Anda...'}&quot;
                </p>
                {portfolioUrl && (
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-caption text-[11px] text-[#000000] underline mt-1.5 inline-flex items-center gap-1"
                  >
                    <span>Lihat Tautan Portofolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Metrik Jam & Status Kontak */}
              <div className="pt-3 border-t border-[#f1f1f1] grid grid-cols-2 gap-2">
                <div>
                  <span className="font-caption text-[10px] opacity-60 block">
                    KOMITMEN
                  </span>
                  <span className="font-mono text-[13px] font-medium">
                    {weeklyHours} JAM/MG
                  </span>
                </div>
                <div>
                  <span className="font-caption text-[10px] opacity-60 block">
                    KONTAK INSTAN
                  </span>
                  <span className="font-mono text-[13px] font-medium uppercase inline-flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#1ea64a]" />
                    {contactPlatform}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Kepatuhan Desain */}
            <div className="mt-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1ea64a]" />
              <span className="font-caption text-[11px] text-[#000000]">
                REAL-TIME SYNC • PREVIEW KONSISTEN DENGAN BACKEND
              </span>
            </div>
          </div>
        </ColorBlock>
      </div>
    </div>
  );
}

/**
 * Page 07 — Standardized Student Profile (/profile) — MVP #1
 */
export function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser } = useMozaic();

  if (!currentUser) {
    return (
      <div className="container-mozaic py-16 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#f7f7f5] border border-[#e6e6e6] flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-[#000000] opacity-40" />
        </div>
        <h2 className="font-card-title text-[22px] text-[#000000] mb-2">
          Masuk untuk Mengakses Profil
        </h2>
        <p className="font-body-sm text-[#000000] font-light mb-6">
          Masuk atau daftarkan akun kampus Anda untuk melihat dan memperbarui profil kompetensi mahasiswa Anda.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/auth')}>
          Masuk Sekarang
        </Button>
      </div>
    );
  }

  return (
    <div className="container-mozaic py-10">
      {/* Header Halaman */}
      <div className="mb-10">
        <span className="font-eyebrow text-[#000000]">
          STANDARDIZED STUDENT PROFILE • MVP #1
        </span>
        <h1 className="font-display-lg text-[#000000] mt-1">
          Profil Kompetensi Mahasiswa
        </h1>
        <p className="font-body-lg text-[#000000] font-light mt-2 max-w-2xl">
          Standarisasi profil lintas fakultas untuk mempercepat pencocokan tim lomba
          dan riset kampus tanpa friksi resume formal yang berbelit.
        </p>
      </div>

      <ProfileForm key={currentUser.id} currentUser={currentUser} />
    </div>
  );
}
