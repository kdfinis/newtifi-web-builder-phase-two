
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
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/350fa426-ed3c-46f2-9542-778840d65e01.png" 
            alt="Newtifi Logo" 
            className="h-9" 
          />
        </Link>
        
        {/* Navigation Links - Now visible on all screen sizes */}
        <nav className="flex items-center space-x-4 md:space-x-8">
          <Link 
            to="/" 
            className={cn("nav-link text-white text-xs md:text-sm tracking-wide font-light", location.pathname === "/" && "text-newtifi-teal")}
          >
            Home
          </Link>
          <Link 
            to="/who-we-are" 
            className={cn("nav-link text-white text-xs md:text-sm tracking-wide font-light", location.pathname === "/who-we-are" && "text-newtifi-teal")}
          >
            Who We Are
          </Link>
          <Link 
            to="/connect" 
            className={cn("nav-link text-white text-xs md:text-sm tracking-wide font-light", location.pathname === "/connect" && "text-newtifi-teal")}
          >
            Contact
          </Link>
          <Link 
            to="/membership" 
            className={cn("nav-link text-white text-xs md:text-sm tracking-wide font-light", location.pathname === "/membership" && "text-newtifi-teal")}
          >
            Membership
          </Link>
          <Link 
            to="/login" 
            className={cn("nav-link text-white text-xs md:text-sm tracking-wide font-light ml-2 md:ml-4", location.pathname === "/login" && "text-newtifi-teal")}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
