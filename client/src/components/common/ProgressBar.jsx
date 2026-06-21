import { motion } from 'framer-motion';

export default function ProgressBar({
  progress = 0,
  height = 'h-2',
  color = 'bg-primary-500',
  trackColor = 'bg-slate-100 dark:bg-slate-800',
  showLabel = false,
  animated = true,
  className = '',
}) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm font-medium mb-1">
          <span className="text-slate-700 dark:text-slate-300">Progress</span>
          <span className="text-slate-900 dark:text-white">{Math.round(safeProgress)}%</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full ${trackColor} ${height}`}>
        <motion.div
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${color} relative overflow-hidden`}
        >
          {animated && (
            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
