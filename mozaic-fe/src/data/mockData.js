/**
 * Mock Data Bank for Mozaic
 * Konsisten dengan spesifikasi UI/UX dan skema database.
 */

export const MOCK_USERS = [
  {
    id: 'user-raka',
    name: 'Raka Pratama',
    initials: 'RA',
    avatarColor: '#dceeb1', // block-lime
    email: 'raka.pratama@ui.ac.id',
    faculty: 'Ilmu Komputer (Fasilkom)',
    major: 'Ilmu Komputer',
    skills: ['Backend', 'Data/AI', 'Product Management'],
    mini_portfolio:
      'Membangun backend microservices & pipeline data real-time untuk 2 kompetisi hackathon nasional.',
    portfolio_url: 'https://github.com/rakapratama-demo',
    weekly_hours: 12,
    contact_platform: 'whatsapp',
    contact_url: 'https://wa.me/6281200000001',
  },
  {
    id: 'user-nadia',
    name: 'Nadia Kusuma',
    initials: 'NK',
    avatarColor: '#c5b0f4', // block-lilac
    email: 'nadia.kusuma@itb.ac.id',
    faculty: 'Desain Komunikasi Visual (FSRD)',
    major: 'Desain Komunikasi Visual',
    skills: ['UI/UX Design', 'Multimedia', 'Research'],
    mini_portfolio:
      'Desainer produk end-to-end dengan fokus design system terukur dan usability testing lintas platform.',
    portfolio_url: 'https://behance.net/nadiakusuma-demo',
    weekly_hours: 10,
    contact_platform: 'whatsapp',
    contact_url: 'https://wa.me/6281200000002',
  },
  {
    id: 'user-bima',
    name: 'Bima Wijaya',
    initials: 'BW',
    avatarColor: '#f4ecd6', // block-cream
    email: 'bima.wijaya@ugm.ac.id',
    faculty: 'Manajemen (FEB)',
    major: 'Manajemen Bisnis',
    skills: ['Business/Pitching', 'Copywriting', 'Research'],
    mini_portfolio:
      'Juara 1 Business Plan Competition; spesialis financial projection dan storytelling pitch deck juri.',
    portfolio_url: 'https://linkedin.com/in/bimawijaya-demo',
    weekly_hours: 8,
    contact_platform: 'telegram',
    contact_url: 'https://t.me/bimawijaya_demo',
  },
  {
    id: 'user-siti',
    name: 'Siti Rahma',
    initials: 'SR',
    avatarColor: '#c8e6cd', // block-mint
    email: 'siti.rahma@its.ac.id',
    faculty: 'Teknik Elektro (FT)',
    major: 'Teknik Komputer',
    skills: ['Frontend', 'Mobile', 'Data/AI'],
    mini_portfolio:
      'Frontend & mobile enthusiast yang aktif membangun aplikasi React Native & integrasi sensor telemetri.',
    portfolio_url: 'https://github.com/sitirahma-demo',
    weekly_hours: 15,
    contact_platform: 'whatsapp',
    contact_url: 'https://wa.me/6281200000004',
  },
];

export const MOCK_PROJECTS = [
  {
    id: 'proj-1',
    leader_id: 'user-raka',
    leader_name: 'Raka Pratama',
    leader_faculty: 'Fasilkom UI',
    leader_avatar_color: '#dceeb1',
    leader_initials: 'RA',
    title: 'TaniLensa: Deteksi Dini Hama Padi Berbasis Computer Vision',
    activity_category: 'Gemastik',
    description:
      'Inovasi aplikasi deteksi citra penyakit tanaman padi berbasis Edge AI untuk kelompok tani pedesaan dengan respons diagnosa di bawah 1 detik tanpa koneksi internet stabil.',
    deadline: '15 Okt 2026',
    status: 'OPEN',
    roles: [
      {
        id: 'role-1-1',
        project_id: 'proj-1',
        role_name: 'Edge AI & Computer Vision',
        task_description:
          'Optimasi model MobileNetV3 dengan TensorFlow Lite untuk inferensi citra daun padi di perangkat mobile.',
        required_skills: ['Data/AI'],
        quota: 1,
        filled_count: 1,
        status: 'FILLED',
      },
      {
        id: 'role-1-2',
        project_id: 'proj-1',
        role_name: 'Cloud & API Engineer',
        task_description:
          'Membangun gateway sinkronisasi telemetri petani dan sinkronisasi database berkala.',
        required_skills: ['Backend'],
        quota: 1,
        filled_count: 1,
        status: 'FILLED',
      },
      {
        id: 'role-1-3',
        project_id: 'proj-1',
        role_name: 'Mobile App Developer',
        task_description:
          'Membangun antarmuka mobile responsif, alur kamera terpandu, dan visualisasi riwayat diagnosa tanaman.',
        required_skills: ['Mobile'],
        quota: 1,
        filled_count: 0,
        status: 'OPEN',
      },
      {
        id: 'role-1-4',
        project_id: 'proj-1',
        role_name: 'Business & Pitching Lead',
        task_description:
          'Menyusun skenario pitch 3 menit, analisis rasio dampak biaya petani, dan persiapan presentasi finalis.',
        required_skills: ['Business/Pitching'],
        quota: 1,
        filled_count: 0,
        status: 'OPEN',
      },
    ],
  },
  {
    id: 'proj-2',
    leader_id: 'user-bima',
    leader_name: 'Bima Wijaya',
    leader_faculty: 'FEB UGM',
    leader_avatar_color: '#f4ecd6',
    leader_initials: 'BW',
    title: 'Sirkula: Marketplace Bahan Baku Daur Ulang untuk UMKM Kampus',
    activity_category: 'PKM',
    description:
      'Ekosistem sirkular digital yang menghubungkan penyedia limbah terpilah kampus dengan unit usaha kreatif mahasiswa untuk mengurangi timbulan sampah organik dan anorganik.',
    deadline: '28 Okt 2026',
    status: 'OPEN',
    roles: [
      {
        id: 'role-2-1',
        project_id: 'proj-2',
        role_name: 'Business Lead & Inisiator',
        task_description:
          'Memvalidasi unit ekonomi, kemitraan pengumpul sampah kampus, dan kepatuhan proposal PKM Kewirausahaan.',
        required_skills: ['Business/Pitching'],
        quota: 1,
        filled_count: 1,
        status: 'FILLED',
      },
      {
        id: 'role-2-2',
        project_id: 'proj-2',
        role_name: 'UI/UX Product Designer',
        task_description:
          'Merancang alur transaksi pedagang limbah ke pengrajin dengan antarmuka mobile-first yang bersih dan mudah dipahami.',
        required_skills: ['UI/UX Design'],
        quota: 1,
        filled_count: 0,
        status: 'OPEN',
      },
      {
        id: 'role-2-3',
        project_id: 'proj-2',
        role_name: 'Frontend Web Developer',
        task_description:
          'Mengembangkan web catalog responsif dan alur keranjang pemesanan material daur ulang.',
        required_skills: ['Frontend'],
        quota: 1,
        filled_count: 0,
        status: 'OPEN',
      },
    ],
  },
  {
    id: 'proj-3',
    leader_id: 'user-siti',
    leader_name: 'Siti Rahma',
    leader_faculty: 'FT ITS',
    leader_avatar_color: '#c8e6cd',
    leader_initials: 'SR',
    title: 'Jaga Mental: Chatbot Triase Kesehatan Mental Mahasiswa 24/7',
    activity_category: 'Hackathon',
    description:
      'Solusi pendampingan psikologis awal mahasiswa kampus dengan analisis sentimen percakapan dan eskalasi otomatis ke konselor profesional saat terdeteksi risiko tinggi.',
    deadline: '05 Nov 2026',
    status: 'OPEN',
    roles: [
      {
        id: 'role-3-1',
        project_id: 'proj-3',
        role_name: 'Frontend & App Developer',
        task_description:
          'Mengembangkan antarmuka obrolan aman, enkripsi sisi klien, dan transisi pesan mulus.',
        required_skills: ['Frontend', 'Mobile'],
        quota: 1,
        filled_count: 1,
        status: 'FILLED',
      },
      {
        id: 'role-3-2',
        project_id: 'proj-3',
        role_name: 'Empathetic UX Designer',
        task_description:
          'Merancang micro-copy yang menenangkan, palet warna terapeutik, dan alur tombol pertolongan darurat instan.',
        required_skills: ['UI/UX Design'],
        quota: 1,
        filled_count: 1,
        status: 'FILLED',
      },
      {
        id: 'role-3-3',
        project_id: 'proj-3',
        role_name: 'NLP & AI Safety Engineer',
        task_description:
          'Merancang prompt pipeline dan guardrail klasifikasi keparahan emosional berbasis model bahasa terbuka.',
        required_skills: ['Data/AI'],
        quota: 1,
        filled_count: 0,
        status: 'OPEN',
      },
    ],
  },
  {
    id: 'proj-4',
    leader_id: 'user-raka',
    leader_name: 'Raka Pratama',
    leader_faculty: 'Fasilkom UI',
    leader_avatar_color: '#dceeb1',
    leader_initials: 'RA',
    title: 'Audit Energi Otomatis Gedung Fakultas dengan IoT Dashboard',
    activity_category: 'Capstone/Riset',
    description:
      'Riset implementasi jaringan sensor cerdas berbiaya rendah untuk mengaudit pemborosan pendingin ruangan (AC) dan penerangan gedung perkuliahan fakultas.',
    deadline: '20 Nov 2026',
    status: 'OPEN',
    roles: [
      {
        id: 'role-4-1',
        project_id: 'proj-4',
        role_name: 'IoT Hardware Integrator',
        task_description:
          'Pemasangan sensor arus split-core CT dan transmisi data MQTT ke server lokal kampus.',
        required_skills: ['Mobile'],
        quota: 1,
        filled_count: 1,
        status: 'FILLED',
      },
      {
        id: 'role-4-2',
        project_id: 'proj-4',
        role_name: 'Backend & Data Pipeline',
        task_description:
          'Membangun pipeline agregasi telemetri time-series dan API analitik efisiensi listrik per lantai.',
        required_skills: ['Backend'],
        quota: 1,
        filled_count: 0,
        status: 'OPEN',
      },
      {
        id: 'role-4-3',
        project_id: 'proj-4',
        role_name: 'Energy Data Researcher',
        task_description:
          'Menyusun metodologi perbandingan konsumsi daya terhadap jadwal kelas dan penulisan naskah riset.',
        required_skills: ['Research'],
        quota: 1,
        filled_count: 0,
        status: 'OPEN',
      },
      {
        id: 'role-4-4',
        project_id: 'proj-4',
        role_name: 'Technical Report Editor',
        task_description:
          'Menyusun naskah rekomendasi kebijakan penghematan listrik dekanat dan artikel publikasi.',
        required_skills: ['Copywriting'],
        quota: 1,
        filled_count: 0,
        status: 'OPEN',
      },
    ],
  },
];

export const MOCK_APPLICATIONS = [
  {
    id: 'app-1',
    role_id: 'role-2-2',
    project_id: 'proj-2',
    project_title: 'Sirkula: Marketplace Bahan Baku Daur Ulang untuk UMKM Kampus',
    role_name: 'UI/UX Product Designer',
    applicant: MOCK_USERS[1], // Nadia Kusuma
    fit_score: 95,
    fit_points: [
      'Portofolio desain UI/UX solid di FSRD ITB',
      'Memiliki keahlian terverifikasi dalam Research & Multimedia',
      'Pengalaman merancang sistem desain lintas platform',
    ],
    gap_points: [
      'Perlu adaptasi singkat dengan skema alur transaksi logistik e-commerce',
    ],
    gap_summary:
      'Kandidat sangat ideal dengan skor kecocokan 95%. Latar belakang DKV sangat menunjang kebutuhan estetika dan kepraktisan Sirkula.',
    status: 'PENDING',
    created_at: '2026-11-20T10:30:00Z',
  },
  {
    id: 'app-2',
    role_id: 'role-1-3',
    project_id: 'proj-1',
    project_title: 'TaniLensa: Deteksi Dini Hama Padi Berbasis Computer Vision',
    role_name: 'Mobile App Developer',
    applicant: MOCK_USERS[3], // Siti Rahma
    fit_score: 92,
    fit_points: [
      'Keahlian kuat pada Mobile development dan Frontend',
      'Pengalaman integrasi sensor dan antarmuka hardware',
      'Komitmen waktu 15 jam/minggu (sangat tinggi)',
    ],
    gap_points: [
      'Perlu koordinasi teknis integrasi model offline TFLite',
    ],
    gap_summary:
      'Kandidat teknik elektro dengan jam terbang tinggi. Sangat siap mengeksekusi aplikasi mobile lapangan TaniLensa.',
    status: 'PENDING',
    created_at: '2026-11-20T14:15:00Z',
  },
  {
    id: 'app-3',
    role_id: 'role-1-4',
    project_id: 'proj-1',
    project_title: 'TaniLensa: Deteksi Dini Hama Padi Berbasis Computer Vision',
    role_name: 'Business & Pitching Lead',
    applicant: MOCK_USERS[2], // Bima Wijaya
    fit_score: 94,
    fit_points: [
      'Juara kompetisi rencana bisnis nasional (FEB UGM)',
      'Keahlian terbukti dalam Business/Pitching & Copywriting',
      'Pitch deck visual yang komunikatif dan terstruktur',
    ],
    gap_points: [
      'Perlu pendalaman cepat terminologi hama dan siklus tanam padi',
    ],
    gap_summary:
      'Kandidat paling tepat untuk memimpin penyusunan narasi bisnis dan presentasi penjurian Gemastik.',
    status: 'PENDING',
    created_at: '2026-11-21T09:00:00Z',
  },
];
