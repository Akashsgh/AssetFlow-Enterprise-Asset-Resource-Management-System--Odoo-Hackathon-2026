export function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/70 dark:bg-slate-700/50 rounded-lg ${className}`}
    />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <SkeletonBlock className="w-9 h-9 rounded-lg" />
        <SkeletonBlock className="w-12 h-4" />
      </div>
      <SkeletonBlock className="w-20 h-7 mb-2" />
      <SkeletonBlock className="w-28 h-3" />
    </div>
  );
}

export function ChartCardSkeleton({ height = 260 }) {
  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <SkeletonBlock className="w-40 h-4" />
        <SkeletonBlock className="w-16 h-4" />
      </div>
      <SkeletonBlock style={{ height }} className="w-full" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <SkeletonBlock className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function LoadingSkeleton({ variant = 'block', className = '' }) {
  if (variant === 'stats-card') return <StatsCardSkeleton />;
  if (variant === 'chart-card') return <ChartCardSkeleton />;
  return <SkeletonBlock className={className || 'w-full h-24'} />;
}
