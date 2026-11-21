# PRD — Mozaic Frontend (`mozaic-fe`)

| Metadata | Detail |
| :--- | :--- |
| **Product Name** | Mozaic: Interdisciplinary Student Team and Competency Matcher |
| **Tagline** | `Rakit Tim Lintas Fakultas, Tanpa Drama.` |
| **Competition / Case** | STACK 2026 (GDGoC ITB) — Case 1: Smarter Campus and Learning |
| **Team** | Pemalu bukan Pemula (Nabil: Leader & UI/UX · Fajar: FE · Akmal: BE · Yandra: Docs & QA) |
| **Frontend Stack** | React + Vite (`ESLint`) + Tailwind CSS + `react-router-dom` + `lucide-react` + `axios` |
| **Design Reference** | [Figma Prototype (UI/UX by Nabil)](https://www.figma.com/proto/JspNnbXWq8RmWK38lnjE5j/ui-ux?node-id=0-1&t=8aJGYskkxvZ4pkKc-1) · `01-DESIGN-SYSTEM.md` · `03-MOZAIC-SPEC.md` · `DESIGN-figma.md` |
| **Target Environment** | Antigravity IDE (`mozaic-fe`) with Mock-First Toggle (`VITE_USE_MOCK`) |

---

## 1. Product Context & Alignment (Abstract × UI/UX)

### 1.1 Problem & Objective
Survei internal tim ($N = 40$ mahasiswa lintas fakultas) menunjukkan **80%** mahasiswa hanya mengandalkan lingkaran teman sekelas, **60%** tidak punya jaringan luar fakultas, **75%** mengalami ketimpangan keahlian tim, dan **80%** pernah batal atau berkompromi mendaftar lomba akibat lambatnya pencarian anggota (3 hari hingga >2 minggu).

**Mozaic** menghilangkan friksi tersebut melalui satu alur terstruktur: profil kompetensi lintas disiplin terstandarisasi, papan eksplorasi proyek berbasis filter multi-tag, *AI Project Scoper* berbasis **DeepSeek API** (+ templat siap pakai dan *deterministic fallback*), lamaran 1-klik, serta peninjauan pelamar dengan *AI Fit & Gap Analysis* dan penguncian kuota otomatis yang membuka tautan kontak instan (WhatsApp/Telegram).

### 1.2 Alignment Matrix: 5 Core MVP Features → 8 Figma Pages
Seluruh **5 fitur MVP** di Abstract & Proposal dipetakan secara utuh ke dalam **8 halaman** dari spesifikasi UI/UX Nabil:

| MVP Module (Proposal & Abstract) | Mapped Pages (Nabil UI/UX) | Primary Route |
| :--- | :--- | :--- |
| Entry, Brand Story & Access | **Page 01:** Landing Page · **Page 02:** Auth (Split Screen) | `/` · `/auth` |
| **MVP #1:** Standardized Student Profile | **Page 07:** Standardized Student Profile | `/profile` |
| **MVP #2:** Project Discovery Board & Multi-Tag Filter | **Page 03:** Project Discovery Board | `/explore` |
| **MVP #3:** AI Project Scoper & Ready-to-Use Templates | **Page 05:** AI Project Scoper (Smart Listing Creator) | `/create` |
| **MVP #4:** One-Click Role Application | **Page 04:** Project Detail & 1-Click Apply | `/projects/:id` |
| **MVP #5:** Applicant Review, AI Gap Analysis & Quota Lock | **Page 06:** Applicant Review & Quota Lock · **Page 08:** My Workspace | `/workspace/projects/:id/review` · `/workspace` |

### 1.3 Scope Guardrails (Out of Scope for MVP)
- **Tidak ada** fitur *real-time in-app chat* (WebSocket) → diganti *handoff* tombol langsung **WhatsApp / Telegram** saat status `ACCEPTED`.
- **Tidak ada** SSO kampus resmi → memakai autentikasi standar + akun demo sintetis.
- **Tidak ada** scraping GitHub otomatis → memakai input *mini-portfolio* ringkas (maks 280 karakter + link opsional).

---

## 2. Strict Visual & Design System Rules (Antigravity Agent Guardrails)

> **CRITICAL FOR AI AGENT:** Jangan menghasilkan tampilan SaaS generik (tanpa gradien, tanpa *drop shadow* berat, tanpa tombol kotak, tanpa teks abu-abu pudar, tanpa *dark mode* acak). Ikuti 100% aturan **Monochrome Editorial Frame + Oversized Pastel Color-Block Sections** di bawah ini.

### 2.1 Color Tokens (STRICT — Dilarang Menambah Warna Baru)

    :root {
      /* Core & Neutral */
      --color-primary: #000000;
      --color-on-primary: #ffffff;
      --color-canvas: #ffffff;
      --color-surface-soft: #f7f7f5;
      --color-hairline: #e6e6e6;
      --color-hairline-soft: #f1f1f1;
      --color-inverse-canvas: #000000;
      --color-inverse-ink: #ffffff;
      --color-overlay-scrim: rgba(0, 0, 0, 0.60);

      /* Pastel Color-Block Surfaces (Pengganti Drop Shadow) */
      --block-lime: #dceeb1;   /* Cara Kerja, AI Fit & Gap Analysis, FAQ */
      --block-lilac: #c5b0f4;  /* AI Project Scoper / DeepSeek, Promo Banner */
      --block-cream: #f4ecd6;  /* Live Profile Preview, Templat Kompetisi, Accent Strip */
      --block-mint: #c8e6cd;   /* Highlight Peran OPEN / Kolaborasi Aktif */
      --block-pink: #efd4d4;   /* Catatan / Sorotan Sekunder */
      --block-coral: #f3c9b6;  /* Callout Aksi Cepat */
      --block-navy: #1f1d3d;   /* Split-Panel Auth Kanan; teks WAJIB #ffffff */

      /* Semantic & Scarce Accent */
      --semantic-success: #1ea64a; /* HANYA ikon centang & glyph Accepted/Match tinggi */
      --accent-magenta: #ff3d8b;   /* Single-shot promo CTA; maks 1 per halaman */
    }

### 2.2 Typography System
- **Sans (`--font-sans`):** `Inter` (Google Fonts variable weight `300..700`), fallback `system-ui, sans-serif`.
- **Mono (`--font-mono`):** `JetBrains Mono` (`400`, `500`), fallback `monospace`.
- **Aturan Tinta & Hierarki:** DILARANG menggunakan teks abu-abu (`text-gray-400/500`) untuk hierarki paragraf. Gunakan tinta hitam murni `#000000` (atau `#ffffff` di atas `navy`/`black`) dan bedakan hierarki lewat **font-weight** (`320–340` body, `480–540` button/emphasis, `700` card title).
- **Aturan Mono:** `JetBrains Mono` HANYA untuk *eyebrow*, label kategori, *skill tags*, *status badges*, dan *caption* — wajib `UPPERCASE` dengan tracking positif (`+0.54px` s.d. `+0.60px`). Dilarang untuk paragraf.

| Token | Font | Desktop | Mobile | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-xl` | Inter | `86px` | `48px` | `340` | `1.00` | `-1.72px` |
| `display-lg` | Inter | `64px` | `36px` | `340` | `1.10` | `-0.96px` |
| `headline` | Inter | `26px` | `22px` | `540` | `1.35` | `-0.26px` |
| `subhead` | Inter | `26px` | `20px` | `340` | `1.35` | `-0.26px` |
| `card-title` | Inter | `24px` | `20px` | `700` | `1.45` | `0px` |
| `body-lg` | Inter | `20px` | `18px` | `330` | `1.40` | `-0.14px` |
| `body` | Inter | `18px` | `16px` | `320` | `1.45` | `-0.26px` |
| `body-sm` | Inter | `16px` | `14px` | `330` | `1.45` | `-0.14px` |
| `button` | Inter | `18px–20px` | `16px` | `480` | `1.40` | `-0.10px` |
| `eyebrow` | JetBrains Mono | `14px–18px` | `12px` | `400` | `1.30` | `+0.54px` |
| `caption` | JetBrains Mono | `12px` | `11px` | `400` | `1.00` | `+0.60px` |

### 2.3 Shape, Spacing, Elevation & Rhythm Rules
- **Border Radius:** `xs: 2px`, `sm: 6px` (skill tag chips), `md: 8px` (inputs, template cards, frames), `lg: 24px` (project cards, applicant cards, color-blocks), `xl: 32px` (hero panels), `pill: 50px` (**WAJIB untuk semua tombol teks CTA & tab toggle — dilarang tombol kotak**), `full: 9999px` (circular icon buttons, avatars, checkmarks).
- **Layout Grid:** Max content width `1280px` (desktop `1440px`), padding dalam kartu `24px`, padding dalam color-block `48px` (desktop) / `24px` (mobile), jarak vertikal antar section `96px`.
- **Breakpoints:** Tablet `960px` (grid 3–4 kolom → 2 kolom, nav → hamburger), Mobile-L `768px` (color-block menjadi *full-bleed* `rounded-none` di sisi luar), Mobile `560px` (CTA pill `w-full`).
- **Touch Targets:** Pill CTA min tinggi `44px`, circular icon button `40px` (desktop) / `44px` (mobile), form input min tinggi `48px`.
- **Elevation (Shadow-Light):**
  - Level 0 (Flat): Color-blocks & footer — **tanpa shadow, tanpa border**.
  - Level 1 (Hairline): `1px solid #e6e6e6` pada kartu proyek, kartu pelamar, dan input form.
  - Level 2 (Soft): `0 4px 16px rgba(0, 0, 0, 0.06)` HANYA untuk dropdown & floating card.
  - Level 3 (Modal/Drawer): Overlay scrim `rgba(0, 0, 0, 0.60)` di belakang drawer/modal.
- **Ritme Blok Warna:** Selalu sisipkan ruang kanvas putih (`#ffffff`) di antara dua color-block. Dilarang menempelkan dua color-block berbeda sekaligus dalam satu viewport.
- **Kelangkaan Tombol Hitam:** Maksimal **1** `button-primary` (`#000000`) per area fokus. Aksi sekunder wajib memakai `button-secondary` (`#ffffff`, teks `#000000`, border `1px solid #e6e6e6` jika di atas kanvas putih) atau `button-tertiary-text`.

### 2.4 Brand & Dummy Visual Assets
- **Logo Mozaic (`<MozaicLogo />`):** 4 ubin persegi geometris saling bertaut (3 ubin `#000000`, 1 ubin `#dceeb1`, radius `2px`) di kiri + wordmark **Mozaic** (`Inter`, weight `700`, tracking `-0.5px`).
- **Avatar (`<InitialAvatar />`):** Lingkaran `rounded-full` (`36px`–`48px`), inisial 2 huruf (`RA`, `DN`, `BW`, `SR`) dengan `JetBrains Mono` di atas latar pastel (`#dceeb1`, `#c5b0f4`, `#f4ecd6`, `#c8e6cd`).

---

## 3. Canonical Taxonomies, Data Models & API Contract

### 3.1 Canonical Taxonomies (WAJIB Identik di Seluruh Aplikasi)
- **10 Skill Categories (Profil: Maksimal pilih 5):**
  `Frontend`, `Backend`, `UI/UX Design`, `Mobile`, `Data/AI`, `Business/Pitching`, `Product Management`, `Copywriting`, `Research`, `Multimedia`
- **4 Activity Categories:**
  `Hackathon`, `PKM`, `Gemastik`, `Capstone/Riset`
- **Status Enums:**
  - Role Status: `OPEN`, `FILLED`
  - Application Status: `PENDING`, `ACCEPTED`, `REJECTED`

### 3.2 Frontend Data Shapes (Sinkron dengan 6 Tabel MySQL Akmal)
1. **User (`users` + `user_skills`):**
   `{ id, name, initials, avatarColor, email, faculty, major, skills: string[] (max 5), mini_portfolio (max 280 chars), portfolio_url, weekly_hours: number, contact_platform: 'whatsapp' | 'telegram', contact_url }`
2. **Project (`projects` + `project_roles`):**
   `{ id, leader_id, leader_name, leader_faculty, title, activity_category, description, deadline, status, roles: ProjectRole[] }`
3. **ProjectRole (`project_roles`):**
   `{ id, project_id, role_name, task_description, required_skills: string[], quota: number, filled_count: number, status: 'OPEN' | 'FILLED' }`
4. **Application (`applications`):**
   `{ id, role_id, project_id, project_title, role_name, applicant: User, fit_score: number, fit_points: string[], gap_points: string[], gap_summary: string, status: 'PENDING' | 'ACCEPTED' | 'REJECTED', created_at }`

### 3.3 REST API Contract & Mock-First Switch (`VITE_USE_MOCK`)
Semua panggilan jaringan wajib melewati `src/services/mozaicService.js` dengan `const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'`.

| Endpoint (Backend Akmal) | Method | Kegunaan & Aturan Fallback FE |
| :--- | :--- | :--- |
| `/api/auth/login` & `/api/me` | `POST` / `GET` | Login sesi & ambil profil aktif (mock: langsung login sebagai persona demo yang dipilih). |
| `/api/profile` | `PUT` | Simpan fakultas, prodi, maks 5 skill tags, mini-portfolio, `weekly_hours`, dan link WA/Telegram. |
| `/api/projects?q=&category=&skill=` | `GET` | Daftar proyek + filter kata kunci, kategori kegiatan, dan multi-tag keahlian. |
| `/api/ai/scope` | `POST` | Kirim ide mentah (1–2 paragraf) ke DeepSeek API (JSON mode). **Wajib `timeout: 5000ms`**: jika gagal/timeout, otomatis kembalikan templat terstruktur lokal + tampilkan badge `"FALLBACK TEMPLATE ACTIVE"`. |
| `/api/projects` | `POST` | Publikasikan proyek baru beserta array `roles` yang sudah diedit ketua tim. |
| `/api/roles/:roleId/apply` | `POST` | Ajukan lamaran 1-klik. Cegah lamaran ganda (`409` / disable tombol) & hitung `fit_score` + `gap_summary` (dengan *deterministic tag-overlap fallback* jika AI offline). |
| `/api/applications/:appId/decision` | `PATCH` | Kirim `{ status: 'ACCEPTED' | 'REJECTED' }`. Jika `ACCEPTED`, `filled_count += 1`; jika `filled_count >= quota`, status peran otomatis berubah ke `FILLED` dan tombol WhatsApp/Telegram terbuka. |

---

## 4. Page-by-Page Functional & UI Specification (8 Pages)

### Global Navigation Shell (`TopNav`)
- **Tinggi:** `56px`, sticky di atas, latar `#ffffff`, border bawah `1px solid #e6e6e6`.
- **Kiri:** `<MozaicLogo />` (link ke `/`).
- **Tengah (Desktop):** `Explore Proyek` (`/explore`) · `Buat Proyek (AI Scoper)` (`/create`) · `Workspace Saya` (`/workspace`) · `Profil Saya` (`/profile`).
- **Kanan:** Tombol `button-secondary` (`Masuk` jika guest, atau Avatar + nama singkat jika login) + `button-primary` (`Buat Proyek Baru` atau `Mulai Cari Tim`).
- **Mobile (`< 960px`):** Menu tengah masuk ke *hamburger full-canvas overlay*.
- **Demo Compliance Pill (Opsional via env `VITE_DEMO_BADGE=true`):** Lencana kecil `JetBrains Mono` di pojok kanan bawah/top bar: `EARLY PROTOTYPE • SYNTHETIC DATA` untuk kepatuhan video Semifinal STACK 2026.

---

### Page 01 — Landing Page (`/`)
- **Ritme Blok Warna:** White Hero → Black Marquee Strip (`36px`) → White Spacer → **Lime Color-Block (`#dceeb1`)** → White Spacer → **Lilac Color-Block (`#c5b0f4`)** → White Footer.
- **Section 1 (White Hero):**
  - Eyebrow mono: `INTERDISCIPLINARY TEAM MATCHER`.
  - Headline (`display-xl`): `Rakit Tim Lintas Fakultas, Tanpa Drama.`
  - Subcopy (`body-lg`, weight `330`): Penjelasan singkat menghilangkan *departmental silos* untuk Hackathon, PKM, Gemastik, dan Riset.
  - Pasangan CTA: `button-primary` (`Mulai Cari Tim` → `/explore`) + `button-secondary` (`Buat Proyek Baru` → `/create`).
  - Visual kanan: Komposisi datar *sticky-note collage* (`#dceeb1`, `#c5b0f4`, `#f4ecd6`) menampilkan *mini preview* kartu peran & skor kecocokan.
- **Section 2 (Black Marquee Strip `#000000`):** Pita tipis `36px` teks putih berjalan menampilkan 10 kategori keahlian & 4 kategori kegiatan (`FRONTEND • UI/UX DESIGN • DATA/AI • BUSINESS/PITCHING • HACKATHON • GEMASTIK • PKM • CAPSTONE/RISET`).
- **Section 3 (Lime Color-Block `#dceeb1`, `rounded-[24px]`, `p-12`):**
  - Eyebrow: `CARA KERJA`.
  - Judul (`display-lg`): 4 langkah inti Mozaic (1. Profil Kompetensi → 2. AI Scope / Templat → 3. Lamaran 1-Klik → 4. Review AI & Kunci Kuota) dalam kartu putih `rounded-[24px]` dengan border hairline.
- **Section 4 (Lilac Color-Block `#c5b0f4`, `rounded-[24px]`, `p-12`):**
  - Eyebrow: `AI PROJECT SCOPER`.
  - Preview interaktif/statis: Input ide 2 kalimat → output peran terstruktur oleh DeepSeek AI. Satu tombol CTA tunggal (`Coba AI Scoper` → `/create`).
- **Section 5 (White Footer):** Wordmark **Mozaic**, ringkasan tim *Pemalu bukan Pemula — STACK 2026*, dan tautan navigasi cepat (`JetBrains Mono` caption).

---

### Page 02 — Auth: Login & Register (`/auth`)
- **Layout:** Split-Screen 50/50 (Desktop), 1 kolom (Mobile).
- **Panel Kiri (`#ffffff`):**
  - Pill Tab Toggle: `Masuk` (aktif `#000000`) / `Daftar`.
  - Input standar (`rounded-[8px]`, `h-[48px]`, border `#e6e6e6`): Email Kampus, Password (+ Nama Lengkap & Fakultas saat mode Daftar).
  - Tombol `button-primary` full-width: `Masuk ke Mozaic` / `Buat Akun`.
  - **Quick Demo Persona Switcher (Khusus Mode Mock/Video):** 4 tombol pill sekunder kecil untuk masuk 1-klik sebagai `Raka Pratama (Leader/Backend)`, `Nadia Kusuma (UI/UX)`, `Bima Wijaya (Business)`, atau `Siti Rahma (Frontend)` agar alur demo 2 menit berpindah peran secara instan.
- **Panel Kanan (`--block-navy: #1f1d3d`, teks `#ffffff`):**
  - Eyebrow mono: `VALIDATED BY 40 STUDENTS`.
  - Kutipan/statistik editorial dari survei tim: `80% mahasiswa terjebak di circle kelas sendiri. Saatnya membangun tim yang seimbang.`
  - Kartu bukti metrik datar dengan aksen centang `#1ea64a`.

---

### Page 03 — Project Discovery Board (`/explore`) — *MVP #2*
- **Ritme Blok Warna:** White Canvas + Cream Accent Strip (`#f4ecd6`, `rounded-[24px]`) + Soft Surface (`#f7f7f5`) Filter Area + Grid Kartu Putih.
- **Header & Cream Accent Strip:** Eyebrow `PROJECT DISCOVERY`, headline `Temukan Proyek & Peran Lintas Fakultas`, statistik ringkas proyek aktif & peran `OPEN`.
- **Search & Filter Bar (`#f7f7f5`, `rounded-[24px]`, `p-6`):**
  - Input pencarian real-time (`Cari judul proyek, peran, atau fakultas...`).
  - **Pill Tabs Kategori Kegiatan:** `Semua`, `Hackathon`, `PKM`, `Gemastik`, `Capstone/Riset` (tab aktif memakai `#000000` teks `#ffffff`).
  - **Multi-Tag Skill Filter:** 10 chips (`rounded-[6px]`, `JetBrains Mono` uppercase). Klik untuk toggle aktif/non-aktif (multi-select).
  - Tombol `Reset Filter` (muncul saat ada filter aktif).
- **Project Card Grid (3 kolom desktop → 2 tablet → 1 mobile):**
  - Latar `#ffffff`, border `1px solid #e6e6e6`, `rounded-[24px]`, `p-6`.
  - Baris atas: Badge kategori kegiatan (mono uppercase) + Tenggat waktu (`Deadline`).
  - Judul (`card-title`, `700`) + Fakultas inisiator & nama ketua tim (dengan `<InitialAvatar />`).
  - Ringkasan deskripsi (maks 2 baris, `line-clamp-2`).
  - **Role Quota Chips:** Menampilkan tiap peran beserta status kuota:
    - `OPEN`: chip dengan titik/indikator `#c8e6cd` / `#1ea64a` (contoh: `UI/UX DESIGN • 0/1 OPEN`).
    - `FILLED`: chip dengan latar `#f7f7f5` + coret/label terkunci (`BACKEND • 1/1 FILLED`).
  - Footer kartu: Progres kuota (misal `2/4 Peran Terisi`) + link aksi `Lihat Detail →` (ke `/projects/:id`).
- **Empty State:** Jika filter menghasilkan 0 proyek, tampilkan blok netral dengan tombol pill `Reset Semua Filter`.

---

### Page 04 — Project Detail & 1-Click Apply (`/projects/:id`) — *MVP #4*
- **Ritme Blok Warna:** White Canvas + **Mint Color-Block (`#c8e6cd`)** untuk sorotan peran `OPEN` yang dipilih + Slide-over Confirmation Drawer.
- **Header Proyek:** Breadcrumb (`← Kembali ke Explore`), badge kategori kegiatan, judul proyek (`display-lg` / `headline`), info Ketua Tim (Avatar, Nama, Fakultas, Komitmen tim), dan deadline.
- **Deskripsi & Target Proyek:** Teks penuh proyek (`body`, weight `320`, tinta `#000000`).
- **Daftar Peran (`OPEN ROLES`):**
  - Tiap peran ditampilkan sebagai kartu `rounded-[24px]`, `p-6`. Peran yang sedang dipilih/aktif disorot dengan latar **Mint (`#c8e6cd`)** (tanpa shadow).
  - Isi kartu peran: Nama peran, deskripsi tugas, daftar `required_skills` (mono chips), rasio kuota (`0/1 OPEN` atau `1/1 FILLED`).
  - Tombol aksi per peran:
    - Jika `OPEN` & belum dilamar: `button-primary` (`Apply 1-Klik`).
    - Jika sudah dilamar user aktif: tombol pill non-aktif (`Lamaran Terkirim • PENDING`) mencegah lamaran ganda.
    - Jika `FILLED`: badge terkunci (`KUOTA PENUH • FILLED`).
- **1-Click Confirmation Drawer/Modal (Backdrop `rgba(0,0,0,0.60)`):**
  - Saat `Apply 1-Klik` ditekan, muncul *drawer* ringkas menampilkan data yang otomatis dikirim **tanpa isi form ulang**:
    - Nama, Fakultas/Prodi, Skill Tags kandidat, Mini-Portfolio, Komitmen Jam Kerja (`jam/minggu`), dan Preview Kecocokan Tag awal.
  - Tombol `button-primary`: `Konfirmasi Lamaran` + `button-secondary`: `Batal`.
  - Setelah sukses: Toast/notifikasi konfirmasi + status tombol di halaman langsung berubah menjadi `PENDING` dan data tercatat di `Workspace Saya → Lamaran Saya`.

---

### Page 05 — AI Project Scoper & Templates (`/create`) — *MVP #3*
- **Ritme Blok Warna:** **Lilac Color-Block (`#c5b0f4`, `rounded-[24px]`, `p-12`)** di bagian atas (Input & Templat) → White Spacer → White Structured Output Editor (`#ffffff`, border `#e6e6e6`).
- **Mode Switcher (Pill Tabs di atas Lilac Block):**
  1. **`AI Project Scoper (DeepSeek)`** (default):
     - Textarea besar (`rounded-[8px]`, latar `#ffffff`, min 4 baris) untuk mengetik ide proyek mentah (1–2 paragraf).
     - Pemilih Kategori Kegiatan (`Hackathon`, `PKM`, `Gemastik`, `Capstone/Riset`).
     - Tombol `button-primary`: `Generate Scope dengan DeepSeek AI` (tampilkan *skeleton/loading state* selama proses).
     - **Reliability Guardrail:** Jika API melebihi `5000ms` atau offline, otomatis isi editor dari templat lokal + tampilkan banner kecil mono `DETERMINISTIC FALLBACK ACTIVE — EDITABLE`.
  2. **`Templat Siap Pakai`:**
     - 4 kartu templat (`template-card`, latar `#f4ecd6` Cream atau `#ffffff`, `rounded-[8px]`):
       - `Templat Gemastik PPL` (4 peran: FE, BE, UI/UX, Research/Pitch)
       - `Templat PKM-KC` (3–4 peran: Data/AI, Hardware/Mobile, Copywriting, Research)
       - `Templat 48h Hackathon` (4 peran: FE, BE, UI/UX, Business/Pitching)
       - `Templat Capstone Riset` (4 peran: Backend, Data/AI, Research, Copywriting)
     - Klik 1 templat → langsung mengisi **Structured Output Editor** di bawah.
- **Structured Output Editor (White Canvas, `rounded-[24px]`, border `#e6e6e6`, `p-8`):**
  - Semua hasil AI/Templat **100% dapat diedit** sebelum dipublikasikan:
    - Input Judul Proyek, Kategori Kegiatan, Deskripsi Proyek, Tenggat Waktu.
    - Daftar Peran dinamis (bisa **Tambah Peran**, **Hapus Peran**, edit Nama Peran, Deskripsi Tugas, Kuota angka, dan pilih `required_skills` dari 10 kategori baku).
  - Footer Editor: `button-secondary` (`Reset`) + `button-primary` (`Publikasikan Proyek`). Setelah submit, proyek langsung muncul di `/explore` dan `/workspace`.

---

### Page 06 — Applicant Review, AI Gap Analysis & Quota Lock (`/workspace/projects/:id/review`) — *MVP #5*
- **Ritme Blok Warna:** White Canvas + **Lime Color-Block (`#dceeb1`)** pada panel *AI Fit & Gap Analysis* di dalam kartu pelamar + indikator `#1ea64a` untuk status `ACCEPTED`.
- **Header Proyek:** Judul proyek, bilah progres kuota tim (contoh: `2 dari 4 Peran Terisi`), dan Pill Filter per Peran (misal: `Semua Peran`, `UI/UX Designer (0/1)`, `Business/Pitching (0/1)`).
- **Daftar Kartu Pelamar (`rounded-[24px]`, border `#e6e6e6`, `p-6`):**
  - Header pelamar: `<InitialAvatar />`, Nama, Fakultas/Prodi, Komitmen Jam Kerja (`KOMITMEN MINGGUAN: 10 JAM/MINGGU`), dan **Match Score Badge** (misal `92% MATCH` dengan ikon `#1ea64a` jika $\ge 80\%$).
  - Skill Tags kandidat (tag yang cocok dengan peran diberi tanda centang hijau `#1ea64a`).
  - Mini-Portfolio & link eksternal (GitHub/Behance/LinkedIn).
  - **Blok `FIT & GAP ANALYSIS` (Latar Lime `#dceeb1`, `rounded-[16px]`, `p-4`):**
    - Eyebrow mono: `AI FIT & GAP ANALYSIS (DEEPSEEK)`.
    - **Kelebihan / Kecocokan:** Poin kecocokan konkret antara profil dan peran.
    - **Celah Kompetensi (Gap):** Catatan singkat hal yang perlu didampingi ketua tim.
  - **Aksi Keputusan:**
    - Saat `PENDING` & peran masih `OPEN`: `button-primary` (`Accept & Kunci Kuota`) + `button-secondary` (`Tolak`).
    - Saat ketua menekan `Accept & Kunci Kuota`:
      1. Status pelamar berubah ke `ACCEPTED` (centang `#1ea64a`).
      2. `filled_count` bertambah 1; jika kuota peran penuh, peran otomatis terkunci menjadi **`FILLED`** dan pelamar `PENDING` lain di peran tersebut tidak bisa di-accept lagi (tombol terkunci).
      3. Panel **`KONTAK INSTAN`** terbuka secara dinamis dengan tombol pill **`Hubungi via WhatsApp`** (`wa.me/...`) atau **`Hubungi via Telegram`** (`t.me/...`).

---

### Page 07 — Standardized Student Profile (`/profile`) — *MVP #1*
- **Layout:** 2 Kolom (Desktop: 60% Form Edit Kiri di atas White Canvas, 40% **Live Profile Preview Card** Kanan di atas **Cream Color-Block `#f4ecd6`**).
- **Form Kiri (`#ffffff`):**
  - Nama Lengkap, Fakultas, Program Studi.
  - **Pemilih Skill Tags (Maksimal 5 dari 10):** Counter mono real-time (`TERPILIH: 3/5`). Saat 5 tag terpilih, 5 sisanya otomatis terkunci (*disabled*) hingga salah satu dilepas.
  - **Mini-Portfolio:** Textarea dengan counter karakter (`maks 280 karakter`) + input URL opsional (GitHub/Behance/LinkedIn).
  - **Komitmen Jam Kerja Mingguan:** Slider + input angka (`4` s.d. `30 jam/minggu`).
  - **Kontak Instan:** Pilih platform (`WhatsApp` / `Telegram`) + input nomor/username (validasi format link `wa.me/` atau `t.me/`). Cantumkan catatan privasi: *"Tautan kontak hanya terbuka setelah lamaran diterima ketua tim."*
  - Tombol `button-primary`: `Simpan Profil`.
- **Live Preview Kanan (`--block-cream: #f4ecd6`, `rounded-[24px]`, `p-8`, sticky):**
  - Menampilkan pratinjau persis kartu profil yang akan dilihat ketua tim saat kandidat menekan `Apply 1-Klik` (berubah real-time saat form diketik).

---

### Page 08 — My Workspace (`/workspace`)
- **Ritme Blok Warna:** White Canvas + Pill Tab Toggle (`Proyek Saya` / `Lamaran Saya`) + Hairline List Rows (`1px solid #f1f1f1`).
- **Tab 1 — `Proyek Saya` (Leader View):**
  - Daftar proyek yang dibuat user aktif.
  - Tiap baris menampilkan: Judul Proyek, Kategori, Progres Kuota (`2/4 Terisi`), jumlah pelamar `PENDING` baru, dan tombol `button-primary` (`Tinjau Pelamar` → `/workspace/projects/:id/review`).
  - Tombol sekunder di header: `+ Buat Proyek Baru` (→ `/create`).
- **Tab 2 — `Lamaran Saya` (Candidate View):**
  - Daftar peran yang pernah dilamar user aktif.
  - Tiap baris menampilkan: Judul Proyek, Peran yang dilamar, Nama Ketua Tim, Skor Kecocokan, dan lencana status (`PENDING`, `REJECTED`, atau `ACCEPTED` dengan centang `#1ea64a`).
  - **Khusus status `ACCEPTED`:** Otomatis menampilkan tombol pill aksi langsung **`Hubungi Ketua via WhatsApp`** / **`Telegram`**.

---

## 5. Synthetic Data Bank (Seeded for Mock Mode & Video Demo)

Data sintetis awal di `src/data/mockData.js` harus memakai persona dan proyek realistis dari spesifikasi Nabil agar konsisten di seluruh demo:

### 5.1 Seeded Student Personas
1. **Raka Pratama** (`RA`, `#dceeb1`) — Ilmu Komputer (Fasilkom) · `Backend`, `Data/AI`, `Product Management` · `12 jam/minggu` · WhatsApp (`https://wa.me/6281200000001`).
2. **Nadia Kusuma** (`NK`, `#c5b0f4`) — Desain Komunikasi Visual (FSRD) · `UI/UX Design`, `Multimedia`, `Research` · `10 jam/minggu` · WhatsApp (`https://wa.me/6281200000002`).
3. **Bima Wijaya** (`BW`, `#f4ecd6`) — Manajemen (FEB) · `Business/Pitching`, `Copywriting`, `Research` · `8 jam/minggu` · Telegram (`https://t.me/bimawijaya_demo`).
4. **Siti Rahma** (`SR`, `#c8e6cd`) — Teknik Elektro (FT) · `Frontend`, `Mobile`, `Data/AI` · `15 jam/minggu` · WhatsApp (`https://wa.me/6281200000004`).

### 5.2 Seeded Projects
1. **TaniLensa: Deteksi Dini Hama Padi Berbasis Computer Vision** (`Gemastik` · Leader: Raka Pratama · `2/4 Peran Terisi` · Butuh: `Mobile`, `Business/Pitching`).
2. **Sirkula: Marketplace Bahan Baku Daur Ulang untuk UMKM Kampus** (`PKM` · Leader: Bima Wijaya · `1/3 Peran Terisi` · Butuh: `UI/UX Design`, `Frontend`).
3. **Jaga Mental: Chatbot Triase Kesehatan Mental Mahasiswa 24/7** (`Hackathon` · Leader: Siti Rahma · `2/3 Peran Terisi` · Butuh: `Data/AI`).
4. **Audit Energi Otomatis Gedung Fakultas dengan IoT Dashboard** (`Capstone/Riset` · Leader: Raka Pratama · `1/4 Peran Terisi` · Butuh: `Backend`, `Research`, `Copywriting`).

---

## 6. Project Structure (`mozaic-fe`)

    mozaic-fe/
    ├── index.html                        # Load Google Fonts: Inter & JetBrains Mono
    ├── PRD.md                            # Master Product Requirements Document
    ├── src/
    │   ├── styles/
    │   │   └── tokens.css                # Strict CSS variables & typography utilities
    │   ├── constants/
    │   │   ├── taxonomies.js             # 10 Skills, 4 Categories, Status Enums
    │   │   └── templates.js              # 4 Competition Templates + Deterministic Fallback
    │   ├── data/
    │   │   └── mockData.js               # 4 Personas, 4 Projects, Pre-seeded Applications
    │   ├── context/
    │   │   └── MozaicContext.jsx         # Global state (currentUser, projects, applications)
    │   ├── services/
    │   │   ├── apiClient.js              # Axios instance (baseURL + auth header)
    │   │   └── mozaicService.js          # Mock/Live adapter + 5s timeout AI fallback
    │   ├── components/
    │   │   ├── ui/                       # Button (pill), Badge (mono), InitialAvatar, MozaicLogo, ColorBlock
    │   │   ├── layout/                   # TopNav, Footer, DemoBadge
    │   │   ├── project/                  # ProjectCard, RoleCard, ApplyDrawer
    │   │   └── review/                   # ApplicantCard, FitGapBox
    │   ├── pages/
    │   │   ├── LandingPage.jsx           # Page 01
    │   │   ├── AuthPage.jsx              # Page 02
    │   │   ├── ExploreProjectsPage.jsx   # Page 03
    │   │   ├── ProjectDetailPage.jsx     # Page 04
    │   │   ├── CreateProjectPage.jsx     # Page 05
    │   │   ├── ApplicantReviewPage.jsx   # Page 06
    │   │   ├── ProfilePage.jsx           # Page 07
    │   │   └── WorkspacePage.jsx         # Page 08
    │   ├── App.jsx                       # React Router v6 routes + Context Provider
    │   └── main.jsx

---

## 7. Antigravity IDE Execution Roadmap & Verification Checklist

Bangun secara bertahap agar Agent di Antigravity IDE tetap presisi dan patuh pada Design System:

1. **Sprint 1 — Foundation & Design Tokens:**
   - Install `react-router-dom lucide-react axios clsx tailwind-merge` dan konfigurasi Tailwind CSS + Google Fonts (`Inter` & `JetBrains Mono`) di `index.html`.
   - Implementasi `tokens.css`, primitive components (`Button` pill-only, `ColorBlock`, `MozaicLogo`, `InitialAvatar`, `TopNav`), `taxonomies.js`, `templates.js`, dan `mockData.js`.
2. **Sprint 2 — Core Demo Flow (Pages 03, 04, 07):**
   - Implementasi `ProfilePage` (batas 5 skill + live Cream preview), `ExploreProjectsPage` (search + category pills + multi-tag filter), dan `ProjectDetailPage` (Mint active role + 1-Click Apply drawer).
3. **Sprint 3 — AI Scoper & Quota Lock (Pages 05, 06, 08):**
   - Implementasi `CreateProjectPage` (Lilac block + DeepSeek mock/API 5s timeout fallback + 4 templat + editable role editor).
   - Implementasi `WorkspacePage` dan `ApplicantReviewPage` (Lime AI Fit & Gap box + `Accept & Kunci Kuota` + buka tombol WA/Telegram).
4. **Sprint 4 — Entry Pages & Semifinal Polish (Pages 01, 02):**
   - Implementasi `LandingPage` (Hero + Black Marquee + Lime Block + Lilac Block) dan `AuthPage` (Split Screen + Navy panel + Quick Demo Persona Switcher).
   - Jalankan `npm run lint` (ESLint) dan uji seluruh alur 4 langkah pada desktop (`1440px`) dan mobile (`390px`) sebelum merekam video demo 2 menit.