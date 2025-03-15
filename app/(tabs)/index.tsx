import React from 'react';
import { useAuth } from '@/context/AuthContext';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TutorDashboard from '@/components/dashboard/TutorDashboard';

export default function DashboardScreen() {
    const { user } = useAuth();
    const isStudent = user?.role === 'student';

    return isStudent ? <StudentDashboard /> : <TutorDashboard />;
}
