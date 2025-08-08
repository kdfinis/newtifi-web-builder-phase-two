
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  fullWidth = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none',
    {
      'bg-newtifi-teal text-white hover:bg-opacity-90 shadow hover:shadow-md': variant === 'primary',
      'bg-white text-newtifi-navy border border-newtifi-navy hover:bg-newtifi-navy hover:text-white': variant === 'secondary',
      'bg-transparent border border-newtifi-teal text-newtifi-teal hover:bg-newtifi-teal hover:text-white': variant === 'outline',
      'px-3 py-1.5 text-base': size === 'sm',
      'px-5 py-2.5 text-base': size === 'md',
      'px-8 py-3.5 text-base': size === 'lg',
      'opacity-70 cursor-not-allowed': disabled,
      'w-full': fullWidth,
    },
    className
  );

  if (to) {
    return (
      <Link 
        to={to} 
        className={baseClasses}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a 
        href={href} 
        className={baseClasses} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </button>
  );
};

export default Button;
