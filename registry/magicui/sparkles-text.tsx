'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SparkleType {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  duration: number;
  repeatDelay: number;
}

export interface SparklesTextProps {
  /** Text or children content to display with sparkles */
  children?: React.ReactNode;
  text?: string;
  /** Custom class name for text wrapper */
  className?: string;
  /** Number of sparkles generated around the text */
  sparklesCount?: number;
  /** Custom sparkle colors */
  colors?: {
    first: string;
    second: string;
  };
}

const DEFAULT_COLORS = {
  first: '#4285F4',
  second: '#FBBC05',
};

const SparkleIcon: React.FC<{
  color: string;
  size: number;
  delay: number;
  duration: number;
  repeatDelay: number;
  style: React.CSSProperties;
}> = ({ color, size, delay, duration, repeatDelay, style }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute select-none z-10 drop-shadow-[0_0_10px_rgba(251,188,5,0.7)]"
      style={style}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.25, 0],
        rotate: [0, 90, 180],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatDelay,
        delay,
        ease: 'easeInOut',
      }}
    >
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill={color}
      />
    </motion.svg>
  );
};

function generateSparkles(count: number, colors: { first: string; second: string }): SparkleType[] {
  const palette = ['#4285F4', '#FBBC05', '#EA4335', '#34A853', colors.first, colors.second];
  return Array.from({ length: count }).map((_, i) => {
    const seedX = Math.abs(Math.sin(i * 12.9898 + 1) * 100) % 1;
    const seedY = Math.abs(Math.cos(i * 78.233 + 2) * 100) % 1;
    const seedDelay = Math.abs(Math.sin(i * 45.164 + 3) * 100) % 1;
    const seedScale = Math.abs(Math.cos(i * 93.371 + 4) * 100) % 1;
    const seedDur = Math.abs(Math.sin(i * 61.829 + 5) * 100) % 1;
    const seedRepeat = Math.abs(Math.cos(i * 37.492 + 6) * 100) % 1;

    return {
      id: `sparkle-${i}`,
      x: `${seedX * 110 - 5}%`,
      y: `${seedY * 110 - 5}%`,
      color: palette[i % palette.length],
      delay: seedDelay * 1.5,
      scale: seedScale * 0.7 + 0.65,
      duration: seedDur * 1.1 + 1.1,
      repeatDelay: seedRepeat * 0.6 + 0.2,
    };
  });
}

export function SparklesText({
  children,
  text,
  className = '',
  sparklesCount = 8,
  colors = DEFAULT_COLORS,
}: SparklesTextProps) {
  const sparkles = React.useMemo(
    () => generateSparkles(sparklesCount, colors),
    [sparklesCount, colors]
  );
  const content = text || children;

  return (
    <span className={`relative inline-block overflow-visible ${className}`}>
      {sparkles.map((sparkle) => (
        <SparkleIcon
          key={sparkle.id}
          color={sparkle.color}
          size={Math.round(20 * sparkle.scale)}
          delay={sparkle.delay}
          duration={sparkle.duration}
          repeatDelay={sparkle.repeatDelay}
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        />
      ))}
      <span className="relative z-0 inline-block">{content}</span>
    </span>
  );
}

export default SparklesText;
