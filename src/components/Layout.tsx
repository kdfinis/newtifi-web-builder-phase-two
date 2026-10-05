import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingDashboardButton from './FloatingDashboardButton';
import { usePerformance } from '@/hooks/usePerformance';
import CookieConsent from './CookieConsent';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { trackUserInteraction } = usePerformance();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackUserInteraction('route_change', { path: location.pathname });
  }, [location.pathname, trackUserInteraction]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-newtifi-navy">
      <a href="#main-content" className="sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-newtifi-teal focus:text-white focus:rounded-lg focus:outline-none focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:[clip:auto]">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 bg-white pt-[var(--nav-h)]">
        {children}
      </main>
      <Footer />
      <FloatingDashboardButton />
      <CookieConsent />
    </div>
  );
};

export default Layout;
