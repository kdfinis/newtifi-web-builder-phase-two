import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(false);
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      if (scrollPosition === 0) {
        setIsAtTop(true);
        setTimeout(() => setIsAtTop(false), 600);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-newtifi-navy transition-all duration-500 ease-out",
        isScrolled ? "h-[78px] shadow-md" : "h-[90px]",
        isAtTop && "animate-[bump_0.6s_ease-in-out]"
      )}
    >
      <div className="container mx-auto px-8 h-full flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/350fa426-ed3c-46f2-9542-778840d65e01.png" 
            alt="Newtifi Logo" 
            className="h-10 w-auto"
            style={{ minHeight: '40px' }}
          />
        </Link>

        {/* Navigation Links - Centered */}
        <nav className="flex-1 flex items-center justify-center space-x-12 text-3xl font-medium tracking-wide">
          <Link 
            to="/" 
            className={cn(
              "main-nav-link text-white hover:text-newtifi-teal transition-all duration-450 ease-out hover:scale-105",
              location.pathname === "/" && "text-newtifi-teal"
            )}
          >
            Home
          </Link>
          <Link 
            to="/who-we-are" 
            className={cn(
              "main-nav-link text-white hover:text-newtifi-teal transition-all duration-450 ease-out hover:scale-105",
              location.pathname === "/who-we-are" && "text-newtifi-teal"
            )}
          >
            Who We Are
          </Link>
          <Link 
            to="/connect" 
            className={cn(
              "main-nav-link text-white hover:text-newtifi-teal transition-all duration-450 ease-out hover:scale-105",
              location.pathname === "/connect" && "text-newtifi-teal"
            )}
          >
            Contact
          </Link>
          <Link 
            to="/membership" 
            className={cn(
              "main-nav-link text-white hover:text-newtifi-teal transition-all duration-450 ease-out hover:scale-105",
              location.pathname === "/membership" && "text-newtifi-teal"
            )}
          >
            Membership
          </Link>
          <Link 
            to="/login" 
            className={cn(
              "main-nav-link text-white hover:text-newtifi-teal transition-all duration-450 ease-out hover:scale-105 ml-8",
              location.pathname === "/login" && "text-newtifi-teal"
            )}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
