'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'google';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  magneticStrength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  magneticStrength = 0.35,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = e.clientX - (left + width / 2);
    const middleY = e.clientY - (top + height / 2);
    setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full select-none cursor-pointer overflow-hidden group';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-3 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_25px_rgba(66,133,244,0.4)] hover:shadow-[0_0_35px_rgba(66,133,244,0.7)] border border-blue-400/30',
    secondary:
      'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700/80 shadow-lg',
    outline:
      'bg-transparent border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-white',
    glass:
      'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 shadow-xl hover:border-white/30',
    google:
      'bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 hover:opacity-95 text-white shadow-[0_0_30px_rgba(66,133,244,0.5)] border border-white/20',
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.1 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {/* Background Hover Shine Accent */}
      <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full" />
    </motion.button>
  );
};
