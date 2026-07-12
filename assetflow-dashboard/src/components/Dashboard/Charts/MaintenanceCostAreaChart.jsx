import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ChartCard from './ChartCard.jsx';
import { formatCurrency } from '../../../utils/formatters.js';

export default function MaintenanceCostAreaChart({ data, loading, error, onRetry }) {
  const isEmpty = !loading && !error && (!data || data.length === 0);

  return (
    <ChartCard
      title="Maintenance Cost Trend"
      subtitle="Total maintenance spend over time"
      loading={loading}
      error={error}
      onRetry={onRetry}
      isEmpty={isEmpty}
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="maintenanceCostFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #e2e8f0' }}
            formatter={(value) => formatCurrency(value)}
          />
          <Area type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2.5} fill="url(#maintenanceCostFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
