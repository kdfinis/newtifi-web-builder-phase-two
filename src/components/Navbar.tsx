import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { urlFactory } from '@/lib/urls/UrlFactory';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logout, isAuthenticated } = useSimpleAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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


  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first menu item when menu opens
      const firstMenuItem = menuRef.current?.querySelector('a');
      if (firstMenuItem) {
        (firstMenuItem as HTMLElement).focus();
      }
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-newtifi-navy transition-all duration-500 ease-out",
        isScrolled ? "h-[78px] shadow-md" : "h-[90px]",
        isAtTop && "animate-[bump_0.6s_ease-in-out]"
      )}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto h-full flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5" aria-label="NewTIFI Home">
          <img 
            src="/assets/images/logo.png" 
            alt="NewTIFI Logo" 
            className="h-[33px] md:h-[44px] w-auto"
            style={{ minHeight: '34px' }}
          />
                            <span
                    className="text-white text-xs md:text-base font-light hidden md:block whitespace-nowrap"
                  >
                    New Technologies & Investment Funds Institute
                  </span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          ref={menuButtonRef}
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-haspopup="true"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links - Desktop */}
        <nav 
          ref={menuRef}
          id="main-navigation"
          className={cn(
            "absolute left-1/2 transform -translate-x-1/2 translate-x-8 md:flex md:items-center md:space-x-6 text-base md:text-4xl font-medium tracking-wide",
            "fixed md:static top-[90px] left-0 w-full md:w-auto bg-newtifi-navy md:bg-transparent",
            "transition-all duration-300 ease-in-out",
            isMenuOpen ? "flex flex-col items-center py-4 space-y-4" : "hidden md:flex"
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          <Link 
            to="/" 
            className={cn(
              "nav-link text-white hover:text-newtifi-teal transition-colors text-center uppercase focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:ring-offset-2 focus:ring-offset-newtifi-navy rounded",
              location.pathname === "/" && "text-newtifi-teal"
            )}
            onClick={closeMenu}
            aria-current={location.pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>
          <Link 
            to="/who-we-are" 
            className={cn(
              "nav-link text-white hover:text-newtifi-teal transition-colors text-center uppercase focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:ring-offset-2 focus:ring-offset-newtifi-navy rounded",
              location.pathname === "/who-we-are" && "text-newtifi-teal"
            )}
            onClick={closeMenu}
            aria-current={location.pathname === "/who-we-are" ? "page" : undefined}
          >
            Who We Are
          </Link>
          <Link 
            to={urlFactory.getPublishingPath()} 
            className={cn(
              "nav-link text-white hover:text-newtifi-teal transition-colors text-center uppercase",
              location.pathname.startsWith("/publishing") && "text-newtifi-teal"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Publishing
          </Link>
          <Link 
            to="/membership" 
            className={cn(
              "nav-link text-white hover:text-newtifi-teal transition-colors text-center uppercase",
              location.pathname === "/membership" && "text-newtifi-teal"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Membership
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "nav-link text-white hover:text-newtifi-teal transition-colors text-center uppercase",
              location.pathname === "/contact" && "text-newtifi-teal"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="hidden md:block px-4 py-1.5 text-sm text-gray-500">Loading...</div>
          ) : isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-white">Hello, {user?.name || user?.email}</span>
              <Link 
                to="/dashboard" 
                className={cn(
                  "px-4 py-1.5 rounded-lg text-white hover:bg-newtifi-teal/90 transition-all duration-300 uppercase text-base font-medium tracking-wide",
                  location.pathname.startsWith('/dashboard') 
                    ? "bg-newtifi-teal ring-2 ring-newtifi-teal/50" 
                    : "bg-newtifi-teal"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-1.5 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-all duration-300 uppercase text-base font-medium tracking-wide"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className={cn(
                "hidden md:block px-4 py-1.5 rounded-lg bg-newtifi-teal text-white hover:bg-newtifi-teal/90 transition-all duration-300 uppercase",
                "text-base font-medium tracking-wide"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Auth Section */}
        {isAuthenticated ? (
          <div className="md:hidden space-y-2 mt-4">
            <div className="text-center text-sm text-gray-700 mb-2">
              Hello, {user?.name || user?.email}
            </div>
            <Link 
              to="/dashboard" 
              className="block w-full text-center px-4 py-2 rounded-lg bg-newtifi-teal text-white hover:bg-newtifi-teal/90 transition-all duration-300 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <button 
              onClick={() => { logout(); setIsMenuOpen(false); }}
              className="block w-full text-center px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-all duration-300 uppercase"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="md:hidden block w-full text-center px-4 py-2 rounded-lg bg-newtifi-teal text-white hover:bg-newtifi-teal/90 transition-all duration-300 mt-2 uppercase"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
