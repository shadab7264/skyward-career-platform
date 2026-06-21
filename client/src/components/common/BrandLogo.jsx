import logoUrl from '../../assets/skyward-logo-512.webp';

const sizes = {
  sm: 'h-10',
  md: 'h-14',
  lg: 'h-20',
  xl: 'h-28',
};

export default function BrandLogo({ size = 'md', className = '', showFrame = true }) {
  return (
    <div className={`${showFrame ? 'rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200/70 dark:ring-white/10' : ''} ${className}`}>
      <img
        src={logoUrl}
        alt="Skyward Career & Placement Hub"
        className={`${sizes[size]} w-auto object-contain`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
