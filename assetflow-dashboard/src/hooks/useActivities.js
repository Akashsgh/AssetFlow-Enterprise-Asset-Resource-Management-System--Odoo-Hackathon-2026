import { useCallback, useEffect, useState } from 'react';
import dashboardService from '../services/dashboardService.js';

export function useActivities({ page = 1, pageSize = 10, search = '', sortBy = 'time', sortDir = 'desc' } = {}) {
  const [activities, setActivities] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = { page, pageSize, search, sortBy, sortDir };

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await dashboardService.getActivities(params);
      setActivities(data?.items || []);
      setTotal(data?.total || 0);
    } catch (err) {
      setError(err.message || 'Unable to load recent activities.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search, sortBy, sortDir]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, total, loading, error, retry: fetchActivities };
}
