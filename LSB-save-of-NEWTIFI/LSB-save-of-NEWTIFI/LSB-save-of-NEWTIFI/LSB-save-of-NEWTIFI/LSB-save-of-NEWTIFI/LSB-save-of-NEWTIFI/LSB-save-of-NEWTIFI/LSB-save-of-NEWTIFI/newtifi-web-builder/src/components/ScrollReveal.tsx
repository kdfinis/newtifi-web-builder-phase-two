import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  duration?: number;
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 20,
  once = true,
  duration = 800,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const getTransformClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-[20px]';
      case 'down':
        return '-translate-y-[20px]';
      case 'left':
        return 'translate-x-[20px]';
      case 'right':
        return '-translate-x-[20px]';
      case 'none':
        return '';
      default:
        return 'translate-y-[20px]';
    }
  };

  return (
    <div 
      ref={elementRef} 
      className={cn(
        'appear-on-scroll transition-all duration-1000 ease-out',
        getTransformClass(),
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
