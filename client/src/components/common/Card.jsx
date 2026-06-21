import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  glass = false,
  hover = true,
  padding = 'p-6',
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={`
        rounded-2xl ${padding}
        ${glass
          ? 'glass-card'
          : 'bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-lg'
        }
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
