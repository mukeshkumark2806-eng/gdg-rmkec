import React from 'react';

interface GDGLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const GDGLogo: React.FC<GDGLogoProps> = ({ className = '', size = 36, showText = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official 4-Color Google Developer Group Logo Mark */}
      <svg
        width={size}
        height={Math.round((size * 48) / 74)}
        viewBox="0 0 74 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
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

