export const APP_NAME = 'Skyward';
export const APP_TAGLINE = 'Career Intelligence Platform';

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Resume Analyzer', path: '/resume', icon: 'FileText' },
  { label: 'Interview Prep', path: '/interview', icon: 'MessageSquare' },
  { label: 'Career Roadmap', path: '/roadmap', icon: 'Map' },
  { label: 'Skill Gap', path: '/skillgap', icon: 'Target' },
];

export const DIFFICULTY_LEVELS = {
  easy: { label: 'Easy', color: '#10b981', bg: '#dcfce7' },
  medium: { label: 'Medium', color: '#f59e0b', bg: '#fef3c7' },
  hard: { label: 'Hard', color: '#ef4444', bg: '#fee2e2' },
};

export const SCORE_COLORS = {
  excellent: '#10b981',
  good: '#3b82f6',
  average: '#f59e0b',
  poor: '#ef4444',
};

export function getScoreColor(score) {
  if (score >= 80) return SCORE_COLORS.excellent;
  if (score >= 60) return SCORE_COLORS.good;
  if (score >= 40) return SCORE_COLORS.average;
  return SCORE_COLORS.poor;
}

export function getScoreLabel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Average';
  return 'Needs Improvement';
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
