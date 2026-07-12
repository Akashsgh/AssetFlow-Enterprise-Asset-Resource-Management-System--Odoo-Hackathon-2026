import { useCallback, useEffect, useState } from 'react';
import dashboardService from '../services/dashboardService.js';

export function useDashboardCharts(params) {
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await dashboardService.getCharts(params);
      setCharts(data);
    } catch (err) {
      setError(err.message || 'Unable to load chart data.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  return { charts, loading, error, retry: fetchCharts };
}
