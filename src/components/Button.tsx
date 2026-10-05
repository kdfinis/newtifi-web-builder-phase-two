import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'inverse' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-newtifi-teal text-white shadow-card fine:hover:bg-[#00aeb6]',
  secondary: 'bg-white text-newtifi-navy ring-1 ring-inset ring-newtifi-navy/20 fine:hover:ring-newtifi-navy/40 fine:hover:bg-gray-50',
  outline: 'bg-transparent text-newtifi-navy ring-1 ring-inset ring-newtifi-teal fine:hover:bg-newtifi-teal/10',
  inverse: 'bg-white text-newtifi-navy fine:hover:bg-white/90',
  ghost: 'bg-transparent text-newtifi-navy underline underline-offset-4 decoration-newtifi-teal fine:hover:decoration-newtifi-navy',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5',
  md: 'h-11 px-5',
  lg: 'h-12 px-6',
};

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  target,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  fullWidth = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-bold whitespace-nowrap',
    'transition-[background-color,color,box-shadow,transform,text-decoration-color] duration-150 ease-out-strong',
    'active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-newtifi-navy focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-60 cursor-not-allowed active:scale-100',
    fullWidth && 'w-full',
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} aria-describedby={ariaDescribedBy}>
        {children}
      </Link>
    );
  }

  if (href) {
    const resolvedTarget = target ?? (/^https?:\/\//.test(href) ? '_blank' : undefined);
    return (
      <a
        href={href}
        className={classes}
        target={resolvedTarget}
        rel={resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined}
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
      className={classes}
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
