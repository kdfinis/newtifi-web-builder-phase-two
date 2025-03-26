
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-newtifi-navy text-white py-8 w-full">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Company Info */}
          <div className="md:col-span-1">
            <Link to="/">
              <img 
                src="/lovable-uploads/350fa426-ed3c-46f2-9542-778840d65e01.png" 
                alt="NewTIFI Logo" 
                className="h-6 mb-4" 
              />
            </Link>
            <p className="text-[10px] text-gray-300 mt-3 font-light">
              NewTIFI A.s.b.l.<br />
              14 rue Jean-Pierre Biermann<br />
              L-1268 Luxembourg
            </p>
            <p className="text-[10px] text-gray-300 mt-2 font-light">
              <a href="mailto:info@newtifi.com" className="hover:text-newtifi-teal transition-colors">
                info@newtifi.com
              </a>
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-[10px] font-medium mb-3 uppercase tracking-wider">NAVIGATION</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/connect" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Membership
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Focus Areas */}
          <div className="md:col-span-1">
            <h3 className="text-[10px] font-medium mb-3 uppercase tracking-wider">FOCUS AREAS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#health-tech" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  HealthTech
                </Link>
              </li>
              <li>
                <Link to="/#food-tech" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  FoodTech
                </Link>
              </li>
              <li>
                <Link to="/#energy-tech" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  EnergyTech
                </Link>
              </li>
              <li>
                <Link to="/#fin-tech" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  FinTech
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="text-[10px] font-medium mb-3 uppercase tracking-wider">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-[10px] text-gray-300 hover:text-newtifi-teal transition-colors font-light">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-[10px] text-gray-400 font-light">
            &copy; {currentYear} NewTIFI A.s.b.l. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
