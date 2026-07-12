import { api } from './api';

export const auditService = {
  getAllAudits: async () => {
    const response = await api.get('/audits');
    return response.data;
  },
  getAuditById: async (id) => {
    const response = await api.get(`/audits/${id}`);
    return response.data;
  },
  createAudit: async (auditData) => {
    const response = await api.post('/audits', auditData);
    return response.data;
  },
  updateAudit: async (id, auditData) => {
    const response = await api.put(`/audits/${id}`, auditData);
    return response.data;
  },
  deleteAudit: async (id) => {
    const response = await api.delete(`/audits/${id}`);
    return response.data;
  }
};
