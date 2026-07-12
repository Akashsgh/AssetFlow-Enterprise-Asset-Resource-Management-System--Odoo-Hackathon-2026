import { api } from './api';

export const reportService = {
  getSummary: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/reports/summary${query ? `?${query}` : ''}`);
  },
  getAssetCosts: (period) => api.get(`/reports/costs?period=${period}`),
  getCategoryDistribution: () => api.get('/reports/categories'),
  exportPDF: () => api.get('/reports/export/pdf'),
  exportCSV: () => api.get('/reports/export/csv'),
  getGeneralReport: () => api.get('/reports/general'),
};
