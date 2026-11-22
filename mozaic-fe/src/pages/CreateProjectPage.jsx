import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { mozaicService } from '../services/mozaicService';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ColorBlock } from '../components/ui/ColorBlock';
import { SKILL_CATEGORIES, ACTIVITY_CATEGORIES } from '../constants/taxonomies';
import { COMPETITION_TEMPLATES } from '../constants/templates';
import {
  Sparkles,
  FileText,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

/**
 * Page 05 — AI Project Scoper & Templates (/create) — MVP #3
 * Aturan:
 * - Ritme: Lilac Color-Block (#c5b0f4) di atas (Input & Templat) -> White Spacer -> White Editor
 * - Mode Switcher: AI Project Scoper (DeepSeek) vs Templat Siap Pakai
 * - Guardrail: Reliability guardrail timeout 5000ms & fallback badge
 * - Structured Output Editor: 100% editable sebelum publikasi
 */
export function CreateProjectPage() {
  const navigate = useNavigate();
  const { loadProjects } = useMozaic();

  // Mode Switcher: 'ai' | 'templates'
  const [activeMode, setActiveMode] = useState('ai');

  // Input Mentah AI
  const [rawIdea, setRawIdea] = useState('');
  const [selectedAiCategory, setSelectedAiCategory] = useState('Hackathon');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFallbackActive, setIsFallbackActive] = useState(false);

  // Structured Editor State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('Hackathon');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDeadline, setProjectDeadline] = useState('30 Nov 2026');
  const [roles, setRoles] = useState([
    {
      role_name: 'Frontend Developer',
      task_description:
        'Mengembangkan antarmuka pengguna interaktif dan integrasi API.',
      required_skills: ['Frontend'],
      quota: 1,
    },
    {
      role_name: 'Backend Developer',
      task_description:
        'Membangun API, autentikasi sesi, dan skema database terpusat.',
      required_skills: ['Backend'],
      quota: 1,
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  // Handler Generate AI Scoper
  const handleGenerateAI = async () => {
    if (!rawIdea.trim()) {
      alert('Tuliskan ide proyek mentah Anda terlebih dahulu.');
      return;
    }

    setIsGenerating(true);
    setIsFallbackActive(false);

    try {
      const result = await mozaicService.scopeProjectWithAI(
        rawIdea,
        selectedAiCategory
      );

      setIsFallbackActive(result.isFallback);
      if (result.data) {
        setProjectTitle(result.data.title || '');
        setProjectCategory(result.data.category || selectedAiCategory);
        setProjectDescription(result.data.description || rawIdea);
        if (result.data.roles && result.data.roles.length > 0) {
          setRoles(result.data.roles);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menghasilkan struktur proyek.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handler Pilih Templat Siap Pakai
  const handleSelectTemplate = (template) => {
    setProjectTitle(template.defaultTitle);
    setProjectCategory(template.category);
    setProjectDescription(template.defaultDescription);
    setRoles(
      template.roles.map((r) => ({
        ...r,
        quota: r.quota || 1,
      }))
    );
    setIsFallbackActive(false);
  };

  // Dynamic Roles Manipulation
  const handleAddRole = () => {
    setRoles([
      ...roles,
      {
        role_name: 'Peran Baru',
        task_description: 'Deskripsi tugas untuk peran ini.',
        required_skills: ['Frontend'],
        quota: 1,
      },
    ]);
  };

  const handleRemoveRole = (index) => {
    if (roles.length <= 1) {
      alert('Minimal proyek harus memiliki 1 peran.');
      return;
    }
    setRoles(roles.filter((_, idx) => idx !== index));
  };

  const handleRoleChange = (index, field, value) => {
    const updated = [...roles];
    updated[index][field] = value;
    setRoles(updated);
  };

  const handleToggleSkillForRole = (roleIndex, skill) => {
    const updated = [...roles];
    const currentSkills = updated[roleIndex].required_skills || [];
    if (currentSkills.includes(skill)) {
      if (currentSkills.length <= 1) return; // minimal 1 skill
      updated[roleIndex].required_skills = currentSkills.filter(
        (s) => s !== skill
      );
    } else {
      updated[roleIndex].required_skills = [...currentSkills, skill];
    }
    setRoles(updated);
  };

  const handleResetForm = () => {
    setProjectTitle('');
    setProjectCategory('Hackathon');
    setProjectDescription('');
    setProjectDeadline('30 Nov 2026');
    setRoles([
      {
        role_name: 'Frontend Developer',
        task_description:
          'Mengembangkan antarmuka pengguna interaktif dan integrasi API.',
        required_skills: ['Frontend'],
        quota: 1,
      },
    ]);
    setIsFallbackActive(false);
  };

  // Submit & Publish Project
  const handlePublishProject = async (e) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDescription.trim()) {
      alert('Judul dan deskripsi proyek wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    try {
      await mozaicService.createProject({
        title: projectTitle,
        activity_category: projectCategory,
        description: projectDescription,
        deadline: projectDeadline,
        roles: roles,
      });

      await loadProjects();
      setSuccessNotice(true);
      setTimeout(() => {
        navigate('/explore');
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Gagal mempublikasikan proyek.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-mozaic py-10">
      {/* Feedback Banner Publikasi */}
      {successNotice && (
        <div className="mb-8 p-4 rounded-[12px] bg-[#c8e6cd] border border-[#1ea64a] text-[#000000] flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#1ea64a]" />
          <span className="font-sans text-[15px] font-medium">
            Proyek berhasil dipublikasikan! Mengalihkan ke Discovery Board...
          </span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="mb-8">
        <span className="font-eyebrow text-[#000000]">
          AI PROJECT SCOPER & LISTING CREATOR • MVP #3
        </span>
        <h1 className="font-display-lg text-[#000000] mt-1">
          Buat Proyek & Formasi Tim
        </h1>
        <p className="font-body-lg text-[#000000] font-light mt-2 max-w-2xl">
          Gunakan kecerdasan buatan DeepSeek untuk memecah ide mentah Anda menjadi
          struktur peran terukur, atau pilih templat kompetisi siap pakai.
        </p>
      </div>

      {/* 1. Lilac Color-Block Section (#c5b0f4) */}
      <div className="mb-12">
        <ColorBlock variant="lilac" fullBleedOnMobile={false}>
          <div className="flex flex-col gap-6">
            {/* Mode Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-[#ffffff]/80 p-1.5 rounded-[50px] border border-[#e6e6e6]">
                <button
                  type="button"
                  onClick={() => setActiveMode('ai')}
                  className={`px-4 py-2 rounded-[50px] font-button text-[14px] transition-colors cursor-pointer flex items-center gap-2 ${
                    activeMode === 'ai'
                      ? 'bg-[#000000] text-[#ffffff]'
                      : 'text-[#000000] hover:bg-[#ffffff]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Project Scoper (DeepSeek)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('templates')}
                  className={`px-4 py-2 rounded-[50px] font-button text-[14px] transition-colors cursor-pointer flex items-center gap-2 ${
                    activeMode === 'templates'
                      ? 'bg-[#000000] text-[#ffffff]'
                      : 'text-[#000000] hover:bg-[#ffffff]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Templat Siap Pakai</span>
                </button>
              </div>

              {isFallbackActive && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#ffffff] border border-[#ff3d8b] text-[#ff3d8b]">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-caption text-[11px] font-medium">
                    DETERMINISTIC FALLBACK ACTIVE — EDITABLE
                  </span>
                </div>
              )}
            </div>

            {/* Konten Mode AI Scoper */}
            {activeMode === 'ai' ? (
              <div className="bg-[#ffffff] rounded-[24px] p-6 md:p-8 elevation-1">
                <span className="font-caption text-[#000000] opacity-60 block mb-2">
                  LANGKAH 1: KETIKKAN IDE MENTAH PROYEK (1-2 PARAGRAF)
                </span>
                <textarea
                  rows={4}
                  value={rawIdea}
                  onChange={(e) => setRawIdea(e.target.value)}
                  placeholder="Contoh: Kami ingin membuat aplikasi monitoring energi berbasis IoT untuk gedung kampus agar konsumsi listrik AC di luar jam kuliah bisa ditekan secara otomatis..."
                  className="w-full p-4 rounded-[8px] border border-[#e6e6e6] bg-[#f7f7f5] font-sans text-[15px] focus:outline-none focus:border-[#000000] resize-none mb-4"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Pemilih Kategori Kegiatan */}
                  <div className="flex items-center gap-2">
                    <span className="font-caption text-[#000000] opacity-60">
                      TARGET KEGIATAN:
                    </span>
                    <select
                      value={selectedAiCategory}
                      onChange={(e) => setSelectedAiCategory(e.target.value)}
                      className="h-[40px] px-3 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
                    >
                      {ACTIVITY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    disabled={isGenerating}
                    onClick={handleGenerateAI}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {isGenerating
                        ? 'Memproses dengan DeepSeek...'
                        : 'Generate Scope dengan DeepSeek AI'}
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              /* Konten Mode Templat Siap Pakai */
              <div>
                <p className="font-caption text-[#000000] opacity-80 mb-3">
                  PILIH SALAH SATU DARI 4 TEMPLAT KOMPETISI UNTUK MENGISI EDITOR
                  SECARA INSTAN:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {COMPETITION_TEMPLATES.map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => handleSelectTemplate(tpl)}
                      className="p-5 rounded-[16px] bg-[#ffffff] elevation-1 cursor-pointer hover:border-[#000000] transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="category" size="sm">
                            {tpl.category}
                          </Badge>
                          <span className="font-caption text-[11px] opacity-60">
                            {tpl.roles.length} PERAN
                          </span>
                        </div>
                        <h4 className="font-card-title text-[16px] mb-2">
                          {tpl.name}
                        </h4>
                        <p className="font-body-sm text-[12px] opacity-70 line-clamp-2">
                          {tpl.defaultTitle}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#f1f1f1] flex items-center justify-between text-[#000000]">
                        <span className="font-caption text-[11px] font-medium">
                          PILIH TEMPLAT
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ColorBlock>
      </div>

      {/* Spacer Canvas Putih (Memenuhi aturan ritme warna) */}
      <div className="h-8" />

      {/* 2. Structured Output Editor (White Canvas, rounded-[24px], border #e6e6e6, p-8) */}
      <section className="bg-[#ffffff] rounded-[24px] p-6 md:p-10 elevation-1">
        <div className="flex items-center justify-between pb-4 border-b border-[#f1f1f1] mb-8">
          <div>
            <span className="font-eyebrow text-[#000000]">
              STRUCTURED OUTPUT EDITOR • 100% DAPAT DIEDIT
            </span>
            <h2 className="font-headline text-[#000000] mt-1">
              Rincian Informasi & Pembagian Peran
            </h2>
          </div>
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleResetForm}
            className="flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Editor</span>
          </Button>
        </div>

        <form onSubmit={handlePublishProject} className="flex flex-col gap-8">
          {/* Metadata Proyek */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="font-caption text-[#000000] block mb-1.5">
                JUDUL PROYEK KOMPETISI / INOVASI
              </label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Contoh: TaniLensa — Deteksi Dini Hama Padi Berbasis AI"
                className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[15px] focus:outline-none focus:border-[#000000]"
              />
            </div>

            <div>
              <label className="font-caption text-[#000000] block mb-1.5">
                KATEGORI KEGIATAN
              </label>
              <select
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[15px] focus:outline-none focus:border-[#000000]"
              >
                {ACTIVITY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="font-caption text-[#000000] block mb-1.5">
                DESKRIPSI LENGKAP & TUJUAN PROYEK
              </label>
              <textarea
                rows={3}
                required
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Jelaskan masalah yang ingin diselesaikan, arsitektur solusi, dan target hasil tim..."
                className="w-full p-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] leading-relaxed focus:outline-none focus:border-[#000000] resize-none"
              />
            </div>

            <div>
              <label className="font-caption text-[#000000] block mb-1.5">
                TENGGAT PENDAFTARAN (DEADLINE)
              </label>
              <input
                type="text"
                required
                value={projectDeadline}
                onChange={(e) => setProjectDeadline(e.target.value)}
                placeholder="Contoh: 30 Nov 2026"
                className="w-full h-[48px] px-4 rounded-[8px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[15px] focus:outline-none focus:border-[#000000]"
              />
            </div>
          </div>

          {/* Formasi Peran Dinamis */}
          <div className="pt-6 border-t border-[#f1f1f1]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="font-caption text-[#000000] opacity-60 block">
                  FORMASI ANGGOTA TIM
                </span>
                <h3 className="font-card-title text-[18px]">
                  Daftar Peran yang Dicari ({roles.length} Peran)
                </h3>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAddRole}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Peran</span>
              </Button>
            </div>

            {/* List Roles */}
            <div className="space-y-6">
              {roles.map((role, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[16px] border border-[#e6e6e6] bg-[#f7f7f5] flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#000000] text-[#ffffff] font-mono text-[11px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-caption text-[11px] opacity-70">
                        PERAN #{idx + 1}
                      </span>
                    </div>

                    {roles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(idx)}
                        className="text-[#000000] opacity-50 hover:opacity-100 p-1 cursor-pointer"
                        title="Hapus Peran"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3">
                      <label className="font-caption text-[11px] block mb-1">
                        NAMA PERAN
                      </label>
                      <input
                        type="text"
                        required
                        value={role.role_name}
                        onChange={(e) =>
                          handleRoleChange(idx, 'role_name', e.target.value)
                        }
                        placeholder="Contoh: Frontend Engineer / UI Designer"
                        className="w-full h-[44px] px-3 rounded-[6px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
                      />
                    </div>

                    <div>
                      <label className="font-caption text-[11px] block mb-1">
                        KUOTA ANGGOTA
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        required
                        value={role.quota}
                        onChange={(e) =>
                          handleRoleChange(idx, 'quota', Number(e.target.value))
                        }
                        className="w-full h-[44px] px-3 rounded-[6px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#000000]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-caption text-[11px] block mb-1">
                      DESKRIPSI TUGAS & TANGGUNG JAWAB
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={role.task_description}
                      onChange={(e) =>
                        handleRoleChange(idx, 'task_description', e.target.value)
                      }
                      placeholder="Jelaskan apa yang akan dikerjakan anggota pada peran ini..."
                      className="w-full p-3 rounded-[6px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[13px] focus:outline-none focus:border-[#000000] resize-none"
                    />
                  </div>

                  {/* Pemilih Skill Tags untuk Peran Ini */}
                  <div>
                    <span className="font-caption text-[11px] opacity-70 block mb-1.5">
                      PILIH KATEGORI KEAHLIAN YANG DIBUTUHKAN:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILL_CATEGORIES.map((skill) => {
                        const isSelected =
                          role.required_skills?.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleToggleSkillForRole(idx, skill)}
                            className={`px-2.5 py-1 rounded-[6px] font-mono text-[11px] uppercase tracking-[0.54px] transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#000000] text-[#ffffff]'
                                : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6]'
                            }`}
                          >
                            {isSelected ? `✓ ${skill}` : skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-6 border-t border-[#f1f1f1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-caption text-[11px] opacity-60">
              Proyek yang dipublikasikan akan langsung tayang pada Discovery Board.
            </span>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span>
                {isSubmitting
                  ? 'Mempublikasikan Proyek...'
                  : 'Publikasikan Proyek'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
