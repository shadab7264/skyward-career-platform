import { motion } from 'framer-motion';

const stats = [
  { value: '50K+', label: 'Active Users', suffix: 'Professionals' },
  { value: '100K+', label: 'Resumes Analyzed', suffix: 'Processed' },
  { value: '25K+', label: 'Career Roadmaps', suffix: 'Generated' },
  { value: '98%', label: 'Success Rate', suffix: 'Interview Calls' },
];

export default function StatsSection() {
  return (
    <section id="outcomes" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.03)_0%,transparent_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_100%)] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="text-center px-4 relative group"
            >
              {/* Divider line except for the last item on LG */}
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-200 dark:bg-slate-800" />
              
              <div className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-semibold text-primary-500 tracking-wide uppercase mb-1">
                {stat.label}
              </div>
              <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
