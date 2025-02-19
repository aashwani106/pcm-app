import React from 'react';
import { 
    View, 
    ScrollView, 
    StyleSheet, 
    Dimensions, 
    ImageBackground,
    Image
} from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '@/components/Footer';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
    const { colors, isDarkMode, toggleTheme } = useTheme();

    const features = [
        {
            title: 'Expert Teachers',
            description: 'Learn from experienced faculty members',
            icon: 'school',
            color: '#FF6B6B'
        },
        {
            title: 'Quality Education',
            description: 'Comprehensive study materials and guidance',
            icon: 'book-open-page-variant',
            color: '#4ECDC4'
        },
        {
            title: 'Track Progress',
            description: 'Regular assessments and performance tracking',
            icon: 'chart-line',
            color: '#45B7D1'
        },
        {
            title: 'Live Classes',
            description: 'Interactive online learning experience',
            icon: 'video',
            color: '#96CEB4'
        }
    ];

    const heroImageUrl = "https://img.freepik.com/free-vector/mathematics-background_23-2148153966.jpg";

    return (
        <View style={{ flex: 1 }}>
            <ScrollView 
                style={[styles.container, { backgroundColor: colors.background }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <View style={[styles.heroGradient, { backgroundColor: colors.headerBg }]}>
                    <IconButton
                        icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
                        size={24}
                        onPress={toggleTheme}
                        style={styles.themeToggle}
                        iconColor={colors.text}
                    />
                    <Animated.View 
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        style={styles.heroContent}
                    >
                        <Image 
                            source={{ uri: heroImageUrl }}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                        <Text style={[styles.heroTitle, { color: colors.text }]}>
                            Welcome to PCM Coaching
                        </Text>
                        <Text style={[styles.heroSubtitle, { color: colors.subText }]}>
                            Your Gateway to Excellence in{'\n'}Physics, Chemistry & Mathematics
                        </Text>
                    </Animated.View>
                </View>

                {/* Stats Section */}
                <View style={[styles.statsContainer, { backgroundColor: colors.headerBg }]}>
                    <Animated.View 
                        entering={FadeInUp.delay(400).duration(1000).springify()}
                        style={styles.statsRow}
                    >
                        {[
                            { number: '500+', label: 'Students' },
                            { number: '50+', label: 'Courses' },
                            { number: '95%', label: 'Success Rate' }
                        ].map((stat, index) => (
                            <View key={index} style={styles.statItem}>
                                <Text style={[styles.statNumber, { color: colors.primary }]}>
                                    {stat.number}
                                </Text>
                                <Text style={[styles.statLabel, { color: colors.subText }]}>
                                    {stat.label}
                                </Text>
                            </View>
                        ))}
                    </Animated.View>
                </View>

                {/* Features Section */}
                <View style={styles.featuresSection}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Why Choose Us?
                    </Text>
                    <View style={styles.featureGrid}>
                        {features.map((feature, index) => (
                            <Animated.View 
                                key={feature.title}
                                entering={FadeInUp.delay(300 + (index * 100)).duration(1000).springify()}
                                style={[styles.featureCard, { backgroundColor: colors.headerBg }]}
                            >
                                <IconButton
                                    icon={feature.icon}
                                    size={32}
                                    iconColor={feature.color}
                                    style={styles.featureIcon}
                                />
                                <Text style={[styles.featureTitle, { color: colors.text }]}>
                                    {feature.title}
                                </Text>
                                <Text style={[styles.featureDescription, { color: colors.subText }]}>
                                    {feature.description}
                                </Text>
                            </Animated.View>
                        ))}
                    </View>
                </View>

                {/* CTA Section */}
                <View style={[styles.ctaSection, { backgroundColor: colors.headerBg }]}>
                    <Animated.View 
                        entering={FadeInUp.delay(600).duration(1000).springify()}
                        style={styles.ctaContent}
                    >
                        <Text style={[styles.ctaTitle, { color: colors.text }]}>
                            Ready to start your journey?
                        </Text>
                        <Text style={[styles.ctaSubtitle, { color: colors.subText }]}>
                            Join us today and transform your learning experience
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                onPress={() => router.push('/auth/login')}
                                style={[styles.button, { backgroundColor: colors.primary }]}
                                contentStyle={styles.buttonContent}
                                labelStyle={styles.buttonLabel}
                            >
                                Login
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => router.push('/auth/register')}
                                style={[styles.button, { borderColor: colors.primary }]}
                                contentStyle={styles.buttonContent}
                                labelStyle={[styles.buttonLabel, { color: colors.primary }]}
                            >
                                Register
                            </Button>
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroGradient: {
        paddingTop: 60,
        paddingBottom: 60,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    themeToggle: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    heroContent: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
    },
    heroImage: {
        width: width * 0.8,
        height: width * 0.5,
        marginBottom: 20,
        borderRadius: 15,
    },
    heroTitle: {
        fontSize: 32,
        fontFamily: 'Outfit_600SemiBold',
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        marginTop: 10,
    },
    statsContainer: {
        marginTop: -40,
        marginHorizontal: 20,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontFamily: 'Outfit_600SemiBold',
    },
    statLabel: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginTop: 5,
    },
    featuresSection: {
        padding: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Outfit_600SemiBold',
        marginBottom: 20,
    },
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        width: '48%',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
    },
    featureIcon: {
        marginBottom: 10,
    },
    featureTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        textAlign: 'center',
        marginBottom: 5,
    },
    featureDescription: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
    },
    ctaSection: {
        marginTop: 30,
        padding: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    ctaContent: {
        alignItems: 'center',
    },
    ctaTitle: {
        fontSize: 24,
        fontFamily: 'Outfit_600SemiBold',
        textAlign: 'center',
        marginBottom: 10,
    },
    ctaSubtitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        opacity: 0.9,
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        marginHorizontal: 10,
        minWidth: 120,
        borderRadius: 10,
    },
    buttonContent: {
        paddingVertical: 8,
    },
    buttonLabel: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    },
}); 