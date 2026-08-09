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
        height={Math.round((size * 124.639) / 250.828)}
        viewBox="2.586 66.379 250.828 124.639"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <g fill="none" fillRule="evenodd">
          <path
            d="m102.907 106.981-66.897 40.034c-9.6 5.83-22.009 2.773-27.716-6.83-5.708-9.601-2.552-22.112 7.048-27.942l66.897-40.034c9.6-5.83 22.009-2.773 27.716 6.83s2.552 22.112-7.048 27.942z"
            fill="#EA4335"
          />
          <path
            d="m82.153 185.617-66.182-38.053c-9.742-5.4-13.214-17.764-7.754-27.614s17.784-13.457 27.527-8.057l66.182 38.054c9.743 5.4 13.214 17.763 7.754 27.613s-17.784 13.458-27.527 8.057z"
            fill="#4285F4"
          />
          <path
            d="m173.847 185.617 66.182-38.053c9.742-5.4 13.214-17.764 7.754-27.614s-17.784-13.457-27.527-8.057l-66.182 38.054c-9.743 5.4-13.214 17.763-7.754 27.613s17.784 13.458 27.527 8.057z"
            fill="#FBBC04"
          />
          <path
            d="m153.093 106.981 66.897 40.034c9.6 5.83 22.009 2.773 27.716-6.83 5.708-9.601 2.552-22.112-7.048-27.942l-66.897-40.034c-9.6-5.83-22.009-2.773-27.716 6.83s-2.552 22.112 7.048 27.942z"
            fill="#0F9D58"
          />
        </g>
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
