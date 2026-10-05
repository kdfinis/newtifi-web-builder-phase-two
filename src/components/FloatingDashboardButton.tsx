import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { Home } from 'lucide-react';

const FloatingDashboardButton: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useSimpleAuth();
  
  // Don't show on home page or if not authenticated
  if (location.pathname === '/' || !isAuthenticated) return null;
  
  // Don't show if already on dashboard
  if (location.pathname.startsWith('/dashboard')) return null;

  return (
    <Link
      to="/dashboard"
      className="fixed bottom-6 right-6 z-50 bg-newtifi-teal text-white p-4 rounded-full shadow-card transition-[background-color,box-shadow,transform] duration-150 ease-out-strong active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 fine:hover:bg-[#00aeb6] fine:hover:shadow-card-hover"
      aria-label="Go to Dashboard"
    >
      <Home className="h-6 w-6" />
    </Link>
  );
};

export default FloatingDashboardButton;
