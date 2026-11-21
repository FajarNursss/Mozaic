import apiClient from './apiClient';
import { MOCK_USERS, MOCK_PROJECTS, MOCK_APPLICATIONS } from '../data/mockData';
import { DETERMINISTIC_FALLBACK_SCOPE } from '../constants/templates';

// Switch Mock-First (default true jika VITE_USE_MOCK !== 'false')
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

// Penyimpanan lokal state mock di memory session
let localProjects = [...MOCK_PROJECTS];
let localApplications = [...MOCK_APPLICATIONS];
let currentSessionUser = MOCK_USERS[0]; // Default: Raka Pratama

export const mozaicService = {
  // Auth & Profile
  async getCurrentUser() {
    if (USE_MOCK) {
      return currentSessionUser;
    }
    const response = await apiClient.get('/me');
    return response.data;
  },

  async switchPersona(user) {
    if (USE_MOCK) {
      currentSessionUser = user;
      return user;
    }
    const response = await apiClient.post('/auth/login', { userId: user.id });
    return response.data;
  },

  async updateProfile(profileData) {
    if (USE_MOCK) {
      currentSessionUser = {
        ...currentSessionUser,
        ...profileData,
      };
      return currentSessionUser;
    }
    const response = await apiClient.put('/profile', profileData);
    return response.data;
  },

  // Projects
  async getProjects({ query = '', category = '', skills = [] } = {}) {
    if (USE_MOCK) {
      let filtered = [...localProjects];

      if (category && category !== 'Semua') {
        filtered = filtered.filter(
          (p) => p.activity_category.toLowerCase() === category.toLowerCase()
        );
      }

      if (query.trim()) {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.leader_faculty.toLowerCase().includes(q) ||
            p.roles.some((r) => r.role_name.toLowerCase().includes(q))
        );
      }

      if (skills && skills.length > 0) {
        filtered = filtered.filter((p) =>
          p.roles.some((role) =>
            role.required_skills.some((s) => skills.includes(s))
          )
        );
      }

      return filtered;
    }

    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (skills.length) params.append('skill', skills.join(','));

    const response = await apiClient.get(`/projects?${params.toString()}`);
    return response.data;
  },

  async getProjectById(id) {
    if (USE_MOCK) {
      const proj = localProjects.find((p) => p.id === id);
      if (!proj) throw new Error('Proyek tidak ditemukan');
      return proj;
    }
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  async createProject(projectData) {
    if (USE_MOCK) {
      const newProject = {
        id: `proj-${Date.now()}`,
        leader_id: currentSessionUser.id,
        leader_name: currentSessionUser.name,
        leader_faculty: currentSessionUser.faculty,
        leader_avatar_color: currentSessionUser.avatarColor,
        leader_initials: currentSessionUser.initials,
        status: 'OPEN',
        deadline: projectData.deadline || '30 Nov 2026',
        ...projectData,
        roles: (projectData.roles || []).map((r, idx) => ({
          id: `role-${Date.now()}-${idx}`,
          quota: Number(r.quota) || 1,
          filled_count: 0,
          status: 'OPEN',
          ...r,
        })),
      };
      localProjects = [newProject, ...localProjects];
      return newProject;
    }
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  },

  // AI Scoper (DeepSeek with 5000ms Timeout & Deterministic Fallback)
  async scopeProjectWithAI(rawIdea, category = 'Hackathon') {
    if (USE_MOCK) {
      // Simulasi delay 600ms AI generation
      await new Promise((resolve) => setTimeout(resolve, 600));

      return {
        isFallback: false,
        data: {
          title: `Inovasi Cerdas: ${rawIdea.slice(0, 40)}...`,
          category,
          description: rawIdea,
          roles: [
            {
              role_name: 'Lead Developer',
              task_description:
                'Merancang arsitektur sistem inti dan integrasi modul utama.',
              required_skills: ['Frontend', 'Backend'],
              quota: 1,
            },
            {
              role_name: 'Product & UX Designer',
              task_description:
                'Menyusun flow pengalaman pengguna, wireframe, dan prototipe uji coba.',
              required_skills: ['UI/UX Design'],
              quota: 1,
            },
            {
              role_name: 'Research & Pitch Specialist',
              task_description:
                'Analisis kelayakan implementasi, validasi data pengguna, dan presentasi dewan juri.',
              required_skills: ['Research', 'Business/Pitching'],
              quota: 1,
            },
          ],
        },
      };
    }

    try {
      const response = await apiClient.post(
        '/ai/scope',
        { idea: rawIdea, category },
        { timeout: 5000 }
      );
      return { isFallback: false, data: response.data };
    } catch {
      // Deterministic Fallback saat offline atau timeout > 5000ms
      return {
        isFallback: true,
        fallbackNotice: 'FALLBACK TEMPLATE ACTIVE — DETERMINISTIC',
        data: {
          ...DETERMINISTIC_FALLBACK_SCOPE,
          category,
          description: rawIdea || DETERMINISTIC_FALLBACK_SCOPE.description,
        },
      };
    }
  },

  // 1-Click Apply
  async applyToRole({ projectId, roleId, applicantUser }) {
    if (USE_MOCK) {
      const project = localProjects.find((p) => p.id === projectId);
      if (!project) throw new Error('Proyek tidak ditemukan');

      const role = project.roles.find((r) => r.id === roleId);
      if (!role) throw new Error('Peran tidak ditemukan');

      // Cegah lamaran ganda
      const existing = localApplications.find(
        (a) =>
          a.role_id === roleId &&
          a.project_id === projectId &&
          a.applicant.id === applicantUser.id
      );
      if (existing) {
        throw new Error('Anda sudah mengajukan lamaran untuk peran ini.');
      }

      // Hitung skor kecocokan tag deterministik (tag overlap)
      const matchedSkills = role.required_skills.filter((skill) =>
        applicantUser.skills.includes(skill)
      );
      const fitScore =
        role.required_skills.length > 0
          ? Math.round(
              (matchedSkills.length / role.required_skills.length) * 40 + 55
            )
          : 85;

      const newApp = {
        id: `app-${Date.now()}`,
        role_id: roleId,
        project_id: projectId,
        project_title: project.title,
        role_name: role.role_name,
        applicant: applicantUser,
        fit_score: Math.min(fitScore, 98),
        fit_points: matchedSkills.map(
          (s) => `Keahlian terverifikasi di bidang ${s}`
        ),
        gap_points:
          matchedSkills.length < role.required_skills.length
            ? ['Perlu penguatan pada beberapa tool spesifik peran']
            : ['Kesiapan teknis optimal'],
        gap_summary: `Kandidat memiliki kecocokan ${fitScore}% untuk peran ${role.role_name}.`,
        status: 'PENDING',
        created_at: new Date().toISOString(),
      };

      localApplications = [newApp, ...localApplications];
      return newApp;
    }

    const response = await apiClient.post(`/roles/${roleId}/apply`, {
      projectId,
    });
    return response.data;
  },

  // Applications & Quota Lock
  async getApplicationsForProject(projectId) {
    if (USE_MOCK) {
      return localApplications.filter((a) => a.project_id === projectId);
    }
    const response = await apiClient.get(`/projects/${projectId}/applications`);
    return response.data;
  },

  async getMyApplications(userId) {
    if (USE_MOCK) {
      return localApplications.filter((a) => a.applicant.id === userId);
    }
    const response = await apiClient.get('/me/applications');
    return response.data;
  },

  async decideApplication(appId, decision) {
    // decision: 'ACCEPTED' | 'REJECTED'
    if (USE_MOCK) {
      const app = localApplications.find((a) => a.id === appId);
      if (!app) throw new Error('Lamaran tidak ditemukan');

      app.status = decision;

      if (decision === 'ACCEPTED') {
        const project = localProjects.find((p) => p.id === app.project_id);
        if (project) {
          const role = project.roles.find((r) => r.id === app.role_id);
          if (role) {
            role.filled_count = (role.filled_count || 0) + 1;
            if (role.filled_count >= role.quota) {
              role.status = 'FILLED';
            }
          }
        }
      }

      return app;
    }

    const response = await apiClient.patch(`/applications/${appId}/decision`, {
      status: decision,
    });
    return response.data;
  },
};
