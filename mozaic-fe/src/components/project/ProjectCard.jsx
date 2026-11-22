import { ArrowRight } from 'lucide-react';

/**
 * ProjectCard Component for Discovery Board
 * Aturan 1:1 sesuai Figma:
 * - Latar #ffffff, border hairline 1px solid #e6e6e6, rounded-[24px], p-6
 * - Tanpa drop shadow
 * - Header: Badge kategori kegiatan (pastel pill) + Notice badge opsional (misal '● 2 PELAMAR PERLU DITINJAU')
 * - Header kanan: Avatar stack (anggota tim aktif + slot kosong putus-putus bergaris batas)
 * - Judul: bold 18px text-[#000000]
 * - Deskripsi: 13.5px line-clamp-2
 * - Label: 'PERAN TERBUKA BUTUH SKILL:' uppercase font-mono 10px
 * - Skill chips: font-mono text-[10.5px] uppercase rounded-[6px] border border-[#e6e6e6] bg-[#f7f7f5]
 * - Footer: Avatar inisiator + Nama · Fakultas · Jam/Minggu (kiri) + Lihat Detail → (kanan)
 */
export function ProjectCard({ project, onSelectProject }) {
  // Category badge pastel styling
  const getCategoryBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'capstone/riset':
        return 'bg-[#dceeb1] text-[#000000]';
      case 'gemastik':
        return 'bg-[#efd4d4] text-[#000000]';
      case 'pkm':
        return 'bg-[#c8e6cd] text-[#000000]';
      case 'hackathon':
        return 'bg-[#f3c9b6] text-[#000000]';
      default:
        return 'bg-[#f4ecd6] text-[#000000]';
    }
  };

  // Team avatar stack & dashed empty slots
  const team = project.team_avatars || [
    {
      initials: project.leader_initials || 'RP',
      color: project.leader_avatar_color || '#dceeb1',
    },
  ];
  const emptySlotsCount =
    project.empty_slots !== undefined ? project.empty_slots : 1;

  // Open skills
  const skills =
    project.required_skills ||
    project.roles?.flatMap((r) => r.required_skills || []) ||
    [];
  const uniqueSkills = Array.from(new Set(skills));

  const leaderText =
    project.leader_meta ||
    `${project.leader_name} · ${project.leader_faculty}${
      project.leader_hours ? ` · ${project.leader_hours}` : ''
    }`;

  return (
    <div
      onClick={() => onSelectProject(project.id)}
      className="bg-[#ffffff] border border-[#e6e6e6] rounded-[24px] p-6 hover:border-[#000000] transition-colors flex flex-col justify-between cursor-pointer group shadow-none"
    >
      <div>
        {/* Baris Atas: Kategori Kegiatan + Notice Badge (kiri) & Avatar Stack (kanan) */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-[50px] px-3.5 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider ${getCategoryBadgeClass(
                project.activity_category
              )}`}
            >
              {project.activity_category}
            </span>

            {project.notice && (
              <span className="bg-[#dceeb1] text-[#000000] rounded-[50px] px-3 py-1 font-mono text-[10.5px] font-bold tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#000000]"></span>
                <span>{project.notice.replace(/^[●•]\s*/, '')}</span>
              </span>
            )}
          </div>

          {/* Avatar stack dengan dashed slot kosong */}
          <div className="flex items-center pl-2 flex-shrink-0">
            {team.map((m, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: m.color }}
                className="w-7 h-7 rounded-full border-2 border-[#ffffff] flex items-center justify-center font-mono text-[10px] font-bold text-[#000000] -ml-2 first:ml-0"
                title={m.initials}
              >
                {m.initials}
              </div>
            ))}
            {Array.from({ length: emptySlotsCount }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="w-7 h-7 rounded-full border border-dashed border-[#000000]/40 -ml-2 bg-transparent"
              />
            ))}
          </div>
        </div>

        {/* Judul Proyek */}
        <h3 className="font-sans font-[700] text-[18px] sm:text-[19px] text-[#000000] leading-snug mb-2 group-hover:text-black">
          {project.title}
        </h3>

        {/* Deskripsi Proyek */}
        <p className="font-sans font-[320] text-[13.5px] text-[#000000] leading-relaxed mb-5 line-clamp-2">
          {project.description}
        </p>

        {/* Skill yang Dibutuhkan */}
        <div className="mb-6">
          <p className="font-mono text-[10px] text-[#000000] uppercase tracking-wider mb-2 font-medium">
            PERAN TERBUKA BUTUH SKILL:
          </p>
          <div className="flex flex-wrap gap-2">
            {uniqueSkills.map((skill, idx) => (
              <span
                key={idx}
                className="rounded-[6px] border border-[#e6e6e6] bg-[#f7f7f5] px-2.5 py-1 font-mono text-[10.5px] text-[#000000] uppercase font-normal tracking-[0.3px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Kartu */}
      <div className="pt-4 border-t border-[#f1f1f1] flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div
            style={{
              backgroundColor: project.leader_avatar_color || '#dceeb1',
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-[#000000] flex-shrink-0"
          >
            {project.leader_initials || 'RP'}
          </div>
          <span className="font-sans text-[12.5px] text-[#000000] font-normal truncate">
            {leaderText}
          </span>
        </div>

        <div className="flex items-center gap-1 font-sans text-[12.5px] font-medium text-[#000000] flex-shrink-0 group-hover:underline">
          <span>Lihat Detail</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
