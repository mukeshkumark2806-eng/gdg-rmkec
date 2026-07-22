'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'red' | 'yellow' | 'green' | 'none';
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  hoverEffect = true,
  onClick,
}) => {
  const glowStyles = {
    blue: 'hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(66,133,244,0.25)]',
    red: 'hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(234,67,53,0.25)]',
    yellow: 'hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(251,188,5,0.25)]',
    green: 'hover:border-green-500/40 hover:shadow-[0_0_30px_rgba(52,168,83,0.25)]',
    none: '',
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 overflow-hidden',
        hoverEffect && glowStyles[glowColor],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Glow highlight overlay */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-100" />
      {children}
    </motion.div>
  );
};
