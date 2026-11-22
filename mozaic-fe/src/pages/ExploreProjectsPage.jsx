import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { ProjectCard } from '../components/project/ProjectCard';
import { Button } from '../components/ui/Button';
import { ColorBlock } from '../components/ui/ColorBlock';
import { Badge } from '../components/ui/Badge';
import { SKILL_CATEGORIES, ACTIVITY_CATEGORIES } from '../constants/taxonomies';
import { Search, RotateCcw, Filter, Sparkles, FolderSearch } from 'lucide-react';

/**
 * Page 03 — Project Discovery Board (/explore) — MVP #2
 * Aturan:
 * - Ritme: White Canvas + Cream Accent Strip (#f4ecd6) + Soft Filter Surface (#f7f7f5) + Grid Kartu Putih
 * - Pencarian kata kunci real-time
 * - Pill Tabs kategori kegiatan (Semua, Hackathon, PKM, Gemastik, Capstone/Riset)
 * - Multi-Tag skill filter (10 kategori keahlian resmi)
 * - Responsif: 3 kolom desktop -> 2 kolom tablet -> 1 kolom mobile
 */
export function ExploreProjectsPage() {
  const navigate = useNavigate();
  const { projects } = useMozaic();

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Kategori Tab Lengkap: "Semua" + 4 Kategori Resmi
  const allCategories = ['Semua', ...ACTIVITY_CATEGORIES];

  // Toggle multi-tag filter
  const toggleSkillFilter = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setSelectedSkills([]);
  };

  const isFilterActive =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'Semua' ||
    selectedSkills.length > 0;

  // Real-time filtering logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Filter Kategori Kegiatan
      if (
        selectedCategory !== 'Semua' &&
        project.activity_category.toLowerCase() !==
          selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // 2. Filter Kata Kunci
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = project.title.toLowerCase().includes(q);
        const descMatch = project.description.toLowerCase().includes(q);
        const facultyMatch = project.leader_faculty.toLowerCase().includes(q);
        const leaderMatch = project.leader_name.toLowerCase().includes(q);
        const roleMatch = project.roles.some((r) =>
          r.role_name.toLowerCase().includes(q)
        );

        if (
          !titleMatch &&
          !descMatch &&
          !facultyMatch &&
          !leaderMatch &&
          !roleMatch
        ) {
          return false;
        }
      }

      // 3. Filter Multi-Tag Skill
      if (selectedSkills.length > 0) {
        const hasMatchingSkill = project.roles.some((role) =>
          role.required_skills.some((skill) => selectedSkills.includes(skill))
        );
        if (!hasMatchingSkill) {
          return false;
        }
      }

      return true;
    });
  }, [projects, selectedCategory, searchQuery, selectedSkills]);

  // Statistik Ringkas Proyek
  const totalOpenRoles = useMemo(() => {
    return projects.reduce((acc, p) => {
      const openCount = p.roles?.filter((r) => r.status === 'OPEN').length || 0;
      return acc + openCount;
    }, 0);
  }, [projects]);

  return (
    <div className="container-mozaic py-10">
      {/* 1. Header & Cream Accent Strip (#f4ecd6) */}
      <div className="mb-10">
        <ColorBlock variant="cream" fullBleedOnMobile={false}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-eyebrow text-[#000000]">
                PROJECT DISCOVERY • MVP #2
              </span>
              <h1 className="font-display-lg text-[#000000] mt-1">
                Temukan Proyek & Peran Lintas Fakultas
              </h1>
              <p className="font-subhead text-[#000000] mt-2 max-w-2xl">
                Jelajahi inisiatif kompetisi, PKM, dan riset yang sedang aktif mencari
                talenta spesifik dari fakultas Anda.
              </p>
            </div>

            {/* Statistik Cepat */}
            <div className="flex flex-wrap gap-4 bg-[#ffffff] p-5 rounded-[24px] elevation-1">
              <div>
                <p className="font-caption text-[#000000] opacity-60">PROYEK AKTIF</p>
                <p className="font-mono text-[22px] font-bold text-[#000000]">
                  {projects.length}
                </p>
              </div>
              <div className="w-[1px] bg-[#e6e6e6] my-1" />
              <div>
                <p className="font-caption text-[#000000] opacity-60">PERAN OPEN</p>
                <p className="font-mono text-[22px] font-bold text-[#1ea64a]">
                  {totalOpenRoles}
                </p>
              </div>
            </div>
          </div>
        </ColorBlock>
      </div>

      {/* 2. Search & Filter Bar (#f7f7f5, rounded-[24px], p-6) */}
      <section className="bg-[#f7f7f5] rounded-[24px] p-6 md:p-8 mb-12 border border-[#e6e6e6]">
        {/* Input Pencarian Kata Kunci */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul proyek, peran yang dicari, atau inisiator fakultas..."
            className="w-full h-[52px] pl-12 pr-4 rounded-[50px] bg-[#ffffff] border border-[#e6e6e6] font-sans text-[15px] focus:outline-none focus:border-[#000000]"
          />
          <Search className="w-5 h-5 text-[#000000] opacity-40 absolute left-4 top-4 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-4 font-mono text-[11px] uppercase text-[#000000] opacity-60 hover:opacity-100 cursor-pointer"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Pill Tabs: Kategori Kegiatan */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-caption text-[#000000] opacity-70 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>KATEGORI KEGIATAN:</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-[50px] font-button text-[14px] transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#000000] text-[#ffffff] border border-[#000000]'
                      : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6] hover:bg-[#ffffff]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Tag Skill Filter (10 Kategori Baku) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-caption text-[#000000] opacity-70 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FILTER PERAN & KEAHLIAN (MULTI-TAG):</span>
            </span>
            {selectedSkills.length > 0 && (
              <span className="font-mono text-[11px] text-[#000000] opacity-70">
                {selectedSkills.length} TAG TERPILIH
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILL_CATEGORIES.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkillFilter(skill)}
                  className={`px-3 py-1.5 rounded-[6px] font-mono text-[11px] md:text-[12px] uppercase tracking-[0.54px] select-none transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#000000] text-[#ffffff] border border-[#000000]'
                      : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6] hover:bg-[#f7f7f5]'
                  }`}
                >
                  {isSelected ? `✓ ${skill}` : skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tombol Reset Filter jika aktif */}
        {isFilterActive && (
          <div className="mt-6 pt-4 border-t border-[#e6e6e6] flex items-center justify-between">
            <span className="font-caption text-[11px] text-[#000000] opacity-60">
              Filter aktif diterapkan pada etalase
            </span>
            <Button
              variant="tertiary"
              size="sm"
              onClick={resetAllFilters}
              className="flex items-center gap-1.5 text-[13px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua Filter</span>
            </Button>
          </div>
        )}
      </section>

      {/* 3. Grid Kartu Proyek (3 Desktop -> 2 Tablet -> 1 Mobile) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="font-eyebrow text-[#000000]">DAFTAR PROYEK</span>
            <Badge variant="category">{filteredProjects.length} PROYEK</Badge>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={(id) => navigate(`/projects/${id}`)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 md:p-16 rounded-[24px] bg-[#f7f7f5] border border-[#e6e6e6] text-center flex flex-col items-center max-w-lg mx-auto">
            <FolderSearch className="w-12 h-12 text-[#000000] opacity-30 mb-4" />
            <h3 className="font-card-title text-[#000000] mb-2">
              Tidak Ada Proyek yang Cocok
            </h3>
            <p className="font-body-sm text-[#000000] font-light mb-6">
              Tidak ditemukan proyek dengan kriteria pencarian atau kombinasi filter
              keahlian saat ini. Coba sesuaikan kata kunci atau bersihkan filter.
            </p>
            <Button variant="primary" size="md" onClick={resetAllFilters}>
              Reset Semua Filter
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
