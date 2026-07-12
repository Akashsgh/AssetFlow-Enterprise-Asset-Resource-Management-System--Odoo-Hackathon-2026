import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ChartCard from './ChartCard.jsx';

export default function AssetStatusBarChart({ data, loading, error, onRetry }) {
  const isEmpty = !loading && !error && (!data || data.length === 0);

  return (
    <ChartCard
      title="Asset Status"
      subtitle="Assets grouped by current status"
      loading={loading}
      error={error}
      onRetry={onRetry}
      isEmpty={isEmpty}
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="status" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #e2e8f0' }} />
          <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={44} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
