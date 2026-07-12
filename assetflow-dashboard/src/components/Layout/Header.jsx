import { Menu, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import NotificationBell from '../Notifications/NotificationBell.jsx';

export default function Header({ onMenuClick, pageTitle = 'Dashboard' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 shrink-0 sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-6 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <button
        onClick={onMenuClick}
        className="focus-ring lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label="Open menu"
      >
        <Menu size={20} className="text-slate-600 dark:text-slate-300" />
      </button>

      <div className="hidden md:block">
        <h1 className="text-base font-semibold text-slate-800 dark:text-slate-100">{pageTitle}</h1>
      </div>

      <div className="flex-1 max-w-md ml-2 hidden sm:block">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search assets, employees, requests..."
            className="focus-ring w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="focus-ring p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="text-amber-400" />
          ) : (
            <Moon size={18} className="text-slate-500" />
          )}
        </button>
        <NotificationBell />
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-semibold ml-1">
          AF
        </div>
      </div>
    </header>
  );
}
