import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMozaic } from '../context/useMozaic';
import { ProjectCard } from '../components/project/ProjectCard';
import { SKILL_CATEGORIES } from '../constants/taxonomies';
import { Search, Filter, Sparkles, FolderSearch, ChevronDown } from 'lucide-react';

/**
 * Page 03 — Etalase Proyek Lintas Fakultas (/explore)
 * 1:1 Mengikuti Figma:
 * - Header: Eyebrow '■ PROJECT DISCOVERY · LINTAS FAKULTAS' + Judul 'Etalase Proyek Lintas Fakultas' + Subcopy
 * - Header Kanan: Promo Box Lilac (#c5b0f4) 'Punya ide mentah? Pecah jadi peran dalam hitungan detik' + Tombol 'Pecah dengan AI Scoper →'
 * - Filter & Search: Input pencarian bulat + Tombol 'Filter Skill' + Pill Tab kategori kegiatan ('Semua', 'Hackathon', 'PKM', 'Gemastik', 'Capstone/Riset')
 * - Baris Meta: 'MENAMPILKAN {X} DARI 32 PROYEK AKTIF' (kiri) + 'MODE: TAMPILAN KATALOG' (kanan)
 * - Grid: 2 Kolom desktop/tablet -> 1 Kolom mobile
 * - Bottom CTA: Tombol pill 'Muat Lebih Banyak Proyek (28 Tersisa) ⌵'
 */
export function ExploreProjectsPage() {
  const navigate = useNavigate();
  const { projects } = useMozaic();

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillFilterOpen, setSkillFilterOpen] = useState(false);

  // Kategori Tab Lengkap Sesuai Figma (Urutan 1:1)
  const allCategories = [
    'Semua',
    'Hackathon',
    'PKM',
    'Gemastik',
    'Capstone/Riset',
  ];

  // Toggle multi-tag skill filter
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
        const facultyMatch = (project.leader_faculty || '')
          .toLowerCase()
          .includes(q);
        const leaderMatch = (project.leader_name || '')
          .toLowerCase()
          .includes(q);
        const roleMatch = project.roles?.some((r) =>
          r.role_name.toLowerCase().includes(q)
        );
        const skillMatch = project.required_skills?.some((s) =>
          s.toLowerCase().includes(q)
        );

        if (
          !titleMatch &&
          !descMatch &&
          !facultyMatch &&
          !leaderMatch &&
          !roleMatch &&
          !skillMatch
        ) {
          return false;
        }
      }

      // 3. Filter Multi-Tag Skill
      if (selectedSkills.length > 0) {
        const projectSkills =
          project.required_skills ||
          project.roles?.flatMap((r) => r.required_skills || []) ||
          [];
        const hasMatchingSkill = projectSkills.some((skill) =>
          selectedSkills.some(
            (s) => s.toLowerCase() === skill.toLowerCase()
          )
        );
        if (!hasMatchingSkill) {
          return false;
        }
      }

      return true;
    });
  }, [projects, selectedCategory, searchQuery, selectedSkills]);

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="container-mozaic py-8 sm:py-10">
        {/* 1. Header Row (1:1 Figma Gambar 1) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-[#000000] tracking-[0.54px] uppercase font-medium">
              <span className="w-2.5 h-2.5 bg-[#000000] inline-block"></span>
              <span>PROJECT DISCOVERY · LINTAS FAKULTAS</span>
            </div>
            <h1 className="font-sans font-[700] text-[32px] sm:text-[38px] lg:text-[40px] text-[#000000] tracking-[-0.5px] leading-tight mb-2">
              Etalase Proyek Lintas Fakultas
            </h1>
            <p className="font-sans font-[320] text-[14px] sm:text-[15px] text-[#000000] max-w-xl leading-relaxed">
              Temukan rekan riset, kompetisi kampus, dan capstone terbaik. Lamar peran dalam
              1-klik tanpa perlu unggah CV berulang kali.
            </p>
          </div>

          {/* Kotak Promo Lilac (#c5b0f4) 1:1 Figma Gambar 1 */}
          <div className="bg-[#c5b0f4] rounded-[20px] p-4 sm:p-5 flex items-center justify-between gap-5 w-full lg:w-auto shadow-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/40 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-[#000000]" />
              </div>
              <div>
                <p className="font-sans font-[700] text-[13.5px] text-[#000000] leading-tight">
                  Punya ide mentah?
                </p>
                <p className="font-sans font-[320] text-[12px] text-[#000000] mt-0.5">
                  Pecah jadi peran dalam hitungan detik
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/create')}
              className="px-4 py-2 rounded-[50px] bg-[#ffffff] text-[#000000] font-sans font-[480] text-[12px] hover:bg-[#f7f7f5] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Pecah dengan AI Scoper</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 2. Baris Pencarian & Filter Kategori (1:1 Figma Gambar 1) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
          {/* Sisi Kiri: Input Search + Tombol Filter Skill */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <div className="relative flex-1 sm:w-[320px] lg:w-[340px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari proyek, topik riset, atau fakultas..."
                className="w-full h-[44px] pl-10 pr-4 rounded-[50px] border border-[#e6e6e6] bg-[#ffffff] font-sans text-[13px] text-[#000000] placeholder:text-[#000000]/40 focus:outline-none focus:border-[#000000]"
              />
              <Search className="w-4 h-4 text-[#000000]/40 absolute left-3.5 top-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 font-mono text-[10px] uppercase text-[#000000] opacity-60 hover:opacity-100 cursor-pointer"
                >
                  Hapus
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSkillFilterOpen(!skillFilterOpen)}
              className={`h-[44px] px-4 rounded-[50px] border border-[#e6e6e6] font-sans text-[13px] text-[#000000] flex items-center gap-2 hover:bg-[#f7f7f5] transition-colors cursor-pointer select-none whitespace-nowrap ${
                selectedSkills.length > 0
                  ? 'bg-[#f4ecd6] border-[#000000]'
                  : 'bg-[#ffffff]'
              }`}
            >
              <span>Filter Skill</span>
              <Filter className="w-3.5 h-3.5" />
              {selectedSkills.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#000000]" />
              )}
            </button>
          </div>

          {/* Sisi Kanan: Tab Pill Kategori Kegiatan */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {allCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-[50px] px-4 py-2 font-sans font-[480] text-[13px] transition-colors cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? 'bg-[#000000] text-[#ffffff]'
                      : 'bg-[#f7f7f5] text-[#000000] hover:bg-[#e6e6e6]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Dropdown Filter Skill (Multi-tag) */}
        {skillFilterOpen && (
          <div className="p-4 mb-6 bg-[#f7f7f5] rounded-[16px] border border-[#e6e6e6]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] text-[#000000] uppercase tracking-wider font-medium">
                PILIH SKILL YANG DICARI:
              </span>
              {selectedSkills.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedSkills([])}
                  className="font-mono text-[11px] text-[#000000] underline uppercase cursor-pointer"
                >
                  Hapus Filter ({selectedSkills.length})
                </button>
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
                    className={`px-3 py-1.5 rounded-[6px] font-mono text-[11px] uppercase tracking-[0.54px] transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#000000] text-[#ffffff] border border-[#000000]'
                        : 'bg-[#ffffff] text-[#000000] border border-[#e6e6e6] hover:bg-[#e6e6e6]'
                    }`}
                  >
                    {isSelected ? `✓ ${skill}` : skill}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Baris Meta Katalog (1:1 Figma Gambar 1) */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-[11px] text-[#000000] uppercase tracking-[0.54px]">
            MENAMPILKAN {filteredProjects.length} DARI 32 PROYEK AKTIF
          </div>
          <div className="font-mono text-[11px] text-[#000000] uppercase tracking-[0.54px]">
            MODE: TAMPILAN KATALOG
          </div>
        </div>

        {/* 4. Grid Proyek 2 Kolom (1:1 Figma Gambar 1 & Gambar 2) */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
          <div className="p-12 md:p-16 rounded-[24px] bg-[#f7f7f5] border border-[#e6e6e6] text-center flex flex-col items-center max-w-lg mx-auto my-12">
            <FolderSearch className="w-12 h-12 text-[#000000] opacity-30 mb-4" />
            <h3 className="font-sans font-[700] text-[18px] text-[#000000] mb-2">
              Tidak Ada Proyek yang Cocok
            </h3>
            <p className="font-sans font-[320] text-[13.5px] text-[#000000] mb-6">
              Tidak ditemukan proyek dengan kata kunci atau filter keahlian saat ini.
              Coba sesuaikan kata kunci atau bersihkan filter.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-6 py-2.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[13px] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* 5. Tombol Muat Lebih Banyak Proyek (1:1 Figma Gambar 2) */}
        <div className="flex justify-center mt-10 mb-16">
          <button
            type="button"
            onClick={() => {}}
            className="px-8 py-3.5 rounded-[50px] border border-[#e6e6e6] bg-[#ffffff] text-[#000000] font-sans font-[480] text-[14px] hover:bg-[#f7f7f5] transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Muat Lebih Banyak Proyek (28 Tersisa)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
