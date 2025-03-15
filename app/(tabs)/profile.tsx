import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, List, Switch } from 'react-native-paper';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/Footer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar, Platform } from 'react-native';

export default function ProfileScreen() {
    const { colors, isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background , paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <View style={styles.container}>
                {/* Profile Header */}
                <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                    <MaterialCommunityIcons 
                        name="account-circle" 
                        size={80} 
                        color={colors.primary} 
                    />
                    <Text style={[styles.name, { color: colors.text }]}>
                        {user?.name}
                    </Text>
                    <Text style={[styles.role, { color: colors.subText }]}>
                        {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </Text>
                </View>

                {/* Profile Details */}
                <View style={styles.detailsSection}>
                    <List.Item
                        title="Email"
                        description={user?.email}
                        left={props => <List.Icon {...props} icon="email" />}
                        titleStyle={{ color: colors.text }}
                        descriptionStyle={{ color: colors.subText }}
                    />
                    
                    <List.Item
                        title="Phone"
                        description={user?.phone_no}
                        left={props => <List.Icon {...props} icon="phone" />}
                        titleStyle={{ color: colors.text }}
                        descriptionStyle={{ color: colors.subText }}
                    />

                    {/* Dark Mode Toggle */}
                    <List.Item
                        title="Dark Mode"
                        left={props => (
                            <List.Icon 
                                {...props} 
                                icon={isDarkMode ? "weather-night" : "weather-sunny"} 
                            />
                        )}
                        right={() => (
                            <Switch
                                value={isDarkMode}
                                onValueChange={toggleTheme}
                                color={colors.primary}
                            />
                        )}
                        titleStyle={{ color: colors.text }}
                    />
                </View>

                {/* Logout Button */}
                <Button
                    mode="contained"
                    onPress={logout}
                    style={[styles.logoutButton, { backgroundColor: colors.primary }]}
                    icon="logout"
                >
                    Logout
                </Button>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Outfit_600SemiBold',
        marginTop: 10,
    },
    role: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        marginTop: 5,
    },
    detailsSection: {
        borderRadius: 15,
        marginBottom: 20,
    },
    logoutButton: {
        marginTop: 'auto',
        padding: 8,
        borderRadius: 10,
    },
}); 