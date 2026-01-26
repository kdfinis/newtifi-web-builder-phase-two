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
  const publishingLinks = [
    { label: 'NewTIFI Publishing', to: urlFactory.getPublishingPath() },
    { label: 'NewTIFI Investment Management Journal', to: urlFactory.getJournalPath('investment-management') },
    { label: 'NewTIFI Restructuring & Insolvency Journal', to: urlFactory.getJournalPath('restructuring-insolvency-journal') }
  ];
  const isPublishingActive = location.pathname.startsWith("/publishing");

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
      <div className="container mx-auto h-full flex items-center justify-between relative px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-0" aria-label="NewTIFI Home">
          <img 
            src="/assets/images/logo.png" 
            alt="NewTIFI Logo" 
            className="h-8 sm:h-9 md:h-[44px] w-auto max-w-[150px] md:max-w-none object-contain"
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
          className="md:hidden text-white p-2 -mr-1"
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
            "fixed md:static top-[90px] left-0 w-full md:w-auto bg-newtifi-navy/95 md:bg-transparent backdrop-blur md:backdrop-blur-0",
            "px-6 md:px-0 pb-6 md:pb-0 border-b border-white/10 md:border-0",
            "transition-all duration-300 ease-in-out",
            isMenuOpen ? "flex flex-col items-start py-4 space-y-4" : "hidden md:flex"
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
          <div className="relative group w-full md:w-auto flex flex-col items-start md:items-center">
            <Link
              to={urlFactory.getPublishingPath()}
              className={cn(
                "nav-link text-white hover:text-newtifi-teal transition-colors text-center uppercase",
                isPublishingActive && "text-newtifi-teal"
              )}
              onClick={closeMenu}
              aria-current={isPublishingActive ? "page" : undefined}
              aria-haspopup="true"
            >
              Publishing
            </Link>
            <div className="hidden md:flex absolute top-full mt-2 w-72 flex-col rounded-2xl border border-gray-200 bg-white shadow-xl py-2 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition">
              {publishingLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-4 py-2 text-sm text-newtifi-navy hover:bg-newtifi-teal/10 hover:text-newtifi-teal transition-colors",
                    location.pathname === item.to && "text-newtifi-teal"
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {isMenuOpen && (
              <div className="md:hidden mt-2 w-full flex flex-col items-start gap-1 pl-2">
                {publishingLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "text-white/90 hover:text-newtifi-teal transition-colors text-sm uppercase",
                      location.pathname === item.to && "text-newtifi-teal"
                    )}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
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

          {/* Mobile Auth Section */}
          {isMenuOpen && (
            isAuthenticated ? (
              <div className="md:hidden w-full border-t border-white/10 pt-4 mt-2 space-y-2">
                <div className="text-left text-sm text-white/80">
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
            )
          )}
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

        
      </div>
    </header>
  );
};

export default Navbar;
