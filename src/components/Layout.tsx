
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import FloatingDashboardButton from './FloatingDashboardButton';
import { usePerformance } from '@/hooks/usePerformance';
import CookieConsent from './CookieConsent';

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
    <div className="flex flex-col min-h-screen bg-white text-newtifi-navy">
      <a href="#main-content" className="sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-newtifi-teal focus:text-white focus:rounded-lg focus:outline-none focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:[clip:auto]">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 pt-4">
          <Breadcrumb />
        </div>
        {children}
      </main>
      <Footer />
      <FloatingDashboardButton />
      <CookieConsent />
    </div>
  );
};

export default Layout;
