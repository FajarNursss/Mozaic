import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MozaicProvider } from './context/MozaicContext';
import { useMozaic } from './context/useMozaic';
import { TopNav } from './components/layout/TopNav';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { ExploreProjectsPage } from './pages/ExploreProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { CreateProjectPage } from './pages/CreateProjectPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ApplicantReviewPage } from './pages/ApplicantReviewPage';

function MainLayout() {
  const { currentUser, logout } = useMozaic();
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#000000]">
      {/* 56px Sticky Top Navigation Shell (Ditiadakan di halaman Auth) */}
      {!isAuthPage && (
        <TopNav
          currentUser={currentUser}
          onLogout={logout}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/explore" element={<ExploreProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreateProjectPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route
            path="/workspace/projects/:id/review"
            element={<ApplicantReviewPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer (Ditiadakan di halaman Auth) */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <MozaicProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </MozaicProvider>
  );
}
