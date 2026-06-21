import { motion } from 'framer-motion';
import Card from '../common/Card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Software Engineer at TechCorp',
    image: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0D8ABC&color=fff',
    content: 'Skyward completely changed how I approached my job search. The ATS resume analyzer helped me get past the initial screening, and the interview prep hub was spot on.',
  },
  {
    name: 'David Chen',
    role: 'Product Manager',
    image: 'https://ui-avatars.com/api/?name=David+Chen&background=10B981&color=fff',
    content: 'The career roadmap generator gave me a clear path to transition from engineering to product. It outlined exactly what skills I needed and how long it would take.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Recent Graduate',
    image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=F59E0B&color=fff',
    content: 'As a new grad, the skill gap analyzer gave me a practical plan. I knew exactly which projects and keywords would make my profile stronger.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Loved by ambitious professionals
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            See how Skyward is helping people land their dream roles and navigate their careers with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-8 flex-grow leading-relaxed">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
