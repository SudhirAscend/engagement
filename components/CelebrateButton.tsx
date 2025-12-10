"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "./Confetti";

/**
 * CelebrateButton Component
 * 
 * Playful button that triggers confetti celebration.
 * Adds fun interactive element to the page.
 */
export default function CelebrateButton() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleCelebrate = () => {
    setIsCelebrating(true);
    setClickCount((prev) => prev + 1);
    setTimeout(() => setIsCelebrating(false), 3000);
  };

  return (
    <>
      <motion.button
        onClick={handleCelebrate}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        className="fixed top-20 right-4 sm:right-8 z-40 bg-accent text-primary px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-medium"
        aria-label="Celebrate"
      >
        <motion.span
          animate={isCelebrating ? { rotate: [0, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          🎉
        </motion.span>
        <span className="hidden sm:inline">Celebrate!</span>
        {clickCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            className="text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            {clickCount}
          </motion.span>
        )}
      </motion.button>

      <Confetti trigger={isCelebrating} />
    </>
  );
}

