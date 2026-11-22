import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { InitialAvatar } from '../ui/InitialAvatar';

/**
 * ApplyDrawer Component
 * 1-Click Role Application Confirmation Drawer
 * Aturan:
 * - Backdrop: rgba(0, 0, 0, 0.60) (Level 3 Elevation)
 * - Latar panel: #ffffff, rounded-l-[24px] di desktop / full di mobile
 * - Mengirim profil lengkap kandidat otomatis tanpa isi ulang form
 */
export function ApplyDrawer({
  isOpen,
  onClose,
  project,
  role,
  currentUser,
  onConfirmApply,
  isSubmitting = false,
}) {
  if (!isOpen || !role || !currentUser) return null;

  // Hitung keahlian yang cocok
  const matchedSkills = (role.required_skills || []).filter((s) =>
    (currentUser.skills || []).includes(s)
  );
  const matchRatio =
    role.required_skills?.length > 0
      ? Math.round((matchedSkills.length / role.required_skills.length) * 100)
      : 80;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-[2px] transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[520px] h-full bg-[#ffffff] md:rounded-l-[24px] p-6 md:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e6e6] mb-6">
            <div>
              <span className="font-eyebrow text-[#000000]">
                KONFIRMASI LAMARAN 1-KLIK
              </span>
              <h3 className="font-card-title text-[#000000] mt-1">
                {role.role_name}
              </h3>
              <p className="font-caption text-[#000000] opacity-60">
                PROYEK: {project?.title}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f7f7f5] hover:bg-[#e6e6e6] text-[#000000] cursor-pointer"
              aria-label="Tutup Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Kartu Profil Otomatis (Tanpa Form Ulang) */}
          <div className="bg-[#f4ecd6] rounded-[24px] p-6 mb-6">
            <span className="font-caption text-[#000000] opacity-70 mb-3 block">
              DATA KANDIDAT YANG DIKIRIMKAN OTOMATIS:
            </span>

            {/* Identitas Kandidat */}
            <div className="flex items-center gap-3 mb-4">
              <InitialAvatar
                initials={currentUser.initials}
                bgColor={currentUser.avatarColor}
                size="md"
              />
              <div className="min-w-0">
                <p className="font-card-title text-[18px] text-[#000000]">
                  {currentUser.name}
                </p>
                <p className="font-caption text-[11px] text-[#000000] opacity-70">
                  {currentUser.faculty} • {currentUser.major}
                </p>
              </div>
            </div>

            {/* Tag Keahlian */}
            <div className="mb-4">
              <p className="font-caption text-[11px] text-[#000000] opacity-70 mb-1.5">
                KEAHLIAN TERVERIFIKASI ({currentUser.skills?.length || 0}/5):
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.skills?.map((s) => {
                  const isMatch = (role.required_skills || []).includes(s);
                  return (
                    <Badge
                      key={s}
                      size="sm"
                      variant={isMatch ? 'accepted' : 'default'}
                      className="flex items-center gap-1"
                    >
                      {isMatch && <Check className="w-3 h-3 text-[#1ea64a]" />}
                      <span>{s}</span>
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Mini Portfolio */}
            <div className="mb-4">
              <p className="font-caption text-[11px] text-[#000000] opacity-70 mb-1">
                MINI-PORTFOLIO (MAKS 280 KARAKTER):
              </p>
              <p className="font-body-sm text-[13px] text-[#000000] font-light bg-[#ffffff] p-3 rounded-[8px] border border-[#e6e6e6]">
                &quot;{currentUser.mini_portfolio}&quot;
              </p>
            </div>

            {/* Komitmen Jam & Kontak */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#000000]/10">
              <div>
                <p className="font-caption text-[10px] text-[#000000] opacity-70">
                  KOMITMEN KERJA
                </p>
                <p className="font-mono text-[13px] font-medium text-[#000000]">
                  {currentUser.weekly_hours} JAM/MINGGU
                </p>
              </div>
              <div>
                <p className="font-caption text-[10px] text-[#000000] opacity-70">
                  PLATFORM KONTAK
                </p>
                <p className="font-mono text-[13px] font-medium text-[#000000] uppercase">
                  {currentUser.contact_platform}
                </p>
              </div>
            </div>
          </div>

          {/* Indikator Kecocokan Cepat */}
          <div className="p-4 rounded-[16px] border border-[#e6e6e6] bg-[#f7f7f5] mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1ea64a]" />
              <div>
                <p className="font-caption text-[11px] text-[#000000] font-medium">
                  ESTIMASI KECOCOKAN KEAHLIAN
                </p>
                <p className="font-body-sm text-[12px] text-[#000000] opacity-70">
                  {matchedSkills.length} dari {role.required_skills?.length || 0} tag
                  relevan
                </p>
              </div>
            </div>
            <span className="font-mono text-[18px] font-bold text-[#000000]">
              {matchRatio}%
            </span>
          </div>

          <p className="font-caption text-[11px] text-[#000000] opacity-60 leading-relaxed mb-6">
            🔒 Catatan Privasi: Tautan WhatsApp/Telegram Anda hanya akan terbuka
            bagi Ketua Tim apabila lamaran ini dinyatakan diterima (ACCEPTED).
          </p>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="pt-4 border-t border-[#e6e6e6] flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            onClick={onConfirmApply}
            className="w-full flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? 'Mengirim Lamaran...' : 'Konfirmasi Lamaran'}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="w-full"
          >
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
}
