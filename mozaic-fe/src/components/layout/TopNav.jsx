import { useState } from 'react';
import { Menu, X, Plus, Compass } from 'lucide-react';
import { MozaicLogo } from '../ui/MozaicLogo';
import { Button } from '../ui/Button';
import { InitialAvatar } from '../ui/InitialAvatar';
import { DemoBadge } from './DemoBadge';

/**
 * TopNav Component
 * Aturan:
 * - Tinggi: 56px (h-[56px]), sticky di atas, z-index 40
 * - Latar #ffffff, border bawah hairline 1px solid #e6e6e6
 * - Kiri: MozaicLogo
 * - Tengah (Desktop >= 960px): Navigasi 4 rute utama
 * - Kanan: Demo Persona Switcher + Pill Buttons
 * - Mobile (< 960px): Hamburger overlay
 */
export function TopNav({
  activePath = '/',
  currentUser = null,
  onNavigate = () => {},
  onSelectPersona = () => {},
  personas = [],
  showDemoBadge = true,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Explore Proyek', path: '/explore' },
    { label: 'Buat Proyek (AI Scoper)', path: '/create' },
    { label: 'Workspace Saya', path: '/workspace' },
    { label: 'Profil Saya', path: '/profile' },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-[56px] bg-[#ffffff] border-b border-[#e6e6e6]">
      <div className="container-mozaic h-full flex items-center justify-between">
        {/* Kiri: Logo & Optional Demo Badge */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('/')}
            className="flex items-center cursor-pointer focus:outline-none"
          >
            <MozaicLogo size="md" />
          </button>
          {showDemoBadge && (
            <div className="hidden xl:block">
              <DemoBadge />
            </div>
          )}
        </div>

        {/* Tengah (Desktop >= 960px): Menu Navigasi */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activePath === link.path;
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

        {/* Kanan: Persona & Aksi CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Persona Switcher Dropdown */}
          {currentUser && (
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
                <span className="font-button text-[14px] max-w-[120px] truncate">
                  {currentUser.name}
                </span>
              </button>

              {/* Persona Popover (Elevation Level 2) */}
              {personaDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#ffffff] elevation-2 rounded-[16px] p-2 z-50">
                  <div className="px-3 py-2 border-b border-[#f1f1f1]">
                    <p className="font-caption text-[#000000] opacity-60">GANTI PERSONA DEMO</p>
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
                          <p className="font-caption text-[10px] text-[#000000] opacity-60 truncate">
                            {p.faculty}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
        </div>

        {/* Mobile Toggle Button (< 960px) */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleNavClick('/create')}
            className="px-3"
          >
            <Plus className="w-4 h-4" />
          </Button>

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
            {navLinks.map((link) => {
              const isActive = activePath === link.path;
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
            })}
          </div>

          {/* Mobile Persona Switcher */}
          {currentUser && (
            <div className="pt-6">
              <p className="font-caption text-[#000000] opacity-60 mb-3">
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
                      <p className="font-caption text-[10px] text-[#000000] opacity-60 truncate">
                        {p.initials}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => handleNavClick('/create')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Buat Proyek Baru
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => handleNavClick('/explore')}
            >
              <Compass className="w-5 h-5 mr-2" />
              Mulai Cari Tim
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
