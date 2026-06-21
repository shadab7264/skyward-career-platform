import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FileText, MessageSquare, Map, Target, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/useAuth';

// A refined 3D Card component with glassmorphic backing and custom hover glow
function Tool3DCard({ name, path, icon: Icon, color, bg, glow, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtler 3D tilt (max 5 degrees rotation) for a high-end feel
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Animation variants for card entry stagger
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1 
      }
    }
  };

  return (
    <Link to={path} className="block h-full">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        whileHover={{ 
          scale: 1.02, 
          translateZ: 12,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full bg-white/75 dark:bg-slate-900/75 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/50 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 group overflow-hidden"
      >
        {/* Glow backdrop layer */}
        <div className={`absolute -inset-px bg-gradient-to-br ${glow} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity duration-500 rounded-3xl blur-xl`} />

        <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: "translateZ(30px)" }}>
          <div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${bg} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`w-7 h-7 ${color}`} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors tracking-tight">
              {name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
              Unlock smart career tools to optimize, track, and fast-track your progression.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-primary-500 dark:text-primary-400 mt-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span>Launch Tool</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  
  const modules = [
    { 
      name: 'ATS Resume Analyzer', 
      path: '/resume', 
      icon: FileText, 
      color: 'text-blue-500 dark:text-blue-400', 
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      glow: 'from-blue-500 to-indigo-500'
    },
    { 
      name: 'Interview Prep Hub', 
      path: '/interview', 
      icon: MessageSquare, 
      color: 'text-purple-500 dark:text-purple-400', 
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      glow: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Career Roadmap', 
      path: '/roadmap', 
      icon: Map, 
      color: 'text-emerald-500 dark:text-emerald-400', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      glow: 'from-emerald-500 to-teal-500'
    },
    { 
      name: 'Skill Gap Analyzer', 
      path: '/skillgap', 
      icon: Target, 
      color: 'text-rose-500 dark:text-rose-400', 
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      glow: 'from-rose-500 to-red-500'
    },
  ];

  return (
    <div className="space-y-8 relative overflow-hidden min-h-[calc(100vh-8rem)]">
      {/* Rich Background Mesh Gradient Blobs */}
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-primary-500/15 dark:bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary-500/15 dark:bg-secondary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-500/15 dark:bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Hero Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 12 }}
        className="relative bg-gradient-to-r from-primary-600 via-indigo-650 to-secondary-650 rounded-3xl p-8 text-white shadow-xl overflow-hidden border border-white/10"
      >
        {/* Shiny glass overlay highlight */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Career Command Center
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              Welcome back, {user?.user_metadata?.full_name || 'User'}! 👋
            </h1>
            <p className="text-white/80 max-w-2xl text-lg font-light leading-relaxed">
              Explore your personalized workspace to optimize your resume, prepare for interviews, model roadmap strategies, and eliminate skill gaps.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tools Section */}
      <div className="relative z-10">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6">Explore Tools</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((m, i) => (
            <Tool3DCard key={i} index={i} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}
