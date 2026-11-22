import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Plus, LogIn } from 'lucide-react';
import { MozaicLogo } from '../ui/MozaicLogo';
import { Button } from '../ui/Button';
import { InitialAvatar } from '../ui/InitialAvatar';

/**
 * TopNav Component
 * Aturan:
 * - Tinggi: 56px (h-[56px]), sticky di atas, z-index 40
 * - Latar #ffffff, border bawah hairline 1px solid #e6e6e6
 * - Di Landing Page (/): Menampilkan persis seperti Gambar 1 (Explore Proyek, AI Scoper, Cara Kerja; Masuk & Mulai Cari Tim)
 * - Di Halaman Lain: Menampilkan navigasi workspace lengkap + persona switcher
 * - Mobile (< 960px): Hamburger overlay yang adaptif
 */
export function TopNav({
  currentUser = null,
  onSelectPersona = () => {},
  personas = [],
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const isLandingPage = location.pathname === '/';

  const appNavLinks = [
    { label: 'Explore Proyek', path: '/explore' },
    { label: 'Buat Proyek (AI Scoper)', path: '/create' },
    { label: 'Workspace Saya', path: '/workspace' },
    { label: 'Profil Saya', path: '/profile' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const scrollToCaraKerja = () => {
    setMobileMenuOpen(false);
    if (!isLandingPage) {
      navigate('/#cara-kerja');
      return;
    }
    const elem = document.getElementById('cara-kerja');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-[56px] bg-[#ffffff] border-b border-[#e6e6e6]">
      <div className="container-mozaic h-full flex items-center justify-between">
        {/* Kiri: Logo */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => handleNavClick('/')}
            className="flex items-center cursor-pointer focus:outline-none"
          >
            <MozaicLogo size="md" />
          </button>

          {/* Navigasi Desktop Landing Page (1:1 Gambar 1) */}
          {isLandingPage && (
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={() => handleNavClick('/explore')}
                className="px-3 py-1.5 rounded-[50px] font-sans font-[480] text-[15px] text-[#000000] hover:bg-[#f7f7f5] transition-colors cursor-pointer"
              >
                Explore Proyek
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('/create')}
                className="px-3 py-1.5 rounded-[50px] font-sans font-[480] text-[15px] text-[#000000] hover:bg-[#f7f7f5] transition-colors cursor-pointer"
              >
                AI Scoper
              </button>
              <button
                type="button"
                onClick={scrollToCaraKerja}
                className="px-3 py-1.5 rounded-[50px] font-sans font-[480] text-[15px] text-[#000000] hover:bg-[#f7f7f5] transition-colors cursor-pointer"
              >
                Cara Kerja
              </button>
            </nav>
          )}
        </div>

        {/* Tengah (Desktop >= 960px): Menu Navigasi untuk Halaman Internal */}
        {!isLandingPage && (
          <nav className="hidden lg:flex items-center gap-1">
            {appNavLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === '/explore' &&
                  location.pathname.startsWith('/projects'));
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-1.5 rounded-[50px] font-button text-[15px] transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#000000] text-[#ffffff]'
                      : 'text-[#000000] hover:bg-[#f7f7f5]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Kanan: Pill Buttons Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {isLandingPage ? (
            <>
              {/* Tombol Masuk (Pill Secondary) */}
              <button
                type="button"
                onClick={() => handleNavClick('/auth')}
                className="px-5 py-2 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#e6e6e6] font-sans font-[480] text-[14px] leading-none hover:bg-[#f7f7f5] transition-colors cursor-pointer"
              >
                Masuk
              </button>

              {/* Tombol Mulai Cari Tim (Pill Primary Black) */}
              <button
                type="button"
                onClick={() => handleNavClick('/explore')}
                className="px-5 py-2 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[14px] leading-none hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              >
                Mulai Cari Tim
              </button>
            </>
          ) : (
            <>
              {/* Persona Switcher Dropdown for App Pages */}
              {currentUser ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-[50px] border border-[#e6e6e6] bg-[#ffffff] hover:bg-[#f7f7f5] cursor-pointer"
                    aria-expanded={personaDropdownOpen}
                  >
                    <InitialAvatar
                      initials={currentUser.initials}
                      bgColor={currentUser.avatarColor}
                      size="sm"
                    />
                    <span className="font-button text-[14px] max-w-[120px] truncate text-[#000000]">
                      {currentUser.name}
                    </span>
                  </button>

                  {/* Persona Popover */}
                  {personaDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#ffffff] elevation-2 rounded-[16px] p-2 z-50">
                      <div className="px-3 py-2 border-b border-[#f1f1f1]">
                        <p className="font-caption text-[#000000]">
                          GANTI PERSONA DEMO
                        </p>
                      </div>
                      <div className="py-1 flex flex-col gap-1">
                        {personas.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              onSelectPersona(p);
                              setPersonaDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-left transition-colors cursor-pointer ${
                              currentUser.id === p.id
                                ? 'bg-[#f7f7f5] font-medium'
                                : 'hover:bg-[#f7f7f5]'
                            }`}
                          >
                            <InitialAvatar
                              initials={p.initials}
                              bgColor={p.avatarColor}
                              size="sm"
                            />
                            <div className="min-w-0">
                              <p className="text-[13px] font-sans font-medium text-[#000000] truncate">
                                {p.name}
                              </p>
                              <p className="font-caption text-[10px] text-[#000000] truncate">
                                {p.faculty}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#f1f1f1]">
                        <button
                          type="button"
                          onClick={() => {
                            setPersonaDropdownOpen(false);
                            navigate('/auth');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[8px] font-caption text-[11px] text-[#000000] hover:bg-[#f7f7f5] cursor-pointer"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Masuk dengan Akun Lain (/auth)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleNavClick('/auth')}
                >
                  Masuk
                </Button>
              )}

              {/* Quick CTA Pill Button */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick('/create')}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Proyek</span>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle Button (< 960px) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => handleNavClick('/explore')}
            className="px-3.5 py-1.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[13px] leading-none"
          >
            Explore
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f7f7f5] text-[#000000] border border-[#e6e6e6] cursor-pointer"
            aria-label="Buka Menu Navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[56px] bottom-0 bg-[#ffffff] z-50 flex flex-col p-6 overflow-y-auto lg:hidden">
          <div className="flex flex-col gap-2 pb-6 border-b border-[#e6e6e6]">
            {isLandingPage ? (
              <>
                <button
                  type="button"
                  onClick={() => handleNavClick('/explore')}
                  className="w-full py-3 px-4 rounded-[50px] text-left font-button text-[16px] text-[#000000] bg-[#f7f7f5]"
                >
                  Explore Proyek
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('/create')}
                  className="w-full py-3 px-4 rounded-[50px] text-left font-button text-[16px] text-[#000000] bg-[#f7f7f5]"
                >
                  AI Scoper
                </button>
                <button
                  type="button"
                  onClick={scrollToCaraKerja}
                  className="w-full py-3 px-4 rounded-[50px] text-left font-button text-[16px] text-[#000000] bg-[#f7f7f5]"
                >
                  Cara Kerja
                </button>
              </>
            ) : (
              appNavLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => handleNavClick(link.path)}
                    className={`w-full py-3 px-4 rounded-[50px] text-left font-button text-[16px] transition-colors ${
                      isActive
                        ? 'bg-[#000000] text-[#ffffff]'
                        : 'text-[#000000] bg-[#f7f7f5]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })
            )}
          </div>

          {/* Mobile Persona Switcher (Hanya di Halaman Aplikasi) */}
          {!isLandingPage && currentUser && (
            <div className="pt-6">
              <p className="font-caption text-[#000000] mb-3">
                PERSONA AKTIF (SWITCHER DEMO)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {personas.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onSelectPersona(p);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-[12px] border text-left cursor-pointer ${
                      currentUser.id === p.id
                        ? 'border-[#000000] bg-[#f7f7f5]'
                        : 'border-[#e6e6e6] bg-[#ffffff]'
                    }`}
                  >
                    <InitialAvatar
                      initials={p.initials}
                      bgColor={p.avatarColor}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="text-[12px] font-sans font-medium text-[#000000] truncate">
                        {p.name}
                      </p>
                      <p className="font-caption text-[10px] text-[#000000] truncate">
                        {p.initials}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button
              type="button"
              className="w-full py-3.5 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[16px] text-center"
              onClick={() => handleNavClick('/explore')}
            >
              Mulai Cari Tim
            </button>
            <button
              type="button"
              className="w-full py-3.5 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#e6e6e6] font-sans font-[480] text-[16px] text-center"
              onClick={() => handleNavClick('/auth')}
            >
              Masuk Akun
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
