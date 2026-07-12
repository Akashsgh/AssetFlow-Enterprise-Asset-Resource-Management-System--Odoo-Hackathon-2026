import { AlertTriangle, RotateCw } from 'lucide-react';

export default function ErrorState({
  message = 'Something went wrong while loading this data.',
  onRetry = null,
  compact = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? 'py-6' : 'py-10'
      } px-4`}
    >
      <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-3">
        <AlertTriangle size={20} className="text-red-500" />
      </div>
      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Couldn't load this data</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="focus-ring mt-4 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          <RotateCw size={13} />
          Retry
        </button>
      )}
    </div>
  );
}
