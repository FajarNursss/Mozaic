import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { mozaicService } from '../services/mozaicService';
import { ApplyDrawer } from '../components/project/ApplyDrawer';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle,
  Lock,
  Check,
} from 'lucide-react';

/**
 * Specimen default data 1:1 persis Figma Screenshot (Gambar 1)
 */
const SPECIMEN_PROJECT = {
  id: 'proj-4',
  title: 'Audit Energi Otomatis Gedung Fakultas dengan IoT Dashboard',
  activity_category: 'CAPSTONE/RISET',
  quota_info: '1/4 PERAN TERISI',
  weekly_hours: '10-12 JAM/MINGGU',
  deadline: '20 DES 2026',
  eligibility: 'TERBUKA UNTUK SEMUA FAKULTAS',
  leader: {
    name: 'Siti Rahma',
    faculty: 'Teknik Elektro - FT',
    initials: 'SR',
    avatar_color: '#f3c9b6', // Peach salmon
    badge: 'KETUA TIM',
  },
  description_p1:
    'Konsumsi energi listrik di gedung perkuliahan Fakultas Teknik kerap mengalami inefisiensi signifikan akibat sistem pencahayaan dan pendingin ruangan yang tetap aktif di luar jam operasional kelas. Ketiadaan data pemantauan konsumsi daya secara granular per ruangan menyulitkan pihak manajemen gedung dalam melakukan audit energi berkala maupun mitigasi pemborosan.',
  description_p2:
    'Proyek Capstone ini bertujuan mengimplementasikan jaringan sensor daya nirkabel berbasis mikrokontroler ESP32 yang terhubung langsung ke dashboard analitik web terpusat. Melalui sistem ini, konsumsi listrik setiap ruangan dipetakan secara real-time untuk mendeteksi anomali penggunaan, menghitung estimasi jejak karbon, serta menyediakan rekomendasi penghematan energi otomatis berbasis data.',
  target_deliverables: [
    {
      no: '01',
      text: 'REST API penerima data sensor ESP32 dan penyimpanan riwayat konsumsi daya.',
    },
    {
      no: '02',
      text: 'Dashboard visualisasi audit energi per ruangan dengan deteksi anomali pemakaian.',
    },
    {
      no: '03',
      text: 'Laporan riset efisiensi energi dan publikasi dokumen Capstone.',
    },
  ],
  team_members: [
    {
      name: 'Siti Rahma · FT',
      initials: 'SR',
      avatar_color: '#f3c9b6',
      role: 'IoT & Hardware Lead',
      badge: 'KETUA',
    },
  ],
  open_roles: [
    {
      id: 'role-backend',
      role_name: 'Backend Developer',
      status: 'OPEN',
      bg_color: '#c8e6cd', // Mint block
      task_description:
        'Membangun API ingestion data sensor ESP32, skema database time-series, dan agregasi laporan.',
      required_skills: ['BACKEND', 'DATA/AI'],
    },
    {
      id: 'role-research',
      role_name: 'Research & Data Analyst',
      status: 'OPEN',
      bg_color: '#f4ecd6', // Cream block
      task_description:
        'Analisis pola pemborosan listrik antar ruang kuliah dan penyusunan metodologi riset.',
      required_skills: ['RESEARCH', 'DATA/AI'],
    },
    {
      id: 'role-copywriter',
      role_name: 'Technical Copywriter',
      status: 'OPEN',
      bg_color: '#c5b0f4', // Lilac block
      task_description:
        'Menyusun dokumentasi sistem, laporan akhir Capstone, dan narasi presentasi.',
      required_skills: ['COPYWRITING'],
    },
  ],
  filled_roles: [
    {
      id: 'role-iot-lead',
      role_name: 'IoT & Hardware Lead',
      status: 'FILLED',
    },
  ],
};

/**
 * Page 04 — ProjectDetailPage (/projects/:id)
 * Refaktorisasi 1:1 Mengikuti Gambar 1 (Desktop & Responsif) & Gambar 2 (1-Click Apply Slide-in Drawer)
 */
export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useMozaic();

  const [projectData, setProjectData] = useState(SPECIMEN_PROJECT);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedRoleIds, setAppliedRoleIds] = useState(new Set());
  const [toastMessage, setToastMessage] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Ambil data proyek dari API / localStorage atau gunakan specimen 1:1
  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const data = await mozaicService.getProjectById(id);

        if (data && data.title) {
          // Adaptasi data proyek nyata ke struktur layout Gambar 1
          const pastelCycle = ['#c8e6cd', '#f4ecd6', '#c5b0f4', '#f3c9b6', '#dceeb1'];
          const openRoles = (data.roles || [])
            .filter((r) => r.status === 'OPEN')
            .map((r, index) => ({
              id: String(r.id),
              role_name: r.role_name,
              status: 'OPEN',
              bg_color: pastelCycle[index % pastelCycle.length],
              task_description:
                r.task_description ||
                'Membangun modul dan kontribusi peran sesuai kualifikasi kompetensi.',
              required_skills: r.required_skills || ['BACKEND', 'DATA/AI'],
            }));

          const filledRoles = (data.roles || [])
            .filter((r) => r.status === 'FILLED')
            .map((r) => ({
              id: String(r.id),
              role_name: r.role_name,
              status: 'FILLED',
            }));

          // Jika openRoles kosong, gunakan specimen agar layout tetap terisi
          const finalOpenRoles =
            openRoles.length > 0 ? openRoles : SPECIMEN_PROJECT.open_roles;
          const finalFilledRoles =
            filledRoles.length > 0 ? filledRoles : SPECIMEN_PROJECT.filled_roles;

          // Pisahkan deskripsi menjadi 2 paragraf jika memungkinkan
          const descParts = data.description
            ? data.description.split('\n\n')
            : [SPECIMEN_PROJECT.description_p1, SPECIMEN_PROJECT.description_p2];

          setProjectData({
            id: String(data.id),
            title: data.title,
            activity_category:
              data.activity_category?.toUpperCase() ||
              SPECIMEN_PROJECT.activity_category,
            quota_info: `${finalFilledRoles.length}/${
              finalOpenRoles.length + finalFilledRoles.length
            } PERAN TERISI`,
            weekly_hours: '10-12 JAM/MINGGU',
            deadline: (data.deadline || '20 DES 2026').toUpperCase(),
            eligibility: 'TERBUKA UNTUK SEMUA FAKULTAS',
            leader: {
              name: data.leader_name || SPECIMEN_PROJECT.leader.name,
              faculty: data.leader_faculty || SPECIMEN_PROJECT.leader.faculty,
              initials: data.leader_initials || SPECIMEN_PROJECT.leader.initials,
              avatar_color:
                data.leader_avatar_color || SPECIMEN_PROJECT.leader.avatar_color,
              badge: 'KETUA TIM',
            },
            description_p1: descParts[0] || SPECIMEN_PROJECT.description_p1,
            description_p2: descParts[1] || SPECIMEN_PROJECT.description_p2,
            target_deliverables: SPECIMEN_PROJECT.target_deliverables,
            team_members: [
              {
                name: `${data.leader_name || 'Siti Rahma'} · ${
                  data.leader_faculty || 'FT'
                }`,
                initials: data.leader_initials || 'SR',
                avatar_color: data.leader_avatar_color || '#f3c9b6',
                role: 'IoT & Hardware Lead',
                badge: 'KETUA',
              },
            ],
            open_roles: finalOpenRoles,
            filled_roles: finalFilledRoles,
          });
        }
      } catch {
        // Fallback ke SPECIMEN_PROJECT 1:1 Figma jika terjadi kendala data
        setProjectData(SPECIMEN_PROJECT);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  // Cek riwayat lamaran yang sudah diajukan oleh user aktif
  useEffect(() => {
    async function checkExistingApplications() {
      if (!currentUser) return;
      try {
        const myApps = await mozaicService.getMyApplications(currentUser.id);
        const appliedIds = new Set();
        (myApps || []).forEach((app) => {
          if (String(app.project_id) === String(id) || app.project_title === projectData.title) {
            appliedIds.add(app.role_id);
          }
        });
        setAppliedRoleIds(appliedIds);
      } catch {
        // Abaikan
      }
    }

    checkExistingApplications();
  }, [currentUser, id, projectData.title]);

  // Buka Drawer Lamaran 1-Klik
  const handleOpenApplyDrawer = (role) => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    setSelectedRole(role);
    setIsDrawerOpen(true);
  };

  // Konfirmasi kirim lamaran dari drawer
  const handleConfirmApply = async () => {
    if (!selectedRole || !currentUser) return;

    try {
      setIsSubmitting(true);
      await mozaicService.applyToRole({
        projectId: projectData.id,
        roleId: selectedRole.id,
        applicantUser: currentUser,
      });

      setAppliedRoleIds((prev) => new Set(prev).add(selectedRole.id));
      setIsDrawerOpen(false);
      setToastMessage(
        `Lamaran untuk peran "${selectedRole.role_name}" berhasil dikirimkan ke Ketua Tim!`
      );
      setTimeout(() => setToastMessage(''), 5000);
    } catch (err) {
      alert(err.message || 'Terjadi kesalahan saat mengajukan lamaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareClick = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <div className="w-full bg-[#ffffff] min-h-screen text-[#000000]">
      {/* Toast Feedback Lamaran / Share */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-[16px] bg-[#c8e6cd] border border-[#1ea64a] text-[#000000] elevation-2 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle className="w-5 h-5 text-[#1ea64a] flex-shrink-0" />
          <span className="font-sans text-[13.5px] font-medium">
            {toastMessage}
          </span>
        </div>
      )}

      {copySuccess && (
        <div className="fixed top-20 right-6 z-50 p-3.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans text-[13px] elevation-2 flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-[#1ea64a]" />
          <span>Tautan proyek berhasil disalin ke clipboard!</span>
        </div>
      )}

      <div className="container-mozaic py-8 lg:py-10">
        {/* =========================================================================
            1. SUB-HEADER: KEMBALI & TOMBOL SHARE/BOOKMARK (1:1 Gambar 1)
            ========================================================================= */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2 font-sans font-medium text-[14px] text-[#000000] hover:underline cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Explore Proyek</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleShareClick}
              className="w-9 h-9 rounded-full border border-[#e6e6e6] bg-[#ffffff] hover:bg-[#f7f7f5] flex items-center justify-center text-[#000000] cursor-pointer transition-colors"
              title="Bagikan Proyek"
              aria-label="Bagikan Proyek"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`w-9 h-9 rounded-full border border-[#e6e6e6] flex items-center justify-center cursor-pointer transition-colors ${
                isBookmarked
                  ? 'bg-[#000000] text-[#ffffff]'
                  : 'bg-[#ffffff] text-[#000000] hover:bg-[#f7f7f5]'
              }`}
              title="Simpan Proyek"
              aria-label="Simpan Proyek"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. EYEBROW METADATA BADGES (1:1 Gambar 1)
            ========================================================================= */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          {/* Category Pill: CAPSTONE/RISET */}
          <span className="px-3 py-1 rounded-[50px] bg-[#f4ecd6] text-[#000000] font-mono text-[10.5px] font-bold tracking-[0.54px] uppercase whitespace-nowrap">
            {projectData.activity_category}
          </span>

          {/* Formasi Kuota Pill: 1/4 PERAN TERISI */}
          <span className="px-3 py-1 rounded-[50px] bg-[#f7f7f5] text-[#000000] border border-[#e6e6e6] font-mono text-[10.5px] font-bold tracking-[0.54px] uppercase whitespace-nowrap">
            {projectData.quota_info}
          </span>

          {/* Jam Kerja */}
          <span className="font-mono text-[11px] font-bold tracking-[0.54px] uppercase text-[#000000] whitespace-nowrap">
            {projectData.weekly_hours}
          </span>

          <span className="text-[#000000] opacity-40">·</span>

          {/* Deadline */}
          <span className="font-mono text-[11px] tracking-[0.54px] uppercase text-[#000000] whitespace-nowrap">
            DEADLINE: {projectData.deadline}
          </span>
        </div>

        {/* =========================================================================
            3. JUDUL PROYEK BESAR (1:1 Gambar 1)
            ========================================================================= */}
        <h1 className="font-sans font-[700] text-[30px] sm:text-[38px] lg:text-[42px] leading-[1.14] text-[#000000] tracking-[-0.9px] max-w-4xl mb-6">
          {projectData.title}
        </h1>

        {/* =========================================================================
            4. INFO KETUA TIM & ELIGIBILITAS (1:1 Gambar 1)
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#f1f1f1]">
          {/* Sisi Kiri: Avatar & Identitas Ketua Tim */}
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: projectData.leader.avatar_color }}
              className="w-9 h-9 rounded-full font-mono text-[12px] font-bold text-[#000000] flex items-center justify-center border border-[#e6e6e6] flex-shrink-0"
            >
              {projectData.leader.initials}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans font-bold text-[14.5px] text-[#000000]">
                {projectData.leader.name}
              </span>
              <span className="font-sans font-[330] text-[13.5px] text-[#000000] opacity-80">
                {projectData.leader.faculty}
              </span>
              <span className="px-2 py-0.5 rounded-[4px] border border-[#e6e6e6] font-mono text-[10px] font-bold tracking-[0.5px] uppercase text-[#000000]">
                {projectData.leader.badge}
              </span>
            </div>
          </div>

          {/* Sisi Kanan: Terbuka Untuk Semua Fakultas */}
          <span className="font-mono text-[11px] font-bold tracking-[0.6px] uppercase text-[#000000]">
            {projectData.eligibility}
          </span>
        </div>

        {/* =========================================================================
            5. MAIN 2-COLUMN GRID (1:1 Gambar 1)
            - Kiri (Col-span 7): Latar Belakang, Target Deliverable, Anggota Tim
            - Kanan (Col-span 5): Peran Terbuka & Kuota Tim, Peran Sudah Terisi
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* -------------------------------------------------------------------
              KOLOM KIRI (lg:col-span-7)
              ------------------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-10">
            {/* Bagian A: Latar Belakang & Masalah */}
            <section>
              <h2 className="font-mono text-[11px] font-bold tracking-[0.6px] uppercase text-[#000000] mb-3">
                LATAR BELAKANG &amp; MASALAH
              </h2>
              <div className="space-y-4 font-sans font-[330] text-[14.5px] sm:text-[15px] leading-[1.65] text-[#000000]">
                <p>{projectData.description_p1}</p>
                <p>{projectData.description_p2}</p>
              </div>
            </section>

            {/* Bagian B: Target Deliverable (Kotak Abu Lembut #f7f7f5) */}
            <section>
              <h2 className="font-mono text-[11px] font-bold tracking-[0.6px] uppercase text-[#000000] mb-3">
                TARGET DELIVERABLE
              </h2>
              <div className="bg-[#f7f7f5] rounded-[20px] p-5 sm:p-6 space-y-3.5 border border-[#e6e6e6]/60">
                {projectData.target_deliverables.map((item) => (
                  <div key={item.no} className="flex items-start gap-3.5">
                    <span className="font-mono font-bold text-[13px] text-[#000000] flex-shrink-0 pt-0.5">
                      {item.no}
                    </span>
                    <p className="font-sans font-[330] text-[13.5px] sm:text-[14px] leading-relaxed text-[#000000]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bagian C: Anggota Tim Saat Ini */}
            <section>
              <h2 className="font-mono text-[11px] font-bold tracking-[0.6px] uppercase text-[#000000] mb-3">
                ANGGOTA TIM SAAT INI ({projectData.quota_info.split(' ')[0]})
              </h2>
              <div className="space-y-3">
                {projectData.team_members.map((member, idx) => (
                  <div
                    key={idx}
                    className="rounded-[16px] border border-[#e6e6e6] bg-[#ffffff] p-4 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{ backgroundColor: member.avatar_color }}
                        className="w-8 h-8 rounded-full font-mono text-[11px] font-bold text-[#000000] flex items-center justify-center border border-[#e6e6e6] flex-shrink-0"
                      >
                        {member.initials}
                      </div>
                      <span className="font-sans font-bold text-[14px] text-[#000000]">
                        {member.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11.5px] text-[#000000] opacity-80 hidden sm:inline">
                        {member.role}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-mono text-[9.5px] font-bold uppercase">
                        {member.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* -------------------------------------------------------------------
              KOLOM KANAN (lg:col-span-5)
              Peran Terbuka & Kuota Tim + Peran Sudah Terisi
              ------------------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.6px] uppercase text-[#000000] mb-3">
              PERAN TERBUKA &amp; KUOTA TIM
            </h2>

            {/* Stack Kartu Peran Terbuka (Mint, Cream, Lilac) */}
            <div className="space-y-3.5">
              {projectData.open_roles.map((role) => {
                const isApplied = appliedRoleIds.has(role.id);

                return (
                  <div
                    key={role.id}
                    style={{ backgroundColor: role.bg_color }}
                    className="rounded-[22px] p-5 sm:p-6 text-[#000000] border border-[#000000]/5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Baris Judul Peran & Badge OPEN */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-sans font-bold text-[17px] sm:text-[18px] text-[#000000]">
                          {role.role_name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#e6e6e6] font-mono text-[9.5px] font-bold uppercase whitespace-nowrap">
                          {role.status}
                        </span>
                      </div>

                      {/* Deskripsi Tugas Peran */}
                      <p className="font-sans font-[330] text-[12.5px] sm:text-[13px] leading-relaxed text-[#000000] mb-3.5">
                        {role.task_description}
                      </p>

                      {/* Tags Kategori Keahlian */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {role.required_skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-[6px] bg-[#ffffff] text-[#000000] border border-[#e6e6e6] font-mono text-[10px] font-medium tracking-[0.54px] uppercase"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tombol Apply 1-Klik / Status Terkirim */}
                    {isApplied ? (
                      <div className="w-full py-2.5 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#1ea64a] font-sans font-medium text-[13px] text-center flex items-center justify-center gap-1.5 select-none">
                        <Check className="w-4 h-4 text-[#1ea64a]" />
                        <span>Lamaran Terkirim • PENDING</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenApplyDrawer(role)}
                        className="w-full py-2.5 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#000000] hover:bg-[#000000] hover:text-[#ffffff] font-sans font-medium text-[13px] text-center transition-colors cursor-pointer"
                      >
                        Apply 1-Klik →
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bagian Peran Sudah Terisi */}
            {projectData.filled_roles.length > 0 && (
              <div className="pt-4">
                <h2 className="font-mono text-[11px] font-bold tracking-[0.6px] uppercase text-[#000000] mb-3">
                  PERAN SUDAH TERISI ({projectData.filled_roles.length})
                </h2>
                <div className="space-y-2">
                  {projectData.filled_roles.map((fRole) => (
                    <div
                      key={fRole.id}
                      className="rounded-[16px] bg-[#f7f7f5] border border-[#e6e6e6] p-4 flex items-center justify-between gap-3"
                    >
                      <span className="font-sans font-bold text-[14px] text-[#000000]">
                        {fRole.role_name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-mono text-[9.5px] font-bold uppercase flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-[#ffffff]" />
                        <span>FILLED</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          6. SLIDE-IN CONFIRMATION DRAWER (1:1 Gambar 2)
          ========================================================================= */}
      <ApplyDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        project={projectData}
        role={selectedRole}
        currentUser={currentUser}
        onConfirmApply={handleConfirmApply}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
