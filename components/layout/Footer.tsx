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
            href={siteConfig.socials.twitter}
            shape="circle"
            size="sm"
            ariaLabel="X"
            surfaceClassName="h-10 w-10 sm:h-11 sm:w-11 !p-0"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
              <path d="M18.9 2h3.3l-7.2 8.3L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.9L1.9 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z" />
            </svg>
          </GlowButton>

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

          <GlowButton
            href={siteConfig.socials.youtube}
            shape="circle"
            size="sm"
            ariaLabel="YouTube"
            surfaceClassName="h-10 w-10 sm:h-11 sm:w-11 !p-0"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
              <path d="M22.5 8.1a2.7 2.7 0 0 0-1.9-1.9C18.9 5.7 12 5.7 12 5.7s-6.9 0-8.6.5A2.7 2.7 0 0 0 1.5 8.1 28.4 28.4 0 0 0 1 12a28.4 28.4 0 0 0 .5 3.9 2.7 2.7 0 0 0 1.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9A28.4 28.4 0 0 0 23 12a28.4 28.4 0 0 0-.5-3.9ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
            </svg>
          </GlowButton>

          <GlowButton
            href={siteConfig.socials.github}
            shape="circle"
            size="sm"
            ariaLabel="GitHub"
            surfaceClassName="h-10 w-10 sm:h-11 sm:w-11 !p-0"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
          </GlowButton>

          <GlowButton
            href={siteConfig.socials.discord}
            shape="circle"
            size="sm"
            ariaLabel="Discord"
            surfaceClassName="h-10 w-10 sm:h-11 sm:w-11 !p-0"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
              <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25-1.845-.276-3.68-.276-5.487 0-.163-.393-.406-.874-.618-1.25a.077.077 0 0 0-.078-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.319 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.098.246.198.373.292a.077.077 0 0 1-.007.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .031-.055c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.095 2.156 2.419 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.095 2.156 2.419 0 1.334-.946 2.419-2.157 2.419Z" />
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
