# 01-DESIGN-SYSTEM.md — Mozaic Visual System
> Basis: Monochrome Editorial Frame + Oversized Pastel Color-Block Sections.
> Prinsip Inti: Kontras tajam hitam-putih, tanpa bayangan berat, warna pastel hanya sebagai blok sorotan terukur.

## 1. Color Tokens (STRICT — Jangan Tambah Warna Aksen Baru)
### Core & Neutral
- `--color-primary`: `#000000` (Tombol CTA utama, tab aktif, tinta utama)
- `--color-on-primary`: `#ffffff` (Teks di atas permukaan hitam)
- `--color-canvas`: `#ffffff` (Latar utama halaman & isi kartu)
- `--color-surface-soft`: `#f7f7f5` (Tile kartu lembut, tombol ikon bulat, chip non-aktif)
- `--color-hairline`: `#e6e6e6` (Border 1px untuk kartu, input form, divider utama)
- `--color-hairline-soft`: `#f1f1f1` (Garis pemisah baris tabel & footer)
- `--color-inverse-canvas`: `#000000` (Marquee strip, panel gelap)
- `--color-inverse-ink`: `#ffffff` (Teks di atas permukaan gelap/navy)
- `--color-overlay-scrim`: `rgba(0, 0, 0, 0.60)` (Backdrop modal/drawer)

### Pastel Color-Block Surfaces (Pengganti Drop Shadow)
- `--block-lime`: `#dceeb1` (Blok sistem, AI Fit & Gap Analysis, FAQ)
- `--block-lilac`: `#c5b0f4` (Blok AI Project Scoper / DeepSeek, promo banner)
- `--block-cream`: `#f4ecd6` (Blok profil mahasiswa, templat kompetisi, kartu ringkasan)
- `--block-mint`: `#c8e6cd` (Blok peran terbuka / kolaborasi aktif)
- `--block-pink`: `#efd4d4` (Blok catatan / sorotan sekunder)
- `--block-coral`: `#f3c9b6` (Blok callout pengiriman / aksi cepat)
- `--block-navy`: `#1f1d3d` (Blok gelap editorial, split-panel Auth; teks putih `#ffffff`)

### Semantic & Scarce Accent
- `--semantic-success`: `#1ea64a` (Hanya untuk ikon centang, indikator Accepted/Match tinggi — bukan latar penuh)
- `--accent-magenta`: `#ff3d8b` (Single-shot promo CTA. Maksimal 1 per halaman, dilarang jadi warna section)

## 2. Typography (Open-Source Substitutes)
- **Sans (`--font-sans`):** `Inter` (atau `Geist`), fallback `system-ui, sans-serif`.
- **Mono (`--font-mono`):** `JetBrains Mono` (atau `Geist Mono`), fallback `monospace`.
- **Aturan Hierarki:** DILARANG menggunakan teks abu-abu pudar untuk membedakan hierarki paragraf. Gunakan tinta hitam `#000000` dan bedakan lewat **font weight** (`320–340` untuk body, `480–540` untuk emphasis/button, `700` untuk judul kartu).
- **Aturan Mono:** `JetBrains Mono` HANYA untuk *eyebrow*, label kategori, *skill tags*, dan *caption* (selalu `UPPERCASE`, `letter-spacing: +0.54px` s.d. `+0.60px`). Dilarang untuk paragraf.

| Token | Font | Desktop | Mobile | Weight | Line Height | Tracking | Penggunaan |
|---|---|---|---|---|---|---|---|
| `display-xl` | Inter | 86px | 48px | 340 | 1.00 | -1.72px | Hero headline (Landing) |
| `display-lg` | Inter | 64px | 36px | 340 | 1.10 | -0.96px | Judul pembuka section |
| `headline` | Inter | 26px | 22px | 540 | 1.35 | -0.26px | Judul blok/halaman aplikasi |
| `subhead` | Inter | 26px | 20px | 340 | 1.35 | -0.26px | Paragraf pengantar di color-block |
| `card-title` | Inter | 24px | 20px | 700 | 1.45 | 0px | Judul proyek & kartu peran |
| `body-lg` | Inter | 20px | 18px | 330 | 1.40 | -0.14px | Lead copy, label form utama |
| `body` | Inter | 18px | 16px | 320 | 1.45 | -0.26px | Teks paragraf standar |
| `body-sm` | Inter | 16px | 14px | 330 | 1.45 | -0.14px | Deskripsi kartu, tabel, nav |
| `button` | Inter | 18px–20px | 16px | 480 | 1.40 | -0.10px | Semua tombol pill & tab |
| `eyebrow` | JetBrains Mono | 14px–18px | 12px | 400 | 1.30 | +0.54px | Label section UPPERCASE |
| `caption` | JetBrains Mono | 12px | 11px | 400 | 1.00 | +0.60px | Skill tags, status badge, meta |

## 3. Shape, Radius & Spacing (8px Grid)
- **Radius:**
  - `xs`: `2px` (Dekorasi/underline)
  - `sm`: `6px` (Skill tag chips, sub-nav)
  - `md`: `8px` (Input form, frame gambar, template card)
  - `lg`: `24px` (Kartu proyek, kartu pelamar, color-block section)
  - `xl`: `32px` (Panel hero besar)
  - `pill`: `50px` (**WAJIB** untuk semua tombol teks CTA dan tab toggle — dilarang tombol kotak)
  - `full`: `9999px` (Tombol ikon bulat, avatar, indikator bulat)
- **Spacing:** `4px`, `8px`, `12px`, `16px`, `24px` (padding kartu), `32px`, `48px` (padding dalam color-block), `96px` (jarak antar section utama).
- **Container & Breakpoints:**
  - Desktop utama: `1440px` (max content width `1280px`).
  - Tablet: `960px` (grid 3–4 kolom turun jadi 2 kolom; nav jadi hamburger).
  - Mobile: `390px` (color-block menjadi *full-bleed* tanpa sudut membulat di sisi luar; CTA pill full-width).
- **Touch Targets:** Tinggi minimal tombol pill `44px`, tombol ikon bulat `40px` (desktop) / `44px` (mobile), input form `48px`.

## 4. Elevation & Component Rules
- **Shadow-Light:** Level 0 (flat pada color-block & footer), Level 1 (border `1px solid #e6e6e6` pada kartu & input), Level 2 (`0 4px 16px rgba(0,0,0,0.06)` HANYA untuk dropdown/floating card), Level 3 (modal + scrim).
- **Ritme Warna:** Selalu sisipkan ruang putih (`#ffffff`) di antara dua color-block. Dilarang menempelkan dua color-block berbeda dalam satu viewport.
- **Kelangkaan Tombol Hitam:** Maksimal 1 tombol `button-primary` (`#000000`) per area fokus. Aksi sekunder wajib memakai `button-secondary` (latar putih, teks hitam, border hairline bila di atas kanvas putih) atau `button-tertiary-text`.