import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, FileSearch, Lock, Map, MessageSquare, Radar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import BrandLogo from '../common/BrandLogo';
import { APP_NAME } from '../../utils/constants';

const intelligenceCards = [
  { icon: FileSearch, label: 'Resume intelligence', value: 'ATS 92' },
  { icon: MessageSquare, label: 'Interview engine', value: '10 Qs' },
  { icon: Map, label: 'Roadmap builder', value: '6 mo' },
  { icon: Target, label: 'Skill gap scan', value: '84%' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[94vh] overflow-hidden bg-[#070b14] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(14,165,233,0.18),transparent_28%,rgba(168,85,247,0.16)_58%,rgba(16,185,129,0.14))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_86%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />

      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          >
            <BrandLogo size="md" className="shadow-2xl shadow-cyan-500/20" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-2xl font-black tracking-tight animate-text-glow-flow select-none cursor-default"
          >
            {APP_NAME}
          </motion.span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          {[['Platform', '#features'], ['Outcomes', '#outcomes'], ['FAQ', '#faq']].map(([label, href]) => (
            <motion.a
              key={label}
              href={href}
              className="relative py-1 hover:text-white transition-colors duration-200 group text-white/80"
              whileHover={{ y: -1 }}
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-primary-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ x: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link to="/login" className="hidden text-sm font-semibold text-white/75 hover:text-white sm:block">
              Sign in
            </Link>
          </motion.div>
          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <Button size="sm" variant="secondary" className="border-cyan-300/40 bg-cyan-300 text-slate-950 shadow-cyan-500/20 hover:bg-cyan-200">
                Get Access
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.header>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:pb-28 lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: [
                "0 0 0 0 rgba(34, 211, 238, 0)",
                "0 0 16px 2px rgba(34, 211, 238, 0.3)",
                "0 0 0 0 rgba(34, 211, 238, 0)"
              ]
            }}
            transition={{
              y: { duration: 0.5 },
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100 backdrop-blur"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.25, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <BrainCircuit className="h-4 w-4 text-cyan-400" />
            </motion.div>
            <span>AI-Driven Career Command Center</span>
          </motion.div>

          <div className="overflow-hidden py-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ 
                duration: 0.9, 
                ease: [0.16, 1, 0.3, 1], // Expo-out curve
                delay: 0.05
              }}
              className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl animate-text-glow-flow cursor-default select-none pb-2"
            >
              Build the career strategy your next role cannot ignore.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
          >
            Analyze your resume, generate role-specific interview prep, map a practical growth path,
            and discover skill gaps inside one private Supabase-backed workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link to="/register">
              <Button size="xl" iconRight={ArrowRight} className="w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 sm:w-auto">
                Start Building
              </Button>
            </Link>
            <Link to="/login">
              <Button size="xl" variant="outline" icon={Lock} className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto">
                Login to Workspace
              </Button>
            </Link>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {intelligenceCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 + index * 0.06 }}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                >
                  <Icon className="mb-3 h-5 w-5 text-cyan-200" />
                  <div className="text-xl font-black">{item.value}</div>
                  <div className="mt-1 text-xs text-slate-400">{item.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
          className="career-scene relative min-h-[520px] lg:min-h-[640px]"
        >
          <div className="scene-floor" />
          <div className="scene-ring scene-ring-one" />
          <div className="scene-ring scene-ring-two" />

          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="career-core"
          >
            <div className="core-face core-front">ATS</div>
            <div className="core-face core-back">GAP</div>
            <div className="core-face core-right">AI</div>
            <div className="core-face core-left">MAP</div>
            <div className="core-face core-top">CV</div>
            <div className="core-face core-bottom">Q&A</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -16, 0], rotateZ: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="holo-panel panel-left"
          >
            <div className="flex items-center gap-2 text-cyan-200">
              <Radar className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Readiness</span>
            </div>
            <div className="mt-5 h-28 rounded-lg bg-[conic-gradient(from_180deg,#22d3ee,#8b5cf6,#10b981,#22d3ee)] p-[1px]">
              <div className="grid h-full place-items-center rounded-lg bg-slate-950/90 text-4xl font-black">91%</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0], rotateZ: [2, -1, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="holo-panel panel-right"
          >
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">Roadmap</div>
            <div className="mt-5 space-y-3">
              {['Portfolio proof', 'System design', 'Mock interview'].map((step) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-300" />
                  <div className="h-2 flex-1 rounded-full bg-white/15">
                    <div className="h-full w-2/3 rounded-full bg-emerald-300" />
                  </div>
                  <span className="w-24 text-xs text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
            className="holo-panel panel-bottom"
          >
            <div className="grid grid-cols-3 gap-3">
              {['Resume', 'Interview', 'Skills'].map((label, index) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-black text-white">{index === 0 ? 'A+' : index === 1 ? '10' : '6'}</div>
                  <div className="text-xs text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
