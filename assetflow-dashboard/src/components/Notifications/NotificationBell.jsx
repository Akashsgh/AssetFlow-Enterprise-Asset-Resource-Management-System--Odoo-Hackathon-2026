import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications.js';
import { useNotificationUI } from '../../context/NotificationContext.jsx';
import NotificationDropdown from './NotificationDropdown.jsx';

export default function NotificationBell() {
  const { toggleDropdown } = useNotificationUI();
  const { unreadCount } = useNotifications({ limit: 8 });

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        aria-label="Notifications"
        className="focus-ring relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <Bell size={19} className="text-slate-500 dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      <NotificationDropdown />
    </div>
  );
}
