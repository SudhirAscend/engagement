"use client";

import { useEffect } from "react";

/**
 * Analytics Component
 * 
 * Captures visitor details and interactions.
 * Privacy-friendly: Only collects anonymous analytics data.
 * 
 * Data Captured:
 * - Device type (mobile/tablet/desktop)
 * - Operating system
 * - Browser type and version
 * - Screen resolution
 * - Timezone
 * - Language
 * - Referrer (where they came from)
 * - Page views
 * - Time spent on page
 * - Scroll depth
 * - Click interactions
 * - Geographic location (approximate, IP-based)
 */
export default function Analytics() {
  useEffect(() => {
    // Capture visitor details
    const captureVisitorData = () => {
      const data = {
        // Device Information
        deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 
                    /Tablet|iPad/.test(navigator.userAgent) ? 'tablet' : 'desktop',
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        
        // Screen Information
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
        
        // Browser Information
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        
        // Time Information
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toISOString(),
        
        // Referrer
        referrer: document.referrer || 'direct',
        
        // Page Information
        url: window.location.href,
        path: window.location.pathname,
        
        // Connection (if available)
        connection: (navigator as any).connection ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt,
        } : null,
      };

      // Log to console (in development)
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Visitor Data Captured:', data);
      }

      // Send to analytics endpoint (optional - uncomment to enable)
      // sendToAnalytics(data);
      
      // Store in localStorage for session tracking
      const sessionData = {
        ...data,
        sessionId: getSessionId(),
        visitCount: getVisitCount(),
      };
      
      localStorage.setItem('visitor_session', JSON.stringify(sessionData));
    };

    // Function to send data to server (optional)
    const sendToAnalytics = async (data: any) => {
      try {
        const fullData = {
          ...data,
          pageViews: JSON.parse(localStorage.getItem('page_views') || '[]'),
          clicks: JSON.parse(localStorage.getItem('clicks') || '[]'),
          maxScrollDepth: parseInt(localStorage.getItem('max_scroll_depth') || '0'),
          timeOnPage: parseInt(localStorage.getItem('time_on_page') || '0'),
          visitCount: parseInt(localStorage.getItem('visit_count') || '0'),
        };
        
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullData),
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error('Analytics send error:', error);
      }
    };

    // Track page views
    const trackPageView = () => {
      const pageViewData = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
      };
      
      // Store page views
      const pageViews = JSON.parse(localStorage.getItem('page_views') || '[]');
      pageViews.push(pageViewData);
      localStorage.setItem('page_views', JSON.stringify(pageViews.slice(-50))); // Keep last 50
    };

    // Track scroll depth
    const trackScrollDepth = () => {
      let maxScroll = 0;
      const trackScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          localStorage.setItem('max_scroll_depth', maxScroll.toString());
        }
      };
      window.addEventListener('scroll', trackScroll);
      return () => window.removeEventListener('scroll', trackScroll);
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
      localStorage.setItem('time_on_page', timeSpent.toString());
    };

    // Track clicks
    const trackClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickData = {
        timestamp: new Date().toISOString(),
        element: target.tagName,
        id: target.id || null,
        className: target.className || null,
        text: target.textContent?.substring(0, 50) || null,
        href: (target as HTMLAnchorElement).href || null,
      };
      
      const clicks = JSON.parse(localStorage.getItem('clicks') || '[]');
      clicks.push(clickData);
      localStorage.setItem('clicks', JSON.stringify(clicks.slice(-100))); // Keep last 100
    };

    // Helper functions
    const getSessionId = () => {
      let sessionId = sessionStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('session_id', sessionId);
      }
      return sessionId;
    };

    const getVisitCount = () => {
      const count = parseInt(localStorage.getItem('visit_count') || '0') + 1;
      localStorage.setItem('visit_count', count.toString());
      return count;
    };

    // Initialize tracking
    captureVisitorData();
    trackPageView();
    trackScrollDepth();
    
    // Track clicks
    document.addEventListener('click', trackClicks);
    
    // Track time on page before unload
    window.addEventListener('beforeunload', trackTimeOnPage);

    // Cleanup
    return () => {
      document.removeEventListener('click', trackClicks);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, []);

  return null; // This component doesn't render anything
}

