import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck } from 'lucide-react';
import NotificationCard from './NotificationCard.jsx';
import EmptyState from '../Common/EmptyState.jsx';
import ErrorState from '../Common/ErrorState.jsx';
import { SkeletonBlock } from '../Common/LoadingSkeleton.jsx';
import { useNotifications } from '../../hooks/useNotifications.js';
import { useNotificationUI } from '../../context/NotificationContext.jsx';

export default function NotificationDropdown() {
  const { isDropdownOpen, closeDropdown } = useNotificationUI();
  const { notifications, loading, error, retry, markAsRead, markAllAsRead } = useNotifications({ limit: 8 });

  return (
    <AnimatePresence>
      {isDropdownOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeDropdown} />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-[22rem] max-w-[90vw] card-base z-50 overflow-hidden shadow-soft-lg"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/70 dark:border-slate-800/70">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Notifications</p>
              <button
                onClick={markAllAsRead}
                className="focus-ring flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
              >
                <CheckCheck size={13} />
                Mark all read
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {loading && (
                <div className="space-y-2 p-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonBlock key={i} className="h-16 w-full" />
                  ))}
                </div>
              )}
              {!loading && error && <ErrorState message={error} onRetry={retry} compact />}
              {!loading && !error && notifications.length === 0 && (
                <EmptyState title="You're all caught up" description="New notifications will appear here." />
              )}
              {!loading &&
                !error &&
                notifications.map((n) => (
                  <NotificationCard key={n.id} notification={n} onMarkAsRead={markAsRead} />
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
