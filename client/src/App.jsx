import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';

import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import CareerRoadmapPage from './pages/CareerRoadmapPage';
import SkillGapPage from './pages/SkillGapPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/resume" element={<ResumeAnalyzerPage />} />
              <Route path="/interview" element={<InterviewPrepPage />} />
              <Route path="/roadmap" element={<CareerRoadmapPage />} />
              <Route path="/skillgap" element={<SkillGapPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
