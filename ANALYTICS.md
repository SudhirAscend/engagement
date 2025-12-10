# Analytics & Visitor Data Capture

## 📊 What Data Can Be Captured

The website now includes an analytics system that captures the following visitor information:

### 🖥️ Device Information
- **Device Type**: Mobile, Tablet, or Desktop
- **Operating System**: Windows, macOS, iOS, Android, etc.
- **Platform**: Detailed platform information
- **User Agent**: Full browser user agent string

### 📱 Screen & Display
- **Screen Resolution**: Full screen width and height
- **Viewport Size**: Browser window dimensions
- **Pixel Ratio**: Device pixel ratio (for retina displays)

### 🌐 Browser Information
- **Browser Type**: Chrome, Safari, Firefox, Edge, etc.
- **Browser Version**: Extracted from user agent
- **Language**: Primary language preference
- **Languages**: All preferred languages
- **Cookie Support**: Whether cookies are enabled
- **Online Status**: Whether device is online/offline

### 📍 Location & Network
- **Timezone**: Visitor's timezone (e.g., "Asia/Kolkata")
- **Approximate Location**: Based on IP address (requires external service)
- **Connection Type**: Network connection details (if available)
  - Effective connection type (4G, 3G, WiFi, etc.)
  - Download speed
  - Round-trip time (RTT)

### 🔗 Referral Information
- **Referrer**: Where the visitor came from
  - Direct visit (no referrer)
  - Social media (Facebook, Instagram, WhatsApp, etc.)
  - Search engines (Google, Bing, etc.)
  - Other websites
- **Source**: QR code, link, bookmark, etc.

### 📄 Page Interaction
- **Page Views**: All pages visited during session
- **Time on Page**: How long visitor stayed (in seconds)
- **Scroll Depth**: Maximum scroll percentage reached
- **Clicks**: All click interactions
  - Element clicked (button, link, image, etc.)
  - Element ID and class
  - Text content
  - Link URLs

### ⏱️ Session Information
- **Session ID**: Unique session identifier
- **Visit Count**: Number of times visitor has returned
- **Timestamp**: When data was captured
- **URL**: Current page URL
- **Path**: Current page path

## 🔒 Privacy & Storage

### Data Storage
- All data is stored **locally** in the visitor's browser (localStorage/sessionStorage)
- **No data is sent to external servers** by default
- Data persists across page refreshes but is cleared when browser cache is cleared

### Privacy Considerations
- **Anonymous**: No personally identifiable information (PII) is captured
- **Local Only**: Data stays on the visitor's device
- **GDPR Compliant**: No cookies or tracking pixels used
- **Opt-in**: Visitors can clear their data anytime

## 📤 How to Access Captured Data

### Option 1: Browser Console (Development)
In development mode, all captured data is logged to the browser console.

### Option 2: Programmatic Access
Use the utility functions in `utils/analyticsData.ts`:

```typescript
import { 
  getVisitorData, 
  getPageViews, 
  getClicks,
  exportAnalyticsData 
} from '@/utils/analyticsData';

// Get visitor session data
const visitorData = getVisitorData();

// Get all page views
const pageViews = getPageViews();

// Get all clicks
const clicks = getClicks();

// Export all data as JSON
const allData = exportAnalyticsData();
```

### Option 3: Browser DevTools
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Check Local Storage for:
   - `visitor_session` - Current visitor data
   - `page_views` - All page views
   - `clicks` - All click interactions
   - `max_scroll_depth` - Maximum scroll percentage
   - `time_on_page` - Time spent on page
   - `visit_count` - Number of visits

## 🚀 Viewing Analytics Data

### Admin Dashboard

Visit `/admin` to view all captured analytics data in a beautiful dashboard:

- **Visitor Information**: Device, screen, browser, location details
- **Engagement Metrics**: Time on page, scroll depth, clicks
- **Page Views**: Complete history of all page visits
- **Click Interactions**: Detailed log of all user clicks
- **Raw Data**: Full JSON export

**Features:**
- 🔄 Refresh data in real-time
- 📥 Export data as JSON file
- 📤 Send data to server
- 🗑️ Clear all data

### Access the Dashboard

Simply navigate to: `https://yoursite.com/admin`

## 📤 Sending Data to Server

### Option 1: Manual Send (Admin Dashboard)

1. Visit `/admin`
2. Click "📤 Send to Server" button
3. Data will be sent to `/api/analytics` endpoint

### Option 2: Automatic Send

To automatically send data when visitors arrive, uncomment the `sendToAnalytics` call in `components/Analytics.tsx`:

```typescript
// In captureVisitorData function, after storing data:
sendToAnalytics(data);
```

### API Endpoint

The API endpoint is available at `/api/analytics`:

**POST Request:**
```json
{
  "visitor": { ... },
  "pageViews": [ ... ],
  "clicks": [ ... ],
  "maxScrollDepth": 75,
  "timeOnPage": 120,
  "visitCount": 3
}
```

**Response:**
```json
{
  "success": true,
  "message": "Analytics data received successfully",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### Storing Data on Server

Edit `app/api/analytics/route.ts` to add your storage logic:

**Example: Save to Database (MongoDB)**
```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();
const db = client.db('analytics');
await db.collection('visits').insertOne(data);
```

**Example: Save to File**
```typescript
import fs from 'fs/promises';
await fs.writeFile(
  `./analytics/${Date.now()}.json`,
  JSON.stringify(data, null, 2)
);
```

**Example: Send to External Service**
```typescript
await fetch('https://api.your-analytics-service.com/events', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
  body: JSON.stringify(data),
});
```

## 📋 Example Captured Data

```json
{
  "deviceType": "mobile",
  "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)...",
  "platform": "iPhone",
  "screenWidth": 390,
  "screenHeight": 844,
  "viewportWidth": 390,
  "viewportHeight": 844,
  "pixelRatio": 3,
  "language": "en-US",
  "languages": ["en-US", "en"],
  "timezone": "Asia/Kolkata",
  "referrer": "https://wa.me/...",
  "url": "https://yoursite.com/",
  "sessionId": "session_1234567890_abc123",
  "visitCount": 1
}
```

## 🎯 Use Cases

This data can be used to:
- **Understand Audience**: Device types, locations, languages
- **Optimize Experience**: Screen sizes, connection speeds
- **Track Engagement**: Time on page, scroll depth, clicks
- **Measure Success**: Referral sources, visit frequency
- **Improve Design**: Most clicked elements, scroll patterns

## ⚠️ Important Notes

1. **IP-based Location**: Requires external geolocation service (not included)
2. **Browser Limitations**: Some data may not be available in all browsers
3. **Privacy Laws**: Ensure compliance with GDPR, CCPA, and local privacy laws
4. **Data Retention**: Data is stored locally and cleared when browser cache is cleared
5. **No Personal Data**: This system does NOT capture:
   - Names
   - Email addresses
   - Phone numbers
   - IP addresses (directly)
   - Any personally identifiable information

## 🛠️ Customization

To customize what data is captured, edit `components/Analytics.tsx` and modify the `captureVisitorData` function.

