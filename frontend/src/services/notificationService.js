import { api } from './api';

export const notificationService = {
  getAllNotifications: async (userId) => {
    const response = await api.get(`/notifications?userId=${userId}`);
    return response.data;
  },
  createNotification: async (data) => {
    const response = await api.post('/notifications', data);
    return response.data;
  },
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },
  markAllAsRead: async (userId) => {
    const response = await api.put('/notifications/read-all', { userId });
    return response.data;
  }
};
