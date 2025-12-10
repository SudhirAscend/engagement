"use client";

import { useEffect, useState } from "react";
import Confetti from "./Confetti";

/**
 * WelcomeConfetti Component
 * 
 * Triggers confetti animation once on page load.
 * Adds a celebratory welcome effect.
 */
export default function WelcomeConfetti() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti after a short delay on page load
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <Confetti trigger={showConfetti} />;
}

