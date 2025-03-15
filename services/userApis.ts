import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './authApis';

const api = axios.create({
    baseURL: API_URL,
});

// Add request interceptor to add token
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const userApi = {
    getAllStudents: async () => {
        try {
            const response = await api.get('/users/students');
            return response.data;
        } catch (error: any) {
            throw error.response?.data?.message || 'Failed to fetch students';
        }
    }
}; 