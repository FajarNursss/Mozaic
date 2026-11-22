import { useState, useEffect } from 'react';
import { MozaicContext } from './mozaicContextDef';
import { mozaicService } from '../services/mozaicService';

export function MozaicProvider({ children }) {
  // Ambil user dari localStorage jika sesi login sebelumnya masih tersimpan
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mozaic_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePath, setActivePath] = useState('/');

  // Muat daftar proyek langsung dari API backend saat inisialisasi
  const loadProjects = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await mozaicService.getProjects(filters);
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Gagal mengambil data proyek dari API:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cek token dan ambil profil user terbaru dari API backend
  useEffect(() => {
    loadProjects();

    const token = localStorage.getItem('mozaic_auth_token');
    if (token) {
      mozaicService
        .getCurrentUser()
        .then((user) => {
          if (user && user.id) {
            setCurrentUser(user);
            localStorage.setItem('mozaic_current_user', JSON.stringify(user));
          }
        })
        .catch(() => {
          // Token tidak valid/kedaluwarsa
          localStorage.removeItem('mozaic_auth_token');
          localStorage.removeItem('mozaic_current_user');
          setCurrentUser(null);
        });
    }
  }, []);

  // Login melalui backend API
  const login = async ({ email, password }) => {
    const user = await mozaicService.login({ email, password });
    setCurrentUser(user);
    localStorage.setItem('mozaic_current_user', JSON.stringify(user));
    return user;
  };

  // Registrasi akun baru melalui backend API
  const register = async (userData) => {
    const user = await mozaicService.register(userData);
    setCurrentUser(user);
    localStorage.setItem('mozaic_current_user', JSON.stringify(user));
    return user;
  };

  // Logout & hapus sesi token
  const logout = async () => {
    await mozaicService.logout();
    setCurrentUser(null);
    localStorage.removeItem('mozaic_current_user');
    localStorage.removeItem('mozaic_auth_token');
  };

  // Perbarui profil pengguna aktif
  const updateProfile = async (newProfileData) => {
    try {
      const updated = await mozaicService.updateProfile(newProfileData);
      setCurrentUser(updated);
      localStorage.setItem('mozaic_current_user', JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('Gagal memperbarui profil:', err);
      throw err;
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    register,
    logout,
    projects,
    setProjects,
    loadProjects,
    loading,
    activePath,
    setActivePath,
    updateProfile,
  };

  return (
    <MozaicContext.Provider value={value}>{children}</MozaicContext.Provider>
  );
}
