'use client';

import React from 'react';
import { teamData, TEAM_SECTIONS_ORDER } from '@/data/team';
import { SingleFrameFamilyCarousel } from '@/components/team/SingleFrameFamilyCarousel';
import { MemoriesCarousel } from '@/components/team/MemoriesCarousel';
import { GlowButton } from '@/components/ui/GlowButton';
import { Heart, Sparkles, Layers } from 'lucide-react';

export default function FamilyPage() {
  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* ============================================================ */}
        {/* 1. HERO SECTION                                              */}
        {/* ============================================================ */}
        <div className="text-center max-w-4xl mx-auto mb-16 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FBBC05] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Heart className="h-3.5 w-3.5 text-[#EA4335]" />
            <span>GDG on Campus RMKEC Family</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Meet Our Family
          </h1>

          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto">
            The people behind every event, project, workshop, and milestone.
          </p>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
            GDG on Campus RMKEC is powered by passionate student organizers, wing leads, and faculty advisors
            dedicated to building a thriving technology community. While our flagship hackathons brought together 650+
            Hackathon Teams Participated across RMK institutions, these are the 45 core team members and leads driving
            our chapter operations, technical projects, and workshops.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. UNIFIED SINGLE-FRAME CAROUSEL BAR (Left-to-Right Moving)  */}
        {/* ============================================================ */}
        <div className="mb-24">
          <SingleFrameFamilyCarousel
            members={teamData}
            categories={TEAM_SECTIONS_ORDER}
          />
        </div>

        {/* ============================================================ */}
        {/* 3. COMMUNITY MEMORIES CAROUSEL                               */}
        {/* ============================================================ */}
        <div className="mb-20">
          <MemoriesCarousel />
        </div>

        {/* ============================================================ */}
        {/* 4. CLOSING MESSAGE SECTION                                   */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl border border-white/15 bg-[#121216]/90 backdrop-blur-2xl shadow-2xl">
          <div className="space-y-3 font-medium text-base sm:text-xl text-white/90 leading-relaxed italic">
            <p>Behind every successful event is a team that planned it.</p>
            <p>Behind every impactful project is a group that built it.</p>
            <p>Behind every milestone is a community that believed in it.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">This is our family.</h3>
            <p className="text-sm font-mono text-[#4285F4] mt-1 font-semibold">
              This is GDG on Campus RMKEC.
            </p>
            <div className="mt-6 flex justify-center">
              <GlowButton href="/join" shape="pill" size="md">
                Join the Family →
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
