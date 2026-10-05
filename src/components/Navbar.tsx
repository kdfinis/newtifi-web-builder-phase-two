import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { urlFactory } from '@/lib/urls/UrlFactory';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import Button from './Button';

const navLinkClasses = (active: boolean) =>
  cn(
    'relative py-2 text-sm transition-colors duration-150 ease-out-strong',
    'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-newtifi-teal',
    'after:transition-transform after:duration-200 after:ease-out-strong motion-reduce:after:transition-none',
    active
      ? 'text-white after:scale-x-100'
      : 'text-white/80 after:scale-x-0 fine:hover:text-white fine:hover:after:scale-x-100'
  );

const mobileLinkClasses = (active: boolean) =>
  cn(
    'flex min-h-[44px] items-center rounded-lg px-3 text-base transition-colors duration-150 ease-out-strong',
    active ? 'bg-white/10 text-white font-bold' : 'text-white/80 fine:hover:bg-white/5 fine:hover:text-white'
  );

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logout, isAuthenticated } = useSimpleAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const publishingLinks = [
    { label: 'NewTIFI Publishing', to: urlFactory.getPublishingPath() },
    { label: 'NewTIFI Investment Management Journal', to: urlFactory.getJournalPath('investment-management') },
    { label: 'NewTIFI Restructuring & Insolvency Journal', to: urlFactory.getJournalPath('restructuring-insolvency-journal') },
  ];
  const isPublishingActive = location.pathname.startsWith('/publishing');
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 z-50 h-[var(--nav-h)] w-full bg-newtifi-navy transition-shadow duration-200 ease-out-strong',
        (isScrolled || isMenuOpen) && 'shadow-nav'
      )}
      role="banner"
    >
      <div className="container mx-auto flex h-full items-center justify-between gap-6 px-4 md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="NewTIFI home">
          <img
            src="/assets/images/logo.png"
            alt="NewTIFI Logo"
            className="h-8 w-auto max-w-[150px] object-contain sm:h-9 md:h-[44px] md:max-w-none"
          />
          <span className="hidden whitespace-nowrap text-sm text-white/90 xl:block">
            New Technologies & Investment Funds Institute
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          <Link to="/" className={navLinkClasses(isActive('/'))} aria-current={isActive('/') ? 'page' : undefined}>
            Home
          </Link>
          <Link
            to="/who-we-are"
            className={navLinkClasses(isActive('/who-we-are'))}
            aria-current={isActive('/who-we-are') ? 'page' : undefined}
          >
            Who we are
          </Link>
          <div className="group relative">
            <Link
              to={urlFactory.getPublishingPath()}
              className={navLinkClasses(isPublishingActive)}
              aria-current={isPublishingActive ? 'page' : undefined}
              aria-haspopup="true"
            >
              Publishing
            </Link>
            <div
              className={cn(
                'surface-card absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 origin-top py-2',
                'pointer-events-none scale-[0.97] opacity-0',
                'transition-[opacity,transform] duration-150 ease-out-strong motion-reduce:transition-none',
                'group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100',
                'group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100'
              )}
            >
              {publishingLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'block px-4 py-2.5 text-sm text-newtifi-navy transition-colors duration-150 ease-out-strong fine:hover:bg-gray-50',
                    isActive(item.to) && 'font-bold'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/membership"
            className={navLinkClasses(isActive('/membership'))}
            aria-current={isActive('/membership') ? 'page' : undefined}
          >
            Membership
          </Link>
          <Link
            to="/contact"
            className={navLinkClasses(isActive('/contact'))}
            aria-current={isActive('/contact') ? 'page' : undefined}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <span className="text-sm text-white/60">Loading</span>
          ) : isAuthenticated ? (
            <>
              <span className="hidden text-sm text-white/80 lg:inline">Hello, {user?.name || user?.email}</span>
              <Button to="/dashboard" size="sm">
                Dashboard
              </Button>
              <button
                type="button"
                onClick={logout}
                className="h-9 rounded-lg px-3.5 text-sm text-white/80 ring-1 ring-inset ring-white/25 transition-[color,box-shadow,transform] duration-150 ease-out-strong active:scale-[0.97] motion-reduce:transition-none fine:hover:text-white fine:hover:ring-white/50"
              >
                Log out
              </button>
            </>
          ) : (
            <Button to="/login" size="sm">
              Sign in
            </Button>
          )}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition-[background-color,transform] duration-150 ease-out-strong active:scale-[0.97] motion-reduce:transition-none fine:hover:bg-white/10 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] overflow-y-auto border-t border-white/10 bg-newtifi-navy px-4 pb-8 pt-4 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <Link to="/" className={mobileLinkClasses(isActive('/'))} onClick={closeMenu}>
              Home
            </Link>
            <Link to="/who-we-are" className={mobileLinkClasses(isActive('/who-we-are'))} onClick={closeMenu}>
              Who we are
            </Link>
            {publishingLinks.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(mobileLinkClasses(isActive(item.to)), index > 0 && 'pl-6 text-sm')}
                onClick={closeMenu}
              >
                {index === 0 ? 'Publishing' : item.label}
              </Link>
            ))}
            <Link to="/membership" className={mobileLinkClasses(isActive('/membership'))} onClick={closeMenu}>
              Membership
            </Link>
            <Link to="/contact" className={mobileLinkClasses(isActive('/contact'))} onClick={closeMenu}>
              Contact
            </Link>
          </nav>
          <div className="mt-6 border-t border-white/10 pt-6">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-white/70">Hello, {user?.name || user?.email}</p>
                <Button to="/dashboard" fullWidth>
                  Dashboard
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="h-11 w-full rounded-lg text-sm text-white ring-1 ring-inset ring-white/25 transition-transform duration-150 ease-out-strong active:scale-[0.97] motion-reduce:transition-none"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Button to="/login" fullWidth>
                Sign in
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
