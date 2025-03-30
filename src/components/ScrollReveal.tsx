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
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getTransform = () => {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        case 'none':
          return 'none';
        default:
          return `translateY(${distance}px)`;
      }
    };

    // Initial styles
    element.style.opacity = '0';
    element.style.transform = getTransform();
    element.style.transition = `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.transitionDelay = `${delay}ms`;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            
            if (once && !hasAnimated.current) {
              hasAnimated.current = true;
              observer.unobserve(element);
            }
          } else if (!once) {
            element.style.opacity = '0';
            element.style.transform = getTransform();
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, direction, distance, once, duration]);

  return (
    <div ref={elementRef} className={cn(className)}>
      {children}
    </div>
  );
};

export default ScrollReveal;
