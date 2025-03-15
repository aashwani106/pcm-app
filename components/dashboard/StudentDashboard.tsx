import React from 'react';
import { 
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Footer from '@/components/Footer';

const { width } = Dimensions.get('window');

export default function StudentDashboard() {
    const { colors } = useTheme();
    const { user } = useAuth();

    const menuItems = [
        {
            title: 'My Courses',
            icon: 'book-open-variant',
            route: '/courses',
            color: '#4CAF50'
        },
        {
            title: 'Assignments',
            icon: 'clipboard-text',
            route: '/assignments',
            color: '#2196F3'
        },
        {
            title: 'Progress',
            icon: 'chart-line',
            route: '/progress',
            color: '#9C27B0'
        },
        {
            title: 'Schedule',
            icon: 'calendar',
            route: '/schedule',
            color: '#FF9800'
        }
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={[styles.container, { backgroundColor: colors.background }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Welcome Section */}
                <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                    <View style={styles.welcomeSection}>
                        <Text style={[styles.welcomeText, { color: colors.text }]}>
                            Welcome back,
                        </Text>
                        <Text style={[styles.userName, { color: colors.text }]}>
                            {user?.name}
                        </Text>
                        <Text style={[styles.roleText, { color: colors.subText }]}>
                            Student
                        </Text>
                    </View>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsContainer}>
                    <Card style={[styles.statsCard, { backgroundColor: colors.headerBg }]}>
                        <Card.Content>
                            <Text style={[styles.statsNumber, { color: colors.primary }]}>4</Text>
                            <Text style={[styles.statsLabel, { color: colors.subText }]}>Active Courses</Text>
                        </Card.Content>
                    </Card>
                    <Card style={[styles.statsCard, { backgroundColor: colors.headerBg }]}>
                        <Card.Content>
                            <Text style={[styles.statsNumber, { color: colors.primary }]}>85%</Text>
                            <Text style={[styles.statsLabel, { color: colors.subText }]}>Attendance</Text>
                        </Card.Content>
                    </Card>
                </View>

                {/* Menu Grid */}
                <View style={styles.menuGrid}>
                    {menuItems.map((item, index) => (
                        <Animated.View
                            key={item.title}
                            entering={FadeInDown.delay(index * 100).duration(600)}
                            style={styles.menuItem}
                        >
                            <TouchableOpacity
                                style={[styles.menuButton, { backgroundColor: colors.headerBg }]}
                                onPress={() => console.log(item.route)}
                            >
                                <IconButton
                                    icon={item.icon}
                                    size={32}
                                    iconColor={item.color}
                                    style={styles.menuIcon}
                                />
                                <Text style={[styles.menuText, { color: colors.text }]}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 50, // Space for footer
    },
    header: {
        padding: 20,
        paddingTop: 60,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
    },
    welcomeSection: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Outfit_600SemiBold',
        marginTop: 5,
    },
    roleText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginTop: 5,
        opacity: 0.7,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    statsCard: {
        width: '48%',
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    statsNumber: {
        fontSize: 24,
        fontFamily: 'Outfit_600SemiBold',
        textAlign: 'center',
    },
    statsLabel: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        marginTop: 5,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 15,
        paddingBottom: 80, // Add space for footer
    },
    menuItem: {
        width: '50%',
        padding: 8,
    },
    menuButton: {
        padding: 15,
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIcon: {
        margin: 0,
        marginBottom: 5,
    },
    menuText: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        textAlign: 'center',
        marginTop: 5,
    },
});
