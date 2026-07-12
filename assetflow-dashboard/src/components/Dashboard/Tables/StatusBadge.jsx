const STATUS_STYLES = {
  completed: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  approved: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  pending: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
  in_progress: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
  rejected: 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400',
};

const STATUS_LABELS = {
  completed: 'Completed',
  approved: 'Approved',
  pending: 'Pending',
  in_progress: 'In Progress',
  rejected: 'Rejected',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
  const label = STATUS_LABELS[status] || status;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}
