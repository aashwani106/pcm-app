import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';

export default function TabLayout() {
    const { colors } = useTheme();
    const { user } = useAuth();
    const isStudent = user?.role === 'student';

    useEffect(() => {
        console.log('Current user:', user);
        console.log('User role:', user?.role);
        console.log('Is Student:', isStudent);
    }, [user]);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.subText,
                tabBarStyle: {
                    backgroundColor: colors.headerBg,
                    borderTopWidth: 0.5,
                    borderTopColor: 'rgba(0,0,0,0.1)',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="quizes"
                options={{
                    title: 'Quizes',
                    href: isStudent ? '/quizes' : null,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book-open-variant" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Notifications',
                    href: isStudent ? '/notifications' : null,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="manage"
                options={{
                    title: 'Manage',
                    href: !isStudent ? '/manage' : null,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
