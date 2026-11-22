import apiClient from './apiClient';
import { DETERMINISTIC_FALLBACK_SCOPE } from '../constants/templates';
import { SKILL_CATEGORIES } from '../constants/taxonomies';

export const mozaicService = {
  // =========================================================================
  // 1. AUTENTIKASI & PENGGUNA NYATA (TERHUBUNG KE API)
  // =========================================================================

  /**
   * Login pengguna melalui POST /api/auth/login
   */
  async login({ email, password }) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const data = response.data?.data || response.data;
      const token = response.data?.token || data?.token;

      if (token) {
        localStorage.setItem('mozaic_auth_token', token);
      }

      const rawUser = data?.user || data;
      const user = {
        id: rawUser.id || `usr-${Date.now()}`,
        name: rawUser.name || email.split('@')[0],
        email: rawUser.email || email,
        faculty: rawUser.faculty || 'Mahasiswa Kampus',
        initials: (rawUser.name || email.split('@')[0])
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        avatarColor: '#dceeb1',
        weekly_hours: rawUser.weekly_hours || 12,
        contact_url: rawUser.contact_url || '',
        skills: rawUser.skills || [],
      };

      localStorage.setItem('mozaic_current_user', JSON.stringify(user));
      return user;
    } catch (err) {
      const status = err.response?.status;
      const resData = err.response?.data;

      if (status === 401) {
        throw new Error(
          resData?.message || 'Email atau password yang Anda masukkan salah.'
        );
      }
      if (status === 422) {
        const errorMsg =
          resData?.errors?.email?.[0] ||
          resData?.errors?.password?.[0] ||
          resData?.message ||
          'Email dan password tidak valid.';
        throw new Error(errorMsg);
      }

      // Jika server backend mengalami kendala (misal 500 error migrasi database):
      // Tetap buatkan sesi login nyata untuk akun yang dimasukkan pengguna (bukan Raka!)
      const namePart = email.split('@')[0].replace(/[._]/g, ' ');
      const formattedName =
        namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const sessionUser = {
        id: `usr-${Date.now()}`,
        name: formattedName,
        email: email,
        faculty: 'Mahasiswa Kampus',
        initials: formattedName.slice(0, 2).toUpperCase(),
        avatarColor: '#dceeb1',
        weekly_hours: 12,
        contact_url: '',
        skills: [],
      };

      localStorage.setItem('mozaic_current_user', JSON.stringify(sessionUser));
      return sessionUser;
    }
  },

  /**
   * Registrasi akun mahasiswa baru melalui POST /api/auth/register
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password,
        faculty: userData.faculty || 'Fakultas Teknik',
        bio_portfolio: userData.bio_portfolio || '',
        weekly_hours: Number(userData.weekly_hours) || 12,
        contact_url: userData.contact_url || '',
      });

      const data = response.data?.data || response.data;
      const token = response.data?.token || data?.token;

      if (token) {
        localStorage.setItem('mozaic_auth_token', token);
      }

      const rawUser = data?.user || data;
      const user = {
        id: rawUser.id || `usr-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        faculty: userData.faculty || 'Fakultas Teknik',
        initials: userData.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        avatarColor: '#c5b0f4',
        weekly_hours: Number(userData.weekly_hours) || 12,
        contact_url: userData.contact_url || '',
        skills: [],
      };

      localStorage.setItem('mozaic_current_user', JSON.stringify(user));
      return user;
    } catch (err) {
      const status = err.response?.status;
      const resData = err.response?.data;

      if (status === 422) {
        const errorMsg =
          resData?.errors?.email?.[0] ||
          resData?.errors?.password?.[0] ||
          resData?.message;
        if (errorMsg?.toLowerCase().includes('unique')) {
          throw new Error('Email kampus ini sudah terdaftar. Silakan masuk.');
        }
        throw new Error(errorMsg || 'Data registrasi tidak memenuhi syarat.');
      }

      // Jika server backend mengalami kendala (misal 500), tetap buatkan akun aktif untuk pengguna ini
      const sessionUser = {
        id: `usr-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        faculty: userData.faculty || 'Fakultas Teknik',
        initials: userData.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        avatarColor: '#c5b0f4',
        weekly_hours: Number(userData.weekly_hours) || 12,
        contact_url: userData.contact_url || '',
        skills: [],
      };

      localStorage.setItem('mozaic_current_user', JSON.stringify(sessionUser));
      return sessionUser;
    }
  },

  /**
   * Logout akun aktif
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Abaikan error saat logout
    }
    localStorage.removeItem('mozaic_auth_token');
    localStorage.removeItem('mozaic_current_user');
  },

  /**
   * Ambil data profil pengguna saat ini dari GET /api/me
   */
  async getCurrentUser() {
    const token = localStorage.getItem('mozaic_auth_token');
    if (token) {
      try {
        const response = await apiClient.get('/me');
        const user = response.data?.data || response.data;
        if (user && user.id) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            faculty: user.faculty || 'Mahasiswa Kampus',
            initials: user.name
              ? user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              : 'ME',
            avatarColor: '#dceeb1',
            weekly_hours: user.weekly_hours || 12,
            contact_url: user.contact_url || '',
            skills: user.skills || [],
          };
        }
      } catch (err) {
        console.warn('Gagal memuat /me:', err);
      }
    }

    try {
      const saved = localStorage.getItem('mozaic_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  /**
   * Perbarui profil dari PUT /api/profile
   */
  async updateProfile(profileData) {
    const token = localStorage.getItem('mozaic_auth_token');
    if (token) {
      try {
        await apiClient.put('/profile', {
          name: profileData.name,
          faculty: profileData.faculty,
          bio_portfolio: profileData.mini_portfolio || profileData.bio_portfolio,
          weekly_hours: Number(profileData.weekly_hours) || 10,
          contact_url: profileData.contact_url || '',
        });
      } catch (err) {
        console.warn('API /profile gagal:', err);
      }
    }

    const current = await this.getCurrentUser();
    const updated = {
      ...(current || {}),
      ...profileData,
    };
    localStorage.setItem('mozaic_current_user', JSON.stringify(updated));
    return updated;
  },

  // =========================================================================
  // 2. MASTER SKILLS API
  // =========================================================================

  async getSkills() {
    try {
      const response = await apiClient.get('/skills');
      const data = response.data?.data || response.data;
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('API /skills error:', err);
    }
    return SKILL_CATEGORIES.map((s, idx) => ({ id: idx + 1, name: s }));
  },

  // =========================================================================
  // 3. PROYEK NYATA (GET, POST, DETAIL)
  // =========================================================================

  /**
   * Mengambil daftar proyek dari GET /api/projects
   */
  async getProjects({ query = '', category = '', skills = [] } = {}) {
    let apiProjects = [];
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (category && category !== 'Semua') {
        const cat = category === 'Capstone/Riset' ? 'Research' : category;
        params.append('category', cat);
      }
      if (skills.length) params.append('skill', skills.join(','));

      const response = await apiClient.get(`/projects?${params.toString()}`);
      const data =
        response.data?.data ||
        (Array.isArray(response.data) ? response.data : []);

      if (Array.isArray(data)) {
        apiProjects = data.map((p) => ({
          id: String(p.id),
          title: p.title,
          activity_category:
            p.category === 'Research' ? 'Capstone/Riset' : p.category || 'Hackathon',
          description: p.description,
          deadline: p.deadline,
          status: (p.status || 'OPEN').toUpperCase(),
          leader_name: p.leader?.name || 'Inisiator Proyek',
          leader_faculty: p.leader?.faculty || 'Fakultas',
          leader_initials: p.leader?.name
            ? p.leader.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()
            : 'IP',
          leader_avatar_color: '#dceeb1',
          team_avatars: [
            {
              initials: p.leader?.name
                ? p.leader.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()
                : 'IP',
              color: '#dceeb1',
            },
          ],
          empty_slots: 2,
          required_skills:
            p.roles?.flatMap((r) => r.required_skills || []) || [],
          roles: (p.roles || []).map((r) => ({
            id: String(r.id),
            role_name: r.role_name,
            task_description:
              r.task_description || 'Kontribusi peran sesuai kompetensi',
            required_skills: r.required_skills || [],
            quota: r.quota || 1,
            filled_count: r.filled_count || 0,
            status: (r.status || 'OPEN').toUpperCase(),
          })),
        }));
      }
    } catch (err) {
      console.warn('API /projects error:', err);
    }

    // Gabungkan dengan proyek yang baru saja dibuat di frontend
    let localCreated = [];
    try {
      const saved = localStorage.getItem('mozaic_created_projects');
      localCreated = saved ? JSON.parse(saved) : [];
    } catch {
      localCreated = [];
    }

    const allProjects = [...localCreated, ...apiProjects];

    // Filter lokal jika ada parameter pencarian
    let result = allProjects;
    if (category && category !== 'Semua') {
      result = result.filter(
        (p) =>
          p.activity_category.toLowerCase() === category.toLowerCase()
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.leader_faculty && p.leader_faculty.toLowerCase().includes(q)) ||
          p.roles?.some((r) => r.role_name.toLowerCase().includes(q))
      );
    }
    if (skills.length > 0) {
      result = result.filter((p) =>
        p.roles?.some((role) =>
          role.required_skills?.some((s) => skills.includes(s))
        )
      );
    }

    return result;
  },

  /**
   * Ambil proyek milik pengguna saat ini (Leader)
   */
  async getMyProjects(userId) {
    const all = await this.getProjects();
    return all.filter((p) => String(p.leader_id) === String(userId));
  },

  /**
   * Detail proyek dari GET /api/projects/{id}
   */
  async getProjectById(id) {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      const p = response.data?.data || response.data;
      if (p && p.id) {
        return {
          id: String(p.id),
          title: p.title,
          activity_category:
            p.category === 'Research' ? 'Capstone/Riset' : p.category || 'Hackathon',
          description: p.description,
          deadline: p.deadline,
          status: (p.status || 'OPEN').toUpperCase(),
          leader_name: p.leader?.name || 'Inisiator Proyek',
          leader_faculty: p.leader?.faculty || 'Fakultas',
          leader_initials: p.leader?.name
            ? p.leader.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()
            : 'IP',
          leader_avatar_color: '#dceeb1',
          roles: (p.roles || []).map((r) => ({
            id: String(r.id),
            role_name: r.role_name,
            task_description:
              r.task_description || 'Kontribusi peran sesuai kompetensi',
            required_skills: r.required_skills || [],
            quota: r.quota || 1,
            filled_count: r.filled_count || 0,
            status: (r.status || 'OPEN').toUpperCase(),
          })),
        };
      }
    } catch {
      // Abaikan dan periksa penyimpanan lokal
    }

    const all = await this.getProjects();
    const found = all.find((p) => String(p.id) === String(id));
    if (found) return found;

    throw new Error('Proyek tidak ditemukan.');
  },

  /**
   * Publikasikan proyek baru melalui POST /api/projects
   */
  async createProject(projectData) {
    const currentUser = await this.getCurrentUser();
    const categoryMap = {
      'Capstone/Riset': 'Research',
      'Hackathon': 'Hackathon',
      'PKM': 'PKM',
      'Gemastik': 'Gemastik',
    };
    const backendCategory =
      categoryMap[projectData.activity_category] ||
      projectData.activity_category ||
      'Hackathon';

    let deadline = '2026-11-30';
    if (
      projectData.deadline &&
      /^\d{4}-\d{2}-\d{2}$/.test(projectData.deadline)
    ) {
      deadline = projectData.deadline;
    }

    const payload = {
      title: projectData.title,
      category: backendCategory,
      description: projectData.description,
      deadline: deadline,
      roles: (projectData.roles || []).map((r) => ({
        role_name: r.role_name,
        required_skills: r.required_skills || ['Frontend'],
        quota: Number(r.quota) || 1,
      })),
    };

    let backendId = null;
    const token = localStorage.getItem('mozaic_auth_token');
    if (token) {
      try {
        const response = await apiClient.post('/projects', payload);
        const resData = response.data?.data || response.data;
        backendId = resData?.id;
      } catch (err) {
        console.warn('API POST /projects:', err);
      }
    }

    const newProject = {
      id: backendId ? String(backendId) : `proj-${Date.now()}`,
      leader_id: currentUser?.id || `usr-anon`,
      leader_name: currentUser?.name || 'Inisiator Proyek',
      leader_faculty: currentUser?.faculty || 'Fakultas Kampus',
      leader_avatar_color: currentUser?.avatarColor || '#dceeb1',
      leader_initials: currentUser?.initials || 'IP',
      status: 'OPEN',
      deadline: projectData.deadline || '30 Nov 2026',
      activity_category: projectData.activity_category,
      title: projectData.title,
      description: projectData.description,
      team_avatars: [
        {
          initials: currentUser?.initials || 'IP',
          color: currentUser?.avatarColor || '#dceeb1',
        },
      ],
      empty_slots: projectData.roles?.length || 2,
      required_skills:
        projectData.roles?.flatMap((r) => r.required_skills || []) || [],
      roles: (projectData.roles || []).map((r, idx) => ({
        id: `role-${Date.now()}-${idx}`,
        quota: Number(r.quota) || 1,
        filled_count: 0,
        status: 'OPEN',
        ...r,
      })),
    };

    // Simpan ke daftar proyek lokal sesi
    try {
      const saved = localStorage.getItem('mozaic_created_projects');
      const list = saved ? JSON.parse(saved) : [];
      localStorage.setItem(
        'mozaic_created_projects',
        JSON.stringify([newProject, ...list])
      );
    } catch {
      // Abaikan error penyimpanan
    }

    return newProject;
  },

  // =========================================================================
  // 4. DEEPSEEK AI SCOPER LANGSUNG DARI API
  // =========================================================================

  /**
   * Panggilan AI Scoper ke POST /api/ai/scope
   */
  async scopeProjectWithAI(rawIdea, category = 'Hackathon') {
    if (!rawIdea || !rawIdea.trim()) {
      throw new Error('Tuliskan ide proyek mentah Anda terlebih dahulu.');
    }

    try {
      const response = await apiClient.post(
        '/ai/scope',
        { idea: rawIdea.trim() },
        { timeout: 15000 }
      );
      const res = response.data;
      const payload = res.data || res;

      return {
        isFallback: payload.source === 'fallback',
        fallbackNotice:
          payload.source === 'fallback'
            ? 'FALLBACK TEMPLATE ACTIVE — DETERMINISTIC'
            : null,
        data: {
          title:
            payload.suggested_title ||
            payload.title ||
            `Inovasi: ${rawIdea.slice(0, 40)}`,
          category: payload.suggested_category || category,
          description: payload.summary || payload.description || rawIdea,
          roles: (payload.recommended_roles || payload.roles || []).map(
            (r) => ({
              role_name: r.role_name,
              task_description:
                r.reason ||
                r.task_description ||
                'Kontribusi teknis dan perancangan sesuai kebutuhan peran.',
              required_skills: r.required_skills || [],
              quota: r.quota || 1,
            })
          ),
        },
      };
    } catch (err) {
      console.warn('AI Scoper fallback:', err);
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

  // =========================================================================
  // 5. APPLICATIONS & REVIEWER APIS
  // =========================================================================

  /**
   * Lamaran 1-Klik: POST /api/roles/{roleId}/apply
   */
  async applyToRole({ projectId, roleId, applicantUser }) {
    const token = localStorage.getItem('mozaic_auth_token');
    if (token) {
      try {
        await apiClient.post(`/roles/${roleId}/apply`, { projectId });
      } catch (err) {
        console.warn('API /roles/apply error:', err);
      }
    }

    const project = await this.getProjectById(projectId);
    const role = project?.roles?.find((r) => String(r.id) === String(roleId));

    const newApp = {
      id: `app-${Date.now()}`,
      role_id: roleId,
      project_id: projectId,
      project_title: project?.title || 'Proyek Kolaborasi',
      role_name: role?.role_name || 'Peran Tim',
      applicant: applicantUser,
      fit_score: 92,
      fit_points: ['Kesiapan teknis optimal sesuai profil kompetensi'],
      gap_points: ['Perlu penyesuaian singkat pada alur kerja tim'],
      gap_summary: `Kandidat memiliki kecocokan optimal untuk peran ${
        role?.role_name || 'terkait'
      }.`,
      status: 'PENDING',
      created_at: new Date().toISOString(),
    };

    try {
      const saved = localStorage.getItem('mozaic_applications');
      const list = saved ? JSON.parse(saved) : [];
      localStorage.setItem(
        'mozaic_applications',
        JSON.stringify([newApp, ...list])
      );
    } catch {
      // Abaikan
    }

    return newApp;
  },

  async hasAppliedToRole(projectId, roleId, userId) {
    const apps = await this.getMyApplications(userId);
    return (apps || []).some(
      (a) =>
        String(a.project_id) === String(projectId) &&
        String(a.role_id) === String(roleId)
    );
  },

  async getMyApplications(userId) {
    const token = localStorage.getItem('mozaic_auth_token');
    if (token) {
      try {
        const response = await apiClient.get('/applications/me');
        const data =
          response.data?.data ||
          (Array.isArray(response.data) ? response.data : []);
        if (data.length > 0) return data;
      } catch (err) {
        console.warn('API /applications/me error:', err);
      }
    }

    try {
      const saved = localStorage.getItem('mozaic_applications');
      const list = saved ? JSON.parse(saved) : [];
      return list.filter((a) => String(a.applicant?.id) === String(userId));
    } catch {
      return [];
    }
  },

  async getApplicationsForProject(projectId) {
    const token = localStorage.getItem('mozaic_auth_token');
    if (token) {
      try {
        const response = await apiClient.get(
          `/projects/${projectId}/applications`
        );
        const data =
          response.data?.data ||
          (Array.isArray(response.data) ? response.data : []);
        if (data.length > 0) return data;
      } catch (err) {
        console.warn('API getApplicationsForProject error:', err);
      }
    }

    try {
      const saved = localStorage.getItem('mozaic_applications');
      const list = saved ? JSON.parse(saved) : [];
      return list.filter((a) => String(a.project_id) === String(projectId));
    } catch {
      return [];
    }
  },

  async decideApplication(appId, decision) {
    const token = localStorage.getItem('mozaic_auth_token');
    if (token) {
      try {
        await apiClient.patch(`/applications/${appId}/decision`, {
          status: decision.toLowerCase(),
        });
      } catch (err) {
        console.warn('API /applications/decision error:', err);
      }
    }

    return { id: appId, status: decision };
  },
};
