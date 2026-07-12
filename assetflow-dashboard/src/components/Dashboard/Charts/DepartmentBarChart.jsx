import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ChartCard from './ChartCard.jsx';

export default function DepartmentBarChart({ data, loading, error, onRetry }) {
  const isEmpty = !loading && !error && (!data || data.length === 0);

  return (
    <ChartCard
      title="Department Wise Assets"
      subtitle="Asset count allocated per department"
      loading={loading}
      error={error}
      onRetry={onRetry}
      isEmpty={isEmpty}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="department" type="category" width={110} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #e2e8f0' }} />
          <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
