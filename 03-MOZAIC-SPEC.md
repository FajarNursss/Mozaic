# 03-MOZAIC-SPEC.md — Product Specification & Content Blueprint

## 1. Brand Identity & Dummy Assets
- **Nama Aplikasi:** Mozaic
- **Tagline Utama:** `Rakit Tim Lintas Fakultas, Tanpa Drama.`
- **Dummy Logo Spec:** 4 ubin persegi geometris saling bertaut (3 ubin hitam `#000000`, 1 ubin pastel Lime `#dceeb1`, radius `2px`) di sisi kiri + wordmark **Mozaic** (`Inter`, weight `700`, tracking `-0.5px`). Mudah diganti dengan SVG final.
- **Dummy Avatar Spec:** Lingkaran `9999px` berukuran `36px`–`48px` dengan inisial 2 huruf (misal `RA`, `DN`, `SK`) dalam `JetBrains Mono` di atas latar pastel lembut (`#dceeb1`, `#c5b0f4`, `#f4ecd6`, `#c8e6cd`) atau foto potret monokrom/editorial.
- **Dummy Illustration Spec:** Komposisi datar bergaya *sticky-note collage* (`#dceeb1`, `#c5b0f4`, `#f4ecd6`) dan *UI component preview* datar di dalam frame radius `8px`.

## 2. Canonical Taxonomies (WAJIB SAMA PERSIS DI SEMUA HALAMAN)
### 10 Kategori Keahlian Lintas Disiplin (Profil: Maksimal Pilih 5)
1. `Frontend`
2. `Backend`
3. `UI/UX Design`
4. `Mobile`
5. `Data/AI`
6. `Business/Pitching`
7. `Product Management`
8. `Copywriting`
9. `Research`
10. `Multimedia`

### 4 Kategori Kegiatan (Filter Utama Discovery Board & Templat)
1. `Hackathon`
2. `PKM`
3. `Gemastik`
4. `Capstone/Riset`

### Status Peran & Lamaran
- `OPEN` — Kuota peran masih tersedia.
- `FILLED` — Kuota terkunci otomatis setelah Ketua Tim menekan `Accept`.
- `PENDING` — Lamaran terkirim, menunggu tinjauan Ketua Tim.
- `ACCEPTED` — Diterima; tautan kontak instan (`WhatsApp` / `Telegram`) terbuka.

## 3. Rincian 5 Fitur MCP (Core Functional Requirements)
1. **MCP #1 — Standardized Student Profile (Profil Kompetensi):**
   - Input Fakultas & Prodi, pemilih maksimal 5 dari 10 *skill tags*, teks mini-portfolio singkat (maks 280 karakter + link opsional GitHub/Behance/LinkedIn), komitmen jam kerja mingguan (`jam/minggu`, misal `10 jam/minggu`), dan tautan kontak instan (`WhatsApp` / `Telegram`).
2. **MCP #2 — Project Discovery Board (Etalase Proyek & Filter Multi-Tag):**
   - Pencarian kata kunci real-time, *pill tabs* kategori kegiatan (`Semua`, `Hackathon`, `PKM`, `Gemastik`, `Capstone/Riset`), filter multi-tag berbasis 10 *skill tags*, serta grid kartu proyek lintas fakultas.
3. **MCP #3 — AI Project Scoper & Templat Siap Pakai (Smart Listing Creator):**
   - Opsi templat kompetisi siap pakai (`Templat Gemastik PPL`, `Templat PKM-KC`, `Templat 48h Hackathon`, `Templat Capstone Riset`).
   - Kotak input ide proyek mentah (1–2 paragraf) → tombol `Generate dengan DeepSeek AI` → menghasilkan output terstruktur yang dapat langsung diedit: Rekomendasi Judul, Pembagian Peran Spesifik, Deskripsi Tugas per Peran, dan *Skill Tags* yang dibutuhkan.
4. **MCP #4 — One-Click Role Application (Lamaran Peran 1-Klik):**
   - Kandidat memilih 1 peran `OPEN` pada halaman detail proyek → tekan `Apply 1-Klik` → muncul ringkasan konfirmasi otomatis (Profil, Skill Tags, Mini-Portfolio, Komitmen Jam Kerja) tanpa isi form ulang → klik `Konfirmasi Lamaran`.
5. **MCP #5 — Applicant Review, AI Gap Analysis & Quota Lock:**
   - Ketua Tim melihat daftar pelamar yang dikelompokkan per peran.
   - Setiap kartu pelamar menampilkan: Profil singkat, Jam Kerja/Minggu, **Match Score** (misal `92% Match`), dan ringkasan **Fit & Gap Summary** (poin kecocokan + celah kompetensi singkat dari AI).
   - Tombol `Accept`: mengunci kuota peran menjadi `FILLED` secara otomatis dan langsung membuka tombol tautan `Hubungi via WhatsApp` / `Hubungi via Telegram`.

## 4. Kamus UI Copy (Campuran ID–EN Konsisten)
- **Navigasi Utama:** `Explore Proyek` · `Buat Proyek (AI Scoper)` · `Workspace Saya` · `Profil Saya`
- **Tombol Utama:** `Mulai Cari Tim` · `Buat Proyek Baru` · `Generate Scope` · `Apply 1-Klik` · `Accept & Kunci Kuota` · `Simpan Profil`
- **Label Bagian (Mono Uppercase):** `PROJECT DISCOVERY` · `AI PROJECT SCOPER` · `OPEN ROLES` · `FIT & GAP ANALYSIS` · `KOMITMEN MINGGUAN` · `KONTAK INSTAN`

## 5. Peta 8 Halaman & Blok Warna
1. **Halaman 01 — Landing Page:** White Canvas → Black Marquee → Lime Block (Cara Kerja) → Lilac Block (Preview AI Scoper) → White Footer.
2. **Halaman 02 — Auth (Login / Register):** Split Screen (Kiri: White Form, Kanan: Navy `#1f1d3d` Editorial Panel).
3. **Halaman 03 — Project Discovery Board (MCP #2):** White Canvas + Soft Surface (`#f7f7f5`) Filter/Cards + Cream Accent Strip.
4. **Halaman 04 — Project Detail & 1-Click Apply (MCP #4):** White Canvas + Mint (`#c8e6cd`) Active Role Highlight + Confirmation Drawer.
5. **Halaman 05 — AI Project Scoper (MCP #3):** Lilac (`#c5b0f4`) AI Input & Template Block + White Structured Output Editor.
6. **Halaman 06 — Applicant Review & Quota Lock (MCP #5):** White Canvas + Lime (`#dceeb1`) AI Fit & Gap Summary Card + Locked/WhatsApp Unlocked State.
7. **Halaman 07 — Standardized Student Profile (MCP #1):** White Canvas + Cream (`#f4ecd6`) Live Profile Preview Card.
8. **Halaman 08 — My Workspace:** White Canvas + Pill Tab Toggle (`Proyek Saya` / `Lamaran Saya`) + Hairline List Rows.

## 6. Realistic Dummy Data Bank (Untuk Mockup Google Stitch)
- **Mahasiswa Contoh:**
  - *Raka Pratama* — Ilmu Komputer (Fasilkom) · `Backend`, `Data/AI`, `Product Management` · `12 jam/minggu` · WA/TG
  - *Nadia Kusuma* — Desain Komunikasi Visual (FSRD) · `UI/UX Design`, `Multimedia`, `Research` · `10 jam/minggu` · WA
  - *Bima Wijaya* — Manajemen (FEB) · `Business/Pitching`, `Copywriting`, `Research` · `8 jam/minggu` · TG
  - *Siti Rahma* — Teknik Elektro (FT) · `Frontend`, `Mobile`, `Data/AI` · `15 jam/minggu` · WA
- **Proyek Contoh:**
  - *"TaniLensa: Deteksi Dini Hama Padi Berbasis Computer Vision"* (`Gemastik` · 2/4 Peran Terisi · Butuh: `Mobile`, `Business/Pitching`)
  - *"Sirkula: Marketplace Bahan Baku Daur Ulang untuk UMKM Kampus"* (`PKM` · 1/3 Peran Terisi · Butuh: `UI/UX Design`, `Frontend`)
  - *"Jaga Mental: Chatbot Triase Kesehatan Mental Mahasiswa 24/7"* (`Hackathon` · 2/3 Peran Terisi · Butuh: `Data/AI`)
  - *"Audit Energi Otomatis Gedung Fakultas dengan IoT Dashboard"* (`Capstone/Riset` · 1/4 Peran Terisi · Butuh: `Backend`, `Research`, `Copywriting`)