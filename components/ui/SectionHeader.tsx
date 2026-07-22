import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badgeText?: string;
  badgeVariant?: 'blue' | 'red' | 'yellow' | 'green' | 'glass';
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeVariant = 'blue',
  title,
  highlightText,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col mb-12 md:mb-16', alignmentStyles[align], className)}>
      {badgeText && (
        <Badge variant={badgeVariant} className="mb-4">
          {badgeText}
        </Badge>
      )}

      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}{' '}
        {highlightText && (
          <span className="text-gradient-google bg-clip-text text-transparent">
            {highlightText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
