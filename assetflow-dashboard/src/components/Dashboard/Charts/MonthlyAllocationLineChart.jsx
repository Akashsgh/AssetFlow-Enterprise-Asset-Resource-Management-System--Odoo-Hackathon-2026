import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ChartCard from './ChartCard.jsx';

export default function MonthlyAllocationLineChart({ data, loading, error, onRetry }) {
  const isEmpty = !loading && !error && (!data || data.length === 0);

  return (
    <ChartCard
      title="Monthly Asset Allocation"
      subtitle="Assets allocated per month"
      loading={loading}
      error={error}
      onRetry={onRetry}
      isEmpty={isEmpty}
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #e2e8f0' }} />
          <Line type="monotone" dataKey="allocated" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
