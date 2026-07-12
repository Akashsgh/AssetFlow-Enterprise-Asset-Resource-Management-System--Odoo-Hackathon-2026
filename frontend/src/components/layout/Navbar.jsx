import { Bell, Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-zinc-200 flex items-center justify-between px-6 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center">
        <button className="md:hidden text-zinc-500 hover:text-emerald-600 mr-4 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search assets..."
            className="pl-10 pr-4 py-2 bg-zinc-100/50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white w-72 transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-5">
        <button className="relative p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-5 border-l border-zinc-200 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shadow-sm group-hover:shadow-md transition-shadow">
            JD
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-zinc-800 group-hover:text-emerald-700 transition-colors">John Doe</p>
            <p className="text-xs text-zinc-500 font-medium">Asset Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
