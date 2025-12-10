"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * RippleButton Component
 * 
 * Button with ripple effect on click.
 * Glow effect on hover.
 * Enhanced animations.
 */
export default function RippleButton({
  children,
  onClick,
  className = "",
  href,
  target,
  rel,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples([...ripples, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick();
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(201, 169, 97, 0.4)", // Gold shadow
    },
    tap: {
      scale: 0.95,
    },
  };

  const baseClasses = `relative overflow-hidden ${className}`;

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={handleClick}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className={baseClasses}
      >
        {children}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
            animate={{
              width: 300,
              height: 300,
              x: ripple.x - 150,
              y: ripple.y - 150,
              opacity: [1, 0],
            }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className={baseClasses}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
          animate={{
            width: 300,
            height: 300,
            x: ripple.x - 150,
            y: ripple.y - 150,
            opacity: [1, 0],
          }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </motion.button>
  );
}

