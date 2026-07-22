'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-video',
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspectRatio} ${className}`}>
      {/* Curtain Reveal Layer */}
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] }}
        className="absolute inset-0 z-20 origin-right bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500"
      />

      {/* Image with zoom on load */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
