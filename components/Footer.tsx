import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
    const { colors } = useTheme();
    
    return (
        <View style={[styles.footer, { backgroundColor: colors.headerBg }]}>
            <Text style={[styles.footerText, { color: colors.subText }]}>
                © 2025 PCM Coaching • {' '}
                <Text>
                    Developed by 
                    <Text style={[styles.developerText, { color: colors.primary }]}>
                        {' '}theKalyughh
                    </Text>
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 4,
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(0,0,0,0.1)',
        zIndex: 1000,
    },
    footerText: {
        fontSize: 10,
        fontFamily: 'Poppins_400Regular',
    },
    developerText: {
        fontFamily: 'Poppins_500Medium',
    },
}); 