// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoryService = {
  getCategories: async () => {
    const { data } = await api.get('/categories');
    return data;
  },
  
  getProductsByCategory: async (category: string) => {
    const { data } = await api.get(`/products/category/${encodeURIComponent(category)}`);
    return data;
  },
  
  getProductBySlug: async (slug: string) => {
    const { data } = await api.get(`/products/${encodeURIComponent(slug)}`);
    return data;
  },
};