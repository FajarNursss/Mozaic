/**
 * Pre-defined Competition Templates & Fallback Scoper Result
 * Digunakan untuk generator proyek instan dan deterministic fallback saat AI offline.
 */

export const COMPETITION_TEMPLATES = [
  {
    id: 'tpl-gemastik-ppl',
    name: 'Templat Gemastik PPL',
    category: 'Gemastik',
    defaultTitle: 'Sistem Deteksi Anomali Lingkungan Kampus Cerdas',
    defaultDescription:
      'Pengembangan platform pemantauan kualitas udara dan konsumsi energi gedung berbasis web & mobile terintegrasi sensor IoT.',
    roles: [
      {
        role_name: 'Frontend Engineer',
        task_description:
          'Mengembangkan antarmuka dashboard interaktif, grafik visualisasi real-time, dan responsivitas web.',
        required_skills: ['Frontend'],
        quota: 1,
      },
      {
        role_name: 'Backend & Cloud Engineer',
        task_description:
          'Membangun REST API, manajemen database deret waktu (time-series), dan integrasi pipeline stream IoT.',
        required_skills: ['Backend'],
        quota: 1,
      },
      {
        role_name: 'UI/UX Designer',
        task_description:
          'Merancang alur pengguna, wireframe, design system, dan prototipe interaktif di Figma.',
        required_skills: ['UI/UX Design'],
        quota: 1,
      },
      {
        role_name: 'Research & Pitching Lead',
        task_description:
          'Menyusun proposal inovasi ilmiah, studi literatur, serta materi slide dek dan presentasi juri.',
        required_skills: ['Research', 'Business/Pitching'],
        quota: 1,
      },
    ],
  },
  {
    id: 'tpl-pkm-kc',
    name: 'Templat PKM-KC',
    category: 'PKM',
    defaultTitle: 'Alat Pengolah Limbah Organik Otomatis Berbasis Sensor Spektrometri',
    defaultDescription:
      'Solusi karsa cipta aplikatif untuk pemilahan dan pendeteksian dekomposisi sampah organik kantin kampus.',
    roles: [
      {
        role_name: 'Data & AI Specialist',
        task_description:
          'Melatih model klasifikasi citra spektrometri sampah dan integrasi inferensi model.',
        required_skills: ['Data/AI'],
        quota: 1,
      },
      {
        role_name: 'Embedded & Mobile Developer',
        task_description:
          'Mengembangkan aplikasi pengontrol mikrokontroler via Bluetooth/WiFi untuk monitoring operasional alat.',
        required_skills: ['Mobile'],
        quota: 1,
      },
      {
        role_name: 'Technical Copywriter',
        task_description:
          'Menulis laporan kemajuan, artikel ilmiah, dan logbook kegiatan sesuai standar format Belmawa Dikti.',
        required_skills: ['Copywriting'],
        quota: 1,
      },
      {
        role_name: 'Domain Researcher',
        task_description:
          'Validasi metodologi kimiawi dan studi kelayakan dampak reduksi emisi gas metana.',
        required_skills: ['Research'],
        quota: 1,
      },
    ],
  },
  {
    id: 'tpl-hackathon-48h',
    name: 'Templat 48h Hackathon',
    category: 'Hackathon',
    defaultTitle: 'AksesMudah: Solusi Aksesibilitas Fasilitas Publik Kampus',
    defaultDescription:
      'Prototipe kilat 48 jam untuk pemetaan fasilitas ramah difabel di lingkungan kampus dengan pelaporan urun daya.',
    roles: [
      {
        role_name: 'Frontend Developer',
        task_description:
          'Membangun MVP antarmuka web interaktif menggunakan Tailwind CSS dan integrasi Mapbox/Leaflet.',
        required_skills: ['Frontend'],
        quota: 1,
      },
      {
        role_name: 'Backend Developer',
        task_description:
          'Membuat backend cepat (Node.js/Go) dengan database geospasial dan endpoint autentikasi.',
        required_skills: ['Backend'],
        quota: 1,
      },
      {
        role_name: 'Product Designer',
        task_description:
          'Menghasilkan prototipe Figma berkecepatan tinggi dengan fokus aksesibilitas kontras tinggi (WCAG AAA).',
        required_skills: ['UI/UX Design'],
        quota: 1,
      },
      {
        role_name: 'Pitch Master & Business Lead',
        task_description:
          'Menyusun skenario pitch 3 menit, validasi model keberlanjutan, dan penyiapan video demo.',
        required_skills: ['Business/Pitching'],
        quota: 1,
      },
    ],
  },
  {
    id: 'tpl-capstone-riset',
    name: 'Templat Capstone Riset',
    category: 'Capstone/Riset',
    defaultTitle: 'Studi Komparasi Algoritma Pengelompokan Data Genomik Skala Besar',
    defaultDescription:
      'Penelitian komputasional intensif untuk mengevaluasi efisiensi komputasi dan akurasi analisis sekuensing DNA.',
    roles: [
      {
        role_name: 'Backend & Distributed Computing Lead',
        task_description:
          'Optimasi pipeline pemrosesan data paralel dan manajemen worker komputasi kluster.',
        required_skills: ['Backend'],
        quota: 1,
      },
      {
        role_name: 'Data Science / AI Researcher',
        task_description:
          'Eksperimentasi algoritma clustering tak terarah dan evaluasi metrik validitas kluster.',
        required_skills: ['Data/AI'],
        quota: 1,
      },
      {
        role_name: 'Literature Reviewer',
        task_description:
          'Sintesis 30+ jurnal rujukan internasional bereputasi dan pembuatan kerangka teoritis.',
        required_skills: ['Research'],
        quota: 1,
      },
      {
        role_name: 'Academic Paper Editor',
        task_description:
          'Penyusunan naskah bab 1-5, format sitasi LaTeX/IEEE, dan penulisan abstrak dwibahasa.',
        required_skills: ['Copywriting'],
        quota: 1,
      },
    ],
  },
];

/**
 * Deterministic Fallback Output untuk AI Scoper
 * Digunakan jika pemanggilan DeepSeek API melebihi timeout 5000ms atau terjadi kegagalan jaringan.
 */
export const DETERMINISTIC_FALLBACK_SCOPE = {
  title: 'Kolaborasi Proyek Kampus Lintas Disiplin',
  category: 'Hackathon',
  description:
    'Inisiatif solusi digital terpadu untuk menyelesaikan tantangan operasional kampus melalui kolaborasi mahasiswa lintas bidang.',
  roles: [
    {
      role_name: 'Frontend Developer',
      task_description:
        'Mengimplementasikan antarmuka pengguna berbasis komponen yang responsif dan aksesibel.',
      required_skills: ['Frontend'],
      quota: 1,
    },
    {
      role_name: 'Backend Developer',
      task_description:
        'Merancang arsitektur API, skema basis data, dan logika bisnis inti aplikasi.',
      required_skills: ['Backend'],
      quota: 1,
    },
    {
      role_name: 'UI/UX Designer',
      task_description:
        'Melakukan riset kebutuhan pengguna dan menyusun prototipe sistem desain yang konsisten.',
      required_skills: ['UI/UX Design'],
      quota: 1,
    },
    {
      role_name: 'Business & Pitch Strategist',
      task_description:
        'Merumuskan proposisi nilai, analisis kompetitor, dan materi presentasi final.',
      required_skills: ['Business/Pitching'],
      quota: 1,
    },
  ],
};
