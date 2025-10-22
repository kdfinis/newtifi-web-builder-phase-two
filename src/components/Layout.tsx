
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import FloatingDashboardButton from './FloatingDashboardButton';
import { usePerformance } from '@/hooks/usePerformance';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { trackUserInteraction } = usePerformance();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track route changes for analytics
    trackUserInteraction('route_change', { path: location.pathname });
  }, [location.pathname, trackUserInteraction]);
  
  // Initialize scroll animations
  useEffect(() => {
    // Function to handle element visibility
    const handleScroll = () => {
      const elements = document.querySelectorAll('.appear-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          el.classList.add('is-visible');
        }
      });
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <div className="container mx-auto px-4 pt-4">
          <Breadcrumb />
        </div>
        {children}
      </div>
      <Footer />
      <FloatingDashboardButton />
    </div>
  );
};

export default Layout;
