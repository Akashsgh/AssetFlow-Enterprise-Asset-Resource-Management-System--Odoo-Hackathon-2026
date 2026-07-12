import {
  Boxes,
  PackageCheck,
  PackageX,
  Wrench,
  ArrowLeftRight,
  CalendarClock,
  CalendarCheck2,
  Users,
  Building2,
  ClipboardList,
  UserPlus,
  Truck,
  FilePlus2,
  CalendarPlus,
  FileBarChart2,
  ShieldCheck,
} from 'lucide-react';
import StatsCard from '../../components/Dashboard/Cards/StatsCard.jsx';
import QuickActionCard from '../../components/Dashboard/Cards/QuickActionCard.jsx';
import AssetCategoryPieChart from '../../components/Dashboard/Charts/AssetCategoryPieChart.jsx';
import AssetStatusBarChart from '../../components/Dashboard/Charts/AssetStatusBarChart.jsx';
import MonthlyAllocationLineChart from '../../components/Dashboard/Charts/MonthlyAllocationLineChart.jsx';
import DepartmentBarChart from '../../components/Dashboard/Charts/DepartmentBarChart.jsx';
import MaintenanceCostAreaChart from '../../components/Dashboard/Charts/MaintenanceCostAreaChart.jsx';
import BookingUtilizationDonutChart from '../../components/Dashboard/Charts/BookingUtilizationDonutChart.jsx';
import ActivityTable from '../../components/Dashboard/Tables/ActivityTable.jsx';
import { StatsCardSkeleton } from '../../components/Common/LoadingSkeleton.jsx';
import ErrorState from '../../components/Common/ErrorState.jsx';
import { useDashboardStats } from '../../hooks/useDashboardStats.js';
import { useDashboardCharts } from '../../hooks/useDashboardCharts.js';
import { KPI_KEYS } from '../../utils/constants.js';

const KPI_CONFIG = [
  { key: KPI_KEYS.TOTAL_ASSETS, label: 'Total Assets', icon: Boxes },
  { key: KPI_KEYS.AVAILABLE_ASSETS, label: 'Available Assets', icon: PackageCheck },
  { key: KPI_KEYS.ALLOCATED_ASSETS, label: 'Allocated Assets', icon: PackageX },
  { key: KPI_KEYS.UNDER_MAINTENANCE, label: 'Assets Under Maintenance', icon: Wrench },
  { key: KPI_KEYS.PENDING_TRANSFERS, label: 'Pending Transfers', icon: ArrowLeftRight },
  { key: KPI_KEYS.UPCOMING_RETURNS, label: 'Upcoming Returns', icon: CalendarClock },
  { key: KPI_KEYS.ACTIVE_BOOKINGS, label: 'Active Bookings', icon: CalendarCheck2 },
  { key: KPI_KEYS.EMPLOYEES, label: 'Employees', icon: Users },
  { key: KPI_KEYS.DEPARTMENTS, label: 'Departments', icon: Building2 },
  { key: KPI_KEYS.MAINTENANCE_REQUESTS, label: 'Maintenance Requests', icon: ClipboardList },
];

const QUICK_ACTIONS = [
  { label: 'Register Asset', description: 'Add a new asset to inventory', icon: FilePlus2, to: '/dashboard' },
  { label: 'Allocate Asset', description: 'Assign an asset to an employee', icon: UserPlus, to: '/dashboard' },
  { label: 'Raise Maintenance', description: 'Log a new maintenance request', icon: Wrench, to: '/dashboard' },
  { label: 'Create Booking', description: 'Reserve an asset for a time slot', icon: CalendarPlus, to: '/dashboard' },
  { label: 'Generate Report', description: 'Build a custom report export', icon: FileBarChart2, to: '/reports' },
  { label: 'View Audit', description: 'Review recent audit trail', icon: ShieldCheck, to: '/dashboard' },
];

export default function Dashboard() {
  const { stats, loading: statsLoading, error: statsError, retry: retryStats } = useDashboardStats();
  const { charts, loading: chartsLoading, error: chartsError, retry: retryCharts } = useDashboardCharts();

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
          Overview
        </h2>
        {statsError ? (
          <ErrorState message={statsError} onRetry={retryStats} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {statsLoading
              ? Array.from({ length: 10 }).map((_, i) => <StatsCardSkeleton key={i} />)
              : KPI_CONFIG.map(({ key, label, icon }) => {
                  const kpi = stats?.[key] || {};
                  return (
                    <StatsCard
                      key={key}
                      icon={icon}
                      label={label}
                      value={kpi.value}
                      changePercent={kpi.changePercent}
                      trendData={kpi.trend}
                      status={kpi.status || 'neutral'}
                    />
                  );
                })}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard key={action.label} {...action} />
          ))}
        </div>
      </section>

      {/* Analytics */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
          Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <AssetCategoryPieChart
            data={charts?.assetCategoryDistribution}
            loading={chartsLoading}
            error={chartsError}
            onRetry={retryCharts}
          />
          <AssetStatusBarChart
            data={charts?.assetStatus}
            loading={chartsLoading}
            error={chartsError}
            onRetry={retryCharts}
          />
          <BookingUtilizationDonutChart
            data={charts?.bookingUtilization}
            loading={chartsLoading}
            error={chartsError}
            onRetry={retryCharts}
          />
          <MonthlyAllocationLineChart
            data={charts?.monthlyAllocation}
            loading={chartsLoading}
            error={chartsError}
            onRetry={retryCharts}
          />
          <MaintenanceCostAreaChart
            data={charts?.maintenanceCostTrend}
            loading={chartsLoading}
            error={chartsError}
            onRetry={retryCharts}
          />
          <DepartmentBarChart
            data={charts?.departmentWiseAssets}
            loading={chartsLoading}
            error={chartsError}
            onRetry={retryCharts}
          />
        </div>
      </section>

      {/* Recent Activities */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
          Recent Activities
        </h2>
        <ActivityTable />
      </section>
    </div>
  );
}
