
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Initialize scroll animations with IntersectionObserver
  useEffect(() => {
    // Function to handle element visibility using IntersectionObserver
    const handleScrollAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Apply the is-visible class when element is in viewport
              entry.target.classList.add('is-visible');
            }
          });
        },
        { 
          threshold: 0.1,
          rootMargin: '0px 0px -10% 0px' // Trigger slightly before the element is fully visible
        }
      );
      
      // Target all elements with the appear-on-scroll class
      const elements = document.querySelectorAll('.appear-on-scroll');
      elements.forEach((el) => observer.observe(el));
      
      // Cleanup function to remove the observer
      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    };
    
    // Initialize the scroll animations
    const cleanup = handleScrollAnimations();
    
    return cleanup;
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
