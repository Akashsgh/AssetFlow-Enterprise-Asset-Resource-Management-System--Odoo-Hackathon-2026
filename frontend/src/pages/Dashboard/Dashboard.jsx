import { motion } from 'framer-motion';
import { 
  Box, Users, AlertTriangle, CheckCircle, 
  Activity, ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const utilizationData = [
  { name: 'Jan', utilized: 400, idle: 240 },
  { name: 'Feb', utilized: 300, idle: 139 },
  { name: 'Mar', utilized: 200, idle: 980 },
  { name: 'Apr', utilized: 278, idle: 390 },
  { name: 'May', utilized: 189, idle: 480 },
  { name: 'Jun', utilized: 239, idle: 380 },
];

const statusData = [
  { name: 'Available', value: 400 },
  { name: 'In Use', value: 300 },
  { name: 'Maintenance', value: 100 },
  { name: 'Retired', value: 50 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const recentActivities = [
  { id: 1, action: 'Asset Allocated', item: 'MacBook Pro M3', user: 'Sarah Jenkins', time: '2 hours ago', icon: ArrowUpRight, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, action: 'Maintenance Required', item: 'Dell PowerEdge R740', user: 'System Alert', time: '4 hours ago', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 3, action: 'Asset Returned', item: 'Dell UltraSharp 27"', user: 'Mike Ross', time: '1 day ago', icon: ArrowDownRight, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 4, action: 'New Asset Added', item: 'Herman Miller Chair', user: 'Admin', time: '2 days ago', icon: Box, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

const StatCard = ({ title, value, change, trend, icon: Icon, colorClass }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-zinc-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-zinc-900">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`font-semibold flex items-center ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-zinc-500'}`}>
        {trend === 'up' && <ArrowUpRight className="w-4 h-4 mr-1" />}
        {trend === 'down' && <ArrowDownRight className="w-4 h-4 mr-1" />}
        {change}
      </span>
      <span className="text-zinc-400 ml-2">vs last month</span>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-zinc-500 mt-1">Welcome back. Here's what's happening with your assets today.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center">
          <Box className="w-5 h-5 mr-2" />
          Add Asset
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Assets" 
          value="2,845" 
          change="+12.5%" 
          trend="up" 
          icon={Box} 
          colorClass="bg-indigo-500/10 text-indigo-600" 
        />
        <StatCard 
          title="Assets in Use" 
          value="1,920" 
          change="+5.2%" 
          trend="up" 
          icon={Users} 
          colorClass="bg-emerald-500/10 text-emerald-600" 
        />
        <StatCard 
          title="Under Maintenance" 
          value="84" 
          change="-2.4%" 
          trend="down" 
          icon={Activity} 
          colorClass="bg-amber-500/10 text-amber-600" 
        />
        <StatCard 
          title="Critical Alerts" 
          value="12" 
          change="+4" 
          trend="up" 
          icon={AlertTriangle} 
          colorClass="bg-rose-500/10 text-rose-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Asset Utilization Trend</h3>
            <select className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2">
              <option>Last 6 months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                <RechartsTooltip 
                  cursor={{ fill: '#f4f4f5' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="utilized" name="Utilized" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="idle" name="Idle" stackId="a" fill="#e4e4e7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col"
        >
          <h3 className="text-lg font-bold text-zinc-900 mb-6">Current Status</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {statusData.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                <div className="text-sm">
                  <p className="text-zinc-500 font-medium">{item.name}</p>
                  <p className="font-bold text-zinc-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900">Recent Activity</h3>
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">View All</button>
        </div>
        <div className="divide-y divide-zinc-100">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="p-6 flex items-center hover:bg-zinc-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${activity.bg} ${activity.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 truncate">
                    {activity.action} <span className="font-medium text-zinc-500">· {activity.item}</span>
                  </p>
                  <p className="text-sm text-zinc-500 mt-0.5">by {activity.user}</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-zinc-400">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {activity.time}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
