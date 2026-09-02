'use client';

import React from 'react';
import { clsx } from 'clsx';

interface SignalDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SignalDots: React.FC<SignalDotsProps> = ({ className, size = 'md' }) => {
  const dotSize =
    size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : 'w-2 h-2';

  return (
    <div className={clsx('signal-dots', className)} aria-hidden="true">
      <span className={clsx('signal-dots__dot bg-[#4285F4]', dotSize)} />
      <span className={clsx('signal-dots__dot bg-[#EA4335]', dotSize)} />
      <span className={clsx('signal-dots__dot signal-dots__dot--out border-[#FBBC05]', dotSize)} />
      <span className={clsx('signal-dots__dot bg-[#34A853]', dotSize)} />
    </div>
  );
};
