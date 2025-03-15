import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Change from localhost to your computer's IP address
export const API_URL = 'http://192.168.91.40:5002/api';  // Replace X.X with your local IP address

// Add logging for debugging
console.log('API_URL', API_URL);

// Create axios instance
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

interface RegisterData {
    name: string;
    phone_no: string;
    email: string;
    p_words: string;
    dob: string;
    role: string;
}

interface LoginData {
    email: string;
    p_words: string;
}

export const authApi = {
    register: async (userData: RegisterData) => {
        try {
            console.log('Sending registration data:', userData);
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error: any) {
            console.log('error', error);
            throw error.response?.data?.message || 'Registration failed';
        }
    },

    login: async (credentials: LoginData) => {
        try {
            console.log('Sending login data::', credentials)
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error: any) {
            console.log('eeee' , error)

            throw error.response?.data?.message || 'Login failed';
        }
    }
};
