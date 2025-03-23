
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 bg-newtifi-navy shadow-md py-3"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/350fa426-ed3c-46f2-9542-778840d65e01.png" 
            alt="Newtifi Logo" 
            className="h-10" 
          />
          <span className="text-white text-xl font-light tracking-wider">NEWTIFI</span>
        </Link>
        
        {/* Navigation Links - Centered */}
        <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <Link 
            to="/" 
            className={cn("nav-link text-white", location.pathname === "/" && "text-newtifi-teal")}
          >
            Home
          </Link>
          <Link 
            to="/who-we-are" 
            className={cn("nav-link text-white", location.pathname === "/who-we-are" && "text-newtifi-teal")}
          >
            Who We Are
          </Link>
          <Link 
            to="/membership" 
            className={cn("nav-link text-white", location.pathname === "/membership" && "text-newtifi-teal")}
          >
            Membership
          </Link>
          <Link 
            to="/connect" 
            className={cn("nav-link text-white", location.pathname === "/connect" && "text-newtifi-teal")}
          >
            Connect
          </Link>
          <Link 
            to="/login" 
            className={cn("nav-link text-white", location.pathname === "/login" && "text-newtifi-teal")}
          >
            Login
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="p-2 text-white">
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
