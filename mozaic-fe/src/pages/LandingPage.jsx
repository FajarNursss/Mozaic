import { useNavigate } from 'react-router-dom';

/**
 * Page 01 — Landing Page (/)
 * Refactored 1:1 mengikuti Gambar 1, 2, 4, 3:
 * - Section 1: Hero Monochrome + 3-Card Stack Preview (Gambar 1)
 * - Section Marquee: Continuous Dark Strip (Gambar 1 & 2)
 * - Section 2: Lime Color-Block (#dceeb1) Workflow 3 Langkah (Gambar 2)
 * - Section 3: Lilac Color-Block (#c5b0f4) DeepSeek AI Smart Listing (Gambar 4)
 * - Section 4: Cream Color-Block Banner (#f4ecd6) Mulai Kolaborasi (Gambar 3)
 *
 * Aturan Ketat:
 * - Dilarang teks abu-abu pudar (text-gray-* / text-slate-*). Semua teks di latar terang wajib #000000.
 * - Hirarki visual murni melalui font-weight (320, 330, 340, 480, 700) & JetBrains Mono uppercase.
 * - Semua tombol CTA teks wajib pill (rounded-[50px]).
 * - Setiap blok warna pastel wajib radius 24px, padding besar, dan dipisahkan kanvas putih #ffffff.
 * - Responsif dan adaptif hingga layar 390px.
 */
export function LandingPage() {
  const navigate = useNavigate();

  const marqueeItems = [
    'HACKATHON',
    'PKM',
    'GEMASTIK',
    'CAPSTONE / RISET',
    'FRONTEND',
    'BACKEND',
    'UI/UX DESIGN',
    'DATA / AI',
    'BUSINESS / PITCHING',
  ];

  return (
    <div className="w-full bg-[#ffffff] text-[#000000] overflow-x-hidden">
      {/* =========================================================================
          SECTION 1: HERO MONOCHROME EDITORIAL + 3-CARD PREVIEW (GAMBAR 1)
          ========================================================================= */}
      <section className="container-mozaic pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* Kolom Kiri: Copywriting & Pasangan CTA Pill (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow (JetBrains Mono uppercase) */}
            <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-4 sm:mb-6">
              CROSS-FACULTY TEAM BUILDER
            </span>

            {/* Headline Display XL (Inter font-[340] line-height 1.00 tracking -1.72px) */}
            <h1 className="font-sans font-[340] text-[44px] sm:text-[58px] lg:text-[72px] xl:text-[86px] leading-[1.00] tracking-[-1.5px] sm:tracking-[-1.72px] text-[#000000]">
              Rakit Tim Lintas<br className="hidden sm:inline" />
              {' '}Fakultas, Tanpa<br className="hidden sm:inline" />
              {' '}Drama.
            </h1>

            {/* Subcopy Body Large (Inter font-[320] max-w-xl) */}
            <p className="font-sans font-[320] text-[17px] sm:text-[19px] md:text-[20px] leading-[1.40] tracking-[-0.14px] text-[#000000] max-w-xl mt-6 sm:mt-8">
              Temukan rekan Hackathon, PKM, Gemastik, hingga Capstone dengan profil kompetensi
              terstandar, AI Project Scoper, dan lamaran 1-klik.
            </p>

            {/* Pasangan Tombol CTA Pill */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-6 sm:pt-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/explore')}
                className="px-8 py-3.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[16px] sm:text-[17px] leading-none hover:bg-[#1a1a1a] transition-colors cursor-pointer text-center"
              >
                Mulai Cari Tim
              </button>
              <button
                type="button"
                onClick={() => navigate('/create')}
                className="px-8 py-3.5 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#e6e6e6] font-sans font-[480] text-[16px] sm:text-[17px] leading-none hover:bg-[#f7f7f5] transition-colors cursor-pointer text-center"
              >
                Buat Proyek dengan AI
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Outer Frame + 3 Kartu Visual Stack (Col Span 5) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[500px] bg-[#f7f7f5] rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 md:p-6 border border-[#e6e6e6] flex flex-col gap-3.5 sm:gap-4">
              {/* Kartu 1: Cream Block (#f4ecd6) — Profil Kandidat */}
              <div className="bg-[#f4ecd6] rounded-[20px] p-4 sm:p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.54px] uppercase text-[#000000] font-normal truncate">
                    FAKULTAS ILMU KOMPUTER • BACKEND
                  </span>
                  <span className="px-2.5 py-0.5 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#e6e6e6] font-mono text-[10px] uppercase font-bold tracking-[0.60px] whitespace-nowrap">
                    AKTIF
                  </span>
                </div>

                <div>
                  <h3 className="font-sans font-[700] text-[20px] sm:text-[22px] leading-tight text-[#000000]">
                    Raka Pratama
                  </h3>
                  <p className="font-sans font-[330] text-[13px] text-[#000000] mt-0.5">
                    12 jam/minggu • WhatsApp Terverifikasi
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                  <span className="px-3 py-1 rounded-[50px] bg-[#ffffff] border border-[#e6e6e6] font-mono text-[11px] text-[#000000]">
                    Backend
                  </span>
                  <span className="px-3 py-1 rounded-[50px] bg-[#ffffff] border border-[#e6e6e6] font-mono text-[11px] text-[#000000]">
                    Data/AI
                  </span>
                  <span className="px-3 py-1 rounded-[50px] bg-[#ffffff] border border-[#e6e6e6] font-mono text-[11px] text-[#000000]">
                    Product Management
                  </span>
                </div>
              </div>

              {/* Kartu 2: Mint Block (#c8e6cd) — Peran Terbuka */}
              <div className="bg-[#c8e6cd] rounded-[20px] p-4 sm:p-5 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.54px] uppercase text-[#000000] font-normal truncate">
                    GEMASTIK PPL 2026 • ROLE TERBUKA
                  </span>
                  <span className="px-2.5 py-0.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-mono text-[10px] uppercase font-bold tracking-[0.60px] whitespace-nowrap">
                    OPEN
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <h3 className="font-sans font-[700] text-[20px] sm:text-[22px] leading-tight text-[#000000]">
                      Backend Developer
                    </h3>
                    <p className="font-mono text-[12px] text-[#000000] font-normal mt-0.5">
                      Go • PostgreSQL • REST API
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/projects/proj-1')}
                    className="self-start sm:self-auto px-4 py-2 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[13px] leading-none whitespace-nowrap hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                  >
                    Apply 1-Klik →
                  </button>
                </div>
              </div>

              {/* Kartu 3: Lime Block (#dceeb1) — AI Fit & Gap */}
              <div className="bg-[#dceeb1] rounded-[20px] p-4 sm:p-5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.54px] uppercase text-[#000000] font-normal">
                    DEEPSEEK AI FIT & GAP
                  </span>
                  <span className="font-sans font-[700] text-[15px] sm:text-[16px] text-[#000000]">
                    94% Match Score
                  </span>
                </div>
                <p className="font-sans font-[330] text-[13px] leading-relaxed text-[#000000]">
                  Sinergi Backend & Data/AI siap. Kuota otomatis terkunci saat lamaran diterima.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION MARQUEE: CONTINUOUS DARK EDITORIAL STRIP (#000000)
          ========================================================================= */}
      <div className="w-full h-[44px] bg-[#000000] text-[#ffffff] flex items-center overflow-hidden whitespace-nowrap select-none border-y border-[#000000]">
        <div className="animate-marquee flex items-center">
          {/* Loop 1 */}
          <div className="inline-flex items-center font-mono text-[12px] sm:text-[13px] tracking-[0.54px] uppercase text-[#ffffff]">
            {marqueeItems.map((item, idx) => (
              <span key={`m1-${idx}`} className="inline-flex items-center">
                <span className="px-3">{item}</span>
                <span className="text-[#ffffff]">·</span>
              </span>
            ))}
          </div>
          {/* Loop 2 (Seamless loop duplicate) */}
          <div className="inline-flex items-center font-mono text-[12px] sm:text-[13px] tracking-[0.54px] uppercase text-[#ffffff]">
            {marqueeItems.map((item, idx) => (
              <span key={`m2-${idx}`} className="inline-flex items-center">
                <span className="px-3">{item}</span>
                <span className="text-[#ffffff]">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ruang putih pemisah antar color-block (96px di desktop, 64px di mobile) */}
      <div className="h-16 md:h-24" />

      {/* =========================================================================
          SECTION 2: LIME COLOR-BLOCK (#dceeb1) — WORKFLOW 3 LANGKAH (GAMBAR 2)
          ========================================================================= */}
      <section id="cara-kerja" className="container-mozaic scroll-mt-20">
        <div className="w-full bg-[#dceeb1] rounded-[24px] p-6 sm:p-10 md:p-14 lg:p-16">
          {/* Eyebrow */}
          <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.54px] uppercase text-[#000000] font-normal block">
            WORKFLOW TANPA RIBET
          </span>

          {/* Headline */}
          <h2 className="font-sans font-[340] text-[34px] sm:text-[46px] md:text-[56px] leading-[1.05] tracking-[-1.0px] sm:tracking-[-1.2px] text-[#000000] mt-3 sm:mt-4 max-w-3xl">
            Dari ide mentah sampai grup<br className="hidden sm:inline" />
            {' '}WhatsApp aktif dalam 3<br className="hidden sm:inline" />
            {' '}langkah.
          </h2>

          {/* 3 Langkah Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mt-10 sm:mt-12 md:mt-16">
            {/* Step 01 */}
            <div className="flex flex-col">
              <div className="font-sans font-[340] text-[36px] sm:text-[40px] md:text-[44px] text-[#000000] border-b border-[#000000]/15 pb-3 sm:pb-4 mb-4 sm:mb-5 leading-none">
                01
              </div>
              <h3 className="font-sans font-[700] text-[18px] sm:text-[20px] text-[#000000] mb-2 sm:mb-2.5">
                Profil Terstandar
              </h3>
              <p className="font-sans font-[320] text-[14px] sm:text-[15px] leading-[1.55] text-[#000000]">
                Pilih maksimal 5 dari 10 keahlian terverifikasi, cantumkan mini-portfolio singkat (maks 280 karakter),
                dan tentukan komitmen jam kerja mingguan.
              </p>
            </div>

            {/* Step 02 */}
            <div className="flex flex-col">
              <div className="font-sans font-[340] text-[36px] sm:text-[40px] md:text-[44px] text-[#000000] border-b border-[#000000]/15 pb-3 sm:pb-4 mb-4 sm:mb-5 leading-none">
                02
              </div>
              <h3 className="font-sans font-[700] text-[18px] sm:text-[20px] text-[#000000] mb-2 sm:mb-2.5">
                Lamaran 1-Klik
              </h3>
              <p className="font-sans font-[320] text-[14px] sm:text-[15px] leading-[1.55] text-[#000000]">
                Cari proyek lintas fakultas di Discovery Board. Temukan peran berstatus OPEN dan lamar seketika tanpa
                perlu mengisi formulir panjang berulang kali.
              </p>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col">
              <div className="font-sans font-[340] text-[36px] sm:text-[40px] md:text-[44px] text-[#000000] border-b border-[#000000]/15 pb-3 sm:pb-4 mb-4 sm:mb-5 leading-none">
                03
              </div>
              <h3 className="font-sans font-[700] text-[18px] sm:text-[20px] text-[#000000] mb-2 sm:mb-2.5">
                AI Gap Analysis &amp; Quota Lock
              </h3>
              <p className="font-sans font-[320] text-[14px] sm:text-[15px] leading-[1.55] text-[#000000]">
                Ketua tim meninjau ringkasan kecocokan AI. Sekali klik &apos;Accept&apos;, status peran berubah menjadi
                FILLED (kuota terkunci) dan tautan kontak instan langsung terbuka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ruang putih pemisah antar color-block (96px di desktop, 64px di mobile) */}
      <div className="h-16 md:h-24" />

      {/* =========================================================================
          SECTION 3: LILAC COLOR-BLOCK (#c5b0f4) — DEEPSEEK SMART LISTING (GAMBAR 4)
          ========================================================================= */}
      <section className="container-mozaic">
        <div className="w-full bg-[#c5b0f4] rounded-[24px] p-6 sm:p-10 md:p-14 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
            {/* Kolom Kiri: Copywriting & CTA Scoper (Col Span 5 atau 6) */}
            <div className="lg:col-span-6 flex flex-col items-start">
              {/* Eyebrow */}
              <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.54px] uppercase text-[#000000] font-normal block">
                DEEPSEEK AI • SMART LISTING
              </span>

              {/* Headline */}
              <h2 className="font-sans font-[340] text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05] tracking-[-1.0px] sm:tracking-[-1.2px] text-[#000000] mt-3 sm:mt-4">
                Punya ide mentah? Biar<br className="hidden sm:inline" />
                {' '}AI pecah jadi struktur<br className="hidden sm:inline" />
                {' '}tim.
              </h2>

              {/* Paragraph */}
              <p className="font-sans font-[320] text-[15px] sm:text-[16px] leading-[1.55] text-[#000000] mt-4 sm:mt-5 mb-6 sm:mb-8 max-w-lg">
                Ketik 1–2 paragraf gagasan atau pilih templat lomba siap pakai (Gemastik, PKM, Hackathon). DeepSeek AI
                langsung menyusun judul proporsional, pembagian peran spesifik, deskripsi tugas, dan skill tags yang presisi.
              </p>

              {/* Pill Button CTA */}
              <button
                type="button"
                onClick={() => navigate('/create')}
                className="px-8 py-3.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[15px] sm:text-[16px] leading-none hover:bg-[#1a1a1a] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Coba AI Project Scoper →</span>
              </button>
            </div>

            {/* Kolom Kanan: White Card Frame Simulai AI (Col Span 6) */}
            <div className="lg:col-span-6 w-full">
              <div className="w-full bg-[#ffffff] rounded-[20px] p-5 sm:p-6 border border-[#000000] text-[#000000]">
                {/* Header Row */}
                <div className="flex items-center justify-between pb-2">
                  <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.54px] uppercase text-[#000000] font-normal">
                    INPUT IDE MENTAH
                  </span>
                  <span className="px-2.5 py-1 rounded-[50px] bg-[#dceeb1] text-[#000000] font-mono text-[10px] uppercase font-bold tracking-[0.60px]">
                    DEEPSEEK AI GENERATED
                  </span>
                </div>

                {/* Quote Box Gagasan */}
                <div className="bg-[#f7f7f5] rounded-[10px] p-4 my-4">
                  <p className="font-sans font-[320] text-[13px] sm:text-[14px] leading-relaxed text-[#000000]">
                    &ldquo;Kami ingin membuat bot WhatsApp peringatan dini banjir untuk warga bantaran Kali Ciliwung
                    berbasis sensor IoT esp32 sederhana dan data BMKG...&rdquo;
                  </p>
                </div>

                {/* Subhead Rekomendasi Struktur Tim */}
                <div className="font-mono text-[11px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-3">
                  REKOMENDASI STRUKTUR TIM (3 PERAN):
                </div>

                {/* Daftar 3 Peran */}
                <div className="space-y-2.5">
                  {/* Peran 1 */}
                  <div className="flex items-center justify-between gap-3 p-3.5 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff]">
                    <div>
                      <h4 className="font-sans font-[700] text-[13px] sm:text-[14px] text-[#000000]">
                        1. Backend &amp; IoT Engineer
                      </h4>
                      <p className="font-sans font-[330] text-[12px] text-[#000000] mt-0.5">
                        Integrasi ESP32 &amp; Webhook WhatsApp API
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-[6px] border border-[#e6e6e6] bg-[#ffffff] font-mono text-[11px] text-[#000000] whitespace-nowrap">
                      Backend
                    </span>
                  </div>

                  {/* Peran 2 */}
                  <div className="flex items-center justify-between gap-3 p-3.5 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff]">
                    <div>
                      <h4 className="font-sans font-[700] text-[13px] sm:text-[14px] text-[#000000]">
                        2. UI/UX &amp; Information Architect
                      </h4>
                      <p className="font-sans font-[330] text-[12px] text-[#000000] mt-0.5">
                        Alur pesan interaktif &amp; kartu visual infografis
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-[6px] border border-[#e6e6e6] bg-[#ffffff] font-mono text-[11px] text-[#000000] whitespace-nowrap">
                      UI/UX Design
                    </span>
                  </div>

                  {/* Peran 3 */}
                  <div className="flex items-center justify-between gap-3 p-3.5 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff]">
                    <div>
                      <h4 className="font-sans font-[700] text-[13px] sm:text-[14px] text-[#000000]">
                        3. Public Relations &amp; Pitch Lead
                      </h4>
                      <p className="font-sans font-[330] text-[12px] text-[#000000] mt-0.5">
                        Naskah pitch lomba PKM &amp; validasi warga bantaran
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-[6px] border border-[#e6e6e6] bg-[#ffffff] font-mono text-[11px] text-[#000000] whitespace-nowrap">
                      Business/Pitching
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ruang putih pemisah antar color-block (96px di desktop, 64px di mobile) */}
      <div className="h-16 md:h-24" />

      {/* =========================================================================
          SECTION 4: CREAM COLOR-BLOCK BANNER (#f4ecd6) — MULAI KOLABORASI (GAMBAR 3)
          ========================================================================= */}
      <section className="container-mozaic">
        <div className="w-full bg-[#f4ecd6] rounded-[24px] py-12 sm:py-16 md:py-20 px-6 sm:px-12 md:px-16 text-center flex flex-col items-center justify-center">
          {/* Eyebrow */}
          <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.54px] uppercase text-[#000000] font-normal mb-3 sm:mb-4">
            MULAI KOLABORASI KAMPUS
          </span>

          {/* Headline */}
          <h2 className="font-sans font-[700] text-[26px] sm:text-[34px] md:text-[42px] lg:text-[44px] leading-[1.20] text-[#000000] max-w-3xl mb-3 sm:mb-4">
            Jangan biarkan ide brilian mati karena kekurangan rekan lintas keahlian.
          </h2>

          {/* Subcopy */}
          <p className="font-sans font-[320] text-[15px] sm:text-[17px] text-[#000000] mb-6 sm:mb-8 max-w-xl">
            Gratis untuk seluruh mahasiswa aktif D3/D4/S1 di Indonesia.
          </p>

          {/* Button Pill CTA */}
          <button
            type="button"
            onClick={() => navigate('/auth')}
            className="px-8 py-3.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[15px] sm:text-[16px] leading-none hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            Daftar dengan Akun Mahasiswa
          </button>
        </div>
      </section>

      {/* Ruang putih sebelum footer */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
