import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatNumber, formatPercent } from '../../../utils/formatters.js';

const STATUS_STYLES = {
  positive: {
    icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
    trend: 'text-emerald-600 dark:text-emerald-400',
    line: '#10b981',
  },
  negative: {
    icon: 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400',
    trend: 'text-red-600 dark:text-red-400',
    line: '#ef4444',
  },
  neutral: {
    icon: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
    trend: 'text-slate-500 dark:text-slate-400',
    line: '#3b82f6',
  },
};

export default function StatsCard({
  icon: Icon,
  label,
  value,
  changePercent = null,
  trendData = [],
  status = 'neutral',
  onClick,
}) {
  const styles = STATUS_STYLES[status] || STATUS_STYLES.neutral;
  const isPositiveChange = changePercent !== null && changePercent >= 0;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="focus-ring text-left card-base p-5 w-full hover:shadow-soft-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${styles.icon}`}>
          <Icon size={17} />
        </div>
        {changePercent !== null && (
          <div className={`flex items-center gap-0.5 text-xs font-medium ${styles.trend}`}>
            {isPositiveChange ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {formatPercent(Math.abs(changePercent), { withSign: false })}
          </div>
        )}
      </div>

      <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100 tabular-nums">
        {formatNumber(value)}
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{label}</p>

      {trendData.length > 0 && (
        <div className="h-8 mt-3 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={styles.line}
                strokeWidth={1.75}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.button>
  );
}
