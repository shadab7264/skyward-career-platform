import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-[0_0_20px_rgba(10,102,194,0.3)] hover:shadow-[0_0_25px_rgba(10,102,194,0.5)] border border-primary-400/20',
  secondary: 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm',
  premium: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:shadow-2xl border border-slate-700 dark:border-slate-200 relative overflow-hidden group',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-500/10',
  ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs tracking-wide',
  md: 'px-5 py-2.5 text-sm font-medium',
  lg: 'px-6 py-3 text-base font-medium',
  xl: 'px-8 py-4 text-base font-semibold',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl
        transition-all duration-300 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Premium glow effect on hover */}
      {variant === 'premium' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      )}
      
      {loading ? (
        <svg className="animate-spin h-4 w-4 relative z-10" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4 relative z-10" />
      ) : null}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {IconRight && <IconRight className="w-4 h-4 relative z-10" />}
    </motion.button>
  );
}
