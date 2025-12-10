"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveEventCardProps {
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
  details?: string;
}

/**
 * InteractiveEventCard Component
 * 
 * Glassmorphic card with tap/click to expand.
 * Smooth flip/reveal animations.
 * Shows more details on interaction.
 */
export default function InteractiveEventCard({
  icon,
  title,
  content,
  details,
}: InteractiveEventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="relative cursor-pointer perspective-1000"
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        className="glass rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden"
        whileHover={{
          boxShadow: "0 20px 40px rgba(201, 169, 97, 0.3)",
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        {/* Front Face */}
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center space-y-3 relative z-10"
            >
              <motion.div
                className="text-accent mb-2"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
              <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{content}</p>
              {details && (
                <p className="text-xs text-accent mt-2 font-medium">Tap for details</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center space-y-3 relative z-10"
            >
              <motion.div
                className="text-accent mb-2"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
              <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
              {details && (
                <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line">{details}</p>
              )}
              <p className="text-xs text-accent mt-2 font-medium">Tap to close</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

