import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '@/context/ThemeContext';
import Footer from '@/components/Footer';

export default function NotificationsScreen() {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
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
    title: {
        fontSize: 24,
        fontFamily: 'Outfit_600SemiBold',
        marginBottom: 20,
    },
}); 