
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-newtifi-navy text-white py-12 w-full">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold mb-4 block">Newtifi</Link>
            <p className="text-sm text-gray-300 mt-4">
              Building human-centered AI products, strategies, and systems.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-newtifi-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-sm text-gray-300 hover:text-newtifi-teal transition-colors">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-sm text-gray-300 hover:text-newtifi-teal transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/connect" className="text-sm text-gray-300 hover:text-newtifi-teal transition-colors">
                  Connect
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Focus Areas */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Focus Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#health-tech" className="text-sm text-gray-300 hover:text-newtifi-teal transition-colors">
                  HealthTech
                </Link>
              </li>
              <li>
                <Link to="/#food-tech" className="text-sm text-gray-300 hover:text-newtifi-teal transition-colors">
                  FoodTech
                </Link>
              </li>
              <li>
                <Link to="/#energy-tech" className="text-sm text-gray-300 hover:text-newtifi-teal transition-colors">
                  EnergyTech
                </Link>
              </li>
              <li>
                <Link to="/#fin-tech" className="text-sm text-gray-300 hover:text-newtifi-teal transition-colors">
                  FinTech
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-300">
              <p>123 AI Innovation St.</p>
              <p>San Francisco, CA 94105</p>
              <p className="mt-2">
                <a href="mailto:info@newtifi.com" className="hover:text-newtifi-teal transition-colors">
                  info@newtifi.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Newtifi. All rights reserved.
          </p>
          
          {/* Legal Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-newtifi-teal transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-newtifi-teal transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-xs text-gray-400 hover:text-newtifi-teal transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
