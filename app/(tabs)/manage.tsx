import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Avatar, Searchbar, IconButton, List } from 'react-native-paper';
import { useTheme } from '@/context/ThemeContext';
import Footer from '@/components/Footer';
import { userApi } from '@/services/userApis';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar, Platform } from 'react-native';

interface Student {
    _id: string;
    name: string;
    email: string;
    phone_no: string;
}

export default function ManageScreen() {
    const { colors } = useTheme();
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const data = await userApi.getAllStudents();
            setStudents(data);
            setFilteredStudents(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchStudents().finally(() => setRefreshing(false));
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = students.filter(student => 
            student.name.toLowerCase().includes(query.toLowerCase()) ||
            student.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background , paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <ScrollView 
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Header */}
                <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                    <Text style={[styles.title, { color: colors.text }]}>Student Management</Text>
                    <Text style={[styles.subtitle, { color: colors.subText }]}>
                        {students.length} Total Students
                    </Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Searchbar
                        placeholder="Search students..."
                        onChangeText={handleSearch}
                        value={searchQuery}
                        style={[styles.searchBar, { backgroundColor: colors.headerBg }]}
                        iconColor={colors.primary}
                        inputStyle={{ color: colors.text }}
                        placeholderTextColor={colors.subText}
                    />
                </View>

                {/* Students List */}
                <View style={styles.listContainer}>
                    {filteredStudents.map((student) => (
                        <Card 
                            key={student._id} 
                            style={[styles.studentCard, { backgroundColor: colors.headerBg }]}
                        >
                            <Card.Content style={styles.cardContent}>
                                <View style={styles.studentInfo}>
                                    <Avatar.Text 
                                        size={40} 
                                        label={student.name.substring(0, 2).toUpperCase()} 
                                        color={colors.primary}
                                    />
                                    <View style={styles.studentDetails}>
                                        <Text style={[styles.studentName, { color: colors.text }]}>
                                            {student.name}
                                        </Text>
                                        <Text style={[styles.studentEmail, { color: colors.subText }]}>
                                            {student.email}
                                        </Text>
                                    </View>
                                </View>
                                <IconButton
                                    icon="phone"
                                    iconColor={colors.primary}
                                    size={20}
                                    onPress={() => {/* Handle phone call */}}
                                />
                            </Card.Content>
                        </Card>
                    ))}
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
    scrollContent: {
        paddingBottom: 50,
    },
    header: {
        padding: 20,
        // paddingTop: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Outfit_600SemiBold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginTop: 5,
        opacity: 0.7,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginTop: -15,
        marginBottom: 20,
    },
    searchBar: {
        borderRadius: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    studentCard: {
        marginBottom: 12,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    studentDetails: {
        marginLeft: 15,
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        marginBottom: 2,
    },
    studentEmail: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        opacity: 0.7,
    },
}); 