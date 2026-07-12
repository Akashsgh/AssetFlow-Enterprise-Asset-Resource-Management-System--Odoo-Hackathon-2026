import { useCallback, useEffect, useState } from 'react';
import reportService from '../services/reportService.js';
import { downloadBlob, buildReportFilename } from '../utils/exportUtils.js';

export function useReports(filters) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await reportService.getAll(filters);
      setReports(data?.items || []);
    } catch (err) {
      setError(err.message || 'Unable to load reports.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const exportReport = useCallback(
    async (reportId, format) => {
      setExporting(`${reportId}-${format}`);
      try {
        const call = format === 'pdf' ? reportService.exportPdf : reportService.exportExcel;
        const { data } = await call({ reportId, ...filters });
        downloadBlob(data, buildReportFilename(reportId, format === 'pdf' ? 'pdf' : 'xlsx'));
      } catch (err) {
        setError(err.message || 'Export failed. Please try again.');
      } finally {
        setExporting(null);
      }
    },
    [filters]
  );

  return { reports, loading, error, retry: fetchReports, exportReport, exporting };
}
