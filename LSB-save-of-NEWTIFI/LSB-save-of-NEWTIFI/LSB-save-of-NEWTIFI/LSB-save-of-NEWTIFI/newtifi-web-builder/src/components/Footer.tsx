import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-newtifi-navy text-white py-12 w-full">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/images/logo.png" 
                alt="NewTIFI Logo" 
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-gray-300 mt-4 font-light">
              NewTIFI A.s.b.l.<br />
              14 rue Jean-Pierre Biermann<br />
              L-1268 Luxembourg
            </p>
            <p className="text-xs text-gray-300 mt-2 font-light">
              <a href="mailto:info@newtifi.com" className="hover:text-newtifi-teal transition-colors">
                info@newtifi.com
              </a>
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-medium mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-xs text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-xs text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/connect" className="text-xs text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-xs text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Membership
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-medium mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-xs text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-xs text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-xs text-gray-400 font-light">
            &copy; {currentYear} NewTIFI A.s.b.l. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
