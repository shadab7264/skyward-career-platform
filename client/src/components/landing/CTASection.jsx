import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.28),transparent_40%),linear-gradient(135deg,#06142c,#111827_54%,#031827)] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px] opacity-30 -z-10" />
      
      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
        >
          Ready to take control of your career?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
        >
          Join thousands of professionals who have used Skyward to land their dream jobs. Get started for free today.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/register">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="mt-4 text-cyan-100/90 text-sm font-medium">No credit card required. Your workspace stays private.</p>
        </motion.div>
      </div>
    </section>
  );
}
