import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import LottieView from 'lottie-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { 
    useFonts,
    Outfit_600SemiBold,
    Outfit_400Regular,
} from '@expo-google-fonts/outfit';
import { 
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { useTheme } from '@/context/ThemeContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { authApi } from '@/services/authApis';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const { login } = useAuth();
    const { colors, isDarkMode, toggleTheme } = useTheme();
    const [formData, setFormData] = useState({
        email: '',
        p_words: ''
    });
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        p_words: ''
    });
    const [fontsLoaded] = useFonts({
        Outfit_600SemiBold,
        Outfit_400Regular,
        Poppins_700Bold,
        Poppins_500Medium,
        Poppins_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: '',
            p_words: ''
        };

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        // Password validation
        if (!formData.p_words.trim()) {
            newErrors.p_words = 'Password is required';
            isValid = false;
        }

        setValidationErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        setError('');
        setValidationErrors({
            email: '',
            p_words: ''
        });

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setLoadingMessage('Logging in...');
            
            const response = await authApi.login(formData);
            setLoadingMessage('Success! Redirecting...');
            await login(response);
        } catch (err: any) {
            console.log('Login error:', err);
            setError(err.toString());
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View 
                        entering={FadeInUp.delay(200).duration(1000).springify()}
                        style={[styles.headerContainer, { backgroundColor: colors.headerBg }]}
                    >
                        <IconButton
                            icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
                            size={24}
                            onPress={toggleTheme}
                            style={styles.themeToggle}
                            iconColor={colors.text}
                        />
                        <LottieView
                            autoPlay
                            style={styles.lottie}
                            source={require('../../assets/animations/Animation.json')}
                        />
                        <Text style={[styles.title, { color: colors.text }]}>Welcome Back!</Text>
                        <Text style={[styles.subtitle, { color: colors.subText }]}>Sign in to continue</Text>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        style={styles.formContainer}
                    >
                        <TextInput
                            label="Email"
                            value={formData.email}
                            onChangeText={(text) => {
                                setFormData(prev => ({ ...prev, email: text }));
                                setValidationErrors(prev => ({ ...prev, email: '' }));
                            }}
                            mode="outlined"
                            style={[styles.input, { backgroundColor: colors.inputBg }]}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            left={<TextInput.Icon icon="email" />}
                            theme={{ colors: { primary: colors.primary } }}
                            textColor={colors.text}
                            error={!!validationErrors.email}
                        />
                        {validationErrors.email ? (
                            <Text style={styles.errorText}>{validationErrors.email}</Text>
                        ) : null}

                        <TextInput
                            label="Password"
                            value={formData.p_words}
                            onChangeText={(text) => {
                                setFormData(prev => ({ ...prev, p_words: text }));
                                setValidationErrors(prev => ({ ...prev, p_words: '' }));
                            }}
                            mode="outlined"
                            style={[styles.input, { backgroundColor: colors.inputBg }]}
                            secureTextEntry
                            left={<TextInput.Icon icon="lock" />}
                            theme={{ colors: { primary: colors.primary } }}
                            textColor={colors.text}
                            error={!!validationErrors.p_words}
                        />
                        {validationErrors.p_words ? (
                            <Text style={styles.errorText}>{validationErrors.p_words}</Text>
                        ) : null}

                        {error ? (
                            <Text style={styles.error}>{error}</Text>
                        ) : null}

                        <Button
                            mode="contained"
                            onPress={handleLogin}
                            style={[styles.button, { backgroundColor: colors.primary }]}
                            loading={loading}
                        >
                            Login
                        </Button>

                        <TouchableOpacity 
                            onPress={() => router.push('/auth/register')}
                            style={styles.linkContainer}
                        >
                            <Text style={[styles.link, { color: colors.subText }]}>
                                Don't have an account?{' '}
                            </Text>
                            <Text style={[styles.link, styles.linkBold, { color: colors.text }]}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <LoadingSpinner visible={loading} message={loadingMessage} />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingVertical: 20,
        paddingTop: 40,
        minHeight: width * 1.2, // Ensure minimum height for animation
    },
    lottie: {
        width: width * 0.65,
        height: width * 0.65,
        marginBottom: 20,
        marginTop: 100,
    },
    formContainer: {
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Outfit_600SemiBold',
        color: '#333',
        marginBottom: 5,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#666',
        letterSpacing: 0.5,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#fff',
        fontFamily: 'Poppins_400Regular',
    },
    button: {
        marginTop: 16,
        padding: 6,
        borderRadius: 10,
    },
    linkContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#666',
    },
    linkBold: {
        fontFamily: 'Poppins_500Medium',
        color: '#333',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',
    },
    themeToggle: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    errorText: {
        color: '#ff3333',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 8,
        marginLeft: 4,
        fontFamily: 'Poppins_400Regular',
    },
}); 