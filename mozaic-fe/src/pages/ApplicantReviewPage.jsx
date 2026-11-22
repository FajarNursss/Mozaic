import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mozaicService } from '../services/mozaicService';
import { ApplicantCard } from '../components/review/ApplicantCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Users, CheckCircle, ShieldCheck } from 'lucide-react';

/**
 * Page 06 — Applicant Review, AI Gap Analysis & Quota Lock
 * (/workspace/projects/:id/review) — MVP #5
 * Aturan:
 * - Header: Progres kuota tim & filter pill per peran
 * - Kartu pelamar: AI Fit & Gap Analysis box (Lime #dceeb1)
 * - Keputusan: Accept & Kunci Kuota -> status ACCEPTED, kuota bertambah, jika penuh peran FILLED
 * - Dinamis: Membuka tombol WhatsApp / Telegram instan khusus saat ACCEPTED
 */
export function ApplicantReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('ALL');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Load project & applications
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const projData = await mozaicService.getProjectById(id);
        const appsData = await mozaicService.getApplicationsForProject(id);
        if (isMounted) {
          setProject(projData);
          setApplications(appsData);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id, refreshKey]);

  // Handler Accept & Kunci Kuota
  const handleAcceptApplicant = async (appId) => {
    try {
      setIsProcessing(true);
      await mozaicService.decideApplication(appId, 'ACCEPTED');
      setFeedbackNotice(
        'Pelamar berhasil diterima! Kuota peran telah diperbarui dan kontak instan terbuka.'
      );
      setTimeout(() => setFeedbackNotice(''), 4000);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert(err.message || 'Gagal menerima pelamar.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handler Reject Applicant
  const handleRejectApplicant = async (appId) => {
    try {
      setIsProcessing(true);
      await mozaicService.decideApplication(appId, 'REJECTED');
      setFeedbackNotice('Status pelamar diubah menjadi Ditolak.');
      setTimeout(() => setFeedbackNotice(''), 3000);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert(err.message || 'Gagal menolak pelamar.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter pelamar berdasarkan tab peran yang dipilih
  const filteredApplications = useMemo(() => {
    if (selectedRoleFilter === 'ALL') return applications;
    return applications.filter((app) => app.role_id === selectedRoleFilter);
  }, [applications, selectedRoleFilter]);

  if (loading) {
    return (
      <div className="container-mozaic py-20 text-center">
        <p className="font-mono text-[14px] text-[#000000] opacity-60">
          MEMUAT DAFTAR PELAMAR & ANALISIS AI...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-mozaic py-20 text-center">
        <h2 className="font-card-title text-[24px] mb-3">Proyek Tidak Ditemukan</h2>
        <Button variant="primary" size="md" onClick={() => navigate('/workspace')}>
          Kembali ke Workspace
        </Button>
      </div>
    );
  }

  const totalRoles = project.roles?.length || 0;
  const filledRoles =
    project.roles?.filter((r) => r.status === 'FILLED').length || 0;

  return (
    <div className="container-mozaic py-10">
      {/* Feedback Banner */}
      {feedbackNotice && (
        <div className="mb-8 p-4 rounded-[12px] bg-[#c8e6cd] border border-[#1ea64a] text-[#000000] flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#1ea64a]" />
          <span className="font-sans text-[14px] font-medium">
            {feedbackNotice}
          </span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <button
        type="button"
        onClick={() => navigate('/workspace')}
        className="inline-flex items-center gap-2 font-caption text-[12px] text-[#000000] hover:underline mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>KEMBALI KE WORKSPACE SAYA</span>
      </button>

      {/* Header Proyek & Ringkasan Kuota */}
      <div className="p-6 md:p-8 rounded-[24px] bg-[#ffffff] elevation-1 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#f1f1f1]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="category">{project.activity_category}</Badge>
              <span className="font-caption text-[#000000] opacity-60">
                DEADLINE: {project.deadline}
              </span>
            </div>
            <h1 className="font-display-lg text-[#000000]">{project.title}</h1>
          </div>

          <div className="flex items-center gap-3 bg-[#f7f7f5] px-5 py-3 rounded-[50px] border border-[#e6e6e6]">
            <Users className="w-5 h-5 text-[#000000] opacity-60" />
            <div>
              <span className="font-caption text-[10px] text-[#000000] opacity-60 block">
                PROGRES FORMASI TIM
              </span>
              <span className="font-mono text-[14px] font-bold text-[#000000]">
                {filledRoles}/{totalRoles} PERAN TERISI
              </span>
            </div>
          </div>
        </div>

        {/* Pill Filter per Peran */}
        <div className="pt-6">
          <span className="font-caption text-[#000000] opacity-60 block mb-2.5">
            FILTER PELAMAR BERDASARKAN PERAN:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedRoleFilter('ALL')}
              className={`px-4 py-2 rounded-[50px] font-button text-[14px] transition-colors cursor-pointer select-none ${
                selectedRoleFilter === 'ALL'
                  ? 'bg-[#000000] text-[#ffffff]'
                  : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6] hover:bg-[#f7f7f5]'
              }`}
            >
              Semua Peran ({applications.length})
            </button>

            {project.roles?.map((role) => {
              const roleApps = applications.filter((a) => a.role_id === role.id);
              const isActive = selectedRoleFilter === role.id;
              const isFilled = role.status === 'FILLED';

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRoleFilter(role.id)}
                  className={`px-4 py-2 rounded-[50px] font-button text-[14px] transition-colors cursor-pointer select-none flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#000000] text-[#ffffff]'
                      : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6] hover:bg-[#f7f7f5]'
                  }`}
                >
                  <span>{role.role_name}</span>
                  <span className="font-mono text-[11px] opacity-70">
                    ({roleApps.length})
                  </span>
                  {isFilled && (
                    <span className="text-[10px] bg-[#f7f7f5] text-[#000000] px-1.5 py-0.5 rounded-[4px]">
                      FILLED
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daftar Kartu Pelamar */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="font-eyebrow text-[#000000]">DAFTAR PELAMAR</span>
            <Badge variant="category">
              {filteredApplications.length} KANDIDAT
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-[#1ea64a] font-caption text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>AI FIT & GAP ANALYSIS AKTIF</span>
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApplications.map((app) => {
              const roleOfApp = project.roles?.find((r) => r.id === app.role_id);
              return (
                <ApplicantCard
                  key={app.id}
                  application={app}
                  role={roleOfApp}
                  onAccept={handleAcceptApplicant}
                  onReject={handleRejectApplicant}
                  isProcessing={isProcessing}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 md:p-16 rounded-[24px] bg-[#f7f7f5] border border-[#e6e6e6] text-center max-w-lg mx-auto">
            <Users className="w-12 h-12 text-[#000000] opacity-30 mx-auto mb-4" />
            <h3 className="font-card-title text-[#000000] mb-2">
              Belum Ada Pelamar
            </h3>
            <p className="font-body-sm text-[#000000] font-light mb-6">
              Belum ada mahasiswa yang mengajukan lamaran untuk peran yang Anda
              pilih. Tinjauan akan otomatis muncul setelah kandidat melamar 1-klik.
            </p>
            {selectedRoleFilter !== 'ALL' && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSelectedRoleFilter('ALL')}
              >
                Tampilkan Semua Peran
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
