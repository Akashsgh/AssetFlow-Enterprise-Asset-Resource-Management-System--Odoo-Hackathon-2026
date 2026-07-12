import EmptyState from '../../Common/EmptyState.jsx';
import ErrorState from '../../Common/ErrorState.jsx';
import { ChartCardSkeleton } from '../../Common/LoadingSkeleton.jsx';
import { BarChart3 } from 'lucide-react';

export default function ChartCard({
  title,
  subtitle,
  loading,
  error,
  onRetry,
  isEmpty,
  emptyMessage = 'No data available for this period yet.',
  children,
  actions = null,
}) {
  if (loading) return <ChartCardSkeleton />;

  return (
    <div className="card-base p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {actions}
      </div>

      {error ? (
        <ErrorState message={error} onRetry={onRetry} compact />
      ) : isEmpty ? (
        <EmptyState icon={BarChart3} title="No data yet" description={emptyMessage} />
      ) : (
        children
      )}
    </div>
  );
}
