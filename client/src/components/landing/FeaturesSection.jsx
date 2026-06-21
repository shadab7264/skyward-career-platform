import { motion } from 'framer-motion';
import { FileText, MessageSquare, Map, Target } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'ATS Resume Analyzer',
    description: 'Get instant feedback on your resume. We check for ATS compatibility, keyword match, and formatting issues with deep learning precision.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    icon: MessageSquare,
    title: 'Interview Prep Hub',
    description: 'Practice with role-specific technical, HR, and scenario questions generated for your exact target position.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    icon: Map,
    title: 'Career Roadmap',
    description: 'Generate a step-by-step learning path with milestones, required skills, and recommended projects.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    icon: Target,
    title: 'Skill Gap Analyzer',
    description: 'Compare your current resume against your target role to identify missing skills and growth opportunities using market data.',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-primary-500 uppercase mb-3">Platform Capabilities</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Everything you need to land your dream job
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Skyward provides a comprehensive suite of tools designed to give you a competitive edge in the modern job market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${feature.colSpan} group`}
              >
                <div className="premium-card h-full p-8 flex flex-col justify-between">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${feature.bg}`}>
                      <Icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Subtle decorative background glow for each card on hover */}
                  <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10 ${feature.bg.replace('/10', '')}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
