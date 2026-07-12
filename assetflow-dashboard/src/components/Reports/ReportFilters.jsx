import { Search } from 'lucide-react';

export default function ReportFilters({ filters, onChange, departments = [] }) {
  const update = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="card-base p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          type="search"
          placeholder="Search reports..."
          className="focus-ring w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
        />
      </div>

      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => update({ startDate: e.target.value })}
        className="focus-ring px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
      />
      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => update({ endDate: e.target.value })}
        className="focus-ring px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
      />

      <select
        value={filters.department}
        onChange={(e) => update({ department: e.target.value })}
        className="focus-ring px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}
