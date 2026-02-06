import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import MemberDashboard from './dashboards/MemberDashboard';
import ContributorDashboard from './dashboards/ContributorDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

export default function Dashboard() {
  const { user, loading } = useSimpleAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) { 
    window.location.href = '/login'; 
    return null; 
  }
  
  if (user.role === 'ADMIN') return <AdminDashboard />;
  if (user.role === 'CONTRIBUTOR') return <ContributorDashboard />;
  return <MemberDashboard />;
}
