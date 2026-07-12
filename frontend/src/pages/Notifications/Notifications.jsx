import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Trash2, AlertTriangle, Package, Wrench, Calendar, ClipboardCheck, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

const initialNotifications = [
  { id: 1, type: 'alert', title: 'Critical Asset Failure', message: 'Dell PowerEdge R740 has reported a critical overheating issue and requires immediate attention.', time: new Date(Date.now() - 1000 * 60 * 15), read: false },
  { id: 2, type: 'booking', title: 'New Booking Request', message: 'Sarah Jenkins has requested MacBook Pro M3 for the week of Oct 20–25.', time: new Date(Date.now() - 1000 * 60 * 60), read: false },
  { id: 3, type: 'maintenance', title: 'Maintenance Resolved', message: 'The paper jam issue on Office Printer A has been marked as resolved by John Doe.', time: new Date(Date.now() - 1000 * 60 * 60 * 3), read: false },
  { id: 4, type: 'asset', title: 'New Assets Added', message: '5 new Dell UltraSharp monitors have been added to the inventory under IT Operations.', time: new Date(Date.now() - 1000 * 60 * 60 * 24), read: true },
  { id: 5, type: 'audit', title: 'Audit Due Reminder', message: 'The quarterly audit for the Design Team department is due in 3 days.', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), read: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('All');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    if (filter === 'Unread') return !n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification dismissed');
  };

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'alert': return { icon: AlertTriangle, bg: 'bg-rose-100', color: 'text-rose-600' };
      case 'booking': return { icon: Calendar, bg: 'bg-blue-100', color: 'text-blue-600' };
      case 'maintenance': return { icon: Wrench, bg: 'bg-amber-100', color: 'text-amber-600' };
      case 'asset': return { icon: Package, bg: 'bg-emerald-100', color: 'text-emerald-600' };
      case 'audit': return { icon: ClipboardCheck, bg: 'bg-purple-100', color: 'text-purple-600' };
      default: return { icon: Bell, bg: 'bg-zinc-100', color: 'text-zinc-600' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-black">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-zinc-500 mt-1">Stay updated on all asset activity and alerts.</p>
        </div>
        <button
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="flex items-center px-5 py-2.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <CheckCheck className="w-4 h-4 mr-2" />
          Mark All Read
        </button>
      </div>

      <div className="flex space-x-2 mb-2">
        {['All', 'Unread'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === f ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'}`}
          >
            {f}
            {f === 'Unread' && unreadCount > 0 && <span className="ml-2 text-xs bg-emerald-500 text-white rounded-full px-1.5">{unreadCount}</span>}
          </button>
        ))}
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        <AnimatePresence>
          {filtered.length > 0 ? filtered.map((notif) => {
            const { icon: Icon, bg, color } = getIcon(notif.type);
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => markRead(notif.id)}
                className={`p-5 border-b border-zinc-100 last:border-0 flex items-start gap-4 cursor-pointer transition-colors hover:bg-zinc-50 ${!notif.read ? 'bg-emerald-50/30' : ''}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-bold ${!notif.read ? 'text-zinc-900' : 'text-zinc-700'}`}>
                      {notif.title}
                      {!notif.read && <span className="ml-2 w-2 h-2 rounded-full bg-emerald-500 inline-block" />}
                    </p>
                    <span className="text-xs text-zinc-400 font-medium whitespace-nowrap flex-shrink-0">
                      {formatDistanceToNow(notif.time, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{notif.message}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                  className="p-1.5 text-zinc-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          }) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-zinc-400">
                <Bell className="w-8 h-8" />
              </div>
              <p className="text-lg font-bold text-zinc-900">All caught up!</p>
              <p className="text-zinc-500 mt-1 font-medium">No notifications to show.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;
