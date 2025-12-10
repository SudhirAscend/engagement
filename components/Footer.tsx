"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/config/eventConfig";

/**
 * Footer Component
 * 
 * Minimal credit line: "Designed & Built by Digi Era Technologies"
 * Optional portfolio link.
 * Small font, subtle styling.
 */
export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-background border-t border-accent/20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm text-gray-500"
        >
          Designed & Built by{" "}
          {eventConfig.developerCredit.portfolioUrl ? (
            <a
              href={eventConfig.developerCredit.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-dark transition-colors underline"
            >
              {eventConfig.developerCredit.company}
            </a>
          ) : (
            <span className="text-gray-600">
              {eventConfig.developerCredit.company}
            </span>
          )}
        </motion.p>
      </div>
    </footer>
  );
}

