'use client';

import React from 'react';
import { GlowButton } from '@/components/ui/GlowButton';

export const SeeYouThereSection: React.FC = () => {
  return (
    <section className="relative flex min-h-[50vh] sm:min-h-[60vh] flex-col items-center justify-center gap-8 px-6 pb-20 pt-20 sm:pt-28 text-center select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(66,133,244,0.2) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Headline */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-[#4285F4] font-semibold block mb-2">
          Ready to Build?
        </span>
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none tracking-tight text-white">
          Join the Movement.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/70">
          Be part of the student technology revolution at RMK Engineering College.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 relative z-10">
        <GlowButton
          href="https://discord.gg/gdgrmkec"
          target="_blank"
          rel="noreferrer"
          shape="pill"
          size="lg"
        >
          Join Discord Community →
        </GlowButton>
        <GlowButton href="/join" shape="pill" size="lg">
          Apply for Technical Wings →
        </GlowButton>
      </div>

      {/* Meta footnote */}
      <p className="font-mono text-xs uppercase tracking-widest text-white/40 relative z-10 mt-2">
        GDG on Campus RMKEC · Established September 2025
      </p>
    </section>
  );
};
