"use client";

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  getVisitorData,
  getPageViews,
  getClicks,
  getMaxScrollDepth,
  getTimeOnPage,
  getVisitCount,
  exportAnalyticsData,
  clearAnalyticsData,
} from "@/utils/analyticsData";

/**
 * Admin Dashboard
 * 
 * View all captured analytics data.
 * Protected route - requires authentication.
 * Accessible at /admin
 */
export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [visitorData, setVisitorData] = useState<any>(null);
  const [pageViews, setPageViews] = useState<any[]>([]);
  const [clicks, setClicks] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("admin_token");
      const email = localStorage.getItem("admin_email");
      const loginTime = localStorage.getItem("admin_login_time");

      if (token && email && loginTime) {
        // Check if session is still valid (24 hours)
        const timeDiff = Date.now() - parseInt(loginTime);
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff < 24 && email === "sdhmg@gmail.com") {
          setIsAuthenticated(true);
        } else {
          // Session expired or invalid
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_email");
          localStorage.removeItem("admin_login_time");
          router.push("/admin/login");
        }
      } else {
        router.push("/admin/login");
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_login_time");
    router.push("/admin/login");
  };

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  const loadData = () => {
    setVisitorData(getVisitorData());
    setPageViews(getPageViews());
    setClicks(getClicks());
  };

  const handleExport = () => {
    const data = exportAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendToServer = async () => {
    const data = exportAnalyticsData();
    try {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("✅ Data sent to server successfully!");
      } else {
        alert("❌ Failed to send data. Check server configuration.");
      }
    } catch (error) {
      alert("❌ Error sending data. Make sure the API endpoint is configured.");
      console.error("Error:", error);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all analytics data?")) {
      clearAnalyticsData();
      setRefreshKey((prev) => prev + 1);
      alert("✅ Analytics data cleared!");
    }
  };

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (handled by useEffect)
  if (!isAuthenticated) {
    return null;
  }

  if (!visitorData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No analytics data found.</p>
          <p className="text-sm text-gray-500">Visit the main page to start collecting data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">View captured visitor data and interactions</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            🚪 Logout
          </button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <button
            onClick={loadData}
            className="px-4 py-2 bg-accent text-primary rounded-lg font-medium hover:bg-accent-dark transition-colors"
          >
            🔄 Refresh Data
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            📥 Export JSON
          </button>
          <button
            onClick={handleSendToServer}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            📤 Send to Server
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            🗑️ Clear Data
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitor Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">Visitor Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Device Type:</span>
                <p className="font-medium">{visitorData.deviceType}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Platform:</span>
                <p className="font-medium">{visitorData.platform}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Screen Resolution:</span>
                <p className="font-medium">{visitorData.screenWidth} × {visitorData.screenHeight}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Viewport:</span>
                <p className="font-medium">{visitorData.viewportWidth} × {visitorData.viewportHeight}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Language:</span>
                <p className="font-medium">{visitorData.language}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Timezone:</span>
                <p className="font-medium">{visitorData.timezone}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Referrer:</span>
                <p className="font-medium break-all">{visitorData.referrer || "Direct"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Visit Count:</span>
                <p className="font-medium">{getVisitCount()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Session ID:</span>
                <p className="font-medium text-xs break-all">{visitorData.sessionId}</p>
              </div>
            </div>
          </motion.div>

          {/* Engagement Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">Engagement Metrics</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Time on Page:</span>
                <p className="font-medium">{getTimeOnPage()} seconds</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Max Scroll Depth:</span>
                <p className="font-medium">{getMaxScrollDepth()}%</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Page Views:</span>
                <p className="font-medium">{pageViews.length}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Clicks:</span>
                <p className="font-medium">{clicks.length}</p>
              </div>
            </div>
          </motion.div>

          {/* Page Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2"
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">Page Views ({pageViews.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Timestamp</th>
                    <th className="text-left py-2">URL</th>
                    <th className="text-left py-2">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {pageViews.slice().reverse().map((view, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{new Date(view.timestamp).toLocaleString()}</td>
                      <td className="py-2 break-all">{view.url}</td>
                      <td className="py-2 break-all">{view.referrer || "Direct"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Click Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2"
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">Click Interactions ({clicks.length})</h2>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b">
                    <th className="text-left py-2">Timestamp</th>
                    <th className="text-left py-2">Element</th>
                    <th className="text-left py-2">Text</th>
                    <th className="text-left py-2">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {clicks.slice().reverse().map((click, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{new Date(click.timestamp).toLocaleString()}</td>
                      <td className="py-2">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{click.element}</span>
                      </td>
                      <td className="py-2 max-w-xs truncate">{click.text || "-"}</td>
                      <td className="py-2 max-w-xs truncate break-all">{click.href || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Raw Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2"
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">Raw Data (JSON)</h2>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-xs">
              {JSON.stringify(exportAnalyticsData(), null, 2)}
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

