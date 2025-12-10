import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { eventConfig } from "@/config/eventConfig";

// Serif font for headings (elegant, premium feel)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Sans-serif font for body text (clean, modern)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Generate metadata from config
export const metadata: Metadata = {
  title: `${eventConfig.groomName} & ${eventConfig.brideName} - ${eventConfig.eventTitle}`,
  description: `${eventConfig.eventSubtext}. Join us on ${eventConfig.date} at ${eventConfig.venueName}, ${eventConfig.venueAddress}`,
  openGraph: {
    title: `${eventConfig.groomName} & ${eventConfig.brideName} - ${eventConfig.eventTitle}`,
    description: `${eventConfig.eventSubtext}. Join us on ${eventConfig.date} at ${eventConfig.venueName}`,
    type: "website",
    // Add your preview image URL here when available
    // images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${eventConfig.groomName} & ${eventConfig.brideName} - ${eventConfig.eventTitle}`,
    description: `${eventConfig.eventSubtext}`,
    // Add your preview image URL here when available
    // images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
