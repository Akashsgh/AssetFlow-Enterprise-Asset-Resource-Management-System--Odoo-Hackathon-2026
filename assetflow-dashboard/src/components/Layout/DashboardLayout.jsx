import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/reports': 'Reports',
  '/notifications': 'Notifications',
};

export default function DashboardLayout({ children }) {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || 'AssetFlow';

  return (
    <div className="flex h-screen overflow-hidden bg-surface-light dark:bg-surface-dark">
      <Sidebar isMobileOpen={isMobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} pageTitle={pageTitle} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-[1600px] mx-auto animate-fadeIn">{children}</div>
        </main>
      </div>
    </div>
  );
}
