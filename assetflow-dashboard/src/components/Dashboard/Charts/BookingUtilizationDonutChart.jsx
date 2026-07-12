import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard.jsx';

export default function BookingUtilizationDonutChart({ data, loading, error, onRetry }) {
  const isEmpty = !loading && !error && (!data || data.length === 0);
  const utilized = data?.find((d) => d.name === 'Utilized')?.value ?? 0;
  const total = (data || []).reduce((sum, d) => sum + d.value, 0);
  const utilizationRate = total > 0 ? Math.round((utilized / total) * 100) : 0;

  return (
    <ChartCard
      title="Booking Utilization"
      subtitle="Utilized vs available booking capacity"
      loading={loading}
      error={error}
      onRetry={onRetry}
      isEmpty={isEmpty}
    >
      <div className="relative">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={72} outerRadius={95} paddingAngle={2}>
              <Cell fill="#3b82f6" />
              <Cell fill="#e2e8f0" />
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #e2e8f0' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{utilizationRate}%</span>
          <span className="text-xs text-slate-400">Utilized</span>
        </div>
      </div>
    </ChartCard>
  );
}
