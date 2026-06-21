import { useLocation } from 'react-router-dom';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/useTheme';
import { useAuth } from '../../context/useAuth';
import { NAV_ITEMS } from '../../utils/constants';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname;
  const currentNav = NAV_ITEMS.find(item => item.path === currentPath) || { label: 'Admin Dashboard' };

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
        {currentNav.label}
      </h1>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 rounded-full text-sm transition-all focus:ring-2 focus:ring-primary-500/20 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-6">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          <div className="flex items-center gap-3 ml-2 cursor-pointer">
            <img
              src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}&background=0A66C2&color=fff`}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-slate-200 dark:border-slate-700 object-cover"
            />
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white leading-tight">
                {user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
