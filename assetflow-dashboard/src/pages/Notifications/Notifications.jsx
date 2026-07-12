import { useState, useMemo } from 'react';
import { CheckCheck } from 'lucide-react';
import NotificationCard from '../../components/Notifications/NotificationCard.jsx';
import EmptyState from '../../components/Common/EmptyState.jsx';
import ErrorState from '../../components/Common/ErrorState.jsx';
import { SkeletonBlock } from '../../components/Common/LoadingSkeleton.jsx';
import { useNotifications } from '../../hooks/useNotifications.js';
import { NOTIFICATION_CATEGORIES, NOTIFICATION_CATEGORY_LABELS } from '../../utils/constants.js';

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { notifications, loading, error, retry, markAsRead, markAllAsRead } = useNotifications();

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return notifications;
    return notifications.filter((n) => n.category === activeCategory);
  }, [notifications, activeCategory]);

  const categories = ['all', ...Object.values(NOTIFICATION_CATEGORIES)];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Notifications</h1>
          <p className="text-sm text-slate-400 mt-1">Stay on top of asset, booking and maintenance updates.</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <CheckCheck size={15} />
          Mark all read
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`focus-ring shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeCategory === cat
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat === 'all' ? 'All' : NOTIFICATION_CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="card-base p-2 space-y-1">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonBlock key={i} className="h-20 w-full" />)}

        {!loading && error && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState title="Nothing to show" description="Notifications for this category will appear here." />
        )}

        {!loading &&
          !error &&
          filtered.map((n) => <NotificationCard key={n.id} notification={n} onMarkAsRead={markAsRead} />)}
      </div>
    </div>
  );
}
