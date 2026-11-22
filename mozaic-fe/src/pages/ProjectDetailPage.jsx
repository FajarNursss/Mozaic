import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { mozaicService } from '../services/mozaicService';
import { RoleCard } from '../components/project/RoleCard';
import { ApplyDrawer } from '../components/project/ApplyDrawer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { InitialAvatar } from '../components/ui/InitialAvatar';
import { ArrowLeft, CheckCircle, Calendar, Users, Shield } from 'lucide-react';

/**
 * Page 04 — Project Detail & 1-Click Apply (/projects/:id) — MVP #4
 * Aturan:
 * - Ritme: White Canvas + Mint Highlight (#c8e6cd) untuk peran aktif + Apply Drawer
 * - Header proyek lengkap: Inisiator, kategori kegiatan, batas waktu
 * - Formasi peran: Seleksi peran, tombol "Apply 1-Klik"
 * - Pencegahan lamaran ganda (deteksi status PENDING / ACCEPTED)
 */
export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useMozaic();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedRoleIds, setAppliedRoleIds] = useState(new Set());
  const [toastMessage, setToastMessage] = useState('');

  // Load project & applications for current user
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await mozaicService.getProjectById(id);
        setProject(data);

        // Pilih role pertama yang OPEN secara default jika ada
        const firstOpen = data.roles?.find((r) => r.status === 'OPEN');
        if (firstOpen) {
          setSelectedRole(firstOpen);
        }

        // Cek peran yang sudah dilamar oleh currentUser
        if (currentUser) {
          const appliedIds = new Set();
          for (const role of data.roles || []) {
            const hasApplied = await mozaicService.hasAppliedToRole(
              id,
              role.id,
              currentUser.id
            );
            if (hasApplied) {
              appliedIds.add(role.id);
            }
          }
          setAppliedRoleIds(appliedIds);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, currentUser]);

  const handleApplyClick = (role) => {
    setSelectedRole(role);
    setIsDrawerOpen(true);
  };

  const handleConfirmApply = async () => {
    if (!selectedRole || !currentUser) return;

    try {
      setIsSubmitting(true);
      await mozaicService.applyToRole({
        projectId: project.id,
        roleId: selectedRole.id,
        applicantUser: currentUser,
      });

      // Tandai peran ini sudah dilamar
      setAppliedRoleIds((prev) => new Set(prev).add(selectedRole.id));
      setIsDrawerOpen(false);
      setToastMessage(
        `Lamaran untuk peran "${selectedRole.role_name}" berhasil dikirim ke Ketua Tim!`
      );
      setTimeout(() => setToastMessage(''), 5000);
    } catch (err) {
      alert(err.message || 'Terjadi kesalahan saat mengajukan lamaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-mozaic py-20 text-center">
        <p className="font-mono text-[14px] text-[#000000] opacity-60">
          MEMUAT DETAIL PROYEK...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-mozaic py-20 text-center">
        <h2 className="font-card-title text-[24px] mb-3">Proyek Tidak Ditemukan</h2>
        <Button variant="primary" size="md" onClick={() => navigate('/explore')}>
          Kembali ke Explore
        </Button>
      </div>
    );
  }

  const totalRoles = project.roles?.length || 0;
  const filledRoles =
    project.roles?.filter((r) => r.status === 'FILLED').length || 0;

  return (
    <div className="container-mozaic py-10">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="mb-8 p-4 rounded-[12px] bg-[#c8e6cd] border border-[#1ea64a] text-[#000000] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#1ea64a]" />
            <span className="font-sans text-[14px] font-medium">
              {toastMessage}
            </span>
          </div>
          <span className="font-caption text-[11px] opacity-70">
            STATUS: PENDING
          </span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <button
        type="button"
        onClick={() => navigate('/explore')}
        className="inline-flex items-center gap-2 font-caption text-[12px] text-[#000000] hover:underline mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>KEMBALI KE EXPLORE PROYEK</span>
      </button>

      {/* Header Proyek */}
      <div className="p-6 md:p-10 rounded-[24px] bg-[#ffffff] elevation-1 mb-10">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <Badge variant="category">{project.activity_category}</Badge>
          <span className="font-caption text-[#000000] opacity-60 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>TENGGAT PENDAFTARAN: {project.deadline}</span>
          </span>
          <span className="font-caption text-[#1ea64a] flex items-center gap-1 ml-auto">
            <Shield className="w-3.5 h-3.5" />
            <span>STATUS: {project.status}</span>
          </span>
        </div>

        <h1 className="font-display-lg text-[#000000] mb-6">
          {project.title}
        </h1>

        {/* Info Ketua Tim & Kuota Formasi */}
        <div className="pt-6 border-t border-[#f1f1f1] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <InitialAvatar
              initials={project.leader_initials}
              bgColor={project.leader_avatar_color}
              size="lg"
            />
            <div>
              <p className="font-caption text-[10px] text-[#000000] opacity-60">
                KETUA TIM / INISIATOR
              </p>
              <h3 className="font-card-title text-[18px] text-[#000000]">
                {project.leader_name}
              </h3>
              <p className="font-caption text-[11px] text-[#000000] opacity-70">
                {project.leader_faculty}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#f7f7f5] px-5 py-3 rounded-[50px] border border-[#e6e6e6]">
            <Users className="w-5 h-5 text-[#000000] opacity-60" />
            <div>
              <span className="font-caption text-[10px] text-[#000000] opacity-60 block">
                KUOTA ANGGOTA TIM
              </span>
              <span className="font-mono text-[14px] font-bold text-[#000000]">
                {filledRoles}/{totalRoles} PERAN TERISI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deskripsi Proyek */}
      <section className="mb-12 max-w-4xl">
        <span className="font-eyebrow text-[#000000] block mb-2">
          DESKRIPSI & LATAR BELAKANG INOVASI
        </span>
        <p className="font-body text-[#000000] font-light leading-relaxed">
          {project.description}
        </p>
      </section>

      {/* Formasi Peran (Roles List) */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="font-eyebrow text-[#000000]">
              FORMASI ANGGOTA & KEAHLIAN
            </span>
            <h2 className="font-headline text-[#000000] mt-1">
              Daftar Peran yang Dibutuhkan
            </h2>
          </div>
          <p className="font-caption text-[#000000] opacity-60 hidden sm:block">
            Sorotan hijau menandakan peran aktif
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.roles?.map((role) => {
            const isSelected = selectedRole?.id === role.id;
            const hasApplied = appliedRoleIds.has(role.id);

            return (
              <RoleCard
                key={role.id}
                role={role}
                isSelected={isSelected}
                hasApplied={hasApplied}
                onSelectRole={(r) => setSelectedRole(r)}
                onApplyClick={handleApplyClick}
              />
            );
          })}
        </div>
      </section>

      {/* Confirmation Drawer */}
      <ApplyDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        project={project}
        role={selectedRole}
        currentUser={currentUser}
        onConfirmApply={handleConfirmApply}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
