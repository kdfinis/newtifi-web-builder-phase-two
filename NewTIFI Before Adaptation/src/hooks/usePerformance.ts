import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  timeToInteractive: number;
  firstContentfulPaint: number;
}

export const usePerformance = () => {
  const measurePageLoad = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const timeToInteractive = navigation.domInteractive - navigation.fetchStart;
        
        // Only log in development
        if (import.meta.env.DEV) {
          console.log('Performance Metrics:', {
            pageLoadTime: `${pageLoadTime.toFixed(2)}ms`,
            timeToInteractive: `${timeToInteractive.toFixed(2)}ms`,
            totalTime: `${(navigation.loadEventEnd - navigation.fetchStart).toFixed(2)}ms`
          });
        }

        // Send to analytics in production
        if (import.meta.env.PROD === 'production') {
          // You can send these metrics to your analytics service
          console.log('Performance metrics logged to analytics service');
        }
      }
    }
  }, []);

  const measureFirstContentfulPaint = useCallback(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            // Only log in development
            if (import.meta.env.DEV) {
              console.log('First Contentful Paint:', `${entry.startTime.toFixed(2)}ms`);
            }
            
            // Send to analytics in production
            if (import.meta.env.PROD === 'production') {
              console.log('FCP logged to analytics service');
            }
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('PerformanceObserver not supported');
      }
    }
  }, []);

  const trackUserInteraction = useCallback((event: string, data?: Record<string, unknown>) => {
    if (import.meta.env.PROD === 'production') {
      // Track user interactions for analytics
      console.log('User Interaction:', event, data);
    }
  }, []);

  useEffect(() => {
    // Measure page load performance
    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
      return () => window.removeEventListener('load', measurePageLoad);
    }
  }, [measurePageLoad]);

  useEffect(() => {
    // Measure First Contentful Paint
    measureFirstContentfulPaint();
  }, [measureFirstContentfulPaint]);

  return {
    measurePageLoad,
    measureFirstContentfulPaint,
    trackUserInteraction
  };
};
