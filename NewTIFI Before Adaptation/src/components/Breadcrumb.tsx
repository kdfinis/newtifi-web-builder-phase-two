import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable name
      let name = segment;
      if (segment === 'dashboard') name = 'Dashboard';
      else if (segment === 'profile') name = 'Profile';
      else if (segment === 'articles') name = 'Articles';
      else if (segment === 'auth') name = 'Authentication';
      else if (segment === 'login') name = 'Login';
      else if (segment === 'signup') name = 'Sign Up';
      else if (segment === 'forgot-password') name = 'Forgot Password';
      else if (segment === 'reset-password') name = 'Reset Password';
      else if (segment === 'connect') name = 'Connect';
      else if (segment === 'contact') name = 'Contact';
      else if (segment === 'privacy') name = 'Privacy Policy';
      else if (segment === 'terms') name = 'Terms of Service';
      else if (segment === 'cookies') name = 'Cookie Policy';
      else if (segment === 'publishing') name = 'Publishing';
      else if (segment === 'journals') name = 'Journals';
      else if (segment === 'investment-management') name = 'NewTIFI Investment Management Journal';
      else if (segment === 'restructuring-insolvency-journal') name = 'NewTIFI Restructuring & Insolvency Journal';
      
      breadcrumbs.push({
        name,
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page
  if (location.pathname === '/') return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
            )}
            {item.current ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
