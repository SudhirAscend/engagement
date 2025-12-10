/**
 * Analytics Data Utility
 * 
 * Functions to retrieve captured visitor data.
 * Use these functions to access the analytics data stored in localStorage.
 */

export interface VisitorData {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  userAgent: string;
  platform: string;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  pixelRatio: number;
  language: string;
  languages: string[];
  cookieEnabled: boolean;
  onLine: boolean;
  timezone: string;
  timestamp: string;
  referrer: string;
  url: string;
  path: string;
  sessionId: string;
  visitCount: number;
}

export interface PageView {
  timestamp: string;
  url: string;
  referrer: string;
}

export interface ClickData {
  timestamp: string;
  element: string;
  id: string | null;
  className: string | null;
  text: string | null;
  href: string | null;
}

/**
 * Get current visitor session data
 */
export function getVisitorData(): VisitorData | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('visitor_session');
  return data ? JSON.parse(data) : null;
}

/**
 * Get all page views
 */
export function getPageViews(): PageView[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('page_views');
  return data ? JSON.parse(data) : [];
}

/**
 * Get all click interactions
 */
export function getClicks(): ClickData[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('clicks');
  return data ? JSON.parse(data) : [];
}

/**
 * Get maximum scroll depth percentage
 */
export function getMaxScrollDepth(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('max_scroll_depth') || '0');
}

/**
 * Get time spent on page (in seconds)
 */
export function getTimeOnPage(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('time_on_page') || '0');
}

/**
 * Get visit count
 */
export function getVisitCount(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('visit_count') || '0');
}

/**
 * Export all analytics data as JSON
 */
export function exportAnalyticsData() {
  return {
    visitor: getVisitorData(),
    pageViews: getPageViews(),
    clicks: getClicks(),
    maxScrollDepth: getMaxScrollDepth(),
    timeOnPage: getTimeOnPage(),
    visitCount: getVisitCount(),
  };
}

/**
 * Clear all analytics data
 */
export function clearAnalyticsData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('visitor_session');
  localStorage.removeItem('page_views');
  localStorage.removeItem('clicks');
  localStorage.removeItem('max_scroll_depth');
  localStorage.removeItem('time_on_page');
  localStorage.removeItem('visit_count');
  sessionStorage.removeItem('session_id');
}

