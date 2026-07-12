import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import EmptyState from '../../Common/EmptyState.jsx';
import ErrorState from '../../Common/ErrorState.jsx';
import { TableRowSkeleton } from '../../Common/LoadingSkeleton.jsx';
import { useActivities } from '../../../hooks/useActivities.js';
import { useDebounce } from '../../../hooks/useDebounce.js';
import { formatRelativeTime } from '../../../utils/formatters.js';

const COLUMNS = [
  { key: 'time', label: 'Time' },
  { key: 'user', label: 'User' },
  { key: 'department', label: 'Department' },
  { key: 'action', label: 'Action' },
  { key: 'status', label: 'Status' },
];

const PAGE_SIZE = 8;

export default function ActivityTable() {
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('time');
  const [sortDir, setSortDir] = useState('desc');

  const search = useDebounce(searchInput, 350);

  const { activities, total, loading, error, retry } = useActivities({
    page,
    pageSize: PAGE_SIZE,
    search,
    sortBy,
    sortDir,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('desc');
    }
    setPage(1);
  };

  return (
    <div className="card-base p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recent Activities</h3>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            type="search"
            placeholder="Search activity..."
            className="focus-ring w-full pl-8 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-200 dark:border-slate-700">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-4 py-2 font-medium whitespace-nowrap">
                  <button
                    onClick={() => handleSort(col.key)}
                    className="focus-ring flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {col.label}
                    <ArrowUpDown size={11} className={sortBy === col.key ? 'text-primary-600' : 'text-slate-300'} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading &&
              Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} columns={COLUMNS.length} />)}

            {!loading &&
              !error &&
              activities.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatRelativeTime(row.time)}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-200 whitespace-nowrap">{row.user}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{row.department}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{row.action}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && activities.length === 0 && (
          <EmptyState title="No activity found" description="Try adjusting your search or check back later." />
        )}
      </div>

      {!loading && !error && activities.length > 0 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-400">
            Page {page} of {totalPages} &middot; {total} activities
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="focus-ring p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="focus-ring p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
