import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Plus, LogOut, User, FolderKanban } from 'lucide-react';
import { MozaicLogo } from '../ui/MozaicLogo';
import { InitialAvatar } from '../ui/InitialAvatar';

/**
 * TopNav Component
 * Aturan:
 * - Tinggi: 56px (h-[56px]), sticky di atas, z-index 40
 * - Latar #ffffff, border bawah hairline 1px solid #e6e6e6
 * - Di Landing Page (/): Menampilkan Explore Proyek, AI Scoper, Cara Kerja, Masuk & Mulai Cari Tim
 * - Di Halaman Internal: Navigasi Explore, Buat Proyek, Workspace Saya, Profil Saya
 * - User Menu: Menampilkan profil akun pengguna yang sedang login & tombol Logout nyata (tanpa mock switcher)
 * - Mobile (< 960px): Hamburger overlay yang adaptif
 */
export function TopNav({ currentUser = null, onLogout = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
    setUserDropdownOpen(false);
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await onLogout();
    navigate('/');
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
          <nav className="hidden lg:flex items-center gap-6 h-[56px]">
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
                  className={`h-[56px] flex items-center font-sans text-[14px] transition-colors cursor-pointer ${
                    isActive
                      ? 'font-[540] text-[#000000] border-b-2 border-[#000000]'
                      : 'font-[400] text-[#000000] border-b-2 border-transparent hover:opacity-70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Kanan: Desktop Pill Buttons / User Profile */}
        <div className="hidden lg:flex items-center gap-3">
          {isLandingPage ? (
            <>
              {currentUser ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleNavClick('/workspace')}
                    className="px-5 py-2 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[14px] leading-none hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                  >
                    Buka Workspace
                  </button>
                  {/* User Profile Avatar Popover */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      style={{ backgroundColor: currentUser.avatarColor || '#dceeb1' }}
                      className="w-8 h-8 rounded-full border border-[#e6e6e6] font-mono text-[11px] font-bold text-[#000000] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                      aria-expanded={userDropdownOpen}
                      title={currentUser.name}
                    >
                      {currentUser.initials || 'U'}
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-[#ffffff] elevation-2 rounded-[16px] p-2 z-50 border border-[#e6e6e6]">
                        <div className="px-3 py-2 border-b border-[#f1f1f1]">
                          <p className="text-[14px] font-sans font-bold text-[#000000] truncate">
                            {currentUser.name}
                          </p>
                          <p className="font-caption text-[11px] text-[#000000] opacity-70 truncate">
                            {currentUser.email}
                          </p>
                          <p className="font-caption text-[10px] text-[#000000] opacity-60 truncate mt-0.5">
                            {currentUser.faculty || 'Mahasiswa Kampus'}
                          </p>
                        </div>

                        <div className="py-1 flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => handleNavClick('/workspace')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-left hover:bg-[#f7f7f5] transition-colors cursor-pointer"
                          >
                            <FolderKanban className="w-4 h-4 text-[#000000]" />
                            <span className="text-[13px] font-sans text-[#000000]">
                              Workspace Saya
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNavClick('/profile')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-left hover:bg-[#f7f7f5] transition-colors cursor-pointer"
                          >
                            <User className="w-4 h-4 text-[#000000]" />
                            <span className="text-[13px] font-sans text-[#000000]">
                              Profil Saya
                            </span>
                          </button>
                        </div>

                        <div className="pt-1 border-t border-[#f1f1f1]">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-[8px] font-sans text-[12px] text-[#d93025] hover:bg-[#fce8e6] transition-colors cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Keluar dari Akun</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleNavClick('/auth')}
                    className="px-5 py-2 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#e6e6e6] font-sans font-[480] text-[14px] leading-none hover:bg-[#f7f7f5] transition-colors cursor-pointer"
                  >
                    Masuk
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('/explore')}
                    className="px-5 py-2 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[14px] leading-none hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                  >
                    Mulai Cari Tim
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {/* Tombol + Buat Proyek (Black Pill 1:1 Figma) */}
              <button
                type="button"
                onClick={() => handleNavClick('/create')}
                className="px-4 py-2 rounded-[50px] bg-[#000000] text-[#ffffff] font-sans font-[480] text-[13px] leading-none hover:bg-[#1a1a1a] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Proyek</span>
              </button>

              {/* User Avatar Circle */}
              {currentUser ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    style={{ backgroundColor: currentUser.avatarColor || '#dceeb1' }}
                    className="w-8 h-8 rounded-full border border-[#e6e6e6] font-mono text-[11px] font-bold text-[#000000] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    aria-expanded={userDropdownOpen}
                    title={`${currentUser.name} (${currentUser.initials})`}
                  >
                    {currentUser.initials || 'U'}
                  </button>

                  {/* Real Authenticated User Popover Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#ffffff] elevation-2 rounded-[16px] p-2 z-50 border border-[#e6e6e6]">
                      <div className="px-3 py-2 border-b border-[#f1f1f1]">
                        <p className="text-[14px] font-sans font-bold text-[#000000] truncate">
                          {currentUser.name}
                        </p>
                        <p className="font-caption text-[11px] text-[#000000] opacity-70 truncate">
                          {currentUser.email}
                        </p>
                        <p className="font-caption text-[10px] text-[#000000] opacity-60 truncate mt-0.5">
                          {currentUser.faculty || 'Mahasiswa Kampus'}
                        </p>
                      </div>

                      <div className="py-1 flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => handleNavClick('/workspace')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-left hover:bg-[#f7f7f5] transition-colors cursor-pointer"
                        >
                          <FolderKanban className="w-4 h-4 text-[#000000]" />
                          <span className="text-[13px] font-sans text-[#000000]">
                            Workspace Saya
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavClick('/profile')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-left hover:bg-[#f7f7f5] transition-colors cursor-pointer"
                        >
                          <User className="w-4 h-4 text-[#000000]" />
                          <span className="text-[13px] font-sans text-[#000000]">
                            Profil Saya
                          </span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-[#f1f1f1]">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-[8px] font-sans text-[12px] text-[#d93025] hover:bg-[#fce8e6] transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Keluar dari Akun</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleNavClick('/auth')}
                  className="px-4 py-2 rounded-[50px] bg-[#ffffff] text-[#000000] border border-[#e6e6e6] font-sans font-[480] text-[13px] leading-none hover:bg-[#f7f7f5] transition-colors cursor-pointer"
                >
                  Masuk
                </button>
              )}
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

          {/* User Info & Actions di Mobile */}
          {currentUser ? (
            <div className="pt-6">
              <div className="p-4 rounded-[16px] bg-[#f7f7f5] border border-[#e6e6e6] flex items-center gap-3 mb-4">
                <InitialAvatar
                  initials={currentUser.initials}
                  bgColor={currentUser.avatarColor || '#dceeb1'}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-sans font-bold text-[#000000] truncate">
                    {currentUser.name}
                  </p>
                  <p className="font-caption text-[11px] text-[#000000] opacity-70 truncate">
                    {currentUser.email}
                  </p>
                  <p className="font-caption text-[10px] text-[#000000] opacity-60 truncate">
                    {currentUser.faculty || 'Mahasiswa Kampus'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-3 px-4 rounded-[50px] text-center font-button text-[14px] text-[#d93025] bg-[#fce8e6] border border-[#f5c2c7] flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Akun</span>
              </button>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </header>
  );
}
