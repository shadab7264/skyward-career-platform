import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function QuestionCard({ question, index, difficulty, type, answerGuidance }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPracticed, setIsPracticed] = useState(false);

  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger'
  };

  const typeLabels = {
    technical: 'Technical',
    hr: 'HR / Behavioral',
    scenario: 'Scenario'
  };

  return (
    <Card className={`transition-all duration-300 ${isPracticed ? 'border-emerald-500/50 dark:border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`} padding="p-0">
      <div 
        className="p-6 cursor-pointer flex gap-4 items-start"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 mt-1">
          {index + 1}
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={difficultyColors[difficulty]}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Badge>
            <Badge variant="primary">{typeLabels[type]}</Badge>
          </div>
          
          <h3 className={`text-lg font-medium pr-8 ${isPracticed ? 'text-slate-600 dark:text-slate-400 line-through decoration-slate-300 dark:decoration-slate-600' : 'text-slate-900 dark:text-white'}`}>
            {question}
          </h3>
        </div>

        <div className="flex-shrink-0 flex items-center gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsPracticed(!isPracticed);
            }}
            className={`p-2 rounded-full transition-colors ${isPracticed ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <CheckCircle2 className="w-6 h-6" />
          </button>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <div className="mt-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
                  <Lightbulb className="w-4 h-4" />
                  Answer Strategy
                </h4>
                <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                  <ul className="space-y-2 marker:text-primary-500">
                    {answerGuidance.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
