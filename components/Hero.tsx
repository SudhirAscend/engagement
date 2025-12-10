"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/config/eventConfig";
import CoupleAnimation from "./CoupleAnimation";
import ActionButtons from "./ActionButtons";
import CountdownTimer from "./CountdownTimer";
import InteractiveEventCard from "./InteractiveEventCard";

/**
 * Hero Section Component
 * 
 * Compact hero layout - everything fits above the fold on mobile.
 * Interactive date/time/venue cards with tap animations.
 * Solid cream background.
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-0 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-background"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(26, 40, 85, 0.05) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />
      
      <div className="relative w-full max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-4 lg:space-y-6"
          >
            {/* Event Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              {eventConfig.eventTitle}
            </motion.p>

            {/* Couple Names */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="inline-block"
                  >
                    {eventConfig.groomName}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mx-2 sm:mx-4"
                  >
                    &amp;
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block"
                  >
                    {eventConfig.brideName}
                  </motion.span>
                </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0"
            >
              {eventConfig.eventSubtext}
            </motion.p>

            {/* Countdown Timer */}
            <div className="pt-2">
              <CountdownTimer />
            </div>

            {/* Interactive Event Cards - Compact Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4"
            >
              {/* Date Card */}
              <InteractiveEventCard
                icon={
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="Date"
                content={eventConfig.date.split(",")[0]} // Just the day
                details={eventConfig.date}
              />

              {/* Time Card */}
              <InteractiveEventCard
                icon={
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                title="Time"
                content={eventConfig.time}
                details={`Event starts at ${eventConfig.time}`}
              />

              {/* Venue Card */}
              <InteractiveEventCard
                icon={
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
                }
                title="Venue"
                content={eventConfig.venueName}
                details={`${eventConfig.venueName}\n${eventConfig.venueAddress}\n${eventConfig.venueLandmark || ""}`}
              />
            </motion.div>

            {/* Action Buttons - Removed (using sticky FAB on all devices) */}
          </motion.div>

          {/* Right Column: Animation (Desktop) / Top (Mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-first lg:order-last flex items-center justify-center"
          >
            <CoupleAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
