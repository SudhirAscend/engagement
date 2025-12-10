"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { eventConfig } from "@/config/eventConfig";

/**
 * VenueInfo Component
 * 
 * Card layout with glassmorphism:
 * - Venue full address
 * - Nearby landmark
 * - Parking info
 * - "Open in Maps" button
 * 
 * Clean typography and spacing with glassmorphic design.
 */
export default function VenueInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 backdrop-blur-lg"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-8">
            Venue Information
          </h2>

          <div className="space-y-6 mb-8">
            {/* Venue Name */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {eventConfig.venueName}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {eventConfig.venueAddress}
              </p>
            </div>

            {/* Landmark */}
            {eventConfig.venueLandmark && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nearby Landmark
                </h3>
                <p className="text-gray-600">{eventConfig.venueLandmark}</p>
              </div>
            )}

            {/* Parking Info */}
            {eventConfig.parkingInfo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Parking
                </h3>
                <p className="text-gray-600">{eventConfig.parkingInfo}</p>
              </div>
            )}
          </div>

          {/* Open in Maps Button */}
          <motion.a
            href={eventConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-full font-medium text-base shadow-md hover:shadow-lg hover:bg-accent-dark transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Open in Maps</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
