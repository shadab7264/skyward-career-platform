import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Map, 
  Target,
  Home,
  LogOut
} from 'lucide-react';
import { NAV_ITEMS, APP_NAME } from '../../utils/constants';
import { useAuth } from '../../context/useAuth';
import BrandLogo from '../common/BrandLogo';

const iconMap = {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Map,
  Target,
};

export default function Sidebar() {
  const { user, signOut } = useAuth();

  return (
    <aside className="w-64 h-screen bg-black border-r border-zinc-900 flex flex-col fixed left-0 top-0 text-zinc-400 shadow-2xl z-40">
      <div className="h-20 flex items-center px-6 border-b border-zinc-900/60 bg-gradient-to-b from-zinc-950/40 to-black">
        <div className="flex items-center gap-3.5 w-full overflow-hidden">
          <div className="relative shrink-0">
            <img
              src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}&background=0A66C2&color=fff`}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-primary-500/30 object-cover ring-2 ring-primary-500/10 hover:ring-primary-500/30 transition-all duration-300"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-pink-400 to-accent-400 truncate tracking-wide" title={user?.user_metadata?.full_name || 'User'}>
              {user?.user_metadata?.full_name || 'User'}
            </span>
            <span className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase mt-0.5">
              Active Member
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-primary-500/10 text-primary-400' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-150'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-7 bg-primary-500 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-900 space-y-1">
        <Link 
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-zinc-450 hover:bg-zinc-900 hover:text-zinc-150 transition-colors"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
        <button 
          onClick={async () => {
            try {
              await signOut();
            } catch (error) {
              console.error(error);
            } finally {
              window.location.href = '/login';
            }
          }}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
