import React from 'react';

interface GDGLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  /** 'light' = dark text (for light backgrounds), 'dark' = light text (for dark bgs) */
  theme?: 'light' | 'dark';
}

export const GDGLogo: React.FC<GDGLogoProps> = ({
  className = '',
  size = 36,
  showText = true,
  theme = 'light',
}) => {
  const primaryText = theme === 'dark' ? '#E8EAED' : '#1A1A2E';
  const secondaryText = theme === 'dark' ? '#8B949E' : '#5F6B7A';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official 4-Color GDG Logo Mark */}
      <svg
        width={size}
        height={Math.round((size * 48) / 74)}
        viewBox="0 0 74 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Blue Left Bracket */}
        <path d="M22 6L4 24L22 42L29 35L17 24L29 13L22 6Z" fill="#4285F4" />
        {/* Red Top Bar */}
        <path d="M33 6L57 6L45 17L21 17L33 6Z" fill="#EA4335" />
        {/* Yellow Right Bracket */}
        <path d="M45 42L63 24L45 6L52 6L70 24L52 42L45 42Z" fill="#FBBC05" />
        {/* Green Bottom Bar */}
        <path d="M25 42L49 42L37 31L13 31L25 42Z" fill="#34A853" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="text-sm sm:text-[15px] font-bold tracking-tight"
            style={{ color: primaryText, fontFamily: 'var(--font-heading)', lineHeight: 1.25 }}
          >
            GDG RMKEC
          </span>
          <span
            className="text-[10px] font-medium tracking-wide mt-0.5"
            style={{ color: secondaryText, letterSpacing: '0.03em' }}
          >
            Google Developer Group
          </span>
        </div>
      )}
    </div>
  );
};
