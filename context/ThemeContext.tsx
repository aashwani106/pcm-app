import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
    colors: typeof lightColors | typeof darkColors;
};

const lightColors = {
    background: '#fff',
    headerBg: '#f5f5f5',
    text: '#333',
    subText: '#666',
    inputBg: '#fff',
    inputBorder: '#e0e0e0',
    primary: '#4B0082',
};

const darkColors = {
    background: '#1a1a1a',
    headerBg: '#2d2d2d',
    text: '#fff',
    subText: '#aaa',
    inputBg: '#333',
    inputBorder: '#444',
    primary: '#9370DB',
};

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
    colors: lightColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                setIsDarkMode(savedTheme === 'dark');
            }
        } catch (error) {
            console.log('Error loading theme:', error);
        }
    };

    const toggleTheme = async () => {
        try {
            const newTheme = !isDarkMode;
            setIsDarkMode(newTheme);
            await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
        } catch (error) {
            console.log('Error saving theme:', error);
        }
    };

    return (
        <ThemeContext.Provider 
            value={{ 
                isDarkMode, 
                toggleTheme, 
                colors: isDarkMode ? darkColors : lightColors 
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext); 