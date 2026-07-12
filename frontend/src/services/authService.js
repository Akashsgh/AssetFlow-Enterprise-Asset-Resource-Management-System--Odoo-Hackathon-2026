export const authService = {
  login: async (credentials) => ({ success: true, credentials }),
  signup: async (payload) => ({ success: true, payload }),
};
