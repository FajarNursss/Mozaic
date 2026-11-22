import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { InitialAvatar } from '../ui/InitialAvatar';
import { ArrowRight } from 'lucide-react';

/**
 * ProjectCard Component for Discovery Board
 * Aturan:
 * - Latar #ffffff, border hairline 1px solid #e6e6e6, rounded-[24px], p-6
 * - Tanpa drop shadow
 * - Role quota chips: OPEN (#c8e6cd) vs FILLED (soft line-through)
 */
export function ProjectCard({ project, onSelectProject }) {
  const totalRoles = project.roles?.length || 0;
  const filledRoles =
    project.roles?.filter((r) => r.status === 'FILLED').length || 0;

  return (
    <div className="bg-[#ffffff] elevation-1 rounded-[24px] p-6 flex flex-col justify-between hover:border-[#000000] transition-colors">
      <div>
        {/* Baris Atas: Kategori Kegiatan & Tenggat Waktu */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="category">{project.activity_category}</Badge>
          <span className="font-caption text-[#000000] opacity-60">
            DEADLINE: {project.deadline}
          </span>
        </div>

        {/* Judul Proyek */}
        <h3 className="font-card-title text-[#000000] mb-3 line-clamp-2">
          {project.title}
        </h3>

        {/* Inisiator & Fakultas */}
        <div className="flex items-center gap-2.5 mb-4">
          <InitialAvatar
            initials={project.leader_initials}
            bgColor={project.leader_avatar_color}
            size="sm"
          />
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-medium text-[#000000] truncate">
              {project.leader_name}
            </p>
            <p className="font-caption text-[11px] text-[#000000] opacity-60 truncate">
              {project.leader_faculty}
            </p>
          </div>
        </div>

        {/* Ringkasan Deskripsi */}
        <p className="font-body-sm text-[#000000] font-light line-clamp-2 mb-6">
          {project.description}
        </p>

        {/* Role Quota Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.roles?.map((role) => {
            const isOpen = role.status === 'OPEN';
            return (
              <Badge
                key={role.id}
                size="sm"
                variant={isOpen ? 'open' : 'filled'}
              >
                {role.role_name} • {role.filled_count}/{role.quota}{' '}
                {role.status}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Footer Kartu: Progres Kuota & Tombol Aksi */}
      <div className="pt-4 border-t border-[#f1f1f1] flex items-center justify-between">
        <span className="font-caption text-[#000000] opacity-80">
          {filledRoles}/{totalRoles} PERAN TERISI
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onSelectProject(project.id)}
          className="flex items-center gap-1.5"
        >
          <span>Lihat Detail</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
