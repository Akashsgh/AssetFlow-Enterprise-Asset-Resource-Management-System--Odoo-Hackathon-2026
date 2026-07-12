import { motion } from 'framer-motion';
import { FileDown, FileSpreadsheet, Printer, Loader2 } from 'lucide-react';

export default function ReportCard({ report, onExport, exporting }) {
  const { id, label, description, summary = [] } = report;
  const isExportingPdf = exporting === `${id}-pdf`;
  const isExportingExcel = exporting === `${id}-excel`;

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="card-base p-5 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{description}</p>

      {summary.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {summary.map((item) => (
            <div key={item.label} className="rounded-lg bg-slate-50 dark:bg-slate-800/60 px-3 py-2">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.value}</p>
              <p className="text-[11px] text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onExport(id, 'pdf')}
          disabled={isExportingPdf}
          className="focus-ring flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
        >
          {isExportingPdf ? <Loader2 size={13} className="animate-spin" /> : <FileDown size={13} />}
          PDF
        </button>
        <button
          onClick={() => onExport(id, 'excel')}
          disabled={isExportingExcel}
          className="focus-ring flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
        >
          {isExportingExcel ? <Loader2 size={13} className="animate-spin" /> : <FileSpreadsheet size={13} />}
          Excel
        </button>
        <button
          onClick={() => window.print()}
          className="focus-ring inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          aria-label="Print report"
        >
          <Printer size={13} />
        </button>
      </div>
    </motion.div>
  );
}
