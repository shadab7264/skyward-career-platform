export default function Skeleton({ className = '' }) {
  return (
    <div className={`skeleton ${className}`} />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card p-6 space-y-4 ${className}`}>
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <div className="pt-4 flex gap-3">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  );
}
