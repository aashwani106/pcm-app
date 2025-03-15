import React from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@/context/ThemeContext';

interface LoadingSpinnerProps {
    visible: boolean;
    message?: string;
}

const LoadingSpinner = ({ visible, message = 'Please wait...' }: LoadingSpinnerProps) => {
    const { colors } = useTheme();

    if (!visible) return null;

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <View style={[styles.content, { backgroundColor: colors.headerBg }]}>
                    <LottieView
                        source={require('../assets/animations/loading.json')}
                        autoPlay
                        loop
                        style={styles.animation}
                    />
                    <Text style={[styles.message, { color: colors.text }]}>
                        {message}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    animation: {
        width: 100,
        height: 100,
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
    },
});

export default LoadingSpinner; 