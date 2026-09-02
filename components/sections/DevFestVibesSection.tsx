'use client';

import React from 'react';
import { GlowButton } from '@/components/ui/GlowButton';

export const DevFestVibesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden text-paper py-16 sm:py-24">
      {/* Section Headline */}
      <h2 className="px-6 pb-8 pt-6 text-left text-paper text-[clamp(2rem,7vw,5rem)] font-bold leading-none tracking-tight sm:px-12 max-w-6xl mx-auto">
        What&apos;s your community path?
      </h2>

      {/* Split Section Container */}
      <div className="relative h-[110vh] sm:h-[85vh] max-h-[900px] w-full overflow-hidden">
        {/* ============================================================ */}
        {/* DESKTOP SPLIT VIEW                                           */}
        {/* ============================================================ */}

        {/* 1. LEFT PANEL: BUILD & PRESENT */}
        <div
          className="absolute inset-0 hidden sm:block overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, calc(58% - 4px) 0, calc(42% - 4px) 100%, 0 100%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1800&q=80"
            alt="Build & Present"
            className="h-full w-full object-cover object-left"
          />
          {/* Radial Dark Vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 75% 65% at top left, rgba(0,0,0,0.85), transparent 65%)',
            }}
          />

          {/* Left Content Overlay */}
          <div className="absolute top-0 left-0 z-20 flex w-full max-w-[42%] flex-col gap-5 p-8 sm:p-12 md:p-16">
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,1)]">
              Build & Lead
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,1)]">
              Got novel ideas or ready to build high-impact campus solutions? Join our Technical Wings
              and Core Teams. From Agentic AI to the Real-Time Bus Tracker, lead projects that impact
              the college ecosystem!
            </p>
            <div className="pt-2">
              <GlowButton href="/join" shape="pill" size="lg">
                Join Technical Wings →
              </GlowButton>
            </div>
          </div>
        </div>

        {/* 2. RIGHT PANEL: LEARN & PARTICIPATE */}
        <div
          className="absolute inset-0 hidden sm:block overflow-hidden"
          style={{
            clipPath: 'polygon(calc(58% + 4px) 0, 100% 0, 100% 100%, calc(42% + 4px) 100%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80"
            alt="Learn & Participate"
            className="h-full w-full object-cover object-right"
          />
          {/* Radial Dark Vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 75% 65% at bottom right, rgba(0,0,0,0.85), transparent 65%)',
            }}
          />

          {/* Right Content Overlay */}
          <div className="absolute bottom-0 right-0 z-20 flex w-full max-w-[42%] flex-col items-end gap-5 p-8 sm:p-12 md:p-16 text-right">
            <div className="pb-2">
              <GlowButton href="/events" shape="pill" size="lg">
                ← Explore Events
              </GlowButton>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,1)]">
              Level up your skills through hands-on Google Cloud study jams, HackNEXA’26 hackathons,
              and AI workshops. Earn official Google badges, swags, and build your developer portfolio.
            </p>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,1)]">
              Learn & Compete
            </h3>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE STACKED VIEW                                          */}
        {/* ============================================================ */}

        {/* Top Mobile */}
        <div
          className="absolute inset-0 block sm:hidden overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(48% - 2px), 0 calc(52% - 2px))',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80"
            alt="Build"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute top-0 left-0 p-6 flex flex-col gap-3">
            <h3 className="text-3xl font-bold text-white">Build & Lead</h3>
            <p className="text-xs text-white/80 leading-relaxed max-w-xs">
              Join technical wings to build campus solutions and lead community initiatives.
            </p>
            <div>
              <GlowButton href="/join" shape="pill" size="sm">
                Join Wings →
              </GlowButton>
            </div>
          </div>
        </div>

        {/* Bottom Mobile */}
        <div
          className="absolute inset-0 block sm:hidden overflow-hidden"
          style={{
            clipPath: 'polygon(0 calc(52% + 2px), 100% calc(48% + 2px), 100% 100%, 0 100%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
            alt="Learn"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute bottom-0 right-0 p-6 flex flex-col items-end gap-3 text-right">
            <div>
              <GlowButton href="/events" shape="pill" size="sm">
                View Events →
              </GlowButton>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-xs">
              Participate in HackNEXA, Cloud Jams, and Agentic AI bootcamps.
            </p>
            <h3 className="text-3xl font-bold text-white">Learn & Compete</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
