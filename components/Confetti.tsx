"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Confetti Component
 * 
 * Playful confetti animation for celebrations.
 * Can be triggered on page load or user interaction.
 */
interface ConfettiProps {
  trigger?: boolean;
  onComplete?: () => void;
}

export default function Confetti({ trigger = false, onComplete }: ConfettiProps) {
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    rotation: number;
    size: number;
  }>>([]);

  useEffect(() => {
    if (trigger) {
      // Create confetti particles
      const colors = ["#C9A961", "#1A2855", "#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF"];
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: Math.random() * 10 + 5,
      }));

      setConfetti(particles);

      // Clean up after animation
      const timer = setTimeout(() => {
        setConfetti([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!trigger || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            y: "110vh",
            x: `${particle.x + (Math.random() - 0.5) * 20}vw`,
            rotate: particle.rotation + 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "easeOut",
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

