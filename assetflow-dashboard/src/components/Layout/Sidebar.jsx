import { NavLink } from 'react-router-dom';
import { LayoutGrid, FileBarChart2, Bell, Boxes, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/reports', label: 'Reports', icon: FileBarChart2 },
  { to: '/notifications', label: 'Notifications', icon: Bell },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="flex-1 px-3 space-y-1 mt-4">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `focus-ring group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary-600 text-white shadow-glow'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Icon size={18} strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar({ isMobileOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-slate-200/70 dark:border-slate-800/70">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-glow">
            <Boxes size={17} className="text-white" />
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-100 tracking-tight">AssetFlow</span>
        </div>
        <NavItems />
        <div className="p-4 mx-3 mb-4 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <p className="text-xs font-semibold">Enterprise Edition</p>
          <p className="text-[11px] text-primary-100 mt-1">Asset & Resource Management</p>
        </div>
      </aside>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.22 }}
              className="fixed inset-y-0 left-0 w-72 z-50 bg-white dark:bg-slate-900 flex flex-col lg:hidden"
            >
              <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200/70 dark:border-slate-800/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                    <Boxes size={17} className="text-white" />
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">AssetFlow</span>
                </div>
                <button onClick={onClose} className="focus-ring p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X size={18} className="text-slate-500" />
                </button>
              </div>
              <NavItems onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
