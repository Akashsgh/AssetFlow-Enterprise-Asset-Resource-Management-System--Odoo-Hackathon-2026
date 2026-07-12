import { motion } from 'framer-motion';
import { Package, ArrowLeftRight, CalendarClock, Wrench, ShieldAlert, ClipboardList, Circle } from 'lucide-react';
import { NOTIFICATION_CATEGORIES, NOTIFICATION_CATEGORY_LABELS } from '../../utils/constants.js';
import { formatRelativeTime } from '../../utils/formatters.js';

const CATEGORY_ICON = {
  [NOTIFICATION_CATEGORIES.ASSET_ALLOCATION]: Package,
  [NOTIFICATION_CATEGORIES.TRANSFER]: ArrowLeftRight,
  [NOTIFICATION_CATEGORIES.BOOKING]: CalendarClock,
  [NOTIFICATION_CATEGORIES.MAINTENANCE]: Wrench,
  [NOTIFICATION_CATEGORIES.WARRANTY_EXPIRY]: ShieldAlert,
  [NOTIFICATION_CATEGORIES.AUDIT]: ClipboardList,
};

const PRIORITY_STYLES = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  medium: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300',
  high: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300',
  critical: 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-300',
};

export default function NotificationCard({ notification, onMarkAsRead }) {
  const { id, title, description, time, priority = 'low', category, read } = notification;
  const Icon = CATEGORY_ICON[category] || Circle;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex gap-3 px-4 py-3 rounded-lg transition-colors ${
        read ? 'bg-transparent' : 'bg-primary-50/60 dark:bg-primary-950/20'
      } hover:bg-slate-50 dark:hover:bg-slate-800/60`}
    >
      {!read && <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-600" />}
      <div className="w-9 h-9 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <Icon size={16} className="text-slate-500 dark:text-slate-300" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{title}</p>
          <span className="text-[11px] text-slate-400 shrink-0">{formatRelativeTime(time)}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.low}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
          <span className="text-[10px] text-slate-400">{NOTIFICATION_CATEGORY_LABELS[category] || 'General'}</span>
          {!read && (
            <button
              onClick={() => onMarkAsRead?.(id)}
              className="focus-ring ml-auto text-[11px] font-medium text-primary-600 hover:text-primary-700"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
