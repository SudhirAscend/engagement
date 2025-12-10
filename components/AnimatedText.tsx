"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * AnimatedText Component
 * 
 * Modern text animation with letter-by-letter reveal.
 */
export default function AnimatedText({ children, className = "", delay = 0 }: AnimatedTextProps) {
  const text = String(children);
  const letters = text.split("");

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

