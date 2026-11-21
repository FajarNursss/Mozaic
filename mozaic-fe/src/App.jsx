import { useState } from 'react';
import { MozaicProvider } from './context/MozaicContext';
import { useMozaic } from './context/useMozaic';
import { TopNav } from './components/layout/TopNav';
import { Footer } from './components/layout/Footer';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';
import { ColorBlock } from './components/ui/ColorBlock';
import { MozaicLogo } from './components/ui/MozaicLogo';
import { InitialAvatar } from './components/ui/InitialAvatar';
import { DemoBadge } from './components/layout/DemoBadge';
import { SKILL_CATEGORIES, ACTIVITY_CATEGORIES } from './constants/taxonomies';
import { COMPETITION_TEMPLATES } from './constants/templates';
import { Check, Sparkles, ShieldCheck, FileText } from 'lucide-react';

function FoundationShowcase() {
  const { currentUser, switchPersona, personas, projects } = useMozaic();
  const [activeTab, setActiveTab] = useState('overview');
  const [counter, setCounter] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#000000]">
      {/* 56px Sticky TopNav Shell */}
      <TopNav
        activePath={activeTab}
        currentUser={currentUser}
        personas={personas}
        onSelectPersona={switchPersona}
        onNavigate={(path) => setActiveTab(path)}
      />

      <main className="flex-1 w-full">
        {/* Section 1: Hero Monochrome Editorial Frame */}
        <section className="container-mozaic pt-12 pb-16">
          <div className="flex flex-col items-start gap-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="font-eyebrow text-[#000000]">
                FOUNDATION & DESIGN TOKENS
              </span>
              <DemoBadge />
            </div>

            <h1 className="font-display-xl text-[#000000]">
              Rakit Tim Lintas Fakultas, Tanpa Drama.
            </h1>

            <p className="font-body-lg text-[#000000] font-light max-w-2xl">
              Mozaic Visual System — Fondasi sistem desain monokrom editorial dengan
              blok warna pastel terukur untuk kepatuhan ketat STACK 2026.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setCounter((c) => c + 1)}
              >
                Tombol Pill Primary ({counter})
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => alert('Tombol Pill Secondary aktif!')}
              >
                Tombol Pill Secondary
              </Button>
              <Button
                variant="accent"
                size="md"
                onClick={() => alert('Promo Accent CTA (#ff3d8b)')}
              >
                Promo Single-Shot
              </Button>
            </div>
          </div>
        </section>

        {/* Marquee Strip (#000000) */}
        <div className="w-full h-[40px] bg-[#000000] text-[#ffffff] flex items-center overflow-hidden whitespace-nowrap">
          <div className="inline-flex gap-8 items-center font-mono text-[13px] tracking-[0.54px] uppercase px-4">
            <span>FRONTEND • UI/UX DESIGN • DATA/AI • BUSINESS/PITCHING • HACKATHON • GEMASTIK • PKM • CAPSTONE/RISET</span>
            <span>•</span>
            <span>100% TOKEN COMPLIANCE • STRICT PILL BUTTONS • NO ARBITRARY SHADOWS</span>
          </div>
        </div>

        {/* Spacer Canvas Putih (Memenuhi aturan ritme warna) */}
        <div className="h-16" />

        {/* Section 2: Lime Color-Block (Cara Kerja & Verifikasi Token) */}
        <div className="container-mozaic">
          <ColorBlock variant="lime">
            <div className="flex flex-col gap-6">
              <span className="font-eyebrow text-[#000000]">
                TOKEN SURFACE: LIME (#DCEEB1) • CARA KERJA & AI FIT
              </span>
              <h2 className="font-display-lg text-[#000000]">
                4 Langkah Inti Kolaborasi
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                {[
                  {
                    step: '01',
                    title: 'Profil Terstandarisasi',
                    desc: 'Input maks 5 skill tags, komitmen jam, dan portofolio ringkas.',
                  },
                  {
                    step: '02',
                    title: 'AI Scoper & Templat',
                    desc: 'Ubah ide mentah menjadi rincian peran terstruktur dalam hitungan detik.',
                  },
                  {
                    step: '03',
                    title: 'Lamaran 1-Klik',
                    desc: 'Kirim lamaran instan tanpa pengisian form formulir berulang.',
                  },
                  {
                    step: '04',
                    title: 'Review & Kunci Kuota',
                    desc: 'Analisis kecocokan AI dan pembukaan kontak WhatsApp/Telegram otomatis.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="bg-[#ffffff] elevation-1 rounded-[24px] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-caption text-[#000000] opacity-60">
                        LANGKAH {item.step}
                      </span>
                      <h3 className="font-card-title text-[#000000] mt-2 mb-3">
                        {item.title}
                      </h3>
                      <p className="font-body-sm text-[#000000] font-light">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center text-[#1ea64a]">
                      <Check className="w-5 h-5 mr-1.5" />
                      <span className="font-caption text-[11px] text-[#000000]">
                        TERVALIDASI
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ColorBlock>
        </div>

        {/* Spacer Canvas Putih */}
        <div className="h-16" />

        {/* Section 3: Lilac Color-Block (AI Scoper Surface) */}
        <div className="container-mozaic">
          <ColorBlock variant="lilac">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="font-eyebrow text-[#000000]">
                  TOKEN SURFACE: LILAC (#C5B0F4) • AI SCOPER SURFACE
                </span>
                <h2 className="font-display-lg text-[#000000] mt-2">
                  DeepSeek AI Scoper Integration
                </h2>
                <p className="font-subhead text-[#000000] mt-3">
                  Dilengkapi perlindungan timeout 5000ms dan deterministic fallback
                  templat kompetisi.
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => alert('AI Scoper Triggered')}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Coba AI Scoper</span>
              </Button>
            </div>
          </ColorBlock>
        </div>

        {/* Spacer Canvas Putih */}
        <div className="h-16" />

        {/* Section 4: Split Color Blocks Showcase (Cream & Mint) */}
        <div className="container-mozaic">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ColorBlock variant="cream">
              <span className="font-eyebrow text-[#000000]">
                TOKEN SURFACE: CREAM (#F4ECD6)
              </span>
              <h3 className="font-card-title text-[#000000] mt-2">
                Live Profile Preview
              </h3>
              <p className="font-body-sm text-[#000000] mt-2">
                Digunakan untuk panel tinjauan profil kandidat real-time pada halaman
                profil dan drawer konfirmasi lamaran.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <InitialAvatar
                  initials={currentUser.initials}
                  bgColor={currentUser.avatarColor}
                  size="lg"
                />
                <div>
                  <p className="font-card-title text-[18px]">{currentUser.name}</p>
                  <p className="font-caption text-[#000000] opacity-70">
                    {currentUser.faculty}
                  </p>
                </div>
              </div>
            </ColorBlock>

            <ColorBlock variant="mint">
              <span className="font-eyebrow text-[#000000]">
                TOKEN SURFACE: MINT (#C8E6CD)
              </span>
              <h3 className="font-card-title text-[#000000] mt-2">
                Peran OPEN & Kolaborasi Aktif
              </h3>
              <p className="font-body-sm text-[#000000] mt-2">
                Digunakan untuk menyorot peran aktif yang sedang dipilih oleh kandidat
                sebelum menekan tombol lamaran 1-klik.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="open">FRONTEND • 0/1 OPEN</Badge>
                <Badge variant="accepted">TERPILIH • MATCH 95%</Badge>
              </div>
            </ColorBlock>
          </div>
        </div>

        {/* Spacer Canvas Putih */}
        <div className="h-16" />

        {/* Section 5: Navy Split-Panel Editorial Showcase */}
        <div className="container-mozaic">
          <ColorBlock variant="navy">
            <div className="max-w-2xl text-[#ffffff]">
              <span className="font-eyebrow text-[#dceeb1]">
                TOKEN SURFACE: NAVY (#1F1D3D) • PANEL EDITORIAL AUTH
              </span>
              <h2 className="font-headline text-[32px] font-medium text-[#ffffff] mt-4 mb-4">
                80% mahasiswa terjebak di circle kelas sendiri.
              </h2>
              <p className="font-body text-[#ffffff] font-light leading-relaxed">
                Survei kami pada 40 mahasiswa lintas fakultas membuktikan bahwa
                perbedaan jurusan sering kali menjadi dinding penghalang terbesar
                dalam membentuk tim kompetisi berprestasi. Mozaic meruntuhkan batasan
                tersebut.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#1ea64a]" />
                <span className="font-caption text-[#ffffff]">
                  VALIDATED BY 40 STUDENTS • STACK 2026
                </span>
              </div>
            </div>
          </ColorBlock>
        </div>

        {/* Spacer Canvas Putih */}
        <div className="h-16" />

        {/* Section 6: Design System Taxonomy, Logo & Token Inspection */}
        <section className="container-mozaic py-12 border-t border-[#e6e6e6]">
          <div className="flex flex-col gap-8">
            {/* Logo Inspection */}
            <div>
              <span className="font-eyebrow text-[#000000]">
                BRAND ASSET: MOZAIC LOGO SIZES
              </span>
              <h2 className="font-headline text-[#000000] mt-1 mb-4">
                Geometric 4-Tile Logo & Wordmark
              </h2>
              <div className="flex flex-wrap items-center gap-8 p-6 rounded-[24px] elevation-1 bg-[#ffffff]">
                <div className="flex flex-col items-center gap-2">
                  <MozaicLogo size="sm" />
                  <span className="font-caption text-[11px] opacity-60">Small (24px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <MozaicLogo size="md" />
                  <span className="font-caption text-[11px] opacity-60">Medium (32px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <MozaicLogo size="lg" />
                  <span className="font-caption text-[11px] opacity-60">Large (40px)</span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-eyebrow text-[#000000]">
                CANONICAL TAXONOMIES VERIFICATION
              </span>
              <h2 className="font-headline text-[#000000] mt-1">
                10 Kategori Keahlian & 4 Kategori Kegiatan
              </h2>
            </div>

            {/* 10 Skill Badges */}
            <div>
              <p className="font-caption text-[#000000] opacity-60 mb-3">
                10 KATEGORI KEAHLIAN RESMI:
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILL_CATEGORIES.map((skill) => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 4 Activity Badges */}
            <div>
              <p className="font-caption text-[#000000] opacity-60 mb-3">
                4 KATEGORI KEGIATAN:
              </p>
              <div className="flex flex-wrap gap-2">
                {ACTIVITY_CATEGORIES.map((act) => (
                  <Badge key={act} variant="category">
                    {act}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 4 Competition Templates Preview */}
            <div>
              <p className="font-caption text-[#000000] opacity-60 mb-3">
                4 TEMPLAT KOMPETISI SIAP PAKAI (AI SCOPER PRESETS):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COMPETITION_TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="p-5 rounded-[8px] border border-[#e6e6e6] bg-[#f7f7f5] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-[#000000] mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="font-card-title text-[15px]">{tpl.name}</span>
                      </div>
                      <p className="font-body-sm text-[13px] text-[#000000] font-light line-clamp-2">
                        {tpl.defaultTitle}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#e6e6e6] flex items-center justify-between">
                      <Badge size="sm" variant="category">
                        {tpl.category}
                      </Badge>
                      <span className="font-caption text-[11px] opacity-70">
                        {tpl.roles.length} PERAN
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Persona Switcher Quick Row */}
            <div>
              <p className="font-caption text-[#000000] opacity-60 mb-3">
                4 PERSONA DEMO SINTETIS (SEEDED):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {personas.map((p) => {
                  const isCurrent = currentUser.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => switchPersona(p)}
                      className={`p-4 rounded-[16px] border cursor-pointer transition-colors ${
                        isCurrent
                          ? 'border-[#000000] bg-[#f7f7f5]'
                          : 'border-[#e6e6e6] bg-[#ffffff] hover:bg-[#f7f7f5]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <InitialAvatar
                          initials={p.initials}
                          bgColor={p.avatarColor}
                          size="md"
                        />
                        <div className="min-w-0">
                          <p className="font-card-title text-[16px] truncate">
                            {p.name}
                          </p>
                          <p className="font-caption text-[11px] text-[#000000] opacity-70 truncate">
                            {p.faculty}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {p.skills.map((s) => (
                          <Badge key={s} size="sm" variant="default">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Seeded Projects Sample Preview */}
            <div>
              <p className="font-caption text-[#000000] opacity-60 mb-3">
                CONTOH PROYEK SEEDED DARI BANK DATA:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.slice(0, 2).map((proj) => (
                  <div
                    key={proj.id}
                    className="p-6 rounded-[24px] elevation-1 bg-[#ffffff] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="category">{proj.activity_category}</Badge>
                        <span className="font-caption text-[#000000] opacity-60">
                          DEADLINE: {proj.deadline}
                        </span>
                      </div>
                      <h4 className="font-card-title text-[#000000]">{proj.title}</h4>
                      <p className="font-body-sm text-[#000000] font-light mt-2 line-clamp-2">
                        {proj.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#f1f1f1] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <InitialAvatar
                          initials={proj.leader_initials}
                          bgColor={proj.leader_avatar_color}
                          size="sm"
                        />
                        <span className="font-caption text-[11px]">
                          {proj.leader_name} ({proj.leader_faculty})
                        </span>
                      </div>
                      <span className="font-caption text-[#1ea64a] font-medium">
                        STATUS: {proj.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <MozaicProvider>
      <FoundationShowcase />
    </MozaicProvider>
  );
}
