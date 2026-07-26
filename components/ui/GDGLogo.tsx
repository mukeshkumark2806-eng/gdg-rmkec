import React from 'react';

interface GDGLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const GDGLogo: React.FC<GDGLogoProps> = ({ className = '', size = 48, showText = true }) => {
  // Original SVG viewBox: 2.586 66.379 250.828 124.639
  // Aspect ratio: 250.828 / 124.639 ≈ 2.013
  const width = size * 2;
  const height = size;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official GDG Logo */}
      <svg
        width={width}
        height={height}
        viewBox="2.586 66.379 250.828 124.639"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Google Developer Groups Logo"
      >
        <g fill="none" fillRule="evenodd">
          <path
            d="m102.907 106.981-66.897 40.034c-9.6 5.83-22.009 2.773-27.716-6.83-5.708-9.601-2.552-22.112 7.048-27.942l66.897-40.034c9.6-5.83 22.009-2.773 27.716 6.83s2.552 22.112-7.048 27.942z"
            fill="#ea4335"
          />
          <path
            d="m82.153 185.617-66.182-38.053c-9.742-5.4-13.214-17.764-7.754-27.614s17.784-13.457 27.527-8.057l66.182 38.054c9.743 5.4 13.214 17.763 7.754 27.613s-17.784 13.458-27.527 8.057z"
            fill="#4285f4"
          />
          <path
            d="m173.847 185.617 66.182-38.053c9.742-5.4 13.214-17.764 7.754-27.614s-17.784-13.457-27.527-8.057l-66.182 38.054c-9.743 5.4-13.214 17.763-7.754 27.613s17.784 13.458 27.527 8.057z"
            fill="#fbbc04"
          />
          <path
            d="m153.093 106.981 66.897 40.034c9.6 5.83 22.009 2.773 27.716-6.83 5.708-9.601 2.552-22.112-7.048-27.942l-66.897-40.034c-9.6-5.83-22.009-2.773-27.716 6.83s-2.552 22.112 7.048 27.942z"
            fill="#0f9d58"
          />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-tight">
            Google Developer Group
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 tracking-wide mt-0.5">
            R.M.K. Engineering College
          </span>
        </div>
      )}
    </div>
  );
};


