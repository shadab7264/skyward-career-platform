import { motion } from 'framer-motion';
import Card from '../common/Card';
import { getScoreColor, getScoreLabel } from '../../utils/constants';

export default function ScoreCard({ title, score, icon: Icon, description }) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  
  // Circumference for SVG circle (r=36) = 2 * Math.PI * 36 ≈ 226
  const circumference = 226;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="flex items-center gap-6" hover={false}>
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
          <circle
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="drop-shadow-sm"
            strokeWidth="8"
            strokeLinecap="round"
            stroke={color}
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
            {score}
          </span>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          {Icon && <Icon className="w-5 h-5 text-slate-400" />}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-sm font-medium mb-1" style={{ color }}>
          {label} Match
        </p>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}
