import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Download, FileText, TrendingUp, DollarSign, Activity, Wrench, ChevronDown 
} from 'lucide-react';
import toast from 'react-hot-toast';

const monthlyCosts = [
  { name: 'Jan', maintenance: 4000, newAssets: 2400 },
  { name: 'Feb', maintenance: 3000, newAssets: 1398 },
  { name: 'Mar', maintenance: 2000, newAssets: 9800 },
  { name: 'Apr', maintenance: 2780, newAssets: 3908 },
  { name: 'May', maintenance: 1890, newAssets: 4800 },
  { name: 'Jun', maintenance: 2390, newAssets: 3800 },
  { name: 'Jul', maintenance: 3490, newAssets: 4300 },
];

const categoryDistribution = [
  { name: 'Hardware', value: 45 },
  { name: 'Software', value: 30 },
  { name: 'Infrastructure', value: 15 },
  { name: 'Furniture', value: 10 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('Last 6 Months');

  const handleExport = (format) => {
    toast.success(`Generating report in ${format} format...`);
    setTimeout(() => {
      toast.success('Download started!');
    }, 1500);
  };

  const KpiCard = ({ title, value, trend, icon: Icon, trendUp }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-zinc-900">{value}</h3>
        </div>
        <div className="p-3 bg-zinc-50 rounded-xl text-zinc-400">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm font-medium">
        <TrendingUp className={`w-4 h-4 mr-1 ${trendUp ? 'text-emerald-500' : 'text-rose-500 rotate-180'}`} />
        <span className={trendUp ? 'text-emerald-600' : 'text-rose-600'}>{trend}</span>
        <span className="text-zinc-400 ml-2">vs last period</span>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-zinc-500 mt-1">Financial insights and asset utilization metrics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-zinc-200 text-zinc-700 text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
            >
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
          <div className="relative group">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
              <button onClick={() => handleExport('PDF')} className="w-full text-left px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-emerald-600 flex items-center">
                <FileText className="w-4 h-4 mr-2" /> Export as PDF
              </button>
              <button onClick={() => handleExport('CSV')} className="w-full text-left px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-emerald-600 flex items-center border-t border-zinc-100">
                <Activity className="w-4 h-4 mr-2" /> Export as CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Total Asset Value" value="$1.24M" trend="+4.5%" icon={DollarSign} trendUp={true} />
        <KpiCard title="Maintenance Costs" value="$12,450" trend="-2.1%" icon={Wrench} trendUp={true} />
        <KpiCard title="Asset Utilization" value="82%" trend="+5.4%" icon={Activity} trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Expenditure Trends</h3>
            <p className="text-sm text-zinc-500">Maintenance vs New Asset Purchases</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyCosts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMaint" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} tickFormatter={(value) => `$${value/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="newAssets" name="New Purchases" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
                <Area type="monotone" dataKey="maintenance" name="Maintenance" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorMaint)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Asset Distribution</h3>
            <p className="text-sm text-zinc-500">Breakdown by category (%)</p>
          </div>
          <div className="h-80 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
