
import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 20,
  once = true,
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
    element.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
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
  }, [delay, direction, distance, once]);

  return (
    <div ref={elementRef} className={cn(className)}>
      {children}
    </div>
  );
};

export default ScrollReveal;
