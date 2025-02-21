import axios from 'axios';
import { Address } from "@/src/types/address";

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addressService = {
  getAddresses: async () => {
    try {
      const { data } = await api.get('/users/addresses');
      return data.addresses;
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      throw error;
    }
  },

  addAddress: async (addressData: Omit<Address, "_id">) => {
    try {
      const { data } = await api.post('/users/addresses', addressData);
      return data;
    } catch (error) {
      console.error('Failed to add address:', error);
      throw error;
    }
  },

  updateAddress: async (index: number, addressData: Address) => {
    try {
      const { data } = await api.put(`/users/addresses/${index}`, addressData);
      return data;
    } catch (error) {
      console.error('Failed to update address:', error);
      throw error;
    }
  },

  deleteAddress: async (index: number) => {
    try {
      const { data } = await api.delete(`/users/addresses/${index}`);
      return data;
    } catch (error) {
      console.error('Failed to delete address:', error);
      throw error;
    }
  },
}; 