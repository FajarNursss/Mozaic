import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { mozaicService } from '../services/mozaicService';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  FolderKanban,
  FileCheck2,
  Plus,
  Users,
  ArrowRight,
  MessageCircle,
  Compass,
} from 'lucide-react';

/**
 * Page 08 — My Workspace (/workspace)
 * Aturan:
 * - Ritme: White Canvas + Pill Tab Toggle (Proyek Saya / Lamaran Saya) + Hairline Rows
 * - Tab 1 (Leader View): Proyek yang dibuat user aktif, status kuota, jumlah pelamar pending, CTA "Tinjau Pelamar"
 * - Tab 2 (Candidate View): Riwayat peran yang dilamar, skor kecocokan, status lencana
 * - Khusus status ACCEPTED: Tombol langsung "Hubungi Ketua via WhatsApp / Telegram"
 */
export function WorkspacePage() {
  const navigate = useNavigate();
  const { currentUser } = useMozaic();

  // Active tab: 'projects' | 'applications'
  const [activeTab, setActiveTab] = useState('projects');

  const [myProjects, setMyProjects] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [pendingCounts, setPendingCounts] = useState({});
  const [loading, setLoading] = useState(true);

  // Load projects & applications for current active user
  useEffect(() => {
    async function fetchWorkspaceData() {
      if (!currentUser) return;
      try {
        setLoading(true);
        // Ambil proyek di mana user aktif adalah leader
        const projects = await mozaicService.getMyProjects(currentUser.id);
        setMyProjects(projects);

        // Hitung jumlah pelamar PENDING untuk tiap proyek leader
        const counts = {};
        for (const proj of projects) {
          const apps = await mozaicService.getApplicationsForProject(proj.id);
          const pending = apps.filter((a) => a.status === 'PENDING').length;
          counts[proj.id] = pending;
        }
        setPendingCounts(counts);

        // Ambil riwayat lamaran yang diajukan oleh user aktif
        const apps = await mozaicService.getMyApplications(currentUser.id);
        setMyApplications(apps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkspaceData();
  }, [currentUser]);

  return (
    <div className="container-mozaic py-10">
      {/* Header Workspace */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="font-eyebrow text-[#000000]">
            MY WORKSPACE • PUSAT KENDALI TIM
          </span>
          <h1 className="font-display-lg text-[#000000] mt-1">Workspace Saya</h1>
          <p className="font-body-lg text-[#000000] font-light mt-1">
            Kelola proyek inisiasi Anda dan pantau status seluruh lamaran peran yang
            telah diajukan.
          </p>
        </div>

        {/* Tombol Buat Proyek Baru */}
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/create')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Proyek Baru</span>
        </Button>
      </div>

      {/* Pill Tab Switcher */}
      <div className="flex items-center gap-2 mb-8 bg-[#f7f7f5] p-1.5 rounded-[50px] border border-[#e6e6e6] w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-[50px] font-button text-[15px] transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-[#000000] text-[#ffffff]'
              : 'text-[#000000] hover:bg-[#ffffff]'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Proyek Saya (Ketua Tim)</span>
          <span className="font-mono text-[12px] opacity-75">
            ({myProjects.length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`px-5 py-2.5 rounded-[50px] font-button text-[15px] transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'bg-[#000000] text-[#ffffff]'
              : 'text-[#000000] hover:bg-[#ffffff]'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Lamaran Saya (Kandidat)</span>
          <span className="font-mono text-[12px] opacity-75">
            ({myApplications.length})
          </span>
        </button>
      </div>

      {/* Konten Tab 1: Proyek Saya (Leader View) */}
      {activeTab === 'projects' && (
        <section>
          {loading ? (
            <p className="font-mono text-[13px] opacity-60">
              MEMUAT DATA PROYEK ANDA...
            </p>
          ) : myProjects.length > 0 ? (
            <div className="space-y-4">
              {myProjects.map((project) => {
                const totalRoles = project.roles?.length || 0;
                const filledRoles =
                  project.roles?.filter((r) => r.status === 'FILLED').length || 0;
                const pendingCount = pendingCounts[project.id] || 0;

                return (
                  <div
                    key={project.id}
                    className="p-6 rounded-[24px] bg-[#ffffff] elevation-1 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#000000] transition-colors"
                  >
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2.5 mb-2">
                        <Badge variant="category">
                          {project.activity_category}
                        </Badge>
                        <span className="font-caption text-[#000000] opacity-60">
                          DEADLINE: {project.deadline}
                        </span>
                      </div>
                      <h3 className="font-card-title text-[20px] text-[#000000] mb-2">
                        {project.title}
                      </h3>
                      <p className="font-body-sm text-[#000000] font-light line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#f1f1f1]">
                      {/* Metrik Kuota & Pelamar Pending */}
                      <div className="flex items-center gap-3">
                        <div className="bg-[#f7f7f5] px-4 py-2 rounded-[12px] border border-[#e6e6e6]">
                          <span className="font-caption text-[10px] opacity-60 block">
                            FORMASI KUOTA
                          </span>
                          <span className="font-mono text-[13px] font-bold text-[#000000]">
                            {filledRoles}/{totalRoles} TERISI
                          </span>
                        </div>

                        {pendingCount > 0 ? (
                          <div className="bg-[#f4ecd6] px-4 py-2 rounded-[12px] border border-[#e6e6e6]">
                            <span className="font-caption text-[10px] opacity-60 block">
                              PELAMAR PENDING
                            </span>
                            <span className="font-mono text-[13px] font-bold text-[#000000]">
                              {pendingCount} MENUNGGU
                            </span>
                          </div>
                        ) : (
                          <div className="bg-[#f7f7f5] px-4 py-2 rounded-[12px] border border-[#e6e6e6]">
                            <span className="font-caption text-[10px] opacity-60 block">
                              PELAMAR PENDING
                            </span>
                            <span className="font-mono text-[13px] text-[#000000] opacity-60">
                              0 MENUNGGU
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Tombol Tinjau Pelamar */}
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() =>
                          navigate(`/workspace/projects/${project.id}/review`)
                        }
                        className="w-full sm:w-auto flex items-center justify-center gap-2"
                      >
                        <span>Tinjau Pelamar</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State Proyek Saya */
            <div className="p-12 md:p-16 rounded-[24px] bg-[#f7f7f5] border border-[#e6e6e6] text-center max-w-lg mx-auto">
              <FolderKanban className="w-12 h-12 text-[#000000] opacity-30 mx-auto mb-4" />
              <h3 className="font-card-title text-[#000000] mb-2">
                Belum Ada Proyek yang Anda Buat
              </h3>
              <p className="font-body-sm text-[#000000] font-light mb-6">
                Sebagai ketua tim, Anda dapat mempublikasikan inisiatif lomba atau
                riset baru dengan bantuan AI Project Scoper atau templat siap pakai.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/create')}
              >
                + Buat Proyek Baru Sekarang
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Konten Tab 2: Lamaran Saya (Candidate View) */}
      {activeTab === 'applications' && (
        <section>
          {loading ? (
            <p className="font-mono text-[13px] opacity-60">
              MEMUAT DATA LAMARAN ANDA...
            </p>
          ) : myApplications.length > 0 ? (
            <div className="space-y-4">
              {myApplications.map((app) => {
                const isAccepted = app.status === 'ACCEPTED';
                const isRejected = app.status === 'REJECTED';
                const isPending = app.status === 'PENDING';

                return (
                  <div
                    key={app.id}
                    className="p-6 rounded-[24px] bg-[#ffffff] elevation-1 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#000000] transition-colors"
                  >
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2.5 mb-2">
                        <Badge
                          variant={
                            isAccepted
                              ? 'accepted'
                              : isRejected
                              ? 'rejected'
                              : 'pending'
                          }
                        >
                          STATUS: {app.status}
                        </Badge>
                        <span className="font-caption text-[#000000] opacity-60">
                          SKOR KECOCOKAN: {app.fit_score}% MATCH
                        </span>
                      </div>

                      <h3 className="font-card-title text-[20px] text-[#000000] mb-1">
                        {app.role_name}
                      </h3>
                      <p className="font-body-sm text-[14px] text-[#000000] opacity-80 mb-3">
                        Proyek: <strong>{app.project_title}</strong>
                      </p>

                      <p className="font-body-sm text-[13px] text-[#000000] font-light bg-[#f7f7f5] p-3 rounded-[8px] border border-[#e6e6e6]">
                        &quot;{app.gap_summary}&quot;
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#f1f1f1]">
                      {/* Khusus Status ACCEPTED: Tampilkan Tombol Kontak Instan */}
                      {isAccepted ? (
                        <div className="flex flex-col gap-1 w-full sm:w-auto">
                          <span className="font-caption text-[10px] text-[#1ea64a] font-medium">
                            SELAMAT! LAMARAN DITERIMA KETUA TIM
                          </span>
                          <a
                            href="https://wa.me/6281200000001"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto"
                          >
                            <Button
                              variant="primary"
                              size="md"
                              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#000000]"
                            >
                              <MessageCircle className="w-4 h-4 text-[#1ea64a]" />
                              <span>Hubungi Ketua via WhatsApp</span>
                            </Button>
                          </a>
                        </div>
                      ) : isPending ? (
                        <div className="flex items-center gap-2 text-[#000000] bg-[#f7f7f5] px-4 py-2.5 rounded-[50px] border border-[#e6e6e6]">
                          <Users className="w-4 h-4 opacity-50" />
                          <span className="font-caption text-[11px] opacity-70">
                            Menunggu tinjauan Ketua Tim
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[#000000] bg-[#efd4d4] px-4 py-2.5 rounded-[50px]">
                          <span className="font-caption text-[11px]">
                            Lamaran belum memenuhi kualifikasi formasi
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State Lamaran Saya */
            <div className="p-12 md:p-16 rounded-[24px] bg-[#f7f7f5] border border-[#e6e6e6] text-center max-w-lg mx-auto">
              <FileCheck2 className="w-12 h-12 text-[#000000] opacity-30 mx-auto mb-4" />
              <h3 className="font-card-title text-[#000000] mb-2">
                Belum Ada Lamaran yang Diajukan
              </h3>
              <p className="font-body-sm text-[#000000] font-light mb-6">
                Jelajahi etalase proyek dan temukan peran yang sesuai dengan keahlian
                spesifik Anda. Anda dapat melamar dengan 1-klik tanpa mengisi form ulang.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/explore')}
                className="flex items-center gap-2 mx-auto"
              >
                <Compass className="w-4 h-4" />
                <span>Mulai Cari Proyek di Explore</span>
              </Button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
