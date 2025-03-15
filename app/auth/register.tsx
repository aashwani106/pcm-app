import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { authApi } from '@/services/authApis';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
    const { colors, isDarkMode, toggleTheme } = useTheme();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        phone_no: '',
        email: '',
        p_words: '',
        dob: '',
        role: 'student'
    });
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        phone_no: '',
        email: '',
        p_words: '',
        dob: ''
    });

    const formatDOB = (text: string) => {
        // Remove any non-digit characters
        const cleanText = text.replace(/\D/g, '');
        let formattedText = '';

        if (cleanText.length <= 2) {
            formattedText = cleanText;
        } else if (cleanText.length <= 4) {
            formattedText = `${cleanText.slice(0, 2)}-${cleanText.slice(2)}`;
        } else {
            formattedText = `${cleanText.slice(0, 2)}-${cleanText.slice(2, 4)}-${cleanText.slice(4, 8)}`;
        }

        return formattedText;
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            phone_no: '',
            email: '',
            p_words: '',
            dob: ''
        };

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        // Phone validation
        if (!formData.phone_no.trim()) {
            newErrors.phone_no = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.phone_no)) {
            newErrors.phone_no = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

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
        } else if (formData.p_words.length < 6) {
            newErrors.p_words = 'Password must be at least 6 characters';
            isValid = false;
        }

        // Updated Date of Birth validation
        if (!formData.dob.trim()) {
            newErrors.dob = 'Date of Birth is required';
            isValid = false;
        } else {
            // Check if the date is valid
            const [day, month, year] = formData.dob.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            const isValidDate = date instanceof Date && !isNaN(date.getTime()) &&
                              date.getDate() === day &&
                              date.getMonth() === month - 1 &&
                              date.getFullYear() === year;

            if (!isValidDate) {
                newErrors.dob = 'Please enter a valid date';
                isValid = false;
            }
        }

        setValidationErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        setError('');
        setValidationErrors({
            name: '',
            phone_no: '',
            email: '',
            p_words: '',
            dob: ''
        });

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setLoadingMessage('Creating your account...');
            console.log('Sending registration data:', formData);
            const response = await authApi.register(formData);
            setLoadingMessage('Success! Logging you in...');
            await login(response);
        } catch (err: any) {
            console.log('Registration error:', err);
            setError(err.toString());
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView 
                style={[styles.scrollView, { backgroundColor: colors.background }]}
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
                        source={require('../../assets/animations/register.json')}
                    />
                    <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
                    <Text style={[styles.subtitle, { color: colors.subText }]}>Join our learning community</Text>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(400).duration(1000).springify()}
                    style={styles.formContainer}
                >
                    <TextInput
                        label="Full Name"
                        value={formData.name}
                        onChangeText={(text) => {
                            setFormData({ ...formData, name: text });
                            setValidationErrors(prev => ({ ...prev, name: '' }));
                        }}
                        mode="outlined"
                        style={[styles.input, { backgroundColor: colors.inputBg }]}
                        left={<TextInput.Icon icon="account" />}
                        theme={{ colors: { primary: colors.primary } }}
                        textColor={colors.text}
                        error={!!validationErrors.name}
                    />
                    {validationErrors.name ? (
                        <Text style={styles.errorText}>{validationErrors.name}</Text>
                    ) : null}

                    <TextInput
                        label="Phone Number"
                        value={formData.phone_no}
                        onChangeText={(text) => {
                            // Only allow numbers and limit to 10 digits
                            const formattedPhone = text.replace(/\D/g, '').slice(0, 10);
                            setFormData({ ...formData, phone_no: formattedPhone });
                            setValidationErrors(prev => ({ ...prev, phone_no: '' }));
                        }}
                        mode="outlined"
                        style={[styles.input, { backgroundColor: colors.inputBg }]}
                        keyboardType="numeric"
                        maxLength={10}
                        left={<TextInput.Icon icon="phone" />}
                        theme={{ colors: { primary: colors.primary } }}
                        textColor={colors.text}
                        error={!!validationErrors.phone_no}
                        placeholder="Enter 10 digit number"
                    />
                    {validationErrors.phone_no ? (
                        <Text style={styles.errorText}>{validationErrors.phone_no}</Text>
                    ) : null}

                    <TextInput
                        label="Email"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
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
                        onChangeText={(text) => setFormData({ ...formData, p_words: text })}
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

                    <TextInput
                        label="Date of Birth (DD-MM-YYYY)"
                        value={formData.dob}
                        onChangeText={(text) => {
                            const formatted = formatDOB(text);
                            if (formatted.length <= 10) { // Limit to DD-MM-YYYY format length
                                setFormData({ ...formData, dob: formatted });
                                setValidationErrors(prev => ({ ...prev, dob: '' }));
                            }
                        }}
                        mode="outlined"
                        style={[styles.input, { backgroundColor: colors.inputBg }]}
                        left={<TextInput.Icon icon="calendar" />}
                        theme={{ colors: { primary: colors.primary } }}
                        textColor={colors.text}
                        error={!!validationErrors.dob}
                        keyboardType="numeric"
                        maxLength={10}
                        placeholder="DD-MM-YYYY"
                    />
                    {validationErrors.dob ? (
                        <Text style={styles.errorText}>{validationErrors.dob}</Text>
                    ) : null}

                    {error ? (
                        <Text style={styles.error}>{error}</Text>
                    ) : null}

                    <Button
                        mode="contained"
                        onPress={handleRegister}
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        loading={loading}
                    >
                        Register
                    </Button>

                    <TouchableOpacity 
                        onPress={() => router.push('/auth/login')}
                        style={styles.linkContainer}
                    >
                        <Text style={[styles.link, { color: colors.subText }]}>
                            Already have an account?{' '}
                        </Text>
                        <Text style={[styles.link, styles.linkBold, { color: colors.text }]}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                <LoadingSpinner visible={loading} message={loadingMessage} />
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingVertical: 20,
    },
    lottie: {
        width: width * 0.5,
        height: width * 0.5,
        marginTop: 60,
    },
    formContainer: {
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Outfit_600SemiBold',
        marginBottom: 5,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        letterSpacing: 0.5,
    },
    input: {
        marginBottom: 16,
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
        marginBottom: 20,
    },
    link: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    linkBold: {
        fontFamily: 'Poppins_500Medium',
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