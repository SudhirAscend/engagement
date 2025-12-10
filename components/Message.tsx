"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { eventConfig } from "@/config/eventConfig";

/**
 * Message Component
 * 
 * Short message from the couple with modern animations.
 * Minimal, elegant styling with interactive elements.
 */
export default function Message() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = eventConfig.coupleMessage.split(" ");

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-6"
        >
          <motion.svg
            className="w-12 h-12 text-accent mx-auto"
            fill="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 9.59-9.57 1.856 0 3.727.425 5.393 1.234v-5.155c-1.657-.515-3.428-.799-5.393-.799-5.525 0-9.977 4.353-9.977 9.714v7.391h-9.017v7.391h9.017zm-14.017 0h9v-7.391h-9v7.391z" />
          </motion.svg>
        </motion.div>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-serif italic"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ scale: 1.1, color: "#C9A961" }}
              className="inline-block mr-2 cursor-default"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 font-serif text-lg sm:text-xl text-gray-600"
        >
          — {eventConfig.groomName} & {eventConfig.brideName}
        </motion.p>
      </div>
    </motion.section>
  );
}
