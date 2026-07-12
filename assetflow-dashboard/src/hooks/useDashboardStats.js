import { useCallback, useEffect, useState } from 'react';
import dashboardService from '../services/dashboardService.js';

export function useDashboardStats(params) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await dashboardService.getStats(params);
      setStats(data);
    } catch (err) {
      setError(err.message || 'Unable to load dashboard stats.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, retry: fetchStats };
}
