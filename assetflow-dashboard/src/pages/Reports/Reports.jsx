import { useState, useMemo } from 'react';
import ReportCard from '../../components/Reports/ReportCard.jsx';
import ReportFilters from '../../components/Reports/ReportFilters.jsx';
import EmptyState from '../../components/Common/EmptyState.jsx';
import ErrorState from '../../components/Common/ErrorState.jsx';
import { SkeletonBlock } from '../../components/Common/LoadingSkeleton.jsx';
import { useReports } from '../../hooks/useReports.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { REPORT_TYPES } from '../../utils/constants.js';

const DEPARTMENTS = ['Engineering', 'Operations', 'Finance', 'Human Resources', 'Sales', 'IT Support'];

export default function Reports() {
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', department: '' });
  const debouncedSearch = useDebounce(filters.search, 350);
  const queryFilters = useMemo(() => ({ ...filters, search: debouncedSearch }), [filters, debouncedSearch]);

  const { reports, loading, error, retry, exportReport, exporting } = useReports(queryFilters);

  // Fall back to the static report catalogue so cards render even before the
  // API is wired up; the API result (when present) takes priority.
  const displayReports = reports.length > 0 ? reports : REPORT_TYPES;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Reports</h1>
        <p className="text-sm text-slate-400 mt-1">Generate, filter and export enterprise reports.</p>
      </div>

      <ReportFilters filters={filters} onChange={setFilters} departments={DEPARTMENTS} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : displayReports.length === 0 ? (
        <EmptyState title="No reports match your filters" description="Try adjusting the search or date range." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {displayReports.map((report) => (
            <ReportCard key={report.id} report={report} onExport={exportReport} exporting={exporting} />
          ))}
        </div>
      )}
    </div>
  );
}
