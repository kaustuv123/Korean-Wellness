import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  getUserData: async () => {
    try {
      const { data } = await api.get('/users/userData');
      return data;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await api.post('/users/login', credentials);
      return data;
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const { data } = await api.get('/users/logout');
      return data;
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  },
}; 