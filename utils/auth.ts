/**
 * Authentication Utilities
 * 
 * Helper functions for admin authentication.
 */

const ADMIN_EMAIL = "sdhmg@gmail.com";
const ADMIN_PASSWORD = "AscendDigital@1923";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("admin_token");
  const email = localStorage.getItem("admin_email");
  const loginTime = localStorage.getItem("admin_login_time");

  if (!token || !email || !loginTime) {
    return false;
  }

  // Check if session is still valid
  const timeDiff = Date.now() - parseInt(loginTime);
  if (timeDiff > SESSION_DURATION) {
    // Session expired
    clearAuth();
    return false;
  }

  // Verify email matches
  return email === ADMIN_EMAIL;
}

/**
 * Authenticate user with email and password
 */
export function authenticate(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = btoa(`${email}:${Date.now()}`);
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_email", email);
    localStorage.setItem("admin_login_time", Date.now().toString());
    return true;
  }
  return false;
}

/**
 * Clear authentication data
 */
export function clearAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_email");
  localStorage.removeItem("admin_login_time");
}

/**
 * Get current authenticated user email
 */
export function getCurrentUser(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_email");
}

/**
 * Get session time remaining (in milliseconds)
 */
export function getSessionTimeRemaining(): number {
  if (typeof window === "undefined") return 0;

  const loginTime = localStorage.getItem("admin_login_time");
  if (!loginTime) return 0;

  const timeDiff = Date.now() - parseInt(loginTime);
  return Math.max(0, SESSION_DURATION - timeDiff);
}

