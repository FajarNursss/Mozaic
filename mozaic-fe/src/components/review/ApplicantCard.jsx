import { InitialAvatar } from '../ui/InitialAvatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FitGapBox } from './FitGapBox';
import {
  Check,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Send,
  Lock,
} from 'lucide-react';

/**
 * ApplicantCard Component
 * Kartu Peninjauan Pelamar oleh Ketua Tim
 * Aturan:
 * - Rounded-[24px], border hairline 1px solid #e6e6e6, background #ffffff
 * - Match score badge dengan centang #1ea64a jika >= 80%
 * - Lime block untuk FitGapBox
 * - Aksi: Accept & Kunci Kuota, Tolak
 * - Jika status ACCEPTED: buka tombol instan WhatsApp / Telegram
 */
export function ApplicantCard({
  application,
  role,
  onAccept,
  onReject,
  isProcessing = false,
}) {
  const { applicant, fit_score, fit_points, gap_points, gap_summary, status } =
    application;

  const isRoleFilled = role?.status === 'FILLED';
  const isAccepted = status === 'ACCEPTED';
  const isPending = status === 'PENDING';
  const isRejected = status === 'REJECTED';

  // Format link kontak
  const contactLink =
    applicant?.contact_url ||
    (applicant?.contact_platform === 'whatsapp'
      ? 'https://wa.me/6281200000000'
      : 'https://t.me/mozaic_demo');

  return (
    <div className="bg-[#ffffff] elevation-1 rounded-[24px] p-6 flex flex-col gap-5 hover:border-[#000000] transition-colors">
      {/* Header Pelamar & Match Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f1f1f1]">
        <div className="flex items-center gap-3.5">
          <InitialAvatar
            initials={applicant?.initials || 'AP'}
            bgColor={applicant?.avatarColor || '#dceeb1'}
            size="lg"
          />
          <div>
            <h3 className="font-card-title text-[18px] text-[#000000]">
              {applicant?.name}
            </h3>
            <p className="font-caption text-[11px] text-[#000000] opacity-70">
              {applicant?.faculty} • {applicant?.major}
            </p>
          </div>
        </div>

        {/* Match Score Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[50px] bg-[#f7f7f5] border border-[#e6e6e6]">
            {fit_score >= 80 && (
              <CheckCircle2 className="w-4 h-4 text-[#1ea64a]" />
            )}
            <span className="font-mono text-[13px] font-bold text-[#000000]">
              {fit_score}% MATCH
            </span>
          </div>

          <span className="font-caption text-[11px] opacity-70 bg-[#f7f7f5] px-2.5 py-1.5 rounded-[6px]">
            {applicant?.weekly_hours} JAM/MG
          </span>
        </div>
      </div>

      {/* Skill Tags Kandidat dengan Tanda Centang untuk yang Cocok */}
      <div>
        <span className="font-caption text-[10px] text-[#000000] opacity-60 block mb-1.5">
          KEAHLIAN KANDIDAT:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {applicant?.skills?.map((skill) => {
            const isMatch = role?.required_skills?.includes(skill);
            return (
              <Badge
                key={skill}
                size="sm"
                variant={isMatch ? 'accepted' : 'default'}
                className="flex items-center gap-1"
              >
                {isMatch && <Check className="w-3 h-3 text-[#1ea64a]" />}
                <span>{skill}</span>
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Mini-Portfolio */}
      {applicant?.mini_portfolio && (
        <div>
          <span className="font-caption text-[10px] text-[#000000] opacity-60 block mb-1">
            RINGKASAN PORTOFOLIO:
          </span>
          <p className="font-body-sm text-[13px] text-[#000000] font-light bg-[#f7f7f5] p-3 rounded-[8px] border border-[#e6e6e6]">
            &quot;{applicant.mini_portfolio}&quot;
          </p>
          {applicant?.portfolio_url && (
            <a
              href={applicant.portfolio_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-caption text-[11px] text-[#000000] underline mt-1"
            >
              <span>Lihat Portofolio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* Panel AI Fit & Gap Analysis (Latar Lime #dceeb1) */}
      <FitGapBox
        fitPoints={fit_points}
        gapPoints={gap_points}
        gapSummary={gap_summary}
      />

      {/* Bagian Aksi & Status */}
      <div className="pt-4 border-t border-[#f1f1f1] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Label */}
        <div>
          {isAccepted ? (
            <Badge variant="accepted" className="text-[12px] py-1">
              ✓ STATUS: ACCEPTED
            </Badge>
          ) : isRejected ? (
            <Badge variant="rejected" className="text-[12px] py-1">
              STATUS: REJECTED
            </Badge>
          ) : (
            <Badge variant="pending" className="text-[12px] py-1">
              STATUS: MENUNGGU PENINJAUAN (PENDING)
            </Badge>
          )}
        </div>

        {/* Tombol Keputusan atau Tombol Kontak Terbuka */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {isAccepted ? (
            /* Panel Kontak Instan Terbuka Dinamis */
            <div className="flex items-center gap-2">
              <a
                href={contactLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto flex items-center gap-2 bg-[#000000]"
                >
                  {applicant?.contact_platform === 'whatsapp' ? (
                    <MessageCircle className="w-4 h-4 text-[#1ea64a]" />
                  ) : (
                    <Send className="w-4 h-4 text-[#c5b0f4]" />
                  )}
                  <span>
                    Hubungi via{' '}
                    {applicant?.contact_platform === 'whatsapp'
                      ? 'WhatsApp'
                      : 'Telegram'}
                  </span>
                </Button>
              </a>
            </div>
          ) : isPending ? (
            /* Tombol Aksi saat PENDING */
            isRoleFilled ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[50px] bg-[#f7f7f5] text-[#000000] font-mono text-[11px] opacity-60">
                <Lock className="w-3.5 h-3.5" />
                <span>KUOTA SUDAH PENUH</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={isProcessing}
                  onClick={() => onReject(application.id)}
                >
                  Tolak
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={isProcessing}
                  onClick={() => onAccept(application.id)}
                >
                  Accept & Kunci Kuota
                </Button>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
