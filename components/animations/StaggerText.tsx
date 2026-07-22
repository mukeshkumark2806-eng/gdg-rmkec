'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const StaggerText: React.FC<StaggerTextProps> = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.04,
  as: Component = 'span',
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="inline-block flex-wrap gap-[0.25em]"
      >
        {words.map((word, index) => (
          <motion.span key={index} variants={wordVariants} className="inline-block mr-[0.25em] origin-bottom">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
};
