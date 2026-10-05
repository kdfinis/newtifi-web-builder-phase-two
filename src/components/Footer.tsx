import React from 'react';
import { Link } from 'react-router-dom';
import { urlFactory } from '@/lib/urls/UrlFactory';

const linkClasses = 'text-sm text-white/70 transition-colors duration-150 ease-out-strong fine:hover:text-white';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-newtifi-navy py-14 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img src="/assets/images/logo.png" alt="NewTIFI Logo" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              NewTIFI A.s.b.l.
              <br />
              14 rue Jean-Pierre Biermann
              <br />
              L-1268 Luxembourg
            </p>
            <p className="mt-2">
              <a href={urlFactory.getEmailUrl('info@newtifi.com')} className={linkClasses}>
                info@newtifi.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={linkClasses}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className={linkClasses}>
                  Who we are
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClasses}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/membership" className={linkClasses}>
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className={linkClasses}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={linkClasses}>
                  Terms of service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className={linkClasses}>
                  Cookie policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">&copy; {currentYear} NewTIFI A.s.b.l. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
