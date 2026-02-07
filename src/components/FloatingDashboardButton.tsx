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
      className="fixed bottom-6 right-6 z-50 bg-newtifi-teal hover:bg-newtifi-teal/90 text-white p-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
      aria-label="Go to Dashboard"
    >
      <Home className="h-6 w-6" />
    </Link>
  );
};

export default FloatingDashboardButton;
