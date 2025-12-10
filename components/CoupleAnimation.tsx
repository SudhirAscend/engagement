"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * CoupleAnimation Component
 * 
 * Displays the couple illustration image with playful interactions.
 * 
 * On mobile: Positioned as a subtle background element (faded)
 * On desktop: Positioned on the right side of the hero section
 */
export default function CoupleAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Mobile: Dark and visible */}
      <motion.div
        className="md:hidden w-full h-64 relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isHovered ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
      >
        <Image
          src="/couple-image.png"
          alt="Govardan & Sowmitha"
          fill
          className="object-contain brightness-90 contrast-110"
          priority
          unoptimized
        />
        {clickCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
          >
            ❤️
          </motion.div>
        )}
      </motion.div>

      {/* Desktop: Side element */}
      <motion.div
        className="hidden md:block w-full max-w-md lg:max-w-lg relative aspect-square cursor-pointer"
        whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
        whileTap={{ scale: 0.95 }}
        animate={isHovered ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
      >
        <Image
          src="/couple-image.png"
          alt="Govardan & Sowmitha"
          fill
          className="object-contain"
          priority
          unoptimized
        />
        {clickCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl"
          >
            ❤️
          </motion.div>
        )}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-accent/10 rounded-full blur-xl"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
