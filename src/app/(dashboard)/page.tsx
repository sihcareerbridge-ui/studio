
'use client';

import { useUserRole } from '@/hooks/use-user-role';
import StudentDashboard from './student-dashboard';
import AdminDashboard from './admin-dashboard';
// Import other role-specific dashboards here
// import HostDashboard from './host-dashboard';

export default function DashboardPage() {
  const { role } = useUserRole();

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  if (role === 'student') {
    return <StudentDashboard />;
  }
  
  // if (role === 'host') {
  //   return <HostDashboard />;
  // }

  // Fallback for any other roles or if role is not set
  return <StudentDashboard />;
}
