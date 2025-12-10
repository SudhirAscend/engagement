"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Timeline Component
 * 
 * Displays event timeline/schedule:
 * - Guest arrival
 * - Greetings & Photos
 * - Dinner
 * 
 * Horizontal timeline on desktop, vertical on mobile.
 * Minimal design with subtle animations on scroll.
 */
export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timelineItems = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Guest Arrival",
      time: "6:00 PM",
      description: "Welcome drinks & reception",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Greetings & Photos",
      time: "7:00 PM",
      description: "Meet the couple & photo session",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      title: "Dinner",
      time: "8:00 PM",
      description: "Buffet dinner service",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-serif font-bold text-center text-gray-900 mb-12"
        >
          Event Schedule
        </motion.h2>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Timeline Line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-300" />

            {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={
                    isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="flex flex-col items-center relative z-10 flex-1 cursor-pointer group"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.3, 
                      rotate: 360,
                      boxShadow: "0 20px 40px rgba(201, 169, 97, 0.4)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: { duration: 0.3 },
                      rotate: { duration: 0.6 },
                    }}
                    className="w-24 h-24 rounded-full bg-white border-4 border-primary flex items-center justify-center text-accent shadow-lg mb-4 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-accent/20 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div className="relative z-10">{item.icon}</motion.div>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-xl font-semibold text-gray-900 mb-1"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    className="text-gray-600 font-medium"
                  >
                    {item.time}
                  </motion.p>
                  {item.description && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={isInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                      className="text-sm text-gray-500 mt-1 overflow-hidden"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </motion.div>
              ))}
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-8">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center text-accent shadow-lg flex-shrink-0 cursor-pointer"
                  >
                    {item.icon}
                  </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-medium">{item.time}</p>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

