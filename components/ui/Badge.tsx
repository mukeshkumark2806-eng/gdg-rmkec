import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'red' | 'yellow' | 'green' | 'outline' | 'glass';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide transition-colors';

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  const variantStyles = {
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(66,133,244,0.2)]',
    red: 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(234,67,53,0.2)]',
    yellow: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-[0_0_10px_rgba(251,188,5,0.2)]',
    green: 'bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(52,168,83,0.2)]',
    outline: 'bg-transparent text-gray-300 border border-white/20',
    glass: 'bg-white/5 text-gray-200 border border-white/10 backdrop-blur-sm',
  };

  return <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}>{children}</span>;
};
