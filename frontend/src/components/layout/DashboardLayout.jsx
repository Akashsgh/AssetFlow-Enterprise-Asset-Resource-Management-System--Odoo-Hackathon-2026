import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden font-sans text-zinc-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed bg-opacity-5">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8 backdrop-blur-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
