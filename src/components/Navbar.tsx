
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrollPosition > 50 
          ? "bg-white bg-opacity-95 backdrop-blur-sm shadow-md py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-newtifi-navy">Newtifi</span>
        </Link>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={cn("nav-link", location.pathname === "/" && "text-newtifi-teal")}
          >
            Home
          </Link>
          <Link 
            to="/who-we-are" 
            className={cn("nav-link", location.pathname === "/who-we-are" && "text-newtifi-teal")}
          >
            Who We Are
          </Link>
          <Link 
            to="/membership" 
            className={cn("nav-link", location.pathname === "/membership" && "text-newtifi-teal")}
          >
            Membership
          </Link>
          <Link 
            to="/connect" 
            className={cn("nav-link", location.pathname === "/connect" && "text-newtifi-teal")}
          >
            Connect
          </Link>
          <Link 
            to="/login" 
            className={cn("nav-link", location.pathname === "/login" && "text-newtifi-teal")}
          >
            Login
          </Link>
        </nav>
        
        {/* Mobile Menu Button (Always hidden as requested - no hamburger menu) */}
        <div className="md:hidden">
          <button className="p-2 text-newtifi-navy">
            <span className="sr-only">Open menu</span>
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
