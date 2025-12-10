"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/config/eventConfig";

/**
 * CountdownTimer Component
 * 
 * Live countdown timer to the event date.
 * Animated numbers with smooth transitions.
 */
export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Parse the event date from config
    const eventDate = new Date(eventConfig.calendarEvent.startDateTime);
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = eventDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex flex-wrap justify-center gap-4 sm:gap-6"
    >
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.7 + index * 0.1,
            type: "spring",
            stiffness: 200,
          }}
          className="text-center"
        >
          <motion.div
            key={unit.value}
            initial={{ scale: 1.2, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
            }}
            whileHover={{
              scale: 1.15,
              y: -10,
              rotate: [0, -5, 5, -5, 0],
              boxShadow: "0 20px 40px rgba(201, 169, 97, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
            }}
            className="bg-primary rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg cursor-pointer relative overflow-hidden group"
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-accent/20 rounded-2xl"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              key={unit.value}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent tabular-nums relative z-10"
            >
              {String(unit.value).padStart(2, "0")}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs sm:text-sm text-white/90 mt-1 uppercase tracking-wider font-medium relative z-10"
            >
              {unit.label}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

