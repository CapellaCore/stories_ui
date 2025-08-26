// Performance monitoring utilities
export const measurePerformance = () => {
  // Measure Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      
      // Send to analytics if needed
      if (window.gtag) {
        window.gtag('event', 'LCP', {
          value: Math.round(lastEntry.startTime),
          event_category: 'Web Vitals'
        });
      }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // Measure First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'first-input') {
          const firstInputEntry = entry as PerformanceEventTiming;
          const fid = firstInputEntry.processingStart - firstInputEntry.startTime;
          console.log('FID:', fid);
          
          if (window.gtag) {
            window.gtag('event', 'FID', {
              value: Math.round(fid),
              event_category: 'Web Vitals'
            });
          }
        }
      });
    });
    
    observer.observe({ entryTypes: ['first-input'] });
  }

  // Measure Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as LayoutShift;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
      });
      
      console.log('CLS:', clsValue);
      
      if (window.gtag) {
        window.gtag('event', 'CLS', {
          value: Math.round(clsValue * 1000) / 1000,
          event_category: 'Web Vitals'
        });
      }
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
  }
};

// Measure page load time
export const measurePageLoad = () => {
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log('Page Load Time:', loadTime);
    
    if (window.gtag) {
      window.gtag('event', 'page_load_time', {
        value: Math.round(loadTime),
        event_category: 'Performance'
      });
    }
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Performance API type declarations
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  target?: EventTarget;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources?: LayoutShiftAttribution[];
}

interface LayoutShiftAttribution {
  node?: Node;
  currentRect?: DOMRectReadOnly;
  previousRect?: DOMRectReadOnly;
}
