'use client';

import React from 'react';
import Link from 'next/link';
import { GlowButton } from '@/components/ui/GlowButton';
import { siteConfig } from '@/data/site';
import { useLiteMode } from '@/context/LiteModeContext';

export const Footer: React.FC = () => {
  const { isLiteMode, toggleLiteMode } = useLiteMode();

  return (
    <footer className="relative z-10 mt-auto px-4 py-16 sm:px-8 text-paper select-none overflow-hidden border-t border-white/08 bg-black">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10">
        {/* Central Brand framed with Stylized Yellow Brackets */}
        <div className="relative mx-auto flex items-center justify-center gap-4 sm:gap-8 w-full max-w-lg py-4">
          {/* Left Yellow Bracket SVG */}
          <svg
            className="w-10 sm:w-16 h-20 sm:h-28 shrink-0 text-[#FBBC05]"
            viewBox="0 0 176.7 531"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.7 312.8H27.9C35.8 312.8 42.2 319.2 42.2 327.1V458.7C42.2 498.3 74.2 530.3 113.8 530.3H171C174.2 530.3 176.7 527.8 176.7 524.6V444.3C176.7 441.1 174.2 438.6 171 438.6H127.1C119.2 438.6 112.8 432.2 112.8 424.2V106.1C112.8 98.2 119.2 91.8 127.1 91.8H171C174.2 91.8 176.7 89.2 176.7 86.1V5.8C176.7 2.6 174.2 0 171 0H113.8C74.2 0 42.2 32.1 42.2 71.6V203.2C42.2 211.1 35.8 217.5 27.9 217.5H5.7C2.5 217.5 0 220 0 223.2V307.1C0 310.2 2.5 312.8 5.7 312.8Z" />
          </svg>

          {/* Typography & Brand Mark */}
          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4285F4] font-semibold">
              Google Developer Groups
            </span>
            <span className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-1">
              GDG on Campus RMKEC
            </span>
            <span className="font-mono text-[11px] text-white/60 tracking-wider mt-1">
              R.M.K. Engineering College · Established Sept 2025
            </span>
          </div>

          {/* Right Yellow Bracket SVG */}
          <svg
            className="w-10 sm:w-16 h-20 sm:h-28 shrink-0 text-[#FBBC05]"
            viewBox="1707 0 176.8 531"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M1878.1 217.6H1855.9C1848 217.6 1841.6 211.1 1841.6 203.2V71.6C1841.6 32.1 1809.5 0 1770 0H1712.7C1709.6 0 1707 2.6 1707 5.8V86.1C1707 89.2 1709.6 91.8 1712.7 91.8H1756.7C1764.6 91.8 1771 98.2 1771 106.1V424.2C1771 432.2 1764.6 438.6 1756.7 438.6H1712.7C1709.6 438.6 1707 441.1 1707 444.3V524.6C1707 527.8 1709.6 530.3 1712.7 530.3H1770C1809.5 530.3 1841.6 498.3 1841.6 458.7V327.2C1841.6 319.3 1848 312.9 1855.9 312.9H1878.1C1881.2 312.9 1883.8 310.3 1883.8 307.2V223.3C1883.8 220.1 1881.2 217.6 1878.1 217.6Z" />
          </svg>
        </div>

        {/* Social Round Glow Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">

          <GlowButton
            href={siteConfig.socials.instagram}
            shape="circle"
            size="sm"
            ariaLabel="Instagram"
            surfaceClassName="h-10 w-10 sm:h-11 sm:w-11 !p-0"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
              <path
                d="M7 2.5h10A4.5 4.5 0 0 1 21.5 7v10a4.5 4.5 0 0 1-4.5 4.5H7A4.5 4.5 0 0 1 2.5 17V7A4.5 4.5 0 0 1 7 2.5Zm0 2A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h10a2.5 2.5 0 0 0 2.5-2.5V7A2.5 2.5 0 0 0 17 4.5H7Z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
              <path
                d="M12 7.2A4.8 4.8 0 1 1 12 16.8 4.8 4.8 0 0 1 12 7.2Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
              <circle cx="17.3" cy="6.7" r="1.2" />
            </svg>
          </GlowButton>

          <GlowButton
            href={siteConfig.socials.linkedin}
            shape="circle"
            size="sm"
            ariaLabel="LinkedIn"
            surfaceClassName="h-10 w-10 sm:h-11 sm:w-11 !p-0"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
              <path d="M6.94 8.5v10.9H3.5V8.5h3.44ZM5.22 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM20.5 19.4h-3.43v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.19 1.48-2.19 3v5.8H9.55V8.5h3.29v1.49h.05c.46-.86 1.58-1.77 3.25-1.77 3.48 0 4.36 2.29 4.36 5.27v5.91Z" />
            </svg>
          </GlowButton>
        </div>

        {/* Links: Code of Conduct, Contact, Lite toggle */}
        <div className="mx-auto mt-4 flex w-full max-w-2xl flex-col items-center gap-4 text-center text-xs text-white/70">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="https://developers.google.com/community-guidelines"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              Code of Conduct
            </a>
            <Link
              href="/contact"
              className="underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              Contact Us
            </Link>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              {siteConfig.contactEmail}
            </a>
            <button
              type="button"
              onClick={() => toggleLiteMode()}
              className="inline-flex items-center gap-2 text-xs text-white/70 underline-offset-4 hover:text-white hover:underline cursor-pointer transition-colors"
              aria-pressed={isLiteMode}
              title={isLiteMode ? 'Disable Lite version (enable full visual effects)' : 'Enable Lite version (optimized battery & performance)'}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                  isLiteMode ? 'bg-[#34A853] shadow-[0_0_8px_rgba(52,168,83,0.8)]' : 'bg-white/30'
                }`}
              />
              Lite version{' '}
              <span className={isLiteMode ? 'text-[#34A853] font-medium' : 'text-white/40'}>
                {isLiteMode ? 'on' : 'off'}
              </span>
            </button>
          </div>

          <p className="max-w-2xl font-mono text-[11px] text-white/40 leading-relaxed">
            GDG on Campus RMKEC is an independent student technology community established at R.M.K.
            Engineering College under Google&apos;s Community Guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
};
