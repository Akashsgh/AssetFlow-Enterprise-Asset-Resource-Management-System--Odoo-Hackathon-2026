import { api } from './api';

export const bookingService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/bookings${query ? `?${query}` : ''}`);
  },
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  cancel: (id) => api.delete(`/bookings/${id}`),
  getMyBookings: () => api.get('/bookings/my'),
};
