import apiClient from './api.js';

export const dashboardService = {
  getOverview: (params) => apiClient.get('/dashboard', { params }),
  getStats: (params) => apiClient.get('/dashboard/stats', { params }),
  getCharts: (params) => apiClient.get('/dashboard/charts', { params }),
  getActivities: (params) => apiClient.get('/dashboard/activities', { params }),
};

export default dashboardService;
