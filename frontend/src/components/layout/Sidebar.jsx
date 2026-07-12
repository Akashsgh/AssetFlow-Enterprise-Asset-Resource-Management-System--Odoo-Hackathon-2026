import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Box, Calendar, Wrench, FileText, Bell, Users, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Assets', path: '/assets', icon: Box },
  { name: 'Bookings', path: '/bookings', icon: Calendar },
  { name: 'Maintenance', path: '/maintenance', icon: Wrench },
  { name: 'Audits', path: '/audits', icon: FileText },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Directory', path: '/directory', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-zinc-950 text-zinc-400 flex-shrink-0 flex flex-col h-screen hidden md:flex transition-all duration-300 border-r border-zinc-800">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-emerald-500/20">
          <Box className="w-5 h-5 text-zinc-950" />
        </div>
        <span className="text-xl font-extrabold text-white tracking-wide">AssetFlow</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/5'
                    : 'hover:bg-zinc-800/50 hover:text-zinc-200'
                )
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800/50">
        <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-zinc-400 rounded-xl hover:bg-zinc-800/50 hover:text-rose-400 transition-colors duration-200">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
