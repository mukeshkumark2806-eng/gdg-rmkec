'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { teamData, TEAM_SECTIONS_ORDER } from '@/data/team';
import { Badge } from '@/components/ui/Badge';
import { TeamSection } from '@/components/team/TeamSection';

export default function FamilyPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    // Load dotlottie-wc web component script if not already present
    if (!document.querySelector('script[src*="dotlottie-wc"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.4/dist/dotlottie-wc.js';
      script.type = 'module';
      document.head.appendChild(script);
    }
  }, []);

  // Guarantee strict order:
  // 1. Dr. Darwin — Faculty Coordinator
  // 2. Core Leads
  // 3. Technical Team
  // 4. HR Team
  // 5. Design Team
  // 6. PR Team
  // 7. Event Management
  const orderedMembers = useMemo(() => {
    return TEAM_SECTIONS_ORDER.flatMap((category) =>
      teamData.filter((member) => member.teamCategory === category)
    );
  }, []);

  const displayMembers = useMemo(() => {
    if (activeCategory === 'All') return orderedMembers;
    return orderedMembers.filter((m) => m.teamCategory === activeCategory);
  }, [activeCategory, orderedMembers]);

  return (
    <div className="pt-32 pb-24 relative overflow-hidden bg-[#F5F7FA]">
      {/* Background Blobs like Home Page */}
      <div className="blob" style={{ width: 700, height: 600, background: 'radial-gradient(ellipse, #4285F4 0%, #34A853 55%, transparent 100%)', top: -200, right: -150, opacity: 0.13 }} />
      <div className="blob" style={{ width: 500, height: 400, background: 'radial-gradient(ellipse, #FBBC05 0%, #EA4335 55%, transparent 100%)', bottom: 40, left: -120, opacity: 0.09, animationDelay: '4s' }} />
      <div className="blob" style={{ width: 600, height: 400, background: 'radial-gradient(ellipse, #4285F4 0%, transparent 70%)', top: '30%', left: '25%', opacity: 0.05, animationDelay: '8s' }} />

      {/* Dot Grid Texture like Home Page */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      {/* Top Left DotLottie Animation below Navbar */}
      <div className="absolute top-20 left-2 sm:left-6 md:left-12 z-0 pointer-events-none opacity-85 lg:opacity-100">
        <dotlottie-wc
          src="https://lottie.host/e06e6375-0cd0-456c-83da-f71380ba0f37/oiab0MZhHC.lottie"
          style={{ width: '360px', height: '360px' }}
          autoplay
          loop
        />
      </div>

      {/* Top Right DotLottie Animation below Navbar */}
      <div className="absolute top-20 right-2 sm:right-6 md:right-12 z-0 pointer-events-none opacity-85 lg:opacity-100">
        <dotlottie-wc
          src="https://lottie.host/08caeb60-a827-4280-aee6-603f19d00b3c/qNbz8leWyQ.lottie"
          style={{ width: '360px', height: '360px' }}
          autoplay
          loop
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="blue" className="mb-4">
            People Behind GDG RMKEC
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Our <span className="text-gradient-google">Family Wall</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Meet the faculty advisors, student chapter leads, domain teams, and volunteers building the GDG RMKEC chapter.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200 ${
              activeCategory === 'All'
                ? 'bg-[#1A1A2E] text-white border-[#1A1A2E] shadow-md'
                : 'bg-white/80 text-slate-700 hover:bg-white border-slate-300/80 hover:border-blue-400 shadow-sm'
            }`}
          >
            All Members ({orderedMembers.length})
          </button>
          {TEAM_SECTIONS_ORDER.map((category) => {
            const count = orderedMembers.filter((m) => m.teamCategory === category).length;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1A1A2E] text-white border-[#1A1A2E] shadow-md'
                    : 'bg-white/80 text-slate-700 hover:bg-white border-slate-300/80 hover:border-blue-400 shadow-sm'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Single Continuous 3-Column Responsive Grid */}
        <TeamSection members={displayMembers} />
      </div>
    </div>
  );
}
