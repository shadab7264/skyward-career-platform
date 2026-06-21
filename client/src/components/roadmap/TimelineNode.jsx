import { motion } from 'framer-motion';
import { BookOpen, Code, Award, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const typeIcons = {
  learning: BookOpen,
  project: Code,
  certification: Award,
  milestone: CheckCircle
};

const typeColors = {
  learning: 'bg-blue-500',
  project: 'bg-purple-500',
  certification: 'bg-amber-500',
  milestone: 'bg-emerald-500'
};

const typeBorderColors = {
  learning: 'border-l-blue-500',
  project: 'border-l-purple-500',
  certification: 'border-l-amber-500',
  milestone: 'border-l-emerald-500'
};

export default function TimelineNode({ item, isLast }) {
  const Icon = typeIcons[item.type] || BookOpen;

  return (
    <div className="relative pl-12 md:pl-0">
      {/* Mobile timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 md:hidden z-0" />
      )}
      
      {/* Desktop timeline layout */}
      <div className="flex flex-col md:flex-row items-start relative pb-10">
        
        {/* Desktop left column (Timeline Month) */}
        <div className="hidden md:block w-40 shrink-0 text-right pt-5 pr-8">
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {item.timeframe}
          </span>
        </div>

        {/* Timeline Center Node */}
        <div className="absolute left-0 md:left-40 md:-ml-4 top-4 z-10 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg ${typeColors[item.type]} relative z-10`}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
          {/* Desktop timeline line */}
          {!isLast && (
            <div className="hidden md:block w-0.5 h-full bg-slate-200 dark:bg-slate-800 absolute top-8 bottom-[-2.5rem]" />
          )}
        </div>

        {/* Content Card */}
        <div className="flex-1 w-full md:pl-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card hover={false} className={`border-l-4 ${typeBorderColors[item.type] || 'border-l-slate-300'} relative overflow-hidden group transition-all`}>
              <div className="md:hidden mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {item.timeframe}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {item.description}
              </p>

              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {item.skills.map((skill, i) => (
                    <Badge key={i} size="xs" variant="default">{skill}</Badge>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
