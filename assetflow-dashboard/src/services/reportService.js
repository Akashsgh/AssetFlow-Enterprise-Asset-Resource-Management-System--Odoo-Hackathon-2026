import apiClient from './api.js';

export const reportService = {
  getAll: (params) => apiClient.get('/reports', { params }),
  exportPdf: (payload) =>
    apiClient.post('/reports/export/pdf', payload, { responseType: 'blob' }),
  exportExcel: (payload) =>
    apiClient.post('/reports/export/excel', payload, { responseType: 'blob' }),
};

export default reportService;
