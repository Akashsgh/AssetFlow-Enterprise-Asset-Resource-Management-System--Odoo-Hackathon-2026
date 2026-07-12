import { api } from './api';

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentActivity: () => api.get('/dashboard/activity'),
  getUtilizationChart: (period = '6months') => api.get(`/dashboard/utilization?period=${period}`),
};
