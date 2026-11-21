import { useState } from 'react';
import { MozaicContext } from './mozaicContextDef';
import { MOCK_USERS, MOCK_PROJECTS } from '../data/mockData';
import { mozaicService } from '../services/mozaicService';

export function MozaicProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]);
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [activePath, setActivePath] = useState('/');

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await mozaicService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Gagal mengambil data proyek:', err);
    } finally {
      setLoading(false);
    }
  };

  const switchPersona = async (persona) => {
    try {
      await mozaicService.switchPersona(persona);
      setCurrentUser(persona);
    } catch (err) {
      console.error('Gagal mengganti persona:', err);
    }
  };

  const updateProfile = async (newProfileData) => {
    try {
      const updated = await mozaicService.updateProfile(newProfileData);
      setCurrentUser(updated);
      return updated;
    } catch (err) {
      console.error('Gagal memperbarui profil:', err);
      throw err;
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    switchPersona,
    personas: MOCK_USERS,
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
