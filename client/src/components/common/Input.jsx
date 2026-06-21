export default function Input({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-slate-400" />
          </div>
        )}
        <input
          className={`
            w-full rounded-xl border bg-white dark:bg-slate-800/50
            ${error
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-primary-500/20'
            }
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
            text-sm text-slate-900 dark:text-white
            placeholder:text-slate-400
            focus:outline-none focus:ring-4
            transition-all duration-200
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function TextArea({
  label,
  error,
  className = '',
  rows = 4,
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`
          w-full rounded-xl border bg-white dark:bg-slate-800/50
          ${error
            ? 'border-red-500 focus:ring-red-500/20'
            : 'border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-primary-500/20'
          }
          px-4 py-2.5 text-sm text-slate-900 dark:text-white
          placeholder:text-slate-400
          focus:outline-none focus:ring-4
          transition-all duration-200 resize-none
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Select({
  label,
  options = [],
  error,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        className={`
          w-full rounded-xl border bg-white dark:bg-slate-800/50
          border-slate-200 dark:border-slate-700
          px-4 py-2.5 text-sm text-slate-900 dark:text-white
          focus:border-primary-500 focus:ring-primary-500/20
          focus:outline-none focus:ring-4
          transition-all duration-200
        `}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
