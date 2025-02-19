import React from 'react';
import { 
    View, 
    ScrollView, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
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
        <ScrollView 
            style={[styles.container, { backgroundColor: colors.background }]}
            showsVerticalScrollIndicator={false}
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
                </View>
                {/* <LottieView
                    source={require('../../assets/animations/student-dashboard.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                /> */}
            </View>

            {/* Dashboard Menu */}
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
                            />
                            <Text style={[styles.menuText, { color: colors.text }]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </View>

            {/* Recent Activity Section */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Recent Activity
                </Text>
                <Card style={[styles.card, { backgroundColor: colors.headerBg }]}>
                    <Card.Content>
                        <Text style={{ color: colors.subText }}>No recent activity</Text>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
    },
    welcomeSection: {
        marginTop: 40,
    },
    welcomeText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Poppins_600SemiBold',
        marginTop: 5,
    },
    animation: {
        width: width * 0.5,
        height: width * 0.5,
        alignSelf: 'center',
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'space-between',
    },
    menuItem: {
        width: '48%',
        marginBottom: 15,
    },
    menuButton: {
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menuText: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        textAlign: 'center',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 15,
    },
    card: {
        borderRadius: 15,
    },
});

export default DashboardScreen;
