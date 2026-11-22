import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckCircle2, Lock } from 'lucide-react';

/**
 * RoleCard Component for Project Detail Page
 * Aturan:
 * - Rounded-[24px], p-6
 * - Jika peran aktif/dipilih: disorot latar Mint (#c8e6cd) tanpa shadow
 * - Jika normal: latar #ffffff, border hairline 1px solid #e6e6e6
 * - Tombol aksi:
 *   - OPEN & belum dilamar: button-primary "Apply 1-Klik"
 *   - Sudah dilamar: pill non-aktif "Lamaran Terkirim • PENDING"
 *   - FILLED: badge terkunci "KUOTA PENUH • FILLED"
 */
export function RoleCard({
  role,
  isSelected = false,
  hasApplied = false,
  onSelectRole = () => {},
  onApplyClick = () => {},
}) {
  const isFilled = role.status === 'FILLED';
  const isOpen = role.status === 'OPEN';

  return (
    <div
      onClick={() => onSelectRole(role)}
      className={`rounded-[24px] p-6 transition-all cursor-pointer ${
        isSelected
          ? 'bg-[#c8e6cd] text-[#000000] border-2 border-[#1ea64a]'
          : 'bg-[#ffffff] elevation-1 hover:border-[#000000]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <h4 className="font-card-title text-[#000000]">{role.role_name}</h4>
        <div className="flex items-center gap-2">
          {isOpen ? (
            <Badge variant="open">
              {role.filled_count}/{role.quota} OPEN
            </Badge>
          ) : (
            <Badge variant="filled">
              {role.filled_count}/{role.quota} FILLED
            </Badge>
          )}
        </div>
      </div>

      <p className="font-body-sm text-[#000000] font-light mb-4">
        {role.task_description}
      </p>

      {/* Required Skills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="font-caption text-[#000000] opacity-60 mr-1">
          KEAHLIAN DIBUTUHKAN:
        </span>
        {role.required_skills?.map((skill) => (
          <Badge key={skill} size="sm" variant="default">
            {skill}
          </Badge>
        ))}
      </div>

      {/* Aksi Lamaran */}
      <div className="pt-4 border-t border-[#000000]/10 flex items-center justify-end">
        {hasApplied ? (
          <Button
            variant="secondary"
            size="md"
            disabled
            className="w-full sm:w-auto flex items-center gap-2 bg-[#ffffff]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#1ea64a]" />
            <span>Lamaran Terkirim • PENDING</span>
          </Button>
        ) : isFilled ? (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[50px] bg-[#f7f7f5] text-[#000000] font-mono text-[12px] uppercase opacity-70">
            <Lock className="w-3.5 h-3.5" />
            <span>KUOTA PENUH • TERKUNCI</span>
          </div>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={(e) => {
              e.stopPropagation();
              onApplyClick(role);
            }}
            className="w-full sm:w-auto"
          >
            Apply 1-Klik
          </Button>
        )}
      </div>
    </div>
  );
}
