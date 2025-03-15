import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type AuthContextType = {
    isAuthenticated: boolean;
    user: any | null;
    login: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => {},
    logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            const token = await AsyncStorage.getItem('token');

            if (userData && token) {
                const parsedUser = JSON.parse(userData);
                console.log('Loaded user data:', parsedUser);
                console.log('User role:', parsedUser.role);
                setUser(parsedUser);
                setIsAuthenticated(true);
                router.replace('/(tabs)');
            }
        } catch (error) {
            console.log('Auth check error:', error);
        }
    };

    const login = async (userData: any) => {
        try {
            // Store both user data and token
            const { token, ...userDataWithoutToken } = userData;
            await AsyncStorage.setItem('user', JSON.stringify(userDataWithoutToken));
            await AsyncStorage.setItem('token', token);

            setUser(userDataWithoutToken);
            setIsAuthenticated(true);
            router.replace('/(tabs)');
        } catch (error) {
            console.log('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Remove both user data and token
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            
            setUser(null);
            setIsAuthenticated(false);
            router.replace('/auth/login');
        } catch (error) {
            console.log('Logout error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 