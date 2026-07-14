import { api } from './api';

export const userService = {
  getProfile: async (userId) => {
    const response = await api.get('/users/profile', { params: { userId } });
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
  updateSettings: async (data) => {
    const response = await api.put('/users/settings', data);
    return response.data;
  },
  changePassword: async (data) => {
    const response = await api.put('/users/password', data);
    return response.data;
  }
};
