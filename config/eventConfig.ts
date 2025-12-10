/**
 * Event Configuration
 * 
 * Customize all event details here. This is the single source of truth
 * for all event information displayed on the invitation website.
 */

export interface EventConfig {
  // Couple Information
  groomName: string;
  brideName: string;
  
  // Event Details
  eventTitle: string; // e.g., "Reception Evening" or "Reception Gathering"
  eventSubtext: string; // Short one-line description
  
  // Date & Time
  date: string; // Full date text, e.g., "Friday, 27 December 2025"
  time: string; // Time text, e.g., "6:30 PM onwards"
  
  // Venue Information
  venueName: string; // e.g., "The Residency Towers"
  venueAddress: string; // Full address
  venueLandmark?: string; // Nearby landmark (optional)
  parkingInfo?: string; // Parking information (optional)
  
  // Contact & Links
  mapsUrl: string; // Google Maps URL
  whatsappNumber: string; // WhatsApp number (with country code, no +)
  phoneNumber: string; // Phone number (with country code, no +)
  
  // Gallery
  galleryImages: string[]; // Array of image URLs
  
  // Message from Couple
  coupleMessage: string;
  
  // Developer Credit
  developerCredit: {
    company: string;
    portfolioUrl?: string; // Optional portfolio link
  };
  
  // Calendar Event Details (for .ics generation)
  calendarEvent: {
    startDateTime: string; // ISO 8601 format: "2025-12-27T18:30:00"
    endDateTime: string; // ISO 8601 format: "2025-12-27T22:30:00"
    description: string; // Event description for calendar
  };
}

// ============================================
// CUSTOMIZE ALL VALUES BELOW
// ============================================

export const eventConfig: EventConfig = {
  // Couple names
  groomName: "Govardan",
  brideName: "Sowmitha",
  
  // Event title and subtext
  eventTitle: "Reception Evening",
  eventSubtext: "Invite you to an evening of celebration with clients, colleagues & well-wishers",
  
  // Date and time
  date: "Saturday, 13 December 2025",
  time: "6:00 PM to 9:00 PM IST",
  
  // Venue details
  venueName: "Copper Kitchen",
  venueAddress: "406, Grand Southern Trunk Rd, Chromepet, Chennai, Tamil Nadu",
  venueLandmark: "Near Chromepet Railway Station",
  parkingInfo: "Parking available at venue premises",
  
  // Contact information - Brother of Groom
  mapsUrl: "https://maps.google.com/?q=Copper+Kitchen+Chromepet+Chennai+Tamil+Nadu",
  whatsappNumber: "919597654508", // Format: country code + number (no + or spaces)
  phoneNumber: "919597654508", // Format: country code + number (no + or spaces)
  
  // Gallery images - Replace with actual image URLs
  // Using placeholder service URLs - replace with your actual images
  galleryImages: [
    "https://placehold.co/800x600/E8E8E8/999999?text=Photo+1",
    "https://placehold.co/800x600/E8E8E8/999999?text=Photo+2",
    "https://placehold.co/800x600/E8E8E8/999999?text=Photo+3",
    "https://placehold.co/800x600/E8E8E8/999999?text=Photo+4",
    "https://placehold.co/800x600/E8E8E8/999999?text=Photo+5",
    "https://placehold.co/800x600/E8E8E8/999999?text=Photo+6",
  ],
  
  // Message from couple - UPDATE THIS
  coupleMessage: "We are grateful for your support in our professional journey. Your presence at our reception means a lot to us.",
  
  // Developer credit
  developerCredit: {
    company: "Digi Era Technologies",
    portfolioUrl: "https://digieratech.com", // Optional - update or remove if not needed
  },
  
  // Calendar event details
  calendarEvent: {
    startDateTime: "2025-12-13T18:00:00+05:30", // ISO 8601 format with IST timezone
    endDateTime: "2025-12-13T21:00:00+05:30", // ISO 8601 format with IST timezone
    description: "Reception Evening - Join us for an evening of celebration with Govardan & Sowmitha",
  },
};

