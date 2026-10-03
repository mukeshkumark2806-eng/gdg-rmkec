'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  shape?: 'pill' | 'box' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  surfaceClassName?: string;
  target?: string;
  rel?: string;
  rollText?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  href,
  onClick,
  shape = 'pill',
  size = 'md',
  className,
  surfaceClassName,
  target,
  rel,
  rollText = true,
  disabled = false,
  ariaLabel,
  type = 'button',
}) => {
  const shapeClass =
    shape === 'pill'
      ? 'rounded-full'
      : shape === 'circle'
      ? 'rounded-full aspect-square'
      : 'rounded-2xl';

  const sizeClass =
    shape === 'circle'
      ? size === 'sm'
        ? 'h-9 w-9'
        : size === 'lg'
        ? 'h-12 w-12 sm:h-14 sm:w-14'
        : 'h-11 w-11'
      : size === 'sm'
      ? 'px-4 py-1.5 text-xs'
      : size === 'lg'
      ? 'px-7 py-3 text-sm sm:px-9 sm:py-3.5 sm:text-base font-semibold'
      : 'px-6 py-2.5 text-xs sm:text-sm font-medium';

  const innerContent = (
    <>
      <span className="glow-btn__corners" aria-hidden="true" />
      <span
        className={clsx(
          'glow-btn__surface inline-flex items-center justify-center whitespace-nowrap text-paper transition-all duration-200 select-none',
          shapeClass,
          sizeClass,
          surfaceClassName,
          disabled && 'opacity-40 pointer-events-none'
        )}
      >
        {typeof children === 'string' && rollText ? (
          <span className="text-roll-wrapper">
            <span className="text-roll-top inline-block">{children}</span>
            <span className="text-roll-bottom inline-block" aria-hidden="true">
              {children}
            </span>
          </span>
        ) : (
          <span className="glow-btn__label inline-flex items-center gap-2">{children}</span>
        )}
      </span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('//');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={clsx('glow-btn group', shapeClass, className)}
          aria-label={ariaLabel}
        >
          {innerContent}
        </a>
      );
    }
    return (
      <Link href={href} className={clsx('glow-btn group', shapeClass, className)} aria-label={ariaLabel}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx('glow-btn group cursor-pointer', shapeClass, className)}
    >
      {innerContent}
    </button>
  );
};
