import { api } from './api';

export const maintenanceService = {
  getAllTickets: async () => {
    const response = await api.get('/maintenance');
    return response;
  },
  createTicket: async (data) => {
    const response = await api.post('/maintenance', data);
    return response;
  },
  resolveTicket: async (id) => {
    const response = await api.put(`/maintenance/${id}/resolve`);
    return response;
  }
};
