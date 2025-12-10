"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { eventConfig } from "@/config/eventConfig";

/**
 * Gallery Component
 * 
 * Responsive image grid (3 columns desktop, 2 tablet, 1 mobile).
 * Placeholder images from service URLs.
 * Hover effects with scale animation.
 * Lightbox on click using Framer Motion.
 */
export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section
        ref={ref}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-center text-gray-900 mb-12"
          >
            Photo Gallery
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {eventConfig.galleryImages.map((imageUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[90vh]"
              >
                <Image
                  src={eventConfig.galleryImages[selectedImage]}
                  alt={`Gallery image ${selectedImage + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg object-contain"
                  unoptimized
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

